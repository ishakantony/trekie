import { type Config } from "drizzle-kit";

import { env } from "./src/env.mjs";

export default {
  schema: "./src/server/db/schema.ts",
  out: "./src/server/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.POSTGRES_URL,
  },
  tablesFilter: ["trekie_*"],
} satisfies Config;
