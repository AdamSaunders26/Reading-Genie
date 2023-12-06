"use client";

import BackButton from "./components/BackButton";
import { Action } from "./topicReducer";
import ReadingGenieLogo from "./components/ReadingGenieLogo";
import ChildDetailsForm from "./components/ChildDetailsForm";

export default function SignIn1({
  dispatch,
}: {
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <div className="flex flex-col justify-start text-center m-4 p-4">
      <BackButton />
      <ReadingGenieLogo />
      <h2 className="text-2xl font-semibold text-primary text-center">
        Tell me about your child
      </h2>
      <ChildDetailsForm dispatch={dispatch} />
    </div>
  );
}
