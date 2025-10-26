import express, { type Response, type Request, type Router } from "express";
import createAuthService from "../services/auth.service";
import { mapStatusCodeByName, returnErrorAPI, returnAPI } from "../utils/APIError";

const AUTH_ROUTER: Router = express.Router();

const SERVICE = createAuthService();

AUTH_ROUTER.post("/login", async (req: Request, res: Response) => {
    try {  
        const result = await SERVICE.login(req.body);

        returnAPI(res, mapStatusCodeByName("SUCESS"), result);

    } catch (error) {
        returnErrorAPI(res, error);
    }
});

AUTH_ROUTER.post("/validate", (req: Request, res: Response) => {
    try {
        SERVICE.validateToken(req.body);

        returnAPI(res, mapStatusCodeByName("SUCESS"), "Token válido");
    } catch (error) {
        returnErrorAPI(res, error);
    }
});

AUTH_ROUTER.post("/whoami", (req: Request, res: Response) => {
    try {
        const user = SERVICE.whoami(req.body);

        returnAPI(res, mapStatusCodeByName("FOUND"), user);
    } catch (error) {
        returnErrorAPI(res, error);
    }
});

export default AUTH_ROUTER;