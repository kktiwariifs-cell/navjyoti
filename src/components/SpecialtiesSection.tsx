import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Specialty } from '../types';
import { Activity, Eye, Ear, HeartPulse, Baby, ShieldAlert, Bone, CheckCircle2, ChevronRight } from 'lucide-react';
import { getServices } from '../utils/database';

const iconMap: Record<string, React.ComponentType<any>> = {
  Activity: Activity,
  Eye: Eye,
  Ear: Ear,
  HeartPulse: HeartPulse,
  Baby: Baby,
  ShieldAlert: ShieldAlert,
  Bone: Bone,
};

interface SpecialtiesSectionProps {
  onOpenBooking: (department?: string) => void;
}

export default function SpecialtiesSection({ onOpenBooking }: SpecialtiesSectionProps) {
  const [servicesList, setServicesList] = useState<Specialty[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');

  useEffect(() => {
    const list = getServices();
    setServicesList(list);
    if (list.length > 0) {
      setSelectedSpecialty(list[0].id);
    }

    const handleSync = () => {
      const newList = getServices();
      setServicesList(newList);
    };
    window.addEventListener('db_update', handleSync);
    return () => window.removeEventListener('db_update', handleSync);
  }, []);

  return (
    <section id="services" className="py-16 md:py-24 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Our Medical Departments
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-blue-900 tracking-tight">
            Specialized Hospital Departments
          </h2>
          <p className="text-slate-500 mt-3 sm:text-base text-sm leading-relaxed font-semibold">
            Explore our advanced specialty clinics operating under expert board-certified surgeons and clinicians, offering affordable diagnostics and customized healing plans.
          </p>
        </div>

        {/* Layout split: Left is list of Specialities, Right is interactive details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel - clickable selector list */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 xl:flex xl:flex-col xl:space-y-3">
            {servicesList.map((spec) => {
              const IconComp = iconMap[spec.iconName] || Activity;
              const isActive = selectedSpecialty === spec.id;
              
              return (
                <button
                  key={spec.id}
                  onClick={() => setSelectedSpecialty(spec.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-blue-900 text-white border-transparent shadow-lg shadow-blue-700/15 scale-[1.01]'
                      : 'bg-white text-slate-700 border-slate-100 hover:border-blue-200 hover:bg-blue-50/30'
                  }`}
                  id={`spec-btn-${spec.id}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                      isActive ? 'bg-white/10 text-white' : 'bg-blue-50 text-blue-600'
                    }`}>
                      <IconComp size={20} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm sm:text-base leading-tight">
                        {spec.title}
                      </h4>
                      <p className={`text-[10px] sm:text-xs mt-0.5 ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                        Premium Clinical Care
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={16} className={`transition-transform duration-300 ${
                    isActive ? 'text-white translate-x-1' : 'text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right panel - detail focus pane */}
          <div className="lg:col-span-12 xl:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl min-h-[400px] flex flex-col justify-between text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-[0.02] pointer-events-none">
              <Activity size={300} className="text-blue-900" />
            </div>

            {(() => {
              const spec = servicesList.find((s) => s.id === selectedSpecialty) || servicesList[0];
              if (!spec) return (
                <div className="text-center text-slate-405 p-12">No medical departments registered.</div>
              );
              const IconComp = iconMap[spec.iconName] || Activity;
              
              return (
                <div className="space-y-6 relative z-10 transition-all duration-300">
                  
                  {/* Good Image of active department */}
                  {spec.imageUrl && (
                    <div className="h-48 sm:h-60 w-full rounded-2xl overflow-hidden relative border border-slate-100 shadow-inner">
                      <img
                        src={spec.imageUrl}
                        alt={spec.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}

                  {/* Title and Icon */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100/50 flex items-center justify-center text-blue-600 shrink-0">
                      <IconComp size={26} />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 leading-tight">
                        {spec.title}
                      </h3>
                      <p className="text-xs text-blue-650 font-bold uppercase tracking-widest mt-1">
                        Active Services Department
                      </p>
                    </div>
                  </div>

                  {/* Attractive Description text */}
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                    {spec.description}
                  </p>

                  {/* Highlights section list */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100/80">
                    <p className="text-xs font-bold uppercase text-blue-900 tracking-wider mb-3">
                      Core Procedures & Special focus:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {spec.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-semibold">
                          <CheckCircle2 size={16} className="text-emerald-650 text-emerald-600 shrink-0 stroke-[2.5]" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Direct interactive actions */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={() => onOpenBooking(spec.title)}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white shadow-md shadow-blue-600/20 font-bold px-6 py-3 rounded-full text-xs sm:text-sm transition-all cursor-pointer"
                      id={`book-spec-${spec.id}`}
                    >
                      Book Department Consultation
                    </button>
                    <p className="text-xs text-slate-500 font-bold">
                      OPD Queue wait: ~15 mins average
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>

        </div>

      </div>
    </section>
  );
}
