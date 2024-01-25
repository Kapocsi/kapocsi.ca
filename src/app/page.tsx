export const dynamic = "force-dynamic";

import { ContactSection } from "@/lib/ContactSection";
import Articles from "./articles";

const NamePlate = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="sm:text-7xl text-3xl pt-10 md:pt-20 font-custom">Thomas Kapocsi</h1>
      <h2 className="text-center py-5 text-sm md:text-xl ">I play Factorio on my Arch machine; I am a stereotype</h2>
    </div>
  );
};

export default function Home() {
  return (
    <div className="text-center flex flex-col  mx-auto md:text-sm items-center">
      <NamePlate />
      <h1 className="pb-2 font-bold text-xl">Blogs</h1>
      <Articles />
    </div>
  );
}
