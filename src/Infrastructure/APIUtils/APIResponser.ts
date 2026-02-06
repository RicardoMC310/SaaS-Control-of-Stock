import { type Response } from "express";
import APIError from "./APIError";

export default class APIResponser {
    constructor(
        private readonly responser: Response
    ) { }

    response(message: string, status: number = 200, data?: unknown): void {
        this.responser.status(status).json({
            message,
            data
        });
    }

    responseError(error: unknown): void {
        const apiError = this.normalizeError(error);

        this.response(apiError.message, apiError.statusCode);
    }

    private normalizeError(error: unknown): APIError {
        if (error instanceof APIError) {
            return new APIError(error.message, error.statusCode);
        } else if (error instanceof Error) {
            return new APIError(error.message, 500);
        }

        return new APIError(String(error), 500);
    }
}