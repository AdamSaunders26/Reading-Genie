import Link from "next/link";
import { FaGear } from "react-icons/fa6";

export default function SettingsButton() {
  return (
    <Link href="/signin">
      <FaGear className="w-6 h-6 text-white" />
    </Link>
  );
}
