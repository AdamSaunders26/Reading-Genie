import {
  GenieContextType,
  genieContext,
} from "@/app/context/ReadingGenieContext";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { GrFormNextLink } from "react-icons/gr";

export default function NextButton() {
  const { setByteCount } = useContext<GenieContextType>(genieContext);

  return (
    <Button
      onClick={() => {
        setByteCount((curr) => ++curr);
      }}
      className="bg-accent active:bg-lightaccent hover:bg-accent  rounded-full text-white text-5xl font-semibold h-fit w-fit p-6 place-self-center"
    >
      <GrFormNextLink />
    </Button>
  );
}
