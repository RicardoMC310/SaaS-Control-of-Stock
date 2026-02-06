import User from "@/Domain/User/User";

export default interface IUserRepository {
    save(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
    updated(user: User): Promise<User>;
};