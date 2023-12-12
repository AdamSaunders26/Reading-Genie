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
import LikeButtons from "./components/LikeButtons";
import { DocumentData } from "firebase/firestore";
import SettingsButton from "./components/SettingsButton";
import { TypeAnimation } from "react-type-animation";
import ScrollToBottom from "react-scroll-to-bottom";
import Header from "./components/Header";
import GenerateButton from "./components/GenerateButton";
import TypewriterAnimation from "./components/TypewriterAnimation";
import TypewriteText, { scrollToBottom } from "./components/TypewriterText";
import TypewriterText from "./components/TypewriterText";
import { responseFormatter } from "../utils";

export default function Home() {
  const [dbData, setDbData] = useState<string[] | null>(null); //is this currently used? Unsure.
  const [userData, setUserData] = useState<DocumentData | null>(null); //Not sure about this either

  const [userId, setUserId] = useState<string | null>(null);
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
        <div className=" w-full flex flex-col gap-2">
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
