/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';
import { Doctor, Feedback, Appointment, Specialty, Inquiry, SiteSettings } from '../types';
import { DOCTORS, SPECIALTIES, INITIAL_FEEDBACKS } from '../data';

// Helper to decrypt obfuscated configurations
const decrypt = (str: string): string => {
  try {
    return atob(str);
  } catch (e) {
    return '';
  }
};

const URL_BASE64 = 'aHR0cHM6Ly9keW9wcWJhYnJ2eHd4aXBibHR0eC5zdXBhYmFzZS5jbw==';
const KEY_BASE64 = 'c2JfcHVibGlzaGFibGVfRXJsaVJub1ZSTDhzUl82OUkyLWwyZ182ekVNaXBfaQ==';

// Supabase Configuration from Environment variables or hardcoded fallbacks
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || decrypt(URL_BASE64);
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || decrypt(KEY_BASE64);

// Safe creation of the Supabase Client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

const keyOf = (name: string) => `navjyoti_${name}`;

// Memory storage fallback to prevent crashes in private navigation or inside sandboxed iframes
const memoryStorage: Record<string, string> = {};

export const safeGetItem = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.warn(`localStorage getItem blocked: ${e}`);
    return memoryStorage[key] || null;
  }
};

export const safeSetItem = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn(`localStorage setItem blocked: ${e}`);
    memoryStorage[key] = value;
  }
};

export const safeRemoveItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn(`localStorage removeItem blocked: ${e}`);
    delete memoryStorage[key];
  }
};

// ---------------------------------------------------------
// Default Local Seeding Data
// ---------------------------------------------------------
export const initDB = () => {
  if (!safeGetItem(keyOf('doctors'))) {
    safeSetItem(keyOf('doctors'), JSON.stringify(DOCTORS));
  }
  if (!safeGetItem(keyOf('services'))) {
    safeSetItem(keyOf('services'), JSON.stringify(SPECIALTIES));
  }
  if (!safeGetItem(keyOf('feedbacks'))) {
    const list = INITIAL_FEEDBACKS.map(f => ({ ...f, isApproved: true }));
    safeSetItem(keyOf('feedbacks'), JSON.stringify(list));
  }
  if (!safeGetItem(keyOf('appointments'))) {
    const list: Appointment[] = [
      {
        id: 'appt_1',
        patientName: 'Raman Prasad Maurya',
        patientPhone: '9876543210',
        patientEmail: 'raman.m@gmail.com',
        doctorName: 'Dr. Vidushi',
        department: 'General & Laparoscopic Surgery',
        appointmentDate: '2026-06-20',
        appointmentTime: '11:00 AM',
        symptoms: 'Mild abdominal discomfort, suspecting recurring hernia.',
        isAyushmanCardHolder: true,
        ayushmanCardNo: 'AB-8726-1928-11',
        status: 'Confirmed',
        tokenNo: 'NVJ-8261'
      },
      {
        id: 'appt_2',
        patientName: 'Kiran Ghasia',
        patientPhone: '7011245678',
        patientEmail: 'kiran2026@yahoo.com',
        doctorName: 'Dr. Prem Prakash Dubey',
        department: 'Eye Department',
        appointmentDate: '2026-06-19',
        appointmentTime: '10:30 AM',
        symptoms: 'Blurry sight and itching in left eye.',
        isAyushmanCardHolder: false,
        status: 'Pending',
        tokenNo: 'NVJ-1209'
      },
      {
        id: 'appt_3',
        patientName: 'Shambhu Dutt Dixit',
        patientPhone: '8912445588',
        patientEmail: 'shambhu.dixit@outlook.com',
        doctorName: 'Dr. Jitendra Kumar Gupta',
        department: 'ENT (Otolaryngology)',
        appointmentDate: '2026-06-18',
        appointmentTime: '02:30 PM',
        symptoms: 'Throat congestion and mild vocal strain for 4 days.',
        isAyushmanCardHolder: true,
        ayushmanCardNo: 'AB-5512-9012-74',
        status: 'Confirmed',
        tokenNo: 'NVJ-7711'
      }
    ];
    safeSetItem(keyOf('appointments'), JSON.stringify(list));
  }
  if (!safeGetItem(keyOf('inquiries'))) {
    const list: Inquiry[] = [
      {
        id: 'inq_1',
        name: 'Manoj Chaurasia',
        phone: '9123456780',
        email: 'manoj.basti@gmail.com',
        message: 'Is the free surgery camp going to hold OPD after 4:00 PM on Sunday? I will be traveling from Khalilabad with my mother.',
        date: '2026-06-17',
        status: 'New'
      },
      {
        id: 'inq_2',
        name: 'Sushma Sen',
        phone: '8221045566',
        email: 'sushmasen@gmail.com',
        message: 'Do you have vacant private deluxe rooms under the Ayushman Bharat empanelment?',
        date: '2026-06-16',
        status: 'Resolved'
      }
    ];
    safeSetItem(keyOf('inquiries'), JSON.stringify(list));
  }
};

