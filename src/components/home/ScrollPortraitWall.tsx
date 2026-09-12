"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
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

  // 2 columns x 4 rows = 8 cards (2 cards simultaneously per row)
  const speakers = currentSpeakers.slice(0, 8);

  return (
    <section className="relative w-full bg-white text-neutral-900 py-20 md:py-32 px-6 md:px-12">
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#181830] leading-[1.15]">
            Our Speakers
          </h2>
          <p className="text-base sm:text-lg text-[#494949] mt-3 leading-relaxed">
            Meet some of the thought leaders and innovators who share bold ideas and powerful stories at TEDx BPHC.
          </p>
        </motion.div>

        {/* 2x4 Grid: 2 Cards Simultaneously Per Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 md:gap-x-14 md:gap-y-20">
          {speakers.map((speaker, index) => {
            const imageSrc = speaker.imageUrl || fallbackImages[index % fallbackImages.length];

            return (
              <motion.div
                key={speaker.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <Link
                  href="/speakers"
                  className="block w-full group text-left"
                >
                  {/* Speaker Portrait Card */}
                  <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-zinc-100 rounded-lg sm:rounded-xl shadow-xs border border-zinc-200/80">
                    <Image
                      src={imageSrc}
                      alt={speaker.name}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Speaker Details */}
                  <div className="mt-5 sm:mt-6">
                    <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#eb0028] block mb-1.5">
                      {speaker.category || "Speaker"}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#181830] group-hover:text-[#eb0028] transition-colors duration-200">
                      {speaker.name}
                    </h3>
                    <p className="text-base sm:text-lg font-normal text-[#494949] mt-1">
                      {speaker.role} {speaker.company ? `· ${speaker.company}` : ""}
                    </p>
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


