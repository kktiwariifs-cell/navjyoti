import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Landmark, User, FileText, CheckCircle2, Award, ShieldCheck, Quote } from 'lucide-react';
import { getSiteSettings } from '../utils/database';

export default function AboutSection() {
  const [settings, setSettings] = useState(() => getSiteSettings());
  const [activeTab, setActiveTab] = useState<'about' | 'chairman' | 'director'>('about');

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
    bio: settings.chairmanBio || 'At Navjyoti Multispeciality Hospital, Basti, our mission is to provide high-quality, affordable, and compassionate healthcare to the people of our region. We believe that good health is the foundation of a happy and productive life, and our hospital is dedicated to delivering medical services that meet the highest standards of care and professionalism.'
  };

  const director = {
    name: settings.directorName || 'Dr. Vidushi Dubey',
    qualification: settings.directorQualification || 'MBBS, MS (General & Laparoscopic Surgery)',
    photo: settings.directorPhotoUrl || '',
    bio: settings.directorBio || 'Since its establishment, Navjyoti Multispeciality Hospital has been committed to building a healthcare facility where patients receive not only advanced medical treatment but also respect, empathy, and personal attention. Our team of experienced doctors, skilled nurses, and dedicated healthcare professionals work together to ensure that every patient receives accurate diagnosis, effective treatment, and continuous support throughout their healing journey.'
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
              onClick={() => setActiveTab('chairman')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'chairman'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200/50'
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              <User size={16} />
              Chairman's Message
            </button>
            <button
              onClick={() => setActiveTab('director')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'director'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200/50'
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              <User size={16} />
              Director's Message
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
                    <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-video sm:aspect-auto sm:h-[320px] border border-slate-200 group">
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
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                    Navjyoti Multispeciality Hospital is dedicated to providing high-quality, affordable, and compassionate healthcare services to the people of Basti and nearby regions. Our hospital aims to deliver reliable medical care through experienced doctors, skilled nursing staff, and modern medical facilities in a safe and patient-friendly environment.
                  </p>
                  <p className="text-slate-605 text-slate-600 text-sm sm:text-base leading-relaxed">
                    We offer a wide range of specialized healthcare services under one roof, including <em className="not-italic font-extrabold text-blue-900">General Surgery, Eye Surgery, Pediatrics, General Medicine, Orthopedics, Nephrology, Urology, Gynecology</em>, and many more. Our focus is on accurate diagnosis, advanced treatment, and personalized care to ensure the best health outcomes for our patients.
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

            {/* Chairman Desk Tab */}
            {activeTab === 'chairman' && (
              <motion.div
                key="chairman"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="max-w-4xl mx-auto bg-slate-50/50 rounded-3xl border border-slate-205 border-slate-200 p-6 md:p-10 text-left shadow-sm"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  
                  {/* Portrait or Quote Placeholder */}
                  {chairman.photo ? (
                    <div className="w-40 h-52 sm:w-48 sm:h-64 rounded-3xl overflow-hidden border-4 border-white shadow-lg shrink-0 mx-auto md:mx-0">
                      <img 
                        src={chairman.photo} 
                        alt={chairman.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <div className="bg-gradient-to-tr from-blue-600 to-blue-900 text-white w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 shadow-md mx-auto md:mx-0">
                      <Quote size={32} className="opacity-80" />
                    </div>
                  )}

                  <div className="space-y-6 flex-1 text-center md:text-left">
                    <div>
                      <span className="text-[10px] font-mono font-black uppercase text-[#1e66f5] tracking-widest bg-blue-100/60 px-2.5 py-1 rounded-full mb-2.5 inline-block">
                        CHAIRMAN DESK
                      </span>
                      <h3 className="font-display font-extrabold text-2xl text-[#0d2a63]">
                        {chairman.name}
                      </h3>
                      <p className="text-xs text-blue-600 font-extrabold uppercase tracking-wider mt-0.5">
                        {chairman.qualification}
                      </p>
                      <p className="text-[11px] text-slate-400 font-bold block">Navjyoti Multispeciality Hospital, Basti</p>
                    </div>

                    <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 font-medium md:text-left text-center">
                      {chairman.bio.split('\n').map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-150 inline-flex items-center gap-2 text-xs font-bold text-slate-400">
                      <ShieldCheck size={16} className="text-blue-500" />
                      <span>Validated Hospital Founder Board Approval</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Director Desk Tab */}
            {activeTab === 'director' && (
              <motion.div
                key="director"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="max-w-4xl mx-auto bg-slate-50/50 rounded-3xl border border-slate-205 border-slate-200 p-6 md:p-10 text-left shadow-sm"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  
                  {/* Portrait or Quote Placeholder */}
                  {director.photo ? (
                    <div className="w-40 h-52 sm:w-48 sm:h-64 rounded-3xl overflow-hidden border-4 border-white shadow-lg shrink-0 mx-auto md:mx-0">
                      <img 
                        src={director.photo} 
                        alt={director.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <div className="bg-gradient-to-tr from-blue-600 to-blue-900 text-white w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 shadow-md mx-auto md:mx-0">
                      <Quote size={32} className="opacity-80" />
                    </div>
                  )}

                  <div className="space-y-6 flex-1 text-center md:text-left">
                    <div>
                      <span className="text-[10px] font-mono font-black uppercase text-[#1e66f5] tracking-widest bg-blue-100/60 px-2.5 py-1 rounded-full mb-2.5 inline-block">
                        DIRECTOR DESK
                      </span>
                      <h3 className="font-display font-extrabold text-2xl text-[#0d2a63]">
                        {director.name}
                      </h3>
                      <p className="text-xs text-blue-600 font-extrabold uppercase tracking-wider mt-0.5">
                        {director.qualification}
                      </p>
                      <p className="text-[11px] text-slate-400 font-bold block">Navjyoti Multispeciality Hospital, Basti</p>
                    </div>

                    <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 font-medium md:text-left text-center">
                      {director.bio.split('\n').map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-150 inline-flex items-center gap-2 text-xs font-bold text-slate-400">
                      <ShieldCheck size={16} className="text-blue-500" />
                      <span>Validated Hospital Founder Board Approval</span>
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
