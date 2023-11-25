"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import Image from "next/image";
import RGlogo from "../../public/Reading Genie v.2.png";

const formSchema = z.object({
  childNickName: z.string().min(2, {
    message: "Nickname must be at least 2 characters.",
  }),
  childBirthDate: z.string(),
});

export default function SignIn1({
  setCurrentStage,
}: {
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
}) {
  // 1. Define your form.

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setCurrentStage(2);
  }

  return (
    <div className="flex flex-col justify-center items-center text-center m-4 p-4">
      <Image
        src={RGlogo}
        alt="Reading Genie logo"
        className="w-24 place-self-center"
      />
      <h2 className="text-2xl font-semibold text-primary text-center">
        Tell me about your child
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-4 rounded-md w-fit"
        >
          <FormField
            control={form.control}
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
            control={form.control}
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
          <Button className="text-white w-full rounded-full" type="submit">
            Next
          </Button>
        </form>
      </Form>
    </div>
  );
}
