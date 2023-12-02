"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
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
import { FaEyeSlash, FaEye } from "react-icons/fa";
import SkipButton from "./components/SkipButton";
import { Action, State } from "./topicReducer";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  userEmail: z.string().email(),
  userPassword: z.string().min(8, {
    message: "User password must be at least 8 characters.",
  }),
});

export default function SignIn0({
  setCurrentStage,
  selected,
  dispatch,
}: {
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
  selected: State;
  dispatch: React.Dispatch<Action>;
}) {
  function toggleParentDetails(type: string, details: string) {
    dispatch({ type: "TOGGLE_PARENT_DETAILS", payload: type, input: details });
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    for (const detail in values) {
      toggleParentDetails(detail, (values as any)[detail]);
    }
    setCurrentStage(1);
  }

  const [showPass, setShowPass] = useState(false);

  return (
    <div className="flex flex-col items-center justify-start text-center m-4 p-4">
      <Image
        src={RGlogo}
        alt="Reading Genie logo"
        priority
        className="w-24 place-self-center"
      />
      <h2 className="text-2xl font-semibold text-primary text-center">
        Reading Genie
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-4 rounded-md w-fit"
        >
          <FormField
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
            <SkipButton setCurrentStage={setCurrentStage} />
          </div>
        </form>
      </Form>
    </div>
  );
}
