import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import genieRoughSpeech from "../../../public/greengenie.svg";
import LikeButtons from "@/app/genie/components/LikeButtons";

interface Props {
  currentMessage: (string | number | (() => void))[] | null;
  loading: boolean;
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  visibleLike: boolean;
}

export default function TypewriterText({
  currentMessage,
  loading,
  contentRef,
  visibleLike,
}: Props) {
  const CURSOR_CLASS_NAME = "custom-type-animation-cursor";

  return (
    <div className="flex flex-col w-full overflow-scroll ">
      <div ref={contentRef} className="flex  justify-between w-full ">
        <div className="flex-col flex">
          <p className="flex flex-col bg-white h-fit  rounded-t-md p-3   text-3xl">
            {currentMessage ? (
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
            ) : loading ? (
              <span className="animate-pulse">
                Hold on tight, a wish is in flight, through the stars, gleaming
                bright.
              </span>
            ) : (
              "Hit the button below to generate a byte."
            )}
          </p>
          <div className="">{visibleLike ? <LikeButtons /> : null}</div>
        </div>
        <Image
          src={genieRoughSpeech}
          alt="reading genie"
          className="w-12 h-12 rounded-full bg-lightaccent ml-2 "
        />
      </div>
      <style global jsx>{`
        .custom-type-animation-cursor::after {
          content: "|";
          animation: cursor 1.1s infinite step-start;
        }
        @keyframes cursor {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
