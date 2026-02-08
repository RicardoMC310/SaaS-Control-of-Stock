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
    SERVER_PORT: parseInt(DotEnv.getenv("SERVER_PORT", "8080")),
    SERVER_HOST: DotEnv.getenv("SERVER_HOST", "127.0.0.1"),
    SESSION_DURATION: DotEnv.getenv("SESSION_DURATION", "16h"),
    DATABASE_URL: DotEnv.getenv("DATABASE_URL"),
    KEY_SSL_PATH: DotEnv.getenv("KEY_SSL_PATH"),
    CERT_SSL_PATH: DotEnv.getenv("CERT_SSL_PATH"),
};