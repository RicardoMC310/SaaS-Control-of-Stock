import User from "@/Domain/User/User";

export default interface IUserRepository {
    save(user: User): Promise<User>;
    findAll(): Promise<User[]>;
};