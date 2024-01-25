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
        <body className={old_standard_tt.className + " bg-[--background] "} suppressHydrationWarning={true}>
          <HundredRabbitsThemeDrop>
            <div className="min-h-screen flex flex-col">
              <TopBar />
              <div className="flex-grow">
                <div className="md:w-1/2 p-3 mx-auto">{children}</div>
              </div>
              <div className="align-bottom pd-5 sm:columns-3 columns-1 bg-[var(--b\_high)]">
                <ContactSection />
              </div>
            </div>
          </HundredRabbitsThemeDrop>
        </body>
      </html>
    </>
  );
}
