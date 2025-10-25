import express, { type Router, type Request, type Response } from "express";
import { IUserRepository } from "../repositories/user.repositories";
import createUserPostgresRepository from "../repositories/user.postgres-repository";
import { createUserService } from "../services/user.service";
import { UserEntity } from "../entities/user.entity";
import { AppError, mapErrorToStatus } from "../utils/APIError";

const USER_ROUTER: Router = express.Router();
const REPOSITORY: IUserRepository = createUserPostgresRepository();
const SERVICE = createUserService(REPOSITORY);

function returnError(res: Response, error: unknown) {

    const statusCode: number = error instanceof AppError ?
        error.code : 500;
    const message: string = error instanceof Error || error instanceof AppError ?
        error.message : String(error);

    res.status(statusCode).json({
        "sucess": false,
        "message": message
    });
}

USER_ROUTER.post("/", async (req: Request, res: Response) => {
    try {
        const user: UserEntity = await SERVICE.createNewUser(req.body);

        res.status(200).json({
            "sucess": true,
            "message": user
        });
    } catch (error) {
        returnError(res, error);
    }
});

USER_ROUTER.get("/", async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user: UserEntity = await SERVICE.findUserByEmail(email);

        res.status(200).json({
            "sucess": true,
            "message": user
        });
    } catch (error) {
        returnError(res, error);
    }
});

export default USER_ROUTER;