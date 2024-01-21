import pool from "@/db";
import { RowDataPacket } from "mysql2";
import { redirect, notFound } from "next/navigation";
import "@/lib/article.scss";
import MathJax from "@/lib/mathjax";

export default async function Page({ params }: { params: { props: string[] } }) {
  const path = `/${decodeURI(params.props.join("/"))}`;
  const query = "SELECT data, mime, title, date_added, date_modified FROM blogs WHERE path = ?";
  const [rows] = (await pool.query(query, [path])) as RowDataPacket[];

  const data = rows[0];
  if (!data) return notFound();

  if (data.mime !== "/text/html") {
    return redirect(`/api/files${path}`);
  }

  return (
    <div className="flex-col" id="blog-article">
      <MathJax />
      <div className="border-b">
        <h1 className="text-3xl">{data.title}</h1>
        <p> Published {data.date_added.toLocaleDateString()}</p>
      </div>
      <article dangerouslySetInnerHTML={{ __html: data.data.toString() }} />
    </div>
  );
}
