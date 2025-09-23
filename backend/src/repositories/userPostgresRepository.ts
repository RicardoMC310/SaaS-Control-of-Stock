import { IUserRepository } from './userResporitory';
import { pool } from "../connection/postgres";
import { UserEntity } from "../entities/userEntity";
import pkg from "pg";

class UserPostgresRepository implements IUserRepository {
    private pool: pkg.Pool;

    constructor() {
        this.pool = pool;
    }

    async Save(user: UserEntity): Promise<pkg.QueryResult<any>> {
        const query = `
            INSERT INTO users(name, email, passwordHash)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;

        const params = [user.Name, user.Email, user.PasswordHash];

        return await this.pool.query(query, params);
    }
}

export function NewUserPostgresRepository(): UserPostgresRepository {
    return new UserPostgresRepository();
}