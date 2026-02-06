import express, { type Router, type Request } from "express";
import UserService from "@/Applications/User/UserService";
import UserRepositoryImpl from "@/Adapters/out/persistence/neon/User/UserRepositoryImpl";
import APIController from "@/Infrastructure/APIUtils/APIWrapper";
import CreateUserDTO from "@/Applications/User/UserCreateDTO";

const UserRouter: Router = express.Router();

const userRepository = new UserRepositoryImpl();
const userService = new UserService(userRepository);

UserRouter.post("/create", APIController({
    handler: async (req: Request) => {
        const createUserDTO: CreateUserDTO = req.body;

        return await userService.save(createUserDTO);
    },
    message: "User created"
}));

UserRouter.get("/findAll", APIController({
    handler: async (_req: Request) => {
        return await userService.findAll();
    },
    message: "All users found"
}));

UserRouter.post("/become/boss", APIController({
    handler: async (req: Request) => {
        return await userService.makeUserBoss(req.body?.email);
    },
    message: "User becomed Boss"
}));

UserRouter.post("/become/employee", APIController({
    handler: async (req: Request) => {
        return await userService.makeUserEmployee(req.body?.email);
    },
    message: "User becomed Employee"
}));

UserRouter.post("/become/unassociated", APIController({
    handler: async (req: Request) => {
        return await userService.makeUserUnassociated(req.body?.email);
    },
    message: "User becomed Unassociated"
}));

export default UserRouter;