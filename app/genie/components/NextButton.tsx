import {
  GenieContextType,
  genieContext,
} from "@/app/context/ReadingGenieContext";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { GrFormNextLink } from "react-icons/gr";

export default function NextButton() {
  const { setByteBatch, byteBatch, setByteCount } =
    useContext<GenieContextType>(genieContext);

  //   const [byteCount, setByteCount] = useState<number>(0);
  //   console.log(byteBatch.length);
  //   console.log(byteCount);

  //   useEffect(() => {
  //     if (byteCount === byteBatch.length) {
  //       console.log("done!");
  //       setByteBatch(null);
  //     }
  //   }, [byteCount]);
  return (
    <Button
      onClick={() => {
        setByteCount((curr) => ++curr);
        // setByteBatch((curr) => {
        //   console.log(curr);
        //   const copyBatch = JSON.parse(JSON.stringify(curr));
        //   copyBatch.push(copyBatch.shift());
        //   console.log(curr);
        //   console.log(copyBatch);
        //   return copyBatch;
        // });
      }}
      className="bg-accent active:bg-lightaccent hover:bg-accent  rounded-full text-white text-5xl font-semibold h-fit w-fit p-6 place-self-center"
    >
      <GrFormNextLink />
    </Button>
  );
}
