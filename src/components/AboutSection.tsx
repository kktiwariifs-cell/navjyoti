import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Landmark, User, FileText, CheckCircle2, Award, ShieldCheck, Quote, X, Eye, Download, ExternalLink, ZoomIn, ZoomOut } from 'lucide-react';
import { getSiteSettings } from '../utils/database';

export default function AboutSection() {
  const [settings, setSettings] = useState(() => getSiteSettings());
  const [activeTab, setActiveTab] = useState<'about' | 'founders'>('about');
  const [selectedCred, setSelectedCred] = useState<any | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(getSiteSettings());
    };
    window.addEventListener('db_update', handleUpdate);
    return () => window.removeEventListener('db_update', handleUpdate);
  }, []);

  const closeCredModal = () => {
    setSelectedCred(null);
    setIsZoomed(false);
  };

  // Listen for Escape key to close Lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCredModal();
      }
    };
    if (selectedCred) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCred]);

  // Soft fallbacks
  const hospitalPhoto = settings.aboutPhotoUrl || '';
  
  const chairman = {
    name: settings.chairmanName || 'Dr. Prem Prakash Dubey',
    qualification: settings.chairmanQualification || 'MBBS, MS (Ophthalmology)',
    photo: settings.chairmanPhotoUrl || '',
    bio: settings.chairmanBio || 'At Navjyoti Multispeciality Hospital, Basti, our mission is to provide high-quality, affordable, and compassionate healthcare to the people of our region. We believe that good health is the foundation of a happy and productive life, and our hospital is dedicated to delivering medical services that meet the highest standards of care and professionalism.\n\nSince its establishment, Navjyoti Multispeciality Hospital has been committed to building a healthcare facility where patients receive not only advanced medical treatment but also respect, empathy, and personal attention. Our team of experienced doctors, skilled nurses, and dedicated healthcare professionals work together to ensure that every patient receives accurate diagnosis, effective treatment, and continuous support throughout their healing journey.'
  };

  const director = {
    name: settings.directorName || 'Dr. Vidushi Dubey',
    qualification: settings.directorQualification || 'MBBS, MS (General & Laparoscopic Surgery)',
    photo: settings.directorPhotoUrl || '',
    bio: settings.directorBio || 'The hospital is equipped with modern medical infrastructure, advanced diagnostic facilities, and specialized departments that enable us to provide comprehensive healthcare services under one roof. From routine consultations to specialized treatments and emergency care, we strive to maintain excellence in every aspect of patient care.\n\nWe also believe in the importance of preventive healthcare and community awareness. Our goal is not only to treat illness but also to promote healthier lifestyles and improve the overall well-being of our community.\n\nWe take great pride in the commitment and dedication of our medical team. Together, we aim to make Navjyoti Multispeciality Hospital a trusted healthcare destination for families in Basti and surrounding areas. We sincerely thank our patients and the community for their trust and continued support.'
  };

  const credentials = settings.credentials || [];

  const defaultFallbackCredentials = [
    {
      id: 'fallback_1',
      title: 'ISO 9001:2015 Quality Management Certified',
      date: 'Valid till Nov 2028',
      fileUrl: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'fallback_2',
      title: 'NABH Entry-Level Hospital Accreditation',
      date: 'Valid till Apr 2027',
      fileUrl: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'fallback_3',
      title: 'PM-JAY Ayushman Bharat State Empanelment',
      date: 'Active Approved Registry',
      fileUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'fallback_4',
      title: 'UP Health Department Bio-Medical Waste Permit',
      date: 'Approved State License',
      fileUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=600',
    }
  ];

  const displayCredentials = credentials.length > 0 ? credentials : defaultFallbackCredentials;

  return (
    <section id="about" className="py-16 md:py-24 bg-white border-b border-slate-205 border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1e66f5] bg-blue-50 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Heritage & Medical Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Who We Are & What We Believe
          </h2>
          <p className="text-slate-500 mt-3 sm:text-base text-sm leading-relaxed">
            Discover our healthcare standards, specialized facilities, and read the personal message from our administrative founders.
          </p>
        </div>

        {/* Tab triggers for modern switching */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex-wrap justify-center gap-1">
            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'about'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200/50'
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              <Landmark size={16} />
              About Hospital
            </button>
            <button
              onClick={() => setActiveTab('founders')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'founders'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200/50'
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              <User size={16} />
              Founders' Message
            </button>
          </div>
        </div>

        {/* Dynamic content rendering with motion */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-10 text-left w-full"
              >
                {/* Upper Split Grid: Hospital Photo vs text content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left: Graphic/Stats (5 cols) */}
                  <div className="lg:col-span-5 w-full">
                    {hospitalPhoto ? (
                      <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] lg:aspect-auto lg:h-[450px] border border-slate-200 group w-full">
                        <img 
                          src={hospitalPhoto} 
                          alt="Navjyoti Multispeciality Hospital Campus" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent p-6 flex flex-col justify-end">
                          <h4 className="font-display font-black text-white text-lg">Navjyoti Hospital Basti</h4>
                          <p className="text-white/80 text-xs">Modern critical facilities & experienced surgical wings</p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-900 text-white overflow-hidden shadow-xl shadow-blue-200/30 text-left h-full min-h-[350px]">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                          <Landmark size={200} />
                        </div>
                        <h3 className="font-display font-bold text-2xl mb-4">Navjyoti Campus Basti</h3>
                        <p className="text-blue-100 text-sm leading-relaxed mb-6 font-medium">
                          A fully-equipped campus designed to address clinical emergencies, intensive dialysis care, and sutureless laparoscopic and ophthalmological surgeries.
                        </p>
                        <div className="space-y-3.5 text-sm font-semibold">
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2 size={16} className="text-yellow-300" />
                            <span>Empanelled with PM-JAY Cashless Scheme</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2 size={16} className="text-yellow-300" />
                            <span>24 / 7 Dedicated Ambulance & Trauma Room</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2 size={16} className="text-yellow-300" />
                            <span>In-house Diagnostic Laboratory</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Main Information (7 cols) */}
                  <div className="lg:col-span-7 text-left space-y-5">
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 uppercase tracking-tight">
                      About Our Hospital
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-semibold">
                      Navjyoti Multispeciality Hospital is dedicated to providing high-quality, affordable, and compassionate healthcare services to the people of Basti and nearby regions. Our hospital aims to deliver reliable medical care through experienced doctors, skilled nursing staff, and modern medical facilities in a safe and patient-friendly environment.
                    </p>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      We offer a wide range of specialized healthcare services under one roof, including <em className="not-italic font-extrabold text-blue-900 bg-blue-50/75 px-1 rounded">General Surgery, Eye Care, Pediatrics, General Medicine, Orthopedics, Nephrology, Urology, Neurology, Cardiology, ENT (Ear, Nose & Throat), Dermatology</em>, and many more departments. Our focus is on accurate diagnosis, advanced treatment, and personalized care to ensure the best health outcomes for our patients.
                    </p>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      Equipped with modern medical technology and well-maintained infrastructure, Navjyoti Multispeciality Hospital continuously works to improve healthcare standards and patient satisfaction. We are committed to making quality healthcare accessible and trustworthy for the entire community.
                    </p>
                  </div>
                </div>

                {/* Accreditations Section (Full Width to avoid blank space under the photo and on the right) */}
                {displayCredentials.length > 0 && (
                  <div className="pt-8 border-t border-slate-100 space-y-5 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                      <div>
                        <span className="text-xs font-mono font-black uppercase text-[#1e66f5] tracking-widest flex items-center gap-1.5">
                          <Award size={14} className="animate-pulse" /> Approved Accreditations & Certifications
                        </span>
                        <h4 className="font-display font-extrabold text-xl text-slate-900 mt-1 uppercase">
                          Our Medical Registrations & Standards
                        </h4>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono font-black uppercase tracking-wider bg-slate-50 border border-slate-200/65 px-3.5 py-2 rounded-full inline-block">
                        Click on any certificate to view details
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                      {displayCredentials.map((cred: any) => {
                        const hasImage = !!cred.fileUrl;
                        return (
                          <div 
                            key={cred.id} 
                            onClick={() => setSelectedCred(cred)}
                            className="bg-white border border-slate-200/80 rounded-2xl p-3 flex flex-col justify-between hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50/50 transition-all duration-300 cursor-pointer group shadow-sm hover:-translate-y-1 relative h-[380px] w-full"
                          >
                            <div className="h-64 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center relative shadow-inner w-full">
                              {hasImage ? (
                                <img 
                                  src={cred.fileUrl} 
                                  alt={cred.title} 
                                  className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300" 
                                  style={{ imageRendering: 'auto' }}
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <div className="flex flex-col items-center gap-2.5 text-slate-300 px-8 py-16">
                                  <FileText size={48} className="stroke-[1.25]" />
                                  <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">Digital Document</span>
                                </div>
                              )}
                              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="bg-white/95 text-slate-900 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                  <Eye size={12} className="text-blue-600" /> View Certificate
                                </span>
                              </div>
                            </div>
                            <div className="mt-3 text-left w-full">
                              <span className="text-xs font-black text-slate-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors block h-10" title={cred.title}>
                                {cred.title}
                              </span>
                              <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-100 w-full">
                                <span className="text-[9.5px] font-black uppercase tracking-wider text-[#1e66f5] font-mono flex items-center gap-1 shrink-0">
                                  <ShieldCheck size={11} /> Registered
                                </span>
                                <span className="text-[9px] font-mono font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full truncate max-w-[120px]" title="Validity Details">
                                  {cred.date || 'Active / Verified'}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Unified 3-column row for Pledge, Mission, and Vision at the same level */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-8 mt-4 border-t border-slate-100 text-left w-full">
                  {/* Card 1: Our Universal Pledge */}
                  <div className="p-5 bg-blue-50/40 border border-blue-100/50 rounded-2xl flex flex-col justify-between h-full">
                    <div>
                      <span className="block text-sm font-extrabold text-blue-900 mb-1.5 uppercase tracking-wider font-display">Our Universal Pledge</span>
                      <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                        To make medical diagnostic procedures and premium specialist attention comfortable, transparently billed, and accessible to families in Basti and nearby areas.
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Our Mission */}
                  <div className="p-5 bg-blue-50/40 border border-blue-100/50 rounded-2xl flex flex-col justify-between h-full">
                    <div>
                      <span className="block text-sm font-extrabold text-blue-900 mb-1.5 uppercase tracking-wider font-display">Our Mission</span>
                      <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                        To provide accessible, affordable, and quality healthcare with compassion, integrity, and a commitment to improving the health of our community.
                      </p>
                    </div>
                  </div>

                  {/* Card 3: Our Vision */}
                  <div className="p-5 bg-orange-50/30 border border-orange-100 rounded-2xl flex flex-col justify-between h-full">
                    <div>
                      <span className="block text-sm font-extrabold text-[#7c2d12] mb-1.5 uppercase tracking-wider font-display">Our Vision</span>
                      <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                        To become a trusted and leading healthcare institution in the region by delivering excellence in medical care, innovation, and patient-centered services.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Founders' Message Tab */}
            {activeTab === 'founders' && (
              <motion.div
                key="founders"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="max-w-4xl mx-auto bg-slate-50/55 rounded-3xl border border-slate-200 p-6 md:p-10 text-left shadow-sm space-y-8"
              >
                {/* Intro and combined message */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-black uppercase text-[#1e66f5] tracking-widest bg-blue-100/60 px-3 py-1.5 rounded-full inline-block">
                      ADMINISTRATIVE LEADERSHIP STATEMENT
                    </span>
                  </div>
                  
                  {/* The actual letter content */}
                  <div className="relative pl-6 border-l-2 border-blue-500 text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 font-medium">
                    <div className="absolute top-0 left-0 -mt-3 -ml-4 p-1 text-blue-500/15">
                      <Quote size={50} className="fill-current" />
                    </div>
                    {/* Render chairman bio and director bio as paragraphs of a unified message */}
                    {chairman.bio.split('\n').map(p => p.trim()).filter(Boolean).map((para, i) => (
                      <p key={`c-${i}`}>{para}</p>
                    ))}
                    {director.bio.split('\n').map(p => p.trim()).filter(Boolean).map((para, i) => (
                      <p key={`d-${i}`}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* Bottom section displaying portraits of both doctors */}
                <div className="pt-8 border-t border-slate-200 space-y-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0d2a63] block text-center mb-4">
                    Our Leadership Board
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
                    
                    {/* Dr. Prem Prakash Dubey */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 p-4.5 bg-white rounded-2xl border border-slate-150 shadow-sm w-full max-w-sm">
                      {chairman.photo ? (
                        <div className="w-24 h-32 rounded-xl overflow-hidden border-2 border-white shadow-md shrink-0">
                          <img 
                            src={chairman.photo} 
                            alt={chairman.name} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-32 bg-gradient-to-tr from-blue-600 to-blue-900 text-white rounded-xl flex items-center justify-center shrink-0 shadow-md">
                          <User size={36} className="opacity-80" />
                        </div>
                      )}
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono font-black uppercase text-[#1e66f5] tracking-widest bg-blue-50 px-2 py-0.5 rounded-full inline-block mb-1">
                          CHAIRMAN
                        </span>
                        <h4 className="font-display font-black text-sm text-[#0d2a63]">
                          {chairman.name}
                        </h4>
                        <p className="text-[11px] text-blue-650 font-extrabold tracking-tight">
                          {chairman.qualification}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold leading-none">Founder Chairman</p>
                      </div>
                    </div>

                    {/* Dr. Vidushi Dubey */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 p-4.5 bg-white rounded-2xl border border-slate-150 shadow-sm w-full max-w-sm">
                      {director.photo ? (
                        <div className="w-24 h-32 rounded-xl overflow-hidden border-2 border-white shadow-md shrink-0">
                          <img 
                            src={director.photo} 
                            alt={director.name} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-32 bg-gradient-to-tr from-blue-600 to-blue-900 text-white rounded-xl flex items-center justify-center shrink-0 shadow-md">
                          <User size={36} className="opacity-80" />
                        </div>
                      )}
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono font-black uppercase text-[#1e66f5] tracking-widest bg-blue-50 px-2 py-0.5 rounded-full inline-block mb-1">
                          DIRECTOR
                        </span>
                        <h4 className="font-display font-black text-sm text-[#0d2a63]">
                          {director.name}
                        </h4>
                        <p className="text-[11px] text-blue-650 font-extrabold tracking-tight">
                          {director.qualification}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold leading-none">Managing Director</p>
                      </div>
                    </div>

                  </div>

                  <div className="pt-4 text-center">
                    <div className="inline-flex items-center gap-2 text-[11px] font-bold text-slate-400">
                      <ShieldCheck size={15} className="text-blue-500" />
                      <span>Joint Founder Board Approval & Core Ethos</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Lightbox Modal for Accreditations */}
      <AnimatePresence>
        {selectedCred && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/90 backdrop-blur-md"
            onClick={closeCredModal}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.3 }}
              className={`relative w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center p-5 sm:p-6 gap-4 text-center transition-all duration-300 ${
                isZoomed ? 'max-w-5xl' : 'max-w-2xl'
              }`}
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeCredModal}
                className="absolute top-4 right-4 p-2 bg-slate-800/80 hover:bg-slate-700 hover:scale-105 text-slate-300 hover:text-white rounded-xl transition-all cursor-pointer z-10 border border-slate-700/50"
                title="Close viewer (Esc)"
              >
                <X size={20} />
              </button>

              {/* Header Details */}
              <div className="space-y-1.5 w-full pr-10 text-left">
                <span className="text-[10px] text-blue-400 font-mono font-black uppercase tracking-widest bg-blue-950/50 border border-blue-900/40 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                  <Award size={12} /> Accredited Document
                </span>
                <h3 className="text-lg sm:text-xl font-display font-extrabold text-white leading-tight uppercase tracking-tight">
                  {selectedCred.title}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Status: <span className="text-[#1e66f5] font-bold">{selectedCred.date || 'Active / Authenticated'}</span>
                </p>
              </div>

              {/* Main Image View */}
              <div 
                className={`w-full mx-auto bg-slate-950/40 rounded-2xl border border-slate-800/40 p-1.5 flex items-center justify-center relative transition-all duration-300 ${
                  isZoomed ? 'max-h-[70vh] overflow-auto' : 'w-fit max-w-full max-h-[60vh] sm:max-h-[65vh] overflow-hidden'
                }`}
              >
                {selectedCred.fileUrl ? (
                  <img
                    src={selectedCred.fileUrl}
                    alt={selectedCred.title}
                    onClick={() => setIsZoomed(!isZoomed)}
                    className={`rounded-xl shadow-md transition-all duration-300 ${
                      isZoomed 
                        ? 'max-w-none max-h-none w-[130%] sm:w-[160%] md:w-[200%] h-auto cursor-zoom-out' 
                        : 'max-w-full max-h-[50vh] sm:max-h-[55vh] object-contain cursor-zoom-in'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-slate-600 gap-3 min-w-[280px]">
                    <FileText size={64} className="stroke-[1.2]" />
                    <p className="text-sm font-semibold">Document view not available</p>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 w-full border-t border-slate-800/80 pt-4">
                <span className="text-[11px] text-slate-500 font-medium">
                  Verified by Hospital Registration Board
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedCred.fileUrl && (
                    <>
                      <button
                        onClick={() => setIsZoomed(!isZoomed)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98] text-white rounded-xl transition-all font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-blue-900/20"
                      >
                        {isZoomed ? (
                          <>
                            <ZoomOut size={14} /> Normal View
                          </>
                        ) : (
                          <>
                            <ZoomIn size={14} /> Enlarge View
                          </>
                        )}
                      </button>
                      <a
                        href={selectedCred.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 hover:scale-[1.02] active:scale-[0.98] text-slate-200 hover:text-white rounded-xl transition-all font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 border border-slate-700/60"
                        title="Open image in high resolution in a new tab"
                      >
                        <ExternalLink size={14} /> Full Screen
                      </a>
                    </>
                  )}
                  <button
                    onClick={closeCredModal}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-all font-extrabold text-xs uppercase tracking-wider border border-slate-700/40"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
