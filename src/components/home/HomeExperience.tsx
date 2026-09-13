"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect } from "react";
import LogoLoop from "@/components/layout/LogoLoop";
import ScrollPortraitWall from "@/components/home/ScrollPortraitWall";

const Threads = dynamic(() => import("@/components/backgrounds/Threads"), { ssr: false });

export default function HomeExperience() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Target only the hero section for scroll transforms to prevent whole-page scroll recalculations
  const { scrollYProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Ensure video plays on mount and pause when scrolled out of view to save CPU/GPU
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(e => console.log("Video autoplay prevented:", e));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );

    if (heroSectionRef.current) {
      observer.observe(heroSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-transparent font-sans">

      {/* 1. HERO — Cinematic, minimal matching TEDx MIT .videobanner */}
      <section ref={heroSectionRef} className="relative h-screen w-full overflow-hidden text-neutral-900 bg-white">
        <motion.div
          className="absolute inset-0 z-0 origin-top transform-gpu"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/mayank-raj.mp4" type="video/mp4" />
            <source src="/mayank%20raj.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
        </motion.div>

        <div className="relative z-10 w-full h-full flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-12 max-w-[1600px] mx-auto text-neutral-900">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="h-[2px] w-10 bg-[#eb0028]"></div>
              <p className="font-sans text-xs tracking-[0.25em] uppercase font-bold text-zinc-600">
                BITS Pilani Hyderabad Campus • Great ideas to the world
              </p>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[100px] font-bold tracking-tighter leading-[0.95] mb-6">
              Ideas that <br />
              <span className="font-bold text-[#eb0028]">challenge</span> the <br />
              ordinary.
            </h1>

            <p className="text-lg md:text-2xl font-normal text-zinc-700 leading-relaxed max-w-2xl mb-8">
              TEDx BPHC returns in 2026. Join visionary scientists, designers, and innovators exploring connections that quietly shape our world.
            </p>

            {/* MIT-style Rectangular CTA Button Group */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/passes"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-[4px] bg-[#eb0028] hover:bg-[#c40022] text-white font-semibold text-base transition-colors duration-200 shadow-sm"
              >
                Register for 2026
              </Link>
              <Link
                href="/speakers"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-[4px] border border-neutral-900/30 hover:border-neutral-900 bg-white/80 hover:bg-white text-neutral-900 font-semibold text-base transition-all duration-200 shadow-xs"
              >
                Speaker Lineup
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LOWER SECTIONS */}
      <div className="relative w-full bg-transparent text-[#050505]">

        {/* INVISIBLE THREADS THEME SECTION */}
        <section className="relative z-20 py-28 md:py-40 px-6 md:px-12 bg-white overflow-hidden flex items-center justify-center min-h-[75vh]">
          {/* ReactBits Threads Background */}
          <div className="absolute inset-0 z-0">
            <Threads
              color={[0.9, 0.17, 0.12]}
              amplitude={1.3}
              distance={0.3}
              enableMouseInteraction={true}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="h-[2px] w-12 bg-[#eb0028] mx-auto mb-6"></div>
              <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-zinc-500 mb-6">
                The Theme
              </p>
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-neutral-900 mb-8 leading-[0.9]">
                Invisible <br /> Threads.
              </h2>
              <p className="text-xl md:text-3xl font-light text-zinc-700 leading-relaxed tracking-wide">
                Exploring the unseen connections that quietly shape our lives—from personal experiences to the systems, ideas, and circumstances that connect us in ways we rarely notice.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 4. THE VOICES — 2x4 Animated Speaker Wall */}
        <ScrollPortraitWall />

        {/* LOGO LOOP INTERMISSION */}
        <div className="bg-black/5 py-12 md:py-20 border-y border-black/5 overflow-hidden">
          <LogoLoop />
        </div>

        {/* 5. CALL TO ACTION — Clean TEDx MIT style */}
        <section className="relative z-20 bg-white py-28 md:py-36 px-6 md:px-12 text-center text-[#181830] border-t border-zinc-100">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#eb0028] block mb-3">
              Be Part of the Conversation
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#181830] leading-[1.05] mb-6">
              Secure your <span className="text-[#eb0028]">seat.</span>
            </h2>
            <p className="text-lg md:text-xl text-[#494949] max-w-2xl mx-auto mb-10 leading-relaxed">
              Join thinkers, creators, and leaders at BITS Pilani Hyderabad Campus for an unforgettable day of transformative ideas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/passes"
                className="inline-flex items-center justify-center px-8 py-4 rounded-[4px] bg-[#eb0028] hover:bg-[#c40022] text-white font-semibold text-base transition-colors duration-200 shadow-md shadow-[#eb0028]/20"
              >
                Register for 2026
              </Link>
              <Link
                href="/speakers"
                className="inline-flex items-center justify-center px-8 py-4 rounded-[4px] border border-zinc-300 hover:border-neutral-900 bg-white hover:bg-zinc-50 text-neutral-900 font-semibold text-base transition-all duration-200"
              >
                Explore Speakers
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
