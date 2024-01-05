import Image from "next/image";

import { ContactSection } from "./ContactSection";

import Articles from "./articles";

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

export default function Home() {
  return (
    <div className="text-center flex flex-col h-screen mx-auto lg:w-2/3 md:w-3/4 md:text-sm items-center">
      <NamePlate />
      <div className="flex-grow text-left text-lg w-1/2">
        <h1 className="text-center font-bold text-xl">Blogs</h1>
        <div>
          <Articles />
        </div>
      </div>
      <div className="align-bottom py-5 sm:columns-3 columns-1">
        <ContactSection />
      </div>
    </div>
  );
}
