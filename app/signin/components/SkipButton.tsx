import { Button } from "@/components/ui/button";

export default function SkipButton({
  setCurrentStage,
}: {
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <Button
      className="text-white w-full rounded-full bg-accent"
      onClick={(e) => {
        e.preventDefault();
        setCurrentStage((curr) => ++curr);
      }}
    >
      Skip
    </Button>
  );
}
