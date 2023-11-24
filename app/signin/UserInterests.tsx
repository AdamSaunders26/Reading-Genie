"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import React, { useState } from "react";

const formSchema = z.object({
  interest1: z.string().min(2),
  interest2: z.string().min(2),
  interest3: z.string().min(2),
  interest4: z.string().min(2),
  interest5: z.string().min(2),
})


export default function UserInterests() {

    
        // 1. Define your form.
        const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
            interest1: "minecraft",
            interest2: "minecraft",
            interest3: "minecraft",
            interest4: "minecraft",
            interest5: "minecraft"
          },
        })
      
        // 2. Define a submit handler.
        function onSubmit(values: z.infer<typeof formSchema>) {
          // Do something with the form values.
          // ✅ This will be type-safe and validated.
          console.log(values)
        }
      


const interests = ["sport", "film", "bakeoff", "celebrities", "animals", "pirates", "dinosaurs", "dancing", "gymnastics", "clothing"];

const newArray = new Array(interests.length).fill(false);


const [chosenButtons, setChosenButtons] = useState(newArray);

        console.log(chosenButtons);
  return (

      <div className="flex flex-col text-center items-center m-4 p-4">Child's Interests

        {interests.map((interest, index)=>{return <Button onClick={()=>{
            setChosenButtons((curr)=>{
            const updatedArray= [...curr]
            updatedArray[index] = !updatedArray[index]
            return updatedArray
        })}} key={index}>{interest}</Button>})}

      {/* <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-secondary space-y-8 p-4 rounded-md">
        <FormField 
          control={form.control}
          name="interest1"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>Interest 1</FormLabel>
              <FormControl>
                <Button placeholder="interest" {...field} />
              </FormControl>
              <FormDescription>
                Pick something your child is interested in.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form> */}
      </div>
  );
}