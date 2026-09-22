import { Doctor, FamilyMember, Appointment, Prescription, HealthRecord, DuaItem, AppNotification } from '../types';

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Mohammed Ahmed',
    title: 'Dr.',
    degrees: 'MBBS, MD (Internal Medicine)',
    specialty: 'General Physician',
    rating: 4.8,
    reviewCount: 142,
    experienceYears: 15,
    location: 'Anna Nagar, Chennai',
    city: 'Chennai',
    distance: '2.4 km',
    fee: 500,
    photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    isVerified: true,
    isAvailableToday: true,
    availableDays: ['Today', 'Tomorrow', '24 Sep', '25 Sep'],
    gender: 'Male',
    languages: ['English', 'Tamil', 'Urdu'],
    about: 'Dr. Mohammed Ahmed has 15+ years of clinical experience in family medicine, chronic lifestyle disease management, and preventative health. He provides compassionate patient care aligned with holistic wellness and ethical practice.',
    education: [
      'MBBS - Madras Medical College, Chennai',
      'MD (Internal Medicine) - Stanley Medical College',
      'Fellowship in Diabetes Management (RSSDI)'
    ],
    clinic: {
      name: 'Al-Shifa Family Medical Care',
      address: 'Plot 42, 2nd Avenue, Anna Nagar West, Chennai - 600040',
      timings: '09:00 AM - 01:30 PM & 05:00 PM - 09:00 PM',
      phone: '+91 44 2621 8890'
    },
    consultationTypes: ['clinic', 'online'],
    registrationNo: 'TNMC-68421',
    reviews: [
      {
        id: 'rev-1',
        patientName: 'Kareemullah S.',
        rating: 5,
        date: '14 Sep 2026',
        comment: 'Very polite, patient, and knowledgeable doctor. He took time to explain the blood reports in detail and gave practical diet guidance.'
      },
      {
        id: 'rev-2',
        patientName: 'Nasreen B.',
        rating: 4.8,
        date: '02 Sep 2026',
        comment: 'Consulted for my father’s diabetes checkup. Dr. Ahmed answered all our questions with great empathy and adab.'
      }
    ],
    timeSlots: [
      {
        date: 'Today, 22 Sep',
        slots: [
          { time: '09:30 AM', available: true },
          { time: '10:00 AM', available: false },
          { time: '10:30 AM', available: true },
          { time: '11:00 AM', available: true },
          { time: '05:30 PM', available: true },
          { time: '06:00 PM', available: false }
        ]
      },
      {
        date: 'Tomorrow, 23 Sep',
        slots: [
          { time: '09:00 AM', available: true },
          { time: '09:30 AM', available: true },
          { time: '10:00 AM', available: true },
          { time: '10:30 AM', available: true },
          { time: '11:00 AM', available: false },
          { time: '06:00 PM', available: true }
        ]
      },
      {
        date: '24 Sep',
        slots: [
          { time: '09:00 AM', available: true },
          { time: '10:00 AM', available: true },
          { time: '11:00 AM', available: true },
          { time: '05:00 PM', available: true }
        ]
      }
    ]
  },
  {
    id: 'doc-2',
    name: 'Dr. Ayesha Rahman',
    title: 'Dr.',
    degrees: 'MBBS, MS (OBG), DNB',
    specialty: 'Gynecology',
    rating: 4.9,
    reviewCount: 186,
    experienceYears: 16,
    location: 'T. Nagar, Chennai',
    city: 'Chennai',
    distance: '4.1 km',
    fee: 750,
    photoUrl: 'https://images.unsplash.com/photo-1594824813637-b95610816912?auto=format&fit=crop&q=80&w=400',
    isVerified: true,
    isAvailableToday: true,
    availableDays: ['Today', 'Tomorrow', '24 Sep'],
    gender: 'Female',
    languages: ['English', 'Tamil', 'Urdu', 'Hindi'],
    about: 'Senior Consultant Obstetrician & Gynecologist specializing in high-risk pregnancies, maternal health, PCOS management, and adolescent healthcare with deep cultural sensitivity.',
    education: [
      'MBBS - Kilpauk Medical College, Chennai',
      'MS (Obstetrics & Gynecology) - Institute of Maternal & Child Health',
      'Fellowship in Minimal Access Surgery (FMAS)'
    ],
    clinic: {
      name: 'Rahman Women & Child Wellness',
      address: '74 Habibullah Road, T. Nagar, Chennai - 600017',
      timings: '10:00 AM - 02:00 PM & 05:00 PM - 08:30 PM',
      phone: '+91 44 2834 9012'
    },
    consultationTypes: ['clinic', 'online'],
    registrationNo: 'TNMC-59218',
    reviews: [
      {
        id: 'rev-3',
        patientName: 'Shabana Parveen',
        rating: 5,
        date: '18 Sep 2026',
        comment: 'Dr. Ayesha is an absolute blessing. Her calm demeanor during my prenatal consultations put all my anxieties at ease.'
      }
    ],
    timeSlots: [
      {
        date: 'Today, 22 Sep',
        slots: [
          { time: '10:30 AM', available: true },
          { time: '11:00 AM', available: false },
          { time: '11:30 AM', available: true },
          { time: '05:30 PM', available: true }
        ]
      },
      {
        date: 'Tomorrow, 23 Sep',
        slots: [
          { time: '10:00 AM', available: true },
          { time: '10:30 AM', available: true },
          { time: '11:30 AM', available: true },
          { time: '06:00 PM', available: true }
        ]
      }
    ]
  },
  {
    id: 'doc-3',
    name: 'Dr. Tariq Mansoor',
    title: 'Dr.',
    degrees: 'MBBS, MD, DM (Cardiology)',
    specialty: 'Cardiology',
    rating: 4.9,
    reviewCount: 210,
    experienceYears: 18,
    location: 'Greams Road, Chennai',
    city: 'Chennai',
    distance: '3.6 km',
    fee: 900,
    photoUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    isVerified: true,
    isAvailableToday: false,
    availableDays: ['Tomorrow', '24 Sep', '25 Sep'],
    gender: 'Male',
    languages: ['English', 'Tamil', 'Hindi'],
    about: 'Interventional Cardiologist with extensive experience in coronary interventions, hypertension management, preventive cardiology, and post-angioplasty care.',
    education: [
      'MBBS - Sri Ramachandra Medical College',
      'MD (General Medicine) - AIIMS New Delhi',
      'DM (Cardiology) - Madras Medical College'
    ],
    clinic: {
      name: 'Heart & Vascular Specialty Clinic',
      address: '21 Greams Lane, Thousand Lights, Chennai - 600006',
      timings: '09:00 AM - 01:00 PM',
      phone: '+91 44 2829 4433'
    },
    consultationTypes: ['clinic', 'online'],
    registrationNo: 'TNMC-49182',
    reviews: [
      {
        id: 'rev-4',
        patientName: 'Syed Jafar',
        rating: 5,
        date: '10 Sep 2026',
        comment: 'One of the finest cardiologists in South India. Clear explanations without ordering unnecessary tests.'
      }
    ],
    timeSlots: [
      {
        date: 'Tomorrow, 23 Sep',
        slots: [
          { time: '09:30 AM', available: true },
          { time: '10:00 AM', available: true },
          { time: '10:30 AM', available: false },
          { time: '11:30 AM', available: true }
        ]
      }
    ]
  },
  {
    id: 'doc-4',
    name: 'Dr. Zainab Farooq',
    title: 'Dr.',
    degrees: 'MBBS, DCH, DNB (Pediatrics)',
    specialty: 'Pediatrics',
    rating: 4.8,
    reviewCount: 165,
    experienceYears: 12,
    location: 'Indiranagar, Bengaluru',
    city: 'Bengaluru',
    distance: '1.8 km',
    fee: 600,
    photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    isVerified: true,
    isAvailableToday: true,
    availableDays: ['Today', 'Tomorrow', '24 Sep'],
    gender: 'Female',
    languages: ['English', 'Urdu', 'Hindi'],
    about: 'Dedicated pediatrician known for gentle child interactions, developmental screening, pediatric nutrition, and comprehensive immunization tracking.',
    education: [
      'MBBS - Bangalore Medical College',
      'DCH - St. John’s Medical College',
      'DNB Pediatrics - National Board of Examinations'
    ],
    clinic: {
      name: 'Little Sprouts Child Clinic',
      address: '100ft Road, Indiranagar, Bengaluru - 560038',
      timings: '10:00 AM - 01:00 PM & 04:30 PM - 08:00 PM',
      phone: '+91 80 2525 1100'
    },
    consultationTypes: ['clinic', 'online'],
    registrationNo: 'KMC-77312',
    reviews: [
      {
        id: 'rev-5',
        patientName: 'Arif Hussain',
        rating: 5,
        date: '08 Sep 2026',
        comment: 'My 4-year-old son normally cries at doctor visits, but Dr. Zainab was so caring and patient with him.'
      }
    ],
    timeSlots: [
      {
        date: 'Today, 22 Sep',
        slots: [
          { time: '11:00 AM', available: true },
          { time: '11:30 AM', available: true },
          { time: '05:00 PM', available: false },
          { time: '05:30 PM', available: true }
        ]
      }
    ]
  },
  {
    id: 'doc-5',
    name: 'Dr. Bilal Farhan',
    title: 'Dr.',
    degrees: 'BDS, MDS (Orthodontics)',
    specialty: 'Dental',
    rating: 4.7,
    reviewCount: 94,
    experienceYears: 10,
    location: 'Banjara Hills, Hyderabad',
    city: 'Hyderabad',
    distance: '3.2 km',
    fee: 450,
    photoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    isVerified: true,
    isAvailableToday: true,
    availableDays: ['Today', 'Tomorrow', '25 Sep'],
    gender: 'Male',
    languages: ['English', 'Urdu', 'Telugu', 'Hindi'],
    about: 'Specialist in painless dentistry, aesthetic aligners, root canal restorations, and pediatric dental hygiene.',
    education: [
      'BDS - Osmania Dental College',
      'MDS - Government Dental College Hyderabad'
    ],
    clinic: {
      name: 'Pearl Dental Care Studio',
      address: 'Road No. 12, Banjara Hills, Hyderabad - 500034',
      timings: '10:00 AM - 08:00 PM',
      phone: '+91 40 2333 4455'
    },
    consultationTypes: ['clinic'],
    registrationNo: 'TSDC-22891',
    reviews: [
      {
        id: 'rev-6',
        patientName: 'Mohsin Khan',
        rating: 4.8,
        date: '28 Aug 2026',
        comment: 'Completely painless tooth filling. Clean modern setup with great hygiene protocols.'
      }
    ],
    timeSlots: [
      {
        date: 'Today, 22 Sep',
        slots: [
          { time: '02:00 PM', available: true },
          { time: '03:00 PM', available: true },
          { time: '04:30 PM', available: true }
        ]
      }
    ]
  },
  {
    id: 'doc-6',
    name: 'Dr. Sameera Banu',
    title: 'Dr.',
    degrees: 'MBBS, MD (Dermatology, Venereology & Leprosy)',
    specialty: 'Dermatology',
    rating: 4.9,
    reviewCount: 154,
    experienceYears: 14,
    location: 'R.S. Puram, Coimbatore',
    city: 'Coimbatore',
    distance: '2.9 km',
    fee: 650,
    photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    isVerified: true,
    isAvailableToday: false,
    availableDays: ['Tomorrow', '24 Sep'],
    gender: 'Female',
    languages: ['English', 'Tamil', 'Malayalam'],
    about: 'Expert in clinical dermatology, eczema, psoriasis, autoimmune skin disorders, and safe therapeutic skincare solutions.',
    education: [
      'MBBS - Coimbatore Medical College',
      'MD - Stanley Medical College'
    ],
    clinic: {
      name: 'DermaCare Speciality Clinic',
      address: 'DB Road, R.S. Puram, Coimbatore - 641002',
      timings: '04:00 PM - 08:30 PM',
      phone: '+91 422 254 7890'
    },
    consultationTypes: ['clinic', 'online'],
    registrationNo: 'TNMC-61094',
    reviews: [
      {
        id: 'rev-7',
        patientName: 'Farhana J.',
        rating: 5,
        date: '04 Sep 2026',
        comment: 'Understood my skin issue immediately and gave minimal effective medicines.'
      }
    ],
    timeSlots: [
      {
        date: 'Tomorrow, 23 Sep',
        slots: [
          { time: '04:30 PM', available: true },
          { time: '05:00 PM', available: true },
          { time: '06:00 PM', available: false }
        ]
      }
    ]
  }
];

