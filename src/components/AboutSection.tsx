import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Landmark, User, FileText, CheckCircle2, Award, ShieldCheck, Quote } from 'lucide-react';
import { getSiteSettings } from '../utils/database';

export default function AboutSection() {
  const [settings, setSettings] = useState(() => getSiteSettings());
  const [activeTab, setActiveTab] = useState<'about' | 'founders'>('about');

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(getSiteSettings());
    };
    window.addEventListener('db_update', handleUpdate);
    return () => window.removeEventListener('db_update', handleUpdate);
  }, []);

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
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                {/* Graphic/Stats */}
                <div className="lg:col-span-5 space-y-6">
                  {hospitalPhoto ? (
                    <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/5] sm:aspect-auto sm:h-[480px] border border-slate-200 group">
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
                    <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-900 text-white overflow-hidden shadow-xl shadow-blue-200/30 text-left">
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
                  
                  {/* P_MJAY info snippet */}
                  <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-105 border-blue-100 text-left">
                    <span className="font-extrabold text-blue-900 text-sm block mb-1">Our Universal Pledge</span>
                    <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                      To make medical diagnostic procedures and premium specialist attention comfortable, transparently billed, and accessible to families in Basti and nearby areas.
                    </p>
                  </div>
                </div>

                {/* Main Information */}
                <div className="lg:col-span-7 text-left space-y-6">
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

                  {/* Accreditations Row inside About Hospital */}
                  {credentials.length > 0 && (
                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <span className="text-xs font-mono font-black uppercase text-[#1e66f5] tracking-widest flex items-center gap-1.5">
                        <Award size={14} /> Approved Accreditations & Permits
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {credentials.map((cred: any) => (
                          <div key={cred.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2 shadow-sm">
                            <div className="w-7 h-7 rounded-md overflow-hidden bg-white shrink-0 border border-slate-100 flex items-center justify-center">
                              {cred.fileUrl.startsWith('data:') ? (
                                <img src={cred.fileUrl} alt={cred.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              ) : (
                                <FileText size={14} className="text-slate-400" />
                              )}
                            </div>
                            <span className="text-[10px] font-black text-slate-700 truncate block leading-none" title={cred.title}>
                              {cred.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Mission & Vision Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
                    <div className="p-5 bg-blue-50/40 border border-blue-100/50 rounded-2xl">
                      <span className="block text-sm font-extrabold text-blue-900 mb-1.5 uppercase tracking-wider font-display">Our Mission</span>
                      <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                        To provide accessible, affordable, and quality healthcare with compassion, integrity, and a commitment to improving the health of our community.
                      </p>
                    </div>
                    <div className="p-5 bg-orange-50/30 border border-orange-105 border-orange-100 rounded-2xl">
                      <span className="block text-sm font-extrabold text-orange-950 mb-1.5 uppercase tracking-wider font-display">Our Vision</span>
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
    </section>
  );
}
