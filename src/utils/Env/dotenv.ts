import { config as configDotEnv } from "dotenv";
configDotEnv();

export default class DotEnv {
    public static getenv(key: string, defaultValue?: string): string {
        const value = process.env[key];

        if (value !== undefined) return value;
        if (defaultValue !== undefined) return defaultValue;

        throw new Error(`[ENV]: missing environment variable ${key}`);
    }
};