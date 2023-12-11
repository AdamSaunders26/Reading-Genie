"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import {
  addDocument,
  db,
  onData,
  initFirebase,
  getUserRecord,
} from "../firebase/config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addMessage } from "../openai/index";
import { FaThumbsDown, FaGear, FaThumbsUp, FaSpinner } from "react-icons/fa6";
import textlogo from "../../public/text-logo.svg";
import { GiStarSwirl } from "react-icons/gi";
import greengenie from "../../public/greengenie.svg";
import genieRoughSpeech from "../../public/greengenie.svg";
import lamp from "../../public/lamp.svg";
import { useRouter, useSearchParams } from "next/navigation";
import LikeButtons from "../LikeButtons";
import { DocumentData } from "firebase/firestore";
import SettingsButton from "../components/SettingsButton";
import { TypeAnimation } from "react-type-animation";
import ScrollToBottom from "react-scroll-to-bottom";
import Header from "./components/Header";
import GenerateButton from "./components/GenerateButton";
import TypewriterAnimation from "./components/TypewriterAnimation";

export default function Home() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [dbData, setDbData] = useState<string[] | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [differentLoading, setDifferentLoading] = useState(false);

  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [clicks, setClicks] = useState(0);
  const [currentMessage, setCurrentMessage] = useState<
    (string | (() => void) | number)[] | null
  >(null);

  const askGenie = async (uid: any, body: string, instructions: any) => {
    console.log("asdas", instructions);
    setLoading(true);
    setCurrentMessage(null);
    const message = await addMessage(uid, body, instructions);

    setCurrentMessage(responseFormatter(message.response));
  };

  const start = async () => {
    const uid = await initFirebase();
    console.log(uid);
    const record = await getUserRecord(uid);
    if (record) {
      setUserData(record);
    }
    console.log("RECORD", record);
    onData(userId, setDbData);
    setUserId(uid);
    return uid;
  };

  const searchParams = useSearchParams();
  const skipIntro = searchParams.get("skip") == "true";
  console.log(skipIntro);

  useEffect(() => {
    start();
    console.log("useEffect", userId);
  }, [userId]);

  const [visibileLike, setVisibleLike] = useState(false);
  const CURSOR_CLASS_NAME = "custom-type-animation-cursor";

  const contentRef = useRef<HTMLDivElement | null>(null);

  function scrollToBottom() {
    if (contentRef.current) {
      contentRef.current.scrollIntoView(false);
    }
  }

  function responseFormatter(message: string) {
    const splitResponse = message.split(" ");
    const delay = 100;
    let previousPhrase = "";
    const sequenceArray = splitResponse.map(
      (word): [string, () => void, number] => {
        previousPhrase += ` ${word}`;
        return [
          previousPhrase,
          () => {
            scrollToBottom();
          },
          delay,
        ];
      }
    );
    setLoading(false);
    return sequenceArray.flat();
  }
  console.log(!currentMessage);

  function randoNum(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className=" h-[100dvh] ">
      <main className="flex flex-col justify-center  h-[100dvh] bg-secondary  ">
        <Header />
        <section className="flex flex-1 flex-col overflow-hidden justify-between w-full ">
          <div
            ref={sectionRef}
            id="fuckyoureact"
            className="overflow-scroll gap-2 overflow-x-hidden w-full h-full"
          >
            <div id="chatbox" ref={boxRef} className="flex flex-col gap-6 p-3">
              <div className="flex w-full">
                <div>
                  <div className="flex w-full">
                    <p className="flex bg-white h-fit w-full rounded-t-md p-3 mr-12 text-3xl">
                      {currentMessage ? (
                        <TypeAnimation
                          ref={contentRef}
                          cursor={false}
                          className={CURSOR_CLASS_NAME}
                          sequence={currentMessage}
                          wrapper="span"
                          repeat={0}
                          speed={70}
                          style={{
                            whiteSpace: "pre-line",
                            display: "inline-block",
                          }}
                        />
                      ) : loading ? (
                        <span className="animate-pulse">
                          Hold on tight, a wish in flight, through the stars,
                          gleaming bright.
                        </span>
                      ) : (
                        "Hit the button below to generate a byte."
                      )}
                    </p>
                    <div>
                      <Image
                        src={genieRoughSpeech}
                        alt="reading genie"
                        className="w-12 h-12 rounded-full bg-lightaccent mx-2 fixed top-20 right-0"
                      />
                    </div>
                  </div>
                  <div className="mr-12">
                    {visibileLike ? <LikeButtons /> : null}
                  </div>
                </div>
                <TypewriterAnimation />
              </div>
            </div>
          </div>
          <div className="m-4 w-full pr-8 flex flex-col gap-2">
            <GenerateButton
              setGenerate={setLoading}
              loading={moreLoading}
              setLoading={setMoreLoading}
              askGenie={askGenie}
              userId={userId}
              type="more"
            />
            <GenerateButton
              setGenerate={setLoading}
              loading={differentLoading}
              setLoading={setDifferentLoading}
              askGenie={askGenie}
              userId={userId}
              type="different"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
