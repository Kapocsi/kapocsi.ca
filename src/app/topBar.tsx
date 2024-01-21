import Link from "next/link";

export default function TopBar() {
  return (
    <div className="bg-[var(--f\_inv)] pl-1 flex-row py-2 flex justify-between">
      <div className="[&>a]:pr-10 [&>a]:text-[var(--f\_high)] ">
        <Link href="/">Home</Link>
        <Link href="/meta/about">About Me</Link>
      </div>
      <div className="[&>a]:pr-10 [&>a]:text-[var(--f\_high)]">
        <Link href="/meta/colophon">Colophon</Link>
      </div>
    </div>
  );
}
