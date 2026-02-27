import { Router, Express } from "express";

export default class APIRouter {
    private router: Router = Router();

    constructor() {}

    loadRoute(path: string, router: Router): void {
        this.router.use(path, router);
    }

    configureRouter(server: Express): void {

        server.use("/", this.router);
    }
}