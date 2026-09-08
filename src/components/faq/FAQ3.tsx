"use client";

import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Badge } from "@/components/base-ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/base-ui/accordion";

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface FAQSectionProps {
  badge?: string;
  heading: string;
  subheading?: string;
  items: FAQItem[];
  className?: string;
}

export default function FAQ3({
  badge = "Frequently asked questions",
  heading,
  subheading,
  items,
  className = "",
}: FAQSectionProps) {
  return (
    <section
      className={`relative flex w-full flex-col items-center justify-center px-4 py-8 sm:px-6 ${className}`}
    >
      {/* ── Header ── */}
      <div className="mb-10 flex w-full max-w-2xl flex-col items-center text-center sm:mb-14">
        {badge && (
          <Badge
            variant="outline"
            className="mb-4 inline-flex items-center gap-2 rounded-full border-zinc-800 bg-[#121212]/80 px-3.5 py-1 text-xs font-mono font-medium tracking-wide text-zinc-300 backdrop-blur-sm"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-[#EB0028] shadow-[0_0_8px_#EB0028]" />
            {badge}
          </Badge>
        )}

        <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
          {heading}
        </h2>

        {subheading && (
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-400 sm:text-base">
            {subheading}
          </p>
        )}
      </div>

      {/* ── Accordion List ── */}
      <div className="w-full max-w-3xl">
        <Accordion type="single" collapsible className="flex w-full flex-col gap-3.5">
          {items.map((item, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="group relative overflow-hidden rounded-2xl border border-zinc-850 bg-[#121212]/90 transition-all duration-300 hover:border-zinc-700 hover:bg-[#161616] data-[state=open]:border-[#EB0028]/60 data-[state=open]:bg-gradient-to-r data-[state=open]:from-[#EB0028]/15 data-[state=open]:via-[#141414] data-[state=open]:to-[#121212] data-[state=open]:shadow-xl data-[state=open]:shadow-[#EB0028]/10"
              >
                {/* Left TEDx Red indicator bar on active item */}
                <div
                  className="absolute bottom-0 left-0 top-0 w-1 bg-[#EB0028] opacity-0 transition-opacity duration-300 group-data-[state=open]:opacity-100"
                  aria-hidden="true"
                />

                <AccordionTrigger className="flex w-full items-center gap-4 px-5 py-4 text-left hover:no-underline sm:px-6 sm:py-5 [&_[data-slot=accordion-trigger-icon]]:!hidden">
                  <span className="w-8 shrink-0 text-center font-mono text-xs font-semibold tabular-nums tracking-widest text-zinc-500 transition-colors duration-200 group-hover:text-zinc-300 group-data-[state=open]:text-[#EB0028]">
                    {num}
                  </span>

                  <div className="flex flex-1 flex-col items-start gap-1">
                    {item.category && (
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#EB0028]">
                        {item.category}
                      </span>
                    )}
                    <span className="text-sm font-medium leading-snug text-zinc-200 transition-colors duration-200 group-hover:text-white group-data-[state=open]:font-semibold group-data-[state=open]:text-white sm:text-base">
                      {item.question}
                    </span>
                  </div>

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 transition-all duration-300 group-hover:border-zinc-600 group-hover:text-white group-data-[state=open]:border-[#EB0028]/40 group-data-[state=open]:bg-[#EB0028]/20 group-data-[state=open]:text-[#EB0028]">
                    <FaPlus className="block h-3 w-3 group-data-[state=open]:hidden" />
                    <FaMinus className="hidden h-3 w-3 group-data-[state=open]:block" />
                  </span>
                </AccordionTrigger>

                <AccordionContent className="px-5 pb-5 pl-14 pt-0 sm:px-6 sm:pb-6 sm:pl-16">
                  <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
