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
import NextButton from "./components/NextButton";
import RandomTopics from "../signin/components/RandomTopics";
import { preGenJokes } from "../pregen/jokes";

export default function Home() {
  const [dbData, setDbData] = useState<string[] | null>(null); //is this currently used? Unsure.
  const [userData, setUserData] = useState<DocumentData | null>(null); //Not sure about this either

  const {
    userId,
    setUserId,
    currentMessage,
    setCurrentMessage,
    setVisibleLike,
    setLoading,
    messageFormatter,
    byteBatch,
    setByteBatch,
    byteCount,
    setByteCount,
    selected,
    dispatch,
  } = useContext<GenieContextType>(genieContext);

  const [moreLoading, setMoreLoading] = useState(false);
  const [currentByte, setCurrentByte] = useState<any>({ contentType: "none" });
  const [currentTopic, setCurrentTopic] = useState<string>("");
  // const [byteCount, setByteCount] = useState<number>(0);

  const askGenie = async (uid: any, body: string, instructions: any) => {
    // console.log("INSTRUCTIONS", instructions);
    setVisibleLike(false);
    setLoading(true);
    setCurrentMessage(null);
    const message = await addMessage(uid, body, instructions);
    console.log(message.response);

    const parsedResponse = JSON.parse(message.response);
    setByteBatch(parsedResponse);
    // setCurrentByte(parsedResponse);
    // setCurrentMessage(messageFormatter(parsedResponse.body));
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

  useEffect(() => {
    console.log("ur");

    if (byteBatch) {
      console.log("not broke?");
      if (byteBatch.length === byteCount) {
        console.log(byteCount, "Its too high");
        setByteBatch(null);
        setCurrentByte(null);
        setCurrentMessage(null);
        setByteCount(0);
        setVisibleLike(false);
      } else {
        console.log("maybe?");
        setCurrentByte(byteBatch[byteCount]);
        setCurrentMessage(messageFormatter(byteBatch[byteCount].body));
        setVisibleLike(false);
      }
    }
  }, [byteCount, byteBatch]);
  console.log(currentTopic);
  // console.log(currentMessage);

  return (
    <main className="flex flex-col  w-full h-[100dvh] bg-secondary  ">
      <Header />
      <section className="flex flex-1 flex-col overflow-hidden justify-between w-full p-4">
        {currentMessage ? (
          <TypewriterText
            currentMessage={currentMessage}
            currentByte={currentByte}
            setCurrentByte={setCurrentByte}
          />
        ) : (
          <RandomTopics
            selected={selected}
            dispatch={dispatch}
            currentTopic={currentTopic}
            setCurrentTopic={setCurrentTopic}
          />
        )}
        <div className=" w-full flex flex-col justify-center mt-4 gap-2">
          {/* {currentTopic === "" ? null : byteBatch ? (
            <NextButton />
          ) : (
            <GenerateButton
              setVisibleLike={setVisibleLike}
              setGenerate={setLoading}
              loading={moreLoading}
              setLoading={setMoreLoading}
              askGenie={askGenie}
              userId={userId}
              currentTopic={currentTopic}
            />
          )} */}
          {byteBatch ? (
            <NextButton />
          ) : (
            <GenerateButton
              setVisibleLike={setVisibleLike}
              setGenerate={setLoading}
              loading={moreLoading}
              setLoading={setMoreLoading}
              askGenie={askGenie}
              userId={userId}
              currentTopic={currentTopic}
            />
          )}
        </div>
      </section>
    </main>
  );
}
