import { Button } from "@/components/ui/button";
import { Action, State, toggleInterest } from "../topicReducer";
import { iconIndex, topics } from "../topicsData";

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

  const iconClicked =
    "bg-[#d9f7ed] border border-2 border-primary  h-full   text-primary hover:lg:bg-geniePurple-200 hover:bg-[#d9f7ed] ";
  const iconNotClicked =
    "bg-secondary border border-2 border-border h-full   hover:lg:bg-geniePurple-200 hover:bg-secondary ";

  return (
    <>
      <h1 className="text-2xl font-semibold text-primary text-center ">
        What do they care about?
      </h1>
      <div className="grid grid-cols-2 grid-rows-4  gap-x-8 gap-y-4 ">
        {topics.map((interest, idx) => {
          return (
            <Button
              key={idx}
              className={
                selected.interests[interest] ? iconClicked : iconNotClicked
              }
              onClick={() => {
                toggleInterest(interest, dispatch);
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
    </>
  );
}
