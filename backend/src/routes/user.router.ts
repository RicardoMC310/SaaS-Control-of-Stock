import express, { type Router, type Request, type Response } from "express";

const USER_ROUTER: Router = express.Router();

USER_ROUTER.get("/", (_req: Request, res: Response) => {
    res.status(200).json({
        "sucess": true,
        "message": "USER system is functional"
    });
});

export default USER_ROUTER;