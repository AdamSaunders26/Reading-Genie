import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Action, toggleRewardDetails } from "../topicReducer";

export default function RewardTitle({
  dispatch,
}: {
  dispatch: React.Dispatch<Action>;
}) {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="flex flex-col items-center gap-4">
      <p>Reward title</p>
      <Input
        type="text"
        placeholder="Enter reward title"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
          toggleRewardDetails("rewardName", e.target.value, dispatch);
        }}
        value={inputValue}
      />
    </div>
  );
}
