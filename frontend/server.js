import express from "express";
import http from "http";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.static("public"))
app.use(cors());

const server = http.createServer(app);

server.listen(5544, "0.0.0.0", () => console.log("rodando na porta 5544"));