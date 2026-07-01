/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';
import { Doctor, Feedback, Appointment, Specialty, Inquiry, SiteSettings, NewsEvent } from '../types';
import { DOCTORS, SPECIALTIES, INITIAL_FEEDBACKS } from '../data';

export const DEFAULT_NEWS_EVENTS: NewsEvent[] = [
  {
    id: 'news_1',
    title: 'Free Mega Health Checkup & Consultation Camp Coming This Sunday',
    post: 'Navjyoti Hospital is organizing a free mega health camp for all citizens of Basti. Free medicine distributions and pathology consults will be provided. Please carry your previous reports for detailed medical advisory.',
    dateTime: '2026-06-21T10:00',
    location: 'Hospital Campus, Bansi Road, Basti',
    photoUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'news_2',
    title: 'Ayushman Bharat Card Service Upgrade for instant 10-Minute Clearances',
    post: 'We have optimized our on-site verification portal. Eligible patients can now verify their golden PM-JAY cards within 10 minutes at our counter and receive completely free diagnostics.',
    dateTime: '2026-06-18T09:00',
    location: 'PM-JAY Registration Counter, Block A',
    photoUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600'
  }
];

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

// Simple IndexedDB implementation for persistent storage of large assets (e.g. video files, high-res photos)
const DB_NAME = 'NavjyotiDB';
const STORE_NAME = 'StorageStore';
const DB_VERSION = 1;

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
    } catch (e) {
      reject(e);
    }
  });
};

export const saveToIndexedDB = async (key: string, value: string): Promise<void> => {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(value, key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    console.error(`IndexedDB put failed for key ${key}:`, e);
  }
};

export const getFromIndexedDB = async (key: string): Promise<string | null> => {
  try {
    const db = await openDB();
    return await new Promise<string | null>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    console.error(`IndexedDB get failed for key ${key}:`, e);
    return null;
  }
};

export const removeFromIndexedDB = async (key: string): Promise<void> => {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    console.error(`IndexedDB delete failed for key ${key}:`, e);
  }
};

export const safeGetItem = (key: string): string | null => {
  if (memoryStorage[key] !== undefined) {
    return memoryStorage[key];
  }
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.warn(`localStorage getItem blocked: ${e}`);
    return null;
  }
};

export const safeSetItem = (key: string, value: string): void => {
  memoryStorage[key] = value;
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn(`localStorage setItem blocked or full: ${e}`);
  }
  saveToIndexedDB(key, value);
};

export const safeRemoveItem = (key: string): void => {
  delete memoryStorage[key];
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn(`localStorage removeItem blocked: ${e}`);
  }
  removeFromIndexedDB(key);
};

export const loadAllFromIndexedDB = async (): Promise<void> => {
  try {
    const db = await openDB();
    const keys = await new Promise<string[]>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      
      if (typeof store.getAllKeys === 'function') {
        const request = store.getAllKeys();
        request.onsuccess = () => resolve(request.result as string[]);
        request.onerror = () => reject(request.error);
      } else {
        const keysList: string[] = [];
        const request = store.openCursor();
        request.onsuccess = (event: any) => {
          const cursor = event.target.result;
          if (cursor) {
            keysList.push(cursor.key as string);
            cursor.continue();
          } else {
            resolve(keysList);
          }
        };
        request.onerror = () => reject(request.error);
      }
    });

    for (const key of keys) {
      const val = await getFromIndexedDB(key);
      if (val) {
        memoryStorage[key] = val;
      }
    }
    
    // Backup keys from localStorage if they aren't in memoryStorage yet
    const localKeys = ['doctors', 'services', 'feedbacks', 'appointments', 'inquiries', 'site_settings', 'news_events'];
    for (const baseKey of localKeys) {
      const fullKey = keyOf(baseKey);
      if (memoryStorage[fullKey] === undefined) {
        const localVal = localStorage.getItem(fullKey);
        if (localVal) {
          memoryStorage[fullKey] = localVal;
          saveToIndexedDB(fullKey, localVal);
        }
      }
    }

    initDB();
    window.dispatchEvent(new Event('db_update'));
  } catch (e) {
    console.error('Failed to load all items from IndexedDB:', e);
    const localKeys = ['doctors', 'services', 'feedbacks', 'appointments', 'inquiries', 'site_settings', 'news_events'];
    for (const baseKey of localKeys) {
      const fullKey = keyOf(baseKey);
      try {
        const localVal = localStorage.getItem(fullKey);
        if (localVal) {
          memoryStorage[fullKey] = localVal;
        }
      } catch (err) {}
    }
    initDB();
  }
};

