import { Doctor, Specialty } from './types';

export const DOCTORS: Doctor[] = [
  {
    id: 'dr_vidushi',
    name: 'Dr. Vidushi',
    specialization: 'General & Laparoscopic Surgeon',
    qualification: 'MBBS, MS',
    experience: 8,
    image: 'steth', // Identifier for styling
    bio: 'Specialists in advanced surgical procedures, minimally invasive keyhole surgeries, and abdominal diagnostics. Known for precise surgical execution and patient post-operative care.',
    timings: '10:00 AM - 04:00 PM',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  {
    id: 'dr_prem_prakash_dubey',
    name: 'Dr. Prem Prakash Dubey',
    specialization: 'Eye Specialist',
    qualification: 'MBBS, MS',
    experience: 7,
    image: 'eye',
    bio: 'Dedicated to vision care, advanced cataract microsurgeries, refractive error correction, glaucoma diagnostic care, and comprehensive visual testing.',
    timings: '09:00 AM - 02:00 PM',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  {
    id: 'dr_jitendra_kumar_gupta',
    name: 'Dr. Jitendra Kumar Gupta',
    specialization: 'ENT Specialist',
    qualification: 'MBBS, MS',
    experience: 3,
    image: 'ear',
    bio: 'Specialized in treating disorders related to the Ear, Nose, Throat, head, and neck. Highly skilled in endoscopic sinus procedures and hearing restoratives.',
    timings: '11:00 AM - 05:00 PM',
    days: ['Monday', 'Wednesday', 'Thursday', 'Saturday']
  },
  {
    id: 'dr_kuldeep',
    name: 'Dr. Kuldeep',
    specialization: 'Nephrologist',
    qualification: 'MBBS, MS',
    experience: 5,
    image: 'kidney',
    bio: 'Expert in renal health, managing chronic kidney diseases, dialysis management, acute kidney injury treatments, and hypertensive kidney disease management.',
    timings: '12:00 PM - 06:00 PM',
    days: ['Tuesday', 'Thursday', 'Friday']
  },
  {
    id: 'dr_yogendrapati',
    name: 'Dr. Yogendrapati',
    specialization: 'Pediatrician',
    qualification: 'MBBS, MS',
    experience: 2,
    image: 'baby',
    bio: 'Dedicated child specialist providing expert newborn treatment, childhood immunizations, developmental milestone monitoring, and compassionate pediatric emergency care.',
    timings: '09:30 AM - 03:30 PM',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  {
    id: 'dr_janendra',
    name: 'Dr. Janendra',
    specialization: 'Urologist',
    qualification: 'MBBS, MS',
    experience: 3,
    image: 'uro',
    bio: 'Expert in adult urinary track health, lithotripsy for urinary tract stones, prostate enlargement surgeries, and advanced diagnostic urological assessments.',
    timings: '01:00 PM - 07:00 PM',
    days: ['Monday', 'Wednesday', 'Friday']
  },
  {
    id: 'dr_dhirendra',
    name: 'Dr. Dhirendra Sir',
    specialization: 'Orthopedic Specialist',
    qualification: 'MBBS, MS',
    experience: 2,
    image: 'bone',
    bio: 'Provides specialized medical and surgical care for bone, joint, and ligament disorders, including complex trauma management, joint replacement, and arthritic relief.',
    timings: '10:00 AM - 05:00 PM',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday']
  }
];

export const SPECIALTIES: Specialty[] = [
  {
    id: 'general_surgery',
    title: 'General & Laparoscopic Surgery',
    iconName: 'Activity',
    description: 'Our state-of-the-art surgical wing offers advanced keyhole minimally invasive laparoscopy, general surgical therapies, and trauma care with rapid healing, minimal postoperative soreness, and early hospital dismissals.',
    features: ['Laparoscopic Cholecystectomy', 'Appendectomy', 'Hernia Repairs', 'Trauma Surgery'],
    imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ophthalmology',
    title: 'Eye Department',
    iconName: 'Eye',
    description: 'Under the senior guidance of expert ophthalmologists, our advanced eye wing conducts computer-aided vision testing, sutureless phacoemulsification for cataract, glaucoma management, and digital screenings for retinal disorders to preserve your precious sight.',
    features: ['Cataract Surgeries', 'Refractive Correction', 'Glaucoma Management', 'Diabetic Retinopathy Screening'],
    imageUrl: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ent',
    title: 'ENT (Otolaryngology)',
    iconName: 'Ear',
    description: 'Holistic clinical management and therapeutic treatment for hearing impairments, nasal congestion, tonsillitis, chronic sinusitis, nasal septum deviations, and vocal fold anomalies using modern auditory and endoscopic surgical gear.',
    features: ['Tonsillectomy', 'Sinusitis Treatment', 'Audiometry Diagnostics', 'Septoplasty'],
    imageUrl: 'https://images.unsplash.com/photo-1581594549595-b56bc374860e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'nephrology',
    title: 'Nephrology',
    iconName: 'HeartPulse',
    description: 'Expert diagnostics and professional care for persistent kidney disease, drug-resistant hypertension, and round-the-clock hemodialysis services configured inside exceptionally clean, sterile, and isolated dialysis bays under medical supervision.',
    features: ['Advanced Hemodialysis', 'Chronic Kidney Disease Control', 'Kidney Stone Consultation', 'Renal Biopsy Support'],
    imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'pediatrics',
    title: 'Pediatric Department',
    iconName: 'Baby',
    description: 'Providing friendly, gentle, and child-safe healthcare services including routine childhood vaccinations, development mapping, wellness screenings, nutrition advice, and immediate pediatric casualty panels.',
    features: ['Mandatory Vaccinations', 'Growth & Milestone Screenings', 'Pediatric Infection Care', 'Nutritional Counseling'],
    imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'urology',
    title: 'Urology',
    iconName: 'ShieldAlert',
    description: 'Specialized clinical interventions for kidney stones, prostate blockages, recurring bladder infections, and male organ therapies using modern analytical urodynamics and minimally invasive urosurgical techniques.',
    features: ['Lithotripsy for Stones', 'Prostate Hyperplasia Care', 'UTI Management', 'Uroflowmetry'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'orthopedics',
    title: 'Orthopedics',
    iconName: 'Bone',
    description: 'Total bone health and joint management offering fracture reduction, casting, corrective surgical implants, spinal care, and intensive physical therapy sessions under expert clinical orthopedicians.',
    features: ['Fracture Reduction & Casting', 'Joint Pain Interventions', 'Trauma & Bone Repair', 'Ligament Injury Healing'],
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800'
  }
];

export const WHY_CHOOSE_US = [
  {
    id: 'family_care',
    title: 'Whole Family Care',
    iconName: 'Users',
    description: 'Comprehensive primary and specialized medical attention corresponding to patients of all ages, from newborns to seniors.'
  },
  {
    id: 'door_service',
    title: 'Door to Door Service',
    iconName: 'Truck',
    description: 'Mobile health camps, essential medicine deliveries, and home healthcare aids for families in and around Basti region.'
  },
  {
    id: 'transparent_pricing',
    title: 'Transparent Pricing',
    iconName: 'Receipt',
    description: 'Fixed clinical rates and affordable treatment charges with completely transparent invoices. No shock surcharges.'
  },
  {
    id: 'modern_tech',
    title: 'Hospital Level Technology',
    iconName: 'Cpu',
    description: 'Equipped with digital radiology, modern dialysis units, clean sterile surgical theatres, and computerized lab analysis.'
  },
  {
    id: 'rapid_results',
    title: 'Rapid Results',
    iconName: 'Zap',
    description: 'Ultra-fast laboratory report compilation, efficient slot booking queues, and short patient discharge cycles.'
  },
  {
    id: 'compassion_culture',
    title: 'Compassion Culture',
    iconName: 'Heart',
    description: 'Our core philosophy centers on patient respect, healing touch, high nursing attentiveness, and family comfort.'
  }
];

export const INITIAL_FEEDBACKS = [
  {
    id: 'fb1',
    name: 'Sanjeev Kumar Mishra',
    email: 'sanjeev.basti@gmail.com',
    content: 'The PM-JAY treatment here is completely seamless. They verified my card in under 15 minutes, and Dr. Vidushi did my laparoscopic surgery with extreme care. Wonderful staff and cleanest hospital in Uttar Pradesh!',
    rating: 5,
    date: '2026-05-12'
  },
  {
    id: 'fb2',
    name: 'Renu Tripathi',
    email: 'renu.tri@yahoo.com',
    content: 'Took my father for Cataract review under Dr. Prem Prakash Dubey. The results are amazing! He can see clearly now. The charges were nominal and the staff behaves like family.',
    rating: 5,
    date: '2026-06-02'
  },
  {
    id: 'fb3',
    name: 'Mo. Imran Khan',
    email: 'imrankhan.basti@gmail.com',
    content: 'Navjyoti is indeed a blessing for Basti. High quality dialysis center at super nominal rates. Keep doing this noble work!',
    rating: 5,
    date: '2026-06-15'
  }
];

export const FAQS = [
  {
    q: 'Does Navjyoti Multispeciality Hospital support cashless treatment under PM-JAY (Ayushman Bharat)?',
    a: 'Yes, we are a fully empanelled PM-JAY hospital. Eligible families with an active Ayushman Card receive 100% cashless treatment up to ₹5,00,000 per year for approved treatments, surgeries, and diagnoses.'
  },
  {
    q: 'How do I check if my family is eligible for PM-JAY (Ayushman Bharat)?',
    a: 'You can use our in-app Eligibility Checker below or visit our hospital Help Desk with your Ration Card, Aadhaar Card, or old PM Letter. Our PM-JAY coordinator will verify your status instantly.'
  },
  {
    q: 'What are the visiting hours for consulting specialist doctors?',
    a: 'Daily OPD hours run from 9:00 AM to 7:00 PM. Consultation times vary slightly per specialist (e.g. Dr. Vidushi is available 10:00 AM - 4:00 PM). Emergency services operate 24/7.'
  },
  {
    q: 'Do you offer home sample collection or medicine delivery?',
    a: 'Yes, we provide "Door to Door Service" which includes diagnostic sample collection from your doorstep and express medicine delivery for patients residing in Basti and major nearby spots.'
  }
];
