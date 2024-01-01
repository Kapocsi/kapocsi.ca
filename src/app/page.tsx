import Image from "next/image";

import { ContactSection } from "./ContactSection";
import pool from "../db";
import { RowDataPacket } from "mysql2";
import { parse } from "node-html-parser";
const NamePlate = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="sm:text-7xl text-3xl pt-10 md:pt-20 font-custom">
        Thomas Kapocsi
      </h1>
      <h2 className="text-center py-5 text-sm md:text-xl ">
        VS Code Hater, Strongly Typed Language Lover, Making it all up on the
        spot
      </h2>
    </div>
  );
};

function createFormattedList(arr: string[]): [string, string][] {
  let result: [string, string][] = [["#root", arr[0]]];
  let currentString = "";

  for (let i = 0; i < arr.length; i++) {
    currentString += (i === 0 ? "#" : " > #") + arr[i];
    result.push([currentString, arr[i]]);
  }

  console.log(result);

  return result;
}

async function get_articles() {
  let disp = parse("<div id='root'/>");

  let [articles] = (await pool.query(
    "SELECT path, title, date_added FROM blogs " +
      "where mime like'%text/html%'" +
      "ORDER BY date_modified DESC; ",
  )) as RowDataPacket[];

  articles.forEach((t: RowDataPacket) => {
    let parents = createFormattedList(
      t.path
        .split(/(?<!\\)\//)
        .map((part: string) => part.replace(/\\\//g, "/"))
        .map((part: string) => part.replace(/ /g, "_"))
        .filter((t: string) => t !== ""),
    ).forEach((query) => {
      let parent = disp.querySelector(query[0]);
      console.log(query[0], parent);

      if (!parent) {
        disp.querySelector("#root")?.set_content(`<div id="${query[1]}" />`);
      } else {
        parent.set_content(`<div id="${query[1]}" />`);
      }

      console.log(disp.toString());
    });
  });

  return disp.toString();
}

export default function Home() {
  let fake_articles = get_articles().then((t) => console.log(t));

  return (
    <div className="text-center flex flex-col h-screen mx-auto lg:w-2/3 md:w-3/4 md:text-sm items-center">
      <NamePlate />
      <div className="flex-grow text-left text-lg w-1/2">
        <h1 className="text-center font-bold text-xl">Blogs</h1>
      </div>
      <div className="align-bottom py-5 sm:columns-3 columns-1">
        <ContactSection />
      </div>
    </div>
  );
}
