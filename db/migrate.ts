import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { createConnection } from "mysql2/promise";
import { auth } from "@/db";

async function main() {
  const connection = await createConnection(auth);
  const db = drizzle(connection);
  await migrate(db, { migrationsFolder: "drizzle" });
  await connection.end();
}

main();
