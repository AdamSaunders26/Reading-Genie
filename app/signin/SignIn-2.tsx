"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveField, auth, initFirebase, db } from "../firebase/config";

import React, { useState, useEffect } from "react";

import { IoFootballOutline } from "react-icons/io5";
import { IoFlaskOutline } from "react-icons/io5";
import { HiOutlineSparkles } from "react-icons/hi2";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { TbPick } from "react-icons/tb";
import { PiPalette } from "react-icons/pi";
import { GiDinosaurBones } from "react-icons/gi";
import { LiaSkullCrossbonesSolid } from "react-icons/lia";
import { FaOtter } from "react-icons/fa6";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";

export default function SignIn2({
  setCurrentStage,
}: {
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
}) {
  // @ts-ignore
  const toggleInterest = (section, interest) => {
    if (!mySelected.hasOwnProperty(section)) {
      mySelected[section] = {};
    }
    if (mySelected[section].hasOwnProperty(interest)) {
      delete mySelected[section][interest];
    } else {
      mySelected[section][interest] = true;
    }
  };

  const [userId, setUserId] = useState(null);

  const [selected, setSelected] = useState({
    interests: {
      Football: false,
      Science: false,
      Magic: false,
      "Make-up": false,
      Minecraft: false,
      "Art & Craft": false,
      Dinosaurs: false,
      Pirates: false,
      Animals: false,
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

  const iconSize = "h-6 w-6";

  const iconIndex = {
    interests: {
      Football: <IoFootballOutline className={iconSize} />,
      Science: <IoFlaskOutline className={iconSize} />,
      Magic: <HiOutlineSparkles className={iconSize} />,
      "Make-up": <HiOutlinePaintBrush className={iconSize} />,
      Minecraft: <TbPick className={iconSize} />,
      "Art & Craft": <PiPalette className={iconSize} />,
      Dinosaurs: <GiDinosaurBones className={iconSize} />,
      Pirates: <LiaSkullCrossbonesSolid className={iconSize} />,
      Animals: <FaOtter className={iconSize} />,
    },
  };

  const interests = [
    "Football",
    "Science",
    "Magic",
    "Make-up",
    "Minecraft",
    "Art & Craft",
    "Dinosaurs",
    "Pirates",
    "Animals",
  ];

  const getUser = async () => {
    const userId = await initFirebase();
    setUserId(userId);
  };

  const makeArray = (obj) => {
    return Object.keys(obj)
      .map((key) => {
        if (obj[key] === true) {
          return key;
        }
        if (typeof obj[key] == "string") {
          return obj[key];
        }
      })
      .filter((i) => i);
  };

  useEffect(() => {
    getUser();
    if (userId) {
      console.log("SAVING", userId, makeArray(selected.interests));
      saveField(["genie-users", userId], {
        interests: makeArray(selected.interests),
        contentTypes: makeArray(selected.contentTypes),
        contentLengths: makeArray(selected.contentLengths),
      });
    }
  }, [selected, userId]);

  const contentTypes = ["Facts", "Riddles", "Jokes", "Spells"];

  const contentLengths = {
    Short: "one to two sentences",
    Medium: "a paragraph",
    Long: "several paragraphs",
  };

  const clicked = "bg-[#d9f7ed] border border-2 border-primary";
  const notClicked = "bg-secondary border border-border";
  const iconClicked = "bg-[#d9f7ed] border border-2 border-primary h-20 w-20";
  const iconNotClicked = "bg-secondary border border-border h-20 w-20";

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
              className={
                selected.interests[interest] ? iconClicked : iconNotClicked
              }
              onClick={() => {
                setSelected((curr) => {
                  const newSelected = { ...curr, ...interests };
                  newSelected.interests[interest] = true;
                  return newSelected;
                });
              }}
            >
              <div className="flex flex-col items-center">
                <span className="p-2">{iconIndex.interests[interest]}</span>
                <span>{interest}</span>
              </div>
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
