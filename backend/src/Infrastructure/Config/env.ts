import dotenv from "dotenv";

dotenv.config();

class DotEnv {
    static get(key: string, defaultValue?: string): string {
        const value = process.env[key];

        if (value) return value;
        if (defaultValue) return defaultValue;

        throw new Error(`Missing ${key} in variables environment`);
    }
}

export default {
    SERVER_PORT: parseInt(DotEnv.get("SERVER_PORT", "8080")),
    SERVER_HOST: DotEnv.get("SERVER_HOST", "localhost"),
    CERT_PATH: DotEnv.get("CERT_PATH"),
    KEY_PATH: DotEnv.get("KEY_PATH")
};