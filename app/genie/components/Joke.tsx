import {
  GenieContextType,
  genieContext,
} from "@/app/context/ReadingGenieContext";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { TypeAnimation } from "react-type-animation";

interface Props {
  currentMessage: (string | number | (() => void))[];
  currentByte: any | null;
  visibleLike: boolean;
}

export default function Joke({
  currentMessage,
  currentByte,
  visibleLike,
}: Props) {
  const { setCurrentMessage, messageFormatter, setVisibleLike } =
    useContext<GenieContextType>(genieContext);
  const CURSOR_CLASS_NAME = "custom-type-animation-cursor";
  const [showJoke, setShowJoke] = useState<boolean>(false);
  console.log(currentByte);
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
        <div className="  flex flex-col gap-4 justify-between">
          {showJoke ? (
            <TypeAnimation
              cursor={false}
              className={CURSOR_CLASS_NAME}
              sequence={messageFormatter(currentByte.answer)}
              wrapper="span"
              repeat={0}
              speed={20}
              style={{
                whiteSpace: "pre-line",
                display: "inline-block",
              }}
            />
          ) : (
            <Button
              onClick={() => {
                setShowJoke(true);
              }}
              className="text-3xl px-2 whitespace-normal h-fit bg-accent"
            >
              Show answer?
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
}