// Start loading asynchronously immediately
loadAllFromIndexedDB();

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
  if (!safeGetItem(keyOf('news_events'))) {
    safeSetItem(keyOf('news_events'), JSON.stringify(DEFAULT_NEWS_EVENTS));
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
  sliders: {
    slides: set.sliders || [],
    aboutPhotoUrl: set.aboutPhotoUrl || '',
    directorPhotoUrl: set.directorPhotoUrl || '',
    directorName: set.directorName || '',
    directorQualification: set.directorQualification || '',
    directorBio: set.directorBio || '',
    chairmanPhotoUrl: set.chairmanPhotoUrl || '',
    chairmanName: set.chairmanName || '',
    chairmanQualification: set.chairmanQualification || '',
    chairmanBio: set.chairmanBio || '',
    credentials: set.credentials || [],
    gallery: set.gallery || [],
    tpaFacilities: set.tpaFacilities || [],
    facilities: set.facilities || [],
    announcementPopup: set.announcementPopup || { enabled: false, title: '', message: '' }
  }
});

const mapSettingsFromDb = (dbSet: any): SiteSettings => {
  const dbSliders = dbSet.sliders;
  const logoUrl = dbSet.logo_url || dbSet.logoUrl || '';
  const heroTitle = dbSet.hero_title || dbSet.heroTitle || 'Caring Hearts. Expert Hands.';
  const heroSubtitle = dbSet.hero_subtitle || dbSet.heroSubtitle || '';
  const heroImageUrl = dbSet.hero_image_url || dbSet.heroImageUrl || '';

  if (dbSliders && !Array.isArray(dbSliders) && typeof dbSliders === 'object') {
    return {
      logoUrl,
      heroTitle,
      heroSubtitle,
      heroImageUrl,
      sliders: dbSliders.slides || [],
      aboutPhotoUrl: dbSliders.aboutPhotoUrl || '',
      directorName: dbSliders.directorName || '',
      directorPhotoUrl: dbSliders.directorPhotoUrl || '',
      directorQualification: dbSliders.directorQualification || '',
      directorBio: dbSliders.directorBio || '',
      chairmanName: dbSliders.chairmanName || '',
      chairmanPhotoUrl: dbSliders.chairmanPhotoUrl || '',
      chairmanQualification: dbSliders.chairmanQualification || '',
      chairmanBio: dbSliders.chairmanBio || '',
      credentials: dbSliders.credentials || [],
      gallery: dbSliders.gallery || [],
      tpaFacilities: dbSliders.tpaFacilities || [],
      facilities: dbSliders.facilities || [],
      announcementPopup: dbSliders.announcementPopup || { enabled: false, title: '', message: '' }
    };
  }

  // Fallback for simple string lists
  return {
    logoUrl,
    heroTitle,
    heroSubtitle,
    heroImageUrl,
    sliders: Array.isArray(dbSliders) ? dbSliders : [],
    aboutPhotoUrl: '',
    directorName: '',
    directorPhotoUrl: '',
    directorQualification: '',
    directorBio: '',
    chairmanName: '',
    chairmanPhotoUrl: '',
    chairmanQualification: '',
    chairmanBio: '',
    credentials: [],
    gallery: []
  };
};

const mapNewsToDb = (item: NewsEvent) => ({
  id: item.id,
  title: item.title,
  post: item.post,
  date_time: item.dateTime,
  location: item.location,
  photo_url: item.photoUrl || null,
});

