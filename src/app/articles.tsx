import Link from "next/link";
import pool from "@/db";
import { FieldPacket, RowDataPacket } from "mysql2";

export async function get_articles() {
  let [articles]: [RowDataPacket[], FieldPacket[]] = await pool.query(
    "SELECT path, title, date_added FROM blogs where mime like'%text/html%' ORDER BY date_modified DESC; ",
  );
  return articles;
}

export default async function Article() {
  let articles = await get_articles();

  const rows = articles.map((data, key) => (
    <tr key={key} className="border-[var(--f\_high)] border-b [&>td]:pt-2">
      <td>
        <Link href={data.path}>{data.title}</Link>
      </td>
      <td className="text-right">{data.date_added.toLocaleDateString()}</td>
    </tr>
  ));

  return (
    <table className="table-fixed w-[100%] text-left text-lg">
      <thead className="border-[var(--f\_high)] border-b-2">
        <tr>
          <td> Title </td>
          <td className="text-right"> Date Published </td>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