// ---------------------------------------------------------
// Camel/Snake Converters to perfectly align code & Supabase schemas
// ---------------------------------------------------------
const mapDoctorToDb = (doc: Doctor) => ({
  id: doc.id,
  name: doc.name,
  specialization: doc.specialization,
  qualification: doc.qualification,
  experience: doc.experience,
  image: doc.image,
  bio: doc.bio,
  timings: doc.timings,
  days: doc.days,
});

const mapDoctorFromDb = (dbDoc: any): Doctor => ({
  id: dbDoc.id,
  name: dbDoc.name,
  specialization: dbDoc.specialization,
  qualification: dbDoc.qualification,
  experience: dbDoc.experience,
  image: dbDoc.image,
  bio: dbDoc.bio || '',
  timings: dbDoc.timings || '',
  days: dbDoc.days || [],
});

const mapServiceToDb = (serv: Specialty) => ({
  id: serv.id,
  title: serv.title,
  icon_name: serv.iconName,
  description: serv.description,
  features: serv.features,
  image_url: serv.imageUrl || null,
});

const mapServiceFromDb = (dbServ: any): Specialty => ({
  id: dbServ.id,
  title: dbServ.title,
  iconName: dbServ.icon_name || dbServ.iconName || 'Activity',
  description: dbServ.description,
  features: dbServ.features || [],
  imageUrl: dbServ.image_url || dbServ.imageUrl || undefined,
});

const mapFeedbackToDb = (fb: Feedback) => ({
  id: fb.id,
  name: fb.name,
  email: fb.email || null,
  content: fb.content,
  rating: fb.rating,
  is_approved: fb.isApproved !== undefined ? fb.isApproved : true,
  date: fb.date || new Date().toISOString().split('T')[0],
});

const mapFeedbackFromDb = (dbFb: any): Feedback => ({
  id: dbFb.id,
  name: dbFb.name,
  email: dbFb.email || undefined,
  content: dbFb.content,
  rating: dbFb.rating,
  isApproved: dbFb.is_approved !== undefined ? dbFb.is_approved : dbFb.isApproved,
  date: dbFb.date || new Date().toISOString().split('T')[0],
});

const mapAppointmentToDb = (appt: Appointment) => ({
  id: appt.id,
  patient_name: appt.patientName,
  patient_phone: appt.patientPhone,
  patient_email: appt.patientEmail || null,
  doctor_name: appt.doctorName,
  department: appt.department,
  appointment_date: appt.appointmentDate,
  appointment_time: appt.appointmentTime,
  symptoms: appt.symptoms || null,
  is_ayushman_card_holder: appt.isAyushmanCardHolder,
  ayushman_card_no: appt.ayushmanCardNo || null,
  status: appt.status,
  token_no: appt.tokenNo,
});

