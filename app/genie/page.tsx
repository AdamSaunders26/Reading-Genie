"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { onData, initFirebase, getUserRecord } from "../firebase/config";
import { addMessage } from "../openai/index";
import { DocumentData } from "firebase/firestore";
import Header from "./components/Header";
import GenerateButton from "./components/GenerateButton";
import TypewriterText from "./components/TypewriterText";
import { responseFormatter } from "../utils";
import { GenieContextType, genieContext } from "../context/ReadingGenieContext";

export default function Home() {
  const [dbData, setDbData] = useState<string[] | null>(null); //is this currently used? Unsure.
  const [userData, setUserData] = useState<DocumentData | null>(null); //Not sure about this either

  const { userId, setUserId } = useContext<GenieContextType>(genieContext);

  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [differentLoading, setDifferentLoading] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<
    (string | (() => void) | number)[] | null
  >(null);
  const [visibleLike, setVisibleLike] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const askGenie = async (uid: any, body: string, instructions: any) => {
    console.log("INSTRUCTIONS", instructions);
    setVisibleLike(false);
    setLoading(true);
    setCurrentMessage(null);
    const message = await addMessage(uid, body, instructions);
    setCurrentMessage(
      responseFormatter(
        message.response,
        contentRef,
        setVisibleLike,
        setLoading
      )
    );
  };

  const start = async () => {
    const uid = await initFirebase();
    const record = await getUserRecord(uid);
    if (record) {
      setUserData(record);
    }
    console.log("RECORD", record);
    onData(userId, setDbData);
    setUserId(uid);
    return uid;
  };

  useEffect(() => {
    start();
  }, [userId]);

  return (
    <main className="flex flex-col  w-full h-[100dvh] bg-secondary  ">
      <Header />
      <section className="flex flex-1 flex-col overflow-hidden justify-between w-full p-4">
        <TypewriterText
          currentMessage={currentMessage}
          contentRef={contentRef}
          loading={loading}
          visibleLike={visibleLike}
        />
        <div className=" w-full flex flex-col mt-4 gap-2">
          <GenerateButton
            setVisibleLike={setVisibleLike}
            setGenerate={setLoading}
            loading={moreLoading}
            setLoading={setMoreLoading}
            askGenie={askGenie}
            userId={userId}
            type="more"
          />
          <GenerateButton
            setVisibleLike={setVisibleLike}
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
  );
}
