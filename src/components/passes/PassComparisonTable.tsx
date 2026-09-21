"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { GraduationCap, Building2, Globe, ArrowUpRight } from "lucide-react";

// Flowbase Echo Table 02 iconic check cutout SVG
function EchoCheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-emerald-600 mx-auto transition-transform duration-200 hover:scale-110"
      viewBox="0 0 25 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Included"
    >
      <path d="M12.666 22C7.14317 22 2.66602 17.5228 2.66602 12C2.66602 6.47715 7.14317 2 12.666 2C18.1888 2 22.666 6.47715 22.666 12C22.666 17.5228 18.1888 22 12.666 22ZM11.6686 16L18.7397 8.92893L17.3255 7.51472L11.6686 13.1716L8.84023 10.3431L7.42601 11.7574L11.6686 16Z" />
    </svg>
  );
}

interface ComparisonRow {
  name: string;
  student: {
    standard: boolean | string;
    premium: boolean | string;
  };
  bitsian: {
    standard: boolean | string;
    premium: boolean | string;
  };
  guest: {
    standard: boolean | string;
    premium: boolean | string;
  };
}

interface CategoryGroup {
  category: string;
  rows: ComparisonRow[];
}

const comparisonGroups: CategoryGroup[] = [
  {
    category: "AUDITORIUM & STAGE ACCESS",
    rows: [
      {
        name: "Full 2-Day Access to Keynotes, Panels & Performances",
        student: { standard: true, premium: true },
        bitsian: { standard: true, premium: true },
        guest: { standard: true, premium: true },
      },
      {
        name: "Access to Research Exhibits & Interactive Installations",
        student: { standard: true, premium: true },
        bitsian: { standard: true, premium: true },
        guest: { standard: true, premium: true },
      },
      {
        name: "Auditorium Seating Allocation",
        student: { standard: "General Tier", premium: "Front-Row Bowl" },
        bitsian: { standard: "General Tier", premium: "Prime Stalls Tier" },
        guest: { standard: "General Tier", premium: "Prime Central Bowl" },
      },
    ],
  },
  {
    category: "HOSPITALITY & DINING",
    rows: [
      {
        name: "Catered Networking Luncheon & High-Tea Refreshments",
        student: { standard: true, premium: true },
        bitsian: { standard: true, premium: true },
        guest: { standard: "Executive Luncheon", premium: "Executive Luncheon" },
      },
      {
        name: "Access to Experience Zones & Refreshment Breaks",
        student: { standard: true, premium: true },
        bitsian: { standard: true, premium: true },
        guest: { standard: true, premium: true },
      },
    ],
  },
  {
    category: "DELEGATE CREDENTIALS & MERCHANDISE",
    rows: [
      {
        name: "Official Attendee Credential & Commemorative Lanyard",
        student: { standard: "Delegate Badge", premium: "Delegate Badge" },
        bitsian: { standard: "BPHC Credential", premium: "BPHC Credential" },
        guest: { standard: "RFID Lanyard", premium: "RFID Lanyard" },
      },
      {
        name: "Matte Hardbound Conference Notebook & Pen",
        student: { standard: false, premium: true },
        bitsian: { standard: true, premium: true },
        guest: { standard: true, premium: true },
      },
      {
        name: "Custom Canvas Tote Bag & Official Decal Sheets",
        student: { standard: false, premium: true },
        bitsian: { standard: false, premium: true },
        guest: { standard: false, premium: true },
      },
      {
        name: "Exclusive Metallic Commemorative Lapel Pin",
        student: { standard: false, premium: true },
        bitsian: { standard: false, premium: true },
        guest: { standard: false, premium: true },
      },
    ],
  },
  {
    category: "CAMPUS & ACADEMIC PRIVILEGES",
    rows: [
      {
        name: "Academic Attendance Condonation Facilitation",
        student: { standard: false, premium: false },
        bitsian: { standard: true, premium: true },
        guest: { standard: false, premium: false },
      },
      {
        name: "Official Certificate of Participation",
        student: { standard: true, premium: true },
        bitsian: { standard: true, premium: true },
        guest: { standard: false, premium: false },
      },
      {
        name: "Campus Visitor Vehicle Entry Permit & Reserved Parking",
        student: { standard: false, premium: false },
        bitsian: { standard: "Campus Resident", premium: "Campus Resident" },
        guest: { standard: true, premium: true },
      },
    ],
  },
  {
    category: "VIP PRIVILEGES & POST-EVENT",
    rows: [
      {
        name: "Fast-Track Priority Registration Check-In Desk",
        student: { standard: false, premium: true },
        bitsian: { standard: false, premium: true },
        guest: { standard: false, premium: true },
      },
      {
        name: "Exclusive Post-Event Speaker Interaction & Networking Mixer",
        student: { standard: false, premium: true },
        bitsian: { standard: false, premium: true },
        guest: { standard: false, premium: true },
      },
      {
        name: "Digital Presentation Archives & Speaker Presentation Transcripts",
        student: { standard: false, premium: true },
        bitsian: { standard: false, premium: true },
        guest: { standard: false, premium: true },
      },
    ],
  },
];

