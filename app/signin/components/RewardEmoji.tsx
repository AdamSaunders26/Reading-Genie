import { Button } from "@/components/ui/button";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { Action, toggleRewardDetails } from "../topicReducer";

export default function RewardEmoji({
  dispatch,
}: {
  dispatch: React.Dispatch<Action>;
}) {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState<string>("🏆");
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-3xl font-semibold text-primary text-center">
        Rewards
      </h2>
      <div>
        <p className="text-center">
          The best reward is a personalised reward you and your child agree on.
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
              toggleRewardDetails("rewardEmoji", e.emoji, dispatch);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
