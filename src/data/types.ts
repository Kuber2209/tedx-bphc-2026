// Shared content shapes. Fill in real fields as each section is built;
// swap the hardcoded arrays in ./content.ts for CMS-backed data later.

export interface Speaker {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: "title" | "gold" | "silver" | "partner";
  logoUrl: string;
  websiteUrl: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
