export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  qualification: string;
  experience: number;
  image: string;
  bio: string;
  timings: string;
  days: string[];
}

export interface Feedback {
  id: string;
  name: string;
  email: string;
  content: string;
  rating: number;
  date: string;
  isApproved?: boolean;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  doctorName: string;
  department: string;
  appointmentDate: string;
  appointmentTime: string;
  symptoms: string;
  isAyushmanCardHolder: boolean;
  ayushmanCardNo?: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
  tokenNo: string;
}

export interface Specialty {
  id: string;
  title: string;
  iconName: string;
  description: string;
  features: string[];
  imageUrl?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  date: string;
  status: 'New' | 'Read' | 'Resolved';
}

export interface Facility {
  id: string;
  title: string;
  category: string;
  iconName: 'ICU' | 'Dialysis' | 'OT' | 'Emergency' | 'Diagnostics' | 'Wards';
  shortDesc: string;
  longDesc: string;
  features: string[];
  imageUrl?: string;
}

export interface SiteSettings {
  logoUrl?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImageUrl?: string;
  sliders?: string[];
  // New customizable fields (all managed in Admin, persisted as JSONB)
  aboutPhotoUrl?: string;
  directorPhotoUrl?: string;
  directorName?: string;
  directorQualification?: string;
  directorBio?: string;
  chairmanPhotoUrl?: string;
  chairmanName?: string;
  chairmanQualification?: string;
  chairmanBio?: string;
  credentials?: { id: string; title: string; fileUrl: string; date?: string }[];
  gallery?: { id: string; url: string; type: 'image' | 'video'; title: string }[];
  tpaFacilities?: { id: string; name: string; logoUrl?: string; description?: string }[];
  facilities?: Facility[];
  announcementPopup?: { enabled: boolean; title: string; message: string; badgeText?: string; linkText?: string; linkUrl?: string };
}

export interface NewsEvent {
  id: string;
  title: string;
  post: string;
  dateTime: string;
  location: string;
  photoUrl?: string;
  createdAt?: string;
}


