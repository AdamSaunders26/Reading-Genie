import Image, { StaticImageData } from "next/image";
import { TypeAnimation } from "react-type-animation";
import LikeButtons from "@/app/genie/components/LikeButtons";
import LoadingBubble from "./LoadingBubble";
import { IoTriangle } from "react-icons/io5";
import WouldYouRather from "./WouldYouRather";
import { useState, useEffect, useContext } from "react";
import ContentHandler from "./ContentHandler";
import TypeWriterIcon from "./TypewriterIcon";
import {
  GenieContextType,
  genieContext,
} from "@/app/context/ReadingGenieContext";

interface Props {
  currentMessage: (string | number | (() => void))[] | null;
  currentByte: any | null;
  setCurrentByte: (value: any) => void;
}

export default function TypewriterText({
  currentMessage,
  currentByte,
  setCurrentByte,
}: Props) {
  const { contentRef, loading, visibleLike } =
    useContext<GenieContextType>(genieContext);
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
              <ContentHandler
                currentByte={currentByte}
                setCurrentByte={setCurrentByte}
                currentMessage={currentMessage}
              />
            ) : loading ? (
              <LoadingBubble />
            ) : (
              "Add today’s topic in settings and then hit the button below to generate your daily 6 bytes."
            )}
          </div>
          <div className="">{visibleLike ? <LikeButtons /> : null}</div>
        </div>
        <div className={loading ? "mt-[18rem]" : "flex"}>
          {loading ? null : (
            <IoTriangle className="text-white rotate-90 -ml-1 mt-2 h-6 w-6" />
          )}
          <TypeWriterIcon contentType={currentByte.contentType}/>
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
