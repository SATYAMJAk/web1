export const PHONE = "+91 98744 41122";
export const PHONE_HREF = "tel:+919874441122";
export const EMAIL = "info@drdebasischakravarty.com";
export const HOURS_TOP = "Monday - Saturday (8 am - 6 pm)";

export const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/drdebasischakravarty", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/drdebasischakravarty/", icon: "instagram" },
  { label: "YouTube", href: "https://www.youtube.com/@DrDebasisChakravarty", icon: "youtube" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/dr-debasis-chakravarty", icon: "linkedin" },
  { label: "Twitter", href: "https://twitter.com/orthodrdebasis", icon: "twitter" },
] as const;

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Doctor", to: "/about" },
  { label: "Treatments", to: "/treatments" },
  { label: "Presentation & Publication", to: "/publications" },
  { label: "Courses & Seminars", to: "/seminars" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
  { label: "Blog", to: "/blog" },
] as const;

export const DOCTOR = {
  name: "Dr. Debasis Chakravarty",
  degrees: "MBBS, M.S. (Orth), MRCS (Edin), FRCS (Tr & Orth)",
  roles: [
    "Director, Department of Orthopaedics",
    "Orthopaedic & Joint Replacement Surgeon",
    "Senior Consultant – Joint Replacement & Trauma Surgery",
    "Manipal Hospitals, Kolkata",
  ],
};

export const HERO_SLIDES = [
  {
    eyebrow: "Our people and society needs",
    title: "World Class",
    body: "expertise in joint replacement, revision surgery & trauma — at your doorstep",
  },
  {
    eyebrow: "Our people and society needs",
    title: "Best Treatment",
    body: "for an improved quality of life",
  },
  {
    eyebrow: "Our people and society needs",
    title: "Best Treatment",
    body: "for pain relief, improved mobility and function",
  },
];

export const STATS = [
  { value: 32, suffix: "+", label: "Years of Experience" },
  { value: 5100, suffix: "+", label: "Successful Surgeries" },
  { value: 130, suffix: "+", label: "Seminars Attended" },
];

export interface Treatment {
  slug: string;
  title: string;
  short: string;
  image: string;
  points: string[];
}

export const TREATMENTS: Treatment[] = [
  {
    slug: "knee-replacement",
    title: "Total Knee Replacement",
    short:
      "Total knee arthroplasty replaces a worn or damaged knee joint with a precision-engineered prosthesis, easing chronic pain and restoring movement.",
    image: "/images/t-knee.webp",
    points: [
      "Relieves long-standing arthritis pain",
      "Restores walking, stair-climbing and daily activity",
      "Modern implants designed for long-term durability",
    ],
  },
  {
    slug: "hip-replacement",
    title: "Total Hip Replacement",
    short:
      "Total hip replacement substitutes the damaged ball-and-socket joint with durable artificial components for smooth, pain-free motion.",
    image: "/images/gallery-1.jpg",
    points: [
      "Proven solution for advanced hip arthritis and avascular necrosis",
      "Rapid rehabilitation protocols for faster recovery",
      "Restores mobility and independence",
    ],
  },
  {
    slug: "shoulder-replacement",
    title: "Total Shoulder Replacement",
    short:
      "Shoulder arthroplasty resurfaces the damaged parts of the shoulder joint with artificial components to relieve pain and improve function.",
    image: "/images/t-shoulder.webp",
    points: [
      "Treats severe shoulder arthritis and complex fractures",
      "Reduces pain and restores overhead reach",
      "Tailored implant selection for each patient",
    ],
  },
  {
    slug: "elbow-replacement",
    title: "Total Elbow Replacement",
    short:
      "Total elbow arthroplasty swaps a diseased or damaged elbow joint for an artificial one, bringing back comfortable arm movement.",
    image: "/images/t-elbow.webp",
    points: [
      "Relief for rheumatoid and post-traumatic elbow arthritis",
      "Restores bending and rotation of the forearm",
      "Careful soft-tissue balancing for stable results",
    ],
  },
  {
    slug: "revision-arthroplasty",
    title: "Revision Arthroplasty",
    short:
      "Revision surgery corrects failed, loose or worn hip and knee replacements — a reliable second chance at pain-free mobility.",
    image: "/images/t-hip.jpg",
    points: [
      "Specialist care for failed or infected joint replacements",
      "Advanced reconstruction with revision implant systems",
      "Meticulous planning for complex re-do surgery",
    ],
  },
  {
    slug: "reverse-shoulder",
    title: "Reverse Shoulder Replacement",
    short:
      "Reverse shoulder arthroplasty re-engineers the joint for patients with severe rotator-cuff damage or complex arthritis.",
    image: "/images/case-xray.jpg",
    points: [
      "Designed for cuff-deficient shoulders",
      "Restores elevation when conventional replacement cannot",
      "Reliable pain relief and improved function",
    ],
  },
  {
    slug: "fractures-trauma",
    title: "Fractures & Trauma",
    short:
      "Comprehensive trauma care for every kind of fracture and dislocation — from simple breaks to complex, multi-fragment injuries.",
    image: "/images/t-trauma.webp",
    points: [
      "Emergency and planned fracture fixation",
      "Management of complex peri-articular injuries",
      "Guided rehabilitation through full recovery",
    ],
  },
];

