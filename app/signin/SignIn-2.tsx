"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveField, auth, initFirebase, db } from "../firebase/config";

import React, { useState, useEffect, useReducer } from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import RGlogo from "../../public/Reading Genie v.2.png";
import Image from "next/image";
import { Action, State, initialState, topicReducer } from "./topicReducer";
import { contentLengths, contentTypes, iconIndex, topics } from "./topicsData";
import BackButton from "./components/BackButton";
import SkipButton from "./components/SkipButton";
import { useRouter } from "next/navigation";

export default function SignIn2({
  selected,
  dispatch,
}: {
  selected: State;
  dispatch: React.Dispatch<Action>;
}) {
  function toggleInterest(interest: string) {
    dispatch({ type: "TOGGLE_INTEREST", payload: interest });
  }

  function toggleContentType(contentType: string) {
    dispatch({ type: "TOGGLE_CONTENT_TYPE", payload: contentType });
  }

  function toggleContentLength(contentLength: string) {
    dispatch({ type: "TOGGLE_CONTENT_LENGTH", payload: contentLength });
  }

  const getIconByInterest = (interest: string) => {
    return iconIndex.interests[interest as keyof typeof iconIndex.interests];
  };

  const router = useRouter();

  const clicked =
    "bg-[#d9f7ed] border border-2 border-primary justify-start gap-4 font-light text-lg hover:lg:bg-geniePurple-200 hover:bg-[#d9f7ed] py-6 ";
  const notClicked =
    "flex justify-start bg-secondary border border-border justify-items-start gap-4 font-light text-lg hover:lg:bg-geniePurple-200 hover:bg-secondary py-6 ";
  const iconClicked =
    "bg-[#d9f7ed] border border-2 border-primary  h-full   text-primary hover:lg:bg-geniePurple-200 hover:bg-[#d9f7ed] ";
  const iconNotClicked =
    "bg-secondary border border-2 border-border h-full   hover:lg:bg-geniePurple-200 hover:bg-secondary ";

  return (
    <div className="flex flex-col justify-start m-4 p-4  gap-4 ">
      <BackButton />
      <Image
        src={RGlogo}
        alt="Reading Genie logo"
        priority
        className="w-24 place-self-center"
      />
      <h1 className="text-2xl font-semibold text-primary text-center ">
        What do they care about?
      </h1>
      <div className="grid grid-cols-2 grid-rows-4  gap-x-8 gap-y-4 ">
        {topics.map((interest, idx) => {
          return (
            <Button
              key={idx}
              className={
                selected.interests[interest] ? iconClicked : iconNotClicked
              }
              onClick={() => {
                toggleInterest(interest);
              }}
            >
              <div className="flex flex-col items-center">
                <span className="p-2 text-3xl drop-shadow-xl">
                  {getIconByInterest(interest)}
                </span>
                <span className=" whitespace-normal leading-6 text-xl">
                  {interest}
                </span>
              </div>
            </Button>
          );
        })}
      </div>
      <h1 className="text-2xl font-semibold text-primary text-center ">
        What content do they enjoy?
      </h1>
      {contentTypes.map((contentType, idx) => (
        <Button
          onClick={() => {
            toggleContentType(contentType);
          }}
          key={idx}
          className={
            selected.contentTypes[
              contentType as keyof typeof selected.contentTypes
            ]
              ? clicked
              : notClicked
          }
        >
          {selected.contentTypes[
            contentType as keyof typeof selected.contentTypes
          ] ? (
            <MdCheckBox className="h-6 w-6 text-[#614bc3]" />
          ) : (
            <MdCheckBoxOutlineBlank className="h-6 w-6" />
          )}
          <div className="mt-1">{contentType}</div>
        </Button>
      ))}
      <h1 className="text-2xl font-semibold text-primary text-center">
        Length of content
      </h1>
      {contentLengths.map((contentLength, idx) => (
        <Button
          onClick={() => {
            toggleContentLength(contentLength.split(" ")[0]);
          }}
          key={idx}
          className={
            selected.contentLengths[
              contentLength.split(
                " "
              )[0] as keyof typeof selected.contentLengths
            ]
              ? clicked
              : notClicked
          }
        >
          {selected.contentLengths[contentLength.split(" ")[0]] ? (
            <MdCheckBox className="h-6 w-6 text-[#614bc3]" />
          ) : (
            <MdCheckBoxOutlineBlank className="h-6 w-6" />
          )}

          <div className="mt-1">{contentLength}</div>
        </Button>
      ))}
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
