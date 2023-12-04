"use client";

import React, { useState } from "react";
import Image from "next/image";
import RGlogo from "../../public/Reading Genie v.2.png";
import { Action, State } from "./topicReducer";
import ParentDetailsForm from "./components/ParentDetailsForm";
import ReadingGenieLogo from "./components/ReadingGenieLogo";

export default function SignIn0({
  selected,
  dispatch,
}: {
  selected: State;
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
