import { env } from "@/env.mjs";
import { sql } from "@vercel/postgres";
import { drizzle as nodePostgresDrizzle } from "drizzle-orm/node-postgres";
import { drizzle as vercelPostgresDrizzle } from "drizzle-orm/vercel-postgres";
import { Pool } from "pg";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const pool = new Pool({
  connectionString: env.POSTGRES_URL,
});

export const db =
  env.NODE_ENV === "production"
    ? vercelPostgresDrizzle(sql)
    : // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      nodePostgresDrizzle(pool);
