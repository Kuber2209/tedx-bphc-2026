"use client";

import React from "react";
import Link from "next/link";
import { passTiers } from "@/data/passes";
import PassComparisonTable from "@/components/passes/PassComparisonTable";
import BlurText from "@/components/reactbits/BlurText";
import BorderGlow from "@/components/reactbits/BorderGlow";
import FloatingLines from "@/components/reactbits/FloatingLines";
import {
  GraduationCap,
  Building2,
  Globe,
  Check,
  ArrowUpRight,
  HelpCircle,
  Users,
  Phone,
} from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";
import TEDxWatermark from "@/components/layout/TEDxWatermark";



const getPassIcon = (id: string) => {
  switch (id) {
    case "school-student":
      return <GraduationCap className="h-5 w-5 text-[#eb0028]" />;
    case "bits-internal":
      return <Building2 className="h-5 w-5 text-[#eb0028]" />;
    case "external-guest":
      return <Globe className="h-5 w-5 text-[#eb0028]" />;
    default:
      return <Check className="h-5 w-5 text-[#eb0028]" />;
  }
};

export default function PassesPage() {
  return (
    <div
      style={{ zoom: 0.8 }}
      className="zoom-80 bg-[#fcfcfc] text-neutral-900 min-h-screen font-sans selection:bg-[#E62B1E] selection:text-white pb-32 relative"
    >
      <TEDxWatermark />
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none opacity-20">
         <FloatingLines color="#eb0028" />
      </div>

      <div className="relative z-10">
        {/* 1. Header Section */}
        <section className="relative pt-40 pb-20 px-6 md:px-12 overflow-hidden">
          <div className="max-w-[1000px] mx-auto text-center relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white border border-neutral-200 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E62B1E] animate-pulse"></span>
              <p className="text-[#E62B1E] font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-center">
                Conference Registration · 2026
              </p>
            </div>

            <BlurText
              text="Join the room."
              as="h1"
              delay={140}
              animateBy="words"
              direction="top"
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[96px] font-bold tracking-tight mb-8 text-neutral-900 leading-[0.95] text-center"
              highlightWords={{
                room: "font-sans font-light text-zinc-400",
                "room.": "font-sans font-light text-zinc-400",
              }}
            />

            <BlurText
              text="Seating in the Main Auditorium is curated across three designated categories: school students, the in-house BITS Pilani community, and external guests."
              as="p"
              delay={25}
              animateBy="words"
              direction="bottom"
              className="text-lg md:text-xl font-light text-neutral-500 max-w-2xl mx-auto leading-relaxed text-center mb-6"
            />
          </div>
        </section>

        {/* 2. Three Pass Tiers Grid */}
        <section className="relative pb-24 px-6 md:px-12">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {passTiers.map((pass) => (
                <BorderGlow
                  key={pass.id}
                  glowColor="#eb0028"
                  glowSize={360}
                  borderWidth={1.5}
                  borderRadius="1rem"
                  showOuterGlow={true}
                  intensity={0.5}
                  highlight={false}
                  className="h-full w-full"
                >
                  <div className="group relative flex flex-col justify-between p-8 sm:p-10 rounded-2xl w-full h-full bg-white border border-neutral-200 shadow-sm">
                    {/* Accent top line */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl transition-opacity duration-500 bg-gradient-to-r from-neutral-200 to-transparent opacity-0 group-hover:opacity-100" />

                    {/* Top Section */}
                    <div>
                      {/* Category Pill */}
                      <div className="flex items-center justify-between gap-2 mb-8">
                        <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-600">
                          {getPassIcon(pass.id)}
                          <span>{pass.badge}</span>
                        </span>
                      </div>

                      {/* Pass Name & Target Audience */}
                      <div className="mb-6">
                        <h3 className="text-3xl font-bold tracking-tight text-neutral-900 mb-2 group-hover:text-[#eb0028] transition-colors">
                          <Link href={`/passes/${pass.id}`}>
                            {pass.name}
                          </Link>
                        </h3>
                        <p className="font-sans text-base text-zinc-600 font-medium">
                          {pass.targetAudience}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-sm font-light text-neutral-600 leading-relaxed mb-4">
                        {pass.description}
                      </p>

                      {pass.id === "school-student" && (
                        <p className="text-xs text-neutral-600 font-medium mb-4">
                          Delegations &amp; Registrations:{" "}
                          <a
                            href="tel:+916388668213"
                            className="text-[#eb0028] font-bold hover:underline inline-flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3 inline" />
                            <span>+91 63886 68213</span>
                          </a>
                        </p>
                      )}
                    </div>

                    {/* Bottom CTA Area */}
                    <div className="pt-6 border-t border-neutral-100 mt-auto relative z-20">
                      <Link
                        href={`/passes/${pass.id}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-bold tracking-[0.2em] uppercase rounded-full bg-black text-white hover:bg-neutral-800 hover:shadow-lg shadow-sm transition-all duration-300"
                      >
                        <span>View Pass Details</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </BorderGlow>
              ))}
            </div>

            {/* Pass Inclusions & Privileges with interactive tabs */}
            <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-white border border-neutral-200/80 shadow-xs">
              <PassComparisonTable showTabs={true} showHeader={true} />
            </div>

            {/* Delegation & School Bookings Callout Banner */}
            <div className="mt-20 p-8 md:p-12 rounded-3xl border border-neutral-200 bg-white shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-neutral-50 to-transparent pointer-events-none" />
              <div className="max-w-2xl relative z-10">
                <div className="flex items-center gap-2 text-[#eb0028] mb-4">
                  <Users className="h-4 w-4" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                    Delegation Desk
                  </span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-4">
                  School Contingents & Institutional Delegations
                </h4>
                <p className="text-base font-light text-neutral-600 leading-relaxed">
                  If you represent a high school, junior college, or academic organization bringing
                  a group of 10 or more delegates, our team facilitates coordinated ticketing, seating,
                  and bus transit clearance.
                </p>
              </div>

              <div className="relative z-10 shrink-0 w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3">
                <FlowButton
                  href="mailto:tedx@hyderabad.bits-pilani.ac.in?subject=School%20or%20Group%20Delegation%20Inquiry%20-%20TEDx%20BITS%20Hyderabad%202026"
                  text="Request Delegation Access"
                  variant="black"
                  icon={ArrowUpRight}
                  className="w-full lg:w-auto text-xs font-bold uppercase tracking-[0.15em] py-4 px-8"
                />
                <a
                  href="tel:+916388668213"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-900 font-semibold text-xs uppercase tracking-wider transition-colors text-center shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-[#eb0028]" />
                  <span>Call +91 63886 68213</span>
                </a>
              </div>
            </div>

            {/* 5. Support / Questions Section */}
            <div className="mt-24 text-center max-w-xl mx-auto flex flex-col items-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-neutral-100 mb-6 text-[#eb0028]">
                <HelpCircle className="h-5 w-5" />
              </div>
              <h4 className="text-2xl font-bold text-neutral-900 mb-3 text-center">
                Questions about passes?
              </h4>
              <p className="text-base text-neutral-500 font-light mb-8 leading-relaxed">
                Reach out to our delegate relations team for assistance with pass access, group reservations,
                accessibility, and event schedule logistics.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <a
                  href="mailto:tedx@hyderabad.bits-pilani.ac.in"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] border-b-2 border-neutral-300 pb-1.5 hover:text-[#eb0028] hover:border-[#eb0028] transition-colors"
                >
                  <span>Email Delegate Relations</span>
                  <span>→</span>
                </a>
                <a
                  href="tel:+916388668213"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] border-b-2 border-neutral-300 pb-1.5 hover:text-[#eb0028] hover:border-[#eb0028] transition-colors"
                >
                  <Phone className="h-3 w-3 text-[#eb0028]" />
                  <span>Call +91 63886 68213</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
