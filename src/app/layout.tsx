import type { Metadata } from "next";
import { Old_Standard_TT } from "next/font/google";
import "./globals.css";
import HundredRabbitsThemeDrop from "@/lib/100rTheme";
import { ContactSection } from "@/lib/ContactSection";
import TopBar from "./topBar";
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
        <body
          className={old_standard_tt.className + " bg-[--background] min-h-screen flex flex-col "}
          suppressHydrationWarning={true}
        >
          <TopBar></TopBar>
          <div className="flex-grow">
            <HundredRabbitsThemeDrop>
              <div className="w-1/2 m:w-3/4 mx-auto">{children}</div>
            </HundredRabbitsThemeDrop>
          </div>
          <div className="align-bottom py-5 sm:columns-3 columns-1">
            <ContactSection />
          </div>
        </body>
      </html>
    </>
  );
}
