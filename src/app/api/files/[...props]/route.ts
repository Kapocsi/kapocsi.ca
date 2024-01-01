import { RowDataPacket } from "mysql2";
import pool from "../../../../db";
import { NextResponse } from "next/server";
import { notFound } from "next/navigation";

export async function GET(
  request: Request,
  { params }: { params: { props: string[] } },
) {
  const file_path = "/" + params.props.join("/");

  try {
    const [rows] = (await pool.query(
      "select * from blogs where `path` = ?",
      file_path,
    )) as RowDataPacket[];

    const page = rows[0];

    let r = new NextResponse(page.data, {
      status: 200,
      headers: {
        // Cause a leading slash cause a download for some fucking reason
        "Content-Type": page.mime.replace(/^\//, ""),
      },
    });

    console.log(r);

    return r;
  } catch (error) {
    return notFound();
  }
}
