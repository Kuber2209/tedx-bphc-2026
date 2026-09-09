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
  {
    id: "design",
    title: "Design",
    description: "Visual identity, art direction, and the language of the event.",
    members: [
      { id: "design-1", name: "Design Lead", handle: "@design-lead", role: "Design", bio: "Building a visual system that makes every idea feel unmistakably TEDx BPHC.", imageUrl: "", email: "design@tedxbphc.in", linkedin: "https://linkedin.com" },
      { id: "design-2", name: "Visual Designer", handle: "@visual-designer", role: "Design", bio: "Shaping posters, spaces, screens, and the small details that make the event memorable.", imageUrl: "", email: "design@tedxbphc.in", linkedin: "https://linkedin.com" },
    ],
  },
  {
    id: "technology",
    title: "Technology",
    description: "Digital systems, web experiences, and event technology.",
    members: [
      { id: "tech-1", name: "Technology Lead", handle: "@technology-lead", role: "Technology", bio: "Creating reliable digital experiences that connect the audience to the ideas on stage.", imageUrl: "", email: "tech@tedxbphc.in", linkedin: "https://linkedin.com" },
      { id: "tech-2", name: "Web Experience Lead", handle: "@web-experience", role: "Technology", bio: "Turning the event programme into a clear, welcoming, and useful online experience.", imageUrl: "", email: "tech@tedxbphc.in", linkedin: "https://linkedin.com" },
    ],
  },
  {
    id: "curation",
    title: "Curation",
    description: "Finding the questions, stories, and speakers that move us forward.",
    members: [
      { id: "curation-1", name: "Curation Lead", handle: "@curation-lead", role: "Curation", bio: "Listening for the ideas that can change how a room sees the world.", imageUrl: "", email: "curation@tedxbphc.in", linkedin: "https://linkedin.com" },
      { id: "curation-2", name: "Speaker Relations", handle: "@speaker-relations", role: "Curation", bio: "Supporting speakers from the first conversation to the final walk onto the stage.", imageUrl: "", email: "curation@tedxbphc.in", linkedin: "https://linkedin.com" },
    ],
  },
];

// Flat list helper if needed elsewhere
export const ALL_TEAM_MEMBERS: TeamMember[] = TEAM_SECTIONS.flatMap(
  (section) => section.members
);
