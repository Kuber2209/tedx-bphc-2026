/**
 * ============================================================================
 * TEDx BPHC 2026 — SINGLE-DAY SCHEDULE CONFIGURATION
 * Theme: "Invisible Threads"
 * ============================================================================
 */

export interface ScheduleMeta {
  eventName: string;
  edition: string;
  date: string;
  dateStatus: string;
  dayScheduleType: string;
  venueName: string;
  venueLocation: string;
  city: string;
  theme: string;
  subtitle: string;
  speakerCountNote: string;
  calendarDateISO?: string;
}

export type ScheduleItemType =
  | "registration"
  | "talk"
  | "performance"
  | "break"
  | "lunch"
  | "networking"
  | "ceremony";

export interface ScheduleItem {
  id: string;
  time: string;
  endTime?: string;
  sessionBlock: "morning" | "intermission" | "afternoon" | "evening";
  sessionLabel: string;
  title: string;
  speakerNumber?: number;
  speakerName?: string;
  speakerRole?: string;
  talkTitle?: string;
  description?: string;
  location?: string;
  type: ScheduleItemType;
  duration?: string;
  isSpeakerTalk?: boolean;
  topicTag?: string;
}

export interface SessionBlockOverview {
  id: "morning" | "intermission" | "afternoon" | "evening";
  name: string;
  threadChapter: string;
  timeRange: string;
  tagline: string;
}

// ---------------------------------------------------------------------------
// 1. THEME MANIFESTO & PILLARS
// ---------------------------------------------------------------------------
export const themeStory = {
  title: "Invisible Threads",
  concept: "The unseen connections that quietly shape our lives.",
  narrative:
    "The theme of this year’s event is “Invisible Threads.” It explores the unseen connections that quietly shape our lives, from the people and experiences that influence who we become to the systems, ideas, choices, and circumstances that connect us in ways we rarely notice. Some threads are personal, like a mentor’s advice that stays with us for years; others are societal, linking technology, culture, communities, and even seemingly unrelated ideas. These connections may be invisible, but their effects are not. Invisible Threads invites us to look beyond what is immediately visible, uncover the relationships that hold our world together, and recognize how one idea, person, or moment can create ripples far beyond where it started.",
  pillars: [
    {
      id: "personal",
      number: "01",
      title: "Personal Threads",
      tagline: "The quiet catalysts of who we become",
      description:
        "A mentor’s advice that echoes across decades, a chance conversation in a hallway, or an unheralded personal inflection point that redirected an entire destiny.",
    },
    {
      id: "societal",
      number: "02",
      title: "Societal Webs",
      tagline: "The fabric of communities & shared memory",
      description:
        "The cultural tapestries, civic trust, and collective traditions that silently weave disparate people into unified communities.",
    },
    {
      id: "technological",
      number: "03",
      title: "Technological Synapses",
      tagline: "Ambient architecture & systemic intelligence",
      description:
        "The invisible lines of code, networks, and ecological feedback loops connecting humanity in ways earlier generations could never fathom.",
    },
    {
      id: "ripples",
      number: "04",
      title: "The Ripple Effect",
      tagline: "How one spark reshapes the whole",
      description:
        "Recognizing that no idea exists in a silo. One bold thesis, one compassionate gesture, or one artistic leap creates reverberations far beyond where it began.",
    },
  ],
};

// ---------------------------------------------------------------------------
// 2. EVENT METADATA
// ---------------------------------------------------------------------------
export const scheduleMeta: ScheduleMeta = {
  eventName: "TEDx BPHC",
  edition: "12th Edition",
  date: "14 November 2026",
  dateStatus: "12th Edition • 1-Day Flagship Conference",
  dayScheduleType: "Full Single-Day Conference Program",
  venueName: "Auditorium",
  venueLocation: "BITS Pilani Hyderabad Campus",
  city: "Hyderabad, India",
  theme: "Invisible Threads",
  subtitle:
    "A single-day curated convergence uncovering the hidden connections that quietly shape our lives, our technology, and our collective tomorrow.",
  speakerCountNote: "6 Visionary Speakers",
  calendarDateISO: "2026-11-14",
};