const mapAppointmentFromDb = (dbAppt: any): Appointment => ({
  id: dbAppt.id,
  patientName: dbAppt.patient_name || dbAppt.patientName,
  patientPhone: dbAppt.patient_phone || dbAppt.patientPhone,
  patientEmail: dbAppt.patient_email || dbAppt.patientEmail || undefined,
  doctorName: dbAppt.doctor_name || dbAppt.doctorName,
  department: dbAppt.department,
  appointmentDate: dbAppt.appointment_date || dbAppt.appointmentDate,
  appointmentTime: dbAppt.appointment_time || dbAppt.appointmentTime,
  symptoms: dbAppt.symptoms || undefined,
  isAyushmanCardHolder: dbAppt.is_ayushman_card_holder !== undefined ? dbAppt.is_ayushman_card_holder : dbAppt.isAyushmanCardHolder,
  ayushmanCardNo: dbAppt.ayushman_card_no || dbAppt.ayushmanCardNo || undefined,
  status: dbAppt.status,
  tokenNo: dbAppt.token_no || dbAppt.tokenNo,
});

const mapInquiryToDb = (inq: Inquiry) => ({
  id: inq.id,
  name: inq.name,
  phone: inq.phone,
  email: inq.email || null,
  message: inq.message,
  date: inq.date,
  status: inq.status,
});

const mapInquiryFromDb = (dbInq: any): Inquiry => ({
  id: dbInq.id,
  name: dbInq.name,
  phone: dbInq.phone,
  email: dbInq.email || undefined,
  message: dbInq.message,
  date: dbInq.date,
  status: dbInq.status,
});

const mapSettingsToDb = (set: SiteSettings) => ({
  logo_url: set.logoUrl || null,
  hero_title: set.heroTitle || 'Caring Hearts. Expert Hands.',
  hero_subtitle: set.heroSubtitle || '',
  hero_image_url: set.heroImageUrl || null,
  sliders: set.sliders || [],
});

const mapSettingsFromDb = (dbSet: any): SiteSettings => ({
  logoUrl: dbSet.logo_url || dbSet.logoUrl || '',
  heroTitle: dbSet.hero_title || dbSet.heroTitle || 'Caring Hearts. Expert Hands.',
  heroSubtitle: dbSet.hero_subtitle || dbSet.heroSubtitle || '',
  heroImageUrl: dbSet.hero_image_url || dbSet.heroImageUrl || '',
  sliders: dbSet.sliders || [],
});

// ---------------------------------------------------------
// Real-Time Listener Setup
// ---------------------------------------------------------
// This ensures any remote inserts, updates, or deletes refresh the local offline cache & trigger UI view updates!
const currentChannels: any[] = [];

