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

const formSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  userEmail: z.string().email(),
  userPassword: z.string().min(5, {
    message: "User password must be at least 8 characters.",
  }),
});

export default function SignIn0() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="flex flex-col items-center justify-center text-center m-4 p-4">
      <h2 className="text-3xl">Reading Genie</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-4 rounded-md w-fit"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col text-left">
                <FormLabel>Parent Name</FormLabel>
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
            name="userEmail"
            render={({ field }) => (
              <FormItem className="flex flex-col text-left">
                <FormLabel>Parent Email Address</FormLabel>
                <FormControl>
                  <Input className="w-64" placeholder="" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userPassword"
            render={({ field }) => (
              <FormItem className="flex flex-col text-left">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input className="w-64" placeholder="" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="rounded-full" type="submit">
            Sign-up
          </Button>
        </form>
      </Form>
    </div>
  );
}
