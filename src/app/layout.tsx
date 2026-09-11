import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IntroGate from "@/components/layout/IntroGate";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "TEDx BPHC 2026",
  description: "TEDx BPHC 2026 — an independent TEDx event, licensed by TED.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased bg-black text-white selection:bg-[#eb0028] selection:text-white">
        <div className="global-ferrofluid" aria-hidden="true"><i /><i /><i /><i /></div>
        <Navbar />
        <IntroGate><main className="pb-16">{children}</main><Footer /></IntroGate>
      </body>
    </html>
  );
}
