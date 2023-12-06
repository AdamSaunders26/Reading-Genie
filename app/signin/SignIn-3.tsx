"use client";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import RGlogo from "../../public/Reading Genie v.2.png";
import Link from "next/link";
import BackButton from "./components/BackButton";
import { Action, State, toggleRewardDetails } from "./topicReducer";
import ReadingGenieLogo from "./components/ReadingGenieLogo";
import RewardSlider from "./components/RewardSlider";
import RewardEmoji from "./components/RewardEmoji";
import RewardTitle from "./components/RewardTitle";

export default function SignIn3({
  selected,
  dispatch,
}: {
  selected: State;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <div className="flex flex-col justify-start m-4 p-4  ">
      <BackButton />
      <section className="flex flex-col gap-4 m-4 mx-8">
        <ReadingGenieLogo />
        <RewardSlider dispatch={dispatch} />
        <RewardEmoji dispatch={dispatch} />
        <RewardTitle dispatch={dispatch} />
        <Link href="/" className="w-full mt-4">
          <Button className="text-white w-full rounded-full">Next</Button>
        </Link>
      </section>
    </div>
  );
}
