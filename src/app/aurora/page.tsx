import AuroraBackgroundDemo from "@/components/ui/aurora-demo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aurora Background Demo | TEDx BPHC",
  description: "Aurora background component preview",
};

export default function AuroraDemoPage() {
  return <AuroraBackgroundDemo />;
}
