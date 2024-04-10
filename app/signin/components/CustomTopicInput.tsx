import {
  GenieContextType,
  genieContext,
} from "@/app/context/ReadingGenieContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { addCustomTopic, toggleCategory } from "../topicReducer";
import FloatingTopics from "./FloatingTopics";

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
  const { loading } = useContext<GenieContextType>(genieContext);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2">
        <Input
          placeholder = "Today&apos;s topic"
          className="text-2xl border-geniePurple-500 border-2"
          value={inputValue}
          disabled={loading}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
            setNewTopic(e.target.value);
            setCurrentTopic(e.target.value);
          }}
        />
        <FloatingTopics
          setInputValue={setInputValue}
          setNewTopic={setNewTopic}
          setCurrentTopic={setCurrentTopic}
        />
      </div>
    </div>
  );
}
