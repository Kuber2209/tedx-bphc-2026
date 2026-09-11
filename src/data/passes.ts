import { PassTier } from "./types";

export const passTiers: PassTier[] = [
  {
    id: "school-student",
    name: "School Student Pass",
    badge: "Grades 9–12",
    targetAudience: "School Students",
    description:
      "Curated for aspiring young thinkers, school innovators, and curious high schoolers exploring big ideas.",
    price: "TBA",
    eligibility: "Valid School ID card or institutional proof (Grades 9–12)",
    benefits: [
      "Access to all speaker talks & creative performances",
      "Official TEDx BPHC youth delegate kit & lanyard badge",
      "Interactive Q&A & youth discussion breakouts",
      "Lunch & high-tea refreshments during session breaks",
      "Official Certificate of Participation",
    ],
    available: false,
    highlight: false,
    registrationUrl: "#",
  },
  {
    id: "bits-internal",
    name: "BITSian Pass",
    badge: "In-House Campus Tier",
    targetAudience: "BITS BPHC Students, Faculty & Staff",
    description:
      "Exclusive access tier for the on-campus BITS Pilani Hyderabad community to experience the flagship edition.",
    price: "TBA",
    eligibility: "Valid BITS BPHC ID card or official BITS email verification",
    benefits: [
      "Full access to the main auditorium for all keynote sessions",
      "Exclusive BPHC edition delegate kit & attendee credentials",
      "Catered networking luncheon & refreshments",
      "Priority seating in the dedicated campus community section",
      "Direct entry to the post-conference campus community mixer",
    ],
    available: false,
    highlight: true,
    registrationUrl: "#",
  },
  {
    id: "external-guest",
    name: "External Guest Pass",
    badge: "General Delegate",
    targetAudience: "Outside Guests & Professionals",
    description:
      "Open to university students, working professionals, founders, and delegates joining us from outside BITS.",
    price: "TBA",
    eligibility: "Open to general public, researchers, alumni & industry guests",
    benefits: [
      "Full-day pass to all keynote talks, panel discussions & performances",
      "Premium TEDx conference gift bag, merchandise & official badge",
      "Campus visitor vehicle entry permit & reserved parking clearance",
      "Executive networking lunch & refreshments with speakers and partners",
      "Dedicated seating in the general delegate bowl",
      "Invitation to the evening networking mixer",
    ],
    available: false,
    highlight: false,
    registrationUrl: "#",
  },
];

export const passGuidelines = [
  {
    title: "ID Verification",
    description:
      "Physical photo ID along with category verification (School ID, BITS ID, or Government Photo ID for External Guests) is strictly mandatory at the campus security gate and auditorium registration counter.",
  },
  {
    title: "Group & Delegation Bookings",
    description:
      "Schools bringing student contingents (10+ students) or external university delegations can request coordinated group registrations with designated seating.",
  },
  {
    title: "All-Inclusive Access",
    description:
      "All pass tiers include full-day access to all scheduled sessions, official delegate kits, catered refreshments, and lunch on event day.",
  },
];
