"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveField, auth, initFirebase, db } from "../firebase/config";

import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import {
  IoFootballOutline,
  IoFlaskOutline,
  IoCheckbox,
  IoCheckboxOutline,
} from "react-icons/io5";
import { HiOutlineSparkles, HiOutlinePaintBrush } from "react-icons/hi2";
import { TbPick } from "react-icons/tb";
import { PiPalette } from "react-icons/pi";
import { GiDinosaurBones } from "react-icons/gi";
import { LiaSkullCrossbonesSolid } from "react-icons/lia";
import { FaOtter } from "react-icons/fa6";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import RGlogo from "../../public/Reading Genie v.2.png";
import Image from "next/image";

export default function SignIn2({
  setCurrentStage,
}: {
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
}) {
  // @ts-ignore
  // const toggleInterest = (section, interest) => {
  //   if (!mySelected.hasOwnProperty(section)) {
  //     mySelected[section] = {};
  //   }
  //   if (mySelected[section].hasOwnProperty(interest)) {
  //     delete mySelected[section][interest];
  //   } else {
  //     mySelected[section][interest] = true;
  //   }
  // };

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
      saveField(
        ["genie-users", userId] as const,
        {
          interests: makeArray(selected.interests),
          contentTypes: makeArray(selected.contentTypes),
          contentLengths: makeArray(selected.contentLengths),
        } as any
      ); // Add 'as any' to bypass the type checking
    }
  }, [selected, userId]);

  const contentTypes = ["Facts", "Riddles", "Jokes", "Spells"];

  const contentLengths = {
    Short: "one to two sentences",
    Medium: "a paragraph",
    Long: "several paragraphs",
  };

  const contentLengthsDisplay = {
    Short: "(1-2 sentences)",
    Medium: "(a paragraph)",
    Long: "(multiple paragraphs)",
  };

  const clicked =
    "bg-[#d9f7ed] border border-2 border-primary justify-start gap-4 font-light text-lg";
  const notClicked =
    "flex justify-start bg-secondary border border-border justify-items-start gap-4 font-light text-lg";
  const iconClicked =
    "bg-[#d9f7ed] border border-2 border-primary h-20 w-20 font-light";
  const iconNotClicked =
    "bg-secondary border border-border h-20 w-20 font-light";

  console.log(selected);

  return (
    <div className="flex flex-col justify-between m-4 p-4 gap-4">
      <Image
        src={RGlogo}
        alt="Reading Genie logo"
        className="w-24 place-self-center"
      />
      <h1 className="text-2xl font-semibold text-primary text-center ">
        What do they care about?
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {interests.map((interest, idx) => {
          return (
            <Button
              key={idx}
              // @ts-ignore
              className={
                selected.interests[interest as keyof typeof selected.interests]
                  ? iconClicked
                  : iconNotClicked
              }
              onClick={() => {
                setSelected((curr) => {
                  const newSelected = { ...curr, ...interests };
                  newSelected.interests[
                    interest as keyof typeof newSelected.interests
                  ] = true;
                  return newSelected;
                });
              }}
            >
              <div className="flex flex-col items-center">
                <span className="p-2">
                  {
                    iconIndex.interests[
                      interest as keyof typeof iconIndex.interests
                    ]
                  }
                </span>
                <span>{interest}</span>
              </div>
            </Button>
          );
        })}
      </div>
      <h1 className="text-2xl font-semibold text-primary text-center ">
        What content to they enjoy?
      </h1>
      {contentTypes.map((contentType, idx) => (
        <Button
          onClick={() => {
            setSelected((curr) => {
              const newSelected = { ...curr, ...contentTypes };
              newSelected.contentTypes[
                contentType as keyof typeof newSelected.contentTypes
              ] = true;
              return newSelected;
            });
            // toggleInterest("interests", interest);
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
          <IconContext.Provider value={{ size: "28px" }}>
            {selected.contentTypes[
              contentType as keyof typeof selected.contentTypes
            ] ? (
              <MdCheckBox color="#614bc3" />
            ) : (
              <MdCheckBoxOutlineBlank />
            )}
          </IconContext.Provider>
          <div className="mt-1">{contentType}</div>
        </Button>
      ))}
      <h1 className="text-2xl font-semibold text-primary text-center">
        Length of content
      </h1>
      {Object.keys(contentLengths).map((contentLength, idx) => (
        <Button
          onClick={() => {
            setSelected((curr) => {
              const newSelected = { ...curr, ...contentLengths };
              newSelected.contentLengths[
                contentLength as keyof typeof newSelected.contentLengths
              ] = true;
              return newSelected;
            });
            // toggleInterest("interests", interest);
          }}
          key={idx}
          className={
            selected.contentLengths[
              contentLength as keyof typeof selected.contentLengths
            ]
              ? clicked
              : notClicked
          }
        >
          <IconContext.Provider value={{ size: "28px" }}>
            {selected.contentLengths[
              contentLength as keyof typeof selected.contentLengths
            ] ? (
              <MdCheckBox color="#614bc3" />
            ) : (
              <MdCheckBoxOutlineBlank />
            )}
          </IconContext.Provider>
          <div className="mt-1">
            {contentLength} {contentLengthsDisplay[contentLength]}
          </div>
        </Button>
      ))}
      <Button
        onClick={() => {
          setCurrentStage(3);
        }}
        className="text-white w-full rounded-full mt-4"
      >
        Next
      </Button>
      <div className="flex justify-center h-[20px]">&nbsp;</div>
    </div>
  );
}
