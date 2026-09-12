'use client';

import { cn } from "@/lib/utils";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence, type MotionValue, type Variants } from 'framer-motion';
import { ChevronRight, PlayCircle } from 'lucide-react';

// --- Types & Data ---
export interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  videoUrl: string;
  theme: 'light' | 'dark';
  description: string;
}

export const defaultChapters: Chapter[] = [
  {
    id: '01',
    title: 'The Origin',
    subtitle: 'Where silence begins',
    videoUrl: 'https://ik.imagekit.io/kqmrslzuq/Videos/1.mp4',
    theme: 'dark',
    description: 'The moment where motion is born from stillness. Watch the first frame of a story that has not yet been written.',
  },
  {
    id: '02',
    title: 'Velocity',
    subtitle: 'Moving at lightspeed',
    videoUrl: 'https://cdn.21st.dev/assets/mirror/13/130f3cb22e97770a1e0a2c66893bf5b63a1c21fd47598839a04d3af34c9da165.mp4',
    theme: 'dark',
    description: 'City lights blur into streaks of memory as the world accelerates around you. Every frame a new direction.',
  },
  {
    id: '03',
    title: 'Immersion',
    subtitle: 'Beneath the surface',
    videoUrl: 'https://cdn.21st.dev/assets/mirror/5d/5d00d3f51a1f753bb8f106955b9e116d86e82f34b173166ee79275ab10e670b1.mp4',
    theme: 'light',
    description: 'You drift below the noise into a quiet, weightless space. Sound fades, colors thicken, and focus returns.',
  },
];

// --- Animation Variants ---
const textContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

const textReveal: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { 
    y: "0%", 
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, delay: 0.4, ease: "easeOut" } 
  }
};

// --- Sub-Components ---
const FilmGrain = () => (
  <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.07] mix-blend-overlay">
    <div
      className="absolute inset-0 h-full w-full"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }}
    />
  </div>
);

const VideoBackground = ({ 
  chaptersList, 
  currentChapterIndex 
}: { 
  chaptersList: Chapter[]; 
  currentChapterIndex: number 
}) => {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-black">
      {chaptersList.map((chapter, index) => (
        <motion.div
          key={chapter.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: index === currentChapterIndex ? 1 : 0,
            zIndex: index === currentChapterIndex ? 10 : 0, 
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full"
        >
          <video
            src={chapter.videoUrl}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      ))}
      <FilmGrain />
    </div>
  );
};

const DynamicNav = ({
  chaptersList,
  activeIndex,
  progress
}: {
  chaptersList: Chapter[];
  activeIndex: number;
  progress: MotionValue<number>;
}) => {
  const smoothProgress = useSpring(progress, { stiffness: 100, damping: 30 });
  const activeChapter = chaptersList[activeIndex] || chaptersList[0];

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 p-2 pl-6 pr-2 shadow-2xl"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-widest text-white/50 font-sans">
          Chapter {activeChapter.id}
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs font-bold text-white min-w-[120px] truncate"
          >
            {activeChapter.title}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="relative h-12 w-12 flex items-center justify-center">
        <svg className="h-full w-full -rotate-90 transform">
          <circle cx="24" cy="24" r="18" className="stroke-white/10" strokeWidth="2" fill="none" />
          <motion.circle
            cx="24" cy="24" r="18"
            className="stroke-[#eb0028]"
            strokeWidth="2"
            fill="none"
            strokeDasharray="113"
            style={{ pathLength: smoothProgress }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <PlayCircle size={16} fill="white" className="text-black" />
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Component ---
export default function CinematicScrol({ 
  customChapters = defaultChapters,
  onExploreChapter,
  className,
}: { 
  customChapters?: Chapter[];
  onExploreChapter?: (chapterId: string) => void;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const newIndex = Math.min(
        Math.floor(latest * customChapters.length),
        customChapters.length - 1
      );
      setActiveIndex(newIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress, customChapters.length]);

  return (
    <section ref={containerRef} className={cn("relative w-full", className)} style={{ height: `${customChapters.length * 100}vh` }}>
      {/* 1. Video Background */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <VideoBackground chaptersList={customChapters} currentChapterIndex={activeIndex} />
      </div>

      {/* 2. Floating Controller */}
      <DynamicNav chaptersList={customChapters} activeIndex={activeIndex} progress={scrollYProgress} />

      {/* 3. Text & Narrative Content */}
      <div className="absolute inset-0 top-0 z-30 pointer-events-none">
        {customChapters.map((chapter) => (
          <div
            key={chapter.id}
            className="flex h-screen w-full items-center justify-start px-6 md:px-24"
          >
            <motion.div
              variants={textContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-20%" }} 
              className="max-w-4xl pointer-events-auto"
            >
              {/* Header Label */}
              <motion.div variants={fadeIn} className="flex items-center gap-4 mb-4">
                <div className="h-px w-10 bg-[#eb0028]" />
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#eb0028] font-sans">
                  Curatorial Chapter {chapter.id}
                </span>
              </motion.div>

              {/* Masked Title Reveal */}
              <div className="overflow-hidden mb-4 py-2">
                <motion.h2 
                  variants={textReveal}
                  className="text-4xl md:text-7xl font-light tracking-tight text-white leading-tight font-sans"
                >
                  {chapter.subtitle}
                </motion.h2>
              </div>

              {/* Description - Editorial layout instead of clunky card */}
              <motion.div 
                variants={fadeIn}
                className="max-w-xl pl-4 border-l border-white/20 py-2"
              >
                <p className="text-base md:text-lg text-white/70 leading-relaxed font-light">
                  {chapter.description}
                </p>
              </motion.div>

              {/* Action Button */}
              <motion.button
                variants={fadeIn}
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onExploreChapter?.(chapter.id)}
                className="mt-8 group flex items-center gap-4 text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                <div className="relative h-11 w-11 rounded-full border border-white/20 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <ChevronRight size={18} className="relative z-10 text-white group-hover:text-black transition-colors duration-300" />
                </div>
                <span className="tracking-[0.2em] uppercase text-xs font-medium">View Schedule Timeline</span>
              </motion.button>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

export { CinematicScrol };
