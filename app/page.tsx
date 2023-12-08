"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import {
  addDocument,
  db,
  onData,
  initFirebase,
  getUserRecord,
} from "./firebase/config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addMessage } from "./openai/index";
import { FaThumbsDown, FaGear, FaThumbsUp, FaSpinner } from "react-icons/fa6";
import textlogo from "../public/text-logo.svg";
import { GiStarSwirl } from "react-icons/gi";
import greengenie from "../public/greengenie.svg";
import genieRoughSpeech from "../public/greengenie.svg";
import lamp from "../public/lamp.svg";
import { useRouter, useSearchParams } from "next/navigation";
import LikeButtons from "./LikeButtons";
import { DocumentData } from "firebase/firestore";
import SettingsButton from "./components/SettingsButton";
import { TypeAnimation } from "react-type-animation";
import ScrollToBottom from "react-scroll-to-bottom";

const askGenie = async (uid: any, body: string, instructions: any) => {
  console.log("asdas", instructions);
  await addMessage(uid, body, instructions);
};

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
  const [firstMessage, setFirstMessage] = useState(true);
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [clicks, setClicks] = useState(0);

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
    if (skipIntro) {
      setFirstMessage(false);
    }
  }, [userId]);

  if (clicks == 3) {
    router.push("/reward");
  }

  async function submitHandler(e: FormEvent) {
    e.preventDefault();
    if (inputRef.current) {
      addDocument(inputRef?.current?.value);
      inputRef.current.value = "";
      sectionRef?.current?.scrollTo({
        top: boxRef?.current?.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  const [visibileLike, setVisibleLike] = useState(false);
  const CURSOR_CLASS_NAME = "custom-type-animation-cursor";

  const contentRef = useRef<HTMLDivElement | null>(null);

  function scrollToBottom() {
    if (contentRef.current) {
      contentRef.current.scrollIntoView(false);
    }
  }
  let sequenceArray: [string, () => void, number][] | null = null;
  function responseFormatter() {
    if (dbData) {
      const response = dbData[dbData.length - 1];
      const splitResponse = response.split(" ");
      const delay = 100;
      let previousPhrase = "";
      sequenceArray = splitResponse.map(
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
      console.log(sequenceArray);
    }
  }
  responseFormatter();

  function randoNum(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className=" h-[100dvh] ">
      <main className="flex flex-col justify-center  h-[100dvh] bg-secondary  ">
        <header className="flex justify-between items-center shadow-lg bg-primary w-full">
          <div className="flex gap-2">
            <Image
              src={lamp}
              alt="reading genie lamp"
              className="w-20 -ml-2 pt-1"
            />
            <p className="text-white -ml-3 pt-1">0</p>
          </div>
          <Image src={textlogo} alt="reading genie" className="w-64 pl-6" />
          <div className="w-24 flex items-center justify-center">
            <SettingsButton />
          </div>
        </header>
        <section className="flex flex-1 flex-col overflow-hidden justify-between w-full ">
          {firstMessage ? (
            <div
              ref={sectionRef}
              id="fuckyoureact"
              className="overflow-scroll gap-2 overflow-x-hidden w-full h-full"
            >
              <div
                id="chatbox"
                ref={boxRef}
                className="flex flex-col gap-6 pl-3 py-3"
              >
                <div className="flex w-full">
                  <div className="w-full">
                    <p className="text-2xl bg-white h-fit w-full rounded-t-md p-3 ">
                      Hi Nieve, hit the button below to get started!
                    </p>
                  </div>
                  <Image
                    src={greengenie}
                    alt="reading genie"
                    className="w-12 h-12 rounded-full bg-lightaccent mx-2"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div
              ref={sectionRef}
              id="fuckyoureact"
              className="overflow-scroll gap-2 overflow-x-hidden w-full h-full"
            >
              <div
                id="chatbox"
                ref={boxRef}
                className="flex flex-col gap-6 p-3"
              >
                <div className="flex w-full">
                  <div>
                    <div className="flex w-full">
                      <p className="flex bg-white h-fit w-full rounded-t-md p-3 mr-12 text-3xl">
                        {dbData && sequenceArray ? (
                          <TypeAnimation
                            ref={contentRef}
                            cursor={false}
                            className={CURSOR_CLASS_NAME}
                            // splitter={(str) => str.split(/(?= )/)}
                            sequence={sequenceArray.flat()}
                            // sequence={[
                            //   dbData[dbData.length - 1],
                            //   (el) => el?.classList.remove(CURSOR_CLASS_NAME),
                            //   () => {
                            //     setVisibleLike(true);
                            //   },
                            //   3000,
                            // ]}
                            wrapper="span"
                            repeat={0}
                            speed={70}
                            // speed={{
                            //   type: "keyStrokeDelayInMs",
                            //   value: randoNum(400, 800),
                            // }}
                            style={{
                              whiteSpace: "pre-line",
                              display: "inline-block",
                            }}
                          />
                        ) : null}
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
              </div>
            </div>
          )}
          {/* <form onSubmit={submitHandler} className="w-full flex gap-2 p-2">
          <div className="w-full rounded-l flex">
            <Input
              ref={inputRef}
              className="rounded-r-none"
              type="text"
              placeholder="Enter message"
            />
            <Button className="rounded-l-none" type="submit">
              Submit
            </Button>
          </div>
        </form> */}
          <div className="m-4 w-full pr-8">
            {firstMessage ? (
              <Button
                onClick={async () => {
                  setLoading(true);
                  const lengths = {
                    Short: "one or two sentences",
                    Medium: "a paragraph",
                    Long: "several paragraphs",
                  };
                  const nowData = await getUserRecord(userId);
                  if (nowData?.contentLengths) {
                    const length = Object.keys(nowData?.contentLengths).length;
                    const lengths: {
                      Short: string;
                      Medium: string;
                      Long: string;
                    } = {
                      Short: "one or two sentences",
                      Medium: "a paragraph",
                      Long: "several paragraphs",
                    };
                    console.log(
                      lengths[
                        nowData?.contentLengths[
                          length - 1
                        ] as keyof typeof lengths
                      ],
                      length
                    );
                    const textLength =
                      lengths[
                        nowData?.contentLengths[
                          length - 1
                        ] as keyof typeof lengths
                      ];
                    const instructions = `In ${textLength}, tell me some ${
                      nowData?.contentTypes[0]
                    } about ${nowData?.interests.join(" or ")}`;
                    askGenie(userId, instructions, "instructions").then(() => {
                      setLoading(false);
                      setFirstMessage(false);
                    });
                  }
                }}
                className="bg-accent active:bg-lightaccent hover:bg-accent w-full rounded-full text-white text-2xl font-semibold h-12 "
              >
                {loading ? <FaSpinner className="animate-spin" /> : "Show me!"}
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Button
                  onClick={async () => {
                    setMoreLoading(true);
                    const lengths = {
                      Short: "one or two sentences",
                      Medium: "a paragraph",
                      Long: "several paragraphs",
                    };
                    const nowData = await getUserRecord(userId);
                    if (nowData?.contentLengths) {
                      const length = Object.keys(
                        nowData?.contentLengths
                      ).length;
                      console.log(
                        lengths[
                          nowData?.contentLengths[
                            length - 1
                          ] as keyof typeof lengths
                        ],
                        length
                      );
                      const textLength =
                        lengths[
                          nowData?.contentLengths[
                            length - 1
                          ] as keyof typeof lengths
                        ];
                      const instructions = `In ${textLength}, tell me some ${nowData?.contentTypes.join(
                        " or "
                      )} about ${nowData?.interests.join(" or ")}`;
                      askGenie(userId, instructions, "instructions").then(
                        () => {
                          setMoreLoading(false);
                          setFirstMessage(false);
                        }
                      );
                    }
                  }}
                  className="bg-accent active:bg-lightaccent hover:bg-accent w-full rounded-full text-white text-2xl font-semibold h-12 "
                >
                  {moreLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    "More like that"
                  )}
                </Button>
                <Button
                  onClick={async () => {
                    setDifferentLoading(true);
                    const lengths = {
                      Short: "one or two sentences",
                      Medium: "a paragraph",
                      Long: "several paragraphs",
                    };
                    const nowData = await getUserRecord(userId);
                    if (nowData?.contentLengths) {
                      const length = Object.keys(
                        nowData?.contentLengths
                      ).length;
                      console.log(
                        lengths[
                          nowData?.contentLengths[
                            length - 1
                          ] as keyof typeof lengths
                        ],
                        length
                      );
                      const textLength =
                        lengths[
                          nowData?.contentLengths[
                            length - 1
                          ] as keyof typeof lengths
                        ];
                      const instructions = `In ${textLength}, tell me some ${nowData?.contentTypes.join(
                        " or "
                      )} about ${nowData?.interests.join(
                        " or "
                      )}. But be really creative`;

                      askGenie(userId, instructions, "instructions").then(
                        () => {
                          setDifferentLoading(false);
                          setFirstMessage(false);
                        }
                      );
                    }
                  }}
                  className="bg-lightaccent active:bg-accent hover:bg-lightaccent border-2 border-accent w-full rounded-full text-2xl font-semibold h-12 text-accent "
                >
                  {differentLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    "Something different"
                  )}
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
