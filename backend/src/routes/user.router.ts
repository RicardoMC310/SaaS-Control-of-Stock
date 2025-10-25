import express, { type Router, type Request, type Response } from "express";
import { UserDTO } from "../DTOs/user.dto";
import { UserEntity } from "../entities/user.entity";
import { IUserRepository } from "../repositories/user.repositories";
import createUserPostgresRepository from "../repositories/user.postgres-repository";
import { createUserService } from "../services/user.service";

const USER_ROUTER: Router = express.Router();
const REPOSITORY: IUserRepository = createUserPostgresRepository();
const SERVICE =  createUserService(REPOSITORY);

USER_ROUTER.post("/", async (req: Request, res: Response) => {
    try {
        const user = await SERVICE.createNewUser(req.body);

        res.status(200).json({
            "sucess": true,
            "message": user.getAllFields()
        });
    } catch (error) {
        res.status(500).json({
            "sucess": false,
            "message": error instanceof Error ? error.message : String(error)
        });
    }
});

export default USER_ROUTER;