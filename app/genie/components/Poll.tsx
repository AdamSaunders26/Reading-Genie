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
  setCurrentByte: (value: any) => void;
  visibleLike: boolean;
}

export default function Poll({
  currentMessage,
  currentByte,
  setCurrentByte,
  visibleLike,
}: Props) {
  const { setCurrentMessage, messageFormatter, setVisibleLike } =
    useContext<GenieContextType>(genieContext);
  const CURSOR_CLASS_NAME = "custom-type-animation-cursor";

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
        <div className=" text-xl flex flex-col gap-4 justify-between">
          {currentByte.options.map((el: string, index: number) => {
            return (
              <Button
                key={index}
                className="text-3xl px-2 whitespace-normal h-fit bg-accent"
                onClick={() => {
                  const responseByte = {
                    contentType: "poll response",
                    body: currentByte.optionFacts[index],
                  };

                  setCurrentByte(responseByte);
                  setCurrentMessage(messageFormatter(responseByte.body));
                  setVisibleLike(false);
                }}
              >
                {currentByte.options[index]}
              </Button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
