import {
  GenieContextType,
  genieContext,
} from "@/app/context/ReadingGenieContext";
import { getUserRecord } from "@/app/firebase/config";
import geniePrompt from "@/app/prompt/geniePrompt";
import { randoNum } from "@/app/utils";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { FaSpinner } from "react-icons/fa6";
import { HiOutlineSparkles } from "react-icons/hi2";

interface Props {
  setVisibleLike: React.Dispatch<React.SetStateAction<boolean>>;
  setGenerate: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | null;
  askGenie: (uid: any, body: string, instructions: any) => Promise<void>;
  currentTopic: string;
}

export default function GenerateButton({
  setVisibleLike,
  setGenerate,
  loading,
  setLoading,
  userId,
  askGenie,
  currentTopic,
}: Props) {
  const { newResponse, setNewResponse } =
    useContext<GenieContextType>(genieContext);

  async function buttonHandler() {
    setVisibleLike(false);
    setLoading(true);

    const nowData = await getUserRecord(userId);

    if (nowData) {
      const allContentTypes = [
        "fact",
        "joke",
        "riddle",
        "would you rather",
        "poll",
      ];

      const prompt = geniePrompt("many", currentTopic);

      askGenie(userId, prompt, "instructions").then((o) => {
        setLoading(false);
      });
      setNewResponse(false);
    }
  }

  return (
    <Button
      onClick={() => {
        setGenerate(true);
        buttonHandler();
      }}
      disabled={currentTopic === ""}
      className={
        "bg-accent active:bg-lightaccent hover:bg-accent  rounded-full text-white text-5xl font-semibold h-fit w-fit p-6 place-self-center"
      }
    >
      {loading ? <FaSpinner className="animate-spin" /> : `Let's go!`}
    </Button>
  );
}
