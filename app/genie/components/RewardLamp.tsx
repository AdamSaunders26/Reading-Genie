import Image from "next/image";
import lamp from "../../../public/lamp.svg";
import { Button } from "@/components/ui/button";

export default function RewardLamp({
  setShowLamp,
}: {
  setShowLamp: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flex flex-col text-5xl justify-around h-full font-bold items-center text-center text-geniePurple-500">
      <h1>You've earned a Genie Lamp!</h1>
      <Image src={lamp} alt="reading genie lamp" className="w-full " />
      <p className="text-3xl">I'm not finished! Give me more.</p>
      <Button
        className="text-white text-3xl p-6"
        onClick={() => {
          setShowLamp(false);
        }}
      >
        Change topic?
      </Button>
    </div>
  );
}
