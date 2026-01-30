import dotenv from "dotenv";
dotenv.config();

class DotEnv {
    static getenv(key: string, defaultValue?: string): string {
        const value = process.env[key];

        if (value !== undefined) return value;
        if (defaultValue !== undefined) return defaultValue;

        throw new Error(`missing ${key} in variables environment`);
    }
}

export default {
    PORT: parseInt(DotEnv.getenv("SERVER_PORT", "8080")),
    HOST: DotEnv.getenv("SERVER_HOST", "127.0.0.1")
};