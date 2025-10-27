import { type Response } from "express";

const knownPrismaErrors: Record<string, string> = {
    P2002: "Já existe um registro com o(s) campo(s): ",
    P2025: "Registro não encontrado.",
}

enum HttpStatus {
    NOT_FOUND = 404,
    CONFLIT = 409,
    BAD_REQUEST = 400,
    INTERNAL_ERROR = 500,
    BAD_GATEWAY = 502,
    UNAUTHORIZED = 401,

    CREATED = 201,
    FOUND = 302,
    SUCCESS = 200,

    P2025 = 404,
    P2002 = 400
}

const errorsToStatus: Record<string, number> = {
    NOT_FOUND: 404,
    CONFLIT: 409,
    BAD_REQUEST: 400,
    INTERNAL_ERROR: 500,
    BAD_GATEWAY: 502,
    UNAUTHORIZED: 401,

    CREATED: 201,
    FOUND: 302,
    SUCCESS: 200,

    P2025: 404,
    P2002: 400
}

export { knownPrismaErrors, HttpStatus };

export function mapStatusCodeByName(code: string): number {
    return errorsToStatus[code] ?? 500;
}

export function getStatusAndMessageInPrismaErrors(code: string): { code: number, message: string } {
    return {
        code: mapStatusCodeByName(code),
        message: knownPrismaErrors[code]
    }
}

export function returnAPI(res: Response, statusCode: number, message: Object) {
    res.status(statusCode).json({
        "sucess": true,
        "message": message
    });
}

export function returnErrorAPI(res: Response, error: unknown) {

    const statusCode: number = error instanceof AppError ?
        error.code : 500;
    const message: string = error instanceof Error || error instanceof AppError ?
        error.message : String(error);

    res.status(statusCode).json({
        "sucess": false,
        "message": message
    });
}

export class AppError extends Error {
    constructor(
        public readonly message: string,
        public readonly code: number
    ) {
        super(message);
        Object.setPrototypeOf(this, AppError.prototype);
    }
}