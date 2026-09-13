import { PassTier } from "./types";

export interface PassComparisonBenefit {
  benefit: string;
  standard: boolean;
  premium: boolean;
}

export const studentPassComparison: PassComparisonBenefit[] = [
  {
    benefit: "Full Access to All Keynote Talks & Performances (Day 1 & Day 2)",
    standard: true,
    premium: true,
  },
  {
    benefit: "Official Delegate Credential & Lanyard Badge",
    standard: true,
    premium: true,
  },
  {
    benefit: "Catered Networking Lunch & High-Tea Refreshments",
    standard: true,
    premium: true,
  },
  {
    benefit: "Official Certificate of Participation",
    standard: true,
    premium: true,
  },
  {
    benefit: "Access to Student Research Exhibits & Interactive Installations",
    standard: true,
    premium: true,
  },
  {
    benefit: "Premium Delegate Merchandise Pack (Canvas Tote, Journal & Decals)",
    standard: false,
    premium: true,
  },
  {
    benefit: "Exclusive TEDx BPHC Commemorative Metallic Lapel Pin",
    standard: false,
    premium: true,
  },
  {
    benefit: "Priority Front-Row Auditorium Seating Zone",
    standard: false,
    premium: true,
  },
  {
    benefit: "Fast-Track Priority Registration Check-In Desk",
    standard: false,
    premium: true,
  },
  {
    benefit: "Exclusive Post-Event Speaker Interaction & Q&A Access",
    standard: false,
    premium: true,
  },
  {
    benefit: "Digital Presentation Archives & Resource Toolkit",
    standard: false,
    premium: true,
  },
];

export const bitsianPassComparison: PassComparisonBenefit[] = [
  {
    benefit: "Full Access to All Keynote Talks & Performances (Day 1 & Day 2)",
    standard: true,
    premium: true,
  },
  {
    benefit: "Official BPHC Attendee Credential & Commemorative Lanyard",
    standard: true,
    premium: true,
  },
  {
    benefit: "Catered Networking Luncheon & High-Tea Refreshments",
    standard: true,
    premium: true,
  },
  {
    benefit: "Academic Attendance Condonation Facilitation",
    standard: true,
    premium: true,
  },
  {
    benefit: "Access to Student Research Exhibits & Interactive Installations",
    standard: true,
    premium: true,
  },
  {
    benefit: "TEDx BPHC Matte Hardbound Conference Notebook & Metallic Pen",
    standard: true,
    premium: true,
  },
  {
    benefit: "Premium Commemorative Merchandise Pack (Custom Canvas Tote & Decals)",
    standard: false,
    premium: true,
  },
  {
    benefit: "Exclusive TEDx BPHC Metallic Lapel Pin & Metal Bookmark",
    standard: false,
    premium: true,
  },
  {
    benefit: "Priority Stalls Tier Seating with Prime Stage Sightlines",
    standard: false,
    premium: true,
  },
  {
    benefit: "Fast-Track Registration Desk Clearance",
    standard: false,
    premium: true,
  },
  {
    benefit: "Exclusive Post-Conference Campus Community & Speaker Mixer",
    standard: false,
    premium: true,
  },
  {
    benefit: "Digital Presentation Archives & Resource Toolkit",
    standard: false,
    premium: true,
  },
];

export const guestPassComparison: PassComparisonBenefit[] = [
  {
    benefit: "Full-Day Access to All Keynote Talks, Panels & Stage Performances",
    standard: true,
    premium: true,
  },
  {
    benefit: "Official Executive Delegate Credential & RFID Lanyard",
    standard: true,
    premium: true,
  },
  {
    benefit: "Campus Visitor Vehicle Entry Permit & Reserved Parking Clearance",
    standard: true,
    premium: true,
  },
  {
    benefit: "Curated Executive Networking Luncheon & Refreshments",
    standard: true,
    premium: true,
  },
  {
    benefit: "Access to Research Exhibits & Experience Zones",
    standard: true,
    premium: true,
  },
  {
    benefit: "Executive Conference Notebook & Stationery Pack",
    standard: true,
    premium: true,
  },
  {
    benefit: "Premium Executive Pack (Insulated Tumbler, Canvas Tote & Sponsor Pack)",
    standard: false,
    premium: true,
  },
  {
    benefit: "Laser-Cut Metallic Lapel Pin & Commemorative Collectibles",
    standard: false,
    premium: true,
  },
  {
    benefit: "Prime Central Bowl Seating (Unobstructed Front-Tier Sightlines)",
    standard: false,
    premium: true,
  },
  {
    benefit: "VIP Fast-Track Registration & Gate Clearance Desk",
    standard: false,
    premium: true,
  },
  {
    benefit: "Exclusive Evening Networking Mixer with Speakers & Founders",
    standard: false,
    premium: true,
  },
  {
    benefit: "Digital Presentation Archives & Speaker Presentation Transcripts",
    standard: false,
    premium: true,
  },
];

