import { useEffect, useState } from "react";
import { floatingTopicsList } from "./floatingTopicsList";
import { randoNum } from "@/app/utils";
import { Button } from "@/components/ui/button";

interface Props {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setNewTopic: React.Dispatch<React.SetStateAction<string | null>>;
  setCurrentTopic: React.Dispatch<React.SetStateAction<string>>;
}

export default function FloatingTopics({
  setInputValue,
  setNewTopic,
  setCurrentTopic,
}: Props) {
  const [currentTopicSelection, setCurrentTopicSelection] = useState<string[]>(
    []
  );
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    setCurrentTopicSelection([]);
    for (let i = 0; i < 8; i++) {
      setCurrentTopicSelection((curr) => {
        const randomNum = randoNum(0, floatingTopicsList.length);
        const selectionCopy = [...curr];
        selectionCopy.push(floatingTopicsList[randomNum]);
        const uniqueArray = selectionCopy.filter(function (item, pos, self) {
          return self.indexOf(item) == pos;
        });

        return uniqueArray;
      });
    }
  }, [refresh]);

  return (
    <div className="flex flex-col gap-4 items-center">
      <p className="text-2xl text-geniePurple-500 font-bold">
        Use these for inspiration!
      </p>
      <div className="flex gap-4 flex-wrap justify-center text-white">
        {currentTopicSelection
          ? currentTopicSelection.map((topic, i) => {
              return (
                <Button
                  key={i}
                  onClick={() => {
                    setInputValue(topic);
                    setNewTopic(topic);
                    setCurrentTopic(topic);
                  }}
                  className="text-xl"
                >
                  {topic}
                </Button>
              );
            })
          : null}
      </div>
      <Button
        className="bg-accent text-white text-xl hover:bg-accent"
        onClick={() => {
          setRefresh((curr) => ++curr);
        }}
      >
        Refresh list
      </Button>
    </div>
  );
}