// ---------------------------------------------------------------------------
// 3. SESSION BLOCKS OVERVIEW
// ---------------------------------------------------------------------------
export const sessionBlocks: SessionBlockOverview[] = [
  {
    id: "morning",
    name: "Session 1: The Spark & Foundations",
    threadChapter: "Thread I · Personal Catalysts",
    timeRange: "09:00 AM – 12:15 PM",
    tagline: "Arrival, ceremonial welcome, and the first wave of talks on the quiet forces that shape human potential.",
  },
  {
    id: "intermission",
    name: "Midday Confluence & Social",
    threadChapter: "Thread II · Communal Exchange",
    timeRange: "12:15 PM – 01:45 PM",
    tagline: "Curated networking lunch, interactive idea installations, and dialogue across disciplines.",
  },
  {
    id: "afternoon",
    name: "Session 2: Resonance & Expanding Ripples",
    threadChapter: "Thread III · Societal & Technological Webs",
    timeRange: "01:45 PM – 03:45 PM",
    tagline: "Artistic interlude, second wave of talks investigating ambient systems, cultural memory, and cosmic scales.",
  },
  {
    id: "evening",
    name: "Concluding Ceremony & High Tea",
    threadChapter: "Thread IV · The Tapestry",
    timeRange: "03:45 PM – 05:30 PM",
    tagline: "Valedictory reflections, speaker felicitations, and an open sundowner mixer on the campus lawns.",
  },
];

