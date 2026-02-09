import AuthService from "@/Applications/Auth/AuthService";
import AuthLoginDTO from "@/Applications/Auth/DTOs/AuthLoginDTO";
import AuthLoginRequestDTO from "@/Applications/Auth/DTOs/AuthLoginRequestDTO";
import UserService from "@/Applications/User/UserService";
import APIError from "@/Infrastructure/APIUtils/APIError";
import APIMiddleWare from "@/Infrastructure/APIUtils/APIMiddleWare";
import APIRequest from "@/Infrastructure/APIUtils/APIRequest";
import APIController from "@/Infrastructure/APIUtils/APIWrapper";
import express, { Router } from "express";

export default function createAuthRouter(
    authService: AuthService,
    userService: UserService
): Router {
    const AuthRouter: Router = express.Router();

    AuthRouter.post("/login",
        APIController({
            handler: async (req: APIRequest) => {
                const authLoginRequestDTO: AuthLoginRequestDTO = req.body;

                const user = await userService.findByEmailWithComparationPassword({ email: authLoginRequestDTO.email }, authLoginRequestDTO.password);

                const authLoginDTO: AuthLoginDTO = {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }

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