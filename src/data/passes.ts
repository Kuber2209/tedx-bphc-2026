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
    eligibility: "Open to high school students (Grades 9–12) exploring big ideas and creative innovation.",
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
    details: {
      overview:
        "The School Student Pass is specifically tailored for students in grades 9 through 12. Designed to inspire the next generation of researchers, artists, and problem solvers, this tier provides complete access to all main-stage keynote talks, artistic performances, and youth networking sessions on campus.",
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
    price: "TBA",
    eligibility: "Welcoming all enrolled BPHC students, faculty, researchers, and campus staff.",
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
    price: "TBA",
    eligibility: "Open to curious minds, researchers, industry professionals, alumni, and creative delegates.",
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
