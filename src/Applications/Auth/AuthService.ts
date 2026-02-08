import IUserRepository from "@/Domain/User/IUserRepository";
import AuthResponseDTO from "./AuthResponseDTO";
import AuthLoginDTO from "./AuthLoginDTO";
import User from "@/Domain/User/User";
import IAuthSession from "./IAuthSession";
import AuthSessionDTO from "./AuthSessionDTO";
import UserResponseDTO from "@/Domain/User/UserResponseDTO";
import IAuthMapper from "./IAuthMapper";

export default class AuthService {
    constructor(
        private readonly repository: IUserRepository,
        private readonly session: IAuthSession,
        private readonly mapper: IAuthMapper
    ) {}

    async login(authLoginDTO: AuthLoginDTO): Promise<AuthResponseDTO> {
        const user: User = await this.repository.findByEmail(authLoginDTO.email);

        if (!user.comparePasswordHash(authLoginDTO.password)) 
            throw new Error("Password does not match");

        const authSessionDTO: AuthSessionDTO = this.mapper.userToAuth(user);

        const key = this.session.save(authSessionDTO);

        return {
            sessionID: key
        };
    }

    async whoami(token: string): Promise<UserResponseDTO> {
        const auth = this.session.get(token);

        return this.mapper.authToUser(auth);
    }

    async logout(token: string): Promise<void> {
        const isSuccessfullDeleted = this.session.delete(token);

        if (!isSuccessfullDeleted)
            throw new Error("Error deleting session");
    }
}