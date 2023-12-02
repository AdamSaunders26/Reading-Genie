import { Button } from "@/components/ui/button";

export default function BackButton({
  setCurrentStage,
}: {
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <Button
      className="text-white w-fit rounded-full"
      onClick={(e) => {
        e.preventDefault();
        setCurrentStage((curr) => --curr);
      }}
    >
      Back
    </Button>
  );
}
