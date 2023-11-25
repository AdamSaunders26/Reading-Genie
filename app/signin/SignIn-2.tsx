"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveField, auth } from "../firebase/config";

import React, { useState, useEffect } from "react";

export default function SignIn2({
  setCurrentStage,
}: {
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
}) {
  // @ts-ignore
  const toggleInterest = (section, interest) => {
    if (!selected.hasOwnProperty(section)) {
      // @ts-ignore
      selected[section] = {};
    }
    // @ts-ignore
    if (selected[section].hasOwnProperty(interest)) {
      // @ts-ignore
      delete selected[section][interest];
    } else {
      // @ts-ignore
      selected[section][interest] = true;
    }

    console.log(selected);
  };

  const [selected, setSelected] = useState({
    interests: {
      sport: false,
      film: false,
      bakeoff: false,
      celebrities: false,
      animals: false,
      pirates: false,
      dinosaurs: false,
      dancing: false,
      gymnastics: false,
    },
  });
  // const selected = {
  //   interests: {
  //     sport: false,
  //     film: false,
  //     bakeoff: false,
  //     celebrities: false,
  //     animals: false,
  //     pirates: false,
  //     dinosaurs: false,
  //     dancing: false,
  //     gymnastics: false,
  //   },
  // };

  const interests = [
    "sport",
    "film",
    "bakeoff",
    "celebrities",
    "animals",
    "pirates",
    "dinosaurs",
    "dancing",
    "gymnastics",
  ];

  useEffect(() => {
    console.log(auth)
    // saveField([], selected);
  }, [selected]);

  const contentTypes = ["Facts", "Riddles", "Jokes", "Spells"];

  const contentLengths = {
    Short: "one to two sentences",
    Medium: "a paragraph",
    Long: "several paragraphs",
  };

  const clicked = "bg-red-500";
  const notClicked = "bg-blue-500";
  console.log(selected);
  return (
    <div className="flex flex-col m-4 p-4 gap-4">
      <h1 className="text-3xl text-center">What do they care about?</h1>
      <div className="grid grid-cols-3 gap-4">
        {interests.map((interest, idx) => {
          return (
            <Button
              key={idx}
              // @ts-ignore
              className={selected.interests[interest] ? clicked : notClicked}
              onClick={() => {
                setSelected((curr) => {
                  const newSelected = { ...curr, ...interests };
                  newSelected.interests[interest] = true;
                  return newSelected;
                });
                // toggleInterest("interests", interest);
              }}
              // className="border border-black text-black bg-white hover:bg-gray-300"
            >
              {interest}
            </Button>
          );
        })}
      </div>
      <h1 className="text-3xl text-center">What content to they enjoy?</h1>
      {contentTypes.map((contentType, idx) => (
        <Button
          onClick={() => toggleInterest("contentTypes", contentType)}
          key={idx}
          className="border border-black text-black bg-white hover:bg-gray-300"
        >
          {contentType}
        </Button>
      ))}
      <h1 className="text-3xl text-center">Length of content</h1>
      {Object.keys(contentLengths).map((key, idx) => (
        <Button
          onClick={() => toggleInterest("contentLengths", contentLengths[key])}
          key={idx}
          className="border border-black text-black bg-white hover:bg-gray-300"
        >
          {key}
        </Button>
      ))}
      <Button
        onClick={() => {
          setCurrentStage(3);
        }}
        className="text-white w-full rounded-full"
      >
        Next
      </Button>
    </div>
  );
}
