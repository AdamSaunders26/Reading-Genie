import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function BackButton() {
  const searchParams = useSearchParams();
  const currentStage = searchParams.get("stage")
    ? Number(searchParams.get("stage"))
    : 0;
  const router = useRouter();

  const backToGenie = searchParams.get("genie");
  console.log(backToGenie);

  return (
    <Button
      className="text-white w-fit rounded-full"
      onClick={(e) => {
        e.preventDefault();
        backToGenie
          ? router.push(`/?skip=true`)
          : router.push(`?stage=${currentStage - 1}`);
      }}
    >
      {backToGenie ? "Back to Genie" : "Back"}
    </Button>
  );
}
