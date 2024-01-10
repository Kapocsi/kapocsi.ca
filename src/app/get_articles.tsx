import pool from "@/db";
import { FieldPacket, RowDataPacket } from "mysql2";

export async function get_articles() {
  let [articles]: [RowDataPacket[], FieldPacket[]] = await pool.query(
    "SELECT path, title, date_added FROM blogs where mime like'%text/html%' ORDER BY date_modified DESC; ",
  );
  return articles;
}