export const SPECIALTIES = [
  'All',
  'General',
  'Cardiology',
  'Pediatrics',
  'Gynecology',
  'Dermatology',
  'Dental'
];

export const CITIES = ['Chennai', 'Bengaluru', 'Hyderabad', 'Coimbatore'] as const;

export const MOCK_FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: 'fam-1',
    name: 'Ahmed Mohammed',
    relation: 'Myself',
    age: 36,
    gender: 'Male',
    bloodGroup: 'B+ Positive',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    allergies: ['Penicillin'],
    chronicConditions: ['Mild Hypertension']
  },
  {
    id: 'fam-2',
    name: 'Fatima Ahmed',
    relation: 'Wife',
    age: 32,
    gender: 'Female',
    bloodGroup: 'O+ Positive',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    allergies: ['None reported'],
    chronicConditions: ['Vitamin D Deficiency']
  },
  {
    id: 'fam-3',
    name: 'Ayaan Ahmed',
    relation: 'Son',
    age: 6,
    gender: 'Male',
    bloodGroup: 'B+ Positive',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    allergies: ['Peanuts'],
    chronicConditions: ['Childhood Asthma (Mild)']
  },
  {
    id: 'fam-4',
    name: 'Maryam Ahmed',
    relation: 'Daughter',
    age: 3,
    gender: 'Female',
    bloodGroup: 'O+ Positive',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    allergies: ['None reported'],
    chronicConditions: ['None']
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    doctorId: 'doc-2',
    doctorName: 'Dr. Ayesha Rahman',
    doctorSpecialty: 'Gynecologist',
    doctorPhoto: 'https://images.unsplash.com/photo-1594824813637-b95610816912?auto=format&fit=crop&q=80&w=400',
    doctorDegrees: 'MBBS, MS (OBG)',
    doctorClinic: 'Rahman Women & Child Wellness, T. Nagar',
    patientId: 'fam-2',
    patientName: 'Fatima Ahmed',
    relation: 'Wife',
    date: 'Tomorrow, 23 Sep',
    time: '10:30 AM',
    consultationType: 'Online Consultation',
    status: 'upcoming',
    fee: 750,
    paymentMethod: 'UPI / Google Pay',
    meetingLink: 'https://telehealth.shifacare.com/room/apt-1'
  },
  {
    id: 'apt-2',
    doctorId: 'doc-1',
    doctorName: 'Dr. Mohammed Ahmed',
    doctorSpecialty: 'General Physician',
    doctorPhoto: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    doctorDegrees: 'MBBS, MD',
    doctorClinic: 'Al-Shifa Family Medical Care, Anna Nagar',
    patientId: 'fam-1',
    patientName: 'Ahmed Mohammed',
    relation: 'Myself',
    date: '12 Sep 2026',
    time: '11:00 AM',
    consultationType: 'Clinic Visit',
    status: 'completed',
    fee: 500,
    paymentMethod: 'Card Payment',
    prescriptionId: 'rx-1'
  },
  {
    id: 'apt-3',
    doctorId: 'doc-4',
    doctorName: 'Dr. Zainab Farooq',
    doctorSpecialty: 'Pediatrician',
    doctorPhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    doctorDegrees: 'MBBS, DCH',
    doctorClinic: 'Little Sprouts Child Clinic',
    patientId: 'fam-3',
    patientName: 'Ayaan Ahmed',
    relation: 'Son',
    date: '28 Aug 2026',
    time: '04:00 PM',
    consultationType: 'Clinic Visit',
    status: 'completed',
    fee: 600,
    paymentMethod: 'UPI'
  }
];

