import express, { type Router, type Request, type Response } from "express";
import createUserEntity from "../entities/user.entity";

const USER_ROUTER: Router = express.Router();

USER_ROUTER.get("/", (_req: Request, res: Response) => {

    let user = createUserEntity();
    console.log(user.isValidFields() ? "sim" : "não");

    res.status(200).json({
        "sucess": true,
        "message": "USER system is functional"
    });
});

export default USER_ROUTER;