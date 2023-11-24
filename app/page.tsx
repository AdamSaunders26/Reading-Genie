"use client";

import OpenAI from "openai";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import firebase_init, { addDocument, db, getData } from "./firebase/config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  doc,
  onSnapshot,
  setDoc,
  getDoc,
  addDoc,
  collection,
  query,
  orderBy,
  Timestamp
} from "@firebase/firestore";


export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [dbData, setDbData] = useState<string[] | null>(null);
  const [userId, setUserId] = useState("");

  const configuration = {
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  };

  const askGenie = async (userId: string, body: string) => {
    await addMessage(userId, body);
  };

  async function createRun(assistant_id: string, thread_id: string) {
    try {
      const runJob = await client.beta.threads.runs.create(thread_id, {
        assistant_id,
      });
      console.log("RUN CREATED");
      return runJob;
    } catch (e) {
      console.log("ERROR CREATING RUN", e);
    }
  }

  async function checkRun(thread_id: string, run_id: string) {
    const run = await client.beta.threads.runs.retrieve(thread_id, run_id);
    return (
      run.status == "completed" ||
      run.status == "failed" ||
      run.status == "expired"
    );
  }

  async function loopRunAndReturn(thread_id: string, run_id: string) {
    let returned = false;
    while (!returned) {
      returned = await checkRun(thread_id, run_id);
    }
    const messages = await client.beta.threads.messages.list(thread_id);
    // @ts-ignore
    return messages.data[0].content[0].text.value;
  }

  async function getThreadId(userSid: string) {
    const dbRecord = await getDoc(doc(db, "genie-users", userSid));
    if (!dbRecord.exists()) return null;
    const record = dbRecord.data();
    if (!record.hasOwnProperty("thread_id")) {
      const thread = await createThread(userSid);
      await setDoc(
        doc(db, "genie-users", userSid),
        { thread_id: thread?.id },
        { merge: true }
      );
      return thread?.id;
    } else {
      return record.thread_id;
    }
  }

  async function createThread(userSid = "") {
    try {
      const thread = await client.beta.threads.create({
        metadata: {
          userSid,
        },
      });
      console.log("THREAD CREATED");
      return thread;
    } catch (e) {
      console.log("ERROR CREATING THREAD", e);
    }
  }

  async function createMessage(thread_id: string, content: string) {
    const messageObject = {
      role: "user",
      content,
    };

    try {
      const message = await client.beta.threads.messages.create(
        thread_id,
        // @ts-ignore
        messageObject
      );
      console.log("MESSAGE CREATED");
      return message;
    } catch (e) {
      console.log("ERROR CREATING MESSAGE", e);
    }
  }

  async function addMessage(userSid: string, body: string) {
    let returned = false;
    let thread_id = await getThreadId(userSid);

    const addedMessage = await createMessage(thread_id, body);

    // @ts-ignore
    const runStarted = await createRun(assistantId, thread_id);
    // @ts-ignore
    const response = await loopRunAndReturn(thread_id, runStarted.id);

    await addDoc(collection(db, "genie-users", userSid, "messages"), {
      body: response,
      timestamp: Timestamp.now(),
    });

    console.log("ASKING", userSid, body, response);

    return {
      response,
    };
  }

  const assistantId = process.env.NEXT_PUBLIC_ASSISTANT_KEY;

  const client = new OpenAI(configuration);


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
