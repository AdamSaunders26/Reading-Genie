"use client";
import { useContext, useEffect, useReducer, useState } from "react";
import SignIn0 from "./SignIn-0";
import SignIn1 from "./SignIn-1";
import SignIn3 from "./SignIn-3";
import SignIn2 from "./SignIn-2";
import { initialState, topicReducer } from "./topicReducer";
import { initFirebase, saveField } from "../firebase/config";
import { useSearchParams } from "next/navigation";
import { makeArray } from "./components/utils";
import { GenieContextType, genieContext } from "../context/ReadingGenieContext";

export default function SignInPage() {
  const { selected, dispatch, userId, setUserId } =
    useContext<GenieContextType>(genieContext);

  const getUser = async () => {
    const userId = await initFirebase();
    setUserId(userId);
  };

  const searchParams = useSearchParams();
  const currentStage = searchParams.get("stage")
    ? Number(searchParams.get("stage"))
    : 0;

  useEffect(() => {
    getUser();
    if (userId && selected) {
      const chosenTopics = [];
      for (const topic in selected.categories) {
        chosenTopics.push(makeArray(selected.categories[topic]));
      }

      console.log("SAVING", userId, chosenTopics.flat());
      saveField(["genie-users", userId], {
        interests: chosenTopics.flat(),
        contentTypes: makeArray(selected.contentTypes),
        contentLengths: makeArray(selected.contentLengths),
        parentDetails: makeArray(selected.parentDetails),
        childDetails: makeArray(selected.childDetails),
        rewardDetails: makeArray(selected.rewardDetails),
      });
    }
  }, [selected, userId]);

  const stageIndex: Record<
    number,
    React.ReactElement<{ setCurrentStage: (stage: number) => void }>
  > = {
    0: <SignIn0 selected={selected} dispatch={dispatch} />,
    1: <SignIn1 selected={selected} dispatch={dispatch} />,
    2: <SignIn2 selected={selected} dispatch={dispatch} />,
    3: <SignIn3 selected={selected} dispatch={dispatch} />,
  };

  return (
    <main className="flex justify-center h-[100dvh]  ">
      {stageIndex[currentStage]}
    </main>
  );
}
