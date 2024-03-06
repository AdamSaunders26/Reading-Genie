import { TypeAnimation } from "react-type-animation";

interface Props {
  currentMessage: (string | number | (() => void))[];
  currentByte: any | null;
}

export default function Response({ currentMessage, currentByte }: Props) {
  const CURSOR_CLASS_NAME = "custom-type-animation-cursor";
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
