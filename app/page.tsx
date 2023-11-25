"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { addDocument, db, onData, initFirebase } from "./firebase/config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addMessage } from "./openai/index";
import { FaGear } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa6";
import textlogo from "../public/text-logo.svg";
import { GiStarSwirl } from "react-icons/gi";
import greengenie from "../public/greengenie.svg";
import { FaSpinner } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa";

const askGenie = async (uid: any, body: string) => {
  await addMessage(uid, body);
};

export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [dbData, setDbData] = useState<string[] | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [firstMessage, setFirstMessage] = useState(true);

  const start = async () => {
    const uid = await initFirebase(setUserId);
    onData(userId, setDbData);
    setUserId(uid);
    return uid;
  };

  useEffect(() => {
    start();
    console.log("useEffect", userId);
  }, [userId]);

  async function submitHandler(e: FormEvent) {
    e.preventDefault();
    if (inputRef.current) {
      addDocument(inputRef?.current?.value);
      inputRef.current.value = "";
      sectionRef?.current?.scrollTo({
        top: boxRef?.current?.scrollHeight,
        behavior: "smooth",
      });
      askGenie(userId, inputValue);
    }
  }

  return (
    <main className="flex flex-col justify-between h-[100vh] bg-secondary  w-full">
      <header className="flex justify-between items-center px-4 shadow-lg bg-primary">
        <p className="w-6 h-6"></p>

        <Image src={textlogo} alt="reading genie" className="w-64" />
        <FaGear className="w-6 h-6 text-white" />
      </header>
      <section className="flex flex-1 flex-col overflow-y-scroll justify-between w-full ">
        {firstMessage ? (
          <div
            ref={sectionRef}
            id="fuckyoureact"
            className="overflow-scroll gap-2 overflow-x-hidden w-full h-full"
          >
            <div id="chatbox" ref={boxRef} className="flex flex-col gap-6 p-3">
              <div className="flex w-full">
                <div className="w-full">
                  <p className=" bg-white h-fit w-full rounded-t-md p-3 ">
                    Hi Timmy, I'm the Reading Genie and I know some great jokes
                    and facts about dinosaurs!
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
            <div id="chatbox" ref={boxRef} className="flex flex-col gap-6 p-3">
              {dbData
                ? dbData.map((data, index) => {
                    return (
                      <div className="flex w-full">
                        <div className="w-full">
                          <p
                            key={index}
                            className=" bg-white h-fit w-full rounded-t-md p-3 "
                          >
                            {data}
                          </p>
                          <div className="flex justify-between bg-primary text-white py-2 rounded-b-md">
                            <p className="text-center flex-1 flex items-center justify-center gap-2">
                              <FaThumbsUp /> <span className="pt-1">Like</span>
                            </p>
                            <p className="text-center flex-1 border-l-2 border-white flex items-center justify-center gap-2">
                              <FaThumbsDown />
                              <span className="pt-1">Dislike</span>
                            </p>
                          </div>
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
              onClick={() => {
                setLoading(true);
                askGenie(
                  userId,
                  "Tell me a concise fun fact for an 8 year old"
                ).then(() => {
                  setLoading(false);
                  setFirstMessage(false);
                });
              }}
              className="bg-accent active:bg-lightaccent hover:bg-accent w-full rounded-full text-white text-2xl font-semibold h-12 "
            >
              {loading ? <FaSpinner className="animate-spin" /> : "Show me!"}
            </Button>
          ) : (
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => {
                  setLoading(true);
                  askGenie(
                    userId,
                    "Tell me a concise fun fact for an 8 year old"
                  ).then(() => {
                    setLoading(false);
                  });
                }}
                className="bg-accent active:bg-lightaccent hover:bg-accent w-full rounded-full text-white text-2xl font-semibold h-12 "
              >
                {loading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  "More like that"
                )}
              </Button>
              <Button
                onClick={() => {
                  setLoading(true);
                  askGenie(
                    userId,
                    "Tell me a random thing suitable for an 8 year old"
                  ).then(() => {
                    setLoading(false);
                    setFirstMessage(false);
                  });
                }}
                className="bg-lightaccent active:bg-accent hover:bg-lightaccent border-2 border-accent w-full rounded-full  text-2xl font-semibold h-12 text-accent "
              >
                {loading ? (
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
  );
}
