import Link from "next/link";
import { Suspense } from "react";

export default function TopBar() {
  return (
    <div className="flex-row p-2 flex justify-between ">
      <div
        className="
        [&>a]:text-[var(--f\_high)] 
        [&>a:not(:first-child)]:before:content-['|']
        [&>a:not(:first-child)]:before:px-2
        "
      >
        <Link href="/">Home</Link>
        <Link href="/meta/about">About Me</Link>
      </div>
      <div
        className="
        [&>a]:text-[var(--f\_high)] 
        [&>a:not(:first-child)]:before:content-['|']
        [&>a:not(:first-child)]:before:px-2
        "
      >
        <Link href="/meta/colophon">Colophon</Link>
      </div>
    </div>
  );
}
