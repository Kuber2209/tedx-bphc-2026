"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  AnimatePresence,
  type Variants,
} from "framer-motion";
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
// Data: 3-Day Conference Schedule
// ============================================================================

interface ScheduleDay {
  id: string;
  dayNumber: string;
  date: string;
  dayOfWeek: string;
  oneLiner: string;
  sessions: ScheduleEvent[];
}

const scheduleDays: ScheduleDay[] = [
  {
    id: "01",
    dayNumber: "Day 01",
    date: "13 Nov 2026",
    dayOfWeek: "Friday",
    oneLiner:
      "Day 1 opens with conversations on artificial intelligence, sustainable architecture, and clean fusion energy.",
    sessions: [
      {
        id: "d1-evt-01",
        time: "09:00 AM – 10:00 AM",
        startTime: "09:00 AM",
        endTime: "10:00 AM",
        duration: "60 min",
        tag: "Welcome & Check-in",
        category: "networking",
        sessionBlock: "Morning",
        threadChapter: "Day 01 · Welcome",
        title: "Welcome & Attendee Registration",
        location: "Auditorium Main Concourse",
        description:
          "Participant badge collection, registration kit distribution, and South Indian filter coffee in the concourse.",
        abstract:
          "Begin Day 1 in a calm, welcoming atmosphere. Collect your badge, explore the attendee curation pack, and connect with fellow thinkers over morning refreshments.",
        isExpandable: true,
      },
      {
        id: "d1-evt-02",
        time: "10:00 AM – 11:00 AM",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        duration: "60 min",
        tag: "Keynote Talk",
        category: "keynote",
        sessionBlock: "Morning",
        threadChapter: "Day 01 · Session 01",
        title: "Speaker 1",
        talkTitle: "The Architecture of Synthetic Intuition",
        speaker: {
          name: "Speaker 1",
          role: "Founding Scientist & Neuro-AI Director",
          company: "NeuralCraft Technologies",
          bio: "Pioneering neural interfaces and self-adaptive agentic networks at NeuralCraft. Siddharth explores how biological synapses inspire non-linear artificial cognition.",
        },
        location: "Main Auditorium Stage",
        description:
          "An inquiry into how decentralized neural models, ambient computation, and subtle data streams are quietly rewriting the fabric of human cognition.",
        abstract:
          "A deep inquiry into synthetic intuition: how moving beyond brute-force token prediction enables autonomous systems to perceive spatial analogies, context, and creative divergence.",
        isExpandable: true,
      },
      {
        id: "d1-evt-03",
        time: "11:00 AM – 12:00 PM",
        startTime: "11:00 AM",
        endTime: "12:00 PM",
        duration: "60 min",
        tag: "Keynote Talk",
        category: "keynote",
        sessionBlock: "Morning",
        threadChapter: "Day 01 · Session 02",
        title: "Speaker 2",
        talkTitle: "Cities of Living Carbon",
        speaker: {
          name: "Speaker 2",
          role: "Principal Architect & Urban Ecologist",
          company: "TerraNova Habitats",
          bio: "Specializes in regenerative vernacular architecture and biomaterial composites that naturally sequester atmospheric carbon while fostering biodiversity in dense urban centres.",
        },
        location: "Main Auditorium Stage",
        description:
          "How ancient fungal networks beneath forest floors mirror human cities — and why understanding symbiotic resource-sharing resolves modern climate paralysis.",
        abstract:
          "Rethinking the urban landscape not as static concrete monoliths, but as living metabolic organisms that filter air, cycle water, and cool urban heat islands passively.",
        isExpandable: true,
      },
      {
        id: "d1-evt-04",
        time: "12:00 PM – 01:00 PM",
        startTime: "12:00 PM",
        endTime: "01:00 PM",
        duration: "60 min",
        tag: "Keynote Talk",
        category: "keynote",
        sessionBlock: "Midday",
        threadChapter: "Day 01 · Session 03",
        title: "Speaker 3",
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
          "An illuminating talk unpacking magnetic confinement fusion. Demonstrates how micro-scale magnetic fields confine 100-million-degree plasma to produce clean baseload energy.",
        isExpandable: true,
      },
      {
        id: "d1-evt-05",
        time: "01:00 PM – 02:30 PM",
        startTime: "01:00 PM",
        endTime: "02:30 PM",
        duration: "90 min",
        tag: "Lunch Break",
        category: "break",
        sessionBlock: "Afternoon",
        threadChapter: "Day 01 · Intermission",
        title: "Lunch Break & Networking",
        location: "Student Activity Centre Lawns",
        description:
          "Curated regional gastronomy spread, interactive networking pods, and open community discussions across the lawns.",
        abstract:
          "Enjoy a curated multi-course buffet showcasing regional culinary traditions. Participate in facilitated discussions and connect with fellow delegates and speakers.",
        isExpandable: true,
      },
      {
        id: "d1-evt-06",
        time: "02:30 PM – 03:30 PM",
        startTime: "02:30 PM",
        endTime: "03:30 PM",
        duration: "60 min",
        tag: "Keynote Talk",
        category: "keynote",
        sessionBlock: "Afternoon",
        threadChapter: "Day 01 · Session 04",
        title: "Speaker 4",
        talkTitle: "Rewriting Cellular Epigenetics",
        speaker: {
          name: "Speaker 4",
          role: "Molecular Biologist & CRISPR Strategist",
          company: "Pravega Biotherapeutics",
          bio: "Investigates precision epigenome editing tools that reverse age-associated cellular decay without altering the underlying genomic code.",
        },
        location: "Main Auditorium Stage",
        description:
          "How targeted histone reprogramming can reset cellular biological age, opening revolutionary pathways to eradicate neurodegenerative disorders before symptoms begin.",
        abstract:
          "How targeted histone reprogramming can reset cellular biological age, opening revolutionary pathways to eradicate neurodegenerative disorders before symptoms begin.",
        isExpandable: true,
      },
      {
        id: "d1-evt-07",
        time: "03:30 PM – 04:30 PM",
        startTime: "03:30 PM",
        endTime: "04:30 PM",
        duration: "60 min",
        tag: "Keynote Talk",
        category: "keynote",
        sessionBlock: "Afternoon",
        threadChapter: "Day 01 · Session 05",
        title: "Speaker 5",
        talkTitle: "Algorithmic Consensus & Collective Will",
        speaker: {
          name: "Speaker 5",
          role: "Cryptoeconomist & Policy Fellow",
          company: "Decentralized Public Systems",
          bio: "Designs resilient quadratic voting and decentralized coordination mechanisms for civic infrastructure and public goods funding.",
        },
        location: "Main Auditorium Stage",
        description:
          "Why modern representative democracy struggles with asymmetric digital scale, and how cryptographic proof-of-humanity systems restore civic accountability.",
        abstract:
          "Why modern representative democracy struggles with asymmetric digital scale, and how cryptographic proof-of-humanity systems can restore civic accountability.",
        isExpandable: true,
      },
      {
        id: "d1-evt-08",
        time: "04:30 PM – 05:30 PM",
        startTime: "04:30 PM",
        endTime: "05:30 PM",
        duration: "60 min",
        tag: "Keynote Talk",
        category: "keynote",
        sessionBlock: "Evening",
        threadChapter: "Day 01 · Session 06",
        title: "Speaker 6",
        talkTitle: "Resonances of Lost Frequencies",
        speaker: {
          name: "Speaker 6",
          role: "Sonic Artist & Acoustic Archaeologist",
          company: "Subversive Sound Lab",
          bio: "Reconstructs the psychoacoustic soundscapes of ancient subterranean chambers and endangered oceanic reefs using spatial field recordings.",
        },
        location: "Main Auditorium Stage",
        description:
          "An evocative sensory presentation demonstrating how ambient sound shapes human memory, neurological well-being, and historical emotional perception.",
        abstract:
          "An evocative sensory presentation demonstrating how ambient sound shapes human memory, neurological well-being, and historical emotional perception.",
        isExpandable: true,
      },
    ],
  },
  {
    id: "02",
    dayNumber: "Day 02",
    date: "14 Nov 2026",
    dayOfWeek: "Saturday",
    oneLiner:
      "Day 2 explores space exploration technologies, digital media ethics, and human endurance.",
    sessions: [
      {
        id: "d2-evt-01",
        time: "09:00 AM – 10:00 AM",
        startTime: "09:00 AM",
        endTime: "10:00 AM",
        duration: "60 min",
        tag: "Welcome & Check-in",
        category: "networking",
        sessionBlock: "Morning",
        threadChapter: "Day 02 · Welcome",
        title: "Welcome & Day 2 Opening Address",
        location: "Auditorium Main Concourse",
        description:
          "Morning coffee reception, recap of Day 1 highlights, and introductory remarks setting the stage for deep tech and scientific frontiers.",
        abstract:
          "Kick off Day 2 with fresh refreshments, attendee reflections on Day 1 breakthroughs, and opening remarks from the curatorial team.",
        isExpandable: true,
      },
      {
        id: "d2-evt-02",
        time: "10:00 AM – 11:00 AM",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        duration: "60 min",
        tag: "Keynote Talk",
        category: "keynote",
        sessionBlock: "Morning",
        threadChapter: "Day 02 · Session 01",
        title: "Speaker 1",
        talkTitle: "Swarms in Low Lunar Orbit",
        speaker: {
          name: "Speaker 7",
          role: "Astrodynamics Engineer & Payload Lead",
          company: "Orbital Frontier Dynamics",
          bio: "Directs autonomous propulsion and autonomous docking protocols for miniature orbital probes surveying lunar permanently shadowed regions.",
        },
        location: "Main Auditorium Stage",
        description:
          "How distributed satellite swarms will build the logistical nervous system required for sustainable, multi-generational interplanetary scientific exploration.",
        abstract:
          "How distributed satellite swarms will build the logistical nervous system required for sustainable, multi-generational interplanetary scientific exploration.",
        isExpandable: true,
      },
      {
        id: "d2-evt-03",
        time: "11:00 AM – 12:00 PM",
        startTime: "11:00 AM",
        endTime: "12:00 PM",
        duration: "60 min",
        tag: "Keynote Talk",
        category: "keynote",
        sessionBlock: "Morning",
        threadChapter: "Day 02 · Session 02",
        title: "Speaker 2",
        talkTitle: "Sanity in the Age of Generative Noise",
        speaker: {
          name: "Speaker 8",
          role: "Media Sociologist & Investigative Journalist",
          company: "Open Dialectic Initiative",
          bio: "Investigates information ecologies, synthetic disinformation velocity, and the cognitive impacts of hyper-personalized algorithmic feeds.",
        },
        location: "Main Auditorium Stage",
        description:
          "A blueprint for epistemic defense: equipping delegates with cognitive tools to interrogate media narratives, resist rage-farming, and safeguard nuanced consensus.",
        abstract:
          "A blueprint for epistemic defense: equipping delegates with cognitive tools to interrogate media narratives, resist rage-farming, and safeguard nuanced consensus.",
        isExpandable: true,
      },
      {
        id: "d2-evt-04",
        time: "12:00 PM – 01:00 PM",
        startTime: "12:00 PM",
        endTime: "01:00 PM",
        duration: "60 min",
        tag: "Keynote Talk",
        category: "keynote",
        sessionBlock: "Midday",
        threadChapter: "Day 02 · Session 03",
        title: "Speaker 3",
        talkTitle: "The Threshold of Human Endurance",
        speaker: {
          name: "Speaker 9",
          role: "Biomechanist & Paralympic Director",
          company: "Institute for Human Performance",
          bio: "Pioneered sensory neuro-prosthetics and adaptive performance frameworks that turn extreme physiological adversity into record-setting athletic breakthroughs.",
        },
        location: "Main Auditorium Stage",
        description:
          "Deconstructing the threshold of human endurance: how neurological reframing and biofeedback transform physical limits into launching pads for greatness.",
        abstract:
          "Deconstructing the threshold of human endurance: how neurological reframing and biofeedback transform physical limits into launching pads for greatness.",
        isExpandable: true,
      },
      {
        id: "d2-evt-05",
        time: "01:00 PM – 02:30 PM",
        startTime: "01:00 PM",
        endTime: "02:30 PM",
        duration: "90 min",
        tag: "Lunch Break",
        category: "break",
        sessionBlock: "Afternoon",
        threadChapter: "Day 02 · Intermission",
        title: "Lunch Break & Networking",
        location: "Student Activity Centre Lawns",
        description:
          "Chef's regional culinary showcase, student project demonstrations, and open networking beneath the campus canopy.",
        abstract:
          "Enjoy an extended networking break over lunch, explore innovative student research exhibits, and participate in guided discussion pods.",
        isExpandable: true,
      },
      {
        id: "d2-evt-06",
        time: "02:30 PM – 03:30 PM",
        startTime: "02:30 PM",
        endTime: "03:30 PM",
        duration: "60 min",
        tag: "Keynote Talk",
        category: "keynote",
        sessionBlock: "Afternoon",
        threadChapter: "Day 02 · Session 04",
        title: "Speaker 4",
        talkTitle: "Decentralized Clean Microgrids",
        speaker: {
          name: "Speaker 10",
          role: "Clean Energy Strategist",
          company: "CleanGrid Technologies",
          bio: "Engineering localized microgrid solutions and community solar architectures for off-grid rural communities.",
        },
        location: "Main Auditorium Stage",
        description:
          "Deploying modular renewable energy storage to empower agricultural independence and regional economic equity.",
        abstract:
          "How localized microgrids and distributed batteries provide resilient energy security while bypassing traditional centralized monopolies.",
        isExpandable: true,
      },
      {
        id: "d2-evt-07",
        time: "03:30 PM – 04:30 PM",
        startTime: "03:30 PM",
        endTime: "04:30 PM",
        duration: "60 min",
        tag: "Keynote Talk",
        category: "keynote",
        sessionBlock: "Afternoon",
        threadChapter: "Day 02 · Session 05",
        title: "Speaker 5",
        talkTitle: "Programming Life's Biological Circuits",
        speaker: {
          name: "Speaker 11",
          role: "Synthetic Biologist & Genetic Engineer",
          company: "BioSynthetica Genomics",
          bio: "Developing programmable genetic logic circuits and microbial enzymes that digest industrial pollutants into non-toxic biological substrates.",
        },
        location: "Main Auditorium Stage",
        description:
          "Rewriting microbial DNA as programmable circuits to solve plastic pollution, chronic disease, and clean water scarcity sustainably.",
        abstract:
          "Synthetic biology treats DNA as a modular programming language. Discover how microscopic cellular circuits can now detect microplastics and synthesize life-saving therapeutics.",
        isExpandable: true,
      },
      {
        id: "d2-evt-08",
        time: "04:30 PM – 05:30 PM",
        startTime: "04:30 PM",
        endTime: "05:30 PM",
        duration: "60 min",
        tag: "Keynote Talk",
        category: "keynote",
        sessionBlock: "Evening",
        threadChapter: "Day 02 · Session 06",
        title: "Speaker 6",
        talkTitle: "Audiovisual Harmonics & Modular Synthesis",
        speaker: {
          name: "Speaker 12",
          role: "Acoustic-Electronic Director",
          company: "Sound & Resonance Lab",
          bio: "Merging classical acoustic instruments with modular polyphonic synthesizers and live reactive projection mapping.",
        },
        location: "Main Auditorium Stage",
        description:
          "A sensory presentation demonstrating how frequency modulation, acoustic physics, and harmonics evoke collective emotional synchrony.",
        abstract:
          "A 60-minute sensory keynote and acoustic demonstration bridging musical harmony, brainwave entrainment, and live modular sound synthesis.",
        isExpandable: true,
      },
    ],
  },
  {
    id: "03",
    dayNumber: "Day 03",
    date: "15 Nov 2026",
    dayOfWeek: "Sunday",
    oneLiner:
      "Day 3 concludes with discussions on inclusive design, cultural preservation, and future frontiers.",
    sessions: [
      {
        id: "d3-evt-01",
        time: "09:00 AM – 10:00 AM",
        startTime: "09:00 AM",
        endTime: "10:00 AM",
        duration: "60 min",
        tag: "Welcome & Check-in",
        category: "networking",
        sessionBlock: "Morning",
        threadChapter: "Day 03 · Welcome",
        title: "Welcome & Finale Registration",
        location: "Auditorium Main Concourse",
        description:
          "Closing day check-in, specialty artisanal coffee, and morning greetings as delegates gather for the final conference sequence.",
        abstract:
          "Welcome to the concluding day of TEDx BPHC 2026. Gather in the foyer for morning coffee, delegate reflections, and opening remarks.",
        isExpandable: true,
      },
      {
        id: "d3-evt-02",
        time: "10:00 AM – 11:00 AM",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        duration: "60 min",
        tag: "Keynote Talk",
        category: "keynote",
        sessionBlock: "Morning",
        threadChapter: "Day 03 · Session 01",
        title: "Speaker 1",
        talkTitle: "Beyond Machine Perception",
        speaker: {
          name: "Speaker 13",
          role: "Principal AI Scientist",
          company: "DeepTech Research Labs",
          bio: "Researching neural architectures for assistive robotics and human-agent co-adaptation in unstructured environments.",
        },
        location: "Main Auditorium Stage",
        description:
          "A deep dive into how embodied intelligence learns spatial intuition through tactile and auditory feedback.",
        abstract:
          "Moving beyond computer vision into embodied physical intuition: how robots learn to care, assist, and cooperate safely alongside humans.",
        isExpandable: true,
      },
      {
        id: "d3-evt-03",
        time: "11:00 AM – 12:00 PM",
        startTime: "11:00 AM",
        endTime: "12:00 PM",
        duration: "60 min",
        tag: "Keynote Talk",
        category: "keynote",
        sessionBlock: "Morning",
        threadChapter: "Day 03 · Session 02",
        title: "Speaker 2",
        talkTitle: "Echoes in Stone and Story",
        speaker: {
          name: "Speaker 14",
          role: "Curator & Visual Artist",
          company: "Heritage & Living Archives",
          bio: "Documenting endangered oral traditions and vernacular architectural monuments across South Asia.",
        },
        location: "Main Auditorium Stage",
        description:
          "Preserving cultural memory, oral traditions, and craftsmanship against the onslaught of algorithmic homogenization.",
        abstract:
          "An exploration into preserving cultural memory: why indigenous folklore, vernacular craft, and living history are critical anchors for future societies.",
        isExpandable: true,
      },
      {
        id: "d3-evt-04",
        time: "12:00 PM – 01:00 PM",
        startTime: "12:00 PM",
        endTime: "01:00 PM",
        duration: "60 min",
        tag: "Keynote Talk",
        category: "keynote",
        sessionBlock: "Midday",
        threadChapter: "Day 03 · Session 03",
        title: "Speaker 3",
        talkTitle: "Design That Belongs to Everyone",
        speaker: {
          name: "Speaker 15",
          role: "Principal Product Designer",
          company: "Studio Inclusive",
          bio: "Leading inclusive industrial and digital product design for global assistive hardware initiatives.",
        },
        location: "Main Auditorium Stage",
        description:
          "Why designing for extreme human edge cases consistently unlocks the most intuitive breakthroughs for mainstream products.",
        abstract:
          "Designing with radical accessibility: how products built for marginalized users consistently spark universal innovations that improve life for everyone.",
        isExpandable: true,
      },
      {
        id: "d3-evt-05",
        time: "01:00 PM – 02:30 PM",
        startTime: "01:00 PM",
        endTime: "02:30 PM",
        duration: "90 min",
        tag: "Lunch Break",
        category: "break",
        sessionBlock: "Afternoon",
        threadChapter: "Day 03 · Intermission",
        title: "Lunch Break & Networking",
        location: "Student Activity Centre Lawns",
        description:
          "Festive farewell luncheon spread, partner exhibition showcases, and collaborative idea exchanges across the lawns.",
        abstract:
          "Enjoy our final celebratory lunch spread. Meet authors, discuss weekend takeaways, and exchange contacts with speakers and peers.",
        isExpandable: true,
      },
      {
        id: "d3-evt-06",
        time: "02:30 PM – 03:30 PM",
        startTime: "02:30 PM",
        endTime: "03:30 PM",
        duration: "60 min",
        tag: "Keynote Talk",
        category: "keynote",
        sessionBlock: "Afternoon",
        threadChapter: "Day 03 · Session 04",
        title: "Speaker 4",
        talkTitle: "Truth in the Age of Noise",
        speaker: {
          name: "Speaker 16",
          role: "Investigative Journalist & Filmmaker",
          company: "Global Journalism Forum",
          bio: "Covering climate migrations, geopolitical frontiers, and investigative narrative storytelling across global regions.",
        },
        location: "Main Auditorium Stage",
        description:
          "Reporting authentic human stories and verifying truth amid the avalanche of synthetic media and algorithmic disinformation.",
        abstract:
          "Behind the lens of high-stakes investigative reporting: methods for uncovering genuine human truth when algorithms incentivize outrage.",
        isExpandable: true,
      },
      {
        id: "d3-evt-07",
        time: "03:30 PM – 04:30 PM",
        startTime: "03:30 PM",
        endTime: "04:30 PM",
        duration: "60 min",
        tag: "Keynote Talk",
        category: "keynote",
        sessionBlock: "Afternoon",
        threadChapter: "Day 03 · Session 05",
        title: "Speaker 5",
        talkTitle: "The Illusion of the Present",
        speaker: {
          name: "Speaker 17",
          role: "Cognitive Philosopher & Time Theorist",
          company: "Chronos Philosophy Review",
          bio: "Investigating the phenomenology of subjective temporal perception, quantum entanglement, and human decision architectures across cosmic timelines.",
        },
        location: "Main Auditorium Stage",
        description:
          "Synthesizing the conference themes into an inquiry of physics and consciousness — why every electron in our bodies has a cosmic counterpart.",
        abstract:
          "A captivating journey through theoretical physics, human perception, and philosophical inquiry into why the present moment is our greatest creative lever.",
        isExpandable: true,
      },
      {
        id: "d3-evt-08",
        time: "04:30 PM – 05:30 PM",
        startTime: "04:30 PM",
        endTime: "05:30 PM",
        duration: "60 min",
        tag: "Keynote & Finale",
        category: "keynote",
        sessionBlock: "Evening",
        threadChapter: "Day 03 · Session 06",
        title: "Speaker 6",
        talkTitle: "Grand Valedictory & Closing Reflections",
        speaker: {
          name: "TEDx BPHC Organizing Board",
          role: "Curatorial Leads & Organizing Committee",
          company: "BITS Pilani Hyderabad Campus",
          bio: "Honoring speakers, presenting mementos, celebrating the student organizing committee, and previewing the year-round community network.",
        },
        location: "Main Auditorium Stage",
        description:
          "Curatorial epilogue, memento presentation, volunteer team curtain call, and closing reflections celebrating 3 unforgettable days of ideas.",
        abstract:
          "The grand finale: closing address, felicitation ceremony for speakers, recognition of the student organizing team, and official conclusion of TEDx BPHC 2026.",
        isExpandable: true,
      },
    ],
  },
];

