import { Button } from "@/components/ui/button";
import { iconIndex } from "../topics";
import { Action, State, toggleCategory } from "../topicReducer";
import { useEffect, useState } from "react";
import CustomTopicInput from "./CustomTopicInput";
import { MdRefresh } from "react-icons/md";
import ReadingGenieLogo from "./ReadingGenieLogo";
import RewardLamp from "@/app/genie/components/RewardLamp";

export default function RandomTopics({
  selected,
  dispatch,
  currentTopic,
  setCurrentTopic,
  showLamp,
  setShowLamp,
}: {
  selected: State;
  dispatch: React.Dispatch<Action>;
  currentTopic: string;
  setCurrentTopic: React.Dispatch<React.SetStateAction<string>>;
  showLamp: boolean;
  setShowLamp: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  type topicItem = { [key: string]: string };
  const allTopics: topicItem[] = [];

  for (const cat in selected.categories) {
    for (const topic in selected.categories[cat]) {
      allTopics.push({ [cat]: topic });
    }
  }

  const [randomTopics, setRandomTopics] = useState<topicItem[]>([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    function getRandomNum(maxNum: number) {
      return Math.floor(Math.random() * maxNum);
    }

    const randomInterests: topicItem[] = [];

    while (randomInterests.length < 6) {
      const newTopic = allTopics[getRandomNum(allTopics.length)];
      if (!randomInterests.includes(newTopic)) {
        randomInterests.push(newTopic);
      }
    }

    setRandomTopics(randomInterests);
  }, [refresh]);

  const [newTopic, setNewTopic] = useState<string | null>(null);
  // console.log(newTopic);

  useEffect(() => {
    if (newTopic) {
      setRandomTopics((curr) => {
        const newArr = [...curr];
        newArr.pop();
        newArr.unshift({ Custom: newTopic });
        // console.log(newArr);
        return newArr;
      });
    }
  }, [newTopic]);

  // console.log(randomTopics);
  const getIconByInterest = (interest: string) => {
    return iconIndex.interests[interest as keyof typeof iconIndex.interests];
  };

  const iconClicked =
    "bg-[#d9f7ed] border border-2 border-primary h-full text-primary hover:lg:bg-geniePurple-200 hover:bg-[#d9f7ed] ";
  const iconNotClicked =
    "bg-secondary border border-2 border-border h-full hover:lg:bg-geniePurple-200 hover:bg-secondary ";

  console.log(currentTopic);

  return (
    <div className="h-full">
      {showLamp ? (
        <RewardLamp setShowLamp={setShowLamp} />
      ) : (
        <div className="flex flex-col gap-2 mx-8">
          <ReadingGenieLogo />
          <h1 className="text-3xl font-semibold text-primary text-center ">
            Add today&apos;s topic
          </h1>
          <p className="text-primary  italic ">{`Think school topics (e.g. Romans), hobbies (e.g. cheerleading), favourite foods (e.g pizza) or activity (e.g. Lego)`}</p>
          <CustomTopicInput
            setNewTopic={setNewTopic}
            currentTopic={currentTopic}
            setCurrentTopic={setCurrentTopic}
          />
        </div>
      )}
    </div>
  );
}
