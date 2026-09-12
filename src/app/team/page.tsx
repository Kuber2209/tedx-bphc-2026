"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TEAM_SECTIONS, ALL_TEAM_MEMBERS } from "@/data/team";
import TeamMemberCard from "@/components/team/TeamMemberCard";

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredSections =
    activeTab === "all"
      ? TEAM_SECTIONS
      : TEAM_SECTIONS.filter((section) => section.id === activeTab);

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#0F172A] selection:bg-[#DD183B] selection:text-white">
      {/* 
        HERO SECTION (Infused with TEDx Kyoto Editorial Vision & MIT Clarity)
        - Kyoto Motto Badge: "IDEAS CHANGE EVERYTHING"
        - Global-to-Local Tagline
        - Refined Vermillion (#DD183B) Pill CTAs
        - Completely static; NO background animations.
      */}
      <header className="relative w-full bg-[#08080a] overflow-hidden border-b border-zinc-800/40">
        {/* Subtle radial Kyoto ambient warmth */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_top_right,rgba(221,24,59,0.22),transparent_55%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-75 bg-gradient-to-b from-black/85 via-black/65 to-[#08080a]"
          aria-hidden="true"
        />

        <div className="relative max-w-[80rem] mx-auto px-6 md:px-12 pt-36 pb-20 md:pt-44 md:pb-28">
          <div className="max-w-[46rem]">
            {/* Kyoto Signature Motto Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#DD183B]/15 border border-[#DD183B]/30 text-[#DD183B] text-[11px] font-bold uppercase tracking-[0.25em] mb-6 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DD183B] animate-pulse" />
              IDEAS CHANGE EVERYTHING
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white tracking-tight leading-[1.15]">
              Meet the TEDx BPHC Team
            </h1>

            {/* Spacing block (1.25rem / 20px) */}
            <div className="h-5 w-full" aria-hidden="true" />

            {/* Kyoto Vision Tagline */}
            <p className="text-lg sm:text-xl font-medium text-white/95 tracking-wide leading-snug">
              Great ideas from Hyderabad to the world, and from the world to Hyderabad.
            </p>

            {/* Supporting Subtitle */}
            <p className="text-white/70 text-base sm:text-lg font-normal leading-relaxed mt-3 max-w-[40rem]">
              Discover the organizers, curators, and creative thinkers who bring inspiring ideas
              to the stage and create unforgettable TEDx experiences.
            </p>

            {/* Spacing block (2rem / 32px) */}
            <div className="h-8 w-full" aria-hidden="true" />

            {/* Kyoto-styled Pill CTA Button Group */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/passes"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#DD183B] hover:bg-[#CC1939] text-white font-semibold text-sm tracking-wide transition-all duration-300 shadow-md shadow-[#DD183B]/20 active:scale-95"
              >
                <span>Register for 2026</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="/speakers"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/40 hover:border-white hover:bg-white/10 text-white font-semibold text-sm tracking-wide transition-all duration-300 active:scale-95"
              >
                <span>Speaker Lineup</span>
                <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 
        TEAM GRID SECTION
        - High-contrast clean background (#fafafa)
        - Kyoto-style Pill Navigation
        - Responsive 3-column collection list
        - Completely static without canvas animations
      */}
      <section className="py-16 md:py-24">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12">
          {/* Department Filter Navigation (Kyoto Pill Style) */}
          <div className="mb-14 pb-5 border-b border-zinc-200/80 flex flex-wrap items-center gap-2.5 md:gap-3">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-full tracking-wide transition-all duration-200 ${
                activeTab === "all"
                  ? "bg-[#0F172A] text-white shadow-sm"
                  : "bg-white border border-zinc-200 text-[#475569] hover:border-[#DD183B]/40 hover:text-[#DD183B]"
              }`}
            >
              All Members <span className="opacity-70 font-mono">({ALL_TEAM_MEMBERS.length})</span>
            </button>
            {TEAM_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-full tracking-wide transition-all duration-200 ${
                  activeTab === section.id
                    ? "bg-[#0F172A] text-white shadow-sm"
                    : "bg-white border border-zinc-200 text-[#475569] hover:border-[#DD183B]/40 hover:text-[#DD183B]"
                }`}
              >
                {section.title} <span className="opacity-70 font-mono">({section.members.length})</span>
              </button>
            ))}
          </div>

          {/* Department Sections */}
          <div className="space-y-20 md:space-y-28">
            {filteredSections.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-32">
                {/* Department Section Header with Kyoto Minimal Japanese Accent */}
                <div className="mb-10 flex flex-col md:flex-row md:items-baseline justify-between gap-3 border-b border-zinc-200/60 pb-5">
                  <div>
                    {/* Minimal vermillion accent line */}
                    <div className="h-[3px] w-8 bg-[#DD183B] rounded-full mb-3" />
                    <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] tracking-tight">
                      {section.title}
                    </h2>
                    {section.description && (
                      <p className="text-[#64748B] text-base md:text-lg mt-1 font-normal">
                        {section.description}
                      </p>
                    )}
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#DD183B]/10 text-[#DD183B]">
                    {section.members.length} {section.members.length === 1 ? "Member" : "Members"}
                  </span>
                </div>

                {/* 
                  3-COLUMN COLLECTION GRID
                  Matching Kyoto & MIT collection grid
                */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                  {section.members.map((member, idx) => (
                    <div key={member.id}>
                      <TeamMemberCard member={member} index={idx} />
                    </div>
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
