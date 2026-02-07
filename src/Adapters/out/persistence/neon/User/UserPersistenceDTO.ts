import { UserRoles } from "@/Infrastructure/generated/prisma/enums";

interface UserPersistenceDTO  {
    name: string,
    email: string,
    passwordHash: string,
    role: UserRoles
}

export default UserPersistenceDTO;