import IUserRepository from "@/Domain/User/IUserRepository";
import User from "@/Domain/User/User";
import prisma from "@/Infrastructure/Database/database";
import UserMapper from "@/Infrastructure/Mappers/UserMapper";
import UserPersistenceDTO from "./UserPersistenceDTO";
import APIError from "@/Infrastructure/APIUtils/APIError";
import { Prisma } from "@/Infrastructure/generated/prisma/client";

export default class UserRepositoryImpl implements IUserRepository {
        
    async save(user: User): Promise<User> {
        try {
            const entity: UserPersistenceDTO = UserMapper.domainToEntity(user);

            const created = await prisma.peoples.create({
                data: entity
            });

            return UserMapper.entityToDomain(created);
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
            const entities = await prisma.peoples.findMany();
            const users: User[] = [];

            entities.map(entity => {
                users.push(UserMapper.entityToDomain(entity));
            });

            return users;

        } catch (error) {
            throw new APIError("Failed to load users", 500);
        }
    }

    async findByEmail(email: string): Promise<User> {
        try {
            const entity = await prisma.peoples.findFirst({
                where: { email }
            })

            if (!entity) throw new APIError(`User by email ${email} not found`, 404);

            return UserMapper.entityToDomain(entity);
        } catch(error) {
            if (error instanceof APIError) {
                throw error;
            }

            throw new APIError("Failed to load user by email", 500);
        }
    }

    async updated(user: User): Promise<User> {
        try {
            const entity = UserMapper.domainToEntity(user);

            const updated = await prisma.peoples.update({
                where: {email: entity.email},
                data: entity
            })

            return UserMapper.entityToDomain(updated);
            
        } catch (error) {
            if (error instanceof APIError) {
                throw error;
            }

            throw new APIError("Failed to update user", 500);
        }
    }

}