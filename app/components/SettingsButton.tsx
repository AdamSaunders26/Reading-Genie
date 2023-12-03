import Link from "next/link";
import { FaGear } from "react-icons/fa6";

export default function SettingsButton() {
  return (
    <Link href="/signin?stage=2&genie=true">
      <FaGear className="w-6 h-6 text-white" />
    </Link>
  );
}
