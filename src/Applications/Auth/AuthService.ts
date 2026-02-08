import IUserRepository from "@/Domain/User/IUserRepository";
import IAuthMapper from "./IAuthMapper";
import AuthResponseDTO from "./AuthResponseDTO";
import AuthLoginDTO from "./AuthLoginDTO";
import User from "@/Domain/User/User";

export default class AuthService {
    constructor(
        private readonly repository: IUserRepository,
        private readonly mapper: IAuthMapper
    ) {}

    async login(authLoginDTO: AuthLoginDTO): Promise<AuthResponseDTO> {
        const user: User = await this.repository.findByEmail(authLoginDTO.email);

        if (!user.comparePasswordHash(authLoginDTO.password)) 
            throw new Error("Password does not match");

        return {
            sessionID: "Teste de ID De Sessao"
        };
    }
}