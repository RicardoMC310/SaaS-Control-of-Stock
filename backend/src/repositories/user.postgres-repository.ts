import prisma from "../prisma";
import { UserEntity } from "../entities/user.entity";
import { IUserRepository } from "./user.repositories";
import handleErrorsPrisma from "../utils/HandlingErrorsPrisma";
import { AppError, mapStatusCodeByName } from "../utils/APIError";

class UserPostgresRepository implements IUserRepository {
    public async Save(user: UserEntity): Promise<UserEntity> {
        const { name, email, passwordHash } = user.getAllValueFields();
        let userData;

        try {
            userData = await prisma.user.create({
                data: { name, email, passwordHash }
            });
        } catch (error) {
            handleErrorsPrisma(error);
        }

        return Object.assign(new UserEntity, userData);
    }

    public async FindByEmail(email: string): Promise<UserEntity> {
        let userData;

        try {
            userData = await prisma.user.findUnique({
                where: {email},
                select: {
                    id: true,
                    name: true,
                    email: true,
                    passwordHash: true
                }
            });

            if (!userData)
                throw new AppError("Email não cadastrado no sistema", mapStatusCodeByName("NOT_FOUND"));

        } catch (error) {
            handleErrorsPrisma(error);
        }

        return Object.assign(new UserEntity(), userData);
    }
}

export default function createUserPostgresRepository(): UserPostgresRepository {
    return new UserPostgresRepository();
}