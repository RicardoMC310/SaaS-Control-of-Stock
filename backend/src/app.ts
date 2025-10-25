import express, { type Express } from "express";
import cors from "cors";
import ROUTER from "./routes";

const APP: Express = express();

APP.use(express.json());
APP.use(cors());

APP.use("/api", ROUTER);

export default APP;