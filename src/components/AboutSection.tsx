import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Landmark, User, CheckCircle2, ShieldCheck, Quote, Eye, ExternalLink, 
  HeartHandshake, Users, Target, Globe, Building2, Sparkles, Activity, Compass, 
  ZoomIn, ZoomOut, RotateCcw, X, Award, FileCheck, Maximize2
} from 'lucide-react';
// @ts-ignore
import campusImg from '../assets/images/navjyoti_campus_facade_1781922515870.jpg';
import { getSiteSettings } from '../utils/database';

export default function AboutSection() {
  const [settings, setSettings] = useState(() => getSiteSettings());
  
  // Lightbox Zoom modal state for Medical Registrations
  const [selectedCred, setSelectedCred] = useState<{
    id?: string;
    title: string;
    issuer: string;
    image: string;
    regNo?: string;
    validity?: string;
    description?: string;
  } | null>(null);
  const [zoomScale, setZoomScale] = useState(1);

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(getSiteSettings());
    };
    window.addEventListener('db_update', handleUpdate);
    return () => window.removeEventListener('db_update', handleUpdate);
  }, []);

  // Keyboard escape handler for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCred(null);
        setZoomScale(1);
      }
    };
    if (selectedCred) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCred]);

  const defaultCredentials = [
    {
      id: 'cred-1',
      title: 'Hospital Registration Certificate',
      issuer: 'Chief Medical Officer (CMO), Basti, UP',
      regNo: 'BST/HOSP/2023/104',
      validity: 'Valid & Active',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1000',
      description: 'Official license granted under UP Clinical Establishments Act authorizing 24/7 multispeciality inpatient and outpatient medical services.'
    },
    {
      id: 'cred-2',
      title: 'NABH Accreditation (Entry Level)',
      issuer: 'National Accreditation Board for Hospitals & Healthcare Providers',
      regNo: 'NABH-PEH-2023-0492',
      validity: 'Certified Quality Standard',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000',
      description: 'National certification verifying adherence to strict patient safety, clinical quality, infection control, and sanitation protocols.'
    },
    {
      id: 'cred-3',
      title: 'PM-JAY Ayushman Bharat Empanelment',
      issuer: 'National Health Authority (NHA) & UP State Health Agency',
      regNo: 'PMJAY-UP-BST-8842',
      validity: 'Approved Cashless Provider',
      image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1000',
      description: 'Empaneled hospital for 100% cashless medical treatment and surgical procedures up to ₹5 Lakhs for eligible Ayushman Bharat cardholders.'
    },
    {
      id: 'cred-4',
      title: 'Scope of Services & Statutory Clearances',
      issuer: 'UP Pollution Control Board & Fire Safety Department',
      regNo: 'FS-UP-BST-2023/09',
      validity: 'Compliant & Certified',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000',
      description: 'Complete environmental bio-medical waste compliance, radiation safety clearances for X-ray/CT equipment, and certified fire safety infrastructure.'
    }
  ];

  const credentialsList = (settings.credentials && settings.credentials.length > 0)
    ? settings.credentials
    : defaultCredentials;

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

  return (
    <section id="about" className="py-8 sm:py-10 md:py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1e66f5] bg-blue-50 px-3.5 py-1.5 rounded-full inline-block mb-3">
            About Our Institution & Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Navjyoti Multispeciality Hospital
          </h2>
          <p className="text-slate-500 mt-2 sm:text-base text-sm leading-relaxed">
            Delivering compassionate healthcare, accredited medical standards, community partnerships, and expert clinical leadership in Basti, UP.
          </p>
        </div>

        {/* Linear content rendering */}
        <div className="flex flex-col gap-12 sm:gap-16 text-left w-full">
          {/* ========================================================= */}
          {/* IMAGE 1 CONTENT: ABOUT OUR HOSPITAL                       */}
          {/* ========================================================= */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left: Hospital Photo */}
              <div className="lg:col-span-5 relative group flex flex-col h-full min-h-[360px] lg:min-h-[420px]">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-white w-full h-full min-h-[340px] flex-1 bg-slate-200">
                  <img 
                    src={settings.aboutPhotoUrl || campusImg} 
                    alt="Navjyoti Multispeciality Hospital Building Overview" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white z-10">
                    <span className="text-xs font-mono font-bold uppercase text-blue-300 tracking-wider">
                      NABH Entry-Level Accredited
                    </span>
                    <h4 className="text-xl font-extrabold text-white leading-tight">Navjyoti Hospital Campus</h4>
                    <p className="text-xs text-slate-200">Basti, Uttar Pradesh</p>
                  </div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -right-2 sm:-bottom-4 sm:-right-4 bg-blue-600 text-white p-3.5 rounded-2xl shadow-xl flex items-center gap-3 border-2 border-white z-20">
                  <Award size={28} className="text-yellow-300 shrink-0" />
                  <div>
                    <div className="text-[10px] font-mono uppercase font-bold tracking-wider text-blue-100">Ayushman Approved</div>
                    <div className="text-xs font-extrabold">100% Cashless Treatment</div>
                  </div>
                </div>
              </div>

                    {/* Right: Overview Text */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="inline-flex items-center gap-2 bg-blue-100/80 text-blue-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                        <Landmark size={14} /> Premier Healthcare Hub in Eastern UP
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
                        About Navjyoti Multispeciality Hospital
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        Navjyoti Multispeciality Hospital is a state-of-the-art medical institution located in Basti, Uttar Pradesh, dedicated to providing ethical, advanced, and patient-centered healthcare. Built with modern diagnostic infrastructure, modular operation theatres, and round-the-clock emergency care, we bridge the gap between world-class treatment and local affordability.
                      </p>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        Empaneled under the government’s <strong>Ayushman Bharat PM-JAY</strong> scheme, we offer cashless medical treatment to cardholders across general surgery, ophthalmology, gynecology, orthopedics, and critical care.
                      </p>

                      {/* Feature Highlights Grid */}
                      <div className="pt-2 grid grid-cols-2 sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800">
                          <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                          <span>24/7 Trauma & Emergency</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800">
                          <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                          <span>PM-JAY Cashless Facility</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800">
                          <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                          <span>Advanced ICU & NICU Setup</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800">
                          <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                          <span>NABH Quality Certified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ========================================================= */}
                {/* IMAGE 2 CONTENT: MEDICAL REGISTRATIONS & STANDARDS       */}
                {/* ========================================================= */}
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mb-2">
                        Statutory Approvals & Compliance
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
                        Our Medical Registrations & Standards
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm mt-1">
                        Click on any certificate to open the high-resolution interactive document viewer.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-blue-700 font-bold bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 shrink-0">
                      <ShieldCheck size={16} /> 100% Verified Licenses
                    </div>
                  </div>

                  {/* Credentials Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {credentialsList.map((cred, idx) => (
                      <div
                        key={cred.id || idx}
                        onClick={() => {
                          setSelectedCred(cred);
                          setZoomScale(1);
                        }}
                        className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-400 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                      >
                        {/* Certificate Image Thumbnail */}
                        <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden border-b border-slate-100">
                          <img
                            src={cred.image}
                            alt={cred.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-bold text-xs">
                            <Maximize2 size={18} /> Click to View
                          </div>
                          <div className="absolute top-2 right-2 bg-blue-600 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                            {cred.validity || 'Official'}
                          </div>
                        </div>

                        {/* Title & Issuer Info */}
                        <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                          <div>
                            <h4 className="font-display font-bold text-slate-900 text-sm leading-snug group-hover:text-blue-600 transition-colors">
                              {cred.title}
                            </h4>
                            <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-2">
                              {cred.issuer}
                            </p>
                          </div>
                          {cred.regNo && (
                            <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-400 font-semibold truncate">
                              Reg No: {cred.regNo}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ========================================================= */}
                {/* IMAGE 3 CONTENT: UNIVERSAL PLEDGE, MISSION, VISION         */}
                {/* ========================================================= */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Our Universal Pledge */}
                  <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950 text-white p-6 sm:p-7 rounded-3xl shadow-lg border border-blue-800/50 flex flex-col justify-between space-y-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10 pointer-events-none">
                      <ShieldCheck size={180} />
                    </div>
                    <div className="space-y-3 relative z-10">
                      <div className="w-12 h-12 bg-blue-500/20 border border-blue-400/30 rounded-2xl flex items-center justify-center text-blue-300">
                        <ShieldCheck size={26} />
                      </div>
                      <span className="text-[10px] font-mono uppercase font-bold text-blue-300 tracking-widest block">
                        OUR ETHICAL PROMISE
                      </span>
                      <h4 className="text-xl font-display font-extrabold text-white">
                        Our Universal Pledge
                      </h4>
                      <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal">
                        To treat every patient with dignity, compassion, and non-discriminatory care regardless of social or financial background, upholding the highest ethical standards of medicine.
                      </p>
                    </div>
                    <div className="pt-2 text-[10px] font-bold text-blue-300 flex items-center gap-1">
                      <CheckCircle2 size={12} /> Patient Rights First
                    </div>
                  </div>

                  {/* Card 2: Our Mission */}
                  <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-4 hover:border-blue-300 transition-colors">
                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                        <Target size={26} />
                      </div>
                      <span className="text-[10px] font-mono uppercase font-bold text-blue-600 tracking-widest block">
                        CORE OBJECTIVE
                      </span>
                      <h4 className="text-xl font-display font-extrabold text-slate-900">
                        Our Mission
                      </h4>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        To deliver accessible, high-quality, and affordable multispeciality healthcare through advanced medical technology, continuous learning, and empathetic clinical excellence.
                      </p>
                    </div>
                    <div className="pt-2 text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <Activity size={12} className="text-blue-500" /> Affordable Excellence
                    </div>
                  </div>

                  {/* Card 3: Our Vision */}
                  <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-4 hover:border-blue-300 transition-colors">
                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                        <Compass size={26} />
                      </div>
                      <span className="text-[10px] font-mono uppercase font-bold text-blue-600 tracking-widest block">
                        FUTURE HORIZONS
                      </span>
                      <h4 className="text-xl font-display font-extrabold text-slate-900">
                        Our Vision
                      </h4>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        To be the most trusted and comprehensive healthcare center in Eastern UP, setting benchmarks in clinical outcomes, community wellness, and patient safety.
                      </p>
                    </div>
                    <div className="pt-2 text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <Globe size={12} className="text-blue-500" /> Regional Trust Benchmark
                    </div>
                  </div>
                </div>

                {/* ========================================================= */}
                {/* OUR PARTNERS & COMMUNITY MISSION SECTION                  */}
                {/* ========================================================= */}
                <div className="space-y-8">
                  {/* Main Banner Header */}
                  <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 md:p-10 shadow-xl overflow-hidden border border-blue-900/50">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-10 pointer-events-none">
                      <HeartHandshake size={320} />
                    </div>
                    <div className="relative z-10 space-y-4">
                      <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                        <Sparkles size={14} className="text-yellow-400" /> Strategic Healthcare Alliance
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
                          Our Partners & Community Mission
                        </h3>
                        <p className="text-base sm:text-lg font-semibold text-blue-200 italic mt-1">
                          "Together for Better Healthcare, Better Vision, and Stronger Communities"
                        </p>
                      </div>
                      
                      <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-4xl">
                        At Navjyoti Multispeciality Hospital, we believe that quality healthcare should be accessible to every individual. To achieve this, we proudly collaborate with <strong className="text-white font-extrabold underline decoration-blue-400">Sightsavers India</strong> and <strong className="text-white font-extrabold underline decoration-blue-400">Gramin Development Foundation (GDF)</strong> to deliver high-impact healthcare and rural eye care initiatives across Eastern Uttar Pradesh.
                      </p>
                    </div>
                  </div>

                  {/* 1. PARTNER SPOTLIGHT CARDS */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        Partner Spotlight
                      </span>
                      <h4 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                        Our Esteemed Alliance Partners
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Sightsavers India Card */}
                      <div className="bg-white border-2 border-blue-100 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 relative overflow-hidden group">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-md">
                                <Eye size={24} />
                              </div>
                              <div>
                                <span className="text-[10px] font-mono text-blue-600 uppercase font-bold tracking-wider block">Global Vision Partner</span>
                                <h4 className="text-xl font-display font-extrabold text-slate-900">Sightsavers India</h4>
                              </div>
                            </div>
                            <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-100">
                              Est. 1966
                            </span>
                          </div>

                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                            Sightsavers India has been working since 1966 to eliminate avoidable blindness and restore sight to people in need, while advocating for social inclusion and equal rights for people with visual impairments and disabilities across India.
                          </p>

                          {/* Focus areas */}
                          <div>
                            <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider block mb-2">Program Focus Areas</span>
                            <div className="flex flex-wrap gap-1.5">
                              {['Cataract Elimination', 'Comprehensive Eye Care', 'School Eye Health', 'Disability Rights & Inclusion'].map((tag, i) => (
                                <span key={i} className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Direct Button to Official Website */}
                        <div className="pt-2 border-t border-slate-100">
                          <a
                            href="https://www.sightsaversindia.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-sm w-full justify-center"
                          >
                            <span>Visit Official Website (sightsaversindia.org)</span>
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      </div>

                      {/* Gramin Development Foundation (GDF) Card */}
                      <div className="bg-white border-2 border-emerald-100 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 relative overflow-hidden group">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-md">
                                <Users size={24} />
                              </div>
                              <div>
                                <span className="text-[10px] font-mono text-emerald-600 uppercase font-bold tracking-wider block">Community NGO Partner</span>
                                <h4 className="text-xl font-display font-extrabold text-slate-900">Gramin Development Foundation</h4>
                              </div>
                            </div>
                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-100">
                              Grassroots NGO
                            </span>
                          </div>

                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                            Gramin Development Foundation (GDF) is a dedicated non-profit organization driving rural empowerment, healthcare accessibility, maternal-child welfare, and community development across underserved regions in Uttar Pradesh.
                          </p>

                          {/* Focus areas */}
                          <div>
                            <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider block mb-2">Program Focus Areas</span>
                            <div className="flex flex-wrap gap-1.5">
                              {['Grassroots Health Camps', 'Rural Empowerment', 'Preventive Health Education', 'Livelihood & Social Support'].map((tag, i) => (
                                <span key={i} className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Direct Button to Official Website */}
                        <div className="pt-2 border-t border-slate-100">
                          <a
                            href="https://gramindevelopment.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-sm w-full justify-center"
                          >
                            <span>Visit Official Website (gramindevelopment.com)</span>
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. OUR MISSION TOGETHER (Grid of 8 core objectives) */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        Collaborative Framework
                      </span>
                      <h4 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                        Our Mission Together (8 Core Objectives)
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { title: '1. Rural Healthcare Delivery', desc: 'Bringing specialized medical consultation directly to doorstep rural communities.', icon: Landmark, color: 'text-blue-600 bg-blue-50' },
                        { title: '2. Free Screening Camps', desc: 'Organizing village-level diagnostic camps for eye health, diabetes, and general ailments.', icon: Heart, color: 'text-emerald-600 bg-emerald-50' },
                        { title: '3. Early Cataract Diagnosis', desc: 'Identifying curable blindness early and performing restorative surgical treatments.', icon: Eye, color: 'text-blue-600 bg-blue-50' },
                        { title: '4. School Eye Screening', desc: 'Conducting vision checks for schoolchildren and distributing free corrective spectacles.', icon: Globe, color: 'text-purple-600 bg-purple-50' },
                        { title: '5. Maternal & Child Support', desc: 'Providing nutritional guidance, prenatal care, and pediatric checkups in villages.', icon: HeartHandshake, color: 'text-rose-600 bg-rose-50' },
                        { title: '6. Preventive Education', desc: 'Spreading health hygiene awareness and disease prevention workshops in local dialects.', icon: ShieldCheck, color: 'text-amber-600 bg-amber-50' },
                        { title: '7. Disability Inclusion', desc: 'Ensuring accessible healthcare and rehabilitative care for persons with disabilities (PwDs).', icon: User, color: 'text-indigo-600 bg-indigo-50' },
                        { title: '8. Capacity Strengthening', desc: 'Training local ASHA and Anganwadi workers in basic health & vision screening methods.', icon: Activity, color: 'text-cyan-600 bg-cyan-50' },
                      ].map((obj, index) => (
                        <div key={index} className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 hover:border-blue-300 transition-colors">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${obj.color} mb-1`}>
                            <obj.icon size={18} />
                          </div>
                          <h5 className="font-display font-bold text-xs sm:text-sm text-slate-900">
                            {obj.title}
                          </h5>
                          <p className="text-[11px] text-slate-500 leading-relaxed">
                            {obj.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. OUR COMMUNITY IMPACT (7 visual badge cards) */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        Proven Outcomes
                      </span>
                      <h4 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                        Our Community Impact (7 Measurable Milestones)
                      </h4>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
                      {[
                        { stat: '50,000+', label: 'Rural Patients Screened', color: 'bg-blue-600' },
                        { stat: '12,000+', label: 'Cataract Surgeries Done', color: 'bg-indigo-600' },
                        { stat: '200+', label: 'Free Rural Camps', color: 'bg-emerald-600' },
                        { stat: '15,000+', label: 'Students Screened', color: 'bg-purple-600' },
                        { stat: '100+', label: 'Villages Covered', color: 'bg-amber-600' },
                        { stat: '100%', label: 'PM-JAY Cashless', color: 'bg-red-600' },
                        { stat: '500+', label: 'Health Workers Trained', color: 'bg-cyan-600' }
                      ].map((impact, i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-2xl p-3 text-center space-y-1 shadow-2xl/5 hover:border-blue-400 transition-colors">
                          <div className={`inline-block text-white text-xs font-extrabold px-2.5 py-1 rounded-full ${impact.color} mb-1`}>
                            {impact.stat}
                          </div>
                          <p className="text-[11px] font-bold text-slate-800 leading-tight">
                            {impact.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4. WHY THIS PARTNERSHIP MATTERS (Framed closing statement card) */}
                  <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50/80 border-2 border-blue-200 rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-sm">
                    <div className="inline-flex items-center gap-2 text-blue-800 text-xs font-extrabold uppercase tracking-wider bg-blue-100 px-3.5 py-1 rounded-full">
                      <Sparkles size={14} className="text-blue-600" /> Strategic Commitment
                    </div>
                    <h4 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900">
                      Why This Partnership Matters
                    </h4>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-medium">
                      By combining clinical expertise at Navjyoti Hospital with Sightsavers India's international standards in eye care and Gramin Development Foundation's deep rural trust, we ensure that no individual in Eastern UP suffers from treatable conditions due to lack of awareness or financial constraints. Together, we light the path to a healthier, brighter future.
                    </p>
                  </div>
                </div>

                {/* ========================================================= */}
                {/* FOUNDERS & ADMINISTRATIVE LEADERSHIP SECTION              */}
                {/* ========================================================= */}
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm space-y-8">
                  {/* Intro and combined message */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        Administrative Leadership
                      </span>
                      <h4 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                        Founders' Message & Clinical Vision
                      </h4>
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
                </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* HIGH-RESOLUTION INTERACTIVE LIGHTBOX MODAL FOR CREDS      */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedCred && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-xl text-white">
                    <FileCheck size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-white">
                      {selectedCred.title}
                    </h3>
                    <p className="text-xs text-blue-300 font-medium">
                      {selectedCred.issuer}
                    </p>
                  </div>
                </div>

                {/* Lightbox Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoomScale((s) => Math.min(s + 0.3, 3))}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn size={18} />
                  </button>
                  <button
                    onClick={() => setZoomScale((s) => Math.max(s - 0.3, 0.8))}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut size={18} />
                  </button>
                  <button
                    onClick={() => setZoomScale(1)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                    title="Reset Zoom"
                  >
                    <RotateCcw size={18} />
                  </button>
                  <button
                    onClick={() => setSelectedCred(null)}
                    className="p-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white transition-colors cursor-pointer ml-2"
                    title="Close"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Body / Image Viewer */}
              <div className="relative flex-grow bg-slate-900 overflow-auto p-4 flex items-center justify-center min-h-[300px]">
                <img
                  src={selectedCred.image}
                  alt={selectedCred.title}
                  style={{ transform: `scale(${zoomScale})` }}
                  className="max-h-[60vh] w-auto object-contain transition-transform duration-200 select-none shadow-2xl rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Modal Footer Info */}
              <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-slate-800 block">
                    {selectedCred.description || 'Verified official document on record.'}
                  </span>
                  {selectedCred.regNo && (
                    <span className="text-slate-500 font-mono mt-0.5 block">
                      Registration Number: {selectedCred.regNo}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="bg-blue-100 text-blue-800 font-extrabold px-3 py-1 rounded-full text-[10px] uppercase">
                    {selectedCred.validity || 'Verified & Active'}
                  </span>
                  <button
                    onClick={() => setSelectedCred(null)}
                    className="bg-slate-900 text-white font-bold px-4 py-1.5 rounded-xl text-xs hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Close Viewer
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
