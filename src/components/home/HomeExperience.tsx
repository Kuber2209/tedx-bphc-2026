"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import LogoLoop from "@/components/layout/LogoLoop";
import DomeGallery from "@/components/gallery/DomeGallery";
import ScrollPortraitWall from "@/components/home/ScrollPortraitWall";

const galleryImages = [
  { src: "/gallery/image1.jpg", alt: "TEDx Gallery Image 1" },
  { src: "/gallery/image2.jpg", alt: "TEDx Gallery Image 2" },
  { src: "/gallery/image3.jpg", alt: "TEDx Gallery Image 3" },
  { src: "/gallery/image4.jpg", alt: "TEDx Gallery Image 4" },
  { src: "/gallery/image5.jpg", alt: "TEDx Gallery Image 5" },
  { src: "/gallery/image6.jpg", alt: "TEDx Gallery Image 6" },
  { src: "/gallery/image7.jpg", alt: "TEDx Gallery Image 7" },
  { src: "/gallery/image8.jpg", alt: "TEDx Gallery Image 8" },
  { src: "/gallery/image9.jpg", alt: "TEDx Gallery Image 9" },
  { src: "/gallery/image10.jpg", alt: "TEDx Gallery Image 10" },
  { src: "/gallery/image11.jpg", alt: "TEDx Gallery Image 11" },
  { src: "/gallery/image12.jpg", alt: "TEDx Gallery Image 12" },
  { src: "/gallery/image13.jpg", alt: "TEDx Gallery Image 13" },
  { src: "/gallery/image14.jpg", alt: "TEDx Gallery Image 14" },
  { src: "/gallery/image15.jpg", alt: "TEDx Gallery Image 15" },
  { src: "/gallery/image16.jpg", alt: "TEDx Gallery Image 16" },
  { src: "/gallery/image17.jpg", alt: "TEDx Gallery Image 17" },
  { src: "/gallery/image18.jpg", alt: "TEDx Gallery Image 18" },
  { src: "/gallery/image19.jpg", alt: "TEDx Gallery Image 19" },
  { src: "/gallery/image20.jpg", alt: "TEDx Gallery Image 20" },
];

export default function HomeExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);



  return (
    <div className="bg-white text-black min-h-screen font-sans selection:bg-[#eb0028] selection:text-white" ref={containerRef}>
      
      {/* 1. HERO — Cinematic, minimal */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0 origin-top"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <video
            className="w-full h-full object-cover opacity-60"
            autoPlay
            loop
            muted
            playsInline
            poster="/gallery/image1.jpg"
          >
            <source src="/DJI_0187.MP4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
        </motion.div>

        <div className="relative z-10 w-full h-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 max-w-[1600px] mx-auto text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-[#eb0028]"></div>
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-zinc-300">
                BITS Pilani Hyderabad Campus
              </p>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[110px] font-bold tracking-tighter leading-[0.9] mb-8">
              Ideas that <br />
              <span className="font-serif italic font-light text-zinc-300">challenge</span> the <br />
              ordinary.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 2. EDITORIAL STATEMENT — Quiet typography break */}
      <section className="relative z-20 bg-white py-32 md:py-48 px-6 md:px-12 border-t border-black/5">
        <div className="max-w-[1200px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row gap-12 md:gap-24 items-start"
          >
            <h2 className="text-2xl md:text-4xl font-serif italic text-zinc-400 shrink-0 md:w-1/3 leading-tight">
              A collision of <br/> disciplines, cultures, <br/> and perspectives.
            </h2>
            <div className="md:w-2/3">
              <p className="text-xl md:text-3xl font-light text-zinc-700 leading-relaxed tracking-wide mb-12">
                TEDx BPHC is not just a conference. It is a curated space where the boldest minds gather to share ideas that have the power to shift paradigms. We bring together visionaries who are actively shaping the future.
              </p>
              <Link 
                href="/about" 
                className="group inline-flex items-center gap-4 text-sm font-bold tracking-[0.15em] uppercase text-[#eb0028]"
              >
                <span className="border-b border-[#eb0028]/30 pb-1 group-hover:border-[#eb0028] transition-colors">Our Philosophy</span>
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* EARTH / GALLERY */}
      <section className="relative z-20 bg-white pt-24 md:pt-32 pb-12 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#eb0028] font-sans text-[10px] tracking-[0.2em] uppercase mb-4 font-bold">The Archive</p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
              Moments from <br />
              <span className="font-serif italic font-light text-zinc-500">the past.</span>
            </h2>
          </motion.div>
        </div>
        
        {/* The Earth/Dome Component */}
        <div className="w-full relative h-[600px] md:h-[800px]">
          <DomeGallery images={galleryImages} grayscale={true} />
        </div>
      </section>

      {/* GRID VIEW */}
      <section className="relative z-20 bg-white pb-32 md:pb-48 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {galleryImages.slice(0, 12).map((image, index) => (
              <motion.div 
                key={image.src}
                className="relative overflow-hidden group rounded-sm break-inside-avoid"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
              >
                <div className="relative w-full overflow-hidden">
                  <Image 
                    src={image.src} 
                    alt={image.alt} 
                    width={800} 
                    height={1000} 
                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <span className="text-white font-mono text-[10px] tracking-widest uppercase">
                      {String(index + 1).padStart(2, "0")} / 2026
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <Link href="/gallery" className="inline-flex text-xs font-bold uppercase tracking-[0.2em] border-b border-zinc-300 pb-2 hover:text-[#eb0028] hover:border-[#eb0028] transition-all text-zinc-600">
              Explore Full Archive
            </Link>
          </div>
        </div>
      </section>

      {/* 3. EVENT ATMOSPHERE — Asymmetric Imagery */}
      <section className="relative z-20 bg-zinc-50 py-24 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
          <motion.div 
            className="md:col-span-7 h-[50vh] md:h-[80vh] relative"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image src="/gallery/image8.jpg" alt="Audience" fill className="object-cover" />
          </motion.div>
          <motion.div 
            className="md:col-span-5 flex flex-col justify-between"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="h-[30vh] md:h-[40vh] relative hidden md:block mb-12">
              <Image src="/gallery/image4.jpg" alt="Stage" fill className="object-cover" />
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase mb-4">The Experience</p>
              <h3 className="text-3xl font-serif italic mb-6 text-black">More than just talks.</h3>
              <p className="text-zinc-600 leading-relaxed text-sm">
                Immersive performances, interactive exhibits, and spaces designed for serendipitous encounters. We engineer an environment where conversations continue long after the speakers leave the stage.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. THE VOICES — Scroll Portrait Wall */}
      <ScrollPortraitWall />

      {/* LOGO LOOP INTERMISSION */}
      <div className="bg-zinc-50 py-12 md:py-20 border-y border-black/5 overflow-hidden">
        <LogoLoop />
      </div>

      {/* 5. FINAL CTA — Stark contrast */}
      <section className="relative z-20 bg-[#000000] py-32 md:py-48 px-6 md:px-12 text-center text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-8 text-white/80">Be Part of the Conversation</p>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-12">
            Secure your <br/>
            <span className="font-serif italic font-light">seat.</span>
          </h2>
          <Link 
            href="/schedule" 
            className="inline-flex items-center justify-center bg-white text-[#eb0028] px-10 py-5 text-sm font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors duration-300"
          >
            Get Tickets
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
