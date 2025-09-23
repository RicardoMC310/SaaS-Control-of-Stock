import { UserEntity, UserSaveInput } from './../entities/userEntity';
import { Request, Response } from "express";
import { IUserRepository } from "../repositories/userResporitory";
import { NewUserPostgresRepository } from "../repositories/userPostgresRepository";

export async function getTestUser(req: Request, res: Response) {
    try {
        const repo: IUserRepository = NewUserPostgresRepository();
        const user = new UserEntity();

        const userInput: UserSaveInput = req.body;

        await user.setData(userInput);

        await repo.Save(user);

        res.status(200).json({
            "sucess": true,
            "user": user.getToJson()
        });

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                "sucess": false,
                "error": error.message
            });
        } else {
            res.status(500).json({
                "sucess": false,
                "error": error
            });
        }
    }
}