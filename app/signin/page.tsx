import { Children } from "react";
import UserDetails from "./UserDetails";
import UserInterests from "./UserInterests";

export default function SignInPage() {


  return (
    <main className="flex flex-col justify-between h-[100vh] rounded-md">
        <UserInterests />
    </main>
  );
}