export const initRealtimeSync = () => {
  // Unsubscribe previous to avoid leak
  currentChannels.forEach(ch => ch.unsubscribe());
  currentChannels.length = 0;

  console.log('Initializing Navjyoti database real-time sync subscription channels...');

  const channel = supabase
    .channel('public-db-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'doctors' }, (payload) => {
      console.log('Realtime change: doctors', payload);
      syncTableFromRemote('doctors');
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'specialties' }, (payload) => {
      console.log('Realtime change: specialties', payload);
      syncTableFromRemote('services');
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'feedbacks' }, (payload) => {
      console.log('Realtime change: feedbacks', payload);
      syncTableFromRemote('feedbacks');
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, (payload) => {
      console.log('Realtime change: appointments', payload);
      syncTableFromRemote('appointments');
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'inquiries' }, (payload) => {
      console.log('Realtime change: inquiries', payload);
      syncTableFromRemote('inquiries');
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, (payload) => {
      console.log('Realtime change: site_settings', payload);
      syncTableFromRemote('site_settings');
    })
    .subscribe();

  currentChannels.push(channel);
};

// Internal table sync routine that pulls the tables on notifications
async function syncTableFromRemote(key: 'doctors' | 'services' | 'feedbacks' | 'appointments' | 'inquiries' | 'site_settings') {
  try {
    if (key === 'doctors') {
      const { data } = await supabase.from('doctors').select('*');
      if (data && data.length > 0) {
        const list = data.map(mapDoctorFromDb);
        safeSetItem(keyOf('doctors'), JSON.stringify(list));
      }
    } else if (key === 'services') {
      const { data } = await supabase.from('specialties').select('*');
      if (data && data.length > 0) {
        const list = data.map(mapServiceFromDb);
        safeSetItem(keyOf('services'), JSON.stringify(list));
      }
    } else if (key === 'feedbacks') {
      const { data } = await supabase.from('feedbacks').select('*');
      if (data) {
        const list = data.map(mapFeedbackFromDb);
        safeSetItem(keyOf('feedbacks'), JSON.stringify(list));
      }
    } else if (key === 'appointments') {
      const { data } = await supabase.from('appointments').select('*');
      if (data) {
        const list = data.map(mapAppointmentFromDb);
        safeSetItem(keyOf('appointments'), JSON.stringify(list));
      }
    } else if (key === 'inquiries') {
      const { data } = await supabase.from('inquiries').select('*');
      if (data) {
        const list = data.map(mapInquiryFromDb);
        safeSetItem(keyOf('inquiries'), JSON.stringify(list));
      }
    } else if (key === 'site_settings') {
      const { data } = await supabase.from('site_settings').select('*');
      if (data && data.length > 0) {
        const settings = mapSettingsFromDb(data[0]);
        safeSetItem(keyOf('site_settings'), JSON.stringify(settings));
      }
    }
    // Inform all listening hooks and routes to redraw with newest cache
    window.dispatchEvent(new Event('db_update'));
  } catch (err) {
    console.error('Failed to sync changes from remote tables:', err);
  }
}

// ---------------------------------------------------------
// Full Cloud Synchronization & Seeding Engine
// ---------------------------------------------------------
// This executes asynchronously in the background. It downloads cloud tables to our fast, synchronous cache,
// and uploads local data to seed remote if remote tables are completely uninitialized!
export const syncWithCloudBackend = async () => {
  try {
    initDB();
    initRealtimeSync();

    console.log('Background cloud synchronization beginning...');

    // 1. Sync Doctors
    const { data: dbDocs, error: docErr } = await supabase.from('doctors').select('*');
    if (!docErr && dbDocs) {
      if (dbDocs.length === 0) {
        // Seed Supabase
        const currentLocal = getDoctors();
        console.log('Seeding cloud with current doctors list...', currentLocal);
        await supabase.from('doctors').upsert(currentLocal.map(mapDoctorToDb));
      } else {
        const newList = dbDocs.map(mapDoctorFromDb);
        safeSetItem(keyOf('doctors'), JSON.stringify(newList));
      }
    }

    // 2. Sync Specialties (departments)
    const { data: dbSpecs, error: specErr } = await supabase.from('specialties').select('*');
    if (!specErr && dbSpecs) {
      if (dbSpecs.length === 0) {
        const currentLocal = getServices();
        console.log('Seeding cloud with current specialties description list...', currentLocal);
        await supabase.from('specialties').upsert(currentLocal.map(mapServiceToDb));
      } else {
        const newList = dbSpecs.map(mapServiceFromDb);
        safeSetItem(keyOf('services'), JSON.stringify(newList));
      }
    }

    // 3. Sync Feedbacks
    const { data: dbFb, error: fbErr } = await supabase.from('feedbacks').select('*');
    if (!fbErr && dbFb) {
      if (dbFb.length === 0) {
        const currentLocal = getFeedbacks();
        console.log('Seeding cloud with current feedbacks review list...', currentLocal);
        await supabase.from('feedbacks').upsert(currentLocal.map(mapFeedbackToDb));
      } else {
        const newList = dbFb.map(mapFeedbackFromDb);
        safeSetItem(keyOf('feedbacks'), JSON.stringify(newList));
      }
    }

    // 4. Sync Appointments
    const { data: dbAppts, error: apptErr } = await supabase.from('appointments').select('*');
    if (!apptErr && dbAppts) {
      if (dbAppts.length === 0) {
        const currentLocal = getAppointments();
        console.log('Seeding cloud with current sample appointments...', currentLocal);
        await supabase.from('appointments').upsert(currentLocal.map(mapAppointmentToDb));
      } else {
        const newList = dbAppts.map(mapAppointmentFromDb);
        safeSetItem(keyOf('appointments'), JSON.stringify(newList));
      }
    }

    // 5. Sync Inquiries
    const { data: dbInq, error: inqErr } = await supabase.from('inquiries').select('*');
    if (!inqErr && dbInq) {
      if (dbInq.length === 0) {
        const currentLocal = getInquiries();
        console.log('Seeding cloud with sample inquirer contact messages...', currentLocal);
        await supabase.from('inquiries').upsert(currentLocal.map(mapInquiryToDb));
      } else {
        const newList = dbInq.map(mapInquiryFromDb);
        safeSetItem(keyOf('inquiries'), JSON.stringify(newList));
      }
    }

    // 6. Sync Site Settings
    const { data: dbSet, error: setErr } = await supabase.from('site_settings').select('*');
    if (!setErr && dbSet) {
      if (dbSet.length === 0) {
        const currentLocal = getSiteSettings();
        console.log('Seeding cloud with default site settings configurations...', currentLocal);
        await supabase.from('site_settings').insert({
          logo_url: currentLocal.logoUrl || null,
          hero_title: currentLocal.heroTitle,
          hero_subtitle: currentLocal.heroSubtitle,
          hero_image_url: currentLocal.heroImageUrl || null,
          sliders: currentLocal.sliders
        });
      } else {
        const settings = mapSettingsFromDb(dbSet[0]);
        safeSetItem(keyOf('site_settings'), JSON.stringify(settings));
      }
    }

    // Trigger full redraw of all components with loaded cloud database
    window.dispatchEvent(new Event('db_update'));
    console.log('Navjyoti Hospital Cloud database synchronize operation succeeded perfectly.');
  } catch (err) {
    console.warn('Network offline or database connection warning, running smoothly on cache: ', err);
  }
};

// Start sync immediately on file load
setTimeout(() => {
  syncWithCloudBackend();
}, 200);

// ---------------------------------------------------------
// Doctors CRUD Operations
// ---------------------------------------------------------
export const getDoctors = (): Doctor[] => {
  initDB();
  const listStr = safeGetItem(keyOf('doctors'));
  if (!listStr) return DOCTORS;
  try {
    const list = JSON.parse(listStr);
    if (!Array.isArray(list) || list.length === 0) {
      return DOCTORS;
    }
    return list;
  } catch (e) {
    return DOCTORS;
  }
};

export const saveDoctors = (list: Doctor[]) => {
  safeSetItem(keyOf('doctors'), JSON.stringify(list));
  window.dispatchEvent(new Event('db_update'));
};

export const addDoctor = async (item: Doctor) => {
  const list = getDoctors();
  list.push(item);
  saveDoctors(list);

  try {
    await supabase.from('doctors').insert([mapDoctorToDb(item)]);
  } catch (err) {
    console.error('Failed to sync addDoctor to Supabase:', err);
  }
};

export const updateDoctor = async (item: Doctor) => {
  const list = getDoctors();
  const index = list.findIndex(d => d.id === item.id);
  if (index !== -1) {
    list[index] = item;
    saveDoctors(list);
  }

  try {
    await supabase.from('doctors').update(mapDoctorToDb(item)).eq('id', item.id);
  } catch (err) {
    console.error('Failed to sync updateDoctor to Supabase:', err);
  }
};

export const deleteDoctor = async (id: string) => {
  const list = getDoctors();
  const filtered = list.filter(d => d.id !== id);
  saveDoctors(filtered);

  try {
    await supabase.from('doctors').delete().eq('id', id);
  } catch (err) {
    console.error('Failed to sync deleteDoctor from Supabase:', err);
  }
};

// ---------------------------------------------------------
// Services/Departments CRUD Operations
// ---------------------------------------------------------
export const getServices = (): Specialty[] => {
  initDB();
  const listStr = safeGetItem(keyOf('services'));
  if (!listStr) return SPECIALTIES;
  try {
    const list = JSON.parse(listStr);
    if (!Array.isArray(list) || list.length === 0) {
      return SPECIALTIES;
    }
    return list;
  } catch (e) {
    return SPECIALTIES;
  }
};

export const saveServices = (list: Specialty[]) => {
  safeSetItem(keyOf('services'), JSON.stringify(list));
  window.dispatchEvent(new Event('db_update'));
};

export const addService = async (item: Specialty) => {
  const list = getServices();
  list.push(item);
  saveServices(list);

  try {
    await supabase.from('specialties').insert([mapServiceToDb(item)]);
  } catch (err) {
    console.error('Failed to sync addService to Supabase:', err);
  }
};

export const updateService = async (item: Specialty) => {
  const list = getServices();
  const index = list.findIndex(s => s.id === item.id);
  if (index !== -1) {
    list[index] = item;
    saveServices(list);
  }

  try {
    await supabase.from('specialties').update(mapServiceToDb(item)).eq('id', item.id);
  } catch (err) {
    console.error('Failed to sync updateService to Supabase:', err);
  }
};

export const deleteService = async (id: string) => {
  const list = getServices();
  const filtered = list.filter(s => s.id !== id);
  saveServices(filtered);

  try {
    await supabase.from('specialties').delete().eq('id', id);
  } catch (err) {
    console.error('Failed to sync deleteService from Supabase:', err);
  }
};

// ---------------------------------------------------------
// Feedbacks/Testimonials CRUD Operations
// ---------------------------------------------------------
export const getFeedbacks = (): Feedback[] => {
  initDB();
  const listStr = safeGetItem(keyOf('feedbacks'));
  if (!listStr) return [];
  try {
    return JSON.parse(listStr);
  } catch (e) {
    return [];
  }
};

export const saveFeedbacks = (list: Feedback[]) => {
  safeSetItem(keyOf('feedbacks'), JSON.stringify(list));
  window.dispatchEvent(new Event('db_update'));
};

export const addFeedback = async (item: Feedback) => {
  const list = getFeedbacks();
  list.unshift(item);
  saveFeedbacks(list);

  try {
    await supabase.from('feedbacks').insert([mapFeedbackToDb(item)]);
  } catch (err) {
    console.error('Failed to sync addFeedback to Supabase:', err);
  }
};

export const updateFeedback = async (item: Feedback) => {
  const list = getFeedbacks();
  const index = list.findIndex(f => f.id === item.id);
  if (index !== -1) {
    list[index] = item;
    saveFeedbacks(list);
  }

  try {
    await supabase.from('feedbacks').update(mapFeedbackToDb(item)).eq('id', item.id);
  } catch (err) {
    console.error('Failed to sync updateFeedback to Supabase:', err);
  }
};

export const deleteFeedback = async (id: string) => {
  const list = getFeedbacks();
  const filtered = list.filter(f => f.id !== id);
  saveFeedbacks(filtered);

  try {
    await supabase.from('feedbacks').delete().eq('id', id);
  } catch (err) {
    console.error('Failed to sync deleteFeedback from Supabase:', err);
  }
};

// ---------------------------------------------------------
// Appointments CRUD Operations
// ---------------------------------------------------------
export const getAppointments = (): Appointment[] => {
  initDB();
  const listStr = safeGetItem(keyOf('appointments'));
  if (!listStr) return [];
  try {
    return JSON.parse(listStr);
  } catch (e) {
    return [];
  }
};

export const saveAppointments = (list: Appointment[]) => {
  safeSetItem(keyOf('appointments'), JSON.stringify(list));
  window.dispatchEvent(new Event('db_update'));
};

export const addAppointment = async (item: Appointment) => {
  const list = getAppointments();
  list.unshift(item);
  saveAppointments(list);

  try {
    await supabase.from('appointments').insert([mapAppointmentToDb(item)]);
  } catch (err) {
    console.error('Failed to sync addAppointment to Supabase:', err);
  }
};

export const updateAppointment = async (item: Appointment) => {
  const list = getAppointments();
  const index = list.findIndex(a => a.id === item.id);
  if (index !== -1) {
    list[index] = item;
    saveAppointments(list);
  }

  try {
    await supabase.from('appointments').update(mapAppointmentToDb(item)).eq('id', item.id);
  } catch (err) {
    console.error('Failed to sync updateAppointment to Supabase:', err);
  }
};

export const deleteAppointment = async (id: string) => {
  const list = getAppointments();
  const filtered = list.filter(a => a.id !== id);
  saveAppointments(filtered);

  try {
    await supabase.from('appointments').delete().eq('id', id);
  } catch (err) {
    console.error('Failed to sync deleteAppointment from Supabase:', err);
  }
};

// ---------------------------------------------------------
// Inquiries CRUD Operations
// ---------------------------------------------------------
export const getInquiries = (): Inquiry[] => {
  initDB();
  const listStr = safeGetItem(keyOf('inquiries'));
  if (!listStr) return [];
  try {
    return JSON.parse(listStr);
  } catch (e) {
    return [];
  }
};

export const saveInquiries = (list: Inquiry[]) => {
  safeSetItem(keyOf('inquiries'), JSON.stringify(list));
  window.dispatchEvent(new Event('db_update'));
};

export const addInquiry = async (item: Inquiry) => {
  const list = getInquiries();
  list.unshift(item);
  saveInquiries(list);

  try {
    await supabase.from('inquiries').insert([mapInquiryToDb(item)]);
  } catch (err) {
    console.error('Failed to sync addInquiry to Supabase:', err);
  }
};

export const updateInquiry = async (item: Inquiry) => {
  const list = getInquiries();
  const index = list.findIndex(i => i.id === item.id);
  if (index !== -1) {
    list[index] = item;
    saveInquiries(list);
  }

  try {
    await supabase.from('inquiries').update(mapInquiryToDb(item)).eq('id', item.id);
  } catch (err) {
    console.error('Failed to sync updateInquiry to Supabase:', err);
  }
};

export const deleteInquiry = async (id: string) => {
  const list = getInquiries();
  const filtered = list.filter(i => i.id !== id);
  saveInquiries(filtered);

  try {
    await supabase.from('inquiries').delete().eq('id', id);
  } catch (err) {
    console.error('Failed to sync deleteInquiry from Supabase:', err);
  }
};

// ---------------------------------------------------------
// Website Settings CRUD Operations
// ---------------------------------------------------------
export const getSiteSettings = (): SiteSettings => {
  initDB();
  const settingsStr = safeGetItem(keyOf('site_settings'));
  const defaultSettings: SiteSettings = {
    logoUrl: '',
    heroTitle: 'Caring Hearts. Expert Hands.',
    heroSubtitle: 'Navjyoti Multispeciality Hospital, located in Basti, Uttar Pradesh, is committed to delivering modern, affordable, and deeply compassionate healthcare. Bring your Ayushman Bharat Card to enjoy free cashless hospital treatments today.',
    heroImageUrl: '',
    sliders: []
  };
  
  if (!settingsStr) return defaultSettings;
  try {
    const parsed = JSON.parse(settingsStr);
    return { ...defaultSettings, ...parsed };
  } catch (e) {
    return defaultSettings;
  }
};

export const saveSiteSettings = async (settings: SiteSettings) => {
  safeSetItem(keyOf('site_settings'), JSON.stringify(settings));
  window.dispatchEvent(new Event('db_update'));

  try {
    // Check if site settings record exists, else create it
    const { data } = await supabase.from('site_settings').select('id');
    if (data && data.length > 0) {
      await supabase.from('site_settings').update(mapSettingsToDb(settings)).eq('id', data[0].id);
    } else {
      await supabase.from('site_settings').insert([mapSettingsToDb(settings)]);
    }
  } catch (err) {
    console.error('Failed to sync saveSiteSettings to Supabase:', err);
  }
};
