import pool from "@/db";
import { RowDataPacket } from "mysql2";
import { redirect, notFound } from "next/navigation";
import "./article.scss";
import MathJax from "./mathjax";

export default async function Blogs({ params }: { params: { props: string[] } }) {
  const path = decodeURI(`/blog/${params.props.join("/")}`);

  const [results] = (await pool.query("SELECT data, mime FROM blogs WHERE path = ?", [path])) as RowDataPacket[];

  const blogData = results[0];
  if (!blogData) {
    return notFound();
  }

  if (blogData.mime !== "/text/html") {
    return redirect(`/api/files${path}`);
  }

  return (
    <div className="flex justify-center" id="blog-article">
      <MathJax />
      <div className=" lg:w-1/2">
        <article dangerouslySetInnerHTML={{ __html: blogData.data.toString() }} />
      </div>
    </div>
  );
}
