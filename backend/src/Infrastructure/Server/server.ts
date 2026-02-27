import APIRouter from "@/Infrastructure/APIUtils/APIRouter";
import App from "./app";
import env from "@/Infrastructure/Config/env";
import { Router } from "express";

const UserRouter: Router = Router();
UserRouter.get("/", (req, res) => {
    res.status(200).json({
        message: "ok"
    });
});

const apiRouter: APIRouter = new APIRouter(); 
apiRouter.loadRoute("/", UserRouter);

const app: App = new App(env.SERVER_PORT, env.SERVER_HOST, apiRouter);

app.run();