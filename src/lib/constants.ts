// Site constants
export const SITE_NAME = "Duduskar & Associates";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const SITE_DESCRIPTION = "Best Lawyer in Thane & Mumbai - 35+ Years of Trusted Legal Services. Expert Civil Litigation, Motor Accident Claims (MACT), Property & Real Estate Law";

// Firm information
export const FIRM = {
  name: "Duduskar & Associates",
  established: 1989,
  tagline: "35+ Years of Legal Excellence & Trusted Advocacy",
  location: "Thane, Maharashtra",
  address: "First Floor, B Wing, JOE Apartment, 101, Edulji Rd, near Sharma Dairy, Charai, Thane West, Thane, Maharashtra 400601",
  phone: "+91 9167570444",
  email: "duduskar.law@gmail.com",
};

// Navigation links
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

// Practice areas
export const PRACTICE_AREAS = [
  {
    id: "civil-litigation",
    title: "Civil Litigation",
    icon: "⚖️",
    description: "Comprehensive civil litigation services with extensive courtroom expertise spanning decades.",
    fullDescription:
      "Our firm has a distinguished track record in civil litigation matters. We provide aggressive representation and strategic guidance in all types of civil disputes, including contract disputes, property matters, and commercial litigation.",
  },
  {
    id: "motor-accident",
    title: "Motor Accident Claims (MACT)",
    icon: "🚗",
    description: "Specialized representation in motor accident compensation claims.",
    fullDescription:
      "We are highly respected in Motor Accident Claims Tribunal (MACT) matters. Our team has successfully recovered substantial compensation for numerous accident victims.",
  },
  {
    id: "property-matters",
    title: "Property Matters",
    icon: "🏢",
    description: "Expert guidance in property transactions, disputes, and legal matters.",
    fullDescription:
      "We offer comprehensive legal services related to property acquisition, sale, lease, and disputes. Our expertise covers residential, commercial, and agricultural properties with thorough due diligence.",
  },
  {
    id: "injunction-matters",
    title: "Injunction Matters",
    icon: "📜",
    description: "Specialized legal remedies and injunction petitions for urgent matters.",
    fullDescription:
      "We represent clients seeking temporary or permanent injunctions in civil proceedings. Our expertise includes urgent relief petitions and comprehensive injunction litigation strategies.",
  },
  {
    id: "land-revenue",
    title: "Land Revenue Matters",
    icon: "🌍",
    description: "Expert guidance in land revenue laws, revenue records, and government interactions.",
    fullDescription:
      "Our practice covers all aspects of land revenue matters including disputes with revenue authorities, land records correction, and revenue-related litigation.",
  },
  {
    id: "arbitration",
    title: "Arbitration & Dispute Resolution",
    icon: "🤝",
    description: "Professional arbitration and alternative dispute resolution services.",
    fullDescription:
      "We specialize in arbitration, mediation, and conciliation. Our legal team has handled complex commercial arbitrations with international standards.",
  },
  {
    id: "cooperative-society",
    title: "Cooperative Society Matters",
    icon: "🏘️",
    description: "Legal services for cooperative society formation, management, and disputes.",
    fullDescription:
      "We provide comprehensive legal guidance to cooperative societies including formation, governance, compliance, and dispute resolution with cooperative authorities.",
  },
  {
    id: "legal-consultation",
    title: "Legal Consultation & Advisory",
    icon: "💼",
    description: "Strategic legal advice and business consultation for individuals and enterprises.",
    fullDescription:
      "Our experienced advocates provide tailored legal consultation across all practice areas, helping clients make informed decisions and avoid legal complications.",
  },
  {
    id: "heirship-certificate",
    title: "Heirship Certificate Proceedings",
    icon: "👨‍👩‍👧‍👦",
    description: "Expert assistance in obtaining heirship certificates and legal succession documentation.",
    fullDescription:
      "We provide comprehensive support for heirship certificate proceedings, ensuring proper legal documentation for inheritance and succession matters with government authorities.",
  },
  {
    id: "probate-administration",
    title: "Probate and Letters of Administration",
    icon: "📖",
    description: "Professional guidance in probate proceedings and letters of administration.",
    fullDescription:
      "Our team specializes in probate matters, succession petitions, and obtaining letters of administration. We guide families through the complete legal process of estate administration.",
  },
  {
    id: "wills-succession",
    title: "Wills, Succession and Estate Planning",
    icon: "📝",
    description: "Comprehensive estate planning, will drafting, and succession strategies.",
    fullDescription:
      "We provide expert services in will drafting, estate planning, succession planning, and inheritance matters. Our goal is to ensure your assets are protected and distributed according to your wishes.",
  },
  {
    id: "consumer-protection",
    title: "Consumer Protection Matters",
    icon: "🛡️",
    description: "Specialized representation in consumer disputes and protection claims.",
    fullDescription:
      "We represent consumers in disputes with businesses, including product liability, unfair practices, and compensation claims under consumer protection laws.",
  },
  {
    id: "recovery-money-claims",
    title: "Recovery and Money Claims",
    icon: "💰",
    description: "Professional debt recovery and money claims litigation services.",
    fullDescription:
      "Our firm specializes in recovery proceedings, securing judgments, and executing money claims through civil litigation and debt recovery mechanisms.",
  },
  {
    id: "partition-family-property",
    title: "Partition and Family Property Disputes",
    icon: "🏠",
    description: "Expert resolution in partition suits and family property disputes.",
    fullDescription:
      "We handle complex partition proceedings, family property disputes, and rightful claims to ancestral and coparcenary properties.",
  },
  {
    id: "contractual-commercial",
    title: "Contractual and Commercial Disputes",
    icon: "📑",
    description: "Professional dispute resolution for commercial and contractual matters.",
    fullDescription:
      "We represent clients in commercial disputes, breach of contract claims, and complex business litigation with strategic advocacy.",
  },
  {
    id: "legal-documentation",
    title: "Legal Documentation and Advisory Services",
    icon: "📋",
    description: "Professional drafting and documentation for all legal requirements.",
    fullDescription:
      "We provide expert documentation services including contracts, agreements, affidavits, deeds, and other legal documents tailored to your specific needs.",
  },
];