// ============================================================================
// Dynamic Floating Controller Pill
// ============================================================================

const DynamicNav = ({
  days,
  activeIndex,
  progress,
  onSelectDay,
}: {
  days: ScheduleDay[];
  activeIndex: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  onSelectDay: (index: number) => void;
}) => {
  const smoothProgress = useSpring(progress, { stiffness: 100, damping: 30 });
  const activeDay = days[activeIndex] || days[0];

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 rounded-full bg-white/95 backdrop-blur-xl border border-black/15 p-2 pl-6 pr-2 text-black shadow-lg"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-widest text-[#eb0028] font-mono font-bold">
          {activeDay.dayNumber}
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="text-xs font-bold text-neutral-900 min-w-[110px] max-w-[180px] truncate"
          >
            {activeDay.dayOfWeek}, {activeDay.date}
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
          onClick={() => onSelectDay((activeIndex + 1) % days.length)}
          className="absolute inset-0 flex items-center justify-center text-black hover:text-[#eb0028] transition-colors cursor-pointer"
          title="Jump to next day"
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

  // All 3 days start expanded for effortless exploration
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({
    "01": true,
    "02": true,
    "03": true,
  });

  const toggleDay = (id: string) => {
    setExpandedDays((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleAll = () => {
    const allExpanded = Object.values(expandedDays).every(Boolean);
    setExpandedDays({
      "01": !allExpanded,
      "02": !allExpanded,
      "03": !allExpanded,
    });
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track active day as the user scrolls
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const newIndex = Math.min(
        Math.floor(latest * scheduleDays.length),
        scheduleDays.length - 1
      );
      setActiveIndex(newIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToDay = (index: number) => {
    const targetDay = scheduleDays[index];
    if (!targetDay) return;
    const element = document.getElementById(`day-${targetDay.id}`);
    if (element) {
      setExpandedDays((prev) => ({ ...prev, [targetDay.id]: true }));
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const allExpanded = Object.values(expandedDays).every(Boolean);

  return (
    <div
      ref={containerRef}
      style={{ zoom: 0.8 }}
      className="zoom-80 min-h-screen bg-transparent text-neutral-900 selection:bg-[#E62B1E] selection:text-white pb-32 font-sans relative overflow-hidden"
    >
      <div className="relative z-10">
        {/* =========================================================================
            1. EDITORIAL HEADER (NO STRINGS ANIMATION)
            ========================================================================= */}
        <header className="pt-40 pb-16 px-6 md:px-12 border-b border-black/10 max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Red Accent Line & Eyebrow Badge */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-[#eb0028]" />
              <span className="text-zinc-700 font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold">
                TEDx BITS Hyderabad • Event Itinerary
              </span>
            </div>

            {/* Headline */}
            <div className="mb-8">
              <h1 className="text-6xl sm:text-7xl md:text-[110px] font-bold tracking-tighter leading-[0.9] select-none text-neutral-900">
                Event <br />
                <span className="font-sans font-bold text-zinc-600">schedule.</span>
              </h1>
            </div>

            {/* Subtitle & Metadata */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <p className="max-w-2xl text-zinc-800 text-lg md:text-xl font-normal leading-relaxed">
                A 3-day journey from the first spark to the final ripple — follow the chronological sequence of conversations shaping what comes next.
              </p>
              <div className="flex items-center gap-4 font-mono text-xs text-zinc-700 font-medium shrink-0">
                <span>13 – 15 Nov 2026</span>
                <span>•</span>
                <span>Auditorium, BPHC</span>
                <span>•</span>
                <span className="text-[#eb0028] font-bold">3-Day Flagship</span>
              </div>
            </div>
          </motion.div>
        </header>

        {/* =========================================================================
            2. SECTION CONTROL BAR (DAY SELECTOR & EXPAND ALL)
            ========================================================================= */}
        <section className="max-w-[1600px] mx-auto px-6 md:px-12 pt-8 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-black/10">
            {/* Day Selector Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {scheduleDays.map((day, idx) => (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => scrollToDay(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeIndex === idx
                      ? "bg-[#eb0028] text-white font-bold shadow-sm"
                      : "bg-black/5 text-zinc-700 hover:bg-black/10 font-semibold"
                  }`}
                >
                  {day.dayNumber} · {day.date.split(" ")[0]} {day.date.split(" ")[1]}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-700 font-semibold">
                <Sparkles size={14} className="text-[#eb0028]" />
                <span>3 Days · 24 Milestones</span>
              </div>

              <button
                type="button"
                onClick={toggleAll}
                className="cursor-pointer text-xs font-mono font-bold uppercase tracking-wider text-[#eb0028] hover:text-black transition-colors"
              >
                {allExpanded ? "Collapse All Days" : "Expand All Days"}
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. 3-DAY SCHEDULE CHAPTERS
            ========================================================================= */}
        <main className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
          <div className="space-y-32">
            {scheduleDays.map((day) => {
              const isExpanded = expandedDays[day.id] || false;

              return (
                <section
                  key={day.id}
                  id={`day-${day.id}`}
                  className="scroll-mt-32"
                >
                  <motion.div
                    variants={textContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-8"
                  >
                    {/* Header Accent Line & Date Label */}
                    <motion.div variants={fadeIn} className="flex items-center gap-4">
                      <div className="h-[1px] w-10 bg-[#eb0028]" />
                      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#eb0028] font-mono">
                        {day.dayOfWeek} · {day.date}
                      </span>
                    </motion.div>

                    {/* Clean Day Heading */}
                    <div className="overflow-hidden py-1">
                      <motion.h2
                        variants={textReveal}
                        className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-neutral-900 leading-[0.95]"
                      >
                        {day.dayNumber}
                      </motion.h2>
                    </div>

                    {/* One-Liner Sentence about the Event at the starting of days */}
                    <motion.div
                      variants={fadeIn}
                      className="max-w-3xl bg-white/80 backdrop-blur-md border border-black/10 rounded-2xl p-6 sm:p-8 border-l-4 border-l-[#eb0028] space-y-3 shadow-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-700 font-medium pb-2 border-b border-black/5">
                        <span className="font-bold text-neutral-900 uppercase tracking-widest">{day.dayNumber} Focus</span>
                        <span>09:00 AM – 05:30 PM · 8 Milestones</span>
                      </div>
                      <p className="text-base sm:text-lg text-zinc-900 font-medium leading-relaxed">
                        {day.oneLiner}
                      </p>
                    </motion.div>

                    {/* Expand / Explore Sessions Button */}
                    <motion.div variants={fadeIn} className="pt-2">
                      <button
                        type="button"
                        onClick={() => toggleDay(day.id)}
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
                          {isExpanded ? `Collapse ${day.dayNumber} Timeline` : `Explore ${day.dayNumber} Sessions`}
                        </span>
                        <span className="text-xs font-mono text-zinc-600 font-medium">
                          ({day.sessions.length} milestones)
                        </span>
                      </button>
                    </motion.div>

                    {/* Expanded Timeline Section */}
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
                            <Timeline events={day.sessions} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </section>
              );
            })}
          </div>

          {/* Terminal Node */}
          <div className="mt-28 pt-8 border-t border-black/10 flex items-center gap-3 font-mono text-xs text-zinc-700 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#eb0028]" />
            <span>End of 3-Day Flagship Programme · Sundowner continues on Guest House Lawn</span>
          </div>
        </main>

        {/* =========================================================================
            4. FLOATING DYNAMIC CONTROLLER PILL
            ========================================================================= */}
        <DynamicNav
          days={scheduleDays}
          activeIndex={activeIndex}
          progress={scrollYProgress}
          onSelectDay={scrollToDay}
        />

        {/* =========================================================================
            5. BOTTOM CTA BANNER
            ========================================================================= */}
        <section className="mt-32 max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="border border-black/10 bg-white/70 backdrop-blur-md p-8 md:p-14 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#eb0028] font-bold block mb-2">
                Join The Experience
              </span>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-black mb-3">
                Be there across all 3 days.
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
