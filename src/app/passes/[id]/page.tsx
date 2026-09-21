import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { passTiers } from "@/data/passes";
import PassDetailView, { PassDetailConfig } from "@/components/passes/PassDetailView";

interface PassDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const paths = passTiers.map((pass) => ({
    id: pass.id,
  }));
  paths.push({ id: "student" });
  return paths;
}

export async function generateMetadata({
  params,
}: PassDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const pass = passTiers.find(
    (p) => p.id === id || (id === "student" && p.id === "school-student")
  );

  if (!pass) {
    return {
      title: "Pass Not Found | TEDx BPHC 2026",
    };
  }

  return {
    title: `${pass.name} | TEDx BPHC 2026`,
    description: pass.description,
  };
}

const passDetailsConfigs: Record<string, PassDetailConfig> = {
  "school-student": {
    id: "school-student",
    name: "Student Pass",
    whoFor: "For school and college students",
    whoForLong:
      "Designed specifically for school students (Grades 9–12) and enrolled college scholars seeking intellectual inspiration, cutting-edge ideas, and a platform to engage with transformative thinkers.",
    pricingDisplay: {
      standard: "₹429",
      premium: "₹550",
    },
    startingPrice: "₹429",
    registrationUrl: "https://forms.gle/tedx-bphc-2026-student",
    inclusions: [
      {
        title: "Full Two-Day Access",
        description: "Admit to all keynote sessions, stage performances, and youth innovation showcases.",
      },
      {
        title: "Dining & Refreshments",
        description: "Catered networking lunch and morning & evening high-tea refreshments on both days.",
      },
      {
        title: "Delegate Kit & Credentials",
        description: "Official attendee badge, theme lanyard, and conference notebook.",
      },
      {
        title: "Certificate of Participation",
        description: "Official TEDx BPHC participation credential signed by organizers.",
      },
      {
        title: "Exhibits & Installations",
        description: "Unrestricted exploration of campus research exhibits and interactive art setups.",
      },
      {
        title: "Youth Delegate Community",
        description: "Connect with peers, student ambassadors, and young researchers across both days.",
      },
    ],
    standardBullets: [
      "Full two-day access to all keynote sessions",
      "Catered lunch & high-tea on both days",
      "Official attendee badge and certificate",
      "Access to research exhibits and installations",
    ],
    premiumBullets: [
      "Priority front-row auditorium seating",
      "Premium delegate merchandise pack & enamel pin",
      "Post-event speaker interaction & Q&A session",
      "Digital presentation archives & toolkit",
    ],
    premiumAdds: [
      "Priority front-row auditorium seating with prime stage sightlines",
      "Premium delegate merchandise pack (canvas tote, journal & decals)",
      "Exclusive TEDx BPHC commemorative metallic lapel pin",
      "Exclusive post-event speaker interaction & Q&A session",
      "Digital presentation archives & resource toolkit",
    ],
  },
  "bits-internal": {
    id: "bits-internal",
    name: "BITSian Pass",
    whoFor: "For BITS Pilani Hyderabad students, faculty, and staff",
    whoForLong:
      "Exclusive to enrolled undergraduate, dual-degree, higher degree, and PhD scholars, as well as faculty and staff of BITS Pilani Hyderabad Campus. A valid BITS institutional ID card is required for entry.",
    pricingDisplay: {
      standard: "₹650",
      originalStandard: "₹999",
      premium: "₹1,299",
    },
    startingPrice: "₹650",
    registrationUrl: "https://forms.gle/tedx-bphc-2026-bitsian",
    inclusions: [
      {
        title: "Full Two-Day Access",
        description: "Complete access to all keynote sessions, performances, and talks in the Auditorium.",
      },
      {
        title: "Campus Luncheon & High-Tea",
        description: "All-day catering with networking lunch and refreshments on both event days.",
      },
      {
        title: "In-House Delegate Badge",
        description: "Exclusive BPHC edition attendee credential, lanyard, and matte conference notebook.",
      },
      {
        title: "Attendance Support",
        description: "Official academic attendance condonation coordination for enrolled student delegates.",
      },
      {
        title: "Research & Design Exhibits",
        description: "Full access to campus technology pavilions and experiential stage installations.",
      },
      {
        title: "BPHC Community Sessions",
        description: "Direct involvement in campus-led discussion tracks and interdisciplinary showcases.",
      },
    ],
    standardBullets: [
      "Full two-day access to all keynote sessions",
      "Catered lunch & high-tea on both days",
      "Academic attendance condonation facilitation",
      "Official BPHC attendee badge & notebook",
    ],
    premiumBullets: [
      "Priority stalls tier seating with prime sightlines",
      "Commemorative merchandise pack & metallic lapel pin",
      "Exclusive post-conference speaker & community mixer",
      "Digital presentation archives & toolkit",
    ],
    premiumAdds: [
      "Priority stalls tier seating with prime stage sightlines",
      "Premium commemorative merchandise pack (custom tote & decals)",
      "Exclusive TEDx BPHC metallic lapel pin & metal bookmark",
      "Exclusive post-conference campus community & speaker mixer",
      "Digital presentation archives & resource toolkit",
    ],
  },
  "external-guest": {
    id: "external-guest",
    name: "External Guest Pass",
    whoFor: "For university delegates, professionals, and visitors",
    whoForLong:
      "Tailored for university delegates from outside BPHC, working professionals, founders, researchers, and alumni looking to immerse themselves in a high-impact weekend of thought leadership at BITS Pilani Hyderabad Campus.",
    pricingDisplay: {
      standard: "₹650",
      premium: "₹850",
    },
    startingPrice: "₹650",
    registrationUrl: "https://forms.gle/tedx-bphc-2026-guest",
    inclusions: [
      {
        title: "Full Two-Day Access",
        description: "Access to all headline keynote talks, panel debates, and live stage performances.",
      },
      {
        title: "Executive Dining Experience",
        description: "Curated networking lunch and high-tea alongside partners and university guests.",
      },
      {
        title: "Campus Parking & Vehicle Permit",
        description: "Hassle-free visitor vehicle entry clearance and reserved on-campus parking.",
      },
      {
        title: "Delegate Credential & Journal",
        description: "Executive attendee badge, RFID lanyard, and hardbound conference journal.",
      },
      {
        title: "Experience Zones & Exhibits",
        description: "Access to experiential technology spaces, research pavilions, and installations.",
      },
      {
        title: "Curatorial Networking",
        description: "Engage with founders, visiting professionals, and academic leadership.",
      },
    ],
    standardBullets: [
      "Full two-day access to all keynote talks & panels",
      "Curated executive lunch & high-tea on both days",
      "Campus visitor vehicle permit & reserved parking",
      "Executive delegate credential & conference journal",
    ],
    premiumBullets: [
      "Prime central bowl seating with unobstructed view",
      "Executive merchandise pack & laser-cut metallic pin",
      "Exclusive evening networking mixer with speakers and founders",
      "Digital presentation archives & talk transcripts",
    ],
    premiumAdds: [
      "Prime central bowl seating (unobstructed front-tier sightlines)",
      "Premium executive pack (insulated tumbler, canvas tote & sponsor pack)",
      "Laser-cut metallic lapel pin & commemorative collectibles",
      "Exclusive evening networking mixer with speakers & founders",
      "Digital presentation archives & speaker presentation transcripts",
    ],
  },
};

export default async function PassDetailPage({ params }: PassDetailPageProps) {
  const { id } = await params;
  const pass = passTiers.find(
    (p) => p.id === id || (id === "student" && p.id === "school-student")
  );

  if (!pass) {
    notFound();
  }

  const normalizedId = pass.id === "student" ? "school-student" : pass.id;
  const config =
    passDetailsConfigs[normalizedId] || passDetailsConfigs["school-student"];

  return <PassDetailView config={config} />;
}
