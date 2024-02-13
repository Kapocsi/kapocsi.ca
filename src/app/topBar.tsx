import Link from "next/link";
import { Suspense } from "react";
import Auth from "./auth";
export default function TopBar() {
  return (
    <div className="flex-row p-2 flex justify-between ">
      <div
        className="
        [&>*]:text-[var(--f\_high)] 
        [&>*:not(:first-child)]:before:content-['|']
        [&>*:not(:first-child)]:before:px-2
        "
      >
        <Link href="/">Home</Link>
        <Link href="/meta/about">About Me</Link>
      </div>
      <div
        className="
        [&>*]:text-[var(--f\_high)] 
        [&>*:not(:first-child)]:before:content-['|']
        [&>*:not(:first-child)]:before:px-2
        "
      >
        <Link href="/meta/colophon">Colophon</Link>
        <Auth></Auth>
      </div>
    </div>
  );
}