export const MOCK_PRESCRIPTION: Prescription = {
  id: 'rx-1',
  appointmentId: 'apt-2',
  doctorId: 'doc-1',
  doctorName: 'Dr. Mohammed Ahmed',
  doctorSpecialty: 'General Physician',
  doctorRegistration: 'TNMC-68421',
  clinicName: 'Al-Shifa Family Medical Care',
  clinicAddress: 'Plot 42, 2nd Avenue, Anna Nagar West, Chennai - 600040',
  patientName: 'Ahmed Mohammed',
  patientAge: 36,
  patientGender: 'Male',
  date: '12 Sep 2026',
  diagnosis: 'Acute Upper Respiratory Tract Viral Infection & Mild Seasonal Rhinitis',
  vitals: {
    bp: '122/78 mmHg',
    pulse: '74 bpm',
    temp: '99.1 °F',
    weight: '72 kg'
  },
  medicines: [
    {
      name: 'Tab. Paracetamol',
      dosage: '650 mg',
      frequency: '1-0-1',
      timing: 'After Food',
      duration: '3 Days',
      instructions: 'Take when fever or body ache exceeds 99.5°F. Max 3 tablets daily.'
    },
    {
      name: 'Tab. Levocetirizine',
      dosage: '5 mg',
      frequency: '0-0-1',
      timing: 'After Food',
      duration: '5 Days',
      instructions: 'Take before bedtime for nasal congestion and sneezing.'
    },
    {
      name: 'Steam Inhalation with Menthol',
      dosage: 'Twice daily',
      frequency: 'Morning & Night',
      timing: 'With Food',
      duration: '4 Days',
      instructions: 'Inhale steam for 8-10 minutes.'
    },
    {
      name: 'Saline Nasal Drops',
      dosage: '2 drops per nostril',
      frequency: '3 times daily',
      timing: 'Before Food',
      duration: '5 Days',
      instructions: 'Helps clear nasal passages naturally.'
    }
  ],
  advice: [
    'Drink plenty of warm fluids (herbal tea, warm water with lemon and honey).',
    'Get adequate restorative sleep (7-8 hours).',
    'Avoid ice cold beverages and dusty environments for 4-5 days.'
  ],
  followUp: 'Review after 5 days if symptoms persist or fever reoccurs.'
};

