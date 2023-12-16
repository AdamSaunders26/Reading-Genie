import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SkipButton from "./SkipButton";
import { Action, toggleChildDetails } from "../topicReducer";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ZodChildForm } from "./zod";

export default function ChildDetailsForm({
  dispatch,
}: {
  dispatch: React.Dispatch<Action>;
}) {
  const router = useRouter();
  const { childFormSchema, childForm } = ZodChildForm();

  function onSubmit(values: z.infer<typeof childFormSchema>) {
    for (const detail in values) {
      toggleChildDetails(detail, (values as any)[detail], dispatch);
    }
    router.push("?stage=2");
  }

  return (
    <Form {...childForm}>
      <form
        onSubmit={childForm.handleSubmit(onSubmit)}
        className="space-y-8 p-4 rounded-md w-fit"
      >
        <FormField
          control={childForm.control}
          name="childNickName"
          render={({ field }) => (
            <FormItem className="flex flex-col text-left">
              <FormLabel>Child&apos;s name (nickname)</FormLabel>
              <FormControl>
                <Input className="w-64" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={childForm.control}
          name="childBirthDate"
          render={({ field }) => (
            <FormItem className="flex flex-col text-left">
              <FormLabel>Child&apos;s date of birth</FormLabel>
              <FormControl>
                <Input className="w-64" placeholder="DD/MM/YY" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <SkipButton />
          <Button className="text-white w-full rounded-full" type="submit">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
