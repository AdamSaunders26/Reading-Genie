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
import contentLoader from "../pregen/contentLoader";
import { parse } from "path";

export default function Home() {
  const [dbData, setDbData] = useState<string[] | null>(null); //is this currently used? Unsure.
  const [userData, setUserData] = useState<DocumentData | null>(null); //Not sure about this either

  const {
    userId,
    setUserId,
    currentMessage,
    setCurrentMessage,
    visibleLike,
    setVisibleLike,
    setLoading,
    messageFormatter,
    byteBatch,
    setByteBatch,
    byteCount,
    setByteCount,
    selected,
    dispatch,
    completedBytes,
    setCompletedBytes,
    currentByteId,
    setCurrentByteId
  } = useContext<GenieContextType>(genieContext);

  const [moreLoading, setMoreLoading] = useState(false);
  const [currentByte, setCurrentByte] = useState<any>({ contentType: "none" });
  const [currentTopic, setCurrentTopic] = useState<string>("");
  const [showLamp, setShowLamp] = useState(false);

  // const [byteCount, setByteCount] = useState<number>(0);

  const askGenie = async (uid: any, body: string, instructions: any) => {
    // console.log("INSTRUCTIONS", instructions);
    // setVisibleLike(false);
    // setLoading(true);
    // setCurrentMessage(null);
    const message = await addMessage(uid, body, instructions);
    console.log(message.response);

    let parsedResponse = []

    try {
      JSON.parse(message.response);
      parsedResponse = JSON.parse(message.response);
    } catch {
      console.error("Error parsing openAI response - incorrect format")
    }
    const preLoadedContent = contentLoader(3);

    const allContent = [...parsedResponse, ...preLoadedContent]

    const contentOrder = [
      "fact",
      "joke",
      "TrueFalse",
      "would you rather",
      "riddle",
      "poll"
    ]

    const orderedContent = contentOrder.map(type => {
      const matchingIndex = allContent.findIndex(item => item.contentType === type)
      if(matchingIndex >= 0) {
        const byte = allContent[matchingIndex]
        // Removing the used byte so it can't be used again if multiple bytes of the same content type are requried. 
        allContent.splice(matchingIndex, 1)
        return {...byte, byteId: byte.contentType + "-" + Math.floor(Math.random() * 1000000)}
      } else return null
    })

    const strippedOrderedContent = orderedContent.filter(byte => byte != null)

    console.log("------ FINAL CONTENT ORDER -------")
    console.log(strippedOrderedContent)

    setByteBatch(strippedOrderedContent);
    setCurrentByteId(strippedOrderedContent[0].byteId);

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
    if (byteBatch) {
      if (byteBatch.length === byteCount) {
        console.log(byteCount, "Its too high");
        setByteBatch(null);
        setCurrentByte(null);
        setCurrentMessage(null);
        setCurrentByteId(null);
        setByteCount(0);
        setVisibleLike(false);
        setShowLamp(true);
        setCompletedBytes({});
      } else {
        setCurrentByte(byteBatch[byteCount]);
        setCurrentMessage(messageFormatter(byteBatch[byteCount].body));
      }
    }
  }, [byteCount, byteBatch]);

  useEffect(() => {
    // const preLoadedContent = contentLoader();
    // setByteBatch(preLoadedContent);
    // console.log(preLoadedContent);
  }, []);
  // console.log(currentMessage);

  useEffect(() => {
    if(completedBytes[currentByteId]) {
      setVisibleLike(true)
    }
  }, [completedBytes])

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
            showLamp={showLamp}
            setShowLamp={setShowLamp}
          />
        )}
        <div className=" w-full flex flex-col justify-center  gap-2">
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
          ) : !showLamp ? (
            <GenerateButton
              setVisibleLike={setVisibleLike}
              setGenerate={setLoading}
              loading={moreLoading}
              setLoading={setMoreLoading}
              askGenie={askGenie}
              userId={userId}
              currentTopic={currentTopic}
            />
          ) : null}
        </div>
      </section>
    </main>
  );
}
