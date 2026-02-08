import AuthSessionDTO from "@/Applications/Auth/AuthSessionDTO";
import IAuthMapper from "@/Applications/Auth/IAuthMapper";
import User from "@/Domain/User/User";
import UserResponseDTO from "@/Domain/User/UserResponseDTO";

export default class AuthMapperImpl implements IAuthMapper {

    userToAuth(user: User): AuthSessionDTO {
        return {
            name: user.getName(),
            email: user.getEmail(),
            role: user.getRole(),
        };
    }

    authToUser(auth: AuthSessionDTO): UserResponseDTO {
        return {
            name: auth.name,
            email: auth.email,
            role: auth.role
        };
    }

}