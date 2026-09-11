export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  categoryName: string;
  items: FaqItem[];
}

export const faqData: FaqCategory[] = [
  {
    categoryName: "Ticketing & Registration",
    items: [
      {
        question: "What are the different pass tiers available?",
        answer:
          "TEDx BITS Hyderabad 2026 offers three designated pass tiers: (1) School Student Pass (for high school students in Grades 9–12 with valid school ID), (2) BITSian Pass (exclusive to on-campus BPHC students, faculty, and staff), and (3) External Guest Pass (for university delegates from other institutions, working professionals, founders, and general attendees).",
      },
      {
        question: "How do I purchase tickets for TEDx BPHC 2026?",
        answer:
          "Tickets are available online through our official registration portal. Registrations open in phases with priority access for university students and faculty, followed by general public registration.",
      },
      {
        question: "Can I transfer my ticket to another student or attendee?",
        answer:
          "Ticket transfers are permitted up to 48 hours prior to the conference date. The original ticket holder must submit a transfer request through the registration portal providing the new attendee's official details and identification.",
      },
      {
        question: "What is the refund policy if I am unable to attend?",
        answer:
          "Due to auditorium seating constraints and advance provisioning for attendees, all ticket sales are non-refundable. If you cannot attend, we advise using the official ticket transfer process to reassign your pass.",
      },
      {
        question: "Are group registrations available for student clubs or delegations?",
        answer:
          "Yes, campus student organizations and institutional delegations of 10 or more can apply for group registration. Please contact the delegate relations desk via the contact page for group access coordination.",
      },
    ],
  },
  {
    categoryName: "Event Day Logistics",
    items: [
      {
        question: "What identification is required for campus gate entry and check-in?",
        answer:
          "All attendees must present their digital registration pass (QR code) along with a valid government photo ID. University students must also present their physical student ID card at both the campus entry gate and auditorium check-in desk.",
      },
      {
        question: "Where is the event venue and where can attendees park?",
        answer:
          "TEDx BPHC 2026 will take place in the Main University Auditorium. Dedicated visitor and student parking is available adjacent to Gate 2, where directional signage guides attendees to the registration foyer.",
      },
      {
        question: "What time do registration and auditorium doors open?",
        answer:
          "Security screening and badge pickup commence at 8:30 AM. Auditorium doors open at 9:15 AM, and seating closes at 9:45 AM. The opening session begins promptly at 10:00 AM.",
      },
      {
        question: "Is re-entry allowed if I step out of the auditorium?",
        answer:
          "Re-entry is allowed during official intermissions and networking breaks. Attendees must display their event credential badge and wear their issued wristband to regain entry to the auditorium bowl.",
      },
    ],
  },
  {
    categoryName: "General Guidelines",
    items: [
      {
        question: "Is personal photography or recording permitted during talks?",
        answer:
          "Flash photography and continuous video recording during speaker presentations are strictly prohibited to ensure minimal distraction. Accredited media teams will document the sessions, and talks will be published globally on the official TEDx platform.",
      },
      {
        question: "Are food and beverages allowed inside the main auditorium?",
        answer:
          "Food and uncovered beverages are prohibited inside the auditorium. Bottled water is permitted, and complimentary lunch and refreshment breaks are provided in the designated outdoor networking pavilion.",
      },
      {
        question: "What accessibility accommodations are available at the venue?",
        answer:
          "The Main Auditorium features barrier-free wheelchair access, reserved accessible seating areas, and nearby accessible restrooms. Attendees needing tailored assistance can notify the event operations desk upon arrival.",
      },
      {
        question: "What is the recommended dress code for attendees?",
        answer:
          "The recommended attire is smart casual or business casual. Comfortable clothing is advised for a full day of inspiring talks, breakout conversations, and campus networking.",
      },
    ],
  },
];
