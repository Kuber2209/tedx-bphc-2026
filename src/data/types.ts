// Shared content shapes. Fill in real fields as each section is built;
// swap the hardcoded arrays in ./content.ts for CMS-backed data later.

export interface Speaker {
  id: string;
  name: string;
  company: string;
  role: string;
  category: string;
  imageUrl: string;
  talkTitle?: string;
  socials?: {
    instagram?: string;
    linkedin?: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  handle?: string;
  bio?: string;
  imageUrl?: string;
  phone?: string;
  email?: string;
  instagram?: string;
  linkedin?: string;
}

export interface TeamSection {
  id: string;
  title: string;
  description?: string;
  members: TeamMember[];
}

export interface Sponsor {
  id: string;
  name: string;
  tier: "title" | "gold" | "silver" | "partner";
  logoUrl: string;
  websiteUrl: string;
}

export interface FaqItem {
  id?: string;
  question: string;
  answer: string;
}

export interface FaqCategory {
  categoryName: string;
  items: FaqItem[];
}

export interface PassDetail {
  overview: string;
  whoShouldAttend: string[];
  scheduleHighlights: { time: string; title: string; description: string }[];
  checkInGuide?: string[];
  verificationDocuments?: string[];
  kitContents: string[];
  faqs: { question: string; answer: string }[];
  seatingZone: string;
}

export interface PassTier {
  id: string;
  name: string;
  badge: string;
  targetAudience: string;
  description: string;
  price: string;
  eligibility: string;
  benefits: string[];
  available: boolean;
  highlight?: boolean;
  registrationUrl?: string;
  details?: PassDetail;
}
