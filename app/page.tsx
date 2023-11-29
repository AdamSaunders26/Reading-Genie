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
import { FaGear } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa6";
import textlogo from "../public/text-logo.svg";
import { GiStarSwirl } from "react-icons/gi";
import greengenie from "../public/greengenie.svg";
import lamp from "../public/lamp.svg";
import { FaSpinner } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa";
import { useRouter } from "next/navigation";
import LikeButtons from "./LikeButtons";

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
  const [userData, setUserData] = useState(null);
  const [clicks, setClicks] = useState(0);

  const start = async () => {
    const uid = await initFirebase();
    console.log(uid);
    const record = await getUserRecord(uid);
    setUserData(record);
    console.log("RECORD", record);
    onData(userId, setDbData);
    setUserId(uid);
    return uid;
  };

  useEffect(() => {
    start();
    console.log("useEffect", userId);
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
      // console.log('213423', instructions)
      // askGenie(userId, inputValue, 'ehllo?');
    }
  }

  return (
    <div className="flex justify-center h-[100dvh] ">
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
            <FaGear className="w-6 h-6 text-white" />
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
                    <p className=" bg-white h-fit w-full rounded-t-md p-3 ">
                      Hi Timmy, hit the button below to get started!
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
                {dbData
                  ? dbData.map((data, index) => {
                      return (
                        <div key={index} className="flex w-full">
                          <div className="w-full">
                            <p
                              key={index}
                              className=" bg-white h-fit w-full rounded-t-md p-3 "
                            >
                              {data}
                            </p>
                            <LikeButtons />
                          </div>
                          <Image
                            src={greengenie}
                            alt="reading genie"
                            className="w-12 h-12 rounded-full bg-lightaccent mx-2"
                          />
                        </div>
                      );
                    })
                  : null}
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
                          setLoading(false);
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
                          setLoading(false);
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
