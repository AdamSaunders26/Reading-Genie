import {
  GenieContextType,
  genieContext,
} from "@/app/context/ReadingGenieContext";
import { Button } from "@/components/ui/button";
import { parse } from "path";
import { useContext, useEffect, useState } from "react";
import { GrFormNextLink } from "react-icons/gr";

export default function NextButton({
  setCurrentByte,
}: {
  setCurrentByte: React.Dispatch<any>;
}) {
  const {
    setByteCount,
    setByteBatch,
    byteBatch,
    setCurrentMessage,
    messageFormatter,
    setVisibleLike,
  } = useContext<GenieContextType>(genieContext);

  return (
    <Button
      onClick={() => {
        setByteCount((curr) => ++curr);
        setVisibleLike(false);
        setByteBatch((curr) => {
          const copyByteBatch = JSON.stringify(curr);
          const parsedCopy = JSON.parse(copyByteBatch);

          parsedCopy.shift();

          if (parsedCopy.length === 0) {
            console.log("deffo empty");
            return null;
          } else {
            console.log(parsedCopy);
            setCurrentByte(parsedCopy[0]);
            setCurrentMessage(messageFormatter(parsedCopy[0].body));
            return parsedCopy;
          }
        });
      }}
      className="bg-accent active:bg-lightaccent hover:bg-accent  rounded-full text-white text-5xl font-semibold h-fit w-fit p-6 place-self-center"
    >
      <GrFormNextLink />
    </Button>
  );
}
