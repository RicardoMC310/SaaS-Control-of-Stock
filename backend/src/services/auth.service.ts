import { AuthLoginDTO } from "../DTOs/auth.dto";
import { UserEntity } from "../entities/user.entity";
import createUserPostgresRepository from "../repositories/user.postgres-repository";
import { AppError, mapErrorToStatus } from "../utils/APIError";
import { Password } from "../utils/Password";
import UserService from "./user.service";
import jwt from "jsonwebtoken";
import { config as configDotEnv } from "dotenv";
configDotEnv();

interface AuthLoginResponseDTO {
    token: string;
}

interface JWTPayloadCustom {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
};

class AuthService {

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
            throw new AppError("Senha inválida!", mapErrorToStatus("BAD_REQUEST"));
        }
    }

    private generateJWTPayload(user: JWTPayloadCustom): string {
        if (!process.env.JWT_SECRET) {
            throw new AppError("JWT_SECRET not found in environment variables", mapErrorToStatus("INTERNAL_ERROR"));
        }

        const secret: string = process.env.JWT_SECRET;

        const token: string = jwt.sign(user, secret);

        return token;
    }
};

export default function createAuthService(): AuthService {
    return new AuthService();
}