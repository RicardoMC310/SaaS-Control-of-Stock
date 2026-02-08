import AuthMapperImpl from "@/Adapters/out/Mappers/AuthMapperImpl";
import UserMapperImpl from "@/Adapters/out/Mappers/UserMapperImpl";
import UserRepositoryImpl from "@/Adapters/out/persistence/neon/User/UserRepositoryImpl";
import AuthLoginDTO from "@/Applications/Auth/AuthLoginDTO";
import AuthService from "@/Applications/Auth/AuthService";
import IAuthMapper from "@/Applications/Auth/IAuthMapper";
import IUserMapper from "@/Applications/User/IUserMapper";
import APIController from "@/Infrastructure/APIUtils/APIWrapper";
import express, { type Router, type Request } from "express";

const AuthRouter: Router = express.Router();

const userMapper: IUserMapper = new UserMapperImpl();
const userRepository = new UserRepositoryImpl(userMapper);

const authMapper: IAuthMapper = new AuthMapperImpl();
const authService = new AuthService(userRepository, authMapper);

AuthRouter.post("/login", APIController({
    handler: async (req: Request) => {
        const authLoginDTO: AuthLoginDTO = req.body;

        return await authService.login(authLoginDTO);
    },
    message: "login successful"
}));

export default AuthRouter;