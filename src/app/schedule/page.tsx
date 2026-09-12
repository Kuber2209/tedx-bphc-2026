"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import InvisibleThreadsCanvas from "@/components/schedule/InvisibleThreadsCanvas";
import Timeline, { ScheduleEvent } from "@/components/schedule/timeline";
import { FlowButton } from "@/components/ui/flow-button";
import { ChevronRight, Sparkles } from "lucide-react";

// ============================================================================
// Animation Variants (Remixed from scroll-triggered-video-hero)
// ============================================================================

const textContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const textReveal: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// ============================================================================
// Data: Curatorial Movements & Chronological Sessions
// ============================================================================

interface CuratorialMovement {
  id: string;
  romanId: string;
  title: string;
  subtitle: string;
  timeRange: string;
  phaseLabel: string;
  description: string;
  sessions: ScheduleEvent[];
}

const scheduleMovements: CuratorialMovement[] = [
  {
    id: "01",
    romanId: "Movement 01",
    title: "Genesis / The Spark & Foundations",
    subtitle: "From Stillness to Signal",
    timeRange: "09:00 AM – 12:15 PM",
    phaseLabel: "Morning Inaugural Cycle",
    description:
      "The moment where motion is born from stillness. Tracing personal catalysts, the ceremonial thesis prologue, and opening keynotes on ambient intelligence and living carbon architecture.",
    sessions: [
      {
        id: "evt-01",
        time: "09:00 AM – 10:00 AM",
        startTime: "09:00 AM",
        endTime: "10:00 AM",
        duration: "60 min",
        tag: "Welcome & Check-in",
        category: "networking",
        sessionBlock: "Morning",
        threadChapter: "Thread I · Personal Catalysts",
        title: "Registration Opens & Filter Coffee Morning",
        location: "Auditorium Main Concourse",
        description:
          "The morning arrival ritual: participant badge collection, attendee kit distribution, and freshly brewed South Indian filter coffee in the concourse.",
        abstract:
          "Begin the day in a calm, welcoming atmosphere with acoustic ambient soundscapes. Collect your badge, explore the attendee curation pack, and connect with fellow thinkers over morning refreshments.",
        isExpandable: true,
      },
      {
        id: "evt-02",
        time: "10:00 AM – 10:20 AM",
        startTime: "10:00 AM",
        endTime: "10:20 AM",
        duration: "20 min",
        tag: "Theme Inauguration",
        category: "ceremony",
        sessionBlock: "Morning",
        threadChapter: "Thread I · Personal Catalysts",
        title: "Curatorial Prologue: Weaving Invisible Threads",
        location: "Main Auditorium Stage",
        description:
          "Lighting of the lamp, ceremonial opening remarks, and an evocative prologue uncovering how unseen relationships hold our world together.",
        abstract:
          "The curatorial team and campus leadership open TEDx BPHC 2026. A cinematic thesis framing how subtle personal choices, quiet catalysts, and invisible societal threads orchestrate our collective future.",
        isExpandable: true,
      },
      {
        id: "evt-03",
        time: "10:20 AM – 10:45 AM",
        startTime: "10:20 AM",
        endTime: "10:45 AM",
        duration: "25 min",
        tag: "Keynote Talk 01",
        category: "keynote",
        sessionBlock: "Morning",
        threadChapter: "Thread I · Personal Catalysts",
        title: "Keynote 01: The Architecture of Synthetic Intuition",
        talkTitle: "The Architecture of Synthetic Intuition",
        speaker: {
          name: "Speaker 1",
          role: "Founding Scientist & Neuro-AI Director",
          company: "NeuralCraft Technologies",
          bio: "Pioneering neural interfaces and self-adaptive agentic networks at NeuralCraft, exploring how biological synapses inspire non-linear artificial cognition.",
        },
        location: "Main Auditorium Stage",
        description:
          "An inquiry into how decentralized networks, ambient computation, and subtle data streams are quietly rewriting the fabric of human cognition.",
        abstract:
          "A deep inquiry into synthetic intuition: how moving beyond brute-force token prediction enables autonomous systems to perceive spatial analogies, context, and creative divergence. Examines the hidden synaptic threads between biological brains and synthetic reasoning models.",
        isExpandable: true,
      },
      {
        id: "evt-04",
        time: "10:45 AM – 11:10 AM",
        startTime: "10:45 AM",
        endTime: "11:10 AM",
        duration: "25 min",
        tag: "Keynote Talk 02",
        category: "keynote",
        sessionBlock: "Morning",
        threadChapter: "Thread I · Personal Catalysts",
        title: "Keynote 02: Cities of Living Carbon — Vernacular Ecology",
        talkTitle: "Cities of Living Carbon",
        speaker: {
          name: "Speaker 2",
          role: "Principal Architect & Urban Ecologist",
          company: "TerraNova Habitats",
          bio: "Specializes in regenerative vernacular architecture and biomaterial composites that naturally sequester atmospheric carbon while fostering biodiversity in dense cities.",
        },
        location: "Main Auditorium Stage",
        description:
          "How ancient fungal networks beneath forest floors mirror human cities — and why understanding symbiotic resource-sharing resolves modern climate paralysis.",
        abstract:
          "Rethinking the urban landscape not as static concrete monoliths, but as living metabolic organisms that filter air, cycle water, and cool urban heat islands passively. Explores the unseen threads linking indigenous construction wisdom to high-performance biomaterials.",
        isExpandable: true,
      },
      {
        id: "evt-05",
        time: "11:10 AM – 11:45 AM",
        startTime: "11:10 AM",
        endTime: "11:45 AM",
        duration: "35 min",
        tag: "Social Intermission",
        category: "break",
        sessionBlock: "Morning",
        threadChapter: "Thread II · Communal Exchange",
        title: "Mid-Morning Recharge & Facilitated Idea Circles",
        location: "Courtyard & Auditorium Promenade",
        description:
          "Artisanal tea, refreshments, and quick-fire facilitated discussion circles unpacking the morning keynotes.",
        abstract:
          "Grab hot beverages and step out into the courtyard for curated prompt cards. Attendees gather around thematic tables to debate synthetic intuition, biomimetic design, and the invisible systems highlighted in the morning talks.",
        isExpandable: true,
      },
      {
        id: "evt-06",
        time: "11:45 AM – 12:10 PM",
        startTime: "11:45 AM",
        endTime: "12:10 PM",
        duration: "25 min",
        tag: "Keynote Talk 03",
        category: "keynote",
        sessionBlock: "Morning",
        threadChapter: "Thread II · Communal Exchange",
        title: "Keynote 03: Harnessing the Heart of Stars",
        talkTitle: "Harnessing the Heart of Stars",
        speaker: {
          name: "Speaker 3",
          role: "Chief Plasma Physicist",
          company: "Helios Fusion Energy",
          bio: "Leading magnetic confinement fusion experiments aiming to deliver decentralized, zero-emission baseload energy to regional power grids.",
        },
        location: "Main Auditorium Stage",
        description:
          "Demystifying plasma physics and fusion reactors — the invisible cosmic forces that power stellar bodies and could soon cleanly power humanity.",
        abstract:
          "An illuminating talk unpacking magnetic confinement fusion. Demonstrates how micro-scale magnetic fields confine 100-million-degree plasma to produce clean baseload energy, drawing parallels between stellar fusion and human collaboration.",
        isExpandable: true,
      },
    ],
  },
  {
    id: "02",
    romanId: "Movement 02",
    title: "Velocity / Kinetics & Emergence",
    subtitle: "Kinetics of the Present",
    timeRange: "12:15 PM – 03:45 PM",
    phaseLabel: "Midday Confluence & Afternoon",
    description:
      "Acceleration as medium. Tracing the velocity with which computation and biology rewire human institutions. Communal exchange over curated networking luncheon, live musical interlude, and talks on vanishing acoustic ecologies and synthetic biology.",
    sessions: [
      {
        id: "evt-07",
        time: "12:15 PM – 01:45 PM",
        startTime: "12:15 PM",
        endTime: "01:45 PM",
        duration: "90 min",
        tag: "Networking Luncheon",
        category: "networking",
        sessionBlock: "Midday",
        threadChapter: "Thread II · Communal Exchange",
        title: "Curated Networking Luncheon & Idea Installations",
        location: "Student Activity Centre Lawns",
        description:
          "A regional gastronomy spread paired with interactive thread-mapping installations where attendees physically plot their personal connection graphs.",
        abstract:
          "Enjoy a curated multi-course buffet showcasing regional culinary traditions. Participate in the interactive Thread Installation: string physical crimson cords between idea pillars to visually map the emergent connections formed across the audience.",
        isExpandable: true,
      },
      {
        id: "evt-08",
        time: "01:45 PM – 02:10 PM",
        startTime: "01:45 PM",
        endTime: "02:10 PM",
        duration: "25 min",
        tag: "Artistic Interlude",
        category: "performance",
        sessionBlock: "Afternoon",
        threadChapter: "Thread III · Societal & Technological Webs",
        title: "Musical Interlude: Resonant Strings & Live Modular Synthesizers",
        talkTitle: "Resonant Strings: Audiovisual Synthesis",
        speaker: {
          name: "Contemporary Fusion Ensemble",
          role: "Acoustic-Electronic Quintet",
          company: "Sound & Resonance Lab",
          bio: "A pioneering ensemble merging classical Indian string instruments with modular polyphonic synthesizers and live reactive projection mapping.",
        },
        location: "Main Auditorium Stage",
        description:
          "A bespoke audiovisual performance demonstrating the ripple effect through harmonic resonance and live modular synthesizer soundscapes.",
        abstract:
          "A 20-minute sensory performance where live string acoustics trigger reactive generative visuals on the stage projection, making acoustic frequencies visibly ripple across the auditorium.",
        isExpandable: true,
      },
      {
        id: "evt-09",
        time: "02:10 PM – 02:35 PM",
        startTime: "02:10 PM",
        endTime: "02:35 PM",
        duration: "25 min",
        tag: "Keynote Talk 04",
        category: "keynote",
        sessionBlock: "Afternoon",
        threadChapter: "Thread III · Societal & Technological Webs",
        title: "Keynote 04: The Frequency of Memory — Endangered Soundscapes",
        talkTitle: "The Frequency of Memory",
        speaker: {
          name: "Speaker 4",
          role: "Sound Sculptor & Ethnomusicologist",
          company: "Vayu Soundscapes",
          bio: "Documenting endangered acoustic ecologies and oral storytelling cultures across riverine ecosystems and ancient biomes.",
        },
        location: "Main Auditorium Stage",
        description:
          "Archiving endangered acoustic environments and why preserving sonic heritage is vital for cultural memory and ecological awareness.",
        abstract:
          "Take a journey into vanishing acoustic ecologies. Examines how noise pollution fractures bird communication pathways, and how archiving rare tribal chants reconnects fragmented urban societies to their ancestral acoustic roots.",
        isExpandable: true,
      },
      {
        id: "evt-10",
        time: "02:35 PM – 03:00 PM",
        startTime: "02:35 PM",
        endTime: "03:00 PM",
        duration: "25 min",
        tag: "Keynote Talk 05",
        category: "keynote",
        sessionBlock: "Afternoon",
        threadChapter: "Thread III · Societal & Technological Webs",
        title: "Keynote 05: Programming Life's Code — Synthetic Biology",
        talkTitle: "Programming Life's Code",
        speaker: {
          name: "Speaker 5",
          role: "Synthetic Biologist & Genetic Engineer",
          company: "BioSynthetica Genomics",
          bio: "Developing programmable genetic logic circuits and microbial enzymes that digest industrial pollutants into non-toxic biological substrates.",
        },
        location: "Main Auditorium Stage",
        description:
          "Rewriting microbial DNA as programmable circuits to solve plastic pollution, chronic disease, and food insecurity sustainably.",
        abstract:
          "Synthetic biology treats DNA as a modular programming language. Discover how microscopic cellular circuits can now detect microplastics, synthesize life-saving therapeutics on-demand, and forge a regenerative bio-economy.",
        isExpandable: true,
      },
    ],
  },
  {
    id: "03",
    romanId: "Movement 03",
    title: "Immersion / The Tapestry & Nocturne",
    subtitle: "Resonance in the Abyss",
    timeRange: "03:00 PM – 05:30 PM",
    phaseLabel: "Evening Twilight & Sundowner",
    description:
      "Submerging into the tapestry. Sound dissolves, quiet reflections deepen in the afternoon tea intermission, concluding keynote synthesis on cosmic time, official felicitation ceremony, and an unhurried twilight sundowner reception on the campus lawns.",
    sessions: [
      {
        id: "evt-11",
        time: "03:00 PM – 03:35 PM",
        startTime: "03:00 PM",
        endTime: "03:35 PM",
        duration: "35 min",
        tag: "Interactive Break",
        category: "break",
        sessionBlock: "Afternoon",
        threadChapter: "Thread IV · The Tapestry",
        title: "Afternoon Chai & Interactive Thread Reflection Wall",
        location: "Auditorium Promenade & Foyer",
        description:
          "Masala chai, artisanal bakes, and live collective thread-weaving where attendees pin their reflections to a collaborative physical canvas.",
        abstract:
          "A sensory intermission before the final keynote. Write your takeaway or quiet personal inflection point on curated tag-cards and tie it to the giant geometric Thread Wall in the foyer, watching the collective tapestry emerge.",
        isExpandable: true,
      },
      {
        id: "evt-12",
        time: "03:35 PM – 04:00 PM",
        startTime: "03:35 PM",
        endTime: "04:00 PM",
        duration: "25 min",
        tag: "Keynote Talk 06",
        category: "keynote",
        sessionBlock: "Evening",
        threadChapter: "Thread IV · The Tapestry",
        title: "Keynote 06: The Final Thread — The Illusion of the Present",
        talkTitle: "The Illusion of the Present",
        speaker: {
          name: "Speaker 6",
          role: "Cognitive Philosopher & Time Theorist",
          company: "Chronos Philosophy Review",
          bio: "Investigating the phenomenology of subjective temporal perception, quantum entanglement, and human decision architectures across cosmic timelines.",
        },
        location: "Main Auditorium Stage",
        description:
          "Synthesizing the day's themes into an exploration of physics and consciousness — why every electron in our bodies has a cosmic counterpart.",
        abstract:
          "How human consciousness weaves linear time out of timeless quantum interactions. A captivating synthesis tying together technology, ecology, memory, and personal purpose into an unbroken cosmic tapestry.",
        isExpandable: true,
      },
      {
        id: "evt-13",
        time: "04:00 PM – 04:30 PM",
        startTime: "04:00 PM",
        endTime: "04:30 PM",
        duration: "30 min",
        tag: "Closing Valedictory",
        category: "ceremony",
        sessionBlock: "Evening",
        threadChapter: "Thread IV · The Tapestry",
        title: "Curatorial Epilogue & Speaker Felicitations",
        location: "Main Auditorium Stage",
        description:
          "Official memento presentation, volunteer team curtain call, and closing curatorial reflections on keeping the invisible threads alive.",
        abstract:
          "Honoring our speakers and celebrating the student organizing committee and volunteers who spent months weaving this edition together. Final valedictory address and preview of the post-conference community network.",
        isExpandable: true,
      },
      {
        id: "evt-14",
        time: "04:30 PM – 05:30 PM",
        startTime: "04:30 PM",
        endTime: "05:30 PM",
        duration: "60 min",
        tag: "Sundowner Reception",
        category: "networking",
        sessionBlock: "Evening",
        threadChapter: "Thread IV · The Tapestry",
        title: "Sundowner Mixer & High Tea on the Lawn",
        location: "Guest House Lawns, BPHC",
        description:
          "Sunset high tea, relaxed acoustic music, photograph opportunities, and informal conversations under the illuminated campus canopy.",
        abstract:
          "Unwind as twilight settles over BPHC. Mingle informally with the speakers, curators, and fellow attendees over artisanal snacks, sunset mocktails, and live acoustic music on the grass.",
        isExpandable: true,
      },
    ],
  },
];

