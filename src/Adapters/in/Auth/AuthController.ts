import AuthService from "@/Applications/Auth/AuthService";
import AuthLoginDTO from "@/Applications/Auth/DTOs/AuthLoginDTO";
import APIError from "@/Infrastructure/APIUtils/APIError";
import APIMiddleWare from "@/Infrastructure/APIUtils/APIMiddleWare";
import APIRequest from "@/Infrastructure/APIUtils/APIRequest";
import APIController from "@/Infrastructure/APIUtils/APIWrapper";
import express, { Router } from "express";

export default function createAuthRouter(
    authService: AuthService
): Router {
    const AuthRouter: Router = express.Router();

    AuthRouter.post("/login",
        APIController({
            handler: async (req: APIRequest) => {
                const authLoginDTO: AuthLoginDTO = req.body;

                return await authService.login(authLoginDTO);
            },
            message: "Login successful"
        })
    );

    AuthRouter.get("/whoami",
        APIMiddleWare({
            handler: (req: APIRequest) => {
                const token = req.headers.authorization;

                if (!token)
                    throw new APIError("Token required", 401);

                req.sessionID = token;
            }
        }),
        APIController({
            handler: async (req: APIRequest) => {
                return await authService.whoami(req.sessionID || "");
            },
            message: "User found"
        })
    );

    AuthRouter.delete("/logout",
        APIMiddleWare({
            handler: (req: APIRequest) => {
                const token = req.headers.authorization;

                if (!token)
                    throw new APIError("Token required", 401);

                req.sessionID = token;
            }
        }),
        APIController({
            handler: async (req: APIRequest) => {
                return await authService.logout(req.sessionID || "");
            },
            message: "User found",
            status: 204
        })
    );

    return AuthRouter;
}