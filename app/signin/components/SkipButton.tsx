import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function SkipButton() {
  const searchParams = useSearchParams();
  const currentStage = searchParams.get("stage")
    ? Number(searchParams.get("stage"))
    : 0;
  const router = useRouter();
  return (
    <Button
      className="text-white w-full rounded-full bg-accent"
      onClick={(e) => {
        e.preventDefault();
        router.push(`?stage=${currentStage + 1}`);
      }}
    >
      Skip
    </Button>
  );
}