// ---------------------------------------------------------------------------
// 4. TIMELINE SCHEDULE ITEMS
// ---------------------------------------------------------------------------
export const scheduleTimeline: ScheduleItem[] = [
  // --- MORNING ---
  {
    id: "item-01",
    time: "09:00 AM",
    endTime: "10:00 AM",
    sessionBlock: "morning",
    sessionLabel: "Arrival & Check-in",
    title: "Registration Opens & Filter Coffee Morning",
    description: "Badge collection, attendee kit distribution, and freshly brewed South Indian filter coffee accompanied by ambient acoustic soundscapes in the auditorium foyer.",
    location: "Auditorium Main Concourse",
    type: "registration",
    duration: "60 min",
    isSpeakerTalk: false,
    topicTag: "Welcome",
  },
  {
    id: "item-02",
    time: "10:00 AM",
    endTime: "10:20 AM",
    sessionBlock: "morning",
    sessionLabel: "Inauguration",
    title: "Curatorial Prologue: Weaving Invisible Threads",
    description: "Lighting of the lamp, ceremonial opening remarks, and an evocative prologue introducing the 2026 theme — exploring how unseen relationships hold our world together.",
    location: "Main Auditorium Stage",
    type: "ceremony",
    duration: "20 min",
    isSpeakerTalk: false,
    topicTag: "Theme Reveal",
  },

  // --- SPEAKER TALK 1 ---
  {
    id: "item-03",
    time: "10:20 AM",
    endTime: "10:40 AM",
    sessionBlock: "morning",
    sessionLabel: "Session 1: Morning Talks",
    title: "Keynote Talk 01",
    speakerNumber: 1,
    speakerName: "Speaker 1",
    speakerRole: "DeepTech Pioneer & Systems Architect",
    talkTitle: "The Invisible Architecture of Ambient Intelligence",
    description: "An inquiry into how decentralized networks, ambient computation, and subtle data streams are quietly rewriting the fabric of human cities without our conscious realization.",
    location: "Main Auditorium Stage",
    type: "talk",
    duration: "18 min",
    isSpeakerTalk: true,
    topicTag: "Technology",
  },

  // --- SPEAKER TALK 2 ---
  {
    id: "item-04",
    time: "10:45 AM",
    endTime: "11:05 AM",
    sessionBlock: "morning",
    sessionLabel: "Session 1: Morning Talks",
    title: "Keynote Talk 02",
    speakerNumber: 2,
    speakerName: "Speaker 2",
    speakerRole: "Ecological Biologist & Climate Strategist",
    talkTitle: "Nature's Original Web: The Mycelial Lesson",
    description: "How ancient fungal networks beneath forest floors mirror human sociological networks — and why understanding symbiotic resource-sharing can resolve modern climate paralysis.",
    location: "Main Auditorium Stage",
    type: "talk",
    duration: "18 min",
    isSpeakerTalk: true,
    topicTag: "Science & Nature",
  },

  // --- SPEAKER TALK 3 ---
  {
    id: "item-05",
    time: "11:10 AM",
    endTime: "11:30 AM",
    sessionBlock: "morning",
    sessionLabel: "Session 1: Morning Talks",
    title: "Keynote Talk 03",
    speakerNumber: 3,
    speakerName: "Speaker 3",
    speakerRole: "Cultural Anthropologist & Storyteller",
    talkTitle: "Oral Threads: Preserving Wisdom in an Age of Oblivion",
    description: "Why the fleeting words of our elders and centuries-old oral narratives provide the psychological ballast modern civilization desperately needs amidst algorithmic noise.",
    location: "Main Auditorium Stage",
    type: "talk",
    duration: "18 min",
    isSpeakerTalk: true,
    topicTag: "Culture & Humanity",
  },

  // --- MORNING INTERMISSION ---
  {
    id: "item-06",
    time: "11:30 AM",
    endTime: "12:15 PM",
    sessionBlock: "morning",
    sessionLabel: "Intermission",
    title: "Interactive Pavilion & Artisanal Tea Break",
    description: "Explore student robotics prototypes, kinetic thread art installations, and artisanal teas in the sunlit open-air courtyard.",
    location: "Exhibition Courtyard & Lawn",
    type: "break",
    duration: "45 min",
    isSpeakerTalk: false,
    topicTag: "Exhibition",
  },

  // --- LUNCH ---
  {
    id: "item-07",
    time: "12:15 PM",
    endTime: "01:45 PM",
    sessionBlock: "intermission",
    sessionLabel: "Midday Confluence",
    title: "Curated Networking Lunch & Lawn Exchange",
    description: "A farm-to-table lunch served on the shaded university lawns. Unscripted conversations, meeting fellow attendees, and connecting directly with morning speakers.",
    location: "Dining Pavilion & Gardens",
    type: "lunch",
    duration: "90 min",
    isSpeakerTalk: false,
    topicTag: "Lunch & Social",
  },

  // --- PERFORMANCE ---
  {
    id: "item-08",
    time: "01:45 PM",
    endTime: "02:05 PM",
    sessionBlock: "afternoon",
    sessionLabel: "Session 2: Afternoon Talks",
    title: "Artistic Interlude: Resonance in Fret & Wire",
    speakerName: "Contemporary Fusion Collective",
    speakerRole: "Experimental Instrumentalist Duo",
    talkTitle: "Acoustic Convergence",
    description: "A captivating musical piece embodying the 'Invisible Threads' theme through live sitar, cello, and responsive modular synthesizer tones.",
    location: "Main Auditorium Stage",
    type: "performance",
    duration: "20 min",
    isSpeakerTalk: false,
    topicTag: "Performance",
  },

  // --- SPEAKER TALK 4 ---
  {
    id: "item-09",
    time: "02:05 PM",
    endTime: "02:25 PM",
    sessionBlock: "afternoon",
    sessionLabel: "Session 2: Afternoon Talks",
    title: "Keynote Talk 04",
    speakerNumber: 4,
    speakerName: "Speaker 4",
    speakerRole: "Aerospace Engineer & Satellite Designer",
    talkTitle: "Constellations Above: Connecting Earth from Orbit",
    description: "How ultra-compact orbital satellites form an unseen protective mesh around Earth, monitoring micro-climate shifts and connecting remote communities.",
    location: "Main Auditorium Stage",
    type: "talk",
    duration: "18 min",
    isSpeakerTalk: true,
    topicTag: "Aerospace",
  },

  // --- SPEAKER TALK 5 ---
  {
    id: "item-10",
    time: "02:30 PM",
    endTime: "02:50 PM",
    sessionBlock: "afternoon",
    sessionLabel: "Session 2: Afternoon Talks",
    title: "Keynote Talk 05",
    speakerNumber: 5,
    speakerName: "Speaker 5",
    speakerRole: "Behavioral Economist & Social Theorist",
    talkTitle: "The Currency of Unspoken Trust",
    description: "An empirical look at why informal social networks, handshake agreements, and communal reciprocity power economies far more robustly than fiat contracts.",
    location: "Main Auditorium Stage",
    type: "talk",
    duration: "18 min",
    isSpeakerTalk: true,
    topicTag: "Economics",
  },

  // --- SPEAKER TALK 6 ---
  {
    id: "item-11",
    time: "02:55 PM",
    endTime: "03:15 PM",
    sessionBlock: "afternoon",
    sessionLabel: "Session 2: Afternoon Talks",
    title: "Keynote Talk 06",
    speakerNumber: 6,
    speakerName: "Speaker 6",
    speakerRole: "Universal Designer & Accessibility Pioneer",
    talkTitle: "Designing at the Margins to Weave the Center",
    description: "Why designing for extreme human constraints always leads to breakthroughs that benefit the entire human species — from the curb-cut effect to modern voice interfaces.",
    location: "Main Auditorium Stage",
    type: "talk",
    duration: "18 min",
    isSpeakerTalk: true,
    topicTag: "Design",
  },

  // --- AFTERNOON TEA ---
  {
    id: "item-12",
    time: "03:15 PM",
    endTime: "03:45 PM",
    sessionBlock: "afternoon",
    sessionLabel: "Intermission",
    title: "Afternoon Chai & Collaborative Thread Wall",
    description: "Warm chai, snacks, and a large physical tapestry where every attendee ties a colored thread representing an idea, person, or moment that changed their life.",
    location: "Auditorium Concourse",
    type: "break",
    duration: "30 min",
    isSpeakerTalk: false,
    topicTag: "Interactive Wall",
  },

  // --- CLOSING CEREMONY ---
  {
    id: "item-13",
    time: "03:45 PM",
    endTime: "04:30 PM",
    sessionBlock: "evening",
    sessionLabel: "Finale",
    title: "Valedictory Reflections, Felicitations & Delegation Photo",
    description: "Curatorial closing address, honoring speakers and team members, and the official 12th Edition delegation group photograph on the stage steps.",
    location: "Main Auditorium Stage",
    type: "ceremony",
    duration: "45 min",
    isSpeakerTalk: false,
    topicTag: "Ceremony",
  },

  // --- NETWORKING MIXER ---
  {
    id: "item-14",
    time: "04:30 PM",
    endTime: "05:30 PM",
    sessionBlock: "evening",
    sessionLabel: "Sundowner",
    title: "High Tea Sundowner & Post-Event Mixer",
    description: "Evening refreshments, dessert tables, live ambient music, and open-ended networking under the campus twilight sky.",
    location: "Guest House Lawns",
    type: "networking",
    duration: "60 min",
    isSpeakerTalk: false,
    topicTag: "Sundowner",
  },
];

export const totalSpeakerCount = scheduleTimeline.filter((i) => i.isSpeakerTalk).length;

export const scheduleDays = [
  {
    id: "day-1",
    dayNumber: 1,
    dayCode: "DAY 1" as const,
    label: "Main Conference",
    date: scheduleMeta.date,
    venueName: scheduleMeta.venueName,
    tagline: scheduleMeta.subtitle,
    summary: scheduleMeta.subtitle,
    items: scheduleTimeline,
  },
];
