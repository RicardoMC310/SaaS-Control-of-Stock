import express, { type Router, type Request, type Response } from "express";
import createUserEntity from "../entities/user.entity";

const USER_ROUTER: Router = express.Router();

interface UserDTO {
    id: number;
    name: string;
    email: string;
    password: string;
}

USER_ROUTER.post("/", (req: Request, res: Response) => {

    try {
        let user = createUserEntity();

        let userDTO: UserDTO = req.body;

        user.setNameEmailPasswordFields(userDTO.id, userDTO.name, userDTO.email, userDTO.password);

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