export const MOCK_HEALTH_RECORDS: HealthRecord[] = [
  {
    id: 'rec-1',
    familyMemberId: 'fam-1',
    patientName: 'Ahmed Mohammed',
    title: 'Dr. Ahmed Prescription - Viral Infection',
    category: 'Prescriptions',
    doctorOrLab: 'Al-Shifa Family Medical Care',
    date: '12 Sep 2026',
    fileSize: '412 KB',
    summary: 'Prescription for seasonal viral rhinitis and paracetamol schedule.',
    prescriptionId: 'rx-1'
  },
  {
    id: 'rec-2',
    familyMemberId: 'fam-1',
    patientName: 'Ahmed Mohammed',
    title: 'Comprehensive Lipid & Fasting Blood Sugar Report',
    category: 'Lab Reports',
    doctorOrLab: 'Metropolis Diagnostics Chennai',
    date: '10 Sep 2026',
    fileSize: '1.2 MB',
    summary: 'Fasting glucose 94 mg/dL (Normal). Total Cholesterol 182 mg/dL. Triglycerides normal.'
  },
  {
    id: 'rec-3',
    familyMemberId: 'fam-3',
    patientName: 'Ayaan Ahmed',
    title: 'Pediatric Immunization Card & MMR Booster',
    category: 'Vaccination',
    doctorOrLab: 'Apollo Childrens Hospital',
    date: '15 Jul 2026',
    fileSize: '890 KB',
    summary: 'Age 5 MMR 2nd dose and DTaP booster completed as per IAP schedule.'
  },
  {
    id: 'rec-4',
    familyMemberId: 'fam-2',
    patientName: 'Fatima Ahmed',
    title: 'Pelvic Ultrasound Sonography Report',
    category: 'Medical Documents',
    doctorOrLab: 'Medall Healthcare Scans',
    date: '04 Aug 2026',
    fileSize: '2.4 MB',
    summary: 'Normal anatomical scan, no ovarian cysts or structural abnormalities.'
  },
  {
    id: 'rec-5',
    familyMemberId: 'fam-1',
    patientName: 'Ahmed Mohammed',
    title: 'Pre-Hajj Health Clearance Certificate',
    category: 'Medical Documents',
    doctorOrLab: 'Government Stanley Hospital',
    date: '18 May 2026',
    fileSize: '650 KB',
    summary: 'Medical fitness certificate, ACWY Meningococcal vaccine stamped.'
  }
];

