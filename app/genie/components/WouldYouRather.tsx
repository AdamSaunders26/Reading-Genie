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
  const buttonClass = "text-3xl px-2 whitespace-normal h-fit bg-accent";
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
          <Button className={buttonClass}>{currentByte.options[0]}</Button>
          <Button className={buttonClass}>{currentByte.options[1]}</Button>
        </div>
      ) : null}
    </div>
  );
}
