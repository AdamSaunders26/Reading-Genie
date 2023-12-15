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

interface Props {
  setVisibleLike: React.Dispatch<React.SetStateAction<boolean>>;
  setGenerate: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | null;
  askGenie: (uid: any, body: string, instructions: any) => Promise<void>;
  type: "more" | "different";
}

export default function GenerateButton({
  setVisibleLike,
  setGenerate,
  loading,
  setLoading,
  userId,
  askGenie,
  type,
}: Props) {
  const { newResponse, setNewResponse } =
    useContext<GenieContextType>(genieContext);

  const buttonText = type === "more" ? "More like that" : "Something different";
  const buttonClass =
    type === "more"
      ? "bg-accent active:bg-lightaccent hover:bg-accent w-full rounded-full text-white text-2xl font-semibold h-12 "
      : "bg-lightaccent active:bg-accent hover:bg-lightaccent border-2 border-accent w-full rounded-full text-2xl font-semibold h-12 text-accent ";

  async function buttonHandler() {
    setVisibleLike(false);
    setLoading(true);
    const lengths = {
      Short: "one or two sentences, maximum 70 characters a sentence ",
      Medium: "a paragraph, between 200 and 250 characters",
      Long: "several paragraphs, each should be between 200 and 250 characters",
    };

    const nowData = await getUserRecord(userId);

    if (nowData?.contentLengths) {
      const length = Object.keys(nowData?.contentLengths).length;
      console.log(
        lengths[nowData?.contentLengths[length - 1] as keyof typeof lengths],
        length
      );
      const textLength =
        lengths[nowData?.contentLengths[length - 1] as keyof typeof lengths];
      const instructions = `In ${textLength}, tell me some ${nowData?.contentTypes.join(
        " or "
      )} about ${nowData?.interests.join(" or ")}`;

      const randContentType =
        nowData?.contentTypes[randoNum(0, nowData?.contentTypes.length - 1)];
      const randInterest =
        nowData?.interests[randoNum(0, nowData?.interests.length - 1)];

      const prompt = geniePrompt(textLength, randContentType, randInterest);

      askGenie(userId, prompt, "instructions").then((o) => {
        setLoading(false);
      });
      setNewResponse(false);
      //   askGenie(userId, instructions, "instructions").then((o) => {
      //     setLoading(false);
      //   });
    }
  }

  useEffect(() => {
    if (type === "more" && newResponse) {
      setGenerate(true);
      buttonHandler();
      console.log(1);
    }
  }, [userId, newResponse]);

  return (
    <Button
      onClick={() => {
        setGenerate(true);
        buttonHandler();
      }}
      className={buttonClass}
    >
      {loading ? <FaSpinner className="animate-spin" /> : buttonText}
    </Button>
  );
}
