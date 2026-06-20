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

export interface SiteSettings {
  logoUrl?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImageUrl?: string;
  sliders?: string[];
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


