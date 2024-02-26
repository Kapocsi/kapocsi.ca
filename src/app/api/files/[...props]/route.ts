import { RowDataPacket } from "mysql2";
import pool from "../../../../db";
import { NextResponse } from "next/server";
import { notFound } from "next/navigation";

export async function GET(request: Request, { params }: { params: { props: string[] } }) {
  const file_path = "/" + params.props.join("/");

  try {
    const query = "select * from blogs where `path` = ?";
    const [rows] = (await pool.query(query, file_path)) as RowDataPacket[];
    const page = rows[0];

    return new NextResponse(page.data, {
      status: 200,
      headers: {
        // Cause a leading slash cause a download for some fucking reason
        "Content-Type": page.mime.replace(/^\//, ""),
      },
    });
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
