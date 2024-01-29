import { TypeAnimation } from "react-type-animation";
import WouldYouRather from "./WouldYouRather";
import Poll from "./Poll";

interface Props {
  currentByte: any;
  currentMessage: (string | number | (() => void))[];
  visibleLike: boolean;
}

export default function ContentHandler({
  currentByte,
  currentMessage,
  visibleLike,
}: Props) {
  const CURSOR_CLASS_NAME = "custom-type-animation-cursor";
  if (!currentByte) {
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
    case "would you rather":
      return (
        <WouldYouRather
          currentMessage={currentMessage}
          currentByte={currentByte}
          visibleLike={visibleLike}
        />
      );
    case "poll":
      return (
        <Poll
          currentMessage={currentMessage}
          currentByte={currentByte}
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
