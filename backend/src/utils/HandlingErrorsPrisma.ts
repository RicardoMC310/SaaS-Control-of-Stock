import { Prisma } from "../generated/prisma/client";
import { AppError, getStatusAndMessageInPrismaErrors, HttpStatus } from "./APIUtils";


export default function handleErrorsPrisma(err: unknown): string {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const { code, message } = getStatusAndMessageInPrismaErrors(err.code);
        let finalMessageError = `Erro no banco de dados: ${err.message}`;

        if (message) {
            const fields = (err.meta?.target as string[]).join(", ");
            finalMessageError = message;
            finalMessageError += fields ? fields : "";
        }

        throw new AppError(finalMessageError, code)
    }

    if (err instanceof Prisma.PrismaClientValidationError) {
        throw new AppError(`Erro de validação: ${err.message}`,  HttpStatus.BAD_GATEWAY);
    }

    if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new AppError(`Erro desconhecido do prisma: ${err.message}`,  HttpStatus.BAD_GATEWAY);
    }

    if (err instanceof Error) throw new AppError(err.message,  HttpStatus.INTERNAL_ERROR);

    throw new AppError("Erro inesperado aconteceu", HttpStatus.INTERNAL_ERROR);
}