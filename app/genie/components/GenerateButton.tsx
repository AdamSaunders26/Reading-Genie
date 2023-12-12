import { getUserRecord } from "@/app/firebase/config";
import { Button } from "@/components/ui/button";
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
  const buttonText = type === "more" ? "More like that" : "Something different";
  const buttonClass =
    type === "more"
      ? "bg-accent active:bg-lightaccent hover:bg-accent w-full rounded-full text-white text-2xl font-semibold h-12 "
      : "bg-lightaccent active:bg-accent hover:bg-lightaccent border-2 border-accent w-full rounded-full text-2xl font-semibold h-12 text-accent ";

  async function buttonHandler() {
    setVisibleLike(false);
    setLoading(true);
    const lengths = {
      Short: "one or two sentences",
      Medium: "a paragraph",
      Long: "several paragraphs",
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
      askGenie(userId, instructions, "instructions").then((o) => {
        setLoading(false);
      });
    }
  }

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
