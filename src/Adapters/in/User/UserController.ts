import express, { Router, type Request } from "express";
import UserService from "@/Applications/User/UserService";
import APIController from "@/Infrastructure/APIUtils/APIWrapper";
import UserCreateDTO from "@/Applications/User/DTOs/UserCreateDTO";
import UserChangeRoleDTO from "@/Applications/User/DTOs/UserChangeRoleDTO";
import UserFindByEmailDTO from "@/Applications/User/DTOs/UserFindByEmailDTO";
import APIMiddleWare from "@/Infrastructure/APIUtils/APIMiddleWare";
import APIRequest from "@/Infrastructure/APIUtils/APIRequest";
import APIError from "@/Infrastructure/APIUtils/APIError";
import AuthService from "@/Applications/Auth/AuthService";

export default function createUserRouter(
    userService: UserService,
    authService: AuthService
): Router {
    const UserRouter: Router = express.Router();

    UserRouter.post("/create",
        APIController({
            handler: async (req: Request) => {
                const createUserDTO: UserCreateDTO = req.body;

                return await userService.save(createUserDTO);
            },
            message: "User created"
        }));

    UserRouter.get("/find/all",
        APIController({
            handler: async (_req: Request) => {
                return await userService.findAll();
            },
            message: "All users found"
        }));

    UserRouter.post("/find/by/email",
        APIController({
            handler: async (req: Request) => {
                const userFindByEmailDTO: UserFindByEmailDTO = req.body;

                return await userService.findByEmail(userFindByEmailDTO);
            },
            message: "User found"
        }));

    UserRouter.put("/change/role",
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
                const userChangeRoleDTO: UserChangeRoleDTO = req.body;
                userChangeRoleDTO.role = userChangeRoleDTO.role?.toUpperCase();

                const user = await userService.changeRole(userChangeRoleDTO);

                authService.update(req.sessionID || "", user);

                return user;
            },
            message: "User updated role"
        }));

    return UserRouter;
}