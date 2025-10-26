import express, { type Response, type Request, type Router } from "express";
import createAuthService from "../services/auth.service";
import { returnErrorAPI } from "../utils/APIError";
import { AuthLoginDTO } from "../DTOs/auth.dto";

const AUTH_ROUTER: Router = express.Router();

const SERVICE = createAuthService();

AUTH_ROUTER.post("/login", async (req: Request, res: Response) => {
    try {  
        const result = await SERVICE.login(req.body);

        res.status(200).json({
            "sucess": false,
            "message": result
        });

    } catch (error) {
        returnErrorAPI(res, error);
    }
});

export default AUTH_ROUTER;