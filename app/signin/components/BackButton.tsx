import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function BackButton() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentStage = searchParams.get("stage")
    ? Number(searchParams.get("stage"))
    : 0;

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
