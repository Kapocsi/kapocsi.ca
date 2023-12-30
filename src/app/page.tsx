import Image from "next/image";
import { ReactNode } from "react";

import { ContactSection } from "./ContactSection";

const NamePlate = () => {
  return (
    <div>
      <h1 className="text-9xl pt-20 font-custom">Thomas Kapocsi</h1>
      <h2 className="py-5 text-xl">
        VS Code Hater, Strongly Typed Langauge Lover, Making it all up on the
        spot
      </h2>
    </div>
  );
};

export default function Home() {
  return (
    <div className="text-center flex flex-col h-screen mx-auto w-2/3 ">
      <div className="flex-grow">
        <NamePlate />
      </div>
      <div className="align-bottom py-5 columns-3">
        <ContactSection />
      </div>
    </div>
  );
}
