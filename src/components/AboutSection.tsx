import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Landmark, User, CheckCircle2, ShieldCheck, Quote, Eye, ExternalLink, HeartHandshake, Users, Target, Globe, Building2, Sparkles, Activity, Compass } from 'lucide-react';
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
            Collaborative Community Care & Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Our Partners & Community Mission
          </h2>
          <p className="text-slate-500 mt-3 sm:text-base text-sm leading-relaxed">
            Discover our strategic healthcare partnerships, rural development initiatives, and leadership ethos dedicated to accessible care.
          </p>
        </div>

        {/* Tab triggers */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex-wrap justify-center gap-1">
            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'about'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200/50'
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              <HeartHandshake size={18} />
              Our Partners & Community Mission
            </button>
            <button
              onClick={() => setActiveTab('founders')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'founders'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200/50'
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              <User size={18} />
              Founders' Message
            </button>
          </div>
        </div>

        {/* Dynamic content rendering with motion */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === 'about' && (
              <motion.div
                key="partners"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-12 text-left w-full"
              >
                {/* 1. Header Banner Card */}
                <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-10 shadow-xl overflow-hidden border border-blue-900/50">
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-10 pointer-events-none">
                    <HeartHandshake size={320} />
                  </div>
                  <div className="relative z-10 max-w-4xl space-y-4">
                    <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                      <Sparkles size={14} className="text-yellow-400" /> Strategic Healthcare Alliance
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                      Our Partners
                    </h3>
                    <p className="text-lg sm:text-xl font-semibold text-blue-200 italic">
                      "Together for Better Healthcare, Better Vision, and Stronger Communities"
                    </p>
                    <div className="space-y-3 text-slate-200 text-sm sm:text-base leading-relaxed pt-2">
                      <p>
                        At Navjyoti Multispeciality Hospital, we believe that quality healthcare should be accessible to every individual, regardless of their location or socio-economic background. To achieve this mission, we proudly collaborate with <strong className="text-white font-extrabold underline decoration-blue-400">Sightsavers India</strong> and <strong className="text-white font-extrabold underline decoration-blue-400">Gramin Development Foundation (GDF)</strong> to deliver impactful healthcare initiatives and community development programs.
                      </p>
                      <p className="text-slate-300">
                        Through this strategic partnership, we are committed to strengthening healthcare delivery, promoting eye health, supporting inclusive healthcare, and improving the quality of life for underserved communities.
                      </p>
                    </div>
                    
                    {/* Focus pills */}
                    <div className="pt-4 flex flex-wrap gap-2.5">
                      <span className="bg-blue-600/30 border border-blue-400/30 text-blue-100 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-blue-300" /> Preventive Care
                      </span>
                      <span className="bg-blue-600/30 border border-blue-400/30 text-blue-100 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-blue-300" /> Early Diagnosis
                      </span>
                      <span className="bg-blue-600/30 border border-blue-400/30 text-blue-100 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-blue-300" /> Timely Treatment
                      </span>
                      <span className="bg-blue-600/30 border border-blue-400/30 text-blue-100 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-blue-300" /> Public Health Awareness
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Partner Spotlight Cards (Sightsavers & GDF) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Sightsavers India Card */}
                  <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl hover:border-blue-300 transition-all duration-300 group">
                    <div className="space-y-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-md group-hover:scale-110 transition-transform">
                            <Eye size={28} />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 block">
                              Global Eye Care Partner
                            </span>
                            <h4 className="text-2xl font-display font-extrabold text-slate-900">
                              Sightsavers India
                            </h4>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-extrabold text-blue-700 bg-blue-100/80 px-2.5 py-1 rounded-full shrink-0">
                          Est. 1966
                        </span>
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed">
                        <strong className="text-slate-800">Sightsavers India</strong> is a leading international development organization dedicated to eliminating avoidable blindness and promoting equal opportunities for persons with disabilities. Since 1966, the organization has been working across India in partnership with governments, healthcare institutions, and community organizations to improve eye health services and build inclusive communities.
                      </p>

                      <div className="pt-2">
                        <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-1.5">
                          <Target size={14} className="text-blue-600" /> Program Focus Areas:
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                          {[
                            'Comprehensive Eye Care',
                            'Cataract Elimination',
                            'School Eye Health',
                            'Inclusive Education',
                            'Disability Inclusion',
                            'Community-Based Rehabilitation',
                            'Strengthening Public Health Systems'
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200/80">
                              <CheckCircle2 size={14} className="text-blue-600 shrink-0" />
                              <span className="truncate">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500">Official Partner Website</span>
                      <a
                        href="https://www.sightsaversindia.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-blue-200 cursor-pointer"
                      >
                        Visit Website <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>

                  {/* Gramin Development Foundation Card */}
                  <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl hover:border-emerald-300 transition-all duration-300 group">
                    <div className="space-y-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-md group-hover:scale-110 transition-transform">
                            <Building2 size={28} />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700 block">
                              Rural Empowerment Partner
                            </span>
                            <h4 className="text-2xl font-display font-extrabold text-slate-900">
                              Gramin Development Foundation (GDF)
                            </h4>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-extrabold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full shrink-0">
                          NGO
                        </span>
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed">
                        <strong className="text-slate-800">Gramin Development Foundation (GDF)</strong> is a non-governmental organization committed to empowering rural communities through sustainable development initiatives. The organization works across multiple sectors, including healthcare, education, livelihood development, women empowerment, and community welfare.
                      </p>

                      <p className="text-slate-600 text-sm leading-relaxed">
                        In collaboration with Navjyoti Multispeciality Hospital, GDF supports community outreach programs aimed at improving public health awareness, facilitating access to healthcare services, and promoting preventive healthcare practices among underserved populations.
                      </p>

                      <div className="bg-emerald-50 border border-emerald-200/70 rounded-2xl p-4 text-xs text-emerald-950 font-semibold leading-relaxed">
                        Together, we are working towards building healthier, stronger, and more self-reliant communities across rural Basti and surrounding districts.
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500">Official Partner Website</span>
                      <a
                        href="https://gramindevelopment.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-emerald-200 cursor-pointer"
                      >
                        Visit Website <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* 3. Our Mission Together */}
                <div className="space-y-6 pt-4">
                  <div className="text-center max-w-2xl mx-auto space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1e66f5] bg-blue-50 px-3 py-1 rounded-full inline-block">
                      Shared Objectives
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
                      Our Mission Together
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Our partnership is driven by a shared vision of ensuring that every individual has access to affordable, high-quality, and compassionate healthcare services.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        title: 'Rural Healthcare Delivery',
                        desc: 'Deliver quality healthcare services to rural and underserved communities.',
                        icon: Globe,
                        color: 'text-blue-600 bg-blue-50'
                      },
                      {
                        title: 'Free Health & Eye Camps',
                        desc: 'Organize free health screening and eye care camps.',
                        icon: Eye,
                        color: 'text-emerald-600 bg-emerald-50'
                      },
                      {
                        title: 'Early Diagnosis & Care',
                        desc: 'Promote early diagnosis and timely treatment of diseases.',
                        icon: Activity,
                        color: 'text-purple-600 bg-purple-50'
                      },
                      {
                        title: 'Blindness Prevention',
                        desc: 'Reduce preventable blindness through comprehensive eye care programs.',
                        icon: Target,
                        color: 'text-amber-600 bg-amber-50'
                      },
                      {
                        title: 'Awareness Campaigns',
                        desc: 'Conduct community awareness and preventive healthcare campaigns.',
                        icon: Compass,
                        color: 'text-rose-600 bg-rose-50'
                      },
                      {
                        title: 'Disability Inclusion',
                        desc: 'Support inclusive healthcare services for persons with disabilities.',
                        icon: Users,
                        color: 'text-indigo-600 bg-indigo-50'
                      },
                      {
                        title: 'Maternal & Elderly Care',
                        desc: 'Improve maternal, child, and elderly healthcare through outreach initiatives.',
                        icon: Heart,
                        color: 'text-pink-600 bg-pink-50'
                      },
                      {
                        title: 'Health System Building',
                        desc: 'Strengthen community health systems through education and capacity building.',
                        icon: ShieldCheck,
                        color: 'text-teal-600 bg-teal-50'
                      }
                    ].map((item, index) => {
                      const IconComp = item.icon;
                      return (
                        <div key={index} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all">
                          <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mb-3.5`}>
                            <IconComp size={20} />
                          </div>
                          <h4 className="font-display font-extrabold text-sm text-slate-900 mb-1.5">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            {item.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Our Community Impact */}
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full inline-block mb-2">
                        Real-World Outcomes
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
                        Our Community Impact
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md font-medium">
                      Together, Navjyoti Multispeciality Hospital, Sightsavers India, and Gramin Development Foundation are making a meaningful difference across the region.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                    {[
                      'Providing accessible healthcare services.',
                      'Conducting free medical and eye care camps.',
                      'Delivering life-changing eye surgeries and treatments.',
                      'Promoting preventive healthcare awareness.',
                      'Supporting persons with disabilities through inclusive healthcare.',
                      'Reaching remote villages with quality medical services.',
                      'Improving community health outcomes through collaboration.'
                    ].map((impact, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-start gap-3 shadow-sm">
                        <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg shrink-0 mt-0.5">
                          <CheckCircle2 size={16} />
                        </div>
                        <span className="text-xs sm:text-sm font-extrabold text-slate-800 leading-snug">
                          {impact}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 text-center border-t border-slate-200/80">
                    <p className="text-xs sm:text-sm font-bold text-slate-700 italic">
                      "Every initiative reflects our commitment to creating a healthier and more inclusive society."
                    </p>
                  </div>
                </div>

                {/* 5. Why This Partnership Matters */}
                <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white shadow-xl overflow-hidden border border-blue-800">
                  <div className="max-w-3xl space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                      Why This Partnership Matters
                    </h3>
                    <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                      Healthcare extends beyond hospital walls. Through strong partnerships with respected organizations, we aim to bring quality medical services directly to the communities that need them the most.
                    </p>
                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                      Our collaboration enables us to combine medical expertise, community outreach, and social development to create lasting health impact for thousands of families.
                    </p>
                    <div className="pt-2">
                      <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold tracking-wide">
                        Together, we are building a future where quality healthcare is available to everyone.
                      </div>
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

