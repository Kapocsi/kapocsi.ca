export const runtime = "edge";

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../db/schema";
import dotenv from "dotenv";
dotenv.config();

export const auth = {
  host: process.env.DATABASE_HOST as string,
  user: process.env.DATABASE_USERNAME as string,
  password: process.env.DATABASE_PASSWORD as string,
  database: process.env.DATABASE_NAME as string,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // ssl: process.env.DATABASE_HOST !== "localhost" ? { rejectUnauthorized: true } : undefined,
};

const pool = mysql.createPool(auth);

export default pool;

export const db = drizzle(pool, { schema, mode: "planetscale" });
