import React, { useState, useEffect } from 'react';
import { 
  getDoctors, addDoctor, updateDoctor, deleteDoctor,
  getServices, addService, updateService, deleteService,
  getAppointments, updateAppointment, deleteAppointment,
  getInquiries, updateInquiry, deleteInquiry,
  getFeedbacks, updateFeedback, addFeedback, deleteFeedback,
  safeGetItem, safeSetItem, safeRemoveItem,
  getSiteSettings, saveSiteSettings,
  getNewsEvents, addNewsEvent, updateNewsEvent, deleteNewsEvent
} from '../utils/database';
import { Doctor, Specialty, Appointment, Feedback, Inquiry, SiteSettings, NewsEvent } from '../types';
import { 
  Users, Activity, Calendar, Mail, MessageSquare, LogOut, Plus, Edit, Trash2, 
  Check, X, Menu, Search, CheckCircle2, AlertCircle, Clock, ShieldAlert, Star, 
  Printer, UserCheck, ChevronRight, LayoutDashboard, Lock, Eye, EyeOff, FileText, Settings, Heart,
  Ear, HeartPulse, Baby, Bone, Video, Award, Upload, User
} from 'lucide-react';

const departmentIconMap: Record<string, React.ComponentType<any>> = {
  Activity: Activity,
  Eye: Eye,
  Ear: Ear,
  HeartPulse: HeartPulse,
  Baby: Baby,
  ShieldAlert: ShieldAlert,
  Bone: Bone,
  Heart: Heart,
};

interface AdminPanelProps {
  onLogout: () => void;
}

type TabType = 'dashboard' | 'doctors' | 'services' | 'appointments' | 'inquiries' | 'feedbacks' | 'settings' | 'news';

