export interface Speaker {
  id: string;
  name: string;
  company: string;
  role: string;
  category: string;
  imageUrl: string;
  year?: string; // Edition year e.g. "2024", "2023"
  talkTitle?: string;
  bio?: string;
  talkDescription?: string;
  topicTags?: string[];
  socials?: {
    instagram?: string;
    linkedin?: string;
  };
}

export const currentSpeakers: Speaker[] = [
  {
    id: "speaker-1",
    name: "Speaker 1",
    company: "Company 1",
    role: "Role 1",
    category: "Business",
    imageUrl: "",
    talkTitle: "Title 1",
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-2",
    name: "Speaker 2",
    company: "Company 2",
    role: "Role 2",
    category: "Technology",
    imageUrl: "",
    talkTitle: "Title 2",
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-3",
    name: "Speaker 3",
    company: "Company 3",
    role: "Role 3",
    category: "Art & Culture",
    imageUrl: "",
    talkTitle: "Title 3",
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-4",
    name: "Speaker 4",
    company: "Company 4",
    role: "Role 4",
    category: "Education",
    imageUrl: "",
    talkTitle: "Title 4",
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-5",
    name: "Speaker 5",
    company: "Company 5",
    role: "Role 5",
    category: "Sports",
    imageUrl: "",
    talkTitle: "Title 5",
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-6",
    name: "Speaker 6",
    company: "Company 6",
    role: "Role 6",
    category: "Science",
    imageUrl: "",
    talkTitle: "Title 6",
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-7",
    name: "Speaker 7",
    company: "Company 7",
    role: "Role 7",
    category: "Media",
    imageUrl: "",
    talkTitle: "Title 7",
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-8",
    name: "Speaker 8",
    company: "Company 8",
    role: "Role 8",
    category: "Design",
    imageUrl: "",
    talkTitle: "Title 8",
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-9",
    name: "Speaker 9",
    company: "Company 9",
    role: "Role 9",
    category: "Innovation",
    imageUrl: "",
    talkTitle: "Title 9",
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
];

// ============================================================================
// PAST SPEAKERS (ALUMNI LINEUP)
// ============================================================================
// HOW TO EDIT PAST SPEAKERS:
// 1. `year`: Edition year they spoke in (e.g. "2024", "2023", "2022").
//    The FilterDisclosure filter will automatically filter by this year!
// 2. `imageUrl`: Place photo inside `/public/speakers/` and put "/speakers/name.jpg" here.
//    (If left empty "", a sleek monogram fallback avatar is automatically shown).
// 3. `talkTitle`: Title of the TEDx talk they delivered.
// 4. `talkDescription` / `bio`: 1-2 sentence brief shown when user clicks their row.
// 5. `topicTags`: Key themes e.g. ["AI", "Design", "Biology"].
// 6. Add or remove speakers by duplicating or deleting an entry below.
// ============================================================================

export const pastSpeakers: Speaker[] = [
  {
    id: "past-1",
    name: "Past Speaker 1",
    company: "Acme Innovations",
    role: "Founding Partner",
    category: "Business",
    imageUrl: "", // e.g. "/speakers/past-1.jpg"
    year: "2024",
    talkTitle: "The Future of Scalable Venture Systems",
    bio: "Pioneered sustainable venture models across emerging markets, connecting early-stage research with high-impact public capital.",
    talkDescription: "Explores how high-velocity capital deployment can align with generational ecological preservation.",
    topicTags: ["Business", "Venture", "Impact"],
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "past-2",
    name: "Past Speaker 2",
    company: "DeepTech Research Labs",
    role: "Principal AI Scientist",
    category: "Technology",
    imageUrl: "",
    year: "2024",
    talkTitle: "Beyond Machine Perception",
    bio: "Researching neural architectures for assistive robotics and human-agent co-adaptation in unstructured environments.",
    talkDescription: "A deep dive into how embodied intelligence learns spatial intuition through tactile and auditory feedback.",
    topicTags: ["Technology", "AI", "Robotics"],
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "past-3",
    name: "Past Speaker 3",
    company: "Heritage & Living Archives",
    role: "Curator & Visual Artist",
    category: "Art & Culture",
    imageUrl: "",
    year: "2024",
    talkTitle: "Echoes in Stone and Story",
    bio: "Documenting endangered oral traditions and vernacular architectural monuments across South Asia.",
    talkDescription: "An exploration into preserving cultural memory against the onslaught of algorithmic homogenization.",
    topicTags: ["Culture", "Art", "Heritage"],
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "past-4",
    name: "Past Speaker 4",
    company: "Institute of Bioscience",
    role: "Cellular Biologist",
    category: "Science",
    imageUrl: "",
    year: "2023",
    talkTitle: "Rewriting Cellular Ageing",
    bio: "Investigating mitochondrial dynamics and cellular senescence to unlock preventative therapies for degenerative diseases.",
    talkDescription: "How subtle changes in mitochondrial membrane permeability dictate the biological clock of human tissues.",
    topicTags: ["Science", "Biology", "Longevity"],
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "past-5",
    name: "Past Speaker 5",
    company: "Open Pedagogy Initiative",
    role: "Education Reformer & Author",
    category: "Education",
    imageUrl: "",
    year: "2023",
    talkTitle: "Classrooms Without Walls",
    bio: "Advocating for self-directed experiential learning models in rural and underserved academic communities.",
    talkDescription: "Rethinking secondary education from standardized rote curricula to project-driven local community impact.",
    topicTags: ["Education", "Pedagogy", "Community"],
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "past-6",
    name: "Past Speaker 6",
    company: "Paralympic Training Center",
    role: "National Athlete & High-Performance Coach",
    category: "Sports",
    imageUrl: "",
    year: "2023",
    talkTitle: "Resilience as a Kinetic Practice",
    bio: "Multiple international gold medalist championing accessible sports infrastructure and athletic mental resilience.",
    talkDescription: "Transforming physical limitations into biomechanical advantages through discipline, mental reframing, and habit.",
    topicTags: ["Sports", "Resilience", "Mindset"],
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "past-7",
    name: "Past Speaker 7",
    company: "Global Journalism Forum",
    role: "Investigative Journalist & Filmmaker",
    category: "Media",
    imageUrl: "",
    year: "2022",
    talkTitle: "Truth in the Age of Noise",
    bio: "Peabody award nominee covering climate migrations, geopolitical frontiers, and investigative narrative storytelling.",
    talkDescription: "Behind the scenes of reporting from conflict zones and verifying authentic human stories amid synthetic disinformation.",
    topicTags: ["Media", "Journalism", "Storytelling"],
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "past-8",
    name: "Past Speaker 8",
    company: "Studio Inclusive",
    role: "Principal Product Designer",
    category: "Design",
    imageUrl: "",
    year: "2022",
    talkTitle: "Design That Belongs to Everyone",
    bio: "Leading inclusive industrial and digital product design for global assistive hardware initiatives.",
    talkDescription: "Why designing for extreme edge cases consistently unlocks the most intuitive breakthroughs for mainstream products.",
    topicTags: ["Design", "Accessibility", "Inclusion"],
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "past-9",
    name: "Past Speaker 9",
    company: "CleanGrid Technologies",
    role: "Clean Energy Strategist",
    category: "Innovation",
    imageUrl: "",
    year: "2021",
    talkTitle: "Powering the Next Billion Decentralized Lives",
    bio: "Engineering localized microgrid solutions and community solar architectures for off-grid rural communities.",
    talkDescription: "Deploying modular renewable energy storage to empower agricultural independence and regional economic equity.",
    topicTags: ["Innovation", "CleanTech", "Energy"],
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
];
