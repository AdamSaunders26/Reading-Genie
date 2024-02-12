import {
  GenieContextType,
  genieContext,
} from "@/app/context/ReadingGenieContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { addCustomTopic, toggleCategory } from "../topicReducer";

interface Props {
  setNewTopic: React.Dispatch<React.SetStateAction<string | null>>;
  currentTopic: string;
  setCurrentTopic: React.Dispatch<React.SetStateAction<string>>;
}

export default function CustomTopicInput({
  setNewTopic,
  currentTopic,
  setCurrentTopic,
}: Props) {
  const [inputValue, setInputValue] = useState("");
  // const [currentTopic, setCurrentTopic] = useState<string>("");
  const { dispatch } = useContext<GenieContextType>(genieContext);

  return (
    <div className="flex flex-col gap-4">
      {/* <div className="text-3xl flex flex-col gap-2 bg-geniePurple-500 p-6 rounded-xl text-white items-center place-self-center">
        <p>Current Topic:</p>
        <p className="text-5xl  font-bold text-center">
          {" "}
          {currentTopic ? currentTopic : "None selected"}
        </p>
      </div> */}
      <div className="flex flex-col items-center gap-8">
        <Input
          className="text-2xl border-geniePurple-500 border-2"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
          }}
        />
        <Button
          className="text-white w-fit text-3xl p-6"
          onClick={() => {
            setNewTopic(inputValue);
            setCurrentTopic(inputValue);
            if (dispatch) {
              addCustomTopic(inputValue, dispatch);
              toggleCategory("Custom", inputValue, dispatch);
            }
            setInputValue("");
          }}
        >
          Let's go!
        </Button>
      </div>
    </div>
  );
}
