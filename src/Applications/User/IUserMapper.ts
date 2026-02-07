import UserPersistenceDTO from "@/Adapters/out/persistence/neon/User/UserPersistenceDTO";
import User from "@/Domain/User/User";
import UserResponseDTO from "@/Domain/User/UserResponseDTO";

export default interface IUserMapper {
    domainToEntity(user: User): UserPersistenceDTO;
    entityToDomain(entity: UserPersistenceDTO): User;
    domainToDTO(user: User): UserResponseDTO;
};