"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import firebase_init, { addDocument, db, getData } from "./firebase/config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { doc, onSnapshot, setDoc } from "@firebase/firestore";
import { addMessage } from "./openai/index";

const askGenie = async (userId, body) => {
  await addMessage(userId, body);
};

export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [dbData, setDbData] = useState<string[] | null>(null);
  console.log(dbData);

  useEffect(() => {
    firebase_init(setDbData);
    if (sectionRef.current) {
      const sectionScrollHeight: number = sectionRef?.current?.scrollHeight;
      sectionRef?.current?.scrollTo(0, sectionScrollHeight);
    }
    askGenie("phPg9V9IkRdXcF8PGaX7j1jZ8823", `Yo yo, how's tricks?`);
  }, []);

  async function submitHandler(e: FormEvent) {
    e.preventDefault();

    addDocument(inputValue);
    // askGenie("phPg9V9IkRdXcF8PGaX7j1jZ8823", inputValue);
  }

  return (
    <main className="flex flex-col justify-between h-[100vh] border-2 border-pink-500">
      <div className=" border-2 border-red-500 m-4">Settings box</div>
      <section className="h-[50%] flex flex-col  justify-between border-2 border-blue-500 m-4">
        <div
          ref={sectionRef}
          className="overflow-scroll gap-2 overflow-x-hidden"
        >
          {dbData
            ? dbData.map((data) => {
                return (
                  <p className=" border-2 border-green-500 m-4 h-fit">{data}</p>
                );
              })
            : null}
        </div>
        <form onSubmit={submitHandler} className="m-4 w-[80%] flex gap-2 ">
          <Input
            type="text"
            placeholder="Enter message"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
            value={inputValue}
          />
          <Button type="submit">Submit</Button>
        </form>
      </section>
    </main>
  );
}
