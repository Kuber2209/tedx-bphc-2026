import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IntroGate from "@/components/layout/IntroGate";
import "./globals.css";

export const metadata: Metadata = {
  title: "TEDx BPHC 2026",
  description: "TEDx BPHC 2026 — an independent TEDx event, licensed by TED.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="global-ferrofluid" aria-hidden="true"><i /><i /><i /><i /></div>
        <Navbar />
        <IntroGate><main>{children}</main><Footer /></IntroGate>
      </body>
    </html>
  );
}
