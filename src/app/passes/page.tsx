"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Check,
  ArrowRight,
  GraduationCap,
  Building2,
  Globe,
  Users,
  HelpCircle,
} from "lucide-react";

interface PassCardData {
  id: string;
  name: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  audience: string;
  description: string;
  highlight?: boolean;
  highlightBadge?: string;
  earlyBird?: boolean;
  standardPrice: string;
  originalPrice?: string;
  premiumPrice: string;
  inclusions: string[];
}

const passCards: PassCardData[] = [
  {
    id: "school-student",
    name: "Student Pass",
    badge: "GRADES 9–12",
    icon: GraduationCap,
    audience: "School & College Students",
    description: "Curated for students and young thinkers exploring big ideas.",
    highlight: false,
    standardPrice: "₹429",
    premiumPrice: "₹550",
    inclusions: [
      "Full 2-Day Auditorium Keynote & Performance Access",
      "Official Delegate Credential & Lanyard Badge",
      "Catered Networking Lunch & High-Tea Refreshments",
      "Official Certificate of Participation",
    ],
  },
  {
    id: "external-guest",
    name: "External Guest Pass",
    badge: "GENERAL DELEGATE",
    icon: Globe,
    audience: "Outside Guests & Professionals",
    description:
      "Open to university students, working professionals, founders, and delegates joining us from outside BITS.",
    highlight: true,
    highlightBadge: "MOST POPULAR",
    standardPrice: "₹650",
    premiumPrice: "₹850",
    inclusions: [
      "Full 2-Day Auditorium Keynote & Performance Access",
      "Official Delegate Credential & Lanyard Badge",
      "Campus Visitor Vehicle Entry & Reserved Parking Clearance",
      "Curated Executive Networking Luncheon & Refreshments",
    ],
  },
  {
    id: "bits-internal",
    name: "BITSian Pass",
    badge: "IN-HOUSE CAMPUS TIER",
    icon: Building2,
    audience: "BITS BPHC Students, Faculty & Staff",
    description:
      "Exclusive access tier for the on-campus BITS Pilani Hyderabad community to experience the flagship edition.",
    highlight: false,
    earlyBird: true,
    standardPrice: "₹650",
    originalPrice: "₹999",
    premiumPrice: "₹1,299",
    inclusions: [
      "Full 2-Day Auditorium Keynote & Performance Access",
      "Official BPHC Attendee Credential & Commemorative Lanyard",
      "Academic Attendance Condonation Facilitation",
      "Catered Networking Luncheon & High-Tea",
    ],
  },
];

