export interface Partner {
  id: string;
  name: string;
  category: string;
  logoUrl: string;
  website?: string;
  tier?: "title" | "powered" | "associate" | "in-kind" | "media";
  year?: string;
}

export interface PartnershipTier {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  highlighted?: boolean;
  benefits: string[];
  ctaText?: string;
}

export const currentPartners: Partner[] = [
  {
    id: "partner-1",
    name: "FabLabs",
    category: "Merchandise Partner",
    logoUrl: "",
    website: "https://example.com",
    tier: "in-kind",
    year: "2026",
  },
  {
    id: "partner-2",
    name: "Smaaash",
    category: "Gaming Partner",
    logoUrl: "",
    website: "https://example.com",
    tier: "in-kind",
    year: "2026",
  },
  {
    id: "partner-3",
    name: "GyanDhan",
    category: "Education Loan Partner",
    logoUrl: "",
    website: "https://example.com",
    tier: "associate",
    year: "2026",
  },
  {
    id: "partner-4",
    name: "Abhibus",
    category: "Mobility Partner",
    logoUrl: "",
    website: "https://example.com",
    tier: "associate",
    year: "2026",
  },
  {
    id: "partner-5",
    name: "MYOP",
    category: "Fragrance Partner",
    logoUrl: "",
    website: "https://example.com",
    tier: "in-kind",
    year: "2026",
  },
  {
    id: "partner-6",
    name: "Roundtrip",
    category: "Travel Partner",
    logoUrl: "",
    website: "https://example.com",
    tier: "in-kind",
    year: "2026",
  },
  {
    id: "partner-7",
    name: "WickedGud",
    category: "Snacking Partner",
    logoUrl: "",
    website: "https://example.com",
    tier: "in-kind",
    year: "2026",
  },
  {
    id: "partner-8",
    name: "Partner Brand",
    category: "Beverage Partner",
    logoUrl: "",
    website: "https://example.com",
    tier: "in-kind",
    year: "2026",
  },
];

export const partnershipTiers: PartnershipTier[] = [
  {
    id: "tier-title",
    name: "Title Partner",
    tagline: "Exclusive naming rights & headline prominence across all event assets.",
    badge: "Principal Tier",
    highlighted: true,
    benefits: [
      "Title naming integration: 'TEDx BITS Hyderabad Presented by [Your Brand]'",
      "Dedicated keynote address opportunity & stage visibility",
      "Prime exhibition space & interactive on-campus experiential booth",
      "Prominent placement on global TEDx YouTube talk credits & event website",
      "Complimentary VIP executive passes and delegate badges",
      "Full digital and social media co-branded campaign features",
    ],
    ctaText: "Inquire for Title",
  },
  {
    id: "tier-powered",
    name: "Co-Powered By",
    tagline: "High-impact association with prominent stage and venue branding.",
    badge: "Featured Tier",
    benefits: [
      "Co-branded stage backdrop and digital presentation recognition",
      "Dedicated stall setup for live product showcases and activations",
      "Collateral insertion into all attendee welcome kits",
      "Social media partner reveal and spotlight reels",
      "VIP invitation passes for corporate leadership team",
      "Access to attendee engagement data & talent pipeline touchpoints",
    ],
    ctaText: "Inquire for Powered By",
  },
  {
    id: "tier-associate",
    name: "Associate Partner",
    tagline: "Direct engagement with premier engineering and management minds.",
    badge: "Growth Tier",
    benefits: [
      "Official partner listing on website, booklets, and LED stage screens",
      "Targeted student recruitment and brand ambassador opportunities",
      "Brand mention during opening and closing university ceremonies",
      "Complimentary standard passes for executive delegation",
      "Dedicated social media partner appreciation post",
    ],
    ctaText: "Inquire for Associate",
  },
  {
    id: "tier-inkind",
    name: "Category / In-Kind Partner",
    tagline: "Custom integration across Mobility, Snacking, Tech, or Hospitality.",
    badge: "Category Tier",
    benefits: [
      "Official category exclusivity (e.g. Official Mobility / Travel Partner)",
      "Direct product distribution and sampling to all 1,000+ delegates",
      "Logo inclusion in sponsor directory and event brochures",
      "Live event shoutouts and social media tags",
      "Invitation passes for company representatives",
    ],
    ctaText: "Discuss Category Partnership",
  },
];

export const pastSponsors: Partner[] = [
  {
    id: "past-1",
    name: "Tech Solutions",
    category: "Technology Partner",
    logoUrl: "",
    year: "2025",
  },
  {
    id: "past-2",
    name: "Prime Media",
    category: "Media Partner",
    logoUrl: "",
    year: "2025",
  },
  {
    id: "past-3",
    name: "Innovate Labs",
    category: "Innovation Partner",
    logoUrl: "",
    year: "2024",
  },
  {
    id: "past-4",
    name: "Wave Audio",
    category: "Audio Partner",
    logoUrl: "",
    year: "2024",
  },
  {
    id: "past-5",
    name: "Campus Connect",
    category: "Community Partner",
    logoUrl: "",
    year: "2024",
  },
  {
    id: "past-6",
    name: "Logistics Pro",
    category: "Logistics Partner",
    logoUrl: "",
    year: "2023",
  },
];
