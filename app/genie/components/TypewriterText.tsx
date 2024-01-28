import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import genieRoughSpeech from "../../../public/greengenie.svg";
import LikeButtons from "@/app/genie/components/LikeButtons";
import LoadingBubble from "./LoadingBubble";
import { IoTriangle } from "react-icons/io5";
import WouldYouRather from "./WouldYouRather";
import { useState, useEffect } from "react";

interface Props {
  currentMessage: (string | number | (() => void))[] | null;
  loading: boolean;
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  visibleLike: boolean;
  currentByte: any | null;
}

export default function TypewriterText({
  currentMessage,
  loading,
  contentRef,
  visibleLike,
  currentByte,
}: Props) {
  const CURSOR_CLASS_NAME = "custom-type-animation-cursor";
  const [currentContent, setCurrentContent] = useState<any>(
    <TypeAnimation
      cursor={false}
      className={CURSOR_CLASS_NAME}
      sequence={currentMessage as (string | number | (() => void))[]}
      wrapper="span"
      repeat={0}
      speed={20}
      style={{
        whiteSpace: "pre-line",
        display: "inline-block",
      }}
    />
  );
  console.log(currentContent);
  useEffect(() => {
    console.log(currentByte);
    switch (currentByte?.contentType) {
      case "would you rather":
        console.log("whoop");
        setCurrentContent(
          <WouldYouRather
            currentMessage={
              currentMessage as (string | number | (() => void))[]
            }
            currentByte={currentByte}
            visibleLike={visibleLike}
          />
        );
      default:
        null;
    }
    console.log(currentContent);
  }, [currentByte]);

  return (
    <div className="flex flex-col w-full overflow-scroll ">
      <div
        ref={contentRef}
        className="flex  justify-between overflow-x-hidden w-full "
      >
        <div className="flex-col flex w-full">
          <div
            className={
              loading
                ? `flex flex-col  h-fit w-full rounded-t-md p-3   text-3xl`
                : `flex flex-col bg-white h-fit w-full rounded-t-md p-3   text-3xl`
            }
          >
            {currentMessage ? (
              currentContent
            ) : loading ? (
              <LoadingBubble />
            ) : (
              "Hit the button below to generate a byte."
            )}
          </div>
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
