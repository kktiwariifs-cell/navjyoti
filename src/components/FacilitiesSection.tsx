import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeartPulse, Activity, ShieldCheck, Thermometer, Sparkles, PlusCircle } from 'lucide-react';
import { Facility } from '../types';
import { getSiteSettings } from '../utils/database';

export default function FacilitiesSection() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [activeFacility, setActiveFacility] = useState<string>('icu');

  useEffect(() => {
    const settings = getSiteSettings();
    const list = settings.facilities || [];
    setFacilities(list);
    if (list.length > 0) {
      setActiveFacility(list[0].id);
    }

    const handleSync = () => {
      const updatedSettings = getSiteSettings();
      setFacilities(updatedSettings.facilities || []);
    };
    window.addEventListener('db_update', handleSync);
    return () => window.removeEventListener('db_update', handleSync);
  }, []);

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

  if (!selected) {
    return null;
  }

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
                    <div className="h-64 sm:h-[350px] md:h-[420px] w-full rounded-2xl overflow-hidden relative border border-slate-150 shadow-sm bg-slate-50 flex items-center justify-center">
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
