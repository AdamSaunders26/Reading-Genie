"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { Action, State } from "./topicReducer";
import BackButton from "./components/BackButton";
import SkipButton from "./components/SkipButton";
import { useRouter } from "next/navigation";
import ReadingGenieLogo from "./components/ReadingGenieLogo";
import TopicsList from "./components/TopicsList";
import ContentTypesList from "./components/ContentTypesList";
import ContentLengthsList from "./components/ContentLengthsList";

export default function SignIn2({
  selected,
  dispatch,
}: {
  selected: State;
  dispatch: React.Dispatch<Action>;
}) {
  const router = useRouter();

  const buttonClasses = {
    clicked:
      "bg-[#d9f7ed] border border-2 border-primary justify-start gap-4 font-light text-lg hover:lg:bg-geniePurple-200 hover:bg-[#d9f7ed] py-6 ",
    notClicked:
      "flex justify-start bg-secondary border border-border justify-items-start gap-4 font-light text-lg hover:lg:bg-geniePurple-200 hover:bg-secondary py-6 ",
  };

  return (
    <div className="flex flex-col justify-start m-4 p-4  gap-4 ">
      <BackButton />
      <ReadingGenieLogo />
      <TopicsList selected={selected} dispatch={dispatch} />
      <ContentTypesList
        selected={selected}
        dispatch={dispatch}
        buttonClasses={buttonClasses}
      />
      <ContentLengthsList
        selected={selected}
        dispatch={dispatch}
        buttonClasses={buttonClasses}
      />
      <div className="flex gap-4 mt-4">
        <Button
          onClick={() => {
            router.push("?stage=3");
          }}
          className="text-white w-full rounded-full "
        >
          Next
        </Button>
        <SkipButton />
      </div>
      {/* This bottom div is weird and should be replaced at some point */}
      <div className="flex justify-center h-[20px]">&nbsp;</div>
    </div>
  );
}
