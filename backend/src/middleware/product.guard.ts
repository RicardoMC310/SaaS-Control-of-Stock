import { type Response, type Request, type NextFunction } from "express";
import { AppError, HttpStatus, returnErrorAPI } from "../utils/APIUtils";
import createAuthService from "../services/auth.service";
import { JWTPayloadCustom } from "../utils/types/Payloads";

declare global {
    namespace Express {
        interface Request {
            user?: JWTPayloadCustom
        }
    }
}

export function authGuard(req: Request, res: Response, next: NextFunction): void {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError("token não foi passado", HttpStatus.UNAUTHORIZED);
        }

        const token = authHeader.split(" ")[1];

        const authService = createAuthService();

        const decoded = authService.whoami({token});

        req.user = decoded;

        next();

    } catch (error) {
        returnErrorAPI(res, error);
    }
}
