import IUserRepository from "@/Domain/User/IUserRepository";
import User from "@/Domain/User/User";

export default class UserService {
    constructor(
        private readonly repository: IUserRepository
    ) {}

    async findAll(): Promise<User[]> {
        return await this.repository.findAll();
    }
}