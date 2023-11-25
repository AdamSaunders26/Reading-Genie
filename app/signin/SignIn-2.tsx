"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import saveField from "../firebase/config";

import React, { useState } from "react";

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
    contentTypes: {
      facts: false,
      riddles: false,
      jokes: false,
      spells: false,
    },
    contentLengths: {
      short: false,
      medium: false,
      spells: false,
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
          onClick={() => {
            setSelected((curr) => {
              const newSelected = { ...curr, ...contentTypes };
              newSelected.contentTypes[contentType] = true;
              return newSelected;
            });
            // toggleInterest("interests", interest);
          }}
          key={idx}
          className={selected.contentTypes[contentType] ? clicked : notClicked}
        >
          {contentType}
        </Button>
      ))}
      <h1 className="text-3xl text-center">Length of content</h1>
      {Object.keys(contentLengths).map((contentLength, idx) => (
        <Button
          onClick={() => {
            setSelected((curr) => {
              const newSelected = { ...curr, ...contentLengths };
              newSelected.contentLengths[contentLength] = true;
              return newSelected;
            });
            // toggleInterest("interests", interest);
          }}
          key={idx}
          className={
            selected.contentLengths[contentLength] ? clicked : notClicked
          }
        >
          {contentLength}
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
