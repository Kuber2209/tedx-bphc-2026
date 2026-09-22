"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

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

export interface TierRow {
  name: string;
  standard: boolean | string;
  premium: boolean | string;
}

export interface TierCategoryGroup {
  category: string;
  rows: TierRow[];
}

interface TierComparisonTableProps {
  passId: string;
  passName: string;
  standardPrice: string;
  originalStandardPrice?: string;
  premiumPrice: string;
  registrationUrl: string;
  className?: string;
}

const getTierData = (passId: string): TierCategoryGroup[] => {
  const isBitsian = passId === "bits-internal";
  const isGuest = passId === "external-guest";

  if (isBitsian) {
    return [
      {
        category: "AUDITORIUM & SEATING ACCESS",
        rows: [
          {
            name: "Full 2-Day Keynote Talks, Panels & Performances",
            standard: true,
            premium: true,
          },
          {
            name: "Auditorium Seating Allocation",
            standard: "General Tier",
            premium: "Prime Stalls Tier",
          },
          {
            name: "Research Exhibits & Interactive Installations",
            standard: true,
            premium: true,
          },
        ],
      },
      {
        category: "DINING & HOSPITALITY",
        rows: [
          {
            name: "Catered Networking Luncheon & High-Tea Refreshments",
            standard: true,
            premium: true,
          },
          {
            name: "Experience Zones & Snack Refreshment Breaks",
            standard: true,
            premium: true,
          },
        ],
      },
      {
        category: "MERCHANDISE & CREDENTIALS",
        rows: [
          {
            name: "Official BPHC Attendee Credential & Lanyard",
            standard: "BPHC Credential",
            premium: "BPHC Credential",
          },
          {
            name: "Matte Hardbound Conference Notebook & Metallic Pen",
            standard: true,
            premium: true,
          },
          {
            name: "Premium Commemorative Canvas Tote Bag & Decals",
            standard: false,
            premium: true,
          },
          {
            name: "Exclusive Metallic Commemorative Lapel Pin & Bookmark",
            standard: false,
            premium: true,
          },
        ],
      },
      {
        category: "CAMPUS & ACADEMIC PRIVILEGES",
        rows: [
          {
            name: "Academic Attendance Condonation Facilitation",
            standard: true,
            premium: true,
          },
          {
            name: "Campus Resident Entry & Host Tier Access",
            standard: "Campus Resident",
            premium: "Campus Resident",
          },
        ],
      },
      {
        category: "EXCLUSIVE VIP PRIVILEGES",
        rows: [
          {
            name: "Fast-Track Priority Registration Desk Clearance",
            standard: false,
            premium: true,
          },
          {
            name: "Exclusive Post-Conference Speaker & Community Mixer",
            standard: false,
            premium: true,
          },
          {
            name: "Digital Presentation Archives & Speaker Transcripts",
            standard: false,
            premium: true,
          },
        ],
      },
    ];
  }

  if (isGuest) {
    return [
      {
        category: "AUDITORIUM & SEATING ACCESS",
        rows: [
          {
            name: "Full 2-Day Keynote Talks, Panels & Performances",
            standard: true,
            premium: true,
          },
          {
            name: "Auditorium Seating Allocation",
            standard: "General Tier",
            premium: "Prime Central Bowl",
          },
          {
            name: "Research Exhibits & Interactive Installations",
            standard: true,
            premium: true,
          },
        ],
      },
      {
        category: "DINING & HOSPITALITY",
        rows: [
          {
            name: "Curated Executive Networking Luncheon & Refreshments",
            standard: "Executive Luncheon",
            premium: "Executive Luncheon",
          },
          {
            name: "VIP Networking Lounge & High-Tea Service",
            standard: true,
            premium: true,
          },
        ],
      },
      {
        category: "MERCHANDISE & CREDENTIALS",
        rows: [
          {
            name: "Official Executive Delegate Credential & RFID Lanyard",
            standard: "RFID Lanyard",
            premium: "RFID Lanyard",
          },
          {
            name: "Executive Conference Notebook & Stationery Pack",
            standard: true,
            premium: true,
          },
          {
            name: "Premium Executive Pack (Insulated Tumbler, Canvas Tote & Decals)",
            standard: false,
            premium: true,
          },
          {
            name: "Laser-Cut Metallic Lapel Pin & Commemorative Collectibles",
            standard: false,
            premium: true,
          },
        ],
      },
      {
        category: "CAMPUS ENTRY & VEHICLE ACCESS",
        rows: [
          {
            name: "Campus Visitor Vehicle Entry Permit & Reserved Parking",
            standard: true,
            premium: true,
          },
        ],
      },
      {
        category: "EXCLUSIVE VIP PRIVILEGES",
        rows: [
          {
            name: "VIP Fast-Track Registration & Gate Clearance Desk",
            standard: false,
            premium: true,
          },
          {
            name: "Exclusive Evening Networking Mixer with Speakers & Founders",
            standard: false,
            premium: true,
          },
          {
            name: "Digital Presentation Archives & Speaker Presentation Transcripts",
            standard: false,
            premium: true,
          },
        ],
      },
    ];
  }

  // Default: School & College Student Pass
  return [
    {
      category: "AUDITORIUM & SEATING ACCESS",
      rows: [
        {
          name: "Full 2-Day Keynote Talks, Panels & Performances",
          standard: true,
          premium: true,
        },
        {
          name: "Auditorium Seating Allocation",
          standard: "General Tier",
          premium: "Front-Row Bowl",
        },
        {
          name: "Student Research Exhibits & Interactive Installations",
          standard: true,
          premium: true,
        },
      ],
    },
    {
      category: "DINING & HOSPITALITY",
      rows: [
        {
          name: "Catered Networking Lunch & High-Tea Refreshments",
          standard: true,
          premium: true,
        },
        {
          name: "Experience Zones & Snack Refreshment Breaks",
          standard: true,
          premium: true,
        },
      ],
    },
    {
      category: "MERCHANDISE & CREDENTIALS",
      rows: [
        {
          name: "Official Delegate Credential & Commemorative Lanyard",
          standard: "Delegate Badge",
          premium: "Delegate Badge",
        },
        {
          name: "Official Certificate of Participation",
          standard: true,
          premium: true,
        },
        {
          name: "Premium Delegate Pack (Canvas Tote Bag & Decal Sheets)",
          standard: false,
          premium: true,
        },
        {
          name: "Exclusive Metallic Commemorative Lapel Pin",
          standard: false,
          premium: true,
        },
      ],
    },
    {
      category: "EXCLUSIVE VIP PRIVILEGES",
      rows: [
        {
          name: "Fast-Track Priority Registration Check-In Desk",
          standard: false,
          premium: true,
        },
        {
          name: "Exclusive Post-Event Speaker Interaction & Q&A Access",
          standard: false,
          premium: true,
        },
        {
          name: "Digital Presentation Archives & Resource Toolkit",
          standard: false,
          premium: true,
        },
      ],
    },
  ];
};