// ============================================================================
// Dynamic Floating Controller Pill (Remixed in Light Glassmorphic Theme)
// ============================================================================

const DynamicNav = ({
  movements,
  activeIndex,
  progress,
  onSelectMovement,
}: {
  movements: CuratorialMovement[];
  activeIndex: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  onSelectMovement: (index: number) => void;
}) => {
  const smoothProgress = useSpring(progress, { stiffness: 100, damping: 30 });
  const activeMovement = movements[activeIndex] || movements[0];

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 rounded-full bg-white/95 backdrop-blur-xl border border-black/15 p-2 pl-6 pr-2 text-black"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-widest text-[#eb0028] font-mono font-bold">
          {activeMovement.romanId}
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="text-xs font-bold text-neutral-900 min-w-[130px] max-w-[200px] truncate"
          >
            {activeMovement.title.split("/")[0].trim()}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Circular Progress Ring */}
      <div className="relative h-11 w-11 flex items-center justify-center">
        <svg className="h-full w-full -rotate-90 transform">
          <circle
            cx="22"
            cy="22"
            r="16"
            className="stroke-black/10"
            strokeWidth="2.5"
            fill="none"
          />
          <motion.circle
            cx="22"
            cy="22"
            r="16"
            className="stroke-[#eb0028]"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray="100.5"
            style={{ pathLength: smoothProgress }}
          />
        </svg>
        <button
          type="button"
          onClick={() => onSelectMovement((activeIndex + 1) % movements.length)}
          className="absolute inset-0 flex items-center justify-center text-black hover:text-[#eb0028] transition-colors cursor-pointer"
          title="Jump to next movement"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