export interface PassComparisonData {
  id: string;
  name: string;
  badge: string;
  standardPrice: string;
  originalStandardPrice?: string;
  standardTag?: string;
  premiumPrice: string;
  premiumTag?: string;
  benefits: PassComparisonBenefit[];
}

export const passComparisons: Record<string, PassComparisonData> = {
  "school-student": {
    id: "school-student",
    name: "Student Pass",
    badge: "Student Delegation",
    standardPrice: "₹429",
    premiumPrice: "₹550",
    benefits: studentPassComparison,
  },
  "student": {
    id: "school-student",
    name: "Student Pass",
    badge: "Student Delegation",
    standardPrice: "₹429",
    premiumPrice: "₹550",
    benefits: studentPassComparison,
  },
  "bits-internal": {
    id: "bits-internal",
    name: "BITSian Pass",
    badge: "Campus Exclusive",
    standardPrice: "₹650",
    originalStandardPrice: "₹999",
    standardTag: "Early Bird",
    premiumPrice: "₹1,299",
    benefits: bitsianPassComparison,
  },
  "external-guest": {
    id: "external-guest",
    name: "External Guest Pass",
    badge: "General Delegate",
    standardPrice: "₹650",
    premiumPrice: "₹850",
    benefits: guestPassComparison,
  },
};

