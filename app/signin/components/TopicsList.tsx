import { Button } from "@/components/ui/button";
import { Action, State, toggleCategory, toggleInterest } from "../topicReducer";

import { useState } from "react";
import { categories, iconIndex } from "../topics";

export default function TopicsList({
  selected,
  dispatch,
}: {
  selected: State;
  dispatch: React.Dispatch<Action>;
}) {
  const getIconByInterest = (interest: string) => {
    return iconIndex.interests[interest as keyof typeof iconIndex.interests];
  };

  const categoryList = Object.keys(categories);
  const [currentButton, setCurrentButton] = useState("Clubs");
  const [currentTopics, setCurrentTopics] = useState(categories["Clubs"]);

  const iconClicked =
    "bg-[#d9f7ed] border border-2 border-primary h-full text-primary hover:lg:bg-geniePurple-200 hover:bg-[#d9f7ed] ";
  const iconNotClicked =
    "bg-secondary border border-2 border-border h-full hover:lg:bg-geniePurple-200 hover:bg-secondary ";

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-primary text-center ">
        What do they care about?
      </h1>
      <div className="flex gap-4 flex-wrap justify-center">
        {categoryList.map((cat, index) => {
          const baseClass = "text-2xl text-white py-6 hover:bg-geniePurple ";
          return (
            <Button
              key={index}
              className={
                currentButton === cat
                  ? baseClass + "bg-geniePurple-800"
                  : baseClass
              }
              onClick={() => {
                setCurrentButton(cat);
                setCurrentTopics(categories[cat]);
              }}
            >
              {cat}
            </Button>
          );
        })}
      </div>
      <div className="grid grid-cols-2 auto-rows-auto  gap-x-8 gap-y-4 ">
        {Object.keys(currentTopics).map((interest, idx) => {
          return (
            <Button
              key={idx}
              className={
                selected.categories[currentButton][interest]
                  ? iconClicked
                  : iconNotClicked
              }
              onClick={() => {
                toggleCategory(currentButton, interest, dispatch);
              }}
            >
              <div className="flex flex-col items-center">
                <span className="p-2 text-3xl drop-shadow-xl">
                  {getIconByInterest(interest)}
                </span>
                <span className=" whitespace-normal leading-6 text-xl">
                  {interest}
                </span>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
