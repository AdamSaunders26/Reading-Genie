// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   userage: z.number(),
// });

// export default function Home() {
//   // 1. Define your form.
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       username: "Timmy",
//       userage: 7,
//     },
//   });

//   // 2. Define a submit handler.
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     console.log(values);
//   }

//   return (
//     <main className="flex flex-col justify-between h-[100vh] rounded-md">
//       <div className="text-center m-4 p-4">
//         Sign up
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="bg-secondary space-y-8 p-4 rounded-md"
//           >
//             <FormField
//               control={form.control}
//               name="username"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col items-center">
//                   <FormLabel>Username</FormLabel>
//                   <FormControl>
//                     <Input className="w-32" placeholder="shadcn" {...field} />
//                   </FormControl>
//                   <FormDescription>
//                     Enter your child&apos;s name here.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="userage"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col items-center">
//                   <FormLabel>User Age</FormLabel>
//                   <FormControl>
//                     <Input className="w-32" placeholder="" {...field} />
//                   </FormControl>
//                   <FormDescription>
//                     Enter your child&apos;s age here.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit">Submit</Button>
//           </form>
//         </Form>
//       </div>
//     </main>
//   );
// }
