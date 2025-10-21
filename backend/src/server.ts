import APP from "./app";
import { config as configDotEnv } from "dotenv";

configDotEnv();

const PORT: number = parseInt(process.env?.SERVER_PORT || "3303");
const SERVER_HOST: string = process.env?.SERVER_HOST || "0.0.0.0";

APP.listen(PORT, SERVER_HOST, (error: Error | undefined) => {
    if (error)
    {
        console.log(error);
        return;
    }

    console.log("Rodando na porta 3303");
});