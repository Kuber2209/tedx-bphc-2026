"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { currentSpeakers } from "@/data/speakers";

export default function ScrollPortraitWall() {
  // Fallback images matching the gallery photos
  const fallbackImages = [
    "/gallery/image4.jpg",
    "/gallery/image8.jpg",
    "/gallery/image14.jpg",
    "/gallery/image1.jpg",
    "/gallery/image2.jpg",
    "/gallery/image3.jpg",
    "/gallery/image5.jpg",
    "/gallery/image6.jpg",
    "/gallery/image7.jpg",
  ];

  // 3 columns x 2 rows = 6 cards for homepage showcase
  const speakers = currentSpeakers.slice(0, 6);

  return (
    <section className="relative w-full bg-[#fafafa] text-[#494949] py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-[80rem] mx-auto">
        {/* Section Header matching TEDx MIT .rl_team8_heading-wrapper */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-14 md:mb-20 text-left"
        >
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#eb0028] block mb-2.5">
            Meet Our Visionaries
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#494949] leading-[1.15]">
            Our Speakers
          </h2>
          <p className="text-base sm:text-lg text-[#494949] mt-3 leading-relaxed opacity-90">
            Meet some of the thought leaders and innovators who share bold ideas and powerful stories at TEDx BPHC.
          </p>
        </motion.div>

        {/* 3-Column Grid: Matching Teams Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-10 lg:gap-y-14">
          {speakers.map((speaker, index) => {
            const imageSrc = speaker.imageUrl || fallbackImages[index % fallbackImages.length];

            return (
              <motion.div
                key={speaker.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.55,
                  delay: (index % 3) * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Link
                  href="/speakers"
                  className="block w-full group text-left"
                >
                  {/* Speaker Portrait Card */}
                  <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-white rounded-xl shadow-xs group-hover:shadow-xl transition-all duration-300 border border-neutral-200/90 group-hover:border-neutral-300">
                    <Image
                      src={imageSrc}
                      alt={speaker.name}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Floating interactive hover pill */}
                    <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-[#494949] text-xs font-semibold shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <span>View Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#eb0028]" />
                    </div>
                  </div>

                  {/* Speaker Details */}
                  <div className="mt-4 sm:mt-5">
                    <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#eb0028] block mb-1">
                      {speaker.category || "Speaker"}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#494949] group-hover:text-[#eb0028] transition-colors duration-200 leading-snug">
                      {speaker.name}
                    </h3>
                    <p className="text-sm sm:text-base font-normal text-[#494949] mt-1 leading-snug opacity-90">
                      {speaker.role} {speaker.company ? `· ${speaker.company}` : ""}
                    </p>

                    {/* Animated accent line */}
                    <div className="h-[2px] w-0 bg-[#eb0028] group-hover:w-8 transition-all duration-300 mt-2.5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All Speakers CTA Button matching TEDx MIT */}
        <div className="mt-16 md:mt-24 flex justify-center">
          <Link
            href="/speakers"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-[4px] bg-[#eb0028] hover:bg-[#c40022] text-white font-semibold text-base transition-colors duration-200 shadow-sm"
          >
            View All Speakers
          </Link>
        </div>
      </div>
    </section>
  );
}


