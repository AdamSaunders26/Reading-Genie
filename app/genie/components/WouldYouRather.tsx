import { Button } from "@/components/ui/button";
import { TypeAnimation } from "react-type-animation";

interface Props {
  currentMessage: (string | number | (() => void))[];
  currentByte: any | null;
  visibleLike: boolean;
}

export default function WouldYouRather({
  currentMessage,
  currentByte,
  visibleLike,
}: Props) {
  const CURSOR_CLASS_NAME = "custom-type-animation-cursor";
  return (
    <div className="flex flex-col gap-4 w-full">
      <TypeAnimation
        cursor={false}
        className={CURSOR_CLASS_NAME}
        sequence={currentMessage}
        wrapper="span"
        repeat={0}
        speed={20}
        style={{
          whiteSpace: "pre-line",
          display: "inline-block",
        }}
      />
      {visibleLike ? (
        <div className=" text-xl flex flex-col gap-4 justify-between">
          <Button className="text-3xl p-6  bg-accent">
            {currentByte.options[0]}
          </Button>
          <Button className="text-3xl p-6 bg-accent">
            {currentByte.options[1]}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
