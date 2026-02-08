import IUserRepository from "@/Domain/User/IUserRepository";
import User from "@/Domain/User/User";
import prisma from "@/Infrastructure/Database/database";
import UserPersistenceDTO from "./UserPersistenceDTO";
import APIError from "@/Infrastructure/APIUtils/APIError";
import { Prisma } from "@/Infrastructure/generated/prisma/client";
import IUserMapper from "@/Applications/User/IUserMapper";

export default class UserRepositoryImpl implements IUserRepository {

    constructor(
        private readonly userMapper: IUserMapper
    ) {}
        
    async save(user: User): Promise<User> {
        try {
            const entity: UserPersistenceDTO = this.userMapper.domainToEntity(user);

            const created = await prisma.users.create({
                data: entity
            });

            return this.userMapper.entityToDomain(created);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new APIError("Email already exists", 409);
                }
            }

            throw new APIError("Failed to save user", 500);
        }
    }

    async findAll(): Promise<User[]> {
        try {
            const entities = await prisma.users.findMany();
            const users: User[] = [];

            entities.map(entity => {
                users.push(this.userMapper.entityToDomain(entity));
            });

            return users;

        } catch (error) {
            throw new APIError("Failed to load users", 500);
        }
    }

    async findByEmail(email: string): Promise<User> {
        try {
            const entity = await prisma.users.findFirst({
                where: { email }
            })

            if (!entity) throw new APIError(`User by email ${email} not found`, 404);

            return this.userMapper.entityToDomain(entity);
        } catch(error) {
            if (error instanceof APIError) {
                throw error;
            }

            throw new APIError("Failed to load user by email", 500);
        }
    }

    async updated(user: User): Promise<User> {
        try {
            const entity = this.userMapper.domainToEntity(user);

            const updated = await prisma.users.update({
                where: {email: entity.email},
                data: entity
            })

            return this.userMapper.entityToDomain(updated);
            
        } catch (error) {
            if (error instanceof APIError) {
                throw error;
            }

            throw new APIError("Failed to update user", 500);
        }
    }

}