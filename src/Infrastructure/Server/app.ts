import express, { type Express } from "express";
import https from "https";
import fs from "fs";
import { join as pathJoin } from "path";
import APIRouter from "@/Infrastructure/Server/router";
import { getDirname } from "@/Infrastructure/utils/path";
import env from "@/Infrastructure/Config/env";

const __dirname = getDirname(import.meta.url);

class AppServer {
    private readonly server: Express;

    constructor(
        private readonly host: string,
        private readonly port: number,

        private readonly apiRouter: APIRouter
    ) { 
        this.server = express();

        this.initConfigServer();
    }

    run(): void {
        const options = this.createOptionsSSL();

        https.createServer(options, this.server).listen(this.port, this.host, () => {
            console.log(`Running server in [host: ${this.host} | port: ${this.port}]`);
        });
    }

    private createOptionsSSL(): {key: any, cert: any} {
        const keyPath = env.KEY_SSL_PATH;
        const certPath = env.CERT_SSL_PATH;

        const options = {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certPath)
        };

        return options;
    }

    private initConfigServer(): void {
        this.server.use(express.json());

        this.apiRouter.enableRouter(this.server);
    }
}

export default AppServer;