export const MOCK_DUAS: DuaItem[] = [
  {
    id: 'dua-1',
    category: 'Illness',
    title: 'Dua for Healing from Pain & Illness',
    arabic: 'اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ، اشْفِهِ وَأَنْتَ الشَّافِي، لاَ شِفَاءَ إِلاَّ شِفَاؤُكَ، شِفَاءً لاَ يُغَادِرُ سَقَمًا',
    arabicText: 'اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ، اشْفِهِ وَأَنْتَ الشَّافِي، لاَ شِفَاءَ إِلاَّ شِفَاؤُكَ، شِفَاءً لاَ يُغَادِرُ سَقَمًا',
    transliteration: 'Allahumma Rabban-nas, adh-hibil-ba\'s, ishfi wa Antash-Shafi, la shifa\'a illa shifa\'uk, shifa\'an la yughadiru saqama.',
    meaningEn: 'O Allah, Lord of mankind, remove the affliction. Grant healing, for You are the Healer. There is no healing but Yours, a healing that leaves behind no ailment.',
    englishMeaning: 'O Allah, Lord of mankind, remove the affliction. Grant healing, for You are the Healer. There is no healing but Yours, a healing that leaves behind no ailment.',
    meaningTamil: 'மனிதர்களின் இரட்சகனான அல்லாஹ்வே! இந்த நோயைப் போக்கிவிடுவாயாக! குணப்படுத்துவாயாக! நீயே குணமளிப்பவன். உனது நிவாரணத்தைத் தவிர வேறு நிவாரணம் எதுவுமில்லை. எந்த நோயையும் விட்டுவைக்காத நிவாரணத்தை அருள்வாயாக.',
    tamilMeaning: 'மனிதர்களின் இரட்சகனான அல்லாஹ்வே! இந்த நோயைப் போக்கிவிடுவாயாக! குணப்படுத்துவாயாக! நீயே குணமளிப்பவன். உனது நிவாரணத்தைத் தவிர வேறு நிவாரணம் எதுவுமில்லை. எந்த நோயையும் விட்டுவைக்காத நிவாரணத்தை அருள்வாயாக.',
    source: 'Sahih al-Bukhari (5743), Sahih Muslim (2191)',
    virtue: 'Recited by Prophet Muhammad (ﷺ) over the sick when visiting them.',
    isFavorite: true,
    recommendedCount: 7
  },
  {
    id: 'dua-2',
    category: 'Pain in Body',
    title: 'Dua When Feeling Pain in Any Part of the Body',
    arabic: 'بِسْمِ اللَّهِ (ثَلاَثًا) - أَعُوذُ بِاللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ (سَبْعَ مَرَّاتٍ)',
    arabicText: 'بِسْمِ اللَّهِ (ثَلاَثًا) - أَعُوذُ بِاللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ (سَبْعَ مَرَّاتٍ)',
    transliteration: 'Bismillah (3 times) — A\'udhu billahi wa qudratihi min sharri ma ajidu wa uhadhir (7 times).',
    meaningEn: 'In the name of Allah (3 times). I seek refuge in Allah and in His power from the evil of what I feel and what I fear (7 times).',
    englishMeaning: 'In the name of Allah (3 times). I seek refuge in Allah and in His power from the evil of what I feel and what I fear (7 times).',
    meaningTamil: 'அல்லாஹ்வின் பெயரால் (3 முறை) — நான் உணரும் மற்றும் அஞ்சும் தீங்கிலிருந்து அல்லாஹ்வின் பேராற்றலையும் அவனையும் கொண்டு அடைக்கலம் தேடுகிறேன் (7 முறை).',
    tamilMeaning: 'அல்லாஹ்வின் பெயரால் (3 முறை) — நான் உணரும் மற்றும் அஞ்சும் தீங்கிலிருந்து அல்லாஹ்வின் பேராற்றலையும் அவனையும் கொண்டு அடைக்கலம் தேடுகிறேன் (7 முறை).',
    source: 'Sahih Muslim (2202)',
    virtue: 'Place your right hand on the area causing pain and recite as taught by the Prophet (ﷺ) to Uthman b. Abi al-\'As.',
    isFavorite: true,
    recommendedCount: 7
  },
  {
    id: 'dua-3',
    category: 'Visiting the Sick',
    title: 'Dua When Visiting an Ill Person',
    arabic: 'أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ (سَبْعَ مَرَّاتٍ)',
    arabicText: 'أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ (سَبْعَ مَرَّاتٍ)',
    transliteration: 'As\'alullahal-\'Adheema Rabbal-\'Arshil-\'Adheemi an yashfiyak (7 times).',
    meaningEn: 'I ask Allah the Almighty, Lord of the Mighty Throne, to heal you (7 times).',
    englishMeaning: 'I ask Allah the Almighty, Lord of the Mighty Throne, to heal you (7 times).',
    meaningTamil: 'மகத்தான அரியணையின் அதிபதியான கண்ணியமிக்க அல்லாஹ்விடம் உங்களை குணப்படுத்துமாறு வேண்டுகிறேன் (7 முறை).',
    tamilMeaning: 'மகத்தான அரியணையின் அதிபதியான கண்ணியமிக்க அல்லாஹ்விடம் உங்களை குணப்படுத்துமாறு வேண்டுகிறேன் (7 முறை).',
    source: 'Sunan Abi Dawud (3106), Jami` at-Tirmidhi (2083) - Sahih',
    virtue: 'The Prophet (ﷺ) said: No Muslim visits a sick person whose time has not come and recites this seven times, except that Allah will cure him.',
    isFavorite: false,
    recommendedCount: 7
  },
  {
    id: 'dua-4',
    category: 'Anxiety & Distress',
    title: 'Dua for Relief from Distress and Medical Anxiety',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
    arabicText: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
    transliteration: 'Allahumma inni a\'udhu bika minal-hammi wal-hazan, wal-\'ajzi wal-kasal, wal-bukhli wal-jubn, wa dala\'id-dayni wa ghalabatir-rijal.',
    meaningEn: 'O Allah, I seek refuge in You from anxiety and grief, weakness and laziness, miserliness and cowardice, the burden of debts and being overpowered by men.',
    englishMeaning: 'O Allah, I seek refuge in You from anxiety and grief, weakness and laziness, miserliness and cowardice, the burden of debts and being overpowered by men.',
    meaningTamil: 'இறைவா! கவலையையும் துக்கத்தையும் விட்டும், இயலாமையையும் சோம்பலையும் விட்டும், கஞ்சத்தனத்தையும் கோழைத்தனத்தையும் விட்டும், கடனின் சுமையையும் மக்களின் ஆதிக்கத்தையும் விட்டும் உன்னிடம் அடைக்கலம் கோருகிறேன்.',
    tamilMeaning: 'இறைவா! கவலையையும் துக்கத்தையும் விட்டும், இயலாமையையும் சோம்பலையும் விட்டும், கஞ்சத்தனத்தையும் கோழைத்தனத்தையும் விட்டும், கடனின் சுமையையும் மக்களின் ஆதிக்கத்தையும் விட்டும் உன்னிடம் அடைக்கலம் கோருகிறேன்.',
    source: 'Sahih al-Bukhari (2893)',
    virtue: 'One of the most frequent comprehensive supplications of the Prophet (ﷺ).',
    isFavorite: true,
    recommendedCount: 3
  },
  {
    id: 'dua-5',
    category: 'Before Surgery',
    title: 'Supplication of Prophet Ayyub (Job) in Extreme Distress',
    arabic: 'أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ',
    arabicText: 'أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ',
    transliteration: 'Anni massaniyad-durru wa Anta Arhamur-Rahimin.',
    meaningEn: 'Indeed, adversity has touched me, and You are the Most Merciful of the merciful.',
    englishMeaning: 'Indeed, adversity has touched me, and You are the Most Merciful of the merciful.',
    meaningTamil: 'மெய்யாகவே எனக்கு பெரும் துன்பம் பீடித்துவிட்டது; மேலும் நீயோ கருணையாளர்களிலெல்லாம் மகா கருணையாளனாக இருக்கின்றாய்.',
    tamilMeaning: 'மெய்யாகவே எனக்கு பெரும் துன்பம் பீடித்துவிட்டது; மேலும் நீயோ கருணையாளர்களிலெல்லாம் மகா கருணையாளனாக இருக்கின்றாய்.',
    source: 'Surah Al-Anbiya (21:83)',
    virtue: 'The supplication made by Prophet Ayyub (peace be upon him) which Allah answered by removing all his suffering.',
    isFavorite: false,
    recommendedCount: 7
  },
  {
    id: 'dua-6',
    category: 'Illness',
    title: 'Gratitude upon Recovery and Relief from Pain',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي وَرَدَّ عَلَيَّ رُوحِي وَأَذِنَ لِي بِذِكْرِهِ',
    arabicText: 'الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي وَرَدَّ عَلَيَّ رُوحِي وَأَذِنَ لِي بِذِكْرِهِ',
    transliteration: 'Alhamdulillahil-ladhi \'afani fi jasadi wa radda \'alayya ruhi wa adhina li bidhikrih.',
    meaningEn: 'All praise is due to Allah Who healed my body, restored my spirit to me, and permitted me to remember Him.',
    englishMeaning: 'All praise is due to Allah Who healed my body, restored my spirit to me, and permitted me to remember Him.',
    meaningTamil: 'எனது உடலுக்கு நலம் அளித்து, எனது உயிரை என்னிடம் திருப்பித் தந்து, தன்னை நினைவுகூர எனக்கு அனுமதி அளித்த அல்லாஹ்வுக்கே அனைத்து புகழும்.',
    tamilMeaning: 'எனது உடலுக்கு நலம் அளித்து, எனது உயிரை என்னிடம் திருப்பித் தந்து, தன்னை நினைவுகூர எனக்கு அனுமதி அளித்த அல்லாஹ்வுக்கே அனைத்து புகழும்.',
    source: 'Jami` at-Tirmidhi (3401)',
    virtue: 'Expressing shukr (gratitude) seals healing with divine blessing and protection.',
    isFavorite: false,
    recommendedCount: 3
  }
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    category: 'Appointments',
    type: 'appointment',
    title: 'Consultation Reminder Tomorrow',
    message: 'Your online appointment with Dr. Ayesha Rahman is tomorrow at 10:30 AM.',
    timestamp: '10 mins ago',
    isRead: false,
    actionRoute: 'main'
  },
  {
    id: 'notif-2',
    category: 'Health',
    type: 'prescription',
    title: 'Digital Prescription Available',
    message: 'Dr. Mohammed Ahmed uploaded your digital prescription for viral rhinitis.',
    timestamp: '2 hours ago',
    isRead: false,
    actionRoute: 'health_records'
  },
  {
    id: 'notif-3',
    category: 'Islamic Wellness',
    type: 'wellness',
    title: 'New Ramadan Health Guide',
    message: 'Hydration and medication timing protocols for upcoming fasting season.',
    timestamp: '1 day ago',
    isRead: true,
    actionRoute: 'ramadan_health'
  },
  {
    id: 'notif-4',
    category: 'Islamic Wellness',
    type: 'dua',
    title: 'Morning Dua Reminder',
    message: '“Allahumma Rabban-nas, adh-hibil-ba\'s...” Seek shifa for your family today.',
    timestamp: '2 days ago',
    isRead: true
  }
];

