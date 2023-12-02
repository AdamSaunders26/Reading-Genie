"use client";
import { useEffect, useReducer, useState } from "react";
import SignIn0 from "./SignIn-0";
import SignIn1 from "./SignIn-1";
import SignIn3 from "./SignIn-3";
import SignIn2 from "./SignIn-2";
import { initialState, topicReducer } from "./topicReducer";

export default function SignInPage() {
  const [currentStage, setCurrentStage] = useState(0);
  const [selected, dispatch] = useReducer(topicReducer, initialState);

  type StageProps = {
    setCurrentStage: (stage: number) => void;
  };
  console.log(selected);
  const stageIndex: Record<number, React.ReactElement<StageProps>> = {
    0: (
      <SignIn0
        setCurrentStage={setCurrentStage}
        selected={selected}
        dispatch={dispatch}
      />
    ),
    1: (
      <SignIn1
        setCurrentStage={setCurrentStage}
        selected={selected}
        dispatch={dispatch}
      />
    ),
    2: (
      <SignIn2
        setCurrentStage={setCurrentStage}
        selected={selected}
        dispatch={dispatch}
      />
    ),
    3: <SignIn3 setCurrentStage={setCurrentStage} />,
  };

  return (
    <main className="flex justify-center h-[100dvh]  ">
      {stageIndex[currentStage]}
    </main>
  );
}
