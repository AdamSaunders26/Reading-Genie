import { Button } from "@/components/ui/button";
import SkipButton from "./SkipButton";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Action, toggleParentDetails } from "../topicReducer";
import { useRouter } from "next/navigation";
import { zodParentForm } from "./zod";

export default function ParentDetailsForm({
  dispatch,
}: {
  dispatch: React.Dispatch<Action>;
}) {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const { parentFormSchema, parentForm } = zodParentForm();

  function onSubmit(values: z.infer<typeof parentFormSchema>) {
    for (const detail in values) {
      toggleParentDetails(detail, (values as any)[detail], dispatch);
    }
    router.push("?stage=1");
  }

  return (
    <Form {...parentForm}>
      <form
        onSubmit={parentForm.handleSubmit(onSubmit)}
        className="space-y-8 p-4 rounded-md w-fit"
      >
        <FormField
          control={parentForm.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col text-gray-900 text-left">
              <FormLabel>Parent Name</FormLabel>
              <FormControl>
                <Input className="w-64 border-xl" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={parentForm.control}
          name="userEmail"
          render={({ field }) => (
            <FormItem className="flex flex-col text-gray-900 text-left">
              <FormLabel>Parent Email Address</FormLabel>
              <FormControl>
                <Input className="w-64 border-xl" placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={parentForm.control}
          name="userPassword"
          render={({ field }) => (
            <FormItem className="flex flex-col text-gray-900 text-left">
              <FormLabel>Password</FormLabel>
              <div className="flex items-center">
                <FormControl>
                  <Input
                    type={showPass ? "text" : "password"}
                    className="w-64 border-xl"
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                <label
                  onClick={() => setShowPass(!showPass)}
                  className=""
                  htmlFor="toggle"
                >
                  {showPass ? (
                    <FaEye className="-ml-8" />
                  ) : (
                    <FaEyeSlash className="-ml-8" />
                  )}
                </label>
              </div>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <Button className="text-white w-full rounded-full" type="submit">
            Sign-up
          </Button>
          <SkipButton />
        </div>
      </form>
    </Form>
  );
}
