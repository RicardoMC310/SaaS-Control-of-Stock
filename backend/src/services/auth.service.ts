import { AuthLoginDTO, AuthValidateTokenDTO } from "../DTOs/auth.dto";
import { UserEntity } from "../entities/user.entity";
import createUserPostgresRepository from "../repositories/user.postgres-repository";
import { AppError, HttpStatus, mapStatusCodeByName } from "../utils/APIUtils";
import { Password } from "../utils/types/Password";
import UserService from "./user.service";
import jwt, { SignOptions } from "jsonwebtoken";
import { config as configDotEnv } from "dotenv";
import { JWTPayloadCustom } from "../utils/types/Payloads";
configDotEnv();

interface AuthLoginResponseDTO {
    token: string;
}

class AuthService {
    private readonly NAME_JWT_SECRET_IN_VARIABLES_ENVIRONMENT: string = "JWT_SECRET";
    private readonly NAME_JWT_EXPIREIN_IN_VARIABLES_ENVIRONMENT: string = "JWT_EXPIRESIN";

    public async login(authLoginDTO: AuthLoginDTO): Promise<AuthLoginResponseDTO> {

        const userService = this.getUserService();

        const {userEntityPassword, userEntity} = await this.getPasswordAndUserEntityByEmail(userService, authLoginDTO.email);

        this.comparePasswordUserEntity(userEntityPassword, authLoginDTO.password);

        const payload: JWTPayloadCustom = {
            ...userEntity.getAllValueFields(),
        };

        return {
            token: this.generateJWTPayload(payload),
        };
    }

    public validateToken(authValidateTokenDTO: AuthValidateTokenDTO) {
        this.getUserByToken(authValidateTokenDTO.token);
    }

    public whoami(authValidateTokenDTO: AuthValidateTokenDTO): JWTPayloadCustom {
        const user = this.getUserByToken(authValidateTokenDTO.token);

        delete user.exp;
        delete user.iat;

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        };
    }

    private getUserByToken(token: string) {
        const secret: string = this.getVariableEnvironment(this.NAME_JWT_SECRET_IN_VARIABLES_ENVIRONMENT);

        try {
            const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

            return decoded;
        } catch (error) {
            throw new AppError("Token inválido!", HttpStatus.UNAUTHORIZED);
        }
    }

    private async getPasswordAndUserEntityByEmail(userService: UserService, email: string) {
        const userEntity: UserEntity = await userService.findUserByEmail(email);

        const userEntityPassword = userEntity.getPasswordField();

        return {userEntity, userEntityPassword};
    }

    private getUserService() {
        const userRepository = createUserPostgresRepository();
        const userService = new UserService(userRepository);

        return userService;
    }

    private comparePasswordUserEntity(userEntityPassword: Password, passwordStr: string) {
        if (!userEntityPassword.comparePasswordWithHash(passwordStr)) {
            throw new AppError("Senha inválida!", HttpStatus.BAD_REQUEST);
        }
    }

    private generateJWTPayload(user: JWTPayloadCustom): string {
        const secret: string = this.getVariableEnvironment(this.NAME_JWT_SECRET_IN_VARIABLES_ENVIRONMENT);
        const expiresIn = this.getVariableEnvironment(this.NAME_JWT_EXPIREIN_IN_VARIABLES_ENVIRONMENT) as `${number}${"ms" | "s" | "m" | "h" | "d" | "y"}`;

        const options: SignOptions = {
            expiresIn: expiresIn
        }

        const token: string = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        }, secret, options);

        return token;
    }

    private getVariableEnvironment(key: string): string {
        if (!process.env[key]) {
            throw new AppError(`${key} not found in environment variables`, HttpStatus.INTERNAL_ERROR);
        }

        return process.env[key];
    }
};

export default function createAuthService(): AuthService {
    return new AuthService();
}