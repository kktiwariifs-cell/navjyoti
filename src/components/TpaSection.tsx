import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, HeartPulse, Sparkles, Building } from 'lucide-react';
import { getSiteSettings } from '../utils/database';

export default function TpaSection() {
  const [settings, setSettings] = useState(() => getSiteSettings());

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(getSiteSettings());
    };
    window.addEventListener('db_update', handleUpdate);
    return () => window.removeEventListener('db_update', handleUpdate);
  }, []);

  const tpaList = settings.tpaFacilities || [];

  return (
    <section className="py-12 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full inline-block mb-3.5">
            Cashless Insurance Wards
          </span>
          <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight uppercase">
            TPA & Cashless Partner Desks
          </h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed mt-2">
            We partner with major Third Party Administrators (TPAs) and health insurers to bring you transparent, cashless medical admissions and claim processing.
          </p>
        </div>

        {/* Insurance Partners Grid */}
        {tpaList.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs font-semibold bg-slate-50 rounded-2xl border border-dashed border-slate-205">
            No dynamic TPA providers mapped. Default cashless helpdesk is open at our reception lobby 24/7.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tpaList.map((tpa, idx) => (
              <motion.div
                key={tpa.id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-slate-50/50 p-6 rounded-3xl border border-slate-150 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Image/Logo area with a fallback to icon if no URL */}
                  <div className="w-16 h-16 rounded-2xl bg-white border border-slate-150 shadow-inner flex items-center justify-center overflow-hidden shrink-0">
                    {tpa.logoUrl ? (
                      <img
                        src={tpa.logoUrl}
                        alt={tpa.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <Building size={24} className="text-blue-500" />
                    )}
                  </div>

                  <div className="space-y-1.5 text-left">
                    <h4 className="font-display font-extrabold text-[#0d2a63] text-sm leading-snug uppercase tracking-tight">
                      {tpa.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      {tpa.description || 'Pre-authorization and dynamic cashless claims handled directly by our on-site insurance desk.'}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-black uppercase text-emerald-600 font-mono tracking-widest text-left">
                  <ShieldCheck size={13} />
                  <span>EMPANELLED ACTIVE</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Quick TPA Help Notice */}
        <div className="mt-10 max-w-4xl mx-auto p-5 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-col sm:flex-row items-center gap-4 text-left">
          <HeartPulse className="text-blue-500 shrink-0" size={24} />
          <div className="space-y-1">
            <span className="text-xs font-black text-[#0d2a63] uppercase tracking-wider block">How to Avail Cashless Treatment?</span>
            <p className="text-xs text-slate-600 font-semibold leading-relaxed">
              Kindly present your physical health insurance card, Aadhaar ID, and policy document to our TPA Cashless Helpdesk at least <em className="not-italic font-black text-blue-900">24-48 hours</em> prior to planned surgery schedules, or immediately within <em className="not-italic font-black text-blue-900">24 hours</em> of emergency trauma admissions.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
