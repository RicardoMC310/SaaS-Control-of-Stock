import prisma from "../prisma";
import { UserEntity } from "../entities/user.entity";
import { IUserRepository } from "./user.repositories";
import { Prisma } from "../generated/prisma/client";

class UserPostgresRepository implements IUserRepository {
    public async Save(user: UserEntity): Promise<UserEntity> {
        return await this.SaveUserIntoDataBase(user.getAllFields());
    }

    private async SaveUserIntoDataBase(user: { name: string, email: string, passwordHash: string }): Promise<UserEntity> {
        let userData;

        try {
            userData = await prisma.user.create({
                data: { ...user }
            });
        } catch (error) {
            const messageError: string = this.handleErrorsPrisma(error);
            throw new Error(messageError);
        }

        return Object.assign(new UserEntity, userData);
    }

    private handleErrorsPrisma(err: unknown): string {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // Erros conhecidos, como unique constraint
            if (err.code === "P2002") {
                const fields = (err.meta?.target as string[]).join(", ");
                return `Já existe um registro com o(s) campo(s): ${fields}`;
            }
            return `Erro no banco de dados: ${err.message}`;
        }

        if (err instanceof Prisma.PrismaClientValidationError) {
            return `Erro de validação: ${err.message}`;
        }

        if (err instanceof Prisma.PrismaClientUnknownRequestError) {
            return `Erro desconhecido do Prisma: ${err.message}`;
        }

        // Qualquer outro erro genérico
        if (err instanceof Error) return err.message;

        return "Ocorreu um erro inesperado";
    }
}

export default function createUserPostgresRepository(): UserPostgresRepository {
    return new UserPostgresRepository();
}