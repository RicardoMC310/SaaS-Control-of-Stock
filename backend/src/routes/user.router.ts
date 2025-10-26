import express, { type Router, type Request, type Response } from "express";
import { IUserRepository } from "../repositories/user.repositories";
import createUserPostgresRepository from "../repositories/user.postgres-repository";
import UserService from "../services/user.service";
import { UserEntity } from "../entities/user.entity";
import { returnErrorAPI } from "../utils/APIError";

const USER_ROUTER: Router = express.Router();
const REPOSITORY: IUserRepository = createUserPostgresRepository();
const SERVICE = new UserService(REPOSITORY);

USER_ROUTER.post("/", async (req: Request, res: Response) => {
    try {
        const user: UserEntity = await SERVICE.createNewUser(req.body);

        res.status(200).json({
            "sucess": true,
            "message": user
        });
    } catch (error) {
        returnErrorAPI(res, error);
    }
});

export default USER_ROUTER;