import express, { type Request, type Response } from "express";

const app = express();

app.get("/healthy", (req: Request, res: Response) => {
    res.status(200).json({
        "sucess": true
    })
});

app.listen(3333, "0.0.0.0", () => console.log("rodando na porta 3333"));