export const PUBLICATIONS = [
  {
    authors: "Chakravarty D, Khanna A, Kumar A",
    detail:
      "Post-traumatic osteonecrosis of the distal tibia. Injury Extra, 2007; 38: 262–266.",
  },
  {
    authors: "Chakravarty D, Boyle A, Parker MJ",
    detail:
      "The consequences of blood transfusion for hip fractures — presented at the British Orthopaedic Association meeting.",
  },
  {
    authors: "Bhaskar D, Singla A, Chakravarty D, Raghavan R, Parker MJ",
    detail: "Outcome of femoral neck fracture in the young adult.",
  },
  {
    authors: "Chakravarty D, Bhasker D, Parker MJ",
    detail:
      "Long-term functional outcome in young patients with fracture neck of femur — British Trauma Society Meeting, 2007.",
  },
  {
    authors: "Singla A, Chakravarty D, Bhasker D",
    detail:
      "Panner's Disease — a case report and review of literature. Poster presentation, SICOT meeting.",
  },
  {
    authors: "Tolat A, Chakravarty D",
    detail:
      "Anatomy of the ulnar extensor tendons — 11th Meeting of the Combined Orthopaedic Associations, Sydney.",
  },
  {
    authors: "Bhasker D, Chakravarty D, Singla A",
    detail:
      "Demographics of horse-riding injuries presenting to the Accident & Emergency department of a District General Hospital — British Trauma Society Meeting, 2007.",
  },
  {
    authors: "Chakravarty D, Khanna A, Massraf A",
    detail:
      "Long-term functional outcome of patients with symptomatic clavicular non-union: heavy manual workers vs light workers — Naughton Dunn Meeting, Royal Orthopaedic Hospital, Birmingham, November 2006.",
  },
];

export const SEMINARS = [
  { title: "British Orthopaedic Association Annual Congress", place: "United Kingdom" },
  { title: "British Trauma Society Annual Meeting", place: "United Kingdom" },
  { title: "SICOT World Congress — Poster Presentation", place: "International" },
  { title: "Naughton Dunn Meeting, Royal Orthopaedic Hospital", place: "Birmingham, UK" },
  { title: "Combined Orthopaedic Associations Meeting", place: "Sydney, Australia" },
  { title: "IOACON — Indian Orthopaedic Association Conference", place: "India" },
  { title: "West Bengal Orthopaedic Association Conference", place: "Kolkata, India" },
  { title: "AO Trauma Principles & Advanced Courses", place: "India & Abroad" },
];