export default function PassesPage() {
  const heroWords = ["Get", "your", "pass."];

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#494949] font-sans selection:bg-[#eb0028] selection:text-white">
      {/* 1. CINEMATIC HERO — Dark stage anchor matching homepage sections */}
      <header className="relative w-full bg-[#0a0a0c] overflow-hidden min-h-[440px] md:min-h-[500px] flex items-center">
        {/* Subtle dark gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-black/40 to-black/80 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(circle_at_top_right,rgba(235,0,40,0.25),transparent_60%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-[80rem] mx-auto px-6 md:px-12 pt-36 pb-20 md:pt-44 md:pb-28">
          <div className="max-w-[42rem] text-left">
            {/* Headline with word reveal animation */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-5 overflow-hidden">
              {heroWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.3em] last:mr-0"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.15 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle sentence */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/90 text-lg md:text-[1.125rem] font-normal leading-relaxed mb-6 max-w-xl"
            >
              Join us for two days of transformative ideas, conversations, and multidisciplinary talks at BITS Pilani Hyderabad Campus.
            </motion.p>

            {/* Info line */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm text-neutral-400 flex flex-wrap items-center gap-2.5 font-normal tracking-wide"
            >
              <span className="text-neutral-300">March 2026</span>
              <span className="text-neutral-600">·</span>
              <span className="text-neutral-300">Auditorium, BITS Pilani Hyderabad Campus</span>
              <span className="text-neutral-600">·</span>
              <span className="inline-flex items-center text-white font-medium gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Registrations Open
              </span>
            </motion.div>
          </div>
        </div>
      </header>

      {/* 2. MAIN PASSES SECTION */}
      <main className="max-w-[80rem] mx-auto px-6 md:px-12 py-16 md:py-24 space-y-24">
        {/* Three Ticket-Style Pass Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
          {passCards.map((pass, index) => {
            const isHighlighted = pass.highlight;
            const Icon = pass.icon;

            return (
              <motion.div
                key={pass.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                whileHover={{ y: -6 }}
                className={`relative bg-white rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-xl ${
                  isHighlighted
                    ? "border-2 border-[#eb0028]"
                    : "border border-neutral-200/90 hover:border-neutral-300"
                }`}
              >
                {/* Overhanging Centered Badge for BITSian Pass */}
                {pass.highlightBadge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1 rounded-full bg-[#eb0028] text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                    {pass.highlightBadge}
                  </div>
                )}

                <div>
                  {/* Top Category & Phase Chips */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-[10px] font-mono font-bold uppercase tracking-wider border border-neutral-200/60">
                      <Icon className={`w-3 h-3 ${isHighlighted ? "text-[#eb0028]" : "text-neutral-500"}`} />
                      <span>{pass.badge}</span>
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase font-semibold">
                      PHASE 1
                    </span>
                  </div>

                  {/* Pass Name & Red Target Audience Subtitle */}
                  <div className="mb-4">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-1">
                      {pass.name}
                    </h2>
                    <p className="text-sm font-semibold text-[#eb0028]">
                      {pass.audience}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-600 font-normal leading-relaxed mb-6">
                    {pass.description}
                  </p>

                  {/* Core Inclusions List */}
                  <div className="pt-2">
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-neutral-400 mb-3">
                      CORE INCLUSIONS
                    </p>
                    <ul className="space-y-3">
                      {pass.inclusions.map((inc, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-neutral-700 leading-normal"
                        >
                          <Check className="h-4 w-4 text-[#eb0028] shrink-0 mt-0.5 stroke-[2.5]" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Dashed Perforation Divider */}
                <div className="my-6 border-t border-dashed border-neutral-200" />

                {/* Bottom Pricing & CTA Area */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-bold">
                      DELEGATE ADMISSION
                    </p>
                    {pass.earlyBird && (
                      <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200/60 font-bold px-2 py-0.5 rounded-full">
                        Early Bird
                      </span>
                    )}
                  </div>

                  {/* Large Price with Strikethrough */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
                      {pass.standardPrice}
                    </span>
                    {pass.originalPrice && (
                      <span className="text-base text-neutral-400 line-through">
                        {pass.originalPrice}
                      </span>
                    )}
                    <span className="text-xs text-neutral-500 font-normal">
                      / Standard
                    </span>
                  </div>

                  {/* Sub-price callout */}
                  <p className="text-xs text-neutral-500 font-normal mb-6">
                    or {pass.premiumPrice} for Premium VIP Pass
                  </p>

                  {/* CTA Button */}
                  <Link
                    href={`/passes/${pass.id}`}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-[4px] font-semibold text-xs sm:text-sm uppercase tracking-wider text-center transition-all duration-200 ${
                      isHighlighted
                        ? "bg-[#eb0028] hover:bg-[#c40022] text-white shadow-sm"
                        : "bg-[#0a0a0c] hover:bg-neutral-800 text-white"
                    }`}
                  >
                    <span>VIEW PASS DETAILS</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 3. INSTITUTIONAL & SCHOOL DELEGATION DESK */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 sm:p-12 rounded-2xl border border-neutral-200/90 bg-white shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[#eb0028] mb-3">
              <Users className="h-4 w-4" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                INSTITUTIONAL DESK
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-3">
              School Contingents &amp; Group Delegations
            </h3>
            <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
              If you represent a school, university delegation, or corporate team bringing a group of 10 or more delegates, our organizing committee facilitates coordinated group ticketing, priority block seating, campus transit clearance, and consolidated invoicing.
            </p>
          </div>

          <div className="shrink-0 w-full lg:w-auto">
            <a
              href="mailto:tedx@hyderabad.bits-pilani.ac.in?subject=School%20or%20Group%20Delegation%20Inquiry%20-%20TEDx%20BITS%20Hyderabad%202026"
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-[4px] bg-[#0a0a0c] hover:bg-neutral-800 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-sm text-center"
            >
              <span>CONTACT DELEGATION DESK</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* 4. QUESTIONS & DELEGATE RELATIONS HELP */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-xl mx-auto flex flex-col items-center pt-6"
        >
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-red-50 text-[#eb0028] mb-5 border border-red-100">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h4 className="text-2xl font-bold text-neutral-900 mb-3">
            Questions regarding passes?
          </h4>
          <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed mb-6 max-w-lg">
            Reach out to our delegate relations team for assistance with category eligibility, group reservations, campus entry protocols, or schedule details.
          </p>
          <a
            href="mailto:tedx@hyderabad.bits-pilani.ac.in"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#eb0028] hover:underline transition-all"
          >
            <span>TEDX@HYDERABAD.BITS-PILANI.AC.IN</span>
            <span>→</span>
          </a>
        </motion.div>
      </main>
    </div>
  );
}
