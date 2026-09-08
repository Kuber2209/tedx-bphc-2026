/**
 * ============================================================================
 * TEDx BPHC 2026 — SINGLE-DAY SCHEDULE CONFIGURATION
 * ============================================================================
 * 
 * QUICK EDIT GUIDE FOR ORGANIZERS:
 * ----------------------------------------------------------------------------
 * 1. EVENT DATE & VENUE:
 *    Update `scheduleMeta` below (e.g. date: "1X November 2026", venue, etc.).
 * 
 * 2. TIMINGS & TALKS:
 *    Edit `scheduleItems` below.
 *    - To change a time, edit `time: "10:20 AM"` and `endTime: "10:40 AM"`.
 *    - To assign a speaker, edit `speakerName`, `speakerRole`, and `talkTitle`.
 *    - Flagship talks (5–6 speakers) have `isSpeakerTalk: true`.
 *    - To add or remove an item, simply copy/paste or delete a block.
 * ============================================================================
 */

export interface ScheduleMeta {
  eventName: string;
  edition: string;
  date: string;              // e.g. "1X November 2026"
  dateStatus: string;        // e.g. "Exact date TBA • 1-Day Flagship Conference"
  dayScheduleType: string;
  venueName: string;
  venueLocation: string;
  city: string;
  theme: string;
  subtitle: string;
  speakerCountNote: string;  // e.g. "5–6 Keynote Speakers"
  calendarDateISO?: string;  // Approximate date for calendar links (e.g. "2026-11-15")
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
  time: string;               // Display start time (e.g. "09:00 AM")
  endTime?: string;           // Display end time (e.g. "10:00 AM")
  sessionBlock: "morning" | "intermission" | "afternoon" | "evening";
  sessionLabel: string;       // e.g. "Session 1: Morning Keynotes"
  title: string;              // Event title or talk title
  speakerNumber?: number;     // 1 to 6 (for the 5-6 keynote speakers)
  speakerName?: string;       // Speaker full name (or "Speaker 1 TBA")
  speakerRole?: string;       // e.g. "Innovator & DeepTech Researcher"
  talkTitle?: string;         // Dedicated talk title
  description?: string;       // Talk synopsis or activity description
  location?: string;          // e.g. "Main Auditorium Bowl", "Foyer & Lawn"
  type: ScheduleItemType;
  duration?: string;          // e.g. "18 min", "45 min"
  isSpeakerTalk?: boolean;    // true for the 5-6 main speaker talks
  topicTag?: string;          // e.g. "Technology", "Design", "Science"
}

// ---------------------------------------------------------------------------
// 1. EVENT METADATA (Edit your event details here)
// ---------------------------------------------------------------------------
export const scheduleMeta: ScheduleMeta = {
  eventName: "TEDx BPHC",
  edition: "2026 Edition",
  date: "1X November 2026",
  dateStatus: "Official date to be finalized soon • 1-Day Flagship Conference",
  dayScheduleType: "Single-Day Conference Program",
  venueName: "Main University Auditorium",
  venueLocation: "BITS Pilani Hyderabad Campus",
  city: "Hyderabad, India",
  theme: "Take The Leap",
  subtitle: "A curated single-day gathering bringing together 5–6 visionary speakers, multidisciplinary dialogues, and interactive campus showcases.",
  speakerCountNote: "5–6 Visionary Speakers",
  calendarDateISO: "2026-11-14",
};

// ---------------------------------------------------------------------------
// 2. SESSION BLOCKS OVERVIEW (For the Middlebury-style Program Sheet)
// ---------------------------------------------------------------------------
export interface SessionBlockOverview {
  id: "morning" | "intermission" | "afternoon" | "evening";
  name: string;
  timeRange: string;
  tagline: string;
}