export interface CaseStudy {
  title: string;
  category: string;
  image: string;
  summary: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Total shoulder replacement for end-stage arthritis",
    category: "Shoulder",
    image: "/images/t-shoulder.webp",
    summary:
      "A patient with long-standing shoulder arthritis and severely restricted movement regained comfortable overhead function after anatomic total shoulder arthroplasty, with structured physiotherapy through recovery.",
  },
  {
    title: "Revision surgery for a failed hip replacement",
    category: "Revision Arthroplasty",
    image: "/images/gallery-1.jpg",
    summary:
      "A painful, loose hip prosthesis from previous surgery was revised with modern reconstruction components, restoring stable, pain-free walking.",
  },
  {
    title: "Complex fracture care after a riding injury",
    category: "Trauma",
    image: "/images/case-horse.jpg",
    summary:
      "A high-energy fracture sustained in a horse-riding accident was treated with precise fixation and guided rehabilitation, allowing a full return to an active life.",
  },
  {
    title: "Staged bilateral total knee replacement",
    category: "Knee",
    image: "/images/gallery-2.jpg",
    summary:
      "Both knees with advanced arthritis were replaced in staged procedures, transforming a patient who struggled to stand into one who walks independently.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Suprajit Saha",
    text: "I have consulted Dr. Chakravarty for three years, ever since my mother's hip replacement. Her recovery has been wonderful, and his guidance has always been reassuring.",
  },
  {
    name: "Jayasree Choubey",
    text: "Behaviour, treatment and communication — everything was excellent. I am grateful that my mother's knee surgery was done by him.",
  },
  {
    name: "Subrata Haldar",
    text: "I have consulted him for my father, my wife and myself, and for a family friend. Every single experience has been a very good one.",
  },
  {
    name: "Sanjoy Sarker",
    text: "My mother recovered fully from a femur fracture under his care. In my view, he is among the best orthopaedic surgeons in Kolkata.",
  },
  {
    name: "Dhrubajit Chakraborty",
    text: "He operated successfully on both of my knees. Today I can walk easily again — I could not have asked for more.",
  },
  {
    name: "Tarkeshwarnath Singh",
    text: "My wife had her total knee replacement at 57. Before surgery she could barely move without help; now she manages everything on her own.",
  },
];

export const BLOG_POSTS = [
  {
    slug: "hip-replacement-options-kolkata",
    title: "5 Hip Replacement Options in Kolkata: Choosing the Right One",
    image: "/images/blog-1.jpg",
    excerpt:
      "From total hip replacement to partial and revision procedures — a clear guide to the options and how your surgeon helps you choose.",
    date: "June 2024",
  },
  {
    slug: "signs-you-need-hip-specialist",
    title: "5 Signs You Need a Hip Replacement Specialist in Kolkata",
    image: "/images/blog-2.png",
    excerpt:
      "Persistent groin pain, stiffness that limits daily life, pain at night — learn the warning signs that mean it is time to see a specialist.",
    date: "June 2024",
  },
  {
    slug: "hip-replacement-every-age",
    title: "Hip Replacement at Every Age: What Changes and What Doesn't",
    image: "/images/blog-3.jpg",
    excerpt:
      "Age shapes the choice of implant and the goals of surgery — but modern joint replacement helps patients in their 40s and their 80s alike.",
    date: "June 2024",
  },
];

export const GALLERY_IMAGES = [
  { src: "/images/doctor-portrait.jpg", caption: "Dr. Debasis Chakravarty" },
  { src: "/images/doctor-desk.jpg", caption: "In consultation" },
  { src: "/images/doctor-clinic.jpg", caption: "At the clinic" },
  { src: "/images/doctor-standing.webp", caption: "At Manipal Hospitals" },
  { src: "/images/surgery.jpg", caption: "In the operating theatre" },
  { src: "/images/gallery-1.jpg", caption: "Joint replacement workshop" },
  { src: "/images/gallery-2.jpg", caption: "Academic session" },
  { src: "/images/t-hip.jpg", caption: "Knee arthroplasty — X-ray" },
  { src: "/images/case-xray.jpg", caption: "Revision surgery — X-ray" },
];

export const CLINICS = [
  {
    name: "Manipal Hospitals Broadway",
    address:
      "JC-16 & 17, No. 3A, Broadway Rd, opp. to Stadium Gate, Sector 3, Bidhannagar, Kolkata, West Bengal 700106",
    days: "Wednesday, Friday, Saturday",
    time: "1.00 pm to 5.00 pm",
  },
  {
    name: "Manipal Hospitals Dhakuria",
    address:
      "C.I.T Scheme, Gariahat Rd, Dhakuria, LXXII Block A, P-4 & 5, Kolkata, West Bengal 700029",
    days: "Monday, Tuesday, Thursday",
    time: "1.00 pm to 5.00 pm",
  },
];

export const WHY_POINTS = [
  "Specialist Surgery",
  "World Class Expertise",
  "Safe & Trusted",
  "Personalised Care",
];
