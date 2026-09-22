export type MainTab = 'home' | 'doctors' | 'appointments' | 'health' | 'profile';

export type ScreenView = 
  | 'splash'
  | 'onboarding'
  | 'auth'
  | 'main'
  | 'doctor_detail'
  | 'book_appointment'
  | 'booking_confirmation'
  | 'booking_success'
  | 'consultation_call'
  | 'online_consultation'
  | 'family_members'
  | 'family_health'
  | 'family_member_detail'
  | 'health_records'
  | 'prescription_detail'
  | 'lab_report_detail'
  | 'wellness_hub'
  | 'duas'
  | 'duas_list'
  | 'ramadan_health'
  | 'hajj_health'
  | 'hajj_umrah_health'
  | 'notifications'
  | 'search'
  | 'saved_doctors'
  | 'favorite_duas'
  | 'personal_info'
  | 'language_settings';

export interface Doctor {
  id: string;
  name: string;
  title: string;
  degrees: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  location: string;
  city: 'Chennai' | 'Bengaluru' | 'Hyderabad' | 'Coimbatore';
  distance: string;
  fee: number;
  photoUrl: string;
  isVerified: boolean;
  isAvailableToday: boolean;
  availableDays: string[];
  gender: 'Male' | 'Female';
  languages: string[];
  about: string;
  education: string[];
  clinic: {
    name: string;
    address: string;
    timings: string;
    phone: string;
  };
  consultationTypes: ('online' | 'clinic')[];
  registrationNo: string;
  reviews: {
    id: string;
    patientName: string;
    rating: number;
    date: string;
    comment: string;
  }[];
  timeSlots: {
    date: string; // e.g. "Today, 22 Sep", "Tomorrow, 23 Sep"
    slots: {
      time: string;
      available: boolean;
    }[];
  }[];
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: 'Myself' | 'Wife' | 'Son' | 'Daughter' | 'Mother' | 'Father';
  age: number;
  gender: 'Male' | 'Female';
  bloodGroup: string;
  photoUrl?: string;
  allergies?: string[];
  chronicConditions?: string[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorPhoto: string;
  doctorDegrees: string;
  doctorClinic: string;
  patientId: string;
  patientName: string;
  relation: string;
  date: string;
  time: string;
  consultationType: 'Online Consultation' | 'Clinic Visit';
  status: 'upcoming' | 'completed' | 'cancelled';
  fee: number;
  paymentMethod: string;
  meetingLink?: string;
  prescriptionId?: string;
  cancelReason?: string;
  notes?: string;
}

export interface Prescription {
  id: string;
  appointmentId: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorRegistration?: string;
  registrationNo?: string;
  doctorDegrees?: string;
  doctorClinic?: string;
  clinicName: string;
  clinicAddress: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  date: string;
  diagnosis: string;
  vitals: {
    bp: string;
    pulse: string;
    temp: string;
    weight: string;
  };
  medicines: {
    name: string;
    dosage: string;
    frequency: string; // e.g., '1-0-1'
    timing: any;
    duration: string;
    instructions: string;
  }[];
  advice: string[];
  followUp: string;
  notes?: string;
}

export interface HealthRecord {
  id: string;
  familyMemberId: string;
  patientName: string;
  title: string;
  category: 'Prescriptions' | 'Lab Reports' | 'Medical Documents' | 'Vaccination' | 'Past Consultations' | 'Scans' | 'Vaccines';
  doctorOrLab: string;
  date: string;
  fileSize: string;
  fileType?: string;
  fileUrl?: string;
  summary?: string;
  status?: string;
  prescriptionId?: string;
}

export interface DuaItem {
  id: string;
  category: string;
  title: string;
  arabic?: string;
  arabicText?: string;
  transliteration: string;
  meaningEn?: string;
  englishMeaning?: string;
  meaningTamil?: string;
  tamilMeaning?: string;
  source: string;
  virtue?: string;
  isFavorite?: boolean;
  recommendedCount?: number;
}

export interface AppNotification {
  id: string;
  category?: 'Appointments' | 'Health' | 'Doctor Messages' | 'Islamic Wellness' | string;
  type?: 'appointment' | 'prescription' | 'wellness' | 'dua' | 'doctor';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionRoute?: ScreenView;
}

export interface FilterState {
  specialty: string;
  gender: 'Any' | 'Male' | 'Female';
  consultationType: 'Both' | 'Online' | 'Clinic';
  availability: 'Any' | 'Today' | 'Tomorrow' | 'This Week';
  experience: 'Any' | '5+ Years' | '10+ Years';
  feeRange: 'Any' | '₹0–₹500' | '₹500–₹1,000' | '₹1,000+';
  language: string;
}
