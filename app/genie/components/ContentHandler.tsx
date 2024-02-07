import { TypeAnimation } from "react-type-animation";
import WouldYouRather from "./WouldYouRather";
import Poll from "./Poll";
import { useContext } from "react";
import {
  GenieContextType,
  genieContext,
} from "@/app/context/ReadingGenieContext";
import Joke from "./Joke";
import Riddle from "./Riddle";

interface Props {
  currentByte: any;
  setCurrentByte: (value: any) => void;
  currentMessage: (string | number | (() => void))[];
}

export default function ContentHandler({
  currentByte,
  setCurrentByte,
  currentMessage,
}: Props) {
  const { visibleLike } = useContext<GenieContextType>(genieContext);
  const CURSOR_CLASS_NAME = "custom-type-animation-cursor";
  if (currentByte.contentType === "none") {
    return (
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
    );
  }
  switch (currentByte.contentType) {
    case "joke":
      return (
        <Joke
          currentMessage={currentMessage}
          currentByte={currentByte}
          visibleLike={visibleLike}
        />
      );
    case "riddle":
      return (
        <Riddle
          currentMessage={currentMessage}
          currentByte={currentByte}
          visibleLike={visibleLike}
        />
      );
    case "would you rather":
      return (
        <WouldYouRather
          currentMessage={currentMessage}
          currentByte={currentByte}
          setCurrentByte={setCurrentByte}
          visibleLike={visibleLike}
        />
      );
    case "poll":
      return (
        <Poll
          currentMessage={currentMessage}
          currentByte={currentByte}
          setCurrentByte={setCurrentByte}
          visibleLike={visibleLike}
        />
      );
    default:
      return (
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
      );
  }
}
