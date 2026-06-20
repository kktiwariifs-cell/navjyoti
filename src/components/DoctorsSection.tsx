import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Doctor } from '../types';
import { Heart, Stethoscope, Eye, Ear, ShieldCheck, Activity, Award, Clock, Calendar, CheckSquare, EyeOff, User } from 'lucide-react';
import { getDoctors } from '../utils/database';

// Help identifier matching
const doctorAvatars: Record<string, string> = {
  STETH: 'Stethoscope',
  EYE: 'Eye',
  EAR: 'Ear',
  KIDNEY: 'Activity',
  BABY: 'Heart',
  URO: 'ShieldCheck',
  BONE: 'Award',
};

const specializationDescriptions: Record<string, string> = {
  'General & Laparoscopic Surgeon': 'Advanced surgical care with minimal invasive procedures.',
  'Eye Specialist': 'Comprehensive eye care and vision correction services.',
  'ENT Specialist': 'Expert care for ear, nose and throat conditions.',
  'Nephrologist': 'Specialized kidney care and dialysis management.',
  'Pediatrician': 'Dedicated healthcare for infants and children.',
  'Urologist': 'Advanced treatment for urinary system disorders.',
  'Orthopedic Specialist': 'Bone, joint and spine care by expert doctors.',
};

interface DoctorsSectionProps {
  onOpenBooking: (doctorName?: string) => void;
}

