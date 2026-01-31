import { neon } from "@neondatabase/serverless";
import env from "@Infrastructure/Config/env";

const ExecuteSql = neon(env.DATABASE_URL);

export default ExecuteSql;