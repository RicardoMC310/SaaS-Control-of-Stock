import AppServer from "@/Infrastructure/Server/app";
import env from "@/Infrastructure/Config/env";
import APIRouter from "@/Infrastructure/Server/router";

import UserRouter from "@/Adapters/in/User/UserController"

const ApiRouter: APIRouter = new APIRouter();
ApiRouter.loadRoute("/user", UserRouter);

const App: AppServer = new AppServer(env.SERVER_HOST, env.SERVER_PORT, ApiRouter);

App.run();