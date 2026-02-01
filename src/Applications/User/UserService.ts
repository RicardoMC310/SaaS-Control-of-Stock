import IUserRepository from "@/Domain/User/IUserRepository";
import User from "@/Domain/User/User";

export default class UserService {
    constructor(
        private readonly repository: IUserRepository
    ) {}

    findAll(): User[] {
        return this.repository.findAll();
    }
}