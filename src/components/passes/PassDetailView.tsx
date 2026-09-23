"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ArrowLeft, Mail, Phone, Users } from "lucide-react";
import TierComparisonTable from "@/components/passes/TierComparisonTable";

export interface PassDetailConfig {
  id: string;
  name: string;
  whoFor: string;
  whoForLong: string;
  pricingDisplay: {
    standard: string;
    originalStandard?: string;
    premium: string;
  };
  startingPrice: string;
  registrationUrl: string;
  inclusions: Array<{
    title: string;
    description: string;
  }>;
  standardBullets: string[];
  premiumBullets: string[];
  premiumAdds: string[];
}

const faqs = [
  {
    question: "Are passes refundable?",
    answer:
      "Passes are strictly non-refundable. If you find yourself unable to attend, you may transfer your pass to another attendee up to 48 hours before event day.",
  },
  {
    question: "Can I transfer my pass to someone else?",
    answer:
      "Yes. Email tedx@hyderabad.bits-pilani.ac.in with your registered booking reference and the replacement attendee's full name, email, and ID details.",
  },
  {
    question: "What ID do I need to bring for entry?",
    answer:
      "Please carry a valid government-issued photo ID (or your BITS ID card for the BITSian pass) along with the digital pass QR code on your mobile device.",
  },
  {
    question: "When will I receive my digital pass?",
    answer:
      "Your digital pass and check-in QR code are emailed directly to your registered address immediately upon successful completion of your registration.",
  },
];

interface PassDetailViewProps {
  config: PassDetailConfig;
}

