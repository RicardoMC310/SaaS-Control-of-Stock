import express, { type Express } from "express";
import ROUTER from "./routes";

const APP: Express = express();

APP.use(express.json());

APP.use("/api", ROUTER);

export default APP;