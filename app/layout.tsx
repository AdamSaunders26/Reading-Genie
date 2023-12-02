import type { Metadata } from "next";
import { Inter, League_Spartan } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const league_spartan = League_Spartan({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reading Genie",
  description: "Unlock the joy of reading.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-[100dvh] w-full overflow-y-scroll " lang="en">
      <body className={league_spartan.className}>{children}</body>
    </html>
  );
}
