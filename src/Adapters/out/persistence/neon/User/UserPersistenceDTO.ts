import { PeopleState } from "@/Infrastructure/generated/prisma/enums";

interface UserPersistenceDTO  {
    name: string,
    email: string,
    passwordHash: string,
    state: PeopleState
}

export default UserPersistenceDTO;