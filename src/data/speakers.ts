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
    company: "NeuralCraft Technologies",
    role: "Founding Scientist & Neuro-AI Director",
    category: "Technology",
    imageUrl: "",
    talkTitle: "The Architecture of Synthetic Intuition",
    bio: "Pioneering neural interfaces and self-adaptive agentic networks at NeuralCraft. Siddharth explores how biological synapses inspire non-linear artificial cognition.",
    talkDescription: "A deep inquiry into synthetic intuition: how moving beyond brute-force token prediction enables autonomous systems to perceive spatial analogies, context, and creative divergence.",
    topicTags: ["ArtificialIntelligence", "Neuroscience", "SyntheticIntuition"],
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-2",
    name: "Speaker 2",
    company: "TerraNova Habitats",
    role: "Principal Architect & Urban Ecologist",
    category: "Design",
    imageUrl: "",
    talkTitle: "Cities of Living Carbon",
    bio: "Specializes in regenerative vernacular architecture and biomaterial composites. Her structures naturally sequester atmospheric carbon while fostering biodiversity in dense urban centres.",
    talkDescription: "Rethinking the urban landscape not as static concrete monoliths, but as living metabolic organisms that filter air, cycle water, and cool urban heat islands passively.",
    topicTags: ["BiophilicDesign", "Architecture", "UrbanEcology"],
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-3",
    name: "Speaker 3",
    company: "Helios Fusion Energy",
    role: "Chief Plasma Physicist",
    category: "Science",
    imageUrl: "",
    talkTitle: "Harnessing the Heart of Stars",
    bio: "Leading magnetic confinement fusion experiments aiming to deliver decentralized, zero-emission baseload energy to regional power grids.",
    talkDescription: "Demystifying stellarators and tokamak physics. Marcus reveals how breakthroughs in high-temperature superconducting magnets bring commercial fusion within this decade's reach.",
    topicTags: ["FusionEnergy", "CleanTech", "DeepPhysics"],
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-4",
    name: "Speaker 4",
    company: "Pravega Biotherapeutics",
    role: "Molecular Biologist & CRISPR Strategist",
    category: "Science",
    imageUrl: "",
    talkTitle: "Rewriting Cellular Epigenetics",
    bio: "Investigates precision epigenome editing tools that reverse age-associated cellular decay without altering the underlying genomic code.",
    talkDescription: "How targeted histone reprogramming can reset cellular biological age, opening revolutionary pathways to eradicate neurodegenerative disorders before symptoms begin.",
    topicTags: ["CRISPR", "Epigenetics", "Longevity"],
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-5",
    name: "Speaker 5",
    company: "Decentralized Public Systems",
    role: "Cryptoeconomist & Policy Fellow",
    category: "Business",
    imageUrl: "",
    talkTitle: "Algorithmic Consensus & Collective Will",
    bio: "Designs resilient quadratic voting and decentralized coordination mechanisms for civic infrastructure and public goods funding.",
    talkDescription: "Why modern representative democracy struggles with asymmetric digital scale, and how cryptographic proof-of-humanity systems can restore civic accountability.",
    topicTags: ["Governance", "CivicTech", "Web3PublicGoods"],
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-6",
    name: "Speaker 6",
    company: "Subversive Sound Lab",
    role: "Sonic Artist & Acoustic Archaeologist",
    category: "Art & Culture",
    imageUrl: "",
    talkTitle: "Resonances of Lost Frequencies",
    bio: "Reconstructs the psychoacoustic soundscapes of ancient subterranean chambers and endangered oceanic reefs using spatial field recordings.",
    talkDescription: "An evocative sensory presentation demonstrating how ambient sound shapes human memory, neurological well-being, and historical emotional perception.",
    topicTags: ["SonicArt", "Acoustics", "CulturalMemory"],
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-7",
    name: "Speaker 7",
    company: "Orbital Frontier Dynamics",
    role: "Astrodynamics Engineer & Payload Lead",
    category: "Innovation",
    imageUrl: "",
    talkTitle: "Swarms in Low Lunar Orbit",
    bio: "Directs autonomous propulsion and autonomous docking protocols for miniature orbital probes surveying lunar permanently shadowed regions.",
    talkDescription: "How distributed satellite swarms will build the logistical nervous system required for sustainable, multi-generational interplanetary scientific exploration.",
    topicTags: ["SpaceExploration", "Astrodynamics", "AutonomousSwarms"],
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-8",
    name: "Speaker 8",
    company: "Open Dialectic Initiative",
    role: "Media Sociologist & Investigative Journalist",
    category: "Media",
    imageUrl: "",
    talkTitle: "Sanity in the Age of Generative Noise",
    bio: "Investigates information ecologies, synthetic disinformation velocity, and the cognitive impacts of hyper-personalized algorithmic feeds.",
    talkDescription: "A blueprint for epistemic defense: equipping delegates with cognitive tools to interrogate media narratives, resist rage-farming, and safeguard nuanced consensus.",
    topicTags: ["MediaLiteracy", "DigitalEthics", "CognitiveFreedom"],
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-9",
    name: "Speaker 9",
    company: "Institute for High-Performance Kinetics",
    role: "Biomechanist & Paralympic Director",
    category: "Sports",
    imageUrl: "",
    talkTitle: "The Kinetic Edge of Human Will",
    bio: "Pioneered sensory neuro-prosthetics and adaptive kinetic frameworks that turn extreme physiological adversity into record-setting athletic breakthroughs.",
    talkDescription: "Deconstructing the threshold of human endurance: how neurological reframing and biofeedback transform physical limits into launching pads for greatness.",
    topicTags: ["HumanPotential", "Biomechanics", "Resilience"],
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
