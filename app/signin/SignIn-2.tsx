"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveField } from "../firebase/config";

import React, { useState } from "react";

export default function UserInterests() {


  const toggleInterest = (section, interest) => {
    if (!selected.hasOwnProperty(section)) {
      selected[section] = {};
    }
    if (selected[section].hasOwnProperty(interest)) {
      delete selected[section][interest]
    } else {
      selected[section][interest] = true;
    }

    console.log(selected);

  }

  const selected = {}

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

  const contentTypes = [
    "Facts",
    "Riddles",
    "Jokes",
    "Spells"
  ];

  const contentLengths = {
      "Short": "one to two sentences",
      "Medium": "a paragraph",
      "Long": "several paragraphs"
    };

  const clicked = "bg-red-500";
  const notClicked = "bg-blue-500";

  return (
    <div className="flex flex-col m-4 p-4 gap-4">
      <h1 className="text-3xl text-center">What do they care about?</h1>
      <div className="grid grid-cols-3 gap-4">
        {
          interests.map((interest, idx) => 
            <Button 
              key={idx} 
              onClick={() => toggleInterest('interests', interest)} 
              className="border border-black text-black bg-white hover:bg-gray-300">{ interest }
            </Button>)
        }
      </div>
      <h1 className="text-3xl text-center">What content to they enjoy?</h1>
        {
          contentTypes.map((contentType, idx) => <Button onClick={() => toggleInterest('contentTypes', contentType)} key={idx} className="border border-black text-black bg-white hover:bg-gray-300">{ contentType }</Button>)
        }
      <h1 className="text-3xl text-center">Length of content</h1>
        {
          Object.keys(contentLengths).map((key, idx) => <Button onClick={() => toggleInterest('contentLengths', contentLengths[key])} key={idx} className="border border-black text-black bg-white hover:bg-gray-300">{ key }</Button>)
        }
    </div>
  );
}
