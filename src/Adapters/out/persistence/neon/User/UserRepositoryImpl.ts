import IUserRepository from "@/Domain/User/IUserRepository";
import User from "@/Domain/User/User";
import prisma from "@/Infrastructure/Database/database";
import UserPersistenceDTO from "./UserPersistenceDTO";
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
                    throw new Error("Email already exists");
                }
            }

            throw new Error("Failed to save user");
        }
    }

    async findAll(): Promise<User[]> {
        try {
            const entities = await prisma.users.findMany();

            return entities.map(entity => this.userMapper.entityToDomain(entity));

        } catch (error) {
            throw new Error("Failed to load users");
        }
    }

    async findByEmail(email: string): Promise<User> {
        try {
            const entity = await prisma.users.findFirst({
                where: { email }
            })

            if (!entity) throw new Error(`User by email ${email} not found`);

            return this.userMapper.entityToDomain(entity);
        } catch(error) {
            throw new Error("Failed to load user by email");
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
            throw new Error("Failed to update user");
        }
    }

}