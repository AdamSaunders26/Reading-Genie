"use client";

import { Button } from "@/components/ui/button";
import React, { useContext, useState } from "react";
import { Action, State } from "./topicReducer";
import BackButton from "./components/BackButton";
import SkipButton from "./components/SkipButton";
import { useRouter, useSearchParams } from "next/navigation";
import ReadingGenieLogo from "./components/ReadingGenieLogo";
import TopicsList from "./components/TopicsList";
import ContentTypesList from "./components/ContentTypesList";
import ContentLengthsList from "./components/ContentLengthsList";
import { Switch } from "@/components/ui/switch";
import RandomTopics from "./components/RandomTopics";
import Link from "next/link";
import { GenieContextType, genieContext } from "../context/ReadingGenieContext";

export default function SignIn2({
  selected,
  dispatch,
}: {
  selected: State;
  dispatch: React.Dispatch<Action>;
}) {
  const { newResponse, setNewResponse } =
    useContext<GenieContextType>(genieContext);

  const [randomTopics, setRandomTopics] = useState(false);

  const buttonClasses = {
    clicked:
      "bg-[#d9f7ed] border border-2 border-primary justify-start gap-4 font-light text-lg hover:lg:bg-geniePurple-200 hover:bg-[#d9f7ed] py-6 ",
    notClicked:
      "flex justify-start bg-secondary border border-border justify-items-start gap-4 font-light text-lg hover:lg:bg-geniePurple-200 hover:bg-secondary py-6 ",
  };
  const searchParams = useSearchParams();
  const backToGenie = searchParams.get("genie");
  return (
    <div className="flex flex-col justify-start m-4 p-4   ">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <BackButton />
          <div className="flex  gap-2">
            Random
            <Switch
              onCheckedChange={() => {
                setRandomTopics((curr) => !curr);
              }}
            />
          </div>
        </div>
        <ReadingGenieLogo />
      </div>
      {randomTopics ? (
        <RandomTopics selected={selected} dispatch={dispatch} />
      ) : (
        <TopicsList selected={selected} dispatch={dispatch} />
      )}
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
        <Link href={backToGenie ? `/genie` : "?stage=3"}>
          <Button
            onClick={() => {
              setNewResponse(true);
            }}
            className="text-white w-full rounded-full "
          >
            {backToGenie ? "Back to Genie" : "Next"}
          </Button>
        </Link>
        <SkipButton />
      </div>
      {/* This bottom div is weird and should be replaced at some point */}
      <div className="flex justify-center h-[20px]">&nbsp;</div>
    </div>
  );
}
