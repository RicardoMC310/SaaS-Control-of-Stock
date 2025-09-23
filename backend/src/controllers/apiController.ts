import { Request, Response } from "express";

export function getHealthy(req: Request, res: Response) {
    res.status(200).json({
        "sucess": true
    });
}

export function getTestDB(req: Request, res: Response) {
    try {
        res.status(200).json({
            "sucess": true
        });
    } catch (err) {
        res.status(500).json({
            "sucess": false,
            "error": err
        });
    }
}
