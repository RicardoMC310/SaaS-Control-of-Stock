import UserPersistenceDTO from "@/Adapters/out/persistence/neon/User/UserPersistenceDTO";
import UserBossState from "@/Domain/User/States/UserBossState";
import UserUnassociatedState from "@/Domain/User/States/UserUnassociatedState";
import UserEmployeeState from "@/Domain/User/States/UserEmployeeState";
import User from "@/Domain/User/User";
import UserResponseDTO from "@/Domain/User/UserResponseDTO";
import Email from "@/Domain/User/ValueObjects/Email";
import Name from "@/Domain/User/ValueObjects/Name";
import Password from "@/Domain/User/ValueObjects/PasswordHash";
import UserState from "@/Domain/User/ValueObjects/UserState";
import { PeopleState } from "@/Infrastructure/generated/prisma/enums";

export default class UserMapper {
    static domainToEntity(user: User): UserPersistenceDTO {
        return {
            name: user.getName(),
            email: user.getEmail(),
            passwordHash: user.getPasswordHash(),
            state: user.getState() as PeopleState,
        };
    }

    static entityToDomain(entity: UserPersistenceDTO): User {
        return new User(
            Name.create(entity.name),
            Email.create(entity.email),
            Password.create(entity.passwordHash),
            this.createStateByName(entity.state)
        )
    }

    static domainToDTO(user: User): UserResponseDTO {
        return {
            name: user.getName(),
            email: user.getEmail(),
            state: user.getState()
        }
    }

    private static createStateByName(stateName: string): UserState {
        switch (stateName)
        {
            case "UNASSOCIATED":
                return new UserUnassociatedState();
            case "BOSS":
                return new UserBossState();
            case "EMPLOYEE":
                return new UserEmployeeState();
            default:
                throw new Error(`state ${stateName} missing`);
        }
    }
}