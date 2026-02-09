import ISessionStorage from "../Session/ISessionStorage";
import AuthSession from "./AuthSession";
import AuthLoginDTO from "./DTOs/AuthLoginDTO";
import AuthResponseLoginDTO from "./DTOs/AuthResponseLoginDTO";
import UserResponseDTO from "@/Domain/User/UserResponseDTO";
import AuthUpdateSessionDTO from "./DTOs/AuthUpdateSessionDTO";

export default class AuthService {

    constructor(
        private readonly sessionStorage: ISessionStorage<AuthSession>,
    ) { }

    async login(authLoginDTO: AuthLoginDTO): Promise<AuthResponseLoginDTO> {

        const authSession: AuthSession = {
            user: {
                name: authLoginDTO.name,
                email: authLoginDTO.email,
                role: authLoginDTO.role
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

    async update(sessionID: string, authUpdateSessionDTO: AuthUpdateSessionDTO): Promise<void> {
        this.sessionStorage.update(sessionID, {
            user: {
                name: authUpdateSessionDTO.name, 
                email: authUpdateSessionDTO.email, 
                role: authUpdateSessionDTO.role
            }
        });
    }

}