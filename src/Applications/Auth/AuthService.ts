import IUserRepository from "@/Domain/User/IUserRepository";
import ISessionStorage from "../Session/ISessionStorage";
import AuthSession from "./AuthSession";
import AuthLoginDTO from "./DTOs/AuthLoginDTO";
import AuthResponseLoginDTO from "./DTOs/AuthResponseLoginDTO";
import UserResponseDTO from "@/Domain/User/UserResponseDTO";
import AuthUpdateSessionDTO from "./DTOs/AuthUpdateSessionDTO";

export default class AuthService {

    constructor(
        private readonly sessionStorage: ISessionStorage<AuthSession>,
        private readonly userRepository: IUserRepository
    ) { }

    async login(authLoginDTO: AuthLoginDTO): Promise<AuthResponseLoginDTO> {
        const user = await this.userRepository.findByEmail(authLoginDTO.email);

        if (!user.comparePasswordHash(authLoginDTO.password))
            throw new Error("Password not match");

        const authSession: AuthSession = {
            user: {
                name: user.getName(),
                email: user.getEmail(),
                role: user.getRole()
            }
        };

        const sessionID = this.sessionStorage.save(authSession);

        return {
            sessionID
        }
    }

    async whoami(sessionID: string): Promise<UserResponseDTO> {
        const user = this.sessionStorage.get(sessionID);

        return {
            name: user.user.name,
            email: user.user.email,
            role: user.user.role,            
        }
    }

    async logout(sessionID: string): Promise<void> {
        this.sessionStorage.delete(sessionID);
    }

}