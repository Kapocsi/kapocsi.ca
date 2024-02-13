import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { auth } from "@/db";
import dotenv from "dotenv";
dotenv.config();

export const poolConnection = mysql.createPool(auth);
export const db = drizzle(poolConnection);
