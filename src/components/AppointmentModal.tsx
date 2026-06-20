import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Appointment, Doctor, Specialty } from '../types';
import { CalendarRange, ShieldAlert, CheckCircle2, Printer, X, Users, HeartHandshake, PhoneCall, ReceiptText } from 'lucide-react';
import { addAppointment, getDoctors, getServices } from '../utils/database';


interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDoctor: string;
  preselectedDepartment: string;
}

export default function AppointmentModal({ isOpen, onClose, preselectedDoctor, preselectedDepartment }: AppointmentModalProps) {
  // Sync state with dynamic local database
  const [doctorsList, setDoctorsList] = useState<Doctor[]>([]);
  const [servicesList, setServicesList] = useState<Specialty[]>([]);

  // Booking Form State fields
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [department, setDepartment] = useState('General & Laparoscopic Surgery');
  const [doctorName, setDoctorName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('10:00 AM');
  const [symptoms, setSymptoms] = useState('');
  const [isAyushmanCardHolder, setIsAyushmanCardHolder] = useState(false);
  const [ayushmanCardNo, setAyushmanCardNo] = useState('');

  // Confirmation state
  const [bookingTicket, setBookingTicket] = useState<Appointment | null>(null);

  // Synchronize database updates
  useEffect(() => {
    const listDocs = getDoctors();
    const listServs = getServices();
    setDoctorsList(listDocs);
    setServicesList(listServs);

    const handleSync = () => {
      setDoctorsList(getDoctors());
      setServicesList(getServices());
    };
    window.addEventListener('db_update', handleSync);
    return () => window.removeEventListener('db_update', handleSync);
  }, []);

  // Autofill properties on mount / change
  useEffect(() => {
    if (preselectedDepartment) {
      setDepartment(preselectedDepartment);
    }
    if (preselectedDoctor) {
      setDoctorName(preselectedDoctor);
      // set corresponding department
      const docObj = doctorsList.find((d) => d.name === preselectedDoctor);
      if (docObj) {
        setDepartment(docObj.specialization);
      }
    } else {
      // Find default doctor for initial department
      const docFound = doctorsList.find((d) => d.specialization.toLowerCase().includes(department.split(' ')[0].toLowerCase()));
      if (docFound) {
        setDoctorName(docFound.name);
      }
    }
  }, [preselectedDoctor, preselectedDepartment, isOpen, doctorsList]);

  // Assist doctor filtering match
  const deptDocMatches = (dept: string, doc: Doctor) => {
    const cleanDept = dept.toLowerCase();
    const cleanSpec = doc.specialization.toLowerCase();
    if (cleanDept.includes('surgery') || cleanDept.includes('surgeon')) {
      return cleanSpec.includes('surgeon') || cleanSpec.includes('surgery');
    }
    if (cleanDept.includes('eye')) return cleanSpec.includes('eye');
    if (cleanDept.includes('ent')) return cleanSpec.includes('ent');
    if (cleanDept.includes('nephrolog')) return cleanSpec.includes('nephrolog') || cleanSpec.includes('kidney');
    if (cleanDept.includes('pediatric') || cleanDept.includes('pedia')) return cleanSpec.includes('pediatric') || cleanSpec.includes('child');
    if (cleanDept.includes('urolog')) return cleanSpec.includes('urolog');
    if (cleanDept.includes('orthopedic') || cleanDept.includes('bone')) return cleanSpec.includes('orthopedic') || cleanSpec.includes('bone');
    return cleanSpec.includes(cleanDept) || cleanDept.includes(cleanSpec) || cleanSpec.includes(cleanDept.split(' ')[0]);
  };

  // When user alters department, sync doctors dropdown
  const handleDepartmentChange = (dept: string) => {
    setDepartment(dept);
    // filter doctors
    const filteredDocs = doctorsList.filter((d) => deptDocMatches(dept, d));

    if (filteredDocs.length > 0) {
      setDoctorName(filteredDocs[0].name);
    } else {
      setDoctorName('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate random OPD clinical token
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const token = `NVJ-${randomNum}`;

    const newTicket: Appointment = {
      id: `appt_${Date.now()}`,
      patientName,
      patientPhone,
      patientEmail,
      doctorName,
      department,
      appointmentDate,
      appointmentTime,
      symptoms,
      isAyushmanCardHolder,
      ayushmanCardNo: isAyushmanCardHolder ? ayushmanCardNo : undefined,
      status: 'Pending',
      tokenNo: token,
    };

    addAppointment(newTicket);
    setBookingTicket(newTicket);
  };

  const handlePrint = () => {
    window.print();
  };

  const resetAll = () => {
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setDepartment('General & Laparoscopic Surgery');
    setDoctorName('');
    setAppointmentDate('');
    setAppointmentTime('10:00 AM');
    setSymptoms('');
    setIsAyushmanCardHolder(false);
    setAyushmanCardNo('');
    setBookingTicket(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/65 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 z-50 overflow-y-auto">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        className="bg-white rounded-3xl w-full max-w-2xl text-left shadow-2xl relative border border-slate-200 overflow-hidden my-4 sm:my-8 font-sans"
        id="appointment-form-wrapper"
      >
        {/* Modal Close */}
        <button
          onClick={resetAll}
          className="absolute top-5 right-5 bg-slate-50/80 hover:bg-slate-100 p-2.5 rounded-full text-slate-400 hover:text-slate-650 transition-colors z-25 cursor-pointer"
          id="close-appt-modal"
        >
          <X size={15} />
        </button>

        {!bookingTicket ? (
          <div>
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-950 p-6 text-white text-left">
              <div className="flex items-center gap-3">
                <CalendarRange size={24} className="text-blue-400" />
                <h3 className="font-display font-extrabold text-xl sm:text-2xl">Book Clinical Consultation</h3>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Fill in the details below. We will secure your physical queue token and confirm your consultation.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4 max-h-[70vh] overflow-y-auto">
              
              {/* Grid 1: Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase">Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none text-slate-800 bg-white"
                    id="appt-name-input"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase">Contact Mobile *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 9999999999"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none text-slate-800 bg-white"
                    id="appt-phone-input"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none text-slate-800 bg-white"
                />
              </div>

              {/* Department and Doctor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase">Specialist Department *</label>
                  <select
                    value={department}
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:outline-none text-slate-804"
                    id="appt-dept-select"
                  >
                    {servicesList.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    {servicesList.length === 0 && (
                      <>
                        <option value="General & Laparoscopic Surgery">General & Laparoscopic Surgery</option>
                        <option value="Eye Department">Eye Department</option>
                        <option value="ENT">ENT</option>
                        <option value="Nephrology">Nephrology</option>
                        <option value="Pediatric Department">Pediatric Department</option>
                        <option value="Urology">Urology</option>
                        <option value="Orthopedics">Orthopedics</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase">Assigned Doctor *</label>
                  <select
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:outline-none text-slate-804"
                    id="appt-doctor-select"
                  >
                    {doctorsList.filter((d) => deptDocMatches(department, d)).map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.qualification})
                      </option>
                    ))}
                    {doctorsList.filter((d) => deptDocMatches(department, d)).length === 0 && (
                      <option value="">Select Department First / No Doctor Available</option>
                    )}
                  </select>
                </div>
              </div>

              {/* Date and Time preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase">Consultation Date *</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none text-slate-800 bg-white"
                    id="appt-date-input"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase">Preferred Time Slot *</label>
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:outline-none text-slate-804"
                  >
                    <option value="09:30 AM">09:30 AM (Early Morning Slot)</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:30 PM">12:30 PM</option>
                    <option value="02:30 PM">02:30 PM (Afternoon Slot)</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:30 PM">05:30 PM (Late Clinic Slot)</option>
                  </select>
                </div>
              </div>

              {/* Symptoms */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase">Brief symptoms or health concerns *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. chronic knee discomfort, recurring tonsil swelling, cataract inspection"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none text-slate-800 bg-white"
                />
              </div>

              {/* PM-JAY Ayushman Bharat integration */}
              <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-100 text-left space-y-3.5">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="ayushman-checkbox"
                    checked={isAyushmanCardHolder}
                    onChange={(e) => setIsAyushmanCardHolder(e.target.checked)}
                    className="w-4.5 h-4.5 accent-orange-600 text-white rounded cursor-pointer shrink-0"
                  />
                  <label htmlFor="ayushman-checkbox" className="text-xs sm:text-sm font-bold text-orange-950 cursor-pointer select-none">
                    I want to avail cashless treatment under PM-JAY (Ayushman Bharat Scheme)
                  </label>
                </div>

                {isAyushmanCardHolder && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="space-y-1.5 pt-1.5">
                    <label className="text-[10px] font-bold text-orange-850 uppercase tracking-widest block">Provide PM-JAY ID or Golden Card Number *</label>
                    <input
                      type="text"
                      required={isAyushmanCardHolder}
                      placeholder="e.g. AB-XXXX-XXXX-XXXX"
                      value={ayushmanCardNo}
                      onChange={(e) => setAyushmanCardNo(e.target.value)}
                      className="w-full text-sm p-2.5 rounded-xl border bg-white border-orange-200 focus:border-orange-500 focus:outline-none placeholder-gray-400 text-orange-950 font-medium"
                    />
                    <p className="text-[10px] text-gray-500 font-semibold flex items-center gap-1 mt-1">
                      <ShieldAlert size={11} className="text-orange-600" />
                      Carry your original physical card during visit.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Action */}
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={resetAll}
                  className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer text-slate-655"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3 rounded-full text-xs sm:text-sm transition-all shadow-lg shadow-blue-650/15 cursor-pointer"
                  id="submit-appointment-btn"
                >
                  Generate Slot & Ticket
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Confirmation OPD Receipt Screen */
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="p-6 md:p-8 text-center space-y-6">
            
            {/* Header check icon */}
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-650 text-blue-600 flex items-center justify-center mx-auto shadow-inner border border-blue-100">
              <CheckCircle2 size={32} className="stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-slate-900 text-2xl">Appointment Secured!</h3>
              <p className="text-xs text-slate-500 font-medium">Your outpatient slot has been securely registered in our local clinic server.</p>
            </div>

            {/* Printable Receipt Frame */}
            <div id="printable-opd-receipt" className="border border-dashed border-slate-200 bg-slate-50/50 rounded-3xl p-6 text-left space-y-4 max-w-sm mx-auto relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-5">
                <ReceiptText size={150} />
              </div>

              {/* Banner */}
              <div className="pb-3 border-b border-dashed border-slate-150">
                <h4 className="font-display font-extrabold text-slate-900 text-base">NAVJYOTI MULTISPECIALITY</h4>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Bansi Road, near Hardiya Chowraha, Basti</p>
              </div>

              {/* Critical Coordinates block */}
              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-100 text-xs">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Queue Token No</p>
                  <p className="text-base font-extrabold text-blue-600 font-mono">{bookingTicket.tokenNo}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Patient Name</p>
                  <p className="font-bold text-slate-900 truncate">{bookingTicket.patientName}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Department</p>
                  <p className="font-bold text-slate-600 truncate">{bookingTicket.department}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Assigned Doctor</p>
                  <p className="font-bold text-slate-655 truncate">{bookingTicket.doctorName}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Time slot</p>
                  <p className="font-mono font-bold text-slate-600">{bookingTicket.appointmentTime}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Scheduled Date</p>
                  <p className="font-bold text-slate-700">{bookingTicket.appointmentDate}</p>
                </div>
              </div>

              {/* Conditional Ayushman card note */}
              {bookingTicket.isAyushmanCardHolder && (
                <div className="bg-orange-50 border border-orange-100/60 p-2.5 rounded-xl text-[10px]">
                  <p className="font-bold text-orange-950 flex items-center gap-1">
                    <HeartHandshake size={11} className="stroke-[2.5]" />
                    Availing PM-JAY Cashless Benefits
                  </p>
                  <p className="text-orange-950/80 mt-0.5">Card ID: <strong>{bookingTicket.ayushmanCardNo}</strong></p>
                </div>
              )}
            </div>

            {/* Instruction summary note */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs text-slate-500 leading-relaxed text-left max-w-sm mx-auto font-medium">
              <strong>Instructions:</strong> Please present a screenshot or print of this digital ticket to the OPD Desk 15 minutes before the scheduled time slot. Carry Aadhaar Card and PM-JAY Card (if applicable).
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
              <button
                onClick={handlePrint}
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3.5 rounded-full flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer border border-slate-200/50"
              >
                <Printer size={15} />
                Print / Download Receipt
              </button>
              <button
                onClick={resetAll}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-full text-xs sm:text-sm cursor-pointer shadow-lg shadow-blue-600/10"
                id="close-confirmation"
              >
                Done
              </button>
            </div>

          </motion.div>
        )}

      </motion.div>
    </div>
  );
}
