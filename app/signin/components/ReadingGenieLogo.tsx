import Image from "next/image";
import RGlogo from "../../../public/Reading Genie v.2.png";

export default function ReadingGenieLogo() {
  return (
    <Image
      src={RGlogo}
      alt="Reading Genie logo"
      priority={true}
      placeholder="blur"
      className="w-24 place-self-center"
    />
  );
}
