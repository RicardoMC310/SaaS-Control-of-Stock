import express, { type Router, type Request } from "express";
import UserService from "@/Applications/User/UserService";
import UserRepositoryImpl from "@/Adapters/out/persistence/neon/User/UserRepositoryImpl";
import APIController from "@/Infrastructure/APIUtils/APIWrapper";

const UserRouter: Router = express.Router();

const userRepository = new UserRepositoryImpl();
const userService = new UserService(userRepository);

UserRouter.get("/", APIController({
    handler: async (_req: Request) => {
        return await userService.findAll();
    },
    message: "Users Found!"
}));

export default UserRouter;