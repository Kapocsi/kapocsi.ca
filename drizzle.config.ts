import "dotenv/config";
import type { Config } from "drizzle-kit";
import { auth } from "@/db";

console.log(auth)

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "mysql2", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: { ...auth },
} satisfies Config;
