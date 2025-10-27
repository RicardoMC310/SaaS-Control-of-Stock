import express, { type Response, type Request, type Router } from "express";
import createAuthService from "../services/auth.service";
import { mapStatusCodeByName, returnErrorAPI, returnAPI, HttpStatus } from "../utils/APIUtils";

const AUTH_ROUTER: Router = express.Router();

const SERVICE = createAuthService();

AUTH_ROUTER.post("/login", async (req: Request, res: Response) => {
    try {  
        const result = await SERVICE.login(req.body);

        returnAPI(res, HttpStatus.SUCCESS, result);

    } catch (error) {
        returnErrorAPI(res, error);
    }
});

AUTH_ROUTER.post("/validate", (req: Request, res: Response) => {
    try {
        SERVICE.validateToken(req.body);

        returnAPI(res, HttpStatus.SUCCESS, "Token válido");
    } catch (error) {
        returnErrorAPI(res, error);
    }
});

AUTH_ROUTER.post("/whoami", (req: Request, res: Response) => {
    try {
        const user = SERVICE.whoami(req.body);

        returnAPI(res, HttpStatus.FOUND, user);
    } catch (error) {
        returnErrorAPI(res, error);
    }
});

export default AUTH_ROUTER;