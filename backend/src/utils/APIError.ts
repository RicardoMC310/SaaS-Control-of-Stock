const knownPrismaErrors: Record<string, string> = {
    P2002: "Já existe um registro com o(s) campo(s): ",
    P2025: "Registro não encontrado.",
}

const errorsToStatus: Record<string, number> = {
    NOT_FOUND: 404,
    CONFLIT: 409,
    BAD_REQUEST: 400,
    INTERNAL_ERROR: 500,
    BAD_GATEWAY: 502,

    P2025: 404,
    P2002: 400
}

export { knownPrismaErrors }

export function mapErrorToStatus(code: string): number {
    return errorsToStatus[code] ?? 500;
}

export function getStatusAndMessageInPrismaErrors(code: string): { code: number, message: string } {
    return {
        code: mapErrorToStatus(code),
        message: knownPrismaErrors[code]
    }
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