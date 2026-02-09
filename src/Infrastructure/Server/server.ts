import AppServer from "@/Infrastructure/Server/app";
import env from "@/Infrastructure/Config/env";
import APIRouter from "@/Infrastructure/Server/router";

import AuthMapSessionStorage from "@/Adapters/out/persistence/Session/Auth/AuthMapSessionStorage";
import createUserRouter from "@/Adapters/in/User/UserController";
import UserService from "@/Applications/User/UserService";
import UserRepositoryImpl from "@/Adapters/out/persistence/neon/User/UserRepositoryImpl";
import UserMapperImpl from "@/Adapters/Mappers/UserMapperImpl";
import AuthService from "@/Applications/Auth/AuthService";
import AuthSession from "@/Applications/Auth/AuthSession";
import createAuthRouter from "@/Adapters/in/Auth/AuthController";

const authSessionStorage = new AuthMapSessionStorage<AuthSession>();

const userMapperImpl = new UserMapperImpl();
const userRepositoryImpl = new UserRepositoryImpl(userMapperImpl);
const userService = new UserService(userRepositoryImpl, userMapperImpl);

const authService = new AuthService(authSessionStorage);

const ApiRouter: APIRouter = new APIRouter();
ApiRouter.loadRoute("/user", createUserRouter(userService, authService));
ApiRouter.loadRoute("/auth", createAuthRouter(authService, userService));

const App: AppServer = new AppServer(env.SERVER_HOST, env.SERVER_PORT, ApiRouter);

App.run();