export default function PassDetailView({ config }: PassDetailViewProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const isStudentPass = config.id === "school-student" || config.id === "student";

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#494949] font-sans selection:bg-[#eb0028] selection:text-white pb-24 md:pb-16">
      {/* 1. HERO — Dark cinematic section matching homepage hero style */}
      <header className="relative w-full bg-[#0a0a0c] overflow-hidden min-h-[460px] md:min-h-[520px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-black/40 to-black/80 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(circle_at_top_right,rgba(235,0,40,0.25),transparent_60%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-[80rem] mx-auto px-6 md:px-12 pt-36 pb-20 md:pt-44 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl text-left"
          >
            {/* Top link: Plain text link */}
            <Link
              href="/passes"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>See other passes</span>
            </Link>

            {/* Pass Name in large type */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-3 leading-[1.1]">
              {config.name}
            </h1>

            {/* One-line audience */}
            <p className="text-lg md:text-xl text-neutral-300 font-normal leading-relaxed mb-6">
              {config.whoFor}
            </p>

            {/* Price line */}
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-2.5 mb-8">
              <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {config.pricingDisplay.standard}
              </span>
              {config.pricingDisplay.originalStandard && (
                <span className="text-lg sm:text-xl text-neutral-400 line-through font-normal mr-1">
                  {config.pricingDisplay.originalStandard}
                </span>
              )}
              <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Standard · {config.pricingDisplay.premium} Premium
              </span>
            </div>

            {/* Action CTA Area */}
            <div>
              {config.id === "school-student" || config.id === "student" ? (
                <div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                    <a
                      href="mailto:tedx@hyderabad.bits-pilani.ac.in?subject=School%20or%20Student%20Group%20Delegation%20Inquiry%20-%20TEDx%20BITS%20Hyderabad%202026"
                      className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-[4px] bg-[#eb0028] hover:bg-[#c40022] text-white font-semibold text-base transition-colors duration-200 shadow-md shadow-[#eb0028]/20"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email Delegation Desk</span>
                    </a>
                    <a
                      href="tel:+916388668213"
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-[4px] bg-neutral-900/90 hover:bg-neutral-800 text-white border border-neutral-700 font-semibold text-base transition-colors duration-200"
                    >
                      <Phone className="w-4 h-4 text-[#eb0028]" />
                      <span>Call: +91 63886 68213</span>
                    </a>
                  </div>
                  <p className="text-xs text-neutral-400 mt-3 font-normal">
                    Student passes are coordinated as school or college delegations and student groups.
                  </p>
                </div>
              ) : (
                <a
                  href={config.registrationUrl}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-[4px] bg-[#eb0028] hover:bg-[#c40022] text-white font-semibold text-base transition-colors duration-200 shadow-md shadow-[#eb0028]/20"
                >
                  Register for {config.name}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </header>

      {/* MAIN BODY CONTAINER */}
      <main className="max-w-[80rem] mx-auto px-6 md:px-12 py-16 md:py-24 space-y-16 md:space-y-24">
        {/* 2. WHO IT'S FOR — Clear audience & eligibility description */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-4">
              Who it&apos;s for
            </h2>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-normal">
              {config.whoForLong}
            </p>
          </motion.div>
        </section>

        {/* 3. STANDARD VS PREMIUM COMPARISON */}
        <section className="pt-8 border-t border-neutral-200 space-y-12">
          {/* Full Tier Comparison Table (Flowbase Echo Table 02) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-10 rounded-2xl bg-white border border-neutral-200/90 shadow-xs"
          >
            <TierComparisonTable
              passId={config.id}
              passName={config.name}
              standardPrice={config.pricingDisplay.standard}
              originalStandardPrice={config.pricingDisplay.originalStandard}
              premiumPrice={config.pricingDisplay.premium}
              registrationUrl={config.registrationUrl}
            />
          </motion.div>

          {/* Institutional & Student Group Delegation Desk Card for Student Pass */}
          {isStudentPass && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 sm:p-10 rounded-2xl border border-neutral-200/90 bg-white shadow-xs"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 text-[#eb0028] mb-3">
                    <Users className="h-4 w-4" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                      STUDENT &amp; SCHOOL DELEGATION DESK
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-3">
                    Bringing a student contingent or school delegation?
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal mb-4">
                    Student passes are reserved through institutional delegations (schools, junior colleges, universities, and student societies). We arrange reserved block seating, faculty chaperone complimentary passes (for groups of 10+), institutional GST invoices, and personalized on-campus coordination.
                  </p>
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-600 font-mono">
                    <span>• Minimum contingent: 5 delegates</span>
                    <span>• Faculty chaperone pass for 10+</span>
                    <span>• Official BPHC Certificate</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                  <a
                    href="mailto:tedx@hyderabad.bits-pilani.ac.in?subject=School%20or%20Student%20Group%20Delegation%20Inquiry%20-%20TEDx%20BITS%20Hyderabad%202026"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[4px] bg-[#eb0028] hover:bg-[#c40022] text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm text-center"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Delegation Desk</span>
                  </a>
                  <a
                    href="tel:+916388668213"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[4px] bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-200 font-semibold text-xs uppercase tracking-wider transition-colors text-center"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#eb0028]" />
                    <span>Call +91 63886 68213</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </section>

        {/* 5. FAQ — 4 questions in a smooth accordion */}
        <section className="pt-8 border-t border-neutral-200">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-2">
              Frequently asked questions
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 font-normal">
              Clear information regarding pass policies, transfers, and entry requirements.
            </p>
          </motion.div>

          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div key={idx} className="py-4 sm:py-5">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between text-left font-medium text-base sm:text-lg text-neutral-900 hover:text-[#eb0028] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-neutral-500 transition-transform duration-300 shrink-0 ml-4 ${
                        isOpen ? "rotate-180 text-[#eb0028]" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed pt-3 pr-6">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. TEXT LINK "See other passes" back to the listing */}
        <div className="pt-4">
          <Link
            href="/passes"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-neutral-600 hover:text-[#eb0028] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>See other passes</span>
          </Link>
        </div>

        {/* FOOTER BLOCK: Group bookings sentence & single contact line */}
        <div className="pt-10 border-t border-neutral-200 text-center space-y-2.5">
          <p className="text-sm text-neutral-600">
            Bringing a delegation of 10 or more?{" "}
            <a
              href="mailto:tedx@hyderabad.bits-pilani.ac.in?subject=Group%20Delegation%20Inquiry"
              className="text-neutral-900 underline underline-offset-4 hover:text-[#eb0028] transition-colors font-medium"
            >
              Contact us for group bookings
            </a>
            {" "}or call{" "}
            <a
              href="tel:+916388668213"
              className="text-neutral-900 underline underline-offset-4 hover:text-[#eb0028] transition-colors font-semibold"
            >
              +91 63886 68213
            </a>
            .
          </p>
          <p className="text-sm text-neutral-600">
            Questions?{" "}
            <a
              href="mailto:tedx@hyderabad.bits-pilani.ac.in"
              className="text-neutral-900 underline underline-offset-4 hover:text-[#eb0028] transition-colors font-medium"
            >
              tedx@hyderabad.bits-pilani.ac.in
            </a>
            {" "}·{" "}
            <a
              href="tel:+916388668213"
              className="text-neutral-900 underline underline-offset-4 hover:text-[#eb0028] transition-colors font-semibold"
            >
              +91 63886 68213
            </a>
          </p>
        </div>
      </main>

      {/* 6. STICKY REGISTER BAR AT THE BOTTOM ON MOBILE */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-5 py-3.5 flex items-center justify-between shadow-lg">
        <div>
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            {isStudentPass ? "Student Delegation" : config.name}
          </p>
          <p className="text-base font-bold text-neutral-900 leading-tight">
            From {config.startingPrice}
          </p>
        </div>
        {isStudentPass ? (
          <a
            href="mailto:tedx@hyderabad.bits-pilani.ac.in?subject=School%20or%20Student%20Group%20Delegation%20Inquiry%20-%20TEDx%20BITS%20Hyderabad%202026"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-[4px] bg-[#eb0028] hover:bg-[#c40022] text-white font-semibold text-sm transition-colors shadow-sm"
          >
            Contact Desk
          </a>
        ) : (
          <a
            href={config.registrationUrl}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-[4px] bg-[#eb0028] hover:bg-[#c40022] text-white font-semibold text-sm transition-colors shadow-sm"
          >
            Register
          </a>
        )}
      </div>
    </div>
  );
}