const mapNewsFromDb = (dbNews: any): NewsEvent => ({
  id: dbNews.id,
  title: dbNews.title,
  post: dbNews.post,
  dateTime: dbNews.date_time || dbNews.dateTime,
  location: dbNews.location,
  photoUrl: dbNews.photo_url || dbNews.photoUrl || undefined,
  createdAt: dbNews.created_at || dbNews.createdAt,
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
    .on('postgres_changes', { event: '*', schema: 'public', table: 'news_events' }, (payload) => {
      console.log('Realtime change: news_events', payload);
      syncTableFromRemote('news_events');
    })
    .subscribe();

  currentChannels.push(channel);
};

// Internal table sync routine that pulls the tables on notifications
async function syncTableFromRemote(key: 'doctors' | 'services' | 'feedbacks' | 'appointments' | 'inquiries' | 'site_settings' | 'news_events') {
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
    } else if (key === 'news_events') {
      const { data } = await supabase.from('news_events').select('*');
      if (data) {
        const list = data.map(mapNewsFromDb);
        safeSetItem(keyOf('news_events'), JSON.stringify(list));
        await enforceNewsLimit();
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
        await supabase.from('site_settings').insert(mapSettingsToDb(currentLocal));
      } else {
        const settings = mapSettingsFromDb(dbSet[0]);
        safeSetItem(keyOf('site_settings'), JSON.stringify(settings));
      }
    }

    // 6.5. Sync News Events
    const { data: dbNews, error: newsErr } = await supabase.from('news_events').select('*');
    if (!newsErr && dbNews) {
      if (dbNews.length === 0) {
        const currentLocal = getNewsEvents();
        console.log('Seeding cloud with default news events...', currentLocal);
        await supabase.from('news_events').insert(currentLocal.map(mapNewsToDb));
      } else {
        const newList = dbNews.map(mapNewsFromDb);
        safeSetItem(keyOf('news_events'), JSON.stringify(newList));
        await enforceNewsLimit();
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
    sliders: [],
    tpaFacilities: [
      {
        id: 'tpa_1',
        name: 'Star Health & Allied Insurance Co. Ltd.',
        logoUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=200',
        description: 'Cashless pre-authorization & approvals for surgical treatments, medical admission and premium suite wards.'
      },
      {
        id: 'tpa_2',
        name: 'Care Health Insurance',
        logoUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=200',
        description: 'Hassle-free approvals for laparoscopic and ophthalmological surgeries.'
      },
      {
        id: 'tpa_3',
        name: 'Niva Bupa Health Insurance',
        logoUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=200',
        description: 'Instant verification of coverage limits on critical daycare medical therapies.'
      },
      {
        id: 'tpa_4',
        name: 'HDFC ERGO General Insurance',
        logoUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=200',
        description: 'Global medical standards with rapid cashless claim settlements within 2 hours.'
      }
    ],
    facilities: [
      {
        id: 'icu',
        title: 'Advanced ICU & Patient Monitoring',
        category: 'Critical Care',
        iconName: 'ICU',
        shortDesc: '24/7 cardiac monitoring, ultra-modern ventilators, and highly trained critical-care nursing team.',
        longDesc: 'Our Intensive Care Unit (ICU) and Neonatal ICU are built to handle life-threatening situations. Equipped with high-end multi-channel patient monitors, defibrillators, central gas pipelines, and computerized infusion pumps to ensure safety.',
        features: ['24/7 Doctor On-Duty', 'Invasive & Non-Invasive Ventilators', 'Central Nursing Station Monitoring', 'Neonatal Warmers' ],
        imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'dialysis',
        title: 'State-of-the-Art Dialysis Center',
        category: 'Renal Care',
        iconName: 'Dialysis',
        shortDesc: 'Equipped with multiple state-of-the-art hemodialysis machines and RO water purifiers.',
        longDesc: 'Our Nephrology department is supported by a dedicated Dialysis Suite operating under senior kidney specialists. We offer high-quality dialysis care in comfortable reclining patient bays with high strictness for infection controls.',
        features: ['Double-pass RO Purification System', 'Dedicated HCV/HBsAg Negative Bays', 'Cardiac-safe Dialysis Schemes', 'Nominal Subsidized Charges'],
        imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'ot',
        title: 'Modular Operation Theaters (OT)',
        category: 'Surgical Care',
        iconName: 'OT',
        shortDesc: 'Ultra-clean laminar airflow and modern sterilization systems for zero-infection operations.',
        longDesc: 'Our modular operating suites are designed to conduct complex General and Laparoscopic surgeries, Ophthalmic Micro-surgeries, and Orthopedic trauma therapies. Supported by central autoclaving and supreme surgical lighting.',
        features: ['Laminar Air Flow with HEPA filters', 'Advanced Laparoscopic Surgical Towers', 'Accredited Anesthesia Station', 'Sutureless Cataract Microsurgery'],
        imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'emergency',
        title: '24/7 Emergency & Pharmacy Support',
        category: 'Emergency Services',
        iconName: 'Emergency',
        shortDesc: 'Triage-ready emergency casualty ward and in-house fully stocked pharmacy running 24/7.',
        longDesc: 'Our clinical casualty center is prepared for any sudden cardiac events, trauma, pediatric emergencies, or surgical cases. The in-house pharmacy ensures life-saving immediate medications are dispensed instantly.',
        features: ['Trauma Management Desks', 'Adult & Pediatric Triage Protocols', '24/7 In-house Pharmacy Dispensing', 'Fully Equipped Ambulance On-Standby'],
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'diagnostics',
        title: 'High-Precision Pathology & Radiology',
        category: 'Diagnostics',
        iconName: 'Diagnostics',
        shortDesc: 'Fully automated diagnostic lab machines & high-definition digital radiology reports.',
        longDesc: 'Our clinical laboratories are equipped with computerized biochemistry analyzers and cell counters for quick test results. We also offer portable and stationary digital radiology services under expert supervision.',
        features: ['Computerized Bio-chemistry Panels', 'Digital Radiography (X-Ray)', 'Advanced Ultrasound (USG)', 'Accurate Fluid & Pathology Analysis'],
        imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'wards',
        title: 'Deluxe & Comfort Ward Cabins',
        category: 'In-Patient Wards',
        iconName: 'Wards',
        shortDesc: 'Clean air-conditioned single-occupancy deluxe deluxe rooms and spacious general wards.',
        longDesc: 'We believe a clean and healing environment is crucial to fast recovery. Our hospital features neat, spacious general wards, semi-private cabins, and deluxe fully air-conditioned rooms, all equipped with nursing call systems and central oxygen supply.',
        features: ['Continuous Central Oxygen Lines', 'Individual Attendant Couch', 'Strict Cleaning & Sanitization Cycles', 'Special Low-income General Wards'],
        imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800'
      }
    ],
    announcementPopup: {
      enabled: true,
      title: 'Free Mega Surgical Camp & PM-JAY Card Registration',
      message: 'Navjyoti Multispeciality Hospital is hosting a Free Health Checkup & Surgery Camp this upcoming Sunday. Our veteran surgeons will provide free OPD consultations. Families can also register Aadhaar documents to obtain Ayushman Bharat cashless dynamic cards instantly! Call 05542-243001 for details.',
      badgeText: 'IMPORTANT NOTICE',
      linkText: 'Register Now',
      linkUrl: '#pmjay'
    }
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

// ---------------------------------------------------------
// News and Events CRUD Operations
// ---------------------------------------------------------
export const getNewsEvents = (): NewsEvent[] => {
  initDB();
  const cached = safeGetItem(keyOf('news_events'));
  if (!cached) return DEFAULT_NEWS_EVENTS;
  try {
    return JSON.parse(cached);
  } catch (e) {
    return DEFAULT_NEWS_EVENTS;
  }
};

export const saveNewsEvents = (list: NewsEvent[]) => {
  safeSetItem(keyOf('news_events'), JSON.stringify(list));
  window.dispatchEvent(new Event('db_update'));
};

export const enforceNewsLimit = async () => {
  const list = getNewsEvents();
  if (list.length <= 5) return;

  // Sort descending by dateTime (newest first)
  const sorted = [...list].sort((a, b) => {
    const timeA = new Date(a.dateTime).getTime();
    const timeB = new Date(b.dateTime).getTime();
    if (!isNaN(timeA) && !isNaN(timeB)) {
      if (timeA !== timeB) return timeB - timeA;
    }
    return b.id.localeCompare(a.id);
  });

  const kept = sorted.slice(0, 5);
  const removed = sorted.slice(5);

  saveNewsEvents(kept);

  for (const item of removed) {
    try {
      await supabase.from('news_events').delete().eq('id', item.id);
    } catch (err) {
      console.error('Failed to prune oldest news event:', err);
    }
  }
};

export const addNewsEvent = async (item: NewsEvent) => {
  const list = getNewsEvents();
  list.unshift(item);
  saveNewsEvents(list);

  try {
    await supabase.from('news_events').insert([mapNewsToDb(item)]);
  } catch (err) {
    console.error('Failed to sync addNewsEvent to Supabase:', err);
  }

  await enforceNewsLimit();
};

export const updateNewsEvent = async (item: NewsEvent) => {
  const list = getNewsEvents();
  const index = list.findIndex(i => i.id === item.id);
  if (index !== -1) {
    list[index] = item;
    saveNewsEvents(list);
  }

  try {
    await supabase.from('news_events').update(mapNewsToDb(item)).eq('id', item.id);
  } catch (err) {
    console.error('Failed to sync updateNewsEvent to Supabase:', err);
  }

  await enforceNewsLimit();
};

export const deleteNewsEvent = async (id: string) => {
  const list = getNewsEvents();
  const filtered = list.filter(i => i.id !== id);
  saveNewsEvents(filtered);

  try {
    await supabase.from('news_events').delete().eq('id', id);
  } catch (err) {
    console.error('Failed to sync deleteNewsEvent from Supabase:', err);
  }
};