// Team members
export const TEAM_MEMBERS = [
  {
    id: "yashwant-duduskar",
    name: "Adv. Yashwant Duduskar",
    title: "Founder & Senior Advocate",
    designation: "Civil Litigation Specialist",
    bio: "Founder of Duduskar & Associates with over 35 years of dedicated legal practice. A respected figure in Thane's legal community, known for unwavering commitment to justice and client success.",
    image: "/law-image/yashwant-duduskar.jpg",
  },
  {
    id: "gaurav-duduskar",
    name: "Adv. Gaurav Duduskar",
    title: "Associate Advocate",
    designation: "International Dispute Resolution Specialist",
    bio: "Bringing a modern legal perspective and strategic approach to dispute resolution, litigation, and client advisory services.",
    image: "/law-image/gaurav-duduskar.jpg",
  },
  {
    id: "as-vaidhyanatan",
    name: "Adv. A.S. Vaidhyanatan",
    title: "Senior Advocate",
    designation: "Legal Consultant",
    bio: "Experienced legal professional providing practical legal solutions and comprehensive representation across a variety of legal matters.",
    image: "/law-image/subramanium.jpg",
  },
  {
    id: "kunal-hajare",
    name: "Adv. Kunal Hajare",
    title: "Advocate",
    designation: "Associate Advocate",
    bio: "Focused on property and civil matters with a strong background in client advocacy and dispute resolution.",
    image: "/law-image/Kunal-Hajare.jpeg",
  },
  {
    id: "shivaji-solapure",
    name: "Adv. Shivaji Solapure",
    title: "Advocate",
    designation: "Associate Advocate",
    bio: "Dedicated to client advocacy, legal research, litigation support, and effective dispute resolution.",
    image: "/law-image/shivaji-solapure.jpg",
  },
  {
    id: "swati-teli",
    name: "Adv. Swati Teli",
    title: "Advocate",
    designation: "Associate Advocate",
    bio: "Committed to delivering professional legal services with a client-focused approach and attention to detail.",
    image: "/law-image/swati-teli.jpg",
  },
];

// Why choose us points
export const WHY_CHOOSE_US = [
  {
    title: "35+ Years Experience",
    description: "Three and a half decades of trusted legal practice and proven expertise in the field.",
    icon: "⚖️",
  },
  {
    title: "Client-Focused Approach",
    description: "We prioritize your interests and provide personalized legal solutions.",
    icon: "🎯",
  },
  {
    title: "Courtroom Expertise",
    description: "Extensive trial experience and successful case history in complex litigation.",
    icon: "📋",
  },
  {
    title: "Modern Legal Strategies",
    description: "Combining traditional wisdom with contemporary legal methodologies.",
    icon: "🚀",
  },
  {
    title: "Trusted Reputation",
    description: "Established credibility and respect among peers and clients in Thane.",
    icon: "🏆",
  },
  {
    title: "Professional Team",
    description: "Experienced advocates backed by skilled legal support staff.",
    icon: "👥",
  },
];

// Statistics
export const STATISTICS = [
  { number: "35", label: "Years Experience" },
  { number: "10000+", label: "Cases Handled" },
  { number: "5000+", label: "Satisfied Clients" },
];

// FAQ items
export const FAQ_ITEMS = [
  {
    question: "What areas of law do you specialize in?",
    answer:
      "We specialize in Civil Litigation, Property Matters, Injunction Cases, Land Revenue Matters, Arbitration, MACT Claims, Cooperative Society Matters, and General Legal Consultation.",
  },
  {
    question: "How do I schedule a consultation?",
    answer:
      "You can contact us via our website contact form, email at duduskar.law@gmail.com, or call us at +91 9167570444. We offer both in-person and virtual consultations.",
  },
  {
    question: "What is your fee structure?",
    answer:
      "Our fees are competitive and transparent. We offer various fee arrangements including hourly rates, fixed fees for specific services, and performance-based fees for certain matters.",
  },
  {
    question: "How experienced is your team with MACT claims?",
    answer:
      "Motor Accident Claims are one of our specialties. We have successfully handled over 5000+ MACT cases, securing substantial compensation for clients.",
  },
  {
    question: "Do you handle international dispute resolution?",
    answer:
      "Yes, our team includes expertise in international dispute resolution and arbitration, backed by international legal education and experience.",
  },
  {
    question: "What is your success rate?",
    answer:
      "While each case is unique, our firm has a strong history of favorable outcomes. We're happy to discuss specific case results during a consultation.",
  },
];

// Blog categories
export const BLOG_CATEGORIES = [
  "Civil Litigation",
  "Property Law",
  "Motor Accident Claims",
  "Arbitration",
  "Legal Updates",
  "Case Studies",
];

// Contact form subjects
export const CONTACT_SUBJECTS = [
  "Consultation Request",
  "Case Inquiry",
  "Partnership Opportunity",
  "Website Feedback",
  "Other",
];

// Social media links (optional)
export const SOCIAL_LINKS = [
  // { platform: 'twitter', url: '#' },
  // { platform: 'linkedin', url: '#' },
  // { platform: 'facebook', url: '#' },
];

// SEO keywords
export const SEO_KEYWORDS = [
  "law firm",
  "civil litigation",
  "lawyer in Thane",
  "legal services",
  "motor accident claims",
  "property lawyer",
];
