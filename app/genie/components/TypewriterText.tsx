import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import genieRoughSpeech from "../../../public/greengenie.svg";
import LikeButtons from "@/app/genie/components/LikeButtons";
import LoadingBubble from "./LoadingBubble";
import { IoTriangle } from "react-icons/io5";

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
      <div
        ref={contentRef}
        className="flex  justify-between overflow-x-hidden w-full "
      >
        <div className="flex-col flex w-full">
          <p
            className={
              loading
                ? `flex flex-col  h-fit w-full rounded-t-md p-3   text-3xl`
                : `flex flex-col bg-white h-fit w-full rounded-t-md p-3   text-3xl`
            }
          >
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
              <LoadingBubble />
            ) : (
              "Hit the button below to generate a byte."
            )}
          </p>
          <div className="">{visibleLike ? <LikeButtons /> : null}</div>
        </div>
        <div className={loading ? "mt-[18rem]" : "flex"}>
          {loading ? null : (
            <IoTriangle className="text-white rotate-90 -ml-1 mt-2 h-6 w-6" />
          )}
          <Image
            src={genieRoughSpeech}
            alt="reading genie"
            className={
              loading
                ? "w-12 h-12 rounded-full  place-self-end bg-lightaccent "
                : "w-12 h-12 rounded-full  bg-lightaccent "
            }
          />
        </div>
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
