import { type Request, type Response, type NextFunction } from "express";
import APIResponser from "./APIResponser";
import AuthRequest from "./AuthRequest";

type Handler<T = unknown> = (req: Request) => T;

interface ControllerParams {
    handler: Handler,
    message?: string,
    status?: number
};

export default function APIMiddleWare(params: ControllerParams) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const responser = new APIResponser(res);

        try {
            params.handler(req);
            next();        
        } catch (error) {
            responser.responseError(error);
        }
    }
}