export const POPULAR_SEARCH_TERMS = [
  'Dr. Mohammed Ahmed',
  'Cardiologist',
  'Pediatrician',
  'Gynecologist',
  'Dental Checkup',
  'Ramadan Health',
  'Duas for Healing',
  'High Blood Pressure',
  'Hajj Vaccine'
];

export const MOCK_APPOINTMENTS = INITIAL_APPOINTMENTS;
export const MOCK_PRESCRIPTIONS = [MOCK_PRESCRIPTION];

export const RAMADAN_HEALTH_GUIDES = [
  {
    id: 'ramadan-1',
    icon: 'diabetes' as const,
    category: 'Diabetes & Sugar Management',
    title: 'Fasting Safely with Type 1 & Type 2 Diabetes',
    summary: 'Essential glucose monitoring thresholds, insulin dosage adjustments with your physician, and signs requiring immediate breaking of the fast.',
    details: 'Patients with poorly controlled HbA1c (>8.5%) or brittle diabetes are advised religious exemption. For stable Type 2, shift metformin doses to Iftar and Suhoor as guided by your doctor. Check blood glucose at 12 PM, 4 PM, and before Iftar.',
    tips: [
      'Shift your main metformin/oral doses to Iftar and take reduced doses at Suhoor as prescribed.',
      'Check blood sugar at 12:00 PM, 4:00 PM, and 2 hours after Iftar (blood fingerprick does NOT invalidate the fast).',
      'Avoid high-glycemic desserts (gulab jamun, jalebi) right after breaking fast with dates and water.'
    ],
    dangerSigns: 'Blood glucose below 70 mg/dL (3.9 mmol/L) or above 300 mg/dL (16.6 mmol/L), severe shakiness, cold sweat, or confusion.'
  },
  {
    id: 'ramadan-2',
    icon: 'meds' as const,
    category: 'Hypertension & Heart Health',
    title: 'Blood Pressure Medication Timings during Fasting',
    summary: 'How to reschedule once-daily vs twice-daily anti-hypertensive drugs without causing postural hypotension.',
    details: 'Convert morning ACE inhibitors or Calcium Channel Blockers to post-Iftar or post-Taraweeh, provided blood pressure readings remain within 120-135/80 mmHg. Avoid excessive salty samosas and papadums.',
    tips: [
      'Take once-daily blood pressure tablets 30 minutes after Iftar meal.',
      'Keep systolic blood pressure between 120-135 mmHg; check BP seated and standing to rule out orthostatic dizziness.',
      'Reduce fried snacks, salty pickles, and sodium-dense processed foods.'
    ],
    dangerSigns: 'Systolic blood pressure exceeding 180 mmHg or dropping below 95 mmHg with severe dizziness or fainting.'
  },
  {
    id: 'ramadan-3',
    icon: 'water' as const,
    category: 'Suhoor & Iftar Hydration',
    title: 'Optimal Fluid Intake: Preventing Dehydration and Kidney Strain',
    summary: 'Distributing 2.5 to 3 liters of fluids between Sunset and Fajr while avoiding caffeine and refined sugars.',
    details: 'Gulping liters of water right at Suhoor causes rapid excretion. Instead, drink 2 glasses at Iftar, 1 glass every hour until bedtime, and 2 glasses at Suhoor. Incorporate coconut water, buttermilk, and water-dense fruits.',
    tips: [
      'Drink 2 glasses of room temperature water at Iftar, 1 glass hourly between Isha and bedtime, and 2 glasses at Suhoor.',
      'Include natural electrolyte drinks like tender coconut water, chaas (salted buttermilk), and barley water.',
      'Avoid caffeinated black tea and sodas at Suhoor which trigger diuretic fluid loss.'
    ],
    dangerSigns: 'Dark amber urine, severe dry mouth, extreme lethargy, or inability to produce urine for more than 12 hours.'
  },
  {
    id: 'ramadan-4',
    icon: 'pregnancy' as const,
    category: 'Pregnancy & Nursing',
    title: 'Maternal and Fetal Health Guidelines during Ramadan',
    summary: 'Clinical advice from Muslim obstetricians regarding fasting permissions, dehydration risks, and infant growth.',
    details: 'Expectant mothers in the 1st and 3rd trimesters, or those with gestational diabetes, low amniotic fluid, or preeclampsia, are strongly advised to utilize the Sharia allowance to postpone fasting.',
    tips: [
      'Consult your obstetrician before Ramadan for a fetal growth ultrasound and maternal hemoglobin review.',
      'Ensure high-protein Suhoor with complex carbohydrates (oats, eggs, chia seeds, almonds).',
      'Monitor fetal kick counts closely in the late afternoon before Iftar.'
    ],
    dangerSigns: 'Marked reduction in fetal movements, uterine contractions, maternal vomiting, or severe dizzy spells.'
  }
];


