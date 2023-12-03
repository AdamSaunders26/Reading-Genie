"use client";
import { useEffect, useReducer, useState } from "react";
import SignIn0 from "./SignIn-0";
import SignIn1 from "./SignIn-1";
import SignIn3 from "./SignIn-3";
import SignIn2 from "./SignIn-2";
import { initialState, topicReducer } from "./topicReducer";
import { initFirebase, saveField } from "../firebase/config";
import { useParams, usePathname, useSearchParams } from "next/navigation";

export default function SignInPage() {
  const [currentStages, setCurrentStage] = useState(0);
  const [selected, dispatch] = useReducer(topicReducer, initialState);
  const [userId, setUserId] = useState<string | null>(null);

  const getUser = async () => {
    const userId = await initFirebase();
    setUserId(userId);
  };

  const makeArray = (
    obj: Record<string, boolean> | Record<string, string>
  ): (string | undefined)[] => {
    return Object.keys(obj)
      .map((key) => {
        if (obj[key] === true) {
          return key;
        }
      })
      .filter((i) => i);
  };

  const searchParams = useSearchParams();
  const currentStage = searchParams.get("stage")
    ? Number(searchParams.get("stage"))
    : 0;

  useEffect(() => {
    getUser();
    if (userId) {
      console.log("SAVING", userId, makeArray(selected.interests));
      saveField(["genie-users", userId], {
        interests: makeArray(selected.interests),
        contentTypes: makeArray(selected.contentTypes),
        contentLengths: makeArray(selected.contentLengths),
        parentDetails: makeArray(selected.parentDetails),
        childDetails: makeArray(selected.childDetails),
        rewardDetails: makeArray(selected.rewardDetails),
      });
    }
  }, [selected, userId]);

  type StageProps = {
    setCurrentStage: (stage: number) => void;
  };
  console.log(selected);
  const stageIndex: Record<number, React.ReactElement<StageProps>> = {
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