export default function DoctorsSection({ onOpenBooking }: DoctorsSectionProps) {
  const [doctorsList, setDoctorsList] = useState<Doctor[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [activeProfileDoctor, setActiveProfileDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    setDoctorsList(getDoctors());
    const handleSync = () => {
      setDoctorsList(getDoctors());
    };
    window.addEventListener('db_update', handleSync);
    return () => window.removeEventListener('db_update', handleSync);
  }, []);

  // Group specialties
  const specialtiesList = ['All', 'Surgery', 'Eye', 'ENT', 'Nephrology', 'Pediatrics', 'Urology', 'Orthopedic'];

  // Filter logic
  const filteredDoctors = doctorsList.filter((doc) => {
    if (selectedSpecialty === 'All') return true;
    if (!doc || !doc.specialization) return false;
    
    const specLower = doc.specialization.toLowerCase();
    switch (selectedSpecialty) {
      case 'Surgery':
        return specLower.includes('surgeon') || specLower.includes('surgery');
      case 'Eye':
        return specLower.includes('eye');
      case 'ENT':
        return specLower.includes('ent');
      case 'Nephrology':
        return specLower.includes('nephrolog') || specLower.includes('kidney');
      case 'Pediatrics':
        return specLower.includes('pediatric');
      case 'Urology':
        return specLower.includes('urolog');
      case 'Orthopedic':
        return specLower.includes('orthopedic');
      default:
        return false;
    }
  });


  return (
    <section id="specialists" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Our Specialist Doctors
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Our Medical Specialists
          </h2>
          <p className="text-slate-500 mt-3 sm:text-base text-sm leading-relaxed font-semibold">
            Expert doctors delivering trusted and advanced healthcare services
          </p>
        </div>

        {/* Categories selector horizontal scrollable tab */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-4 gap-2 scrollbar-none">
          {specialtiesList.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap border shrink-0 cursor-pointer ${
                selectedSpecialty === spec
                  ? 'bg-blue-600 border-transparent text-white shadow-lg shadow-blue-200'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200'
              }`}
              id={`doctor-filter-${spec}`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredDoctors.map((doc, index) => {
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-3xl border border-slate-150 p-6 text-center hover:border-blue-200 hover:shadow-xl hover:shadow-blue-200/20 transition-all duration-300 flex flex-col justify-between group"
                id={`doctor-card-${doc.id}`}
              >
                <div>
                  {/* Doctor Profile placeholder or vector with stethoscope */}
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-blue-50 to-blue-100 flex items-center justify-center text-blue-600 mb-5 relative group-hover:scale-105 transition-transform duration-300">
                    <User size={38} className="text-blue-755 text-blue-700 stroke-[1.5]" />
                    <div className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow-md border border-slate-50 text-blue-600 animate-pulse">
                      <Stethoscope size={12} />
                    </div>
                  </div>

                  {/* Doctor details */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100/50 inline-block mb-1">
                      {doc.specialization}
                    </span>
                    <h3 className="font-display font-extrabold text-slate-900 text-lg leading-snug group-hover:text-blue-700 transition-colors">
                      {doc.name || 'Specialist Doctor'}
                    </h3>
                    
                    <div className="flex items-center justify-center gap-1.5 text-slate-550 text-slate-500 text-xs font-bold">
                      <span>{doc.qualification}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                      <span className="text-slate-605 text-slate-600">{doc.experience} Years Active</span>
                    </div>

                    <p className="text-slate-500 text-xs mt-2 leading-relaxed font-semibold min-h-[36px] flex items-center justify-center px-1">
                      {specializationDescriptions[doc.specialization] || ''}
                    </p>
                  </div>

                  {/* Schedules & Timing Slot directly on home page card */}
                  <div className="mt-4 pt-4 border-t border-slate-100 text-left space-y-2.5">
                    {/* Header */}
                    <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider flex items-center justify-between">
                      <span>Consultation Schedule</span>
                      <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100 font-extrabold text-[8px] uppercase tracking-wider shrink-0">active opd</span>
                    </div>

                    {/* Clock / Timing */}
                    <div className="flex items-start gap-2 text-slate-600">
                      <Clock size={13} className="text-blue-600 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block leading-none">Timing Slot</span>
                        <span className="font-extrabold text-slate-800 text-xs block">{doc.timings || '10:00 AM - 04:00 PM'}</span>
                      </div>
                    </div>

                    {/* Calendar / Days */}
                    <div className="flex items-start gap-2 text-slate-600">
                      <Calendar size={13} className="text-blue-600 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block leading-none">OPD Days</span>
                        <span className="font-extrabold text-blue-700 text-xs block leading-tight">
                          {Array.isArray(doc.days) ? doc.days.join(', ') : 'Monday - Saturday'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile detail triggers */}
                <div className="space-y-2 mt-4">
                  <button
                    onClick={() => setActiveProfileDoctor(doc)}
                    className="w-full text-blue-700 bg-blue-50 hover:bg-blue-100 active:scale-98 font-bold py-2.5 rounded-full text-xs transition-colors cursor-pointer"
                    id={`view-profile-${doc.id}`}
                  >
                    View Full Profile
                  </button>
                  <button
                    onClick={() => onOpenBooking(doc.name)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-full text-xs transition-colors text-center shadow-md shadow-blue-100/50 cursor-pointer"
                    id={`quick-book-${doc.id}`}
                  >
                    Book Consultation
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state when no doctor filtered */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 font-medium">No specialist doctor found under this department at this hour.</p>
          </div>
        )}

        {/* Clinical Profile Detail overlay Modal popup */}
        {activeProfileDoctor && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full text-left shadow-2xl relative border border-blue-100"
              id="doctor-profile-modal"
            >
              {/* Close Button overlay */}
              <button
                onClick={() => setActiveProfileDoctor(null)}
                className="absolute top-4 right-4 bg-slate-50 hover:bg-slate-100 p-2 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                id="close-profile-modal"
              >
                ✕
              </button>

              <div className="space-y-6">
                
                {/* Doctor credentials header */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                    <User size={30} />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">{activeProfileDoctor.specialization}</span>
                    <h3 className="font-display font-extrabold text-slate-900 text-xl sm:text-2xl mt-1.5">{activeProfileDoctor.name}</h3>
                    <p className="text-xs text-slate-505 text-slate-500 font-bold">{activeProfileDoctor.qualification} • {activeProfileDoctor.experience} Years of Care</p>
                  </div>
                </div>

                {/* Professional clinical bio summary */}
                <div className="space-y-2 pb-4 border-b border-slate-100">
                  <p className="text-xs font-bold uppercase text-blue-900 tracking-wider">Clinical focus & Bio:</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{activeProfileDoctor.bio}</p>
                </div>

                {/* Clock / Active OPD coordinates */}
                <div className="grid grid-cols-2 gap-4 pb-2">
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                      <Clock size={14} className="text-blue-600" />
                      <span>Clinic Timings</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{activeProfileDoctor.timings}</p>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                      <Calendar size={14} className="text-blue-600" />
                      <span>Active OPD Days</span>
                    </div>
                    <p className="text-[11px] font-bold text-blue-750 text-blue-700 leading-tight">
                      {activeProfileDoctor.days.join(', ')}
                    </p>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      onOpenBooking(activeProfileDoctor.name);
                      setActiveProfileDoctor(null);
                    }}
                    className="w-full sm:w-auto grow bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-center text-xs sm:text-sm shadow-md cursor-pointer"
                    id={`modal-book-${activeProfileDoctor.id}`}
                  >
                    Confirm Doctor Slot
                  </button>
                  <button
                    onClick={() => setActiveProfileDoctor(null)}
                    className="w-full sm:w-auto border border-slate-200 hover:bg-slate-50 text-slate-650 text-slate-650 text-slate-600 font-bold py-3 px-5 rounded-full text-xs sm:text-sm cursor-pointer"
                  >
                    Close Profile
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}

      </div>
    </section>
  );
}