export const HAJJ_UMRAH_CHECKLIST = [
  {
    id: 'hajj-1',
    category: 'Vaccination',
    title: 'Meningococcal Quadrivalent (ACYW135)',
    detail: 'Mandatory for all pilgrims entering KSA. Must be administered at least 10 days before departure with official WHO yellow card.',
    mandatory: true
  },
  {
    id: 'hajj-2',
    category: 'Vaccination',
    title: 'Seasonal Influenza & COVID-19 Booster',
    detail: 'Highly recommended due to massive crowding during Tawaf and Jamarat stoning.',
    mandatory: false
  },
  {
    id: 'hajj-3',
    category: 'Physical Prep',
    title: 'Daily 5km Walking Conditioning',
    detail: 'Hajj involves 15-20 km of walking daily in peak heat. Start brisk walking 4-6 weeks prior to build cardiovascular stamina.',
    mandatory: true
  },
  {
    id: 'hajj-4',
    category: 'Medical Kit',
    title: 'Chronic Prescriptions & Letter',
    detail: 'Carry a 45-day supply of your doctor-prescribed medications in original packaging along with a signed English medical certificate.',
    mandatory: true
  },
  {
    id: 'hajj-5',
    category: 'Ihram Care',
    title: 'Unscented Petroleum Jelly / Barrier Cream',
    detail: 'Essential for preventing inner-thigh chafing and groin rashes during long walks in Ihram garments without violating perfume prohibitions.',
    mandatory: false
  },
  {
    id: 'hajj-6',
    category: 'Hydration',
    title: 'Oral Rehydration Salts (ORS) & Sun Umbrella',
    detail: 'Makkah temperatures regularly surpass 42°C. Carry an umbrella and consume ORS packets to avoid fatal heat exhaustion.',
    mandatory: true
  }
];

