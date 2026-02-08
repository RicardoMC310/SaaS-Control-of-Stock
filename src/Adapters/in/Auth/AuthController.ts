import AuthMapperImpl from "@/Adapters/Mappers/AuthMapperImpl";
import UserMapperImpl from "@/Adapters/Mappers/UserMapperImpl";
import UserRepositoryImpl from "@/Adapters/out/persistence/neon/User/UserRepositoryImpl";
import AuthSessionImpl from "@/Adapters/Session/AuthSessionImpl";
import AuthLoginDTO from "@/Applications/Auth/AuthLoginDTO";
import AuthService from "@/Applications/Auth/AuthService";
import IAuthMapper from "@/Applications/Auth/IAuthMapper";
import IAuthSession from "@/Applications/Auth/IAuthSession";
import IUserMapper from "@/Applications/User/IUserMapper";
import APIMiddleWare from "@/Infrastructure/APIUtils/APIMiddleWare";
import APIController from "@/Infrastructure/APIUtils/APIWrapper";
import AuthRequest from "@/Infrastructure/APIUtils/AuthRequest";
import express, { type Router, type Request } from "express";

const AuthRouter: Router = express.Router();

const userMapper: IUserMapper = new UserMapperImpl();
const userRepository = new UserRepositoryImpl(userMapper);

const authSession: IAuthSession = new AuthSessionImpl();
const authMapper: IAuthMapper = new AuthMapperImpl();
const authService = new AuthService(userRepository, authSession, authMapper);

AuthRouter.post("/login", APIController({
    handler: async (req: Request) => {
        const authLoginDTO: AuthLoginDTO = req.body;

        return await authService.login(authLoginDTO);
    },
    message: "login successful"
}));

AuthRouter.get("/whoami",
    APIMiddleWare({
        handler: (req: AuthRequest) => {
            const token = req.headers.authorization;

            if (!token)
                throw new Error("Token authorization not found");

            req.token = token as string;
        },
    }),
    APIController({
        handler: async (req: AuthRequest) => {
            return await authService.whoami(req.token ?? "");
        },
        message: "Your is a user"
    }));

AuthRouter.delete("/logout",
    APIMiddleWare({
        handler: (req: AuthRequest) => {
            const token = req.headers.authorization;

            if (!token)
                throw new Error("Token authorization not found");

            req.token = token as string;
        }
    }),
    APIController({
        handler: async (req: AuthRequest) => {
            await authService.logout(req.token ?? "");
        },
        message: "Logout successful"
    }));

export default AuthRouter;