// ============================================================================
// Main Schedule Page
// ============================================================================

export default function SchedulePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Keep track of which movements are expanded.
  // By default, all movements start collapsed so the page is clean, compact, and not overwhelming.
  const [expandedMovements, setExpandedMovements] = useState<Record<string, boolean>>({
    "01": false,
    "02": false,
    "03": false,
  });

  const toggleMovement = (id: string) => {
    setExpandedMovements((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleAll = () => {
    const allExpanded = Object.values(expandedMovements).every(Boolean);
    setExpandedMovements({
      "01": !allExpanded,
      "02": !allExpanded,
      "03": !allExpanded,
    });
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track active chapter as the user scrolls
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const newIndex = Math.min(
        Math.floor(latest * scheduleMovements.length),
        scheduleMovements.length - 1
      );
      setActiveIndex(newIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToMovement = (index: number) => {
    const targetMovement = scheduleMovements[index];
    if (!targetMovement) return;
    const element = document.getElementById(`movement-${targetMovement.id}`);
    if (element) {
      // Auto-expand on scroll navigation
      setExpandedMovements((prev) => ({ ...prev, [targetMovement.id]: true }));
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const allExpanded = Object.values(expandedMovements).every(Boolean);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-transparent text-neutral-900 selection:bg-[#E62B1E] selection:text-white pb-32 font-sans relative overflow-hidden"
    >
      <div className="relative z-10">
        {/* =========================================================================
            1. EDITORIAL HEADER WITH TEXT-COMING ANIMATION MATCHING SPEAKER PAGE
            ========================================================================= */}
        <header className="pt-40 pb-20 px-6 md:px-12 border-b border-black/10 max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Red Accent Line & Eyebrow Badge */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-8 bg-[#eb0028]" />
              <span className="text-zinc-700 font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold">
                TEDx BITS Hyderabad • Event Itinerary
              </span>
            </div>

            {/* Headline with localized Invisible Threads animation flowing into the right space */}
            <div className="relative mb-8 w-full min-h-[220px] sm:min-h-[260px] md:min-h-[320px] flex items-center">
              <InvisibleThreadsCanvas />
              <h1 className="relative z-10 text-6xl sm:text-7xl md:text-[130px] font-bold tracking-tighter leading-[0.85] pointer-events-auto select-none">
                Invisible <br />
                <span className="italic font-serif font-light text-zinc-600">threads.</span>
              </h1>
            </div>

            {/* Subtitle & Metadata matching Speaker Page layout */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
              <p className="max-w-2xl text-zinc-800 text-lg md:text-xl font-normal leading-relaxed">
                From the first spark to the final ripple — follow the chronological sequence of conversations quietly shaping what comes next.
              </p>
              <div className="flex items-center gap-4 font-mono text-xs text-zinc-700 font-medium shrink-0">
                <span>14 Nov 2026</span>
                <span>•</span>
                <span>Auditorium, BPHC</span>
                <span>•</span>
                <span className="text-[#eb0028] font-bold">1-Day Flagship</span>
              </div>
            </div>
          </motion.div>
        </header>

        {/* =========================================================================
            2. SECTION CONTROL BAR (COMPACT STATUS & EXPAND ALL)
            ========================================================================= */}
        <section className="max-w-[1600px] mx-auto px-6 md:px-12 pt-10 pb-4">
          <div className="flex items-center justify-between py-4 border-b border-black/10">
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-zinc-700 font-semibold">
              <Sparkles size={14} className="text-[#eb0028]" />
              <span>3 Curatorial Movements · 14 Milestones</span>
            </div>

            <button
              type="button"
              onClick={toggleAll}
              className="cursor-pointer text-xs font-mono font-bold uppercase tracking-wider text-[#eb0028] hover:text-black transition-colors"
            >
              {allExpanded ? "Collapse All Movements" : "Expand All Movements"}
            </button>
          </div>
        </section>

        {/* =========================================================================
            3. SCROLL-DRIVEN CHAPTER SECTIONS WITH EXPAND BUTTONS
            Remixed animation & layout keeping the schedule page clean and compact
            ========================================================================= */}
        <main className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
          <div className="space-y-32">
            {scheduleMovements.map((movement) => {
              const isExpanded = expandedMovements[movement.id] || false;

              return (
                <section
                  key={movement.id}
                  id={`movement-${movement.id}`}
                  className="scroll-mt-32"
                >
                  <motion.div
                    variants={textContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-8"
                  >
                    {/* Header Accent Line & Movement Label */}
                    <motion.div variants={fadeIn} className="flex items-center gap-4">
                      <div className="h-[1px] w-10 bg-[#eb0028]" />
                      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#eb0028] font-mono">
                        {movement.romanId}
                      </span>
                    </motion.div>

                    {/* Masked Title Reveal (Like scroll-triggered-video-hero) */}
                    <div className="overflow-hidden py-1">
                      <motion.h2
                        variants={textReveal}
                        className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-neutral-900 leading-[0.95]"
                      >
                        {movement.subtitle}
                      </motion.h2>
                    </div>

                    {/* Curatorial Description Card (Frosted glassmorphism in light theme) */}
                    <motion.div
                      variants={fadeIn}
                      className="max-w-2xl bg-white/70 backdrop-blur-md border border-black/10 rounded-2xl p-6 sm:p-8 border-l-2 border-l-[#eb0028] space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-700 font-medium pb-2 border-b border-black/5">
                        <span className="font-bold text-neutral-900">{movement.title}</span>
                        <span>{movement.timeRange}</span>
                      </div>
                      <p className="text-base text-zinc-800 font-normal leading-relaxed">
                        {movement.description}
                      </p>
                    </motion.div>

                    {/* Expand / Explore Sessions Button */}
                    <motion.div variants={fadeIn} className="pt-2">
                      <button
                        type="button"
                        onClick={() => toggleMovement(movement.id)}
                        className="group inline-flex items-center gap-4 text-neutral-900 hover:text-[#eb0028] transition-colors cursor-pointer"
                      >
                        <div className="relative h-11 w-11 rounded-full border border-black/20 flex items-center justify-center overflow-hidden bg-white group-hover:border-[#eb0028] transition-colors">
                          <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <ChevronRight
                              size={18}
                              className="text-neutral-900 group-hover:text-[#eb0028] transition-colors"
                            />
                          </motion.div>
                        </div>
                        <span className="tracking-[0.2em] uppercase text-xs font-bold font-mono">
                          {isExpanded ? "Collapse Movement Timeline" : "Explore Movement Sessions"}
                        </span>
                        <span className="text-xs font-mono text-zinc-600 font-medium">
                          ({movement.sessions.length} milestones)
                        </span>
                      </button>
                    </motion.div>

                    {/* Expanded Timeline Section with Unbroken Vertical Thread */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden pt-8"
                        >
                          <div className="pt-6 border-t border-black/10">
                            <Timeline events={movement.sessions} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </section>
              );
            })}
          </div>

          {/* Thread Terminal Node */}
          <div className="mt-28 pt-8 border-t border-black/10 flex items-center gap-3 font-mono text-xs text-zinc-700 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#eb0028]" />
            <span>End of Official Programme · Sundowner continues on Guest House Lawn</span>
          </div>
        </main>

        {/* =========================================================================
            4. FLOATING DYNAMIC CONTROLLER PILL
            Tracks active chapter with circular progress ring in TED Red
            ========================================================================= */}
        <DynamicNav
          movements={scheduleMovements}
          activeIndex={activeIndex}
          progress={scrollYProgress}
          onSelectMovement={scrollToMovement}
        />

        {/* =========================================================================
            5. BOTTOM CTA BANNER: JOIN THE RIPPLE
            ========================================================================= */}
        <section className="mt-32 max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="border border-black/10 bg-white/70 backdrop-blur-md p-8 md:p-14 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#eb0028] font-bold block mb-2">
                Join The Ripple
              </span>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-black mb-3">
                Be there when the threads connect.
              </h3>
              <p className="text-zinc-800 text-base md:text-lg font-normal max-w-xl">
                Seating in the main auditorium is strictly limited to ensure an intimate, focused atmosphere for meaningful dialogue.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <FlowButton
                href="/passes"
                text="Explore Passes"
                variant="red"
                className="w-full sm:w-auto text-xs font-bold uppercase tracking-[0.2em] py-3.5 px-8"
              />
              <FlowButton
                href="/venue"
                text="Venue Guide"
                variant="white"
                hasArrow={false}
                className="w-full sm:w-auto text-xs font-bold uppercase tracking-[0.15em] py-3.5 px-7"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
