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

export default function SignIn3({
  setCurrentStage,
}: {
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [goalsValue, setGoalsValue] = useState<number[]>([0]);
  // const [lampsValue, setLampsValue] = useState<number[]>([15]);
  const [currentEmoji, setCurrentEmoji] = useState<string>("🏆");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [inputValue, setInputValue] = useState("");
  console.log(inputValue);
  return (
    <div className="flex flex-col justify-start m-4 p-4 gap-4 ">
      <section className="flex flex-col items-center gap-4 m-4 mx-8">
        <div className="flex flex-col">
          <BackButton setCurrentStage={setCurrentStage} />
          <Image
            src={RGlogo}
            alt="Reading Genie logo"
            className="w-24 place-self-center"
          />
          <h2 className="text-2xl font-semibold text-primary text-center ">
            How often would you like your child to use Reading Genie?
          </h2>
          <Slider
            className="pb-2 pt-4"
            value={goalsValue}
            onValueChange={(e) => {
              setGoalsValue(e);
            }}
            defaultValue={[0]}
            max={6}
            step={1}
          />
          <div className="flex justify-between">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
          </div>
          <p className="place-self-center">Per week</p>
        </div>
        <div className="flex flex-col gap-8 ">
          <h2 className="text-3xl font-semibold text-primary text-center">
            Rewards
          </h2>
          <div>
            <p className="text-center">
              The best reward is a personalised reward you and your child agree
              on.
            </p>
            <p className="text-center">
              Example: Extra pocket money, a treat, a balloon ride, you decide!
            </p>
          </div>
          {buttonClicked ? null : (
            <Button
              onClick={() => {
                console.log("click");
                setButtonClicked(true);
              }}
              className="bg-secondary border-border w-16 h-16 text-4xl border-2 place-self-center pt-4"
            >
              {currentEmoji}
            </Button>
          )}
          {buttonClicked ? (
            <div className="place-self-center">
              <EmojiPicker
                height={400}
                lazyLoadEmojis={true}
                onEmojiClick={(e) => {
                  setButtonClicked(false);
                  setCurrentEmoji(e.emoji);
                }}
              />
            </div>
          ) : null}
          <div>
            <p>Reward title</p>
            <Input
              type="text"
              placeholder="Enter reward title"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
              value={inputValue}
            />
          </div>
        </div>
        <Link href="/" className="w-full">
          <Button className="text-white w-full rounded-full">Next</Button>
        </Link>
      </section>
      <div className="flex justify-center h-[20px]">&nbsp;</div>
    </div>
  );
}