export default function TierComparisonTable({
  passId,
  passName,
  standardPrice,
  originalStandardPrice,
  premiumPrice,
  registrationUrl,
  className = "",
}: TierComparisonTableProps) {
  const categories = getTierData(passId);
  const isStudent = passId === "school-student" || passId === "student";
  const standardActionHref = isStudent
    ? "mailto:tedx@hyderabad.bits-pilani.ac.in?subject=School%20or%20Student%20Group%20Delegation%20Inquiry%20(Standard%20Tier)%20-%20TEDx%20BITS%20Hyderabad%202026"
    : registrationUrl;
  const premiumActionHref = isStudent
    ? "mailto:tedx@hyderabad.bits-pilani.ac.in?subject=School%20or%20Student%20Group%20Delegation%20Inquiry%20(Premium%20VIP%20Tier)%20-%20TEDx%20BITS%20Hyderabad%202026"
    : registrationUrl;

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
      {/* Echo Table 02 Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-700 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#eb0028]" />
            <span>Tier Comparison Matrix</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
            Standard vs <span className="text-[#eb0028]">Premium VIP</span>
          </h3>
          <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed mt-1.5 max-w-2xl">
            Compare all inclusions, seat allocations, merchandise, and post-event privileges side-by-side to choose the best experience for {passName}.
          </p>
        </div>
      </div>

      {/* Mobile swipe hint */}
      <div className="md:hidden flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-2 px-1">
        <span>← Swipe horizontally to compare tiers →</span>
      </div>

      {/* Flowbase Echo Table 02 Container */}
      <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white shadow-xs">
        <table className="w-full text-left border-collapse min-w-[620px]">
          <thead>
            <tr className="border-b border-neutral-200 bg-white">
              {/* Features Column Header */}
              <th className="py-6 px-6 font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-500 w-1/2 align-bottom">
                FEATURE INCLUSIONS
              </th>

              {/* Standard Tier Header */}
              <th className="py-6 px-6 text-center w-1/4 border-l border-neutral-100 align-top">
                <div className="flex flex-col items-center">
                  <div className="font-mono text-[10px] uppercase tracking-wider font-bold text-neutral-400 mb-1">
                    ESSENTIAL TIER
                  </div>
                  <h4 className="font-bold text-base text-neutral-900">Standard Tier</h4>
                  <div className="mt-2 text-xl sm:text-2xl font-bold text-neutral-900 flex items-baseline justify-center gap-1.5">
                    <span>{standardPrice}</span>
                    {originalStandardPrice && (
                      <span className="text-xs text-neutral-400 line-through font-normal">
                        {originalStandardPrice}
                      </span>
                    )}
                  </div>
                  {isStudent ? (
                    <a
                      href="mailto:tedx@hyderabad.bits-pilani.ac.in?subject=School%20or%20Student%20Group%20Delegation%20Inquiry%20-%20TEDx%20BITS%20Hyderabad%202026"
                      className="mt-3 inline-flex items-center gap-1 px-4 py-1.5 rounded-[4px] bg-[#0a0a0c] hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      <span>CONTACT DELEGATION</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  ) : (
                    <a
                      href={standardActionHref}
                      className="mt-3 inline-flex items-center gap-1 px-4 py-1.5 rounded-[4px] bg-[#0a0a0c] hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      <span>SELECT STANDARD</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </th>

              {/* Premium VIP Tier Header with Red Top Border */}
              <th className="py-6 px-6 text-center w-1/4 border-l border-neutral-100 align-top bg-red-50/20 relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#eb0028]" />
                <div className="flex flex-col items-center">
                  <div className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#eb0028] mb-1 flex items-center gap-1">
                    <span>MOST POPULAR</span>
                    <span>★</span>
                  </div>
                  <h4 className="font-bold text-base text-neutral-900">Premium VIP Tier</h4>
                  <div className="mt-2 text-xl sm:text-2xl font-bold text-neutral-900 flex items-baseline justify-center">
                    <span>{premiumPrice}</span>
                  </div>
                  {isStudent ? (
                    <a
                      href="mailto:tedx@hyderabad.bits-pilani.ac.in?subject=School%20or%20Student%20Group%20Delegation%20Inquiry%20-%20TEDx%20BITS%20Hyderabad%202026"
                      className="mt-3 inline-flex items-center gap-1 px-4 py-1.5 rounded-[4px] bg-[#eb0028] hover:bg-[#c40022] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      <span>CONTACT DELEGATION</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  ) : (
                    <a
                      href={premiumActionHref}
                      className="mt-3 inline-flex items-center gap-1 px-4 py-1.5 rounded-[4px] bg-[#eb0028] hover:bg-[#c40022] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      <span>SELECT VIP ★</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="text-sm font-sans divide-y divide-neutral-100">
            {categories.map((group, groupIdx) => (
              <React.Fragment key={groupIdx}>
                {/* Category Header Row */}
                <tr className="bg-neutral-50/80">
                  <td
                    colSpan={3}
                    className="py-3 px-6 font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-500"
                  >
                    {group.category}
                  </td>
                </tr>

                {/* Inclusions Rows */}
                {group.rows.map((row, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className="hover:bg-neutral-50/50 transition-colors"
                  >
                    <td className="py-3.5 px-6 text-neutral-800 font-normal text-xs sm:text-sm">
                      {row.name}
                    </td>
                    <td className="py-3.5 px-6 text-center border-l border-neutral-100 align-middle">
                      {renderValue(row.standard)}
                    </td>
                    <td className="py-3.5 px-6 text-center border-l border-neutral-100 align-middle bg-red-50/10">
                      {renderValue(row.premium)}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Flowbase Echo Table 02 Feature Highlights Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8 pt-8 border-t border-neutral-100">
        <div className="p-5 rounded-xl bg-neutral-50/80 border border-neutral-200/80">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1.5">
            Front-Row &amp; Prime Seating
          </div>
          <div className="h-[2px] w-6 bg-[#eb0028] mb-2.5" />
          <p className="text-xs text-neutral-600 leading-relaxed font-normal">
            VIP passes allocate reserved front-row bowl and prime stalls seating, offering optimal audio-visual immersion and direct stage sightlines.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-neutral-50/80 border border-neutral-200/80">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1.5">
            Exclusive Speaker Mixer
          </div>
          <div className="h-[2px] w-6 bg-[#eb0028] mb-2.5" />
          <p className="text-xs text-neutral-600 leading-relaxed font-normal">
            Direct invitation to the private post-event networking mixer, offering rare one-on-one conversations with speakers, innovators, and organizers.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-neutral-50/80 border border-neutral-200/80">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1.5">
            Collector Merchandise Pack
          </div>
          <div className="h-[2px] w-6 bg-[#eb0028] mb-2.5" />
          <p className="text-xs text-neutral-600 leading-relaxed font-normal">
            Take home the official TEDx commemorative tote bag, metallic lapel pin, premium journal, and digital presentation transcripts.
          </p>
        </div>
      </div>
    </div>
  );
}
