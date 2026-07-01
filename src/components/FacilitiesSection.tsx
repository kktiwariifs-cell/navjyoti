import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeartPulse, Activity, ShieldCheck, Thermometer, Sparkles, PlusCircle } from 'lucide-react';

interface Facility {
  id: string;
  title: string;
  category: string;
  iconName: 'ICU' | 'Dialysis' | 'OT' | 'Emergency' | 'Diagnostics' | 'Wards';
  shortDesc: string;
  longDesc: string;
  features: string[];
  imageUrl?: string;
}

export default function FacilitiesSection() {
  const [activeFacility, setActiveFacility] = useState<string>('icu');

  const facilities: Facility[] = [
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
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'ICU':
        return <Activity size={24} className="stroke-[2]" />;
      case 'Dialysis':
        return <HeartPulse size={24} className="stroke-[2]" />;
      case 'OT':
        return <Sparkles size={24} className="stroke-[2]" />;
      case 'Emergency':
        return <Thermometer size={24} className="stroke-[2]" />;
      case 'Diagnostics':
        return <ShieldCheck size={24} className="stroke-[2]" />;
      default:
        return <PlusCircle size={24} className="stroke-[2]" />;
    }
  };

  const selected = facilities.find((f) => f.id === activeFacility) || facilities[0];

  return (
    <section id="facilities" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200 font-sans text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full inline-block mb-3">
            State-Of-The-Art Setups
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Our Hospital Facilities
          </h2>
          <p className="text-slate-500 mt-3 sm:text-base text-sm leading-relaxed font-semibold">
            Equipped with modern medical resources, diagnostic equipment, and patient comfort suites to ensure a smooth recovery.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel - select tabs */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {facilities.map((fac) => {
              const isActive = fac.id === activeFacility;
              return (
                <button
                  key={fac.id}
                  onClick={() => setActiveFacility(fac.id)}
                  className={`p-5 rounded-2xl border text-left flex items-start gap-4 transition-all duration-300 relative overflow-hidden cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 border-transparent text-white shadow-xl shadow-blue-600/15'
                      : 'bg-white border-slate-200 text-slate-850 hover:bg-slate-50/70'
                  }`}
                  id={`facility-tab-${fac.id}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    isActive
                      ? 'bg-white/11 text-white'
                      : 'bg-blue-50 text-blue-600'
                  }`}>
                    {getIcon(fac.iconName)}
                  </div>
                  <div>
                    <span className={`text-[10px] font-extrabold uppercase tracking-widest block mb-0.5 ${
                      isActive ? 'text-blue-100' : 'text-blue-600'
                    }`}>
                      {fac.category}
                    </span>
                    <h3 className="font-display font-bold text-base sm:text-lg leading-snug">
                      {fac.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right panel - detailed views */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md h-full flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {selected.imageUrl && (
                    <div className="h-48 sm:h-60 w-full rounded-2xl overflow-hidden relative border border-slate-150 shadow-sm bg-slate-50 flex items-center justify-center">
                      <img
                        src={selected.imageUrl}
                        alt={selected.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transform hover:scale-[1.01] transition-transform duration-700"
                      />
                    </div>
                  )}

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1.5 block">
                      {selected.category}
                    </span>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 leading-tight">
                      {selected.title}
                    </h3>
                  </div>

                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-sans first-letter:text-3xl first-letter:font-extrabold first-letter:text-blue-600 first-letter:mr-2 first-letter:float-left">
                    {selected.longDesc}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Key Highlights & Protocols
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">
                      {selected.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-semibold">
                          <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                            ✓
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="p-4 bg-blue-50/40 border border-blue-100/40 rounded-2xl flex items-center gap-3 mt-6">
                <ShieldCheck className="text-blue-600 shrink-0" size={20} />
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  All our facilities strictly conform to NABH-level baseline clinical safety measures and hygiene standards in Uttar Pradesh.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
