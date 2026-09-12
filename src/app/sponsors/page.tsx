"use client";

import React, { useRef, useMemo } from "react";
import { currentPartners, pastSponsors, partnershipTiers, Partner } from "@/data/sponsors";
import { motion } from "motion/react";
import Image from "next/image";

export default function SponsorsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contactEmail = "tedx@hyderabad.bits-pilani.ac.in";
  const emailMailto = `mailto:${contactEmail}?subject=Partnership%20Inquiry%20-%20TEDx%20BITS%20Hyderabad%202026`;

  // Group current partners by tier
  const partnersByTier = useMemo(() => {
    const grouped: Record<string, Partner[]> = {};
    currentPartners.forEach(partner => {
      const tier = partner.tier || "associate";
      if (!grouped[tier]) grouped[tier] = [];
      grouped[tier].push(partner);
    });
    return grouped;
  }, []);

  // Define the display order of tiers and their configurations
  const tierConfig = [
    { id: "title", label: "Title Partner", grid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-2", size: "lg" },
    { id: "powered", label: "Co-Powered By", grid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3", size: "md" },
    { id: "associate", label: "Associate Partners", grid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3", size: "md" },
    { id: "media", label: "Media Partners", grid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4", size: "sm" },
    { id: "in-kind", label: "Category Partners", grid: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4", size: "sm" },
  ];

  return (
    <div className="min-h-screen bg-transparent text-neutral-900 selection:bg-[#E62B1E] selection:text-neutral-900 pb-32 relative overflow-hidden" ref={containerRef}>
      
      {/* Hero Section */}
      <header className="relative z-10 pt-40 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-8 bg-[#eb0028]"></div>
            <span className="text-zinc-500 font-sans text-[10px] md:text-xs uppercase tracking-[0.2em]">
              The Collaborators
            </span>
            <div className="h-[1px] w-8 bg-[#eb0028]"></div>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[110px] font-bold tracking-tighter leading-[0.9] mb-8">
            Our <span className="text-[#eb0028]">Partners.</span>
          </h1>
          <p className="max-w-3xl text-zinc-600 text-lg md:text-2xl leading-relaxed font-light">
            We partner with visionary organizations that believe in the power of ideas. Together, we engineer an environment where innovation thrives.
          </p>
        </motion.div>
      </header>

      <main className="relative z-10 max-w-[1600px] mx-auto mt-16 px-6 md:px-12">
        {/* Current Partners Showcase */}
        <section className="mb-40">
          {tierConfig.map((config) => {
            const tierPartners = partnersByTier[config.id];
            if (!tierPartners || tierPartners.length === 0) return null;

            return (
              <div key={config.id} className="mb-24 last:mb-0">
                <div className="flex items-center gap-4 mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-800">{config.label}</h2>
                  <div className="h-[1px] flex-grow bg-black/10"></div>
                </div>
                
                <div className={`grid gap-6 ${config.grid}`}>
                  {tierPartners.map((partner, idx) => (
                    <motion.div 
                      key={partner.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="group relative flex flex-col bg-white border border-black/5 hover:border-black/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-500 rounded-sm overflow-hidden cursor-pointer"
                    >
                      <div className={`w-full flex items-center justify-center p-8 border-b border-black/5 bg-zinc-50/50 ${config.size === 'lg' ? 'aspect-[2/1] md:p-16' : config.size === 'md' ? 'aspect-[3/2] md:p-12' : 'aspect-[3/2] p-6'}`}>
                        {partner.logoUrl ? (
                          <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-105">
                            <Image 
                              src={partner.logoUrl} 
                              alt={partner.name} 
                              fill
                              className="object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                            />
                          </div>
                        ) : (
                          <span className={`font-bold tracking-tight text-zinc-400 group-hover:text-zinc-900 transition-colors duration-500 text-center ${config.size === 'lg' ? 'text-5xl md:text-7xl' : config.size === 'md' ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
                            {partner.name}
                          </span>
                        )}
                      </div>
                      <div className="p-6 md:p-8 flex flex-col items-start justify-center flex-grow bg-white">
                        <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#eb0028] font-bold mb-2">{partner.category}</span>
                        <h3 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900">{partner.name}</h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* Available Partnership Tiers */}
        <section className="mb-40 pt-20 border-t border-black/10">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-800 mb-6">Partnership Tiers</h2>
            <p className="text-zinc-500 text-lg md:text-xl font-light">Explore how your organization can integrate with our ecosystem and drive impact.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnershipTiers.map((tier, idx) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col bg-white border ${tier.highlighted ? 'border-[#eb0028]/30 shadow-sm' : 'border-black/5'} p-8 rounded-sm hover:-translate-y-1 hover:shadow-md transition-all duration-500`}
              >
                <div className="mb-6 flex-grow">
                  {tier.badge && (
                    <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-600 font-sans text-[9px] uppercase tracking-widest font-bold mb-4 rounded-sm">
                      {tier.badge}
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-zinc-900 mb-3">{tier.name}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-6">{tier.tagline}</p>
                  <ul className="space-y-3">
                    {tier.benefits.slice(0, 3).map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start text-xs text-zinc-600">
                        <span className="text-[#eb0028] mr-2 mt-[2px]">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-black/5">
                  <a href={emailMailto} className="text-xs font-bold uppercase tracking-widest text-zinc-800 hover:text-[#eb0028] transition-colors inline-flex items-center group">
                    {tier.ctaText || "Inquire"}
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Archive Sponsors */}
        <section className="mb-40 pt-20 border-t border-black/10">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-800 mb-2">Past Collaborators</h2>
              <p className="text-zinc-500 text-lg font-light">Organizations that have supported our journey.</p>
            </div>
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-zinc-400">The Archive</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-6">
            {pastSponsors.map((sponsor, idx) => (
              <motion.div 
                key={sponsor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, delay: (idx % 12) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col group border-t-2 border-black/5 pt-4 hover:border-[#eb0028] transition-colors duration-500"
              >
                <h4 className="text-sm md:text-base font-bold text-zinc-800 group-hover:text-black transition-colors mb-2 line-clamp-2">{sponsor.name}</h4>
                <div className="flex flex-col gap-1 mt-auto">
                  <span className="font-sans text-[9px] uppercase tracking-[0.15em] text-zinc-500 group-hover:text-[#eb0028] transition-colors">{sponsor.category}</span>
                  {sponsor.year && <span className="text-[10px] font-bold text-zinc-400">{sponsor.year}</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Let's Build Together CTA */}
        <section className="py-32 text-center border-t border-black/10 bg-white -mx-6 md:-mx-12 px-6 md:px-12 rounded-t-[3rem] shadow-[0_-20px_50px_rgb(0,0,0,0.02)] relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
          >
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-6">Start a conversation</p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]">
              Let&apos;s build something <br className="hidden md:block"/>
              <span className="font-bold text-[#eb0028]">meaningful.</span>
            </h2>
            <p className="text-zinc-600 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto">
              Join us in curating an experience that sparks curiosity and drives profound conversations. Partner with TEDx BITS Hyderabad today.
            </p>
            <a
              href={emailMailto}
              className="inline-flex items-center justify-center bg-black text-white px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#eb0028] hover:shadow-[0_10px_30px_rgba(235,0,40,0.3)] hover:-translate-y-1 transition-all duration-500 rounded-sm"
            >
              Contact Partnerships
            </a>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
