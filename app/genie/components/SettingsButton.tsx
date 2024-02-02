import {
  GenieContextType,
  genieContext,
} from "@/app/context/ReadingGenieContext";
import Link from "next/link";
import { useContext } from "react";
import { FaGear } from "react-icons/fa6";

export default function SettingsButton() {
  const { setCurrentMessage } = useContext<GenieContextType>(genieContext);
  return (
    <Link
      href="/signin?stage=2&genie=true"
      onClick={() => {
        setCurrentMessage(null);
      }}
    >
      <FaGear className="w-6 h-6 text-white" />
    </Link>
  );
}
