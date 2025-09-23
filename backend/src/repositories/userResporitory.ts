import pkg from "pg";
import { UserEntity } from "../entities/userEntity";

export interface IUserRepository {
    Save(user: UserEntity): Promise<pkg.QueryResult<any>>;
}