import { Button } from "@/components/ui/button";
import { iconIndex } from "../topics";
import { Action, State, toggleCategory } from "../topicReducer";
import { useEffect, useState } from "react";
import CustomTopicInput from "./CustomTopicInput";
import { MdRefresh } from "react-icons/md";

export default function RandomTopics({
  selected,
  dispatch,
}: {
  selected: State;
  dispatch: React.Dispatch<Action>;
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

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-primary text-center ">
        What do they care about?
      </h1>
      <CustomTopicInput setNewTopic={setNewTopic} />
      {/* <div className="grid grid-cols-2 grid-rows-3  gap-x-8 gap-y-4 ">
        {randomTopics.map((interest, idx) => {
          let category = "";
          let topic = "";
          for (const key in interest) {
            category = key;
            topic = interest[key];
          }
          return (
            <Button
              key={idx}
              className={
                selected.categories[category][topic]
                  ? iconClicked
                  : iconNotClicked
              }
              onClick={() => {
                toggleCategory(category, topic, dispatch);
              }}
            >
              <div className="flex flex-col items-center">
                <span className="p-2 text-3xl drop-shadow-xl">
                  {category === "Custom" ? "🌟" : getIconByInterest(topic)}
                </span>
                <span className=" whitespace-normal leading-6 text-xl">
                  {topic}
                </span>
              </div>
            </Button>
          );
        })}
      </div> */}
      {/* <Button
        className="w-fit h-fit text-white text-xl place-self-center rounded-full p-4 active:bg-geniePurple-700"
        onClick={() => {
          setRefresh((curr) => ++curr);
        }}
      >
        <MdRefresh />
      </Button> */}
    </div>
  );
}
