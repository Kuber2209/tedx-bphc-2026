import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IntroGate from "@/components/layout/IntroGate";
import GlobalBackground from "@/components/backgrounds/GlobalBackground";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "TEDx BPHC 2026",
  description: "TEDx BPHC 2026 — an independent TEDx event, licensed by TED.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased bg-transparent text-[#050505] selection:bg-[#E62B1E] selection:text-neutral-900 min-h-screen">
        <GlobalBackground />
        <Navbar />
        <IntroGate><main className="pb-16 relative z-0">{children}</main><Footer /></IntroGate>
      </body>
    </html>
  );
}
