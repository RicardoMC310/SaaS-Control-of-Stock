import express, { type Router, type Request } from "express";
import UserService from "@/Applications/User/UserService";
import UserRepositoryImpl from "@/Adapters/out/persistence/neon/User/UserRepositoryImpl";
import APIController from "@/Infrastructure/APIUtils/APIWrapper";
import CreateUserDTO from "@/Applications/User/UserCreateDTO";
import UserChangeRoleDTO from "@/Applications/User/UserChangeRoleDTO";
import UserFindByEmailDTO from "@/Applications/User/UserFindByEmailDTO";

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

UserRouter.get("/find/all", APIController({
    handler: async (_req: Request) => {
        return await userService.findAll();
    },
    message: "All users found"
}));

UserRouter.post("/find/by/email", APIController({
    handler: async (req: Request) => {
        const userFindByEmailDTO: UserFindByEmailDTO = req.body;

        return await userService.findByEmail(userFindByEmailDTO);
    },
    message: "User found"
}));

UserRouter.put("/change/role", APIController({
    handler: async (req: Request) => {
        const userChangeRoleDTO: UserChangeRoleDTO = req.body;
        userChangeRoleDTO.role = userChangeRoleDTO.role?.toUpperCase();

        return await userService.changeRole(userChangeRoleDTO);
    },
    message: "User updated role"
}));

export default UserRouter;