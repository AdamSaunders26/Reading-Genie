import Image from "next/image";
import lamp from "../../../public/lamp.svg";
import textlogo from "../../../public/text-logo.svg";
import SettingsButton from "@/app/components/SettingsButton";

export default function Header() {
  return (
    <header className="flex justify-between items-center shadow-lg bg-primary w-full">
      <div className="flex gap-2">
        <Image
          src={lamp}
          alt="reading genie lamp"
          className="w-20 -ml-2 pt-1"
        />
        <p className="text-white -ml-3 pt-1">0</p>
      </div>
      <Image src={textlogo} alt="reading genie" className="w-64 pl-6" />
      <div className="w-24 flex items-center justify-center">
        <SettingsButton />
      </div>
    </header>
  );
}
