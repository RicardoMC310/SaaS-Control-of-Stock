import IUserRepository from "@/Domain/User/IUserRepository";
import User from "@/Domain/User/User";
import prisma from "@/Infrastructure/Database/database";

export default class UserRepositoryImpl implements IUserRepository
{
    private numbers: User[] = [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
    ];

    findAll(): User[] {
        return this.numbers;
    }
}