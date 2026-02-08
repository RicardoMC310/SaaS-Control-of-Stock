import UserPersistenceDTO from "@/Adapters/out/persistence/neon/User/UserPersistenceDTO";
import IUserMapper from "@/Applications/User/IUserMapper";
import User from "@/Domain/User/User";
import UserFactoryState from "@/Domain/User/UserFactoryRole";
import UserResponseDTO from "@/Domain/User/UserResponseDTO";
import Email from "@/Domain/User/ValueObjects/Email";
import Name from "@/Domain/User/ValueObjects/Name";
import Password from "@/Domain/User/ValueObjects/PasswordHash";
import { UserRoles } from "@/Infrastructure/generated/prisma/enums";

export default class UserMapperImpl implements IUserMapper {
    domainToEntity(user: User): UserPersistenceDTO {
        return {
            name: user.getName(),
            email: user.getEmail(),
            passwordHash: user.getPasswordHash(),
            role: user.getRole() as UserRoles,
        };
    }

    entityToDomain(entity: UserPersistenceDTO): User {
        return new User(
            Name.create(entity.name),
            Email.create(entity.email),
            Password.createWithAExists(entity.passwordHash),
            UserFactoryState.fromString(entity.role)
        )
    }

    domainToDTO(user: User): UserResponseDTO {
        return {
            name: user.getName(),
            email: user.getEmail(),
            role: user.getRole()
        }
    }

}