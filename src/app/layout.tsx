import type { Metadata } from "next";
import { Old_Standard_TT } from "next/font/google";
import "./globals.css";
import HundredRabbitsThemeDrop from "@/lib/100rTheme";
import { Analytics } from "@vercel/analytics/react";

const old_standard_tt = Old_Standard_TT({
  subsets: ["latin-ext"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Thomas Kapocsi Home",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en">
        <body className={old_standard_tt.className + " bg-[--background]"} suppressHydrationWarning={true}>
          <HundredRabbitsThemeDrop>{children}</HundredRabbitsThemeDrop>
          <Analytics />
        </body>
      </html>
    </>
  );
}
