"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect } from "react";
import LogoLoop from "@/components/layout/LogoLoop";
import ScrollPortraitWall from "@/components/home/ScrollPortraitWall";
import { ButtonWithIcon } from "@/components/ui/button-with-icon";

const Threads = dynamic(() => import("@/components/backgrounds/Threads"), { ssr: false });

export default function HomeExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Ensure video plays on mount and after route changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Video autoplay prevented:", e));
    }
  }, []);



  return (
    <div className="bg-transparent font-sans" ref={containerRef}>

      {/* 1. HERO — Cinematic, minimal */}
      <section className="relative h-screen w-full overflow-hidden text-neutral-900 bg-white">
        <motion.div
          className="absolute inset-0 z-0 origin-top"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster="/gallery/image1.jpg"
          >
            <source src="/DJI_0187.MP4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
        </motion.div>

        <div className="relative z-10 w-full h-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 max-w-[1600px] mx-auto text-neutral-900">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="max-w-4xl"
          >
            <div className="mb-6 inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-black/10 text-[#DD183B] text-[11px] font-bold uppercase tracking-[0.25em] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DD183B] animate-pulse" />
              IDEAS CHANGE EVERYTHING
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-[#DD183B]"></div>
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-zinc-600">
                BITS Pilani Hyderabad Campus • Great ideas to the world
              </p>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[110px] font-bold tracking-tighter leading-[0.9] mb-8">
              Ideas that <br />
              <span className="font-medium text-[#DD183B]">challenge</span> the <br />
              ordinary.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* LOWER SECTIONS CONTAINER WITH BALLPIT BACKGROUND */}
      <div className="relative w-full bg-transparent text-[#050505]">

        {/* INVISIBLE THREADS THEME SECTION */}
        <section className="relative z-20 py-32 md:py-48 px-6 md:px-12 bg-white overflow-hidden flex items-center justify-center min-h-[80vh]">
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
              <div className="h-[2px] w-12 bg-[#DD183B] mx-auto mb-6"></div>
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

        {/* 4. THE VOICES — Scroll Portrait Wall */}
        <ScrollPortraitWall />

        {/* LOGO LOOP INTERMISSION */}
        <div className="bg-black/5 py-12 md:py-20 border-y border-black/5 overflow-hidden">
          <LogoLoop />
        </div>

        <section className="relative z-20 bg-transparent py-32 md:py-48 px-6 md:px-12 text-center text-[#050505]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DD183B]/10 border border-[#DD183B]/20 text-[#DD183B] text-[10px] font-bold uppercase tracking-[0.25em]">
              IDEAS CHANGE EVERYTHING
            </div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6 text-zinc-500">Be Part of the Conversation</p>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-12">
              Secure your <br />
              <span className="font-bold text-[#DD183B]">seat.</span>
            </h2>
            <div className="flex justify-center">
              <ButtonWithIcon
                href="/passes"
                text="Get Tickets"
                variant="red"
              />
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
