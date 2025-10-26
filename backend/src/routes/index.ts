import express, { type Router, type Request, type Response } from "express";
import USER_ROUTER from "./user.router";
import AUTH_ROUTER from "./auth.router";

const ROUTER: Router = express.Router();

ROUTER.get("/healthy", (_req: Request, res: Response) => {
    res.status(200).json({
        "sucess": true,
        "message": "API is functional"
    });
});

ROUTER.use("/user", USER_ROUTER);
ROUTER.use("/auth", AUTH_ROUTER);

export default ROUTER;