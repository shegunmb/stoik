import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new Pool({
  database: "stoik_db",
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 5432,
  ssl: false,
});

export const db = drizzle(pool);
