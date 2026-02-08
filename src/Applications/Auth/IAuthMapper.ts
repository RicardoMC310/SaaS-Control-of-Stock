import User from "@/Domain/User/User";
import AuthSessionDTO from "./AuthSessionDTO";
import UserResponseDTO from "@/Domain/User/UserResponseDTO";

export default interface IAuthMapper {
    userToAuth(user: User): AuthSessionDTO;
    authToUser(auth: AuthSessionDTO): UserResponseDTO;
};