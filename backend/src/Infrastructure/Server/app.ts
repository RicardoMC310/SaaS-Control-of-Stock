// permitir ver ip real do cliente inves do ip do proxy no build
// app.set("trust proxy", 1)

import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import fs from "fs";
import https from "https";
import APIRouter from "@/Infrastructure/APIUtils/APIRouter";
import env from "@/Infrastructure/Config/env";

interface IOptionsSSL {
    key: string;
    cert: string;
};

export default class App {
    private server: Express = express();

    constructor(
        private readonly port: number,
        private readonly host: string,
        private readonly apiRouter: APIRouter
    ) {
        this.configureServer();
    }

    run(): void {
        const options: IOptionsSSL = this.loadConfigSSL();

        https.createServer(options, this.server).listen(this.port, this.host, () => {
            console.log(`Rodando em https://${this.host}:${this.port}`);
        });
    }

    private configureServer(): void {
        this.server.set("trust proxy", 1);

        this.server.use(express.json());
        this.server.use(cors());
        this.server.use(helmet());

        this.apiRouter.configureRouter(this.server);
    }

    private loadConfigSSL(): IOptionsSSL {
        const keyPath = env.KEY_PATH;
        const certPath = env.CERT_PATH;

        const options: IOptionsSSL = {
            key: fs.readFileSync(keyPath).toString(),
            cert: fs.readFileSync(certPath).toString()
        };

        return options;
    }
}