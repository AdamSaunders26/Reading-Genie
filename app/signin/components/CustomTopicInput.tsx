import {
  GenieContextType,
  genieContext,
} from "@/app/context/ReadingGenieContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { addCustomTopic } from "../topicReducer";

interface Props {
  setNewTopic: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function CustomTopicInput({ setNewTopic }: Props) {
  const [inputValue, setInputValue] = useState("");
  const { dispatch } = useContext<GenieContextType>(genieContext);
  return (
    <div className="flex gap-4">
      <Input
        className="text-2xl border-geniePurple-500 border-2"
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
        }}
      />
      <Button
        className="text-white font-bold"
        onClick={() => {
          setNewTopic(inputValue);
          if (dispatch) {
            addCustomTopic(inputValue, dispatch);
          }
          setInputValue("");
        }}
      >
        <FaPlus />
      </Button>
    </div>
  );
}
