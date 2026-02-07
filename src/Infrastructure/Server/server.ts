import AppServer from "@/Infrastructure/Server/app";
import env from "@/Infrastructure/Config/env";
import APIRouter from "@/Infrastructure/Server/router";

import UserRouter from "@/Adapters/in/User/UserController"
import AuthRouter from "@/Adapters/in/Auth/AuthController";

const ApiRouter: APIRouter = new APIRouter();
ApiRouter.loadRoute("/user", UserRouter);
ApiRouter.loadRoute("/auth", AuthRouter);

const App: AppServer = new AppServer(env.SERVER_HOST, env.SERVER_PORT, ApiRouter);

App.run();