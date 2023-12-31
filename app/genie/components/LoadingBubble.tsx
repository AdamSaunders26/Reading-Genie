import Image from "next/image";
import bubble from "../../../public/animatedBubble.svg";

export default function LoadingBubble() {
  return (
    <Image
      src={bubble}
      alt="loading bubble"
      className="left-0 w-max absolute right-0 top-12 "
    />
  );
}
