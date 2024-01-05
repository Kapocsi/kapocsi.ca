import { use, useEffect, useState } from "react";
import pool from "@/db";
import { FieldPacket, RowDataPacket } from "mysql2";

export async function get_articles() {
  let [articles]: [RowDataPacket[], FieldPacket[]] = await pool.query(
    "SELECT path, title, date_added FROM blogs " +
      "where mime like'%text/html%'" +
      "ORDER BY date_modified DESC; ",
  );
  return articles;
}

export default async function Articles() {
  const articles = await get_articles();

  return (
    <table className="table-fixed w-[100%]">
      <thead className="border-[var(--f\_high)] border-b-2">
        <tr>
          <td> Title </td>
          <td> Date Published </td>
        </tr>
      </thead>
      <tbody>
        {articles.map((data, key) => {
          return (
            <tr key={key} className="[&>td]:py-3">
              <td>
                <a href={data.path}>{data.title}</a>
              </td>
              {/*  <td> {data.path} </td> */}
              <td className="text-right">
                {" "}
                {data.date_added.toLocaleDateString()}{" "}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
