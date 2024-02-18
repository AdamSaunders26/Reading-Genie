import { Button } from "@/components/ui/button";
import textlogo from "../public/text-logo.svg";
import ReadingGenieLogo from "./signin/components/ReadingGenieLogo";
import Image from "next/image";
import greengenie from "../public/greengenie.svg";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-evenly items-center h-[100dvh] bg-primary ">
      <Image src={textlogo} alt="reading genie" className="w-max pl-6" />
      <Image src={greengenie} alt="reading genie" className=" max-h-64 mx-2" />
      <Link href="/genie">
        <Button className="w-fit text-white rounded-full shadow-2xl hover:bg-[#4c8b94] active:bg-[#4c8b94] bg-accent text-3xl p-6">
          Click here get started!
        </Button>
      </Link>
    </main>
  );
}
