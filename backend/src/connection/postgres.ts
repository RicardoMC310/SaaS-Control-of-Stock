import pkg from "pg";
import { config } from "dotenv";
config();

const { Pool } = pkg;

export const pool = new Pool({
    connectionString: process.env.DSN_DB,
    ssl: {
        rejectUnauthorized: false
    }
});
