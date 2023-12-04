import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function zodParentForm() {
  const parentFormSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    userEmail: z.string().email(),
    userPassword: z.string().min(8, {
      message: "User password must be at least 8 characters.",
    }),
  });

  const parentForm = useForm<z.infer<typeof parentFormSchema>>({
    resolver: zodResolver(parentFormSchema),
    defaultValues: {
      username: "",
      userEmail: "",
      userPassword: "",
    },
  });
  return { parentFormSchema, parentForm };
}
