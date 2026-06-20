import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Landmark, User, FileText, CheckCircle2, Award } from 'lucide-react';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<'about' | 'director'>('about');

  return (
    <section id="about" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Heritage & Mission
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-905 text-slate-900 tracking-tight">
            Who We Are & What We Believe
          </h2>
          <p className="text-gray-500 mt-3 sm:text-base text-sm leading-relaxed">
            Discover our healthcare standards, specialized facilities, and read the personal message from our leadership team.
          </p>
        </div>

        {/* Tab triggers for modern switching */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'about'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200/50'
                  : 'text-slate-655 text-slate-600 hover:text-blue-700'
              }`}
              id="tab-about-hospital"
            >
              <Landmark size={16} />
              About Hospital
            </button>
            <button
              onClick={() => setActiveTab('director')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'director'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200/50'
                  : 'text-slate-600 hover:text-blue-700'
              }`}
              id="tab-director-message"
            >
              <User size={16} />
              Chairman & Director’s Message
            </button>
          </div>
        </div>

        {/* Dynamic content rendering with motion */}
        <div className="relative">
          {activeTab === 'about' ? (
            <motion.div
              key="about-tab"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Graphic/Stats */}
              <div className="lg:col-span-5 space-y-6">
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-900 text-white overflow-hidden shadow-xl shadow-blue-250/20 shadow-blue-200/30">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Landmark size={200} />
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-4">Navjyoti Campus Basti</h3>
                  <p className="text-blue-105 text-blue-100 text-sm leading-relaxed mb-6">
                    A fully-equipped campus designed to address clinical emergencies, intensive dialysis care, and sutureless laparoscopic and ophthalmological surgeries.
                  </p>
                  <div className="space-y-3.5 text-sm font-medium">
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
                
                {/* Short message snippet */}
                <div className="p-6 rounded-2xl bg-blue-50/40 border border-blue-100/50 text-left">
                  <span className="font-bold text-blue-900 text-sm block mb-1">Our Universal Pledge</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    To make medical diagnostic procedures and premium specialist attention comfortable, transparently billed, and accessible to families in Basti and nearby areas.
                  </p>
                </div>
              </div>

              {/* Main Information */}
              <div className="lg:col-span-7 text-left space-y-6">
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
                  About Our Hospital
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Navjyoti Multispeciality Hospital is dedicated to providing high-quality, affordable, and compassionate healthcare services to the people of Basti and nearby regions. Our hospital aims to deliver reliable medical care through experienced doctors, skilled nursing staff, and modern medical facilities in a safe and patient-friendly environment.
                </p>
                <p className="text-slate-605 text-slate-600 text-sm sm:text-base leading-relaxed">
                  We offer a wide range of specialized healthcare services under one roof, including <em className="not-italic font-semibold text-blue-900">General Surgery, Eye Care, Pediatrics, General Medicine, Orthopedics, Nephrology, Urology, Neurology, Cardiology, ENT (Ear, Nose & Throat), Dermatology</em>, and many more departments. Our focus is on accurate diagnosis, advanced treatment, and personalized care to ensure the best health outcomes for our patients.
                </p>
                <p className="text-slate-605 text-slate-600 text-sm sm:text-base leading-relaxed">
                  Equipped with modern medical technology and well-maintained infrastructure, Navjyoti Multispeciality Hospital continuously works to improve healthcare standards and patient satisfaction. We are committed to making quality healthcare accessible and trustworthy for the entire community.
                </p>
                
                {/* Mission & Vision Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
                  <div className="p-5 bg-blue-50/30 border border-blue-100/50 rounded-2xl">
                    <span className="block text-sm font-extrabold text-blue-900 mb-1.5 uppercase tracking-wider font-display">Our Mission</span>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                      To provide accessible, affordable, and quality healthcare with compassion, integrity, and a commitment to improving the health of our community.
                    </p>
                  </div>
                  <div className="p-5 bg-orange-50/20 border border-orange-100/40 rounded-2xl">
                    <span className="block text-sm font-extrabold text-orange-950 mb-1.5 uppercase tracking-wider font-display">Our Vision</span>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                      To become a trusted and leading healthcare institution in the region by delivering excellence in medical care, innovation, and patient-centered services.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="director-tab"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto bg-slate-50/50 rounded-3xl border border-slate-205 border-slate-200 p-8 md:p-12 text-left shadow-sm"
            >
              {/* Director message layout */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="bg-gradient-to-tr from-blue-600 to-blue-900 text-white w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-4xl font-serif shrink-0 shadow-md">
                  “
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display font-extrabold text-2xl text-slate-900 mb-1">
                      From the Desk of Chairman & Director
                    </h3>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                      Navjyoti Multispeciality Hospital, Basti
                    </p>
                  </div>
                  
                  <div className="text-slate-750 text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 font-sans font-normal">
                    <p>
                      At Navjyoti Multispeciality Hospital, Basti, our mission is to provide high-quality, affordable, and compassionate healthcare to the people of our region. We believe that good health is the foundation of a happy and productive life, and our hospital is dedicated to delivering medical services that meet the highest standards of care and professionalism.
                    </p>
                    <p>
                      Since its establishment, Navjyoti Multispeciality Hospital has been committed to building a healthcare facility where patients receive not only advanced medical treatment but also respect, empathy, and personal attention. Our team of experienced doctors, skilled nurses, and dedicated healthcare professionals work together to ensure that every patient receives accurate diagnosis, effective treatment, and continuous support throughout their healing journey.
                    </p>
                    <p>
                      The hospital is equipped with modern medical infrastructure, advanced diagnostic facilities, and specialized departments that enable us to provide comprehensive healthcare services under one roof. From routine consultations to specialized treatments and emergency care, we strive to maintain excellence in every aspect of patient care.
                    </p>
                    <p>
                      We also believe in the importance of preventive healthcare and community awareness. Our goal is not only to treat illness but also to promote healthier lifestyles and improve the overall well-being of our community. As Director, I take great pride in the commitment and dedication of our medical team. Together, we aim to make Navjyoti Multispeciality Hospital a trusted healthcare destination for families in Basti and surrounding areas. We sincerely thank our patients and the community for their trust and continued support.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-200 mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                      <div>
                        <h4 className="font-display font-extrabold text-slate-900 text-base">
                          Dr. Prem Prakash Dubey
                        </h4>
                        <p className="text-xs text-blue-600 font-semibold mb-2">
                          MBBS, MS (Ophthalmology)
                        </p>
                        <p className="text-xs text-slate-500 font-medium">
                          Ophthalmologist & Eye Department Head, dedicating his vision to patient welfare across Basti.
                        </p>
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-4 block">
                        Chairman
                      </span>
                    </div>

                    <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                      <div>
                        <h4 className="font-display font-extrabold text-slate-900 text-base">
                          Dr. Vidushi Dubey
                        </h4>
                        <p className="text-xs text-blue-600 font-semibold mb-2">
                          MBBS, MS (General & Laparoscopic Surgery)
                        </p>
                        <p className="text-xs text-slate-500 font-medium">
                          General and Laparoscopic Surgeon, directing clinical operations and advanced trauma programs.
                        </p>
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-4 block">
                        Director
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
