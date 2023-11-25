import Image from "next/image";
import lamp from "../../public/lamp.svg";
import textlogo from "../../public/text-logo.svg";
import { FaGear } from "react-icons/fa6";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RewardPage() {
  return (
    <main className="flex flex-col gap-8 h-[100dvh] bg-secondary  w-full ">
      <header className="flex justify-apart items-center  shadow-lg bg-primary">
        <div className="flex gap-2">
          <Image
            src={lamp}
            alt="reading genie lamp"
            className="w-20 -ml-2 pt-1"
          />
          <p className="text-white -ml-3 pt-1">0</p>
        </div>
        <Image src={textlogo} alt="reading genie" className="w-64 pl-6" />
        <div className="w-24 flex items-center justify-center ">
          <FaGear className="w-6 h-6 text-white" />
        </div>
      </header>
      <h1 className="text-4xl font-semibold text-primary text-center px-4 ">
        You earned a Genie lamp!
      </h1>
      <div className="flex items-center">
        <Image
          src={lamp}
          alt="reading genie lamp"
          className="h-[10rem] -ml-6"
        />
      </div>
      <div className="px-8">
        <div className="grid grid-cols-7 w-full h-10 bg-white rounded-full   ">
          <div className="bg-primary rounded-l-full h-10 col-start-1"></div>
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-primary text-center px-4 ">
        1 out of 7 needed to reach your reward.
      </h2>
      <div className="bg-primary mx-4 rounded-lg flex gap-4 items-center px-4">
        <div className="h-20 w-20 my-6 mx-2 bg-white rounded-md flex items-center justify-center text-4xl">
          🍿
        </div>
        <p className="text-white text-3xl">Cinema Trip</p>
      </div>
      <div className="px-4">
        <Link href="/" className="w-full ">
          <Button className="text-white w-full bg-accent hover:bg-accent text-xl rounded-full">
            Show me more!
          </Button>
        </Link>
      </div>
    </main>
  );
}