interface PassComparisonTableProps {
  initialTier?: "standard" | "premium";
  className?: string;
}

export default function PassComparisonTable({
  initialTier = "standard",
  className = "",
}: PassComparisonTableProps) {
  const [tierMode, setTierMode] = useState<"standard" | "premium">(initialTier);

  const renderValue = (val: boolean | string) => {
    if (val === true) {
      return <EchoCheckIcon />;
    }
    if (val === false) {
      return (
        <span className="text-neutral-300 font-light text-base select-none">
          —
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-neutral-100 text-neutral-800 border border-neutral-200/90 shadow-2xs">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
        <span>{val}</span>
      </span>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Section Header (Echo Table 02 Header Style) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          {/* Badge pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-700 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#eb0028]" />
            <span>Comparison Matrix</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
            Pass <span className="text-[#eb0028]">Inclusions &amp; Comparison</span>
          </h3>
          <p className="text-sm text-neutral-600 font-normal leading-relaxed mt-1.5 max-w-2xl">
            Compare inclusions across all three delegate categories. Switch between Standard and Premium tiers to view exact privileges.
          </p>
        </div>

        {/* Segmented Toggle with animated gliding pill indicator */}
        <div className="self-start md:self-auto shrink-0">
          <div className="relative inline-flex p-1 rounded-xl border border-neutral-200 bg-neutral-100 shadow-2xs">
            <button
              type="button"
              onClick={() => setTierMode("standard")}
              className={`relative z-10 px-4 py-2 text-xs font-bold tracking-wider rounded-lg transition-colors cursor-pointer ${
                tierMode === "standard"
                  ? "text-neutral-900"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              STANDARD TIER
              {tierMode === "standard" && (
                <motion.div
                  layoutId="active-tier-pill"
                  className="absolute inset-0 bg-white rounded-lg shadow-xs -z-10"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                />
              )}
            </button>
            <button
              type="button"
              onClick={() => setTierMode("premium")}
              className={`relative z-10 px-4 py-2 text-xs font-bold tracking-wider rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                tierMode === "premium"
                  ? "text-[#eb0028]"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <span>PREMIUM VIP</span>
              <span className="text-[10px]">★</span>
              {tierMode === "premium" && (
                <motion.div
                  layoutId="active-tier-pill"
                  className="absolute inset-0 bg-white rounded-lg shadow-xs -z-10"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile swipe hint */}
      <div className="md:hidden flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-2 px-1">
        <span>← Swipe horizontally to compare passes →</span>
      </div>

      {/* Comparison Table Container */}
      <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white shadow-xs">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-neutral-200 bg-white">
              {/* Feature Inclusions Header */}
              <th className="py-6 px-6 font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-500 w-5/12 align-bottom">
                FEATURE INCLUSIONS
              </th>

              {/* Student Pass Column Header */}
              <th className="py-6 px-4 text-center w-2.3/12 border-l border-neutral-100 align-top">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center mb-2.5 text-neutral-700">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-neutral-900">Student Pass</h4>
                  <p className="text-[11px] text-neutral-500 font-normal mt-0.5">
                    Grades 9–12 &amp; College
                  </p>
                  <div className="mt-2 text-base font-bold text-neutral-900">
                    {tierMode === "standard" ? "₹429" : "₹550"}
                    <span className="text-[10px] text-neutral-500 font-normal ml-0.5">
                      {tierMode === "standard" ? "/std" : "/prem"}
                    </span>
                  </div>
                  <Link
                    href="/passes/school-student"
                    className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider font-bold text-neutral-700 hover:text-[#eb0028] mt-2 transition-colors"
                  >
                    <span>VIEW PASS</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </th>

              {/* BITSian Pass Column Header (Highlighted with red indicator) */}
              <th className="py-6 px-4 text-center w-2.4/12 border-l border-neutral-100 align-top bg-red-50/20 relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#eb0028]" />
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center mb-2.5 text-[#eb0028]">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-neutral-900">BITSian Pass</h4>
                  <p className="text-[11px] text-[#eb0028] font-medium mt-0.5">
                    Students &amp; Faculty
                  </p>
                  <div className="mt-2 text-base font-bold text-neutral-900 flex items-baseline justify-center gap-1.5">
                    <span>{tierMode === "standard" ? "₹650" : "₹1,299"}</span>
                    {tierMode === "standard" && (
                      <span className="text-xs text-neutral-400 line-through font-normal">
                        ₹999
                      </span>
                    )}
                    <span className="text-[10px] text-neutral-500 font-normal">
                      {tierMode === "standard" ? "/std" : "/prem"}
                    </span>
                  </div>
                  <Link
                    href="/passes/bits-internal"
                    className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider font-bold text-[#eb0028] hover:underline mt-2 transition-colors"
                  >
                    <span>VIEW PASS</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </th>

              {/* Guest Pass Column Header */}
              <th className="py-6 px-4 text-center w-2.3/12 border-l border-neutral-100 align-top">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center mb-2.5 text-neutral-700">
                    <Globe className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-neutral-900">Guest Pass</h4>
                  <p className="text-[11px] text-neutral-500 font-normal mt-0.5">
                    General Delegates
                  </p>
                  <div className="mt-2 text-base font-bold text-neutral-900">
                    {tierMode === "standard" ? "₹650" : "₹850"}
                    <span className="text-[10px] text-neutral-500 font-normal ml-0.5">
                      {tierMode === "standard" ? "/std" : "/prem"}
                    </span>
                  </div>
                  <Link
                    href="/passes/external-guest"
                    className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider font-bold text-neutral-700 hover:text-[#eb0028] mt-2 transition-colors"
                  >
                    <span>VIEW PASS</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="text-sm font-sans divide-y divide-neutral-100">
            {comparisonGroups.map((group, groupIdx) => (
              <React.Fragment key={groupIdx}>
                {/* Category Group Header Row */}
                <tr className="bg-neutral-50/80">
                  <td
                    colSpan={4}
                    className="py-3 px-6 font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-500"
                  >
                    {group.category}
                  </td>
                </tr>

                {/* Rows under this group */}
                {group.rows.map((row, rowIdx) => {
                  const studentVal = row.student[tierMode];
                  const bitsianVal = row.bitsian[tierMode];
                  const guestVal = row.guest[tierMode];

                  return (
                    <tr
                      key={rowIdx}
                      className="hover:bg-neutral-50/50 transition-colors"
                    >
                      {/* Feature Name */}
                      <td className="py-3.5 px-6 text-neutral-800 font-normal text-xs sm:text-sm">
                        {row.name}
                      </td>

                      {/* Student Pass Value */}
                      <td className="py-3.5 px-4 text-center border-l border-neutral-100 align-middle">
                        {renderValue(studentVal)}
                      </td>

                      {/* BITSian Pass Value */}
                      <td className="py-3.5 px-4 text-center border-l border-neutral-100 align-middle bg-red-50/10">
                        {renderValue(bitsianVal)}
                      </td>

                      {/* Guest Pass Value */}
                      <td className="py-3.5 px-4 text-center border-l border-neutral-100 align-middle">
                        {renderValue(guestVal)}
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Echo Table 02 Feature Callouts Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8 pt-8 border-t border-neutral-100">
        <div className="p-5 rounded-xl bg-neutral-50/80 border border-neutral-200/80">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1.5">
            Full 2-Day Stage Access
          </div>
          <div className="h-[2px] w-6 bg-[#eb0028] mb-2.5" />
          <p className="text-xs text-neutral-600 leading-relaxed font-normal">
            Every pass category includes complete admission to all keynote presentations, interactive panel discussions, and stage performances across both event days.
          </p>
        </div>
        <div className="p-5 rounded-xl bg-neutral-50/80 border border-neutral-200/80">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1.5">
            Hospitality &amp; Refreshments
          </div>
          <div className="h-[2px] w-6 bg-[#eb0028] mb-2.5" />
          <p className="text-xs text-neutral-600 leading-relaxed font-normal">
            Enjoy catered networking luncheons, high-tea snack breaks, and curated lounge spaces designed for meaningful cross-disciplinary networking.
          </p>
        </div>
        <div className="p-5 rounded-xl bg-neutral-50/80 border border-neutral-200/80">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1.5">
            Verified Attendee Credentials
          </div>
          <div className="h-[2px] w-6 bg-[#eb0028] mb-2.5" />
          <p className="text-xs text-neutral-600 leading-relaxed font-normal">
            Receive official attendee lanyards, custom badges, and verified certificates of participation to commemorate your presence at TEDx BITS Hyderabad.
          </p>
        </div>
      </div>
    </div>
  );
}
