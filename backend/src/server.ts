import app from "./app";
import { config } from "dotenv";
config();

const PORT = parseInt(process.env.PORT ?? "3333");

app.listen(PORT, "0.0.0.0", () => console.log(`rodando na porta ${PORT}`));