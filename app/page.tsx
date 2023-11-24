"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import firebase_init, { addDocument, db, getData } from "./firebase/config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  doc,
  onSnapshot,
  setDoc,
  collection,
  query,
  orderBy,
} from "@firebase/firestore";
// import { addMessage } from "./openai/index";

// const askGenie = async (userId: string, body: string) => {
//   await addMessage(userId, body);
// };

export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [dbData, setDbData] = useState<string[] | null>(null);
  const [userId, setUserId] = useState("");

  const start = async () => {
    const uid = await firebase_init(setDbData);
    setUserId(uid);
    const q = query(
      collection(db, "genie-users", uid, "messages"),
      orderBy("timestamp", "asc")
    );

    onSnapshot(q, (querySnapshot) => {
      const dataArray: string[] = [];

      querySnapshot.forEach((o) => {
        dataArray.push(o.data().body);
      });
      setDbData(dataArray);
      setTimeout(() => {
        sectionRef?.current?.scrollTo({
          top: boxRef?.current?.scrollHeight,
          behavior: "smooth",
        });
      }, 500);
    });
  };

  useEffect(() => {
    start();
    // askGenie("phPg9V9IkRdXcF8PGaX7j1jZ8823", `Yo yo, how's tricks?`);
  }, [inputValue]);

  async function submitHandler(e: FormEvent) {
    e.preventDefault();
    if (inputRef.current) {
      addDocument(inputRef?.current?.value);
      inputRef.current.value = "";
      sectionRef?.current?.scrollTo({
        top: boxRef?.current?.scrollHeight,
        behavior: "smooth",
      });
      // askGenie(userId, inputValue);
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
          <div ref={boxRef} className="flex flex-col gap-3 p-3">
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
