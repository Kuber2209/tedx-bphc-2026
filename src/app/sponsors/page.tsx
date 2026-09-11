"use client";

import React, { useRef } from "react";
import { currentPartners, pastSponsors } from "@/data/sponsors";
import { motion } from "motion/react";
import Image from "next/image";

export default function SponsorsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contactEmail = "tedx@hyderabad.bits-pilani.ac.in";
  const emailMailto = `mailto:${contactEmail}?subject=Partnership%20Inquiry%20-%20TEDx%20BITS%20Hyderabad%202026`;

  return (
    <div className="min-h-screen bg-transparent text-neutral-900 selection:bg-[#E62B1E] selection:text-neutral-900 pb-32 relative overflow-hidden" ref={containerRef}>
      
      {/* Exhibition Header */}
      <header className="relative z-10 pt-40 pb-32 px-6 md:px-12 border-b border-black/10 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-8 bg-[#eb0028]"></div>
            <span className="text-zinc-500 font-sans text-[10px] md:text-xs uppercase tracking-[0.2em]">
              The Collaborators
            </span>
          </div>
          <h1 className="text-7xl md:text-[140px] font-bold tracking-tighter leading-[0.85] mb-12">
            Built by<br />
            <span className="italic font-serif pr-4 text-zinc-600 font-light">visionaries.</span>
          </h1>
          <p className="max-w-2xl text-zinc-600 text-xl md:text-2xl leading-relaxed font-light">
            We partner with organizations that believe in the power of ideas. Together, we engineer an environment where innovation thrives.
          </p>
        </motion.div>
      </header>

      <main className="relative z-10 max-w-[1600px] mx-auto mt-32 px-6 md:px-12">
        {/* Current Partners */}
        <section className="mb-48">
          <div className="border-b border-black/10 pb-8 mb-24">
            <h2 className="text-3xl md:text-4xl font-serif italic text-zinc-600">2026 Partners</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-32 gap-x-16">
            {currentPartners.map((partner, idx) => (
              <motion.div 
                key={partner.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-full aspect-[3/2] flex items-center justify-center mb-8 px-12 py-12 transition-all duration-700 hover:scale-105 relative">
                  {partner.logoUrl ? (
                    <Image 
                      src={partner.logoUrl} 
                      alt={partner.name} 
                      fill
                      className="object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 p-8" 
                    />
                  ) : (
                    <span className="font-serif italic text-5xl font-light text-zinc-500 group-hover:text-white transition-colors duration-700">{partner.name}</span>
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold tracking-tight mb-2">{partner.name}</h3>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#eb0028] font-bold">{partner.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Archive Sponsors */}
        <section className="mb-48">
          <div className="border-b border-black/10 pb-6 mb-20 flex items-center justify-between">
            <h2 className="text-2xl font-serif italic text-zinc-500">Past Collaborators</h2>
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-zinc-500">The Archive</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-16 gap-x-12">
            {pastSponsors.map((sponsor, idx) => (
              <motion.div 
                key={sponsor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 10) * 0.05 }}
                className="flex flex-col group cursor-pointer border-l border-black/5 pl-6 hover:border-white transition-colors duration-500"
              >
                <h4 className="text-base font-bold text-zinc-700 group-hover:text-white transition-colors mb-2">{sponsor.name}</h4>
                <span className="font-sans text-[9px] uppercase tracking-[0.15em] text-[#eb0028] mb-1">{sponsor.category}</span>
                {sponsor.year && <span className="font-serif italic text-xs text-zinc-500">{sponsor.year}</span>}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Let's Build Together CTA */}
        <section className="py-32 text-center border-t border-black/10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-8">Start a conversation</p>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-16">
              Let&apos;s build something <br/>
              <span className="italic text-zinc-500 font-serif font-light">meaningful.</span>
            </h2>
            <a
              href={emailMailto}
              className="inline-flex items-center justify-center bg-white text-[#eb0028] px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors duration-500"
            >
              Contact Partnerships
            </a>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