export const sessionBlocks: SessionBlockOverview[] = [
  {
    id: "morning",
    name: "Session 1: Awakening & Foundations",
    timeRange: "09:00 AM – 12:15 PM",
    tagline: "Registration, inaugural addresses, and the first block of keynote talks.",
  },
  {
    id: "intermission",
    name: "Midday Intermission & Social",
    timeRange: "12:15 PM – 01:45 PM",
    tagline: "Curated networking lunch, interactive student exhibits, and outdoor dialogue.",
  },
  {
    id: "afternoon",
    name: "Session 2: Horizons & Human Potential",
    timeRange: "01:45 PM – 03:45 PM",
    tagline: "Live performance, second block of keynote talks, and forward-looking ideas.",
  },
  {
    id: "evening",
    name: "Concluding Ceremony & High Tea",
    timeRange: "03:45 PM – 05:30 PM",
    tagline: "Valedictory address, speaker felicitation, and post-conference mixer.",
  },
];

// ---------------------------------------------------------------------------
// 3. SINGLE-DAY SCHEDULE TIMELINE (Edit your timings & talks here)
// ---------------------------------------------------------------------------
export const scheduleTimeline: ScheduleItem[] = [
  // --- MORNING: REGISTRATION & OPENING ---
  {
    id: "item-01",
    time: "09:00 AM",
    endTime: "10:00 AM",
    sessionBlock: "morning",
    sessionLabel: "Arrival & Check-in",
    title: "Registration Opens & Morning Brew",
    description: "Badge pick-up, attendee kit collection, and freshly brewed South Indian filter coffee with ambient soundscapes in the foyer.",
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
    title: "Curatorial Welcome & Theme Reveal",
    description: "Lighting of the lamp, curatorial prologue introducing the 2026 theme, and opening remarks by the organizing team.",
    location: "Main Auditorium Stage",
    type: "ceremony",
    duration: "20 min",
    isSpeakerTalk: false,
    topicTag: "Inaugural",
  },

  // --- SPEAKER TALK 1 ---
  {
    id: "item-03",
    time: "10:20 AM",
    endTime: "10:40 AM",
    sessionBlock: "morning",
    sessionLabel: "Session 1: Morning Talks",
    title: "Speaker Talk 01",
    speakerNumber: 1,
    speakerName: "Speaker 1 (To Be Announced)",
    speakerRole: "DeepTech Pioneer & Systems Architect",
    talkTitle: "The Architecture of Invisible Intelligence",
    description: "An inquiry into how ambient computation and decentralized systems are quietly rewiring the foundations of human cities.",
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
    title: "Speaker Talk 02",
    speakerNumber: 2,
    speakerName: "Speaker 2 (To Be Announced)",
    speakerRole: "Environmental Biologist & Climate Strategist",
    talkTitle: "Regenerating What We Took For Granted",
    description: "Translating biological feedback loops into scalable solutions for ecological resilience and modern biodiversity crises.",
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
    title: "Speaker Talk 03",
    speakerNumber: 3,
    speakerName: "Speaker 3 (To Be Announced)",
    speakerRole: "Cultural Anthropologist & Author",
    talkTitle: "Oral Histories in an Age of Instant Oblivion",
    description: "Why forgotten folk wisdom and indigenous storytelling might hold the key to navigating contemporary mental fractures.",
    location: "Main Auditorium Stage",
    type: "talk",
    duration: "18 min",
    isSpeakerTalk: true,
    topicTag: "Culture & Humanity",
  },

  // --- MORNING REFRESHMENT INTERMISSION ---
  {
    id: "item-06",
    time: "11:30 AM",
    endTime: "12:15 PM",
    sessionBlock: "morning",
    sessionLabel: "Intermission",
    title: "Interactive Pavilion & Tea Intermission",
    description: "Explore student robotics showcases, experiential art installations, and artisanal teas in the shaded outdoor courtyard.",
    location: "Exhibition Foyer & Courtyard",
    type: "break",
    duration: "45 min",
    isSpeakerTalk: false,
    topicTag: "Exhibition",
  },

  // --- COMMUNITY NETWORKING LUNCH ---
  {
    id: "item-07",
    time: "12:15 PM",
    endTime: "01:45 PM",
    sessionBlock: "intermission",
    sessionLabel: "Midday Break",
    title: "Curated Networking Lunch & Marketplace",
    description: "Buffet lunch served in the shaded dining lawn. Engage in informal discussions with speakers, faculty, and fellow attendees.",
    location: "Dining Pavilion & Lawns",
    type: "lunch",
    duration: "90 min",
    isSpeakerTalk: false,
    topicTag: "Lunch & Social",
  },

  // --- PERFORMANCE INTERLUDE ---
  {
    id: "item-08",
    time: "01:45 PM",
    endTime: "02:05 PM",
    sessionBlock: "afternoon",
    sessionLabel: "Session 2: Afternoon Talks",
    title: "Live Artistic & Musical Interlude",
    speakerName: "Student Arts Collective",
    speakerRole: "Classical-Contemporary Fusion Ensemble",
    description: "A rhythmic performance blending traditional percussion with contemporary electronic modular soundscapes.",
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
    title: "Speaker Talk 04",
    speakerNumber: 4,
    speakerName: "Speaker 4 (To Be Announced)",
    speakerRole: "Aerospace Engineer & Satellite Designer",
    talkTitle: "The Democratization of Orbital Space",
    description: "How ultra-compact satellites and low-cost launch vehicles are transforming climate telemetry and telecommunications.",
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
    title: "Speaker Talk 05",
    speakerNumber: 5,
    speakerName: "Speaker 5 (To Be Announced)",
    speakerRole: "Behavioral Economist & Policy Adviser",
    talkTitle: "The Currencies We Don't Measure",
    description: "Rethinking GDP, community trust, and subjective well-being through economic experiments in emerging economies.",
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
    title: "Speaker Talk 06",
    speakerNumber: 6,
    speakerName: "Speaker 6 (To Be Announced)",
    speakerRole: "Industrial Designer & Accessibility Advocate",
    talkTitle: "Designing for the Extremes",
    description: "When you build for people on the cognitive and physical margins, you inadvertently invent the future for everyone.",
    location: "Main Auditorium Stage",
    type: "talk",
    duration: "18 min",
    isSpeakerTalk: true,
    topicTag: "Design & Inclusion",
  },

  // --- AFTERNOON COFFEE & WRAP-UP ---
  {
    id: "item-12",
    time: "03:15 PM",
    endTime: "03:45 PM",
    sessionBlock: "afternoon",
    sessionLabel: "Intermission",
    title: "Afternoon Coffee & Idea Wall",
    description: "Snacks, pour-over coffee, and interactive prompt walls where attendees contribute their personal takeaways.",
    location: "Auditorium Concourse",
    type: "break",
    duration: "30 min",
    isSpeakerTalk: false,
    topicTag: "Coffee Break",
  },

  // --- VALEDICTORY & WRAP UP ---
  {
    id: "item-13",
    time: "03:45 PM",
    endTime: "04:30 PM",
    sessionBlock: "evening",
    sessionLabel: "Closing",
    title: "Valedictory Address, Felicitation & Group Photo",
    description: "Honoring our speakers and partners, volunteer recognition, final curatorial reflections, and the official 2026 delegation photograph.",
    location: "Main Auditorium Stage",
    type: "ceremony",
    duration: "45 min",
    isSpeakerTalk: false,
    topicTag: "Finale",
  },

  // --- NETWORKING MIXER ---
  {
    id: "item-14",
    time: "04:30 PM",
    endTime: "05:30 PM",
    sessionBlock: "evening",
    sessionLabel: "Social Mixer",
    title: "High Tea & Concluding Networking Mixer",
    description: "Evening tea, light bites, music, and freeform conversation with organizers, attendees, and speakers.",
    location: "Campus Guest House Lawn",
    type: "networking",
    duration: "60 min",
    isSpeakerTalk: false,
    topicTag: "Networking",
  },
];

// Helper export: count of keynote speakers
export const totalSpeakerCount = scheduleTimeline.filter((i) => i.isSpeakerTalk).length;

// Backwards-compatibility alias in case another component references scheduleDays
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
