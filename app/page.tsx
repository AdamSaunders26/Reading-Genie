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
import greengenie from "../public/greengenie.svg";

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
        <div
          ref={sectionRef}
          id="fuckyoureact"
          className="overflow-scroll gap-2 overflow-x-hidden h-full"
        >
          <div id="chatbox" ref={boxRef} className="flex flex-col gap-3 p-3">
            {dbData
              ? dbData.map((data, index) => {
                  return (
                    <div className="flex">
                      <p
                        key={index}
                        className=" bg-white h-fit w-full p-3 rounded-md"
                      >
                        {data}
                      </p>
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
          <Button className="bg-accent w-full rounded-full text-white text-lg">
            Show me!
          </Button>
        </div>
      </section>
    </main>
  );
}
