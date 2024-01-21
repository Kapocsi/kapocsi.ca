import pool from "@/db";
import { RowDataPacket } from "mysql2";
import { redirect, notFound } from "next/navigation";
import "./article.scss";
import MathJax from "./mathjax";

export default async function Blogs({ params }: { params: { props: string[] } }) {
  const path = decodeURI(`/blog/${params.props.join("/")}`);
  const query = "SELECT data, mime, title, date_added, date_modified FROM blogs WHERE path = ?";
  const [results] = (await pool.query(query, [path])) as RowDataPacket[];

  const blogData = results[0];
  if (!blogData) {
    return notFound();
  }

  if (blogData.mime !== "/text/html") {
    return redirect(`/api/files${path}`);
  }

  return (
    <div className="flex-col" id="blog-article">
      <MathJax />
      <div className="border-b">
        <h1 className="text-3xl">{blogData.title}</h1>
        <p> Published {blogData.date_added.toLocaleDateString()}</p>
      </div>
      <article dangerouslySetInnerHTML={{ __html: blogData.data.toString() }}></article>
    </div>
  );
}
