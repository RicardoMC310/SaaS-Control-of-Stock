import IUserRepository from "@/Domain/User/IUserRepository";
import User from "@/Domain/User/User";
import prisma from "@/Infrastructure/Database/database";

export default class UserRepositoryImpl implements IUserRepository
{
    async findAll(): Promise<User[]> {
        const result = await prisma.peoples.findMany();
        const users: User[] = [];

        result.map((value) => {
            users.push(new User(value.ID, value.name, value.email, value.passwordHash));
        });

        return users;
    }
}