export const passTiers: PassTier[] = [
  {
    id: "school-student",
    name: "Student Pass",
    badge: "Grades 9–12",
    targetAudience: "School & College Students",
    description:
      "Curated for students and young thinkers exploring big ideas.",
    price: "₹429 / ₹550",
    pricing: {
      standard: {
        price: "₹429",
        label: "Standard",
      },
      premium: {
        price: "₹550",
        label: "Premium",
      },
    },
    eligibility: "Open to enrolled school and college students exploring big ideas and creative innovation.",
    benefits: [
      "Access to all speaker talks & creative performances",
      "Official TEDx BPHC delegate kit & lanyard badge",
      "Interactive Q&A & student discussion breakouts",
      "Lunch & high-tea refreshments during session breaks",
      "Official Certificate of Participation",
      "Premium tier includes exclusive merchandise, front-row seating & speaker Q&A",
    ],
    available: false,
    highlight: false,
    registrationUrl: "#",
    details: {
      overview:
        "The Student Pass is designed to inspire the next generation of researchers, artists, and problem solvers. Available in Standard and Premium tiers, delegates can choose between essential conference access or an elevated experience featuring front-row seating, exclusive merchandise, and speaker interactions.",
      whoShouldAttend: [
        "Students enrolled in Grades 9–12 across CBSE, ICSE, IB, Cambridge, and State Boards",
        "Aspiring young innovators, researchers, and creative thinkers seeking intellectual inspiration",
        "Student delegations accompanied by school faculty coordinators or student council leaders",
      ],
      scheduleHighlights: [
        {
          time: "08:30 AM",
          title: "Youth Delegate Welcome & Kit Collection",
          description:
            "Collect your official TEDx badge, merchandise kit, and welcome handbook at the Youth Desk in the Auditorium Foyer.",
        },
        {
          time: "09:45 AM",
          title: "Act I: Ignition & Unseen Catalysts",
          description:
            "Morning keynote talks exploring scientific breakthroughs, social entrepreneurship, and creative innovations shaping our tomorrow.",
        },
        {
          time: "01:00 PM",
          title: "Curated Networking Luncheon",
          description:
            "Enjoy a nutritious, multi-course lunch with peers and interact with student ambassadors and researchers from BITS Pilani.",
        },
        {
          time: "02:30 PM",
          title: "Act II: Societal Weaves & Resonant Horizons",
          description:
            "Multidisciplinary talks, live musical interludes, artistic performances, and interactive open-mic segments.",
        },
        {
          time: "05:30 PM",
          title: "Certificate Presentation & High-Tea Reception",
          description:
            "Receive your signed Certificate of Participation and celebrate the day with high-tea refreshments.",
        },
      ],
      checkInGuide: [
        "Digital pass confirmation QR code on your mobile phone",
        "Welcome desk opens at 08:30 AM in the Auditorium Foyer",
        "Youth delegate badge and conference kit provided at reception",
      ],
      kitContents: [
        "Custom TEDx BPHC 2026 Youth Delegate Canvas Tote",
        "Official Lanyard & Holographic Access Credential",
        "Theme 'Invisible Threads' Spiral Journal & Metallic Pen",
        "Exclusive TEDx BPHC Commemorative Enamel Pin & Decals",
        "Official Signed Certificate of Participation",
      ],
      seatingZone: "Reserved Youth Delegation Bowl (Center-Tier Auditorium Seating)",
      faqs: [
        {
          question: "Can parents or teachers accompany school students?",
          answer:
            "Accompanying teachers, guardians, or parents are warmly welcomed and can attend alongside students by securing an accompanying delegation or guest pass.",
        },
        {
          question: "Is transportation coordinated to the campus?",
          answer:
            "For schools bringing contingents of 15+ students, our operations desk assists with campus bus transit clearance and coordinated parking.",
        },
        {
          question: "Will attendees receive a participation certificate?",
          answer:
            "Yes, every registered school delegate will receive an official TEDx BPHC Certificate of Participation at the conclusion of the event.",
        },
      ],
    },
  },
  {
    id: "bits-internal",
    name: "BITSian Pass",
    badge: "In-House Campus Tier",
    targetAudience: "BITS BPHC Students, Faculty & Staff",
    description:
      "Exclusive access tier for the on-campus BITS Pilani Hyderabad community to experience the flagship edition.",
    price: "₹650 / ₹1,299",
    pricing: {
      standard: {
        price: "₹650",
        originalPrice: "₹999",
        label: "Early Bird",
      },
      premium: {
        price: "₹1,299",
        label: "Premium",
      },
    },
    eligibility: "Welcoming all enrolled BPHC students, faculty, researchers, and campus staff.",
    benefits: [
      "Full access to the main auditorium for all keynote sessions",
      "Exclusive BPHC edition delegate kit & attendee credentials",
      "Catered networking luncheon & refreshments",
      "Academic attendance condonation facilitation",
      "Premium tier includes exclusive merchandise, lapel pin & speaker mixer",
    ],
    available: false,
    highlight: true,
    registrationUrl: "#",
    details: {
      overview:
        "The BITSian Pass is the dedicated in-house tier for undergraduate students, dual-degree scholars, postgraduates, research scholars, faculty, and staff at BITS Pilani Hyderabad Campus. Experience the premier ideas festival on your home campus with priority seating, specialized kits, and community mixers.",
      whoShouldAttend: [
        "Enrolled BPHC Undergraduate & Dual-Degree Students across all batches",
        "Higher Degree (ME / MPharm) and PhD Research Scholars",
        "BITS Faculty Members, Postdoctoral Fellows & Campus Staff",
      ],
      scheduleHighlights: [
        {
          time: "08:45 AM",
          title: "Fast-Track Campus Registration",
          description:
            "Quick check-in at the Auditorium Foyer with instant attendee pass issuance.",
        },
        {
          time: "09:45 AM",
          title: "Inaugural Ceremony & Morning Keynotes",
          description:
            "Witness boundary-pushing talks by global researchers, thinkers, and entrepreneurs on the main stage.",
        },
        {
          time: "01:00 PM",
          title: "Campus Networking Luncheon",
          description:
            "Catered multi-course lunch served in the Student Activity Center courtyard.",
        },
        {
          time: "02:30 PM",
          title: "Afternoon Curatorial Track & Performances",
          description:
            "Deep dives into technological inflection points, cultural preservation, and creative performances.",
        },
        {
          time: "06:00 PM",
          title: "BITSian Community Mixer & Speaker Interaction",
          description:
            "Exclusive access to the post-event mixer and conversations with speakers and organizing leads.",
        },
      ],
      checkInGuide: [
        "Digital confirmation QR code or your BITS student ID",
        "Fast-track registration desk opens at 08:30 AM",
        "Official in-house delegate badge and commemorative kit issued on arrival",
      ],
      kitContents: [
        "Exclusive BPHC In-House Edition Delegate Badge & Lanyard",
        "Theme 'Invisible Threads' Matte Hardbound Notebook",
        "TEDx BPHC Metallic Lapel Pin",
        "Collector's Edition Decal Sheet & Metal Bookmark",
      ],
      seatingZone: "Dedicated BITSian Community Section (Stalls Tier with Premium Stage Sightlines)",
      faqs: [
        {
          question: "Can I get a digital copy of my pass?",
          answer:
            "Yes, a digital pass with your personal access QR code is sent directly to your registered email immediately upon confirmation.",
        },
        {
          question: "Are academic attendance condonations coordinated?",
          answer:
            "Yes, official attendance condonation requests are coordinated with the academic division for all registered student delegates attending the full day.",
        },
        {
          question: "Are lunch and refreshments included in the pass fee?",
          answer:
            "Yes, all-day catering including morning high-tea, the networking luncheon, and evening snacks are included.",
        },
      ],
    },
  },
  {
    id: "external-guest",
    name: "External Guest Pass",
    badge: "General Delegate",
    targetAudience: "Outside Guests & Professionals",
    description:
      "Open to university students, working professionals, founders, and delegates joining us from outside BITS.",
    price: "₹650 / ₹850",
    pricing: {
      standard: {
        price: "₹650",
        label: "Standard",
      },
      premium: {
        price: "₹850",
        label: "Premium",
      },
    },
    eligibility: "Open to curious minds, researchers, industry professionals, alumni, and creative delegates.",
    benefits: [
      "Full-day pass to all keynote talks, panel discussions & performances",
      "Official executive delegate credential & RFID lanyard",
      "Campus visitor vehicle entry permit & reserved parking clearance",
      "Executive networking lunch & refreshments with speakers and partners",
      "Premium tier includes executive merchandise, front-row seating & founder mixer",
    ],
    available: false,
    highlight: false,
    registrationUrl: "#",
    details: {
      overview:
        "The External Guest Pass welcomes university scholars, industry executives, startup founders, BITS alumni, and curious minds from outside BITS Pilani. Immerse yourself in a full day of thought leadership, peer networking, and high-impact discussions at one of India's foremost academic institutions.",
      whoShouldAttend: [
        "Working Professionals, Tech Leaders & Corporate Innovators",
        "Startup Founders, Entrepreneurs, Angel Investors & Venture Partners",
        "External University Students & Independent Researchers",
        "BITS Alumni returning to their alma mater",
      ],
      scheduleHighlights: [
        {
          time: "08:15 AM",
          title: "Executive Welcome & Campus Gate Reception",
          description:
            "Seamless visitor vehicle parking clearance and welcome reception at the Main Campus Gate.",
        },
        {
          time: "09:45 AM",
          title: "Main Stage Inauguration & Keynote Block I",
          description:
            "Front-row experience of world-class speakers sharing untold stories and paradigm-shifting ideas.",
        },
        {
          time: "01:00 PM",
          title: "Executive Networking Luncheon",
          description:
            "Curated dining experience alongside speakers, industry partners, and institutional leadership.",
        },
        {
          time: "02:30 PM",
          title: "Keynote Block II & Cultural Showcases",
          description:
            "Exploring the unseen fabrics of technology, biology, design, and human resilience.",
        },
        {
          time: "06:00 PM",
          title: "Evening Mixer & Curatorial Dialogue",
          description:
            "Conclude the conference with high-tea refreshments and discussions with fellow delegates.",
        },
      ],
      checkInGuide: [
        "Digital pass confirmation QR code on your mobile phone",
        "Campus visitor gate pass and reserved parking clearance included",
        "Executive delegate credentials and premium conference pack issued at reception",
      ],
      kitContents: [
        "Executive Hardbound TEDx BPHC Conference Journal",
        "Premium Stainless Steel Insulated Commemorative Tumbler",
        "Laser-Cut Metallic Delegate Badge with RFID Lanyard",
        "Official TEDx Conference Pen & Lapel Pin",
        "Curated Sponsor Gift Package & Exclusive Access Codes",
      ],
      seatingZone: "Prime General Delegate Bowl (Central Stalls Tier with Unobstructed Views)",
      faqs: [
        {
          question: "How do I reach the BITS Pilani Hyderabad Campus?",
          answer:
            "The campus is located on Shameerpet Road, Jawahar Nagar, Hyderabad. Dedicated transit directions and campus gate pass codes will be emailed to all registered guests before the event. On-campus visitor parking is provided.",
        },
        {
          question: "Is campus accommodation available for outstation attendees?",
          answer:
            "Limited on-campus guest house rooms are available on request for traveling delegates. You can reach out to our Hospitality Desk after pass registration.",
        },
        {
          question: "Can I get a tax or corporate reimbursement invoice?",
          answer:
            "Yes, GST-compliant invoices with corporate entity details will be automatically issued upon completion of pass registration.",
        },
      ],
    },
  },
];

export const passGuidelines = [
  {
    title: "Seamless Campus Check-In",
    description:
      "Simply present your digital confirmation QR code at the registration desk in the Auditorium Foyer to collect your official delegate badge and welcome kit.",
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
