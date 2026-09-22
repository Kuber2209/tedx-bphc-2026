"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TEAM_SECTIONS, ALL_TEAM_MEMBERS } from "@/data/team";
import TeamMemberCard from "@/components/team/TeamMemberCard";
import SectionScrollNavigator from "@/components/ui/SectionScrollNavigator";
import TEDxWatermark from "@/components/layout/TEDxWatermark";

const TEAM_NAV_SECTIONS = TEAM_SECTIONS.map((section, idx) => ({
  id: section.id,
  label: String(idx + 1).padStart(2, "0"),
  title: section.title.replace("TEDx ", ""),
}));

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredSections =
    activeTab === "all"
      ? TEAM_SECTIONS
      : TEAM_SECTIONS.filter((section) => section.id === activeTab);

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#181830] selection:bg-[#eb0028] selection:text-white relative">
      {/* Fixed Left-Side Vertical Scroll Navigator */}
      {activeTab === "all" && (
        <SectionScrollNavigator
          sections={TEAM_NAV_SECTIONS}
          targetContainerId="team-sections-container"
        />
      )}
      {/* 
        HERO SECTION (Matching TEDx MIT .rl_section_hero.team)
        - Background banner with real team photo on stage
        - 70vh minimum height
        - Left-aligned content container (max-w-[35rem])
        - Rectangular buttons (rounded-[4px])
      */}
      <header className="relative z-10 w-full overflow-hidden bg-black min-h-[60vh] md:min-h-[70vh] flex items-center">
        {/* Background banner image matching user's uploaded stage team photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/team-banner.jpg"
            alt="TEDx BPHC Team"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Left-side cinematic shadow: protects text contrast on the left while keeping center & right team stage photo crystal clear */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.62) 28%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0) 75%)",
            }}
          />
          {/* Subtle mobile bottom gradient for compact screens */}
          <div
            className="absolute inset-0 pointer-events-none md:hidden"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0) 70%)",
            }}
          />
          {/* Soft grounding bottom fade */}
          <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-[80rem] mx-auto px-6 md:px-12 py-20 md:py-28">
          <div className="max-w-[34rem] text-white">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white tracking-tight leading-[1.15] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
              Meet the TEDx BPHC Team
            </h1>

            {/* Spacing block 1 */}
            <div className="h-4 w-full" aria-hidden="true" />

            {/* Subtitle */}
            <p className="text-white/90 text-base md:text-lg font-normal leading-relaxed drop-shadow-[0_1px_5px_rgba(0,0,0,0.6)]">
              Discover the organizers who bring inspiring ideas to the stage and create unforgettable TEDx BPHC experiences.
            </p>

            {/* Spacing block 2 */}
            <div className="h-6 w-full" aria-hidden="true" />

            {/* MIT CTA Button Group: rectangular rounded-[4px] buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/passes"
                className="inline-flex items-center justify-center px-6 py-3 rounded-[4px] bg-[#eb0028] hover:bg-[#c40022] text-white font-semibold text-sm sm:text-base transition-colors duration-200 shadow-sm"
              >
                Register for 15th Nov
              </Link>
              <Link
                href="/speakers"
                className="inline-flex items-center justify-center px-6 py-3 rounded-[4px] border border-white hover:bg-white hover:text-black text-white font-semibold text-sm sm:text-base transition-all duration-200"
              >
                Speaker Lineup
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 
        TEAM GRID SECTION (Matching TEDx MIT .rl_section_speakers & .collection-list-5)
        - Clean white background (#ffffff)
        - Filter tabs as usual
        - Responsive 3-column collection grid
        - Completely static without canvas/background animations
      */}
      <section id="team-sections-container" className="bg-transparent py-16 md:py-24 relative z-10 overflow-hidden">
        <TEDxWatermark className="top-4 sm:top-8" />
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 relative z-10">
          {/* Department Filter Navigation ("with filters as usual") */}
          <div className="mb-14 pb-4 border-b border-zinc-200 flex flex-wrap items-center gap-2 md:gap-3">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2 text-sm md:text-base font-medium rounded-full transition-all duration-200 ${
                activeTab === "all"
                  ? "bg-[#181830] text-white shadow-xs"
                  : "bg-zinc-100 text-[#494949] hover:bg-zinc-200 hover:text-black"
              }`}
            >
              All Members ({ALL_TEAM_MEMBERS.length})
            </button>
            {TEAM_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`px-5 py-2 text-sm md:text-base font-medium rounded-full transition-all duration-200 ${
                  activeTab === section.id
                    ? "bg-[#181830] text-white shadow-xs"
                    : "bg-zinc-100 text-[#494949] hover:bg-zinc-200 hover:text-black"
                }`}
              >
                {section.title} ({section.members.length})
              </button>
            ))}
          </div>

          {/* Department Sections */}
          <div className="space-y-16 md:space-y-24">
            {filteredSections.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-32">
                {/* Department Section Header */}
                <div className="mb-8 pb-3 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#181830] tracking-tight">
                      {section.title}
                    </h2>
                    {section.description && (
                      <p className="text-[#64748B] text-sm sm:text-base mt-1 font-normal">
                        {section.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold shrink-0">
                    {section.members.length} {section.members.length === 1 ? "Member" : "Members"}
                  </span>
                </div>

                {/* 
                  3-COLUMN COLLECTION GRID (collection-list-5)
                  Matching TEDx MIT 3-column collection list
                */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-10 lg:gap-y-14">
                  {section.members.map((member, idx) => (
                    <TeamMemberCard key={member.id} member={member} index={idx} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

