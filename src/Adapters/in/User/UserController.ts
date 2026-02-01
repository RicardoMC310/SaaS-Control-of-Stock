import express, { type Router } from "express";
import UserService from "@/Applications/User/UserService";
import UserRepositoryImpl from "@/Adapters/out/persistence/neon/User/UserRepositoryImpl";

const UserRouter: Router = express.Router();

const userRepository = new UserRepositoryImpl();
const userService = new UserService(userRepository);

UserRouter.get("/", async (_req, res) => {

    res.status(200).json({
        message: "OK",
        users: await userService.findAll()
    });
});

export default UserRouter;