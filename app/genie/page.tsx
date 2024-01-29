"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { onData, initFirebase, getUserRecord } from "../firebase/config";
import { addMessage } from "../openai/index";
import { DocumentData } from "firebase/firestore";
import Header from "./components/Header";
import GenerateButton from "./components/GenerateButton";
import TypewriterText from "./components/TypewriterText";
import { replaceQuotationMarks, responseFormatter } from "../utils";
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
  const [currentByte, setCurrentByte] = useState<any | null>(null);

  const demoWouldYouRather = {
    contentType: "would you rather",
    body: "Would you rather have a pet dinosaur or a pet dragon?",
    options: ["Pet dinosaur 🦖", "Pet dragon 🐉"],
  };

  const demoPoll = {
    contentType: "poll",
    body: "What's your favourite gymnastics position?",
    options: ["Base", "Flyer", "Backspot"],
    responses: [
      "Bases in cheerleading typically provide the foundation and support for building pyramids and stunts. They are usually the ones who lift and support the flyers.",
      "Flyers are the cheerleaders who are lifted into the air during stunts. They require good balance, flexibility, and trust in their teammates to perform aerial maneuvers.",
      "The backspot in cheerleading is responsible for ensuring the safety and stability of the flyer during stunts. They provide crucial support from the ground and help catch the flyer if necessary.",
    ],
  };

  const askGenie = async (uid: any, body: string, instructions: any) => {
    console.log("INSTRUCTIONS", instructions);
    setVisibleLike(false);
    setLoading(true);
    setCurrentMessage(null);
    const message = await addMessage(uid, body, instructions);
    console.log(message.response);

    const fixedResponse = replaceQuotationMarks(message.response);
    console.log(fixedResponse);
    const parsedResponse = JSON.parse(fixedResponse);
    console.log(parsedResponse);
    // console.log(typeof parsedResponse);
    setCurrentMessage(
      responseFormatter(
        currentByte.body,
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
    // setCurrentByte(demoWouldYouRather);
    setCurrentByte(demoPoll);
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
          currentByte={currentByte}
        />
        <div className=" w-full flex flex-col justify-center mt-4 gap-2">
          <GenerateButton
            setVisibleLike={setVisibleLike}
            setGenerate={setLoading}
            loading={moreLoading}
            setLoading={setMoreLoading}
            askGenie={askGenie}
            userId={userId}
          />
        </div>
      </section>
    </main>
  );
}
