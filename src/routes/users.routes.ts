import express, { type Router, type Request, type Response } from "express";

const Routes: Router = express.Router();

Routes.get("/", (_req: Request, res: Response) => {
    res.status(200).json({
        message: "OK"
    });
});

export default Routes;