export default function AdminPanel({ onLogout }: AdminPanelProps) {
  // Login State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return safeGetItem('navjyoti_admin_auth') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Tab State
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Database States
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => getSiteSettings());
  const [isSettingsSavedStatus, setIsSettingsSavedStatus] = useState(false);
  const [services, setServices] = useState<Specialty[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [newsEvents, setNewsEvents] = useState<NewsEvent[]>([]);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal / Form States
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [activeDoctor, setActiveDoctor] = useState<Doctor | null>(null);
  const [activeService, setActiveService] = useState<Specialty | null>(null);

  // Doctor Form Fields
  const [docName, setDocName] = useState('');
  const [docSpec, setDocSpec] = useState('General & Laparoscopic Surgeon');
  const [docQual, setDocQual] = useState('');
  const [docExp, setDocExp] = useState(5);
  const [docBio, setDocBio] = useState('');
  const [docTimings, setDocTimings] = useState('10:00 AM - 04:00 PM');
  const [docDays, setDocDays] = useState<string[]>(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
  const [docImage, setDocImage] = useState('');

  // Service Form Fields
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceIcon, setServiceIcon] = useState('Activity');
  const [serviceDesc, setServiceDesc] = useState('');
  const [serviceFeatures, setServiceFeatures] = useState('');
  const [serviceImg, setServiceImg] = useState('');

  // Manual Feedback Form Fields
  const [fbName, setFbName] = useState('');
  const [fbEmail, setFbEmail] = useState('');
  const [fbContent, setFbContent] = useState('');
  const [fbRating, setFbRating] = useState(5);

  // News & Events Editor Fields
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [activeNews, setActiveNews] = useState<NewsEvent | null>(null);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsPost, setNewsPost] = useState('');
  const [newsDateTime, setNewsDateTime] = useState('');
  const [newsLocation, setNewsLocation] = useState('');
  const [newsPhotoUrl, setNewsPhotoUrl] = useState('');
  const [photoError, setPhotoError] = useState('');

  // Ticket Printing state
  const [printTicket, setPrintTicket] = useState<Appointment | null>(null);

  // Custom Confirmation Modal state
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  const triggerConfirm = (title: string, message: string, onConfirm: () => void) => {
    setConfirmState({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setConfirmState(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  // Fetch all tables
  const loadData = () => {
    setDoctors(getDoctors());
    setServices(getServices());
    setAppointments(getAppointments());
    setInquiries(getInquiries());
    setFeedbacks(getFeedbacks());
    setSiteSettings(getSiteSettings());
    setNewsEvents(getNewsEvents());
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  // Sync listener
  useEffect(() => {
    const handleSync = () => {
      loadData();
    };
    window.addEventListener('db_update', handleSync);
    return () => window.removeEventListener('db_update', handleSync);
  }, []);

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      safeSetItem('navjyoti_admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid Administrator credentials! Use: admin / admin123');
    }
  };

  const handleQuickLogin = () => {
    setIsAuthenticated(true);
    safeSetItem('navjyoti_admin_auth', 'true');
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    safeRemoveItem('navjyoti_admin_auth');
    onLogout();
  };

  // Doctors Actions
  const handleOpenDocModal = (doc: Doctor | null) => {
    setActiveDoctor(doc);
    if (doc) {
      setDocName(doc.name);
      setDocSpec(doc.specialization);
      setDocQual(doc.qualification);
      setDocExp(doc.experience);
      setDocBio(doc.bio);
      setDocTimings(doc.timings);
      setDocDays(doc.days);
      setDocImage(doc.image || '');
    } else {
      setDocName('');
      setDocSpec('General & Laparoscopic Surgeon');
      setDocQual('MBBS, MS');
      setDocExp(5);
      setDocBio('');
      setDocTimings('10:00 AM - 04:00 PM');
      setDocDays(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
      setDocImage('');
    }
    setIsDocModalOpen(true);
  };

  const handleSaveDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    const docData: Doctor = {
      id: activeDoctor ? activeDoctor.id : `doc_${Date.now()}`,
      name: docName,
      specialization: docSpec,
      qualification: docQual,
      experience: Number(docExp),
      image: docImage || 'steth',
      bio: docBio,
      timings: docTimings,
      days: docDays,
    };

    if (activeDoctor) {
      updateDoctor(docData);
    } else {
      addDoctor(docData);
    }
    setIsDocModalOpen(false);
    loadData();
  };

  const handleDeleteDoctor = (id: string) => {
    triggerConfirm(
      'Remove Doctor',
      'Are you sure you want to remove this doctor from the hospital roll?',
      () => {
        deleteDoctor(id);
        loadData();
      }
    );
  };

  // Services Actions
  const handleOpenServiceModal = (serv: Specialty | null) => {
    setActiveService(serv);
    if (serv) {
      setServiceTitle(serv.title);
      setServiceIcon(serv.iconName);
      setServiceDesc(serv.description);
      setServiceFeatures(serv.features.join(', '));
      setServiceImg(serv.imageUrl || '');
    } else {
      setServiceTitle('');
      setServiceIcon('Activity');
      setServiceDesc('');
      setServiceFeatures('Feature 1, Feature 2');
      setServiceImg('https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=800');
    }
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanFeatures = serviceFeatures.split(',').map(f => f.trim()).filter(Boolean);
    const servData: Specialty = {
      id: activeService ? activeService.id : `serv_${Date.now()}`,
      title: serviceTitle,
      iconName: serviceIcon,
      description: serviceDesc,
      features: cleanFeatures,
      imageUrl: serviceImg || undefined
    };

    if (activeService) {
      updateService(servData);
    } else {
      addService(servData);
    }
    setIsServiceModalOpen(false);
    loadData();
  };

  const handleDeleteService = (id: string) => {
    triggerConfirm(
      'Remove Department',
      'Are you sure you want to remove this medical department?',
      () => {
        deleteService(id);
        loadData();
      }
    );
  };

  // Appointment Actions
  const handleAppointmentStatus = (appt: Appointment, newStatus: 'Pending' | 'Confirmed' | 'Completed') => {
    const updated = { ...appt, status: newStatus };
    updateAppointment(updated);
    loadData();
  };

  const handleDeleteAppointment = (id: string) => {
    triggerConfirm(
      'Delete Appointment',
      'Delete this appointment record?',
      () => {
        deleteAppointment(id);
        loadData();
      }
    );
  };

  const handlePrintTicket = (appt: Appointment) => {
    setPrintTicket(appt);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  // Inquiry Actions
  const handleInquiryStatus = (inq: Inquiry, newStatus: 'New' | 'Read' | 'Resolved') => {
    const updated = { ...inq, status: newStatus };
    updateInquiry(updated);
    loadData();
  };

  // Feedback Actions
  const handleFeedbackApproval = (fb: Feedback, approve: boolean) => {
    const updated = { ...fb, isApproved: approve };
    updateFeedback(updated);
    loadData();
  };

  const handleSaveFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    const newFb: Feedback = {
      id: `fb_${Date.now()}`,
      name: fbName,
      email: fbEmail,
      content: fbContent,
      rating: fbRating,
      date: new Date().toISOString().split('T')[0],
      isApproved: true, // Manual add is pre-approved!
    };
    addFeedback(newFb);
    setIsFeedbackModalOpen(false);
    setFbName('');
    setFbEmail('');
    setFbContent('');
    setFbRating(5);
    loadData();
  };

  const handleDeleteFeedback = (id: string) => {
    triggerConfirm(
      'Delete Review',
      'Delete this review listing?',
      () => {
        deleteFeedback(id);
        loadData();
      }
    );
  };

  // ---------------------------------------------------------
  // News and Events Handlers
  // ---------------------------------------------------------
  const handlePhotoUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSizeBytes = 100 * 1024 * 1024; // 100MB
      if (file.size > maxSizeBytes) {
        setPhotoError('Error: Photo size exceeds 100MB limit!');
        setNewsPhotoUrl('');
        return;
      }
      setPhotoError('');
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setNewsPhotoUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsPost.trim() || !newsDateTime || !newsLocation.trim()) {
      return;
    }

    if (activeNews) {
      const updatedNews: NewsEvent = {
        ...activeNews,
        title: newsTitle.trim(),
        post: newsPost.trim(),
        dateTime: newsDateTime,
        location: newsLocation.trim(),
        photoUrl: newsPhotoUrl || undefined
      };
      await updateNewsEvent(updatedNews);
    } else {
      const newNews: NewsEvent = {
        id: `news_${Date.now()}`,
        title: newsTitle.trim(),
        post: newsPost.trim(),
        dateTime: newsDateTime,
        location: newsLocation.trim(),
        photoUrl: newsPhotoUrl || undefined
      };
      await addNewsEvent(newNews);
    }

    setIsNewsModalOpen(false);
    setActiveNews(null);
    setNewsTitle('');
    setNewsPost('');
    setNewsDateTime('');
    setNewsLocation('');
    setNewsPhotoUrl('');
    setPhotoError('');
    loadData();
  };

  const handleDeleteNews = (id: string) => {
    triggerConfirm(
      'Delete News / Event',
      'Are you sure you want to delete this news event?',
      async () => {
        await deleteNewsEvent(id);
        loadData();
      }
    );
  };

  const handleEditNewsOpen = (news: NewsEvent) => {
    setActiveNews(news);
    setNewsTitle(news.title);
    setNewsPost(news.post);
    setNewsDateTime(news.dateTime);
    setNewsLocation(news.location);
    setNewsPhotoUrl(news.photoUrl || '');
    setPhotoError('');
    setIsNewsModalOpen(true);
  };

  const handleAddNewsOpen = () => {
    setActiveNews(null);
    setNewsTitle('');
    setNewsPost('');
    setNewsDateTime('');
    setNewsLocation('');
    setNewsPhotoUrl('');
    setPhotoError('');
    setIsNewsModalOpen(true);
  };

  const toggleDay = (day: string) => {
    if (docDays.includes(day)) {
      setDocDays(docDays.filter(d => d !== day));
    } else {
      setDocDays([...docDays, day]);
    }
  };

  // Login Gate View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="bg-gradient-to-br from-blue-900 to-blue-955 text-white p-8 text-center relative">
            <div className="absolute right-4 top-4 text-blue-300 opacity-20">
              <Lock size={120} />
            </div>
            <div className="relative z-10 space-y-2">
              <div className="bg-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <Lock size={24} className="text-white" />
              </div>
              <h1 className="font-display font-extrabold text-2xl uppercase tracking-wide">Navjyoti Administrative Tool</h1>
              <p className="text-blue-200 text-xs font-semibold">Staff login required to process hospital bookings and lists</p>
            </div>
          </div>

          <form onSubmit={handleLoginSubmit} className="p-8 space-y-5 text-left bg-white">
            {loginError && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs font-bold flex items-center gap-2">
                <AlertCircle size={16} className="text-red-650" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block">Username</label>
              <input
                type="text"
                required
                placeholder="Enter username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full text-sm p-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50 text-slate-900"
                id="admin-username-input"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block">Password</label>
              <input
                type="password"
                required
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full text-sm p-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50 text-slate-900"
                id="admin-password-input"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl text-center text-sm transition-all shadow-md shadow-blue-500/15 cursor-pointer flex items-center justify-center gap-2"
              id="admin-login-submit"
            >
              <UserCheck size={16} />
              Validate Session
            </button>

            <button
              type="button"
              onClick={handleQuickLogin}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-center text-xs transition-all cursor-pointer border border-slate-200"
            >
              Demo Auto-Bypass Gate
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2.5 px-4 rounded-xl text-center text-xs transition-all cursor-pointer border border-red-100 flex items-center justify-center gap-1.5 mt-2"
              id="exit-staff-lock-btn"
            >
              <LogOut size={14} />
              Exit Lock, Back to Home
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Print view wrapper for receipt ticket
  if (printTicket) {
    return (
      <div className="min-h-screen bg-white p-8 max-w-xl mx-auto border border-dashed border-gray-300 font-sans text-left text-slate-800" id="print-sheet">
        <div className="text-center border-b pb-6 space-y-1">
          <h1 className="text-2xl font-extrabold uppercase text-blue-900">NAVJYOTI MULTISPECIALITY HOSPITAL</h1>
          <p className="text-xs text-gray-500">Bansi Road, Basti, Uttar Pradesh 272001 (PM-JAY Empanelled)</p>
          <p className="text-xs text-gray-400 font-medium">Contact: +91 70047 10751 | healthca@gmail.com</p>
        </div>

        <div className="py-6 border-b space-y-3.5">
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-150">
            <div>
              <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">CLINICAL OPD TOKEN</span>
              <span className="text-lg font-mono font-extrabold text-blue-700">{printTicket.tokenNo}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">BOOKING STATUS</span>
              <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">{printTicket.status}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
            <div>
              <span className="text-gray-400 font-bold block mb-0.5">Patient Full Name:</span>
              <p className="text-slate-800 text-sm">{printTicket.patientName}</p>
            </div>
            <div>
              <span className="text-gray-400 font-bold block mb-0.5">Mobile Phone No:</span>
              <p className="text-slate-800 text-sm">{printTicket.patientPhone}</p>
            </div>
            <div>
              <span className="text-gray-400 font-bold block mb-0.5">Assigned Specialist:</span>
              <p className="text-slate-800 text-sm">{printTicket.doctorName}</p>
            </div>
            <div>
              <span className="text-gray-400 font-bold block mb-0.5">Department Specialty:</span>
              <p className="text-slate-800 text-sm">{printTicket.department}</p>
            </div>
            <div>
              <span className="text-gray-400 font-bold block mb-0.5">Appointment Date:</span>
              <p className="text-slate-800 text-sm">{printTicket.appointmentDate}</p>
            </div>
            <div>
              <span className="text-gray-400 font-bold block mb-0.5">OPD Arrival Time Slot:</span>
              <p className="text-slate-800 text-sm">{printTicket.appointmentTime}</p>
            </div>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-bold block mb-0.5">Stated Clinical Symptoms:</span>
            <p className="text-slate-700 text-xs italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">"{printTicket.symptoms || 'No symptoms reported.'}"</p>
          </div>

          {printTicket.isAyushmanCardHolder && (
            <div className="p-3 bg-red-50 border border-red-200/50 rounded-xl flex items-center justify-between text-xs font-bold text-red-800">
              <div className="flex items-center gap-1.5">
                <ShieldAlert size={14} className="text-red-600" />
                <span>Ayushman Bharat (PM-JAY) Cover Code:</span>
              </div>
              <span className="font-mono text-xs">{printTicket.ayushmanCardNo || 'Verified Online'}</span>
            </div>
          )}
        </div>

        <div className="pt-6 text-center space-y-4">
          <p className="text-[10px] text-gray-400 font-semibold">Please present this printed token slip at the Navjyoti clinical reception bay 15 minutes before your arrival slot.</p>
          <button
            onClick={() => setPrintTicket(null)}
            className="w-full bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl text-center text-xs uppercase"
            id="exit-print-btn"
          >
            Finished, Close Reciept Print View
          </button>
        </div>
      </div>
    );
  }

  // Website Settings Helpers
  const updateSliderImage = (index: number, base64: string) => {
    const nextSliders = [...(siteSettings.sliders || [])];
    nextSliders[index] = base64;
    setSiteSettings(prev => ({
      ...prev,
      sliders: nextSliders
    }));
  };

  const removeSliderImage = (index: number) => {
    const nextSliders = (siteSettings.sliders || []).filter((_, idx) => idx !== index);
    setSiteSettings(prev => ({
      ...prev,
      sliders: nextSliders
    }));
  };

  // Count helper statistics
  const totalAppointmentsCount = appointments.length;
  const pendingAppointmentsCount = appointments.filter(a => a.status === 'Pending').length;
  const totalDoctorsCount = doctors.length;
  const totalInquiriesCount = inquiries.length;
  const unreadInquiriesCount = inquiries.filter(i => i.status === 'New').length;
  const pendingFeedbacksCount = feedbacks.filter(f => !f.isApproved).length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row antialiased font-sans">
      
      {/* 1. Mobile Header Navigation Bar */}
      <div className="w-full bg-[#0d2a63] text-white p-4 flex md:hidden justify-between items-center shrink-0 border-b border-white/10 shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg flex items-center justify-center shrink-0">
            <LayoutDashboard size={16} />
          </div>
          <span className="font-display font-extrabold text-white text-sm tracking-widest uppercase">
            Admin Console
          </span>
        </div>
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="bg-white/10 hover:bg-[#1e66f5] p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center"
        >
          {isMobileNavOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Left Sidebar Navigation Container */}
      <aside className={`w-full md:w-64 bg-[#0d2a63] text-white flex-col shrink-0 ${isMobileNavOpen ? 'flex' : 'hidden md:flex'}`} id="admin-sidebar">
        {/* Sidebar Header Title Area (Hidden on mobile top since mobile header handles it) */}
        <div className="hidden md:flex p-5 border-b border-white/10 text-center items-center justify-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg flex items-center justify-center shrink-0">
            <LayoutDashboard size={18} />
          </div>
          <span className="font-display font-extrabold text-white text-md tracking-wider uppercase">
            Admin Panel
          </span>
        </div>

        {/* Sidebar Nav links mapping */}
        <nav className="grow py-4 px-3 space-y-1 flex-1">
          {/* Dashboard Nav button */}
          <button
            onClick={() => { setActiveTab('dashboard'); setSearchTerm(''); setIsMobileNavOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'dashboard' ? 'bg-[#1e66f5] text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>

          {/* Doctors Nav button */}
          <button
            onClick={() => { setActiveTab('doctors'); setSearchTerm(''); setIsMobileNavOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'doctors' ? 'bg-[#1e66f5] text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users size={18} />
            <span className="grow">Doctors</span>
            <span className="text-[10px] bg-slate-700/60 text-white font-bold px-2 py-0.5 rounded-full">{totalDoctorsCount}</span>
          </button>

          {/* Services Nav button */}
          <button
            onClick={() => { setActiveTab('services'); setSearchTerm(''); setIsMobileNavOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'services' ? 'bg-[#1e66f5] text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity size={18} />
            <span>Services</span>
          </button>

          {/* Appointments Nav button */}
          <button
            onClick={() => { setActiveTab('appointments'); setSearchTerm(''); setIsMobileNavOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'appointments' ? 'bg-[#1e66f5] text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar size={18} />
            <span className="grow">Appointments</span>
            {pendingAppointmentsCount > 0 && (
              <span className="text-[10px] bg-amber-500 text-white font-extrabold px-2 py-0.5 rounded-full">{pendingAppointmentsCount}</span>
            )}
          </button>

          {/* Inquiry Data Nav button */}
          <button
            onClick={() => { setActiveTab('inquiries'); setSearchTerm(''); setIsMobileNavOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'inquiries' ? 'bg-[#1e66f5] text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Mail size={18} />
            <span className="grow">Inquiry Data</span>
            {unreadInquiriesCount > 0 && (
              <span className="text-[10px] bg-[#ef4444] text-white font-extrabold px-2 py-0.5 rounded-full">{unreadInquiriesCount}</span>
            )}
          </button>

          {/* Feedback Data Nav button */}
          <button
            onClick={() => { setActiveTab('feedbacks'); setSearchTerm(''); setIsMobileNavOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'feedbacks' ? 'bg-[#1e66f5] text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquare size={18} />
            <span className="grow">Feedback Data</span>
            {pendingFeedbacksCount > 0 && (
              <span className="text-[10px] bg-[#10b981] text-white font-extrabold px-2 py-0.5 rounded-full">{pendingFeedbacksCount}</span>
            )}
          </button>

          {/* Website Settings Nav button */}
          <button
            onClick={() => { setActiveTab('settings'); setSearchTerm(''); setIsMobileNavOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'settings' ? 'bg-[#1e66f5] text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings size={18} />
            <span>Website Settings</span>
          </button>

          {/* News & Events Nav button */}
          <button
            onClick={() => { setActiveTab('news'); setSearchTerm(''); setIsMobileNavOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'news' ? 'bg-[#1e66f5] text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText size={18} />
            <span className="grow">News & Events</span>
            {newsEvents.length > 0 && (
              <span className="text-[10px] bg-sky-500 text-white font-extrabold px-2 py-0.5 rounded-full">{newsEvents.length}</span>
            )}
          </button>
        </nav>

        {/* Sidebar Footer Log Out action */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="bg-white/5 p-3 rounded-xl text-left">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Logged in as</p>
            <span className="text-xs font-bold font-mono text-slate-100 block truncate">Administrator</span>
          </div>

          <button
            onClick={() => { handleAdminLogout(); setIsMobileNavOpen(false); }}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold text-red-400 hover:text-white hover:bg-red-650 transition-colors flex items-center gap-3 cursor-pointer"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Content Canvas */}
      <main className="grow p-6 md:p-8 max-w-7xl mx-auto w-full text-left space-y-6">
        
        {/* Banner Top Area */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2 uppercase">
              {activeTab === 'dashboard' && 'Administrative Overview'}
              {activeTab === 'doctors' && 'Clinician & Specialists Roll'}
              {activeTab === 'services' && 'Departments & Offerings'}
              {activeTab === 'appointments' && 'Appointment Scheduler Queue'}
              {activeTab === 'inquiries' && 'User Inquiries Dashboard'}
              {activeTab === 'feedbacks' && 'Testimonial Moderation Hub'}
              {activeTab === 'settings' && 'Website Settings & Slideshow'}
              {activeTab === 'news' && 'News & Campus Events Blog Manager'}
            </h2>
            <p className="text-xs text-slate-400 font-medium tracking-tight mt-1">
              Navjyoti Multispeciality Hospital • Real-time Administration Panel
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-500 bg-slate-100 py-1.5 px-3 rounded-full flex items-center gap-1.5 self-start sm:self-auto">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Dynamic Secure Syncing Active</span>
          </div>
        </header>

        {/* Core Tab-by-Tab Panel Blocks */}
        
        {/* Tab 1: DASHBOARD VIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Counts Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Calendar size={22} />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 font-extrabold tracking-wider block">OPD Bookings</span>
                  <span className="text-2xl font-black text-slate-800">{totalAppointmentsCount}</span>
                  <span className="text-[10px] text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full font-bold ml-1.5 inline-block">
                    {pendingAppointmentsCount} pending
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                  <Users size={22} />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 font-extrabold tracking-wider block">Specialists</span>
                  <span className="text-2xl font-black text-slate-800">{totalDoctorsCount}</span>
                  <span className="text-[10px] text-violet-605 text-violet-700 font-medium block">Board-certified clinicians</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 font-extrabold tracking-wider block">Total Inquiries</span>
                  <span className="text-2xl font-black text-slate-800">{totalInquiriesCount}</span>
                  {unreadInquiriesCount > 0 ? (
                    <span className="text-[10px] text-red-650 bg-red-50 text-red-700 px-2 py-0.5 rounded-full font-bold block mt-0.5">
                      {unreadInquiriesCount} unread query
                    </span>
                  ) : (
                    <span className="text-[10px] text-green-700 block font-medium">All inquiries reviewed</span>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageSquare size={22} />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 font-extrabold tracking-wider block">Patient Reviews</span>
                  <span className="text-2xl font-black text-slate-800">{feedbacks.length}</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold ml-1.5 inline-block">
                    {feedbacks.filter(f => f.isApproved).length} approved
                  </span>
                </div>
              </div>

            </div>

            {/* Quick Actions and Live statistics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Box 1: Urgent scheduler tasks */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center border-b pb-3.5">
                  <h3 className="font-display font-extrabold text-slate-800 text-md flex items-center gap-2">
                    <Calendar size={18} className="text-blue-600" />
                    Pending OPD Ticket Queue ({pendingAppointmentsCount})
                  </h3>
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className="text-xs text-blue-600 hover:underline font-bold flex items-center"
                  >
                    View list
                    <ChevronRight size={13} />
                  </button>
                </div>

                {appointments.filter(a => a.status === 'Pending').length === 0 ? (
                  <div className="py-12 border border-dashed border-slate-200 rounded-2xl text-center space-y-2">
                    <CheckCircle2 size={36} className="text-green-500 mx-auto" />
                    <p className="text-slate-700 font-bold text-sm">Perfect! No pending bookings to review.</p>
                    <p className="text-slate-405 text-xs">All scheduled tokens have been confirmed or completed.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto pr-2">
                    {appointments.filter(a => a.status === 'Pending').map(appt => (
                      <div key={appt.id} className="py-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-950 text-sm">{appt.patientName}</span>
                            <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">Token: {appt.tokenNo}</span>
                          </div>
                          <div className="text-xs text-slate-500 mt-1 space-x-1.5">
                            <span className="font-semibold text-blue-700">{appt.doctorName}</span>
                            <span>•</span>
                            <span>{appt.appointmentDate} • {appt.appointmentTime}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleAppointmentStatus(appt, 'Confirmed')}
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 p-1.5 rounded-lg border border-emerald-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <Check size={13} />
                            Approve
                          </button>
                          <button
                            onClick={() => handleDeleteAppointment(appt.id)}
                            className="bg-red-50 hover:bg-red-100 text-red-800 p-1.5 rounded-lg border border-red-200 text-xs font-bold transition-colors cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Box 2: Quick Start and system metrics */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-display font-extrabold text-slate-800 text-md border-b pb-3.5 flex items-center gap-2">
                  <Settings size={18} className="text-blue-600" />
                  Quick Tools Board
                </h3>

                <div className="space-y-3 pt-1">
                  <button
                    onClick={() => handleOpenDocModal(null)}
                    className="w-full bg-blue-50 hover:bg-blue-105 hover:bg-blue-100/70 border border-blue-200/55 p-3.5 rounded-2xl text-left text-blue-800 font-bold text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Plus size={16} />
                      <span>Onboard New Doctor</span>
                    </div>
                    <ChevronRight size={15} />
                  </button>

                  <button
                    onClick={() => handleOpenServiceModal(null)}
                    className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 p-3.5 rounded-2xl text-left text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Plus size={16} />
                      <span>Add Medical Department</span>
                    </div>
                    <ChevronRight size={15} />
                  </button>

                  <button
                    onClick={() => setIsFeedbackModalOpen(true)}
                    className="w-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 p-3.5 rounded-2xl text-left text-emerald-800 font-bold text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Plus size={16} />
                      <span>Manual Patient Review Entry</span>
                    </div>
                    <ChevronRight size={15} />
                  </button>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 text-xs">
                  <span className="font-extrabold text-slate-700 uppercase tracking-wider block mb-1">Database health status</span>
                  <div className="space-y-1 text-slate-400 font-medium">
                    <p>Doctors: {totalDoctorsCount}</p>
                    <p>Services: {services.length}</p>
                    <p>Appointments: {totalAppointmentsCount} records</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: DOCTORS VIEW */}
        {activeTab === 'doctors' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-6 animate-fadeIn">
            {/* Search and control ribbon */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3.5 top-3 text-slate-400" size={17} />
                <input
                  type="text"
                  placeholder="Search doctor name or specialization..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full text-sm pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50 text-slate-800"
                  id="doctor-search"
                />
              </div>

              <button
                onClick={() => handleOpenDocModal(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                id="add-doctor-btn"
              >
                <Plus size={16} />
                Onboard Doctor
              </button>
            </div>

            {/* Doctors Roll Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-[#0d2a63] font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-4">Doctor Details</th>
                    <th className="p-4">Qualification</th>
                    <th className="p-4">Experience</th>
                    <th className="p-4">Schedules & Timing Slot</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {doctors.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.specialization.toLowerCase().includes(searchTerm.toLowerCase())).map(doc => (
                    <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3.5">
                          {doc.image && (doc.image.startsWith('data:image/') || doc.image.startsWith('http://') || doc.image.startsWith('https://')) ? (
                            <div className="w-12 h-15 sm:w-14 sm:h-17 rounded-xl overflow-hidden border border-slate-200 shadow-sm shrink-0 bg-slate-50">
                              <img 
                                src={doc.image} 
                                alt={doc.name} 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-15 sm:w-14 sm:h-17 rounded-xl bg-gradient-to-tr from-blue-50 to-blue-100 flex items-center justify-center text-blue-600 shrink-0 border border-slate-200">
                              <User size={22} className="text-blue-700 stroke-[1.5]" />
                            </div>
                          )}
                          <div className="space-y-0.5">
                            <div className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">{doc.name}</div>
                            <div className="text-xs text-blue-700 font-extrabold">{doc.specialization}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-700 font-medium">{doc.qualification}</td>
                      <td className="p-4 text-slate-800 font-bold">{doc.experience} Years</td>
                      <td className="p-4 space-y-1 leading-tight">
                        <div className="text-xs text-slate-700 font-extrabold flex items-center gap-1">
                          <Clock size={12} className="text-slate-405 text-slate-550" />
                          <span>{doc.timings}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium truncate max-w-[200px]" title={doc.days.join(', ')}>
                          Days: {doc.days.join(', ')}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex gap-1 justify-end">
                          <button
                            onClick={() => handleOpenDocModal(doc)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-650 p-2 rounded-lg border border-slate-200 cursor-pointer"
                            title="Edit Profile"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteDoctor(doc.id)}
                            className="bg-red-50 hover:bg-red-100 text-red-700 p-2 rounded-lg border border-red-200 cursor-pointer"
                            title="Remove Doctor"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: SERVICES VIEW */}
        {activeTab === 'services' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3.5 top-3 text-slate-400" size={17} />
                <input
                  type="text"
                  placeholder="Search department title..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full text-sm pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50 text-slate-800"
                />
              </div>

              <button
                onClick={() => handleOpenServiceModal(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Plus size={16} />
                Add Department
              </button>
            </div>

            {/* List of departments in table as requested */}
            <div className="overflow-x-auto rounded-2xl border border-slate-250 shadow-sm bg-white">
              <table className="w-full text-left text-xs sm:text-sm min-w-[700px]">
                <thead className="bg-[#0c2a63] text-white font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-4 rounded-tl-2xl">Department Title</th>
                    <th className="p-4">Showcase Image</th>
                    <th className="p-4">Description</th>
                    <th className="p-4">Surgeries & Features</th>
                    <th className="p-4 text-right rounded-tr-2xl">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {services.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase())).map(serv => {
                    const IconComp = departmentIconMap[serv.iconName] || Activity;
                    const isAttachedJpeg = serv.imageUrl?.startsWith('data:image/');

                    return (
                      <tr key={serv.id} className="hover:bg-blue-50/20 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-blue-105 bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                              <IconComp size={16} />
                            </div>
                            <div>
                              <div className="font-extrabold text-slate-900 leading-tight text-sm sm:text-base">{serv.title}</div>
                              <div className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Icon: {serv.iconName}</div>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          {serv.imageUrl ? (
                            <div className="flex items-center gap-2">
                              <img 
                                src={serv.imageUrl} 
                                alt={serv.title} 
                                className="w-12 h-12 rounded-lg object-cover border border-slate-200 shadow-xs shrink-0"
                                referrerPolicy="no-referrer"
                              />
                              <div className="flex flex-col gap-0.5">
                                {isAttachedJpeg ? (
                                  <span className="text-[9px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded-full select-none w-max leading-none">
                                    Attached JPEG
                                  </span>
                                ) : (
                                  <span className="text-[9px] bg-blue-100 text-blue-800 font-extrabold px-1.5 py-0.5 rounded-full select-none w-max leading-none">
                                    Image URL
                                  </span>
                                )}
                                <span className="text-[9px] text-slate-400 font-bold max-w-[110px] truncate" title={serv.imageUrl}>
                                  {isAttachedJpeg ? 'Local JPEG File' : 'External Asset'}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-[9px] bg-slate-100 text-slate-400 font-bold px-2 py-1 rounded-md">
                              No Image Set
                            </span>
                          )}
                        </td>

                        <td className="p-4 max-w-[200px]">
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed" title={serv.description}>
                            {serv.description}
                          </p>
                        </td>

                        <td className="p-4 max-w-[220px]">
                          <div className="flex flex-wrap gap-1">
                            {serv.features && serv.features.map((f, idx) => (
                              <span key={idx} className="text-[10px] bg-[#f0f4fc] text-blue-900 font-extrabold px-2 py-0.5 rounded-full border border-blue-105">
                                {f}
                              </span>
                            ))}
                            {(!serv.features || serv.features.length === 0) && (
                              <span className="text-xs text-slate-400 font-bold">None set</span>
                            )}
                          </div>
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex gap-1.5 justify-end">
                            <button
                              onClick={() => handleOpenServiceModal(serv)}
                              className="bg-slate-50 hover:bg-slate-100 text-slate-600 p-2 rounded-lg border border-slate-200 cursor-pointer shadow-xs transition-all active:scale-95"
                              title="Edit Department"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteService(serv.id)}
                              className="bg-red-50 hover:bg-red-100 text-red-700 p-2 rounded-lg border border-red-200 cursor-pointer shadow-xs transition-all active:scale-95"
                              title="Delete Department"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {services.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-400 font-bold text-xs bg-slate-50/50">
                        No departments found matching "{searchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: APPOINTMENTS VIEW */}
        {activeTab === 'appointments' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-6 animate-fadeIn">
            
            {/* Filter Ribbon */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {['All', 'Pending', 'Confirmed', 'Completed'].map(state => (
                  <button
                    key={state}
                    onClick={() => { setStatusFilter(state); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      statusFilter === state
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-650 hover:bg-slate-200'
                    }`}
                  >
                    {state}
                  </button>
                ))}
              </div>

              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3.5 top-3 text-slate-400" size={17} />
                <input
                  type="text"
                  placeholder="Field search customer status..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full text-sm pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50 text-slate-800"
                />
              </div>
            </div>

            {/* List */}
            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-[#0d2a63] font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-4">OPD Token</th>
                    <th className="p-4">Patient Name</th>
                    <th className="p-4">Assigned Consultant</th>
                    <th className="p-4">Slot timings</th>
                    <th className="p-4">Schemed PM-JAY Cover</th>
                    <th className="p-4">Approval Status</th>
                    <th className="p-4 text-right">Row Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointments
                    .filter(a => {
                      if (statusFilter !== 'All' && a.status !== statusFilter) return false;
                      const textMatch = a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                        a.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        a.tokenNo.toLowerCase().includes(searchTerm.toLowerCase());
                      return textMatch;
                    })
                    .map(appt => (
                      <tr key={appt.id} className="hover:bg-slate-50/20 transition-colors">
                        <td className="p-4 font-mono font-bold text-blue-700 text-sm">
                          {appt.tokenNo}
                        </td>
                        <td className="p-4">
                          <div className="font-semibold text-slate-900 text-sm">{appt.patientName}</div>
                          <div className="text-[10px] text-slate-400 font-semibold">{appt.patientPhone}</div>
                        </td>
                        <td className="p-4 text-slate-800 font-semibold">
                          <div>{appt.doctorName}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{appt.department}</div>
                        </td>
                        <td className="p-4 text-xs font-semibold text-slate-700 space-y-0.5">
                          <div>Date: {appt.appointmentDate}</div>
                          <div className="text-blue-600">Arrival: {appt.appointmentTime}</div>
                        </td>
                        <td className="p-4">
                          {appt.isAyushmanCardHolder ? (
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 block w-max tracking-wide shadow-sm animate-pulse">
                              PM-JAY Cover Active
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-405 font-medium text-slate-400">Regular Consultation</span>
                          )}
                        </td>
                        <td className="p-4">
                          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase ${
                            appt.status === 'Confirmed' ? 'bg-green-105 bg-green-100 text-green-800 border border-green-150' : 
                            appt.status === 'Completed' ? 'bg-blue-105 bg-blue-100 text-blue-800' :
                            'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}>
                            {appt.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex gap-1.5 justify-end items-center">
                            {appt.status === 'Pending' && (
                              <button
                                onClick={() => handleAppointmentStatus(appt, 'Confirmed')}
                                className="bg-green-600 hover:bg-green-700 text-white p-1.5 rounded-lg border border-transparent shadow-sm hover:scale-101 cursor-pointer font-bold text-xs"
                                title="Confirm Booking"
                              >
                                Approve
                              </button>
                            )}
                            {appt.status === 'Confirmed' && (
                              <button
                                onClick={() => handleAppointmentStatus(appt, 'Completed')}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-lg border border-transparent shadow-sm cursor-pointer font-bold text-[10px] uppercase"
                                title="Set Completed"
                              >
                                Mark Done
                              </button>
                            )}
                            <button
                              onClick={() => handlePrintTicket(appt)}
                              className="bg-slate-100 hover:bg-slate-205 hover:bg-slate-200 text-slate-700 p-1.5 rounded-lg border border-slate-200"
                              title="Print Token Slip"
                            >
                              <Printer size={13} />
                            </button>
                            <button
                              onClick={() => handleDeleteAppointment(appt.id)}
                              className="bg-red-50 hover:bg-red-100 text-red-700 p-1.5 rounded-lg border border-red-200"
                            >
                              <X size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: INQUIRIES VIEW */}
        {activeTab === 'inquiries' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 animate-fadeIn">
            {/* List */}
            {inquiries.length === 0 ? (
              <div className="py-16 text-center text-slate-400 border border-dashed border-slate-200 rounded-3xl space-y-2">
                <CheckCircle2 size={40} className="text-green-500 mx-auto" />
                <p className="font-bold text-sm text-slate-755 text-slate-600">No client contact queries registered.</p>
                <p className="text-xs">Any new form requests submitted inside contact block appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {inquiries.map(inq => (
                  <div key={inq.id} className={`p-5 rounded-2xl border transition-all ${
                    inq.status === 'New' ? 'bg-blue-50/50 border-blue-200 shadow-sm' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3.5 border-b border-dashed border-slate-205/85">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 text-base">{inq.name}</span>
                          <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${
                            inq.status === 'New' ? 'bg-blue-600 text-white' : inq.status === 'Read' ? 'bg-slate-200 text-slate-700' : 'bg-emerald-100 text-emerald-800'
                          }`}>{inq.status}</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1 space-x-2">
                          <span>Phone: {inq.phone}</span>
                          <span>•</span>
                          <span>Email: {inq.email}</span>
                        </div>
                      </div>

                      <div className="text-right text-[10px] text-slate-400 font-mono font-bold">
                        Submitted: {inq.date}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 font-medium py-3.5 italic bg-slate-50/30 p-2.5 rounded-xl mt-3">
                      "{inq.message}"
                    </p>

                    <div className="flex justify-between items-center pt-2">
                      <div className="flex gap-2">
                        {inq.status !== 'Resolved' && (
                          <button
                            onClick={() => handleInquiryStatus(inq, 'Resolved')}
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-250 border-emerald-200 text-[10px] font-extrabold px-3 py-1 rounded-lg"
                          >
                            Mark Handled
                          </button>
                        )}
                        {inq.status === 'New' && (
                          <button
                            onClick={() => handleInquiryStatus(inq, 'Read')}
                            className="bg-slate-105 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-[10px] font-bold px-3 py-1 rounded-lg"
                          >
                            Mark Read
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          triggerConfirm(
                            'Delete Inquiry',
                            'Are you sure you want to delete this contact message / inquiry?',
                            () => {
                              deleteInquiry(inq.id);
                              loadData();
                            }
                          );
                        }}
                        className="text-red-600 hover:text-red-750 p-1 rounded hover:bg-red-50 text-xs font-bold"
                      >
                        Delete Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 6: FEEDBACKS VIEW */}
        {activeTab === 'feedbacks' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 animate-fadeIn">
            
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="font-display font-extrabold text-[#0d2a63] text-lg">Reviews Registry</h3>
              <button
                onClick={() => setIsFeedbackModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-705 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-1.5"
              >
                <Plus size={14} />
                Insert Review
              </button>
            </div>

            {feedbacks.length === 0 ? (
              <div className="py-16 text-center text-slate-400 border border-dashed border-slate-200 rounded-3xl space-y-2">
                <MessageSquare size={40} className="text-slate-350 mx-auto" />
                <p className="font-bold text-sm text-slate-700">No Patient Testimonials.</p>
                <p className="text-xs">Reviews submitted on the webpage testimonial panel appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {feedbacks.map(fb => (
                  <div key={fb.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-1">
                          {Array.from({ length: fb.rating }).map((_, idx) => (
                            <Star key={idx} size={13} className="fill-yellow-400 text-yellow-405 text-yellow-400" />
                          ))}
                        </div>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          fb.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-101 bg-yellow-100 text-yellow-800 animate-pulse'
                        }`}>
                          {fb.isApproved ? 'Approved & Public' : 'Moderation Pending'}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 italic font-medium py-3">"{fb.content}"</p>
                      
                      <div className="text-xs text-slate-500 font-semibold flex justify-between items-center border-t border-dashed border-slate-200 pt-2.5">
                        <span>Patient: {fb.name} • {fb.email}</span>
                        <span className="font-mono text-[10px]">{fb.date}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-100">
                      <div className="flex gap-2">
                        {!fb.isApproved ? (
                          <button
                            onClick={() => handleFeedbackApproval(fb, true)}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold text-[10px] uppercase px-3 py-1.5 rounded-lg shadow-sm"
                          >
                            Approve for Public
                          </button>
                        ) : (
                          <button
                            onClick={() => handleFeedbackApproval(fb, false)}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-[10px] uppercase px-3 py-1.5 rounded-lg"
                          >
                            De-authorize Review
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteFeedback(fb.id)}
                        className="text-red-700 hover:bg-red-50 p-1.5 rounded-lg border border-transparent hover:border-red-200 text-xs font-bold"
                      >
                        Remove Listing
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 7: WEBSITE SETTINGS VIEW */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fadeIn pb-12">
            
            {/* Saved Toast Alert */}
            {isSettingsSavedStatus && (
              <div id="settings-save-success-alert" className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-4 rounded-2xl flex items-center gap-3 shadow-sm">
                <CheckCircle2 className="text-emerald-600 shrink-0" size={20} />
                <div>
                  <p className="font-extrabold text-sm">Settings Synced Successfully!</p>
                  <p className="text-xs text-emerald-700/90">Hospital logo, homepage header, and sliders have been saved and applied to key locations across the website.</p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200">
              <div>
                <h3 className="font-display font-black text-slate-900 text-lg uppercase tracking-wide">Hospital Branding & Slideshow Config</h3>
                <p className="text-xs text-slate-500 font-medium tracking-tight">Upload high-resolution images to elevate the hospital's visual identity on the public pages.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  saveSiteSettings(siteSettings);
                  setIsSettingsSavedStatus(true);
                  setTimeout(() => setIsSettingsSavedStatus(false), 5050);
                }}
                className="w-full sm:w-auto bg-[#1e66f5] hover:bg-[#154fc4] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-200 cursor-pointer"
              >
                Save Site Configurations
              </button>
            </div>

            {/* Grid for Logo and Hero Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Card A: Hospital Logo Upload */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-5">
                <div className="border-b pb-3">
                  <h4 className="font-display font-extrabold text-[#0d2a63] text-sm uppercase tracking-wider">Hospital Brand Logo</h4>
                  <p className="text-[11px] text-slate-400 font-medium">Replaces the default circular medical logo in navbar, footer, and submenus</p>
                </div>

                {/* Previews and file upload drag/drop zone */}
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  
                  {/* Real-time Preview Area */}
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Current Logo</span>
                    <div className="w-24 h-24 rounded-2xl border border-slate-200 p-2.5 bg-slate-50 flex items-center justify-center shadow-inner overflow-hidden">
                      {siteSettings.logoUrl ? (
                        <img 
                          src={siteSettings.logoUrl} 
                          alt="Hospital Custom Logo" 
                          className="max-w-full max-h-full object-contain rounded-lg"
                        />
                      ) : (
                        <div className="text-center space-y-1">
                          <Heart size={24} className="text-slate-350 mx-auto animate-pulse" />
                          <span className="text-[9px] text-slate-400 font-bold block">DEFAULT</span>
                        </div>
                      )}
                    </div>
                    {siteSettings.logoUrl && (
                      <button
                        type="button"
                        onClick={() => setSiteSettings(prev => ({ ...prev, logoUrl: '' }))}
                        className="text-[10px] font-bold text-red-600 hover:underline hover:text-red-800"
                      >
                        Reset to default
                      </button>
                    )}
                  </div>

                  {/* Manual trigger / Drag zone */}
                  <div 
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => {
                      e.preventDefault();
                      const file = e.dataTransfer.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          if (typeof reader.result === 'string') {
                            setSiteSettings(prev => ({ ...prev, logoUrl: reader.result as string }));
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    onClick={() => document.getElementById('logo-file-input')?.click()}
                    className="grow w-full border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-6 text-center cursor-pointer hover:bg-blue-50/20 transition-all space-y-2 flex flex-col items-center justify-center min-h-[120px]"
                  >
                    <Plus size={20} className="text-blue-500" />
                    <p className="text-xs font-extrabold text-slate-700">Drag or Click to Choose File</p>
                    <p className="text-[10px] text-slate-400 leading-tight">PNG, JPG, SVG up to 1.5MB</p>
                    <input 
                      type="file" 
                      id="logo-file-input"
                      className="hidden" 
                      accept="image/*"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === 'string') {
                              setSiteSettings(prev => ({ ...prev, logoUrl: reader.result as string }));
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Card B: Home Page Header Text & Image Customization */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
                <div className="border-b pb-3">
                  <h4 className="font-display font-extrabold text-[#0d2a63] text-sm uppercase tracking-wider">Public Hero & Header Image</h4>
                  <p className="text-[11px] text-slate-400 font-medium">Replaces backend default text and sets a custom header backdrop image</p>
                </div>

                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase">Header Main Title</label>
                    <input
                      type="text"
                      className="w-full text-xs font-semibold px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                      placeholder="e.g. Caring Hearts. Expert Hands."
                      value={siteSettings.heroTitle || ''}
                      onChange={e => setSiteSettings(prev => ({ ...prev, heroTitle: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase">Header Description Copy</label>
                    <textarea
                      rows={2}
                      className="w-full text-xs font-semibold px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                      placeholder="Enter subheading description text..."
                      value={siteSettings.heroSubtitle || ''}
                      onChange={e => setSiteSettings(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                    />
                  </div>

                  {/* Header Image Setup */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    <div className="sm:col-span-4 flex flex-col items-center gap-1.5 border border-slate-100 p-2 rounded-xl bg-slate-50">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">Header BG</span>
                      <div className="w-full h-14 rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden">
                        {siteSettings.heroImageUrl ? (
                          <img 
                            src={siteSettings.heroImageUrl} 
                            alt="Header Backdrop Thumbnail" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[9px] text-slate-400 font-bold">DEFAULT (STYLISH CARD)</span>
                        )}
                      </div>
                      {siteSettings.heroImageUrl && (
                        <button
                          type="button"
                          onClick={() => setSiteSettings(prev => ({ ...prev, heroImageUrl: '' }))}
                          className="text-[9px] text-red-600 hover:underline"
                        >
                          Clear Image
                        </button>
                      )}
                    </div>

                    <div 
                      onDragOver={e => e.preventDefault()}
                      onDrop={e => {
                        e.preventDefault();
                        const file = e.dataTransfer.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === 'string') {
                              setSiteSettings(prev => ({ ...prev, heroImageUrl: reader.result as string }));
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      onClick={() => document.getElementById('herobg-file-input')?.click()}
                      className="sm:col-span-8 border border-dashed border-slate-200 hover:border-blue-500 rounded-xl p-3 text-center cursor-pointer hover:bg-blue-50/25 transition-all text-xs flex flex-col items-center justify-center h-20"
                    >
                      <Plus size={14} className="text-blue-500" />
                      <p className="font-extrabold text-slate-700 leading-tight">Drag / Click Header Image</p>
                      <input 
                        type="file" 
                        id="herobg-file-input"
                        className="hidden" 
                        accept="image/*"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (typeof reader.result === 'string') {
                                setSiteSettings(prev => ({ ...prev, heroImageUrl: reader.result as string }));
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section C: Slider Image Management (Up to 4 Slots) */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-5">
              <div className="border-b pb-3">
                <h4 className="font-display font-extrabold text-[#0d2a63] text-sm uppercase tracking-wider">Homepage Image Slider Carousel (Up to 4 Slots)</h4>
                <p className="text-[11px] text-slate-400 font-medium">Add up to 4 high-resolution slider photographs. If slides are saved, the home header visual will slide automatically!</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((index) => {
                  const currentSlideSrc = siteSettings.sliders?.[index] || '';
                  
                  return (
                    <div 
                      key={index} 
                      className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 flex flex-col justify-between space-y-4 hover:border-blue-300 transition-colors"
                    >
                      {/* Slot Header Label */}
                      <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                        <span className="text-[11px] font-bold text-[#0d2a63] uppercase font-mono tracking-widest">
                          Slide Slot #{index + 1}
                        </span>
                        {currentSlideSrc ? (
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">
                            Active Slide
                          </span>
                        ) : (
                          <span className="text-[9px] bg-slate-200 text-slate-500 font-bold px-2 py-0.5 rounded-full">
                            Empty Slot
                          </span>
                        )}
                      </div>

                      {/* Display thumbnail preview or upload actions */}
                      <div className="space-y-3">
                        <div className="w-full h-32 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden relative group">
                          {currentSlideSrc ? (
                            <>
                              <img 
                                src={currentSlideSrc} 
                                alt={`Slide ${index + 1} Preview`} 
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                <button
                                  type="button"
                                  onClick={() => removeSliderImage(index)}
                                  className="bg-red-650 hover:bg-red-750 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg shadow-md uppercase"
                                >
                                  Remove Slide
                                </button>
                              </div>
                            </>
                          ) : (
                            <div 
                              onDragOver={e => e.preventDefault()}
                              onDrop={e => {
                                e.preventDefault();
                                const file = e.dataTransfer.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = () => {
                                    if (typeof reader.result === 'string') {
                                      updateSliderImage(index, reader.result as string);
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              onClick={() => document.getElementById(`slider-file-input-${index}`)?.click()}
                              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50/20 text-center p-3 space-y-1.5"
                            >
                              <Plus size={16} className="text-blue-500" />
                              <span className="text-[10px] font-extrabold text-slate-700">Drop / Click to Add</span>
                              <span className="text-[9px] text-slate-400 leading-tight">Dimensions: 800x600 recommended</span>
                            </div>
                          )}
                        </div>

                        {/* Hidden File Input tag */}
                        <input 
                          type="file" 
                          id={`slider-file-input-${index}`}
                          className="hidden" 
                          accept="image/*"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                if (typeof reader.result === 'string') {
                                  updateSliderImage(index, reader.result as string);
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </div>

                      {/* Action controllers */}
                      <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400">
                        <span>Replaces hero card</span>
                        {currentSlideSrc && (
                          <button
                            type="button"
                            onClick={() => removeSliderImage(index)}
                            className="text-red-700 hover:underline font-bold"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card D: About Us Page Image Management */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-5">
              <div className="border-b pb-3">
                <h4 className="font-display font-extrabold text-[#0d2a63] text-sm uppercase tracking-wider">Hospital Biography Photo (About Us Page)</h4>
                <p className="text-[11px] text-slate-400 font-medium">Add or edit the main photo of the hospital showcased in the Heritage & About Us section</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="shrink-0 flex flex-col items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono font-bold">Current About Us Photo</span>
                  <div className="w-56 h-72 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center shadow-inner overflow-hidden">
                    {siteSettings.aboutPhotoUrl ? (
                      <img 
                        src={siteSettings.aboutPhotoUrl} 
                        alt="Hospital About Us Portrait" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <span className="text-[10px] text-slate-400 font-bold block">No Photo Configured</span>
                        <span className="text-[8px] text-slate-400">Falls back to dynamic theme card</span>
                      </div>
                    )}
                  </div>
                  {siteSettings.aboutPhotoUrl && (
                    <button
                      type="button"
                      onClick={() => setSiteSettings(prev => ({ ...prev, aboutPhotoUrl: '' }))}
                      className="text-[10px] font-bold text-red-600 hover:underline"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>

                <div 
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        if (typeof reader.result === 'string') {
                          setSiteSettings(prev => ({ ...prev, aboutPhotoUrl: reader.result as string }));
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  onClick={() => document.getElementById('about-photo-file-input')?.click()}
                  className="grow w-full border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-6 text-center cursor-pointer hover:bg-blue-50/20 transition-all space-y-2 flex flex-col items-center justify-center min-h-[140px]"
                >
                  <Plus size={20} className="text-blue-500" />
                  <p className="text-xs font-extrabold text-slate-700">Drag & Drop Image or Click to Browse</p>
                  <p className="text-[10px] text-slate-400 leading-tight">PNG, JPG, SVG up to 2MB</p>
                  <input 
                    type="file" 
                    id="about-photo-file-input"
                    className="hidden" 
                    accept="image/*"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          if (typeof reader.result === 'string') {
                            setSiteSettings(prev => ({ ...prev, aboutPhotoUrl: reader.result as string }));
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Card E: Leadership Messages (Chairman & Director Profiles) */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-6">
              <div className="border-b pb-3">
                <h4 className="font-display font-extrabold text-[#0d2a63] text-sm uppercase tracking-wider">Leadership Messages Panel</h4>
                <p className="text-[11px] text-slate-400 font-medium">Customize photographs, titles, and welcome statements of the Chairman and Director displayed on the About Us page</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chairman Configuration */}
                <div className="space-y-4 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                  <div className="border-b pb-2 flex justify-between items-center">
                    <span className="font-bold text-xs text-[#0d2a63] uppercase tracking-wide">Chairman Desk</span>
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-[#0d2a63] text-white font-mono">CHAIRMAN</span>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Chairman Name</label>
                        <input
                          type="text"
                          className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                          value={siteSettings.chairmanName || ''}
                          onChange={e => setSiteSettings(prev => ({ ...prev, chairmanName: e.target.value }))}
                          placeholder="e.g. Dr. Prem Prakash Dubey"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Qualifications</label>
                        <input
                          type="text"
                          className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                          value={siteSettings.chairmanQualification || ''}
                          onChange={e => setSiteSettings(prev => ({ ...prev, chairmanQualification: e.target.value }))}
                          placeholder="e.g. MBBS, MS (Ophthalmology)"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Chairman Message / Bio</label>
                      <textarea
                        rows={5}
                        className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                        value={siteSettings.chairmanBio || ''}
                        onChange={e => setSiteSettings(prev => ({ ...prev, chairmanBio: e.target.value }))}
                        placeholder="Welcome message from the Chairman..."
                      />
                    </div>

                    {/* Chairman Image Attachment zone */}
                    <div className="flex items-center gap-4 pt-2">
                      <div className="w-16 h-16 rounded-full border border-slate-200 overflow-hidden flex items-center justify-center shrink-0 bg-white">
                        {siteSettings.chairmanPhotoUrl ? (
                          <img 
                            src={siteSettings.chairmanPhotoUrl} 
                            alt="Chairman portrait preview" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span className="text-[9px] text-slate-400 font-bold">No Photo</span>
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <button
                          type="button"
                          onClick={() => document.getElementById('chairman-photo-file-input')?.click()}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-bold inline-block cursor-pointer transition-all active:scale-95 border-none"
                        >
                          Attach Photo (JPEG)
                        </button>
                        <input 
                          type="file" 
                          id="chairman-photo-file-input"
                          className="hidden" 
                          accept="image/*"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                if (typeof reader.result === 'string') {
                                  setSiteSettings(prev => ({ ...prev, chairmanPhotoUrl: reader.result as string }));
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        {siteSettings.chairmanPhotoUrl && (
                          <button
                            type="button"
                            onClick={() => setSiteSettings(prev => ({ ...prev, chairmanPhotoUrl: '' }))}
                            className="ml-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-[10px] font-bold inline-block cursor-pointer transition-all active:scale-95 border-none"
                          >
                            Remove
                          </button>
                        )}
                        <p className="text-[8px] text-slate-400 leading-tight">Drag & Drop supported or click to browse local files.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Director Configuration */}
                <div className="space-y-4 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                  <div className="border-b pb-2 flex justify-between items-center">
                    <span className="font-bold text-xs text-[#0d2a63] uppercase tracking-wide">Director Desk</span>
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-blue-600 text-white font-mono">DIRECTOR</span>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Director Name</label>
                        <input
                          type="text"
                          className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                          value={siteSettings.directorName || ''}
                          onChange={e => setSiteSettings(prev => ({ ...prev, directorName: e.target.value }))}
                          placeholder="e.g. Dr. Vidushi Dubey"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Qualifications</label>
                        <input
                          type="text"
                          className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                          value={siteSettings.directorQualification || ''}
                          onChange={e => setSiteSettings(prev => ({ ...prev, directorQualification: e.target.value }))}
                          placeholder="e.g. MBBS, MS (General Surgery)"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Director Message / Bio</label>
                      <textarea
                        rows={5}
                        className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                        value={siteSettings.directorBio || ''}
                        onChange={e => setSiteSettings(prev => ({ ...prev, directorBio: e.target.value }))}
                        placeholder="Welcome message from the Director..."
                      />
                    </div>

                    {/* Director Image Attachment zone */}
                    <div className="flex items-center gap-4 pt-2">
                      <div className="w-16 h-16 rounded-full border border-slate-200 overflow-hidden flex items-center justify-center shrink-0 bg-white">
                        {siteSettings.directorPhotoUrl ? (
                          <img 
                            src={siteSettings.directorPhotoUrl} 
                            alt="Director portrait preview" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span className="text-[9px] text-slate-400 font-bold">No Photo</span>
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <button
                          type="button"
                          onClick={() => document.getElementById('director-photo-file-input')?.click()}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-bold inline-block cursor-pointer transition-all active:scale-95 border-none"
                        >
                          Attach Photo (JPEG)
                        </button>
                        <input 
                          type="file" 
                          id="director-photo-file-input"
                          className="hidden" 
                          accept="image/*"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                if (typeof reader.result === 'string') {
                                  setSiteSettings(prev => ({ ...prev, directorPhotoUrl: reader.result as string }));
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        {siteSettings.directorPhotoUrl && (
                          <button
                            type="button"
                            onClick={() => setSiteSettings(prev => ({ ...prev, directorPhotoUrl: '' }))}
                            className="ml-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-[10px] font-bold inline-block cursor-pointer transition-all active:scale-95 border-none"
                          >
                            Remove
                          </button>
                        )}
                        <p className="text-[8px] text-slate-400 leading-tight">Drag & Drop supported or click to browse local files.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card F: Hospital Credentials Details & Trust Documents */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-5">
              <div className="border-b pb-3 flex justify-between items-center">
                <div>
                  <h4 className="font-display font-extrabold text-[#0d2a63] text-sm uppercase tracking-wider">Hospital Accreditation & Documents</h4>
                  <p className="text-[11px] text-slate-400 font-medium">Verify credentials, medical regulatory permits, approvals, or certification photos displayed on the public footer/pages</p>
                </div>
              </div>

              {/* Add New Credential Form */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-4">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">Register New Accreditation / Certificate</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-500 font-bold">Document Title / Label *</label>
                    <input 
                      type="text" 
                      id="new-cred-title"
                      placeholder="e.g. PM-JAY Empanelment Approvals, pollution control board cert" 
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-500 font-bold">Attach Image/PDF Document *</label>
                    <div className="flex gap-2">
                      <input 
                        type="file" 
                        id="new-cred-file"
                        accept="image/*, application/pdf"
                        className="grow text-xs p-1 bg-white border border-slate-200 rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={async () => {
                          const titleEl = document.getElementById('new-cred-title') as HTMLInputElement;
                          const fileEl = document.getElementById('new-cred-file') as HTMLInputElement;
                          if (!titleEl || !titleEl.value) {
                            alert('Please state a valid label for this certification document.');
                            return;
                          }
                          const file = fileEl?.files?.[0];
                          if (!file) {
                            alert('Please select or drag a valid certificate document image first.');
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === 'string') {
                              const newCred = {
                                id: `cred_${Date.now()}`,
                                title: titleEl.value,
                                fileUrl: reader.result,
                                date: new Date().toLocaleDateString()
                              };
                              setSiteSettings(prev => ({
                                ...prev,
                                credentials: [...(prev.credentials || []), newCred]
                              }));
                              titleEl.value = '';
                              fileEl.value = '';
                              alert('Certificate prepared! Please make sure to Hit "Commit Changes" at the bottom to sync safely to the cloud.');
                            }
                          };
                          reader.readAsDataURL(file);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-all active:scale-95 border-none"
                      >
                        <Plus size={12} />
                        Add Record
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* List existing credentials */}
              {(!siteSettings.credentials || siteSettings.credentials.length === 0) ? (
                <div className="p-8 text-center text-slate-400 text-xs font-semibold bg-slate-50/50 rounded-2xl border border-dashed border-slate-150">
                  No active accreditation documents cataloged. Fallbacks to PM-JAY and general hospital approvals logos.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {siteSettings.credentials.map(cred => (
                    <div key={cred.id} className="p-3.5 bg-white border border-slate-150 rounded-xl shadow-sm hover:border-blue-200 transition-all flex items-center justify-between gap-2.5">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0 flex items-center justify-center">
                          {cred.fileUrl.startsWith('data:') ? (
                            <img src={cred.fileUrl} alt={cred.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <FileText size={18} className="text-slate-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-extrabold text-slate-800 truncate leading-snug">{cred.title}</p>
                          <p className="text-[9px] text-slate-400 font-bold">{cred.date || 'Active'}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSiteSettings(prev => ({
                            ...prev,
                            credentials: (prev.credentials || []).filter(c => c.id !== cred.id)
                          }));
                        }}
                        className="text-red-500 hover:text-red-700 p-1.5 bg-slate-50 hover:bg-rose-50 rounded-lg transition-colors border border-transparent cursor-pointer"
                        title="Delete accreditation"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Card G: Photos Gallery & Tour Video Channel Section */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-5">
              <div className="border-b pb-3">
                <h4 className="font-display font-extrabold text-[#0d2a63] text-sm uppercase tracking-wider">Hospital Photo Gallery & Tour Video Channel</h4>
                <p className="text-[11px] text-slate-400 font-medium">Add gallery photographs, tour YouTube links, or department visual showcases designed for public interaction</p>
              </div>

              {/* Add New Gallery Item Section */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-4">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">Publish Photo or Hospital Tour/Video Segment</p>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
                  <div className="md:col-span-3 space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-500 font-bold">Item Type *</label>
                    <select 
                      id="new-gal-type"
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl"
                    >
                      <option value="image">Still Photograph (Photo)</option>
                      <option value="video">Hospital Tour Video / Presentation</option>
                    </select>
                  </div>
                  <div className="md:col-span-4 space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-500 font-bold">Title / Caption *</label>
                    <input 
                      type="text" 
                      id="new-gal-title"
                      placeholder="e.g. Laparoscopic Theater block / Hospital Entry view" 
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-5 space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-500 font-bold">Media file/URL *</label>
                    <div className="flex gap-2">
                      <div className="grow space-y-1.5">
                        <input 
                          type="text" 
                          id="new-gal-url"
                          placeholder="Paste image/YouTube URL, or browse local file ->" 
                          className="w-full text-xs p-2 bg-white border border-slate-200 rounded-xl"
                        />
                        <input 
                          type="file" 
                          id="new-gal-file"
                          accept="image/*, video/*"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                if (typeof reader.result === 'string') {
                                  const urlInput = document.getElementById('new-gal-url') as HTMLInputElement;
                                  if (urlInput) urlInput.value = reader.result;
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="w-full text-[10px] text-slate-400 bg-white border p-1 rounded-lg"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const typeEl = document.getElementById('new-gal-type') as HTMLSelectElement;
                          const titleEl = document.getElementById('new-gal-title') as HTMLInputElement;
                          const urlEl = document.getElementById('new-gal-url') as HTMLInputElement;
                          if (!titleEl || !titleEl.value) {
                            alert('Please write a descriptive caption for this gallery publication.');
                            return;
                          }
                          if (!urlEl || !urlEl.value) {
                            alert('Please insert a valid video URL, photo address or select a local photo file.');
                            return;
                          }
                          const newItem = {
                            id: `gal_${Date.now()}`,
                            title: titleEl.value,
                            type: typeEl.value as 'image' | 'video',
                            url: urlEl.value
                          };
                          setSiteSettings(prev => ({
                            ...prev,
                            gallery: [...(prev.gallery || []), newItem]
                          }));
                          titleEl.value = '';
                          urlEl.value = '';
                          const fileEl = document.getElementById('new-gal-file') as HTMLInputElement;
                          if (fileEl) fileEl.value = '';
                          alert('Gallery file appended! Make sure to Click "Commit Changes" at page bottom to preserve config forever.');
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 rounded-xl text-xs flex items-center justify-center shrink-0 border-none cursor-pointer transition-all active:scale-95"
                      >
                        Add Item
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery List display */}
              {(!siteSettings.gallery || siteSettings.gallery.length === 0) ? (
                <div className="p-8 text-center text-slate-400 text-xs font-semibold bg-slate-50/50 rounded-2xl border border-dashed border-slate-150">
                  No public portfolio items added. Default high-resolution hospital illustrations will load.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {siteSettings.gallery.map(item => (
                    <div key={item.id} className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm aspect-video">
                      {item.type === 'video' ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-white p-3 text-center">
                          <Video size={24} className="text-yellow-400 mb-1" />
                          <span className="text-[10px] font-extrabold block truncate w-full">{item.title}</span>
                          <span className="text-[8px] text-slate-400 block truncate w-full">{item.url}</span>
                        </div>
                      ) : (
                        <img src={item.url} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      )}
                      
                      {/* Delete Overlay */}
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2.5">
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setSiteSettings(prev => ({
                                ...prev,
                                gallery: (prev.gallery || []).filter(g => g.id !== item.id)
                              }));
                            }}
                            className="bg-red-600 hover:bg-red-700 p-1.5 text-white rounded-lg active:scale-95 transition-all text-[9px] font-bold border-none cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                        <p className="text-[10px] text-white font-bold truncate leading-none mb-0.5">{item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* NEW ADDITION: Public Notice & Important Announcement Pop-up Editor */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-6">
              <div className="border-b pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-left">
                <div>
                  <h4 className="font-display font-extrabold text-[#0d2a63] text-sm uppercase tracking-wider">Public Notice & Announcement Pop-up</h4>
                  <p className="text-[11px] text-slate-400 font-medium">Configure a prominent alert modal that greets viewers when they first enter the website.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${siteSettings.announcementPopup?.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                    {siteSettings.announcementPopup?.enabled ? 'Active notice' : 'disabled'}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-150 text-left">
                  <input
                    type="checkbox"
                    id="popup-enabled"
                    checked={siteSettings.announcementPopup?.enabled ?? false}
                    onChange={e => {
                      const val = e.target.checked;
                      setSiteSettings(prev => ({
                        ...prev,
                        announcementPopup: {
                          ...(prev.announcementPopup || { title: '', message: '' }),
                          enabled: val
                        }
                      }));
                    }}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="popup-enabled" className="text-xs font-black text-[#0d2a63] cursor-pointer select-none">
                    Enable pop-up notification on public web sections
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Notice Badge Text</label>
                    <input
                      type="text"
                      value={siteSettings.announcementPopup?.badgeText ?? ''}
                      onChange={e => {
                        const val = e.target.value;
                        setSiteSettings(prev => ({
                          ...prev,
                          announcementPopup: {
                            ...(prev.announcementPopup || { enabled: false, title: '', message: '' }),
                            badgeText: val
                          }
                        }));
                      }}
                      placeholder="e.g. IMPORTANT NOTICE, CAMPAIGN, UPDATE"
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Announcement Notice Title</label>
                    <input
                      type="text"
                      value={siteSettings.announcementPopup?.title ?? ''}
                      onChange={e => {
                        const val = e.target.value;
                        setSiteSettings(prev => ({
                          ...prev,
                          announcementPopup: {
                            ...(prev.announcementPopup || { enabled: false, title: '', message: '' }),
                            title: val
                          }
                        }));
                      }}
                      placeholder="e.g. Free Surgical Diagnosis Camp this Sunday"
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Announcement Notice full message text</label>
                  <textarea
                    rows={4}
                    value={siteSettings.announcementPopup?.message ?? ''}
                    onChange={e => {
                      const val = e.target.value;
                      setSiteSettings(prev => ({
                        ...prev,
                        announcementPopup: {
                          ...(prev.announcementPopup || { enabled: false, title: '', message: '' }),
                          message: val
                        }
                      }));
                    }}
                    placeholder="Provide full description. Mention dates, timings, venues, requirements, dynamic contact numbers and any prerequisite instructions."
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl resize-y"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Call-To-Action button label (optional)</label>
                    <input
                      type="text"
                      value={siteSettings.announcementPopup?.linkText ?? ''}
                      onChange={e => {
                        const val = e.target.value;
                        setSiteSettings(prev => ({
                          ...prev,
                          announcementPopup: {
                            ...(prev.announcementPopup || { enabled: false, title: '', message: '' }),
                            linkText: val
                          }
                        }));
                      }}
                      placeholder="e.g. Check Registration Scheme, Book Slot"
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">CTA target link or section hash (optional)</label>
                    <input
                      type="text"
                      value={siteSettings.announcementPopup?.linkUrl ?? ''}
                      onChange={e => {
                        const val = e.target.value;
                        setSiteSettings(prev => ({
                          ...prev,
                          announcementPopup: {
                            ...(prev.announcementPopup || { enabled: false, title: '', message: '' }),
                            linkUrl: val
                          }
                        }));
                      }}
                      placeholder="e.g. #pmjay, #contact, #about"
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* NEW ADDITION: Manage Cashless TPA Facilities */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-6">
              <div className="border-b pb-3 text-left">
                <h4 className="font-display font-extrabold text-[#0d2a63] text-sm uppercase tracking-wider">TPA & Cashless Insurance Partners</h4>
                <p className="text-[11px] text-slate-400 font-medium">Add, update or terminate empanelled Third Party Administrators (TPAs) and corporate health insurance schemes.</p>
              </div>

              {/* Add New TPA Form block */}
              <div className="p-5 bg-blue-50/20 border border-blue-100 rounded-3xl space-y-4">
                <span className="text-xs font-black uppercase text-[#1e66f5] tracking-widest block font-mono text-left">Empanel a New Cashless Partner</span>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Partner Insurance Name</label>
                    <input
                      type="text"
                      id="new-tpa-name"
                      placeholder="e.g. Star Health & Allied Insurance"
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl shadow-sm"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Description / Coverage Scheme</label>
                    <input
                      type="text"
                      id="new-tpa-desc"
                      placeholder="e.g. Direct cashless settlements within 2-4 hours."
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl shadow-sm"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Partner Logo Profile</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="new-tpa-logo"
                        placeholder="Image URL or Browse file →"
                        className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl shadow-sm"
                      />
                      <input
                        type="file"
                        id="new-tpa-file"
                        accept="image/*"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (typeof reader.result === 'string') {
                                const logoInput = document.getElementById('new-tpa-logo') as HTMLInputElement;
                                if (logoInput) logoInput.value = reader.result;
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('new-tpa-file')?.click()}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold border border-slate-200 cursor-pointer"
                      >
                        Browse
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      const nameEl = document.getElementById('new-tpa-name') as HTMLInputElement;
                      const descEl = document.getElementById('new-tpa-desc') as HTMLInputElement;
                      const logoEl = document.getElementById('new-tpa-logo') as HTMLInputElement;

                      if (!nameEl || !nameEl.value) {
                        alert('Please fill the Partner Insurance Company Name.');
                        return;
                      }

                      const newTpa = {
                        id: `tpa_${Date.now()}`,
                        name: nameEl.value,
                        description: descEl ? descEl.value : '',
                        logoUrl: logoEl ? logoEl.value : ''
                      };

                      setSiteSettings(prev => ({
                        ...prev,
                        tpaFacilities: [...(prev.tpaFacilities || []), newTpa]
                      }));

                      // Reset fields
                      nameEl.value = '';
                      if (descEl) descEl.value = '';
                      if (logoEl) logoEl.value = '';
                      const fileEl = document.getElementById('new-tpa-file') as HTMLInputElement;
                      if (fileEl) fileEl.value = '';

                      alert('Cashless insurance partner appended to local checklist! Make sure to Click "Commit Changes" at page bottom to preserve config forever.');
                    }}
                    className="bg-[#1e66f5] hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider border-none cursor-pointer transition-all active:scale-95 shadow-md shadow-blue-100"
                  >
                    Append TPA Partner
                  </button>
                </div>
              </div>

              {/* Handled TPA List display */}
              <div className="space-y-3">
                <span className="text-xs font-mono font-black uppercase text-slate-400 tracking-widest block text-left">Currently Empanelled Cashless TPA list ({ (siteSettings.tpaFacilities || []).length })</span>

                {(!siteSettings.tpaFacilities || siteSettings.tpaFacilities.length === 0) ? (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400 font-semibold">
                    No cashless insurance partners configured. Default to free Ayushman Bharat scheme.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {siteSettings.tpaFacilities.map((tpa, idx) => (
                      <div key={tpa.id || idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 text-left">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-12 h-12 rounded-xl bg-white border border-slate-150 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                            {tpa.logoUrl ? (
                              <img src={tpa.logoUrl} alt={tpa.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <span className="text-xs font-bold text-slate-400">TPA</span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <h5 className="font-display font-extrabold text-[#0d2a63] text-xs truncate uppercase leading-none">{tpa.name}</h5>
                            <p className="text-[10px] text-slate-500 font-medium truncate mt-1 max-w-[285px]">{tpa.description || 'Pre-authorization and claim desk managed.'}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setSiteSettings(prev => ({
                              ...prev,
                              tpaFacilities: (prev.tpaFacilities || []).filter(t => t.id !== tpa.id)
                            }));
                          }}
                          className="p-2 border border-red-200 hover:border-red-400 hover:bg-red-50 text-red-605 text-red-600 rounded-xl transition-all cursor-pointer shrink-0"
                          title="Remove TPA"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Form actions save block */}
            <div className="flex justify-end gap-3.5 bg-slate-100 p-5 rounded-3xl">
              <button
                type="button"
                onClick={() => {
                  setSiteSettings(getSiteSettings());
                  setIsSettingsSavedStatus(false);
                }}
                className="bg-white border border-slate-200 text-slate-700 font-bold text-xs uppercase px-5 py-3 rounded-xl hover:bg-slate-50 shadow-sm cursor-pointer"
              >
                Discard Edits
              </button>
              <button
                type="button"
                onClick={() => {
                  saveSiteSettings(siteSettings);
                  setIsSettingsSavedStatus(true);
                  setTimeout(() => setIsSettingsSavedStatus(false), 5150);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase px-7 py-3 rounded-xl shadow-lg shadow-blue-200 cursor-pointer"
              >
                Commit Changes
              </button>
            </div>

          </div>
        )}

        {/* Tab 8: NEWS & EVENTS BLOG VIEW */}
        {activeTab === 'news' && (
          <div className="space-y-6 animate-fadeIn pb-12">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200">
              <div>
                <h3 className="font-display font-black text-slate-900 text-lg uppercase tracking-wide">News & Campus Events</h3>
                <p className="text-xs text-slate-500 font-medium tracking-tight">Post notices, medical camp alerts, surgical updates, or Ayushman updates on the public website pages.</p>
              </div>
              <button
                type="button"
                onClick={handleAddNewsOpen}
                className="w-full sm:w-auto bg-[#1e66f5] hover:bg-[#154fc4] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                <span>Add News / Event</span>
              </button>
            </div>

            {/* List of News Events */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4 items-center">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    className="w-full text-xs font-semibold pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                    placeholder="Search news or posts..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="w-full sm:w-auto flex items-center justify-end gap-2 text-xs font-bold text-slate-400">
                  <span>Showing {newsEvents.length} Items</span>
                </div>
              </div>

              {newsEvents.length === 0 ? (
                <div className="p-16 text-center space-y-3">
                  <FileText size={48} className="text-slate-300 mx-auto" />
                  <div>
                    <p className="font-bold text-slate-700">No News Items Recorded</p>
                    <p className="text-xs text-slate-400">Press "Add News / Event" above to create your first campus alert.</p>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-55/65 border-b border-slate-100 text-slate-800 uppercase tracking-wider text-[10px] font-mono">
                        <th className="py-4 px-6 font-bold">Photo</th>
                        <th className="py-4 px-6 font-bold">News Event Banner</th>
                        <th className="py-4 px-6 font-bold">Date & Time</th>
                        <th className="py-4 px-6 font-bold">Location</th>
                        <th className="py-4 px-6 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                      {newsEvents
                        .filter(item => {
                          if (!searchTerm.trim()) return true;
                          return (
                            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.post.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.location.toLowerCase().includes(searchTerm.toLowerCase())
                          );
                        })
                        .map(item => (
                          <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-4 px-6">
                              <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center">
                                {item.photoUrl ? (
                                  <img 
                                    src={item.photoUrl} 
                                    alt="News Thumbnail0" 
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <FileText className="text-slate-350" size={18} />
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-6 max-w-sm">
                              <div>
                                <h4 className="font-bold text-[#0d2a63] text-sm leading-snug line-clamp-1">{item.title}</h4>
                                <p className="text-slate-400 text-xs font-semibold truncate mt-1 leading-relaxed max-w-sm">{item.post}</p>
                              </div>
                            </td>
                            <td className="py-4 px-6 whitespace-nowrap">
                              <div className="flex items-center gap-1.5 text-slate-600">
                                <Clock size={14} className="text-slate-400" />
                                <span>{new Date(item.dateTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg text-[11px] block truncate max-w-[150px]">
                                {item.location}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleEditNewsOpen(item)}
                                  className="text-blue-600 bg-blue-50 hover:bg-blue-100 p-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 font-bold text-[11px]"
                                >
                                  <Edit size={14} />
                                  <span>Edit</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteNews(item.id)}
                                  className="text-red-600 bg-red-50 hover:bg-red-100 p-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 font-bold text-[11px]"
                                >
                                  <Trash2 size={14} />
                                  <span>Delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

      </main>

      {/* --- FORM MODAL POPUPS --- */}

      {/* 1. Doctor Manager Modal */}
      {isDocModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-xl text-left shadow-2xl relative border border-slate-200 max-h-[90vh] overflow-y-auto my-8">
            <div className="bg-gradient-to-br from-[#0d2a63] to-blue-900 text-white p-6 rounded-t-3xl">
              <h3 className="font-display font-extrabold text-lg uppercase tracking-wide">
                {activeDoctor ? 'Modify Doctor Details' : 'Onboard New Doctor'}
              </h3>
              <p className="text-xs text-blue-200">Fill details below to update the clinical specialist listing</p>
            </div>

            <form onSubmit={handleSaveDoctor} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase">Doctor Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Satya Dev"
                    value={docName}
                    onChange={e => setDocName(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase">Specialty Clinic *</label>
                  <select
                    value={docSpec}
                    onChange={e => setDocSpec(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none bg-white"
                  >
                    <option value="General & Laparoscopic Surgeon">General & Laparoscopic Surgeon</option>
                    <option value="Eye Specialist">Eye Specialist</option>
                    <option value="ENT Specialist">ENT Specialist</option>
                    <option value="Nephrologist">Nephrologist</option>
                    <option value="Pediatrician">Pediatrician</option>
                    <option value="Urologist">Urologist</option>
                    <option value="Orthopedic Specialist">Orthopedic Specialist</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase">Qualifications *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MBBS, MS (Ophthalmology)"
                    value={docQual}
                    onChange={e => setDocQual(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase">Years of Experience *</label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    required
                    value={docExp}
                    onChange={e => setDocExp(Number(e.target.value))}
                    className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">OPD Timing Slot *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10:00 AM - 04:00 PM"
                  value={docTimings}
                  onChange={e => setDocTimings(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase block">Available Week Days *</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => {
                    const active = docDays.includes(d);
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => toggleDay(d)}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all border ${
                          active ? 'bg-blue-600 text-white border-transparent' : 'bg-slate-105 bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase block">Doctor Portrait Image Source</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Paste Unsplash URL, static image address or upload below"
                    value={docImage}
                    onChange={e => setDocImage(e.target.value)}
                    className="grow text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                  {docImage && (
                    <button
                      type="button"
                      onClick={() => setDocImage('')}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all active:scale-95 border-none"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Doctor Local JPEG File Attachment area */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase block">OR ATTACH DOCTOR PORTRAIT (JPEG FILE - OPTIONAL)</label>
                <div 
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) {
                      if (file.type === 'image/jpeg' || file.name.toLowerCase().endsWith('.jpg') || file.name.toLowerCase().endsWith('.jpeg')) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          if (typeof reader.result === 'string') {
                            setDocImage(reader.result);
                          }
                        };
                        reader.readAsDataURL(file);
                      } else {
                        alert('Only JPEG/JPG portrait files are accepted.');
                      }
                    }
                  }}
                  onClick={() => document.getElementById('doctor-file-input')?.click()}
                  className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-4 text-center cursor-pointer hover:bg-blue-50/20 transition-all space-y-1 flex flex-col items-center justify-center min-h-[90px]"
                >
                  <Plus size={16} className="text-blue-500" />
                  <p className="text-xs font-extrabold text-slate-700">Drag & Drop Portrait (JPEG) or Click to Browse</p>
                  <p className="text-[10px] text-slate-400">Accepts .jpg, .jpeg images</p>
                  <input 
                    type="file" 
                    id="doctor-file-input"
                    className="hidden" 
                    accept="image/jpeg, image/jpg"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.type === 'image/jpeg' || file.name.toLowerCase().endsWith('.jpg') || file.name.toLowerCase().endsWith('.jpeg')) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === 'string') {
                              setDocImage(reader.result);
                            }
                          };
                          reader.readAsDataURL(file);
                        } else {
                          alert('Only JPEG/JPG portrait files are accepted.');
                        }
                      }
                    }}
                  />
                </div>

                {/* Portrait micro-preview */}
                {docImage && (docImage.startsWith('data:image/') || docImage.startsWith('http')) && (
                  <div className="flex items-center gap-3 bg-blue-50/60 p-2.5 rounded-xl border border-blue-100/60 mt-2">
                    <img 
                      src={docImage} 
                      alt="Doctor portrait preview" 
                      className="w-12 h-12 object-cover rounded-full border border-blue-200 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-blue-900 truncate">Portrait Loaded Successfully</p>
                      <p className="text-[9px] text-blue-600/80">Self-hosted base64 representation stored and synced</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDocImage('')}
                      className="text-red-500 hover:text-red-700 p-1.5 bg-white hover:bg-red-50 rounded-lg shadow-sm border border-red-100 cursor-pointer text-[10px] font-bold transition-all active:scale-95"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Consultant Brief Bio *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter medical synopsis or professional focus fields..."
                  value={docBio}
                  onChange={e => setDocBio(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-3 justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setIsDocModalOpen(false)}
                  className="bg-slate-105 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm cursor-pointer"
                >
                  Discard Changes
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md cursor-pointer"
                >
                  Commit Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Service Manager Modal */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-xl text-left shadow-2xl relative border border-slate-200 max-h-[90vh] overflow-y-auto my-8">
            <div className="bg-gradient-to-br from-[#0d2a63] to-blue-900 text-white p-6 rounded-t-3xl">
              <h3 className="font-display font-extrabold text-lg uppercase tracking-wide">
                {activeService ? 'Edit Department Features' : 'New Medical Department'}
              </h3>
              <p className="text-xs text-blue-200">Fill in critical medical specialties offered to local residents</p>
            </div>

            <form onSubmit={handleSaveService} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase">Department Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cardioscience Wing"
                    value={serviceTitle}
                    onChange={e => setServiceTitle(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase">Lucide Icon Representative *</label>
                  <select
                    value={serviceIcon}
                    onChange={e => setServiceIcon(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none bg-white"
                  >
                    <option value="Activity">Activity Heart</option>
                    <option value="HeartPulse">Heart Pulse</option>
                    <option value="Eye">Eye</option>
                    <option value="Ear">Ear</option>
                    <option value="Baby">Baby Infant</option>
                    <option value="ShieldAlert">Shield Alert</option>
                    <option value="Bone">Bone/Joint</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase block">Department Showcase Image Source</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Paste Unsplash URL, static image address or upload below"
                    value={serviceImg}
                    onChange={e => setServiceImg(e.target.value)}
                    className="grow text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                  {serviceImg && (
                    <button
                      type="button"
                      onClick={() => setServiceImg('')}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all active:scale-95"
                      title="Clear image"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Optional JPEG File Attachment area */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase block">OR ATTACH JPEG FILE (OPTIONAL)</label>
                <div 
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) {
                      if (file.type === 'image/jpeg' || file.name.toLowerCase().endsWith('.jpg') || file.name.toLowerCase().endsWith('.jpeg')) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          if (typeof reader.result === 'string') {
                            setServiceImg(reader.result);
                          }
                        };
                        reader.readAsDataURL(file);
                      } else {
                        alert('Only JPEG/JPG files are accepted.');
                      }
                    }
                  }}
                  onClick={() => document.getElementById('dept-file-input')?.click()}
                  className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-4 text-center cursor-pointer hover:bg-blue-50/20 transition-all space-y-1 flex flex-col items-center justify-center min-h-[90px]"
                >
                  <Plus size={16} className="text-blue-500" />
                  <p className="text-xs font-extrabold text-slate-700">Drag & Drop JPEG or Click to Browse</p>
                  <p className="text-[10px] text-slate-400">Accepts .jpg, .jpeg images</p>
                  <input 
                    type="file" 
                    id="dept-file-input"
                    className="hidden" 
                    accept="image/jpeg, image/jpg"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.type === 'image/jpeg' || file.name.toLowerCase().endsWith('.jpg') || file.name.toLowerCase().endsWith('.jpeg')) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === 'string') {
                              setServiceImg(reader.result);
                            }
                          };
                          reader.readAsDataURL(file);
                        } else {
                          alert('Only JPEG/JPG files are accepted.');
                        }
                      }
                    }}
                  />
                </div>

                {/* Micro-preview of the attached / selected JPEG */}
                {serviceImg && serviceImg.startsWith('data:image/') && (
                  <div className="flex items-center gap-3 bg-blue-50/60 p-2.5 rounded-xl border border-blue-100/60 mt-2">
                    <img 
                      src={serviceImg} 
                      alt="JPEG Showcase Preview" 
                      className="w-12 h-12 object-cover rounded-lg border border-blue-200 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-blue-900 truncate">JPEG Attached Successfully</p>
                      <p className="text-[9px] text-blue-600/80">Base64 content stored securely and applied</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setServiceImg('')}
                      className="text-red-500 hover:text-red-700 p-1.5 bg-white hover:bg-red-50 rounded-lg shadow-sm border border-red-100 cursor-pointer text-[10px] font-bold transition-all active:scale-95"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Department Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail the services, PM-JAY treatment, equipment catalogs..."
                  value={serviceDesc}
                  onChange={e => setServiceDesc(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Features & Special surgeries (Comma-divided list) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Endoscopy diagnostics, Sutureless micro-surgery, Intensive intensive bay..."
                  value={serviceFeatures}
                  onChange={e => setServiceFeatures(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-3 justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="bg-slate-105 bg-slate-100 hover:bg-slate-205 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-600 cursor-pointer"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm shadow-md cursor-pointer"
                >
                  Save Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Feedback Creation Modal */}
      {isFeedbackModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl w-full max-w-md text-left shadow-2xl relative border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-br from-emerald-850 from-green-900 to-emerald-950 text-white p-6">
              <h3 className="font-display font-extrabold text-lg uppercase tracking-wide">Manual Patient Testimonial Entry</h3>
              <p className="text-xs text-green-200/90">Add direct reviews manually into our persistent public slider</p>
            </div>

            <form onSubmit={handleSaveFeedback} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase block">Patient Star Rating *</label>
                <div className="flex gap-1 pt-1">
                  {[1, 2, 3, 4, 5].map(stars => (
                    <button
                      key={stars}
                      type="button"
                      onClick={() => setFbRating(stars)}
                      className="cursor-pointer"
                    >
                      <Star size={24} className={stars <= fbRating ? 'text-yellow-450 text-yellow-400 fill-yellow-405 fill-yellow-400' : 'text-slate-200'} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Patient Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Harikesh Upadhyay"
                  value={fbName}
                  onChange={e => setFbName(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Patient Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="harikesh.u@gmail.com"
                  value={fbEmail}
                  onChange={e => setFbEmail(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Treatment review feedback comment *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter patient review treatment comments..."
                  value={fbContent}
                  onChange={e => setFbContent(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-3 justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setIsFeedbackModalOpen(false)}
                  className="bg-slate-105 bg-slate-100 hover:bg-slate-205 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                   type="submit"
                   className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm cursor-pointer shadow-md shadow-green-500/10"
                >
                  Onboard Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. News Event Manager Modal */}
      {isNewsModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-55 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-xl text-left shadow-2xl relative border border-slate-200 max-h-[90vh] overflow-y-auto my-8">
            <div className="bg-gradient-to-br from-[#0d2a63] to-blue-900 text-white p-6 rounded-t-3xl">
              <h3 className="font-display font-extrabold text-lg uppercase tracking-wide">
                {activeNews ? 'Edit News / Event' : 'Publish News / Event'}
              </h3>
              <p className="text-xs text-blue-200">Post announcements or upcoming events with optional banners (Max 100MB)</p>
            </div>

            <form onSubmit={handleSaveNews} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">News / Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mega Free Eye & Health Camp Coming to Basti"
                  value={newsTitle}
                  onChange={e => setNewsTitle(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Post Content / News Body *</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Enter detailed notice post descriptions here..."
                  value={newsPost}
                  onChange={e => setNewsPost(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase">Date and Time *</label>
                  <input
                    type="datetime-local"
                    required
                    value={newsDateTime}
                    onChange={e => setNewsDateTime(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase">Event Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Main Lobby, Block B"
                    value={newsLocation}
                    onChange={e => setNewsLocation(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Photo size constraint 100MB only */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase block">Banner Image (Optional - Up to 100MB Only)</label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {newsPhotoUrl && (
                    <div className="w-20 h-20 rounded-xl border border-slate-200 overflow-hidden shrink-0">
                      <img src={newsPhotoUrl} alt="Preview Banner" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}
                  <div className="grow w-full">
                    <input
                      type="file"
                      id="news-photo-upload"
                      accept="image/*"
                      onChange={handlePhotoUploadChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById('news-photo-upload')?.click()}
                      className="w-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 py-3 px-4 rounded-xl text-xs font-bold uppercase transition-all tracking-wider"
                    >
                      Choose Banner File (Current Max: 100MB)
                    </button>
                    {photoError ? (
                      <p className="text-[11px] font-semibold text-red-600 mt-1">{photoError}</p>
                    ) : (
                      <p className="text-[10px] text-slate-400 mt-1 uppercase font-mono">Banners show up directly on the Public News and Events section</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsNewsModalOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!!photoError}
                  className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm cursor-pointer shadow-md ${
                    photoError ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Publish News
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Confirmation Modal */}
      {confirmState.isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
            onClick={() => setConfirmState(prev => ({ ...prev, isOpen: false }))}
          />
          {/* Modal Content */}
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden relative z-10 animate-scaleIn">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-50 text-red-600 rounded-full shrink-0">
                  <Trash2 size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                    {confirmState.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">
                    {confirmState.message}
                  </p>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="bg-slate-50 p-4 flex gap-3 justify-end border-t border-slate-100">
              <button
                type="button"
                onClick={() => setConfirmState(prev => ({ ...prev, isOpen: false }))}
                className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-colors"
              >
                No, Keep It
              </button>
              <button
                type="button"
                onClick={() => confirmState.onConfirm()}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-5 rounded-xl text-xs sm:text-sm font-bold shadow-sm cursor-pointer transition-colors"
                id="modal-confirm-delete-btn"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
