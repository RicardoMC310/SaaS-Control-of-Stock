import express, { type Router, type Express } from "express";

class APIRouter {
    private readonly router: Router;
    private routes: Map<string, Router> = new Map();

    constructor() {
        this.router = express.Router();
    }

    enableRouter(server: Express): void {
        this.loadRoutes();

        server.use(this.router);
    }

    loadRoute(path: string, route: Router) {
        this.routes.set(path, route);
    }

    private loadRoutes(): void {
        for (const [mapPath, mapRouter] of this.routes) {
            this.router.use(mapPath, mapRouter);
        }
    }

};

export default APIRouter;