import express, { type Router, type Request, type Response } from "express";
import USER_ROUTER from "./user.router";
import AUTH_ROUTER from "./auth.router";
import { mapStatusCodeByName, returnAPI } from "../utils/APIError";

const ROUTER: Router = express.Router();

ROUTER.get("/healthy", (_req: Request, res: Response) => {
    returnAPI(res, mapStatusCodeByName("SUCESS"), "API is functional");
});

ROUTER.use("/user", USER_ROUTER);
ROUTER.use("/auth", AUTH_ROUTER);

export default ROUTER;