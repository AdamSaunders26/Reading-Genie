"use client";

import React, { useState } from "react";
import { Action, State } from "./topicReducer";
import ParentDetailsForm from "./components/ParentDetailsForm";
import ReadingGenieLogo from "./components/ReadingGenieLogo";

export default function SignIn0({
  dispatch,
}: {
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <div className="flex flex-col items-center justify-start text-center m-4 p-4">
      <ReadingGenieLogo />
      <h2 className="text-2xl font-semibold text-primary text-center">
        Reading Genie
      </h2>
      <ParentDetailsForm dispatch={dispatch} />
    </div>
  );
}
