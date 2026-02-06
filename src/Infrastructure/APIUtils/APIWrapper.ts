import { type Request, type Response } from "express";
import APIResponser from "@/Infrastructure/APIUtils/APIResponser";

type Handler<T = unknown> = (req: Request) => Promise<T>;

interface ControllerParams {
    handler: Handler,
    message: string,
    status?: number
};

export default function APIController(params: ControllerParams) {
    return async (req: Request, res: Response) => {
        const apiResponser = new APIResponser(res);

        try {
            const data = await params.handler(req);
            apiResponser.response(params.message, params.status, data);
        } catch (error) {
            apiResponser.responseError(error);
        }
    }
}