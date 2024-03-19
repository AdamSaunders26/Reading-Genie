import Image, { StaticImageData } from "next/image";
import { useContext } from "react";
import {
  GenieContextType,
  genieContext,
} from "@/app/context/ReadingGenieContext";
import genieRoughSpeech from "../../../public/greengenie.svg";
import factIcon from "../../../public/fact.png";
import jokeIcon from "../../../public/joke.png";
import pollIcon from "../../../public/poll.png";
import riddleIcon from "../../../public/riddle.png";
import trueOrFalseIcon from "../../../public/trueOrFalse.png";
import wouldYouRatherIcon from "../../../public/wouldYouRather.png";

interface Props {
  contentType: string;
}

export default function TypeWriterIcon({ contentType }: Props) {
  const { loading } = useContext<GenieContextType>(genieContext);

  let typewriterIcon: StaticImageData;
  switch (contentType) {
    case "fact":
      typewriterIcon = factIcon;
      break;
    case "joke":
      typewriterIcon = jokeIcon;
      break;
    case "poll":
      typewriterIcon = pollIcon;
      break;
    case "poll response":
      typewriterIcon = pollIcon;
      break;
    case "riddle":
      typewriterIcon = riddleIcon;
      break;
    case "true or false":
      typewriterIcon = trueOrFalseIcon;
      break;
    case "would you rather":
      typewriterIcon = wouldYouRatherIcon;
      break;
    case "would you rather response":
      typewriterIcon = wouldYouRatherIcon;
      break;
    default:
      typewriterIcon = genieRoughSpeech;
      break;
  }

  return (
    <Image
      src={typewriterIcon}
      alt="reading genie"
      className={
        loading
          ? "w-12 h-12 rounded-full  place-self-end bg-lightaccent "
          : "w-12 h-12 rounded-full  bg-lightaccent "
      }
    />
  );
}
