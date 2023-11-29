"use client";
import { useEffect, useState } from "react";
import SignIn0 from "./SignIn-0";
import SignIn1 from "./SignIn-1";
import SignIn3 from "./SignIn-3";
import SignIn2 from "./SignIn-2";

export default function SignInPage() {
  const [currentStage, setCurrentStage] = useState(2);
  type StageProps = {
    setCurrentStage: (stage: number) => void;
  };
  let mainClass = "flex justify-center h-[100dvh]";
  const stageIndex: Record<number, React.ReactElement<StageProps>> = {
    0: <SignIn0 setCurrentStage={setCurrentStage} />,
    1: <SignIn1 setCurrentStage={setCurrentStage} />,
    2: <SignIn2 setCurrentStage={setCurrentStage} />,
    3: <SignIn3 setCurrentStage={setCurrentStage} />,
  };

  return (
    <>
      <main className={mainClass}>{stageIndex[currentStage]}</main>
    </>
  );
}
