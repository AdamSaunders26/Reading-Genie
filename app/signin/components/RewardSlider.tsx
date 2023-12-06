import { Slider } from "@/components/ui/slider";
import { Action, toggleRewardDetails } from "../topicReducer";
import { useState } from "react";

export default function RewardSlider({
  dispatch,
}: {
  dispatch: React.Dispatch<Action>;
}) {
  const [goalsValue, setGoalsValue] = useState<number[]>([0]);
  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary text-center ">
        How often would you like your child to use Reading Genie?
      </h2>
      <Slider
        className="pb-2 pt-4"
        value={goalsValue}
        onValueChange={(e) => {
          setGoalsValue(e);
          toggleRewardDetails("targetFrequency", e.toString(), dispatch);
        }}
        defaultValue={[0]}
        max={6}
        step={1}
      />
      <div className="flex justify-between w-full">
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
      </div>
      <p className=" w-full text-center">Times per week</p>
    </div>
  );
}
