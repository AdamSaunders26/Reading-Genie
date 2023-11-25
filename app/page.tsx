"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { addDocument, db, onData, initFirebase } from "./firebase/config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addMessage } from "./openai/index";

const askGenie = async (uid:any, body: string) => {
  await addMessage(uid, body);
};

export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [dbData, setDbData] = useState<string[] | null>(null);
  const [userId, setUserId] = useState<string|null>(null);

  const start = async () => {
    const uid = await initFirebase(setUserId);
    onData(userId, setDbData);
    setUserId(uid);
    return uid
  };

  useEffect(() => {
    start();
    console.log('useEffect', userId);
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
    <main className="flex flex-col justify-between h-[100vh] border-2 border-pink-500 w-full">
      <section className="flex flex-col justify-between border-2 border-blue-500 w-full h-full">
        <div
          ref={sectionRef}
          id="fuckyoureact"
          className="overflow-scroll gap-2 overflow-x-hidden h-full"
        >
          <div id="chatbox" ref={boxRef} className="flex flex-col gap-3 p-3">
            {dbData
              ? dbData.map((data, index) => {
                  return (
                    <p
                      key={index}
                      className="border-2 border-green-500 h-fit p-3 rounded-md"
                    >
                      {data}
                    </p>
                  );
                })
              : null}
          </div>
        </div>
        <form onSubmit={submitHandler} className="w-full flex gap-2 p-2">
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
        </form>
      </section>
    </main>
  );
}
