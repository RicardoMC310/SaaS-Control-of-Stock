import { UserEntity } from "../entities/user.entity";

export interface IUserRepository {
    Save(user: UserEntity): Promise<UserEntity>;
    FindByEmail(email: string): Promise<UserEntity>;
}