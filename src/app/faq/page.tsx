"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/base-ui/accordion";
import {
  Search,
  Sparkles,
  Ticket,
  MapPin,
  Mic,
  HelpCircle,
  ArrowRight,
  Mail,
  Compass,
  Plus,
  Minus,
} from "lucide-react";

interface FAQItem {
  id: string;
  category: "Theme & Concept" | "Passes & Entry" | "Event & Venue" | "Speakers & Talks" | "Experience";
  question: string;
  answer: string;
  highlight?: boolean;
}

const FAQ_DATA: FAQItem[] = [
  // ── THEME & CONCEPT ──
  {
    id: "faq-01",
    category: "Theme & Concept",
    question: "What is the official theme of TEDx BITS Hyderabad 2026?",
    answer:
      "This year’s theme is “Invisible Threads.” It explores the unseen connections that quietly shape our lives, from the people and experiences that influence who we become to the systems, ideas, choices, and circumstances that connect us in ways we rarely notice. Some threads are deeply personal, like a mentor’s advice that stays with us for years; others are societal, linking technology, culture, communities, and even seemingly unrelated ideas. These connections may be invisible, but their effects are not.",
    highlight: true,
  },
  {
    id: "faq-02",
    category: "Theme & Concept",
    question: "How does the “Invisible Threads” theme shape the conference day?",
    answer:
      "Rather than isolating disciplines into academic silos, our schedule is woven as four connected acts: Thread I (Personal Catalysts & Foundations), Thread II (Communal Exchange & Dialogue), Thread III (Societal & Technological Webs), and Thread IV (The Collective Tapestry). Talks on ecological mycelium converse with orbital telemetry, and folk oral histories intersect with ambient computing.",
  },
  {
    id: "faq-03",
    category: "Theme & Concept",
    question: "What makes the 12th Edition special for BITS Pilani Hyderabad?",
    answer:
      "Marking twelve editions of independent TEDx discourse on campus, the 12th Edition represents an evolution toward high-production editorial storytelling. We bring together six visionary keynote speakers, interactive student robotics installations, kinetic art walls, and a curated outdoor sundowner designed for meaningful human resonance.",
  },

  // ── PASSES & ENTRY ──
  {
    id: "faq-04",
    category: "Passes & Entry",
    question: "What pass tiers are available, and who is eligible?",
    answer:
      "We offer two official tiers: Student Passes (available to enrolled university and school students with a valid institutional photo ID) and Standard Delegate Passes (open to working professionals, researchers, alumni, and general delegates). Both tiers provide identical full-day access to all keynote sessions and inclusions.",
  },
  {
    id: "faq-05",
    category: "Passes & Entry",
    question: "What is included with my conference pass?",
    answer:
      "Every pass grants guaranteed theatre seating in the main auditorium, the official 12th Edition curated delegate kit (notebook, badge, custom conference merchandise), morning South Indian filter coffee & light breakfast, a seated farm-to-table lunch on the dining lawn, afternoon high tea, and admission to the evening sundowner mixer.",
  },
  {
    id: "faq-06",
    category: "Passes & Entry",
    question: "Can I transfer or cancel my pass if I am unable to attend?",
    answer:
      "In accordance with standard TEDx licensing guidelines and venue seating constraints, passes are strictly non-refundable. However, you may request a one-time delegate transfer up to 7 calendar days before the event by emailing our registrations desk with your booking reference and the substitute delegate’s verified details.",
  },

  // ── EVENT & VENUE ──
  {
    id: "faq-07",
    category: "Event & Venue",
    question: "When and where does the conference take place?",
    answer:
      "The conference will take place on Saturday, 14 November 2026, from 09:00 AM to 05:30 PM. The venue is the Main University Auditorium at BITS Pilani Hyderabad Campus, Jawahar Nagar, Kapra, Hyderabad, Telangana 500078.",
  },
  {
    id: "faq-08",
    category: "Event & Venue",
    question: "How do I reach BITS Pilani Hyderabad Campus, and is parking available?",
    answer:
      "The campus is situated along the Rajiv Rahadari / Karimnagar Highway in Jawahar Nagar, Shamirpet. It is approximately 45 minutes from Secunderabad Railway Station and approximately 60–75 minutes from Rajiv Gandhi International Airport (RGIA) via the Nehru Outer Ring Road (Exit 7). Free designated guest parking is available immediately adjacent to the main auditorium gate.",
  },
  {
    id: "faq-09",
    category: "Event & Venue",
    question: "Is the venue wheelchair accessible?",
    answer:
      "Yes. The BITS Pilani Hyderabad Auditorium is equipped with step-free wheelchair access ramps, wide double doors, accessible restrooms on the main concourse, and dedicated priority seating positions in the auditorium bowl. If you require special assistance, please notify our accessibility team during registration.",
  },

  // ── SPEAKERS & TALKS ──
  {
    id: "faq-10",
    category: "Speakers & Talks",
    question: "How many speakers will take the stage, and what is the talk format?",
    answer:
      "The 2026 conference features 6 carefully curated keynote speakers from diverse spheres including deep-tech architecture, ecological biology, aerospace systems, behavioral economics, cultural anthropology, and universal design. Each talk follows the classic TED format of 18 minutes or fewer — concise, concentrated, and compelling.",
  },
  {
    id: "faq-11",
    category: "Speakers & Talks",
    question: "Will the talks be recorded and published on YouTube?",
    answer:
      "Yes. In compliance with TEDx technical and media regulations, all keynote presentations are recorded in 4K multi-camera cinematography. Following post-production and TED curation clearance, talks are published on the official TEDx YouTube Channel, reaching an international audience of over 40 million subscribers.",
  },
  {
    id: "faq-12",
    category: "Speakers & Talks",
    question: "Can attendees meet and interact with the speakers?",
    answer:
      "Absolutely. Unlike traditional passive conferences, TEDx BPHC engineers intentional social touchpoints. Speakers join attendees during the midday farm-to-table lunch and the concluding high-tea sundowner, providing ample space for unscripted conversation and dialogue.",
  },

  // ── EXPERIENCE & GUIDELINES ──
  {
    id: "faq-13",
    category: "Experience",
    question: "What is the recommended dress code for attendees?",
    answer:
      "The dress code is Smart Casual / Creative Formal. We encourage attendees to dress comfortably for a full day of intellectual immersion, with consideration for both climate-controlled auditorium seating and breezy open-air courtyard exhibitions.",
  },
  {
    id: "faq-14",
    category: "Experience",
    question: "Are dietary restrictions accommodated during lunch and tea breaks?",
    answer:
      "Yes. All meals provided during the conference feature dedicated vegetarian, non-vegetarian, and vegan spreads, prepared using fresh local ingredients with clearly marked allergen advisories. Special dietary needs can be noted during registration ticket checkout.",
  },
  {
    id: "faq-15",
    category: "Experience",
    question: "Can I bring cameras or recording equipment inside the auditorium?",
    answer:
      "Non-flash mobile phone photography and social media sharing are enthusiastically encouraged from your seat (#TEDxBPHC2026, #InvisibleThreads). However, professional DSLR/mirrorless cameras, tripods, selfie sticks, and continuous video recording are strictly prohibited inside the main auditorium to prevent obstruction of official TED camera tracks.",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Questions", icon: HelpCircle },
  { id: "Theme & Concept", label: "Theme & Concept", icon: Sparkles },
  { id: "Passes & Entry", label: "Passes & Entry", icon: Ticket },
  { id: "Event & Venue", label: "Event & Venue", icon: MapPin },
  { id: "Speakers & Talks", label: "Speakers & Talks", icon: Mic },
  { id: "Experience", label: "Experience", icon: Compass },
] as const;

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filtered FAQ items based on category and search query
  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-[#eb0028] selection:text-white pb-32 font-sans">
      {/* =========================================================================
          1. EDITORIAL HERO
          ========================================================================= */}
      <header className="pt-40 pb-20 px-6 md:px-12 border-b border-black/5 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-8 bg-[#eb0028]"></div>
            <span className="text-zinc-500 font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">
              Inquiries & Clarifications · 12th Edition
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl sm:text-7xl md:text-[130px] font-bold tracking-tighter leading-[0.85] mb-8">
            Unraveling the <br />
            <span className="italic font-serif font-light text-zinc-400">threads.</span>
          </h1>

          {/* Subtitle & Search */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mt-12">
            <p className="text-zinc-600 text-xl md:text-2xl font-light leading-relaxed max-w-2xl">
              Everything you need to know about TEDx BITS Hyderabad 2026 — from this year’s theme of “Invisible Threads” to conference passes, venue directions, and the day’s rhythm.
            </p>

            {/* Quick Live Search Bar */}
            <div className="w-full lg:w-96 relative">
              <Search className="h-4 w-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions or keywords..."
                className="w-full pl-11 pr-4 py-3 rounded-full border border-black/10 bg-zinc-50 text-sm placeholder:text-zinc-400 focus:outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="cursor-pointer text-xs font-mono text-zinc-400 hover:text-black absolute right-4 top-1/2 -translate-y-1/2"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </header>

      {/* =========================================================================
          2. CATEGORY PILL FILTER
          ========================================================================= */}
      <section className="py-8 px-6 md:px-12 max-w-[1600px] mx-auto border-b border-black/5 overflow-x-auto">
        <div className="flex items-center gap-2.5 min-w-max">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`cursor-pointer inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
                  isSelected
                    ? "bg-black text-white font-bold shadow-xs"
                    : "border border-black/5 bg-zinc-50 text-zinc-600 hover:border-black/20 hover:bg-white hover:text-black"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-[#eb0028]" : "text-zinc-400"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          3. ACCORDION QUESTIONS LIST
          ========================================================================= */}
      <main className="max-w-[1200px] mx-auto px-6 md:px-12 pt-16">
        {filteredFAQs.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-black/10 rounded-2xl p-12">
            <HelpCircle className="h-10 w-10 text-zinc-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold tracking-tight text-black mb-2">No matching questions found</h3>
            <p className="text-sm font-light text-zinc-500 mb-6">
              We couldn’t find any questions matching &ldquo;{searchQuery}&rdquo;. Try another term or browse all categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-black text-white px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#eb0028] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <Accordion type="single" collapsible className="flex flex-col gap-4">
              {filteredFAQs.map((faq, index) => {
                const num = String(index + 1).padStart(2, "0");

                return (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="group relative overflow-hidden rounded-2xl border border-black/5 bg-zinc-50/70 transition-all duration-300 hover:border-black/15 hover:bg-white data-[state=open]:border-black/20 data-[state=open]:bg-white data-[state=open]:shadow-lg"
                  >
                    {/* Left TEDx Red vertical indicator bar on active item */}
                    <div
                      className="absolute bottom-0 left-0 top-0 w-1 bg-[#eb0028] opacity-0 transition-opacity duration-300 group-data-[state=open]:opacity-100"
                      aria-hidden="true"
                    />

                    <AccordionTrigger className="flex w-full items-start justify-between gap-4 p-6 sm:p-8 text-left hover:no-underline cursor-pointer select-none [&_[data-slot=accordion-trigger-icon]]:!hidden">
                      <div className="flex items-start gap-4 sm:gap-6 min-w-0 flex-1">
                        {/* Numeral */}
                        <span className="w-7 shrink-0 font-mono text-xs font-bold tabular-nums tracking-widest text-zinc-400 group-hover:text-zinc-700 group-data-[state=open]:text-[#eb0028] transition-colors pt-0.5">
                          {num}
                        </span>

                        <div className="flex flex-col items-start gap-1.5 min-w-0">
                          {/* Category Tag */}
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#eb0028]">
                              {faq.category}
                            </span>
                            {faq.highlight && (
                              <span className="rounded bg-[#eb0028]/10 px-1.5 py-0.2 font-mono text-[9px] font-bold uppercase tracking-wider text-[#eb0028]">
                                Featured
                              </span>
                            )}
                          </div>

                          {/* Question */}
                          <span className="text-base sm:text-xl font-bold tracking-tight text-zinc-900 group-hover:text-black group-data-[state=open]:text-black transition-colors leading-snug">
                            {faq.question}
                          </span>
                        </div>
                      </div>

                      {/* Animated Plus / Minus Pill */}
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-zinc-600 transition-all duration-300 group-hover:border-black/30 group-hover:text-black group-data-[state=open]:border-[#eb0028]/40 group-data-[state=open]:bg-[#eb0028]/10 group-data-[state=open]:text-[#eb0028]">
                        <Plus className="h-3.5 w-3.5 block group-data-[state=open]:hidden transition-transform duration-300" />
                        <Minus className="h-3.5 w-3.5 hidden group-data-[state=open]:block transition-transform duration-300" />
                      </span>
                    </AccordionTrigger>

                    <AccordionContent className="px-6 pb-6 pl-14 pt-0 sm:px-8 sm:pb-8 sm:pl-20">
                      <p className="text-sm sm:text-base font-light text-zinc-600 leading-relaxed max-w-3xl">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        )}
      </main>

      {/* =========================================================================
          4. STILL HAVE QUESTIONS? DIRECT REACH-OUT CARD
          ========================================================================= */}
      <section className="mt-32 max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="border border-black/10 bg-zinc-50 p-8 sm:p-14 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#eb0028]/5 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-2 w-2 rounded-full bg-[#eb0028]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-[#eb0028]">
                Direct Curatorial Inquiry
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-3">
              Still seeking answers?
            </h3>
            <p className="text-zinc-600 text-sm sm:text-base font-light max-w-xl leading-relaxed">
              Our curatorial and attendee experience team is here to assist with special delegations, accessibility accommodations, or press inquiries.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="mailto:tedx@hyderabad.bits-pilani.ac.in?subject=TEDx%20BITS%20Hyderabad%202026%20Inquiry"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-black text-white px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] transition-all hover:bg-[#eb0028]"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Email the Team</span>
            </a>
            <Link
              href="/schedule"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/20 bg-white text-black px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] transition-all hover:border-black"
            >
              <span>View Schedule</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
