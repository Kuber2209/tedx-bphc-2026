import { TeamMember, TeamSection } from "./types";

/**
 * TEDx BPHC 2026 Team Data
 * Edit this file to add, remove, or modify team members.
 * When real photos are available, drop them in `/public/team/` and set `imageUrl: "/team/name.jpg"`.
 * Leave `imageUrl` undefined or empty to show the default photo placeholder card.
 */

export const TEAM_SECTIONS: TeamSection[] = [
  {
    id: "executives",
    title: "TEDx Executives",
    description: "Leading the vision, curation, and operations for TEDx BPHC 2026.",
    members: [
      {
        id: "team-member-1",
        name: "Team Member 1",
        handle: "@team-member-1",
        role: "TEDx Executive",
        bio: "Spearheading the strategic vision and event-day curation for TEDx BPHC 2026, cultivating high-impact ideas across technology and society.",
        imageUrl: "",
        phone: "+91 12345 67890",
        email: "member1@tedxbphc.in",
        instagram: "https://instagram.com/tedxbphc",
        linkedin: "https://linkedin.com",
      },
      {
        id: "team-member-2",
        name: "Team Member 2",
        handle: "@team-member-2",
        role: "TEDx Executive",
        bio: "Directing multi-disciplinary campus initiatives, operational workflows, and community engagement for an unforgettable attendee experience.",
        imageUrl: "",
        phone: "+91 12345 67891",
        email: "member2@tedxbphc.in",
        instagram: "https://instagram.com/tedxbphc",
        linkedin: "https://linkedin.com",
      },
      {
        id: "team-member-3",
        name: "Team Member 3",
        handle: "@team-member-3",
        role: "TEDx Executive",
        bio: "Orchestrating speaker relations, stage curation, and impactful storytelling frameworks that connect visionary thinkers with eager minds.",
        imageUrl: "",
        phone: "+91 12345 67892",
        email: "member3@tedxbphc.in",
        instagram: "https://instagram.com/tedxbphc",
        linkedin: "https://linkedin.com",
      },
      {
        id: "team-member-4",
        name: "Team Member 4",
        handle: "@team-member-4",
        role: "TEDx Executive",
        bio: "Leading creative brand identity, visual storytelling, and immersive production aesthetics to build an iconic visual language.",
        imageUrl: "",
        phone: "+91 12345 67893",
        email: "member4@tedxbphc.in",
        instagram: "https://instagram.com/tedxbphc",
        linkedin: "https://linkedin.com",
      },
      {
        id: "team-member-5",
        name: "Team Member 5",
        handle: "@team-member-5",
        role: "TEDx Executive",
        bio: "Driving the digital architecture, interactive web experiences, and attendee technology platforms for the 2026 conference.",
        imageUrl: "",
        phone: "+91 12345 67894",
        email: "member5@tedxbphc.in",
        instagram: "https://instagram.com/tedxbphc",
        linkedin: "https://linkedin.com",
      },
      {
        id: "team-member-6",
        name: "Team Member 6",
        handle: "@team-member-6",
        role: "TEDx Executive",
        bio: "Managing stakeholder partnerships, corporate sponsorships, and financial governance to power TEDx ideas at scale.",
        imageUrl: "",
        phone: "+91 12345 67895",
        email: "member6@tedxbphc.in",

        linkedin: "https://linkedin.com",
      },
    ],
  },
];

// Flat list helper if needed elsewhere
export const ALL_TEAM_MEMBERS: TeamMember[] = TEAM_SECTIONS.flatMap(
  (section) => section.members
);
