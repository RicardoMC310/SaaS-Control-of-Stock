import express, { type Express } from "express";

class App {
    private server: Express = express();

    constructor(
        private readonly host: string,
        private readonly port: number
    ) {}

    run(): void {
        this.server.listen(this.port, this.host, () => {
            console.log(`Running in host:${this.host} | port: ${this.port}`);
        });
    }
}

const app: App = new App("localhost", 8080);

app.run();