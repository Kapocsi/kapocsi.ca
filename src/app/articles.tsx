export const dynamic = "force dynamic";
export const revalidate = 1;

import pool from "@/db";
import { FieldPacket, RowDataPacket } from "mysql2";
import Link from "next/link";

async function get_articles() {
  "force dynamic";
  let [articles]: [RowDataPacket[], FieldPacket[]] = await pool.query(
    "SELECT path, title, date_added FROM blogs where mime like'%text/html%' ORDER BY date_modified DESC; ",
  );
  return articles;
}

export default async function Article() {
  const articles = await get_articles();
  return (
    <table className="table-fixed w-[100%]">
      <thead className="border-[var(--f\_high)] border-b-2">
        <tr>
          <td> Title </td>
          <td className="text-right"> Date Published </td>
        </tr>
      </thead>
      <tbody>
        {articles.map((data, key) => (
          <tr key={key} className="border-[var(--f\_high)] border-b [&>td]:pt-2">
            <td>
              <Link href={data.path}>{data.title}</Link>
            </td>
            <td className="text-right">{data.date_added.toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
