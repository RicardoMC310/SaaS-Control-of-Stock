import AppServer from "./app";
import env from "../Config/env";
import APIRouter from "./router";
import UserRouter from "./Routes/user"

const ApiRouter: APIRouter = new APIRouter();
ApiRouter.loadRoute("/user", UserRouter);

const App: AppServer = new AppServer(env.HOST, env.PORT, ApiRouter);

App.run();