import AppServer from "@Infrastructure/Server/app";
import env from "@Infrastructure/Config/env";
import APIRouter from "@Infrastructure/Server/router";

import UserRouter from "@Adapters/in/Users/UserController"

const ApiRouter: APIRouter = new APIRouter();
ApiRouter.loadRoute("/user", UserRouter);

const App: AppServer = new AppServer(env.HOST, env.PORT, ApiRouter);

App.run();