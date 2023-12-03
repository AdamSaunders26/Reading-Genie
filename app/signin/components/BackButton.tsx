import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function BackButton() {
  const searchParams = useSearchParams();
  const currentStage = searchParams.get("stage")
    ? Number(searchParams.get("stage"))
    : 0;
  const router = useRouter();

  return (
    <Button
      className="text-white w-fit rounded-full"
      onClick={(e) => {
        e.preventDefault();
        router.push(`?stage=${currentStage - 1}`);
      }}
    >
      Back
    </Button>
  );
}
