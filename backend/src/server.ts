import express, { Request, Response } from "express";

const app = express();

app.get("/healthy", (_req: Request, res: Response) => {
    res.status(200).json({
        message: "OK!",
        status: 200,
        data: {
            user:
            {
                name: "Ricardo",
                age: 13,
                email: "rmc777@gmail.com",
                company: {
                    
                }
            }
        }
    });
});

app.listen(3030, "0.0.0.0", () => {
    console.log("Rodando na porta 3030");
});