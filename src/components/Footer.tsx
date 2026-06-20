import React, { useState, useEffect } from 'react';
import { FAQS } from '../data';
import { MapPin, Mail, Phone, Heart, ExternalLink, HelpCircle, ChevronDown, ChevronUp, Clock, Info, Facebook, Instagram } from 'lucide-react';
// @ts-ignore
import logoImg from '../assets/images/navjyoti_hospital_logo_1781803671791.jpg';
import { getSiteSettings } from '../utils/database';


interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export default function Footer({ onNavigate, onOpenBooking }: FooterProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [settings, setSettings] = useState(() => getSiteSettings());

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(getSiteSettings());
    };
    window.addEventListener('db_update', handleUpdate);
    return () => window.removeEventListener('db_update', handleUpdate);
  }, []);


  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const handleQuickLink = (id: string) => {
    onNavigate(id);
  };

  return (
    <footer className="bg-gradient-to-br from-[#30c7c0] via-[#a3ede7] to-[#30c7c0] text-slate-900 pt-16 pb-8 border-t border-[#2eb5ae] font-sans text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Expanded FAQs Accordion - Highlighted for Patients */}
        <div className="mb-16 border-b border-[#0f766e]/15 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle size={22} className="text-blue-900 animate-pulse" />
            <h3 className="font-display font-extrabold text-blue-950 text-xl sm:text-2xl">
              Frequently Asked Questions (FAQs)
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white/40 border border-[#2badad]/15 rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:bg-white/60 shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left flex justify-between items-start gap-4 cursor-pointer"
                    id={`faq-btn-${idx}`}
                  >
                    <span className="font-bold text-xs sm:text-sm text-slate-900">
                      {faq.q}
                    </span>
                    <span className="text-blue-900 shrink-0 mt-0.5">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="mt-3 text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold pt-3 border-t border-teal-900/10 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Major Columns row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#0f766e]/15">
          
          {/* Col 1: About credentials info (4 columns) */}
          <div className="lg:col-span-4 space-y-5 text-left">
            <div className="flex items-center gap-3">
              <img
                src={settings.logoUrl || logoImg}
                alt="Navjyoti Hospital Basti Logo"
                className="w-11 h-11 object-contain rounded-xl shadow-md border border-teal-900/10 bg-white"
                referrerPolicy="no-referrer"
              />
              <span className="font-display font-extrabold text-lg text-slate-900 tracking-tight uppercase">
                NAVJYOTI HOSPITALS
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
              At Navjyoti Multispeciality Hospital, Basti (Uttar Pradesh), Free Treatment is Available! Avail the benefits of your Ayushman Bharat Card today for advanced cashless diagnostic operations and expert surgeries.
            </p>

            <div className="bg-amber-100/60 border border-amber-500/20 text-amber-900 rounded-xl p-3 text-xs flex items-start gap-2.5">
              <Info size={16} className="shrink-0 mt-0.5 text-amber-700 font-bold" />
              <p className="leading-snug font-semibold">
                Carry your physical Aadhaar & Ration Card / PM-JAY Golden booklet to verify eligibility on-desk.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="pt-4 border-t border-[#0f766e]/15 space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#0f766e] font-bold block">
                Connect With Us
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/share/1AvpWuLhxJ/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/40 border border-teal-900/10 flex items-center justify-center text-slate-800 hover:text-white hover:bg-blue-600 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300"
                  aria-label="Facebook"
                  id="footer-facebook-btn"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://www.instagram.com/navjyoti_multispeciality_basti?igsh=dXA2Z2xyd3Vncmt6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/40 border border-teal-900/10 flex items-center justify-center text-slate-800 hover:text-white hover:bg-pink-600 hover:border-pink-500 hover:shadow-lg hover:shadow-pink-600/20 transition-all duration-300"
                  aria-label="Instagram"
                  id="footer-instagram-btn"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Hospital Contact Address details (4 columns) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <h4 className="font-display font-bold text-slate-900 text-sm uppercase tracking-widest border-b border-[#0f766e]/15 pb-2">
              Contact Coordinates
            </h4>
            
            <div className="space-y-4 text-xs font-bold text-slate-800">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-900 shrink-0 mt-0.5" />
                <div className="leading-relaxed space-y-1">
                  <p className="text-slate-900 font-extrabold">Hospital Campus Address:</p>
                  <p className="text-slate-800 font-semibold">Bansi Road, near Hardiya Chowraha, Basti, Uttar Pradesh 272001</p>
                  <a 
                    href="https://www.google.com/maps?sca_esv=cbcb3eaaead68c4b&sxsrf=APpeQnvihzv7Nk54t_LS0GLlulud9jFZvg:1781921164924&biw=1600&bih=773&uact=5&gs_lp=Egxnd3Mtd2l6LXNlcnAiF25hdmp5b3RpIGhvc3BpdGFsIGJhc3RpMgsQLhiABBjHARivATIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHjILEAAYgAQYigUYhgMyCxAAGIAEGIoFGIYDMgsQABiABBiKBRiGAzIaEC4YgAQYxwEYrwEYlwUY3AQY3gQY4ATYAQFIqw9QpARY7AxwAXgBkAEBmAHMA6AB5wmqAQkwLjQuMS4wLjG4AQPIAQD4AQGYAgWgAtoGwgIQEC4YgAQYFBiHAhjHARivAcICEBAuGIAEGIoFGEMYxwEYrwHCAgUQABiABMICCBAAGIAEGMkDwgIFEAAY7wWYAwCIBgG6BgYIARABGBSSBwUwLjQuMaAHtVOyBwUwLjQuMbgH2gbCBwUyLTMuMsgHMYAIAQ&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KQFPOtI7xZA5MeKqHGoYqRXw&daddr=Bansi+Road,+near+Hardiya+Chowraha,+Basti,+Uttar+Pradesh+272001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#1e66f5] hover:text-[#154fc4] hover:underline font-bold text-[10px] uppercase tracking-wider"
                    id="footer-navigate-map-link"
                  >
                    <span>Get Directions on Map ↗</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={18} className="text-blue-900 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-900 font-extrabold">Email Communications:</p>
                  <a href="mailto:info@healthcare.com" className="hover:underline hover:text-blue-900 text-slate-800 font-semibold">
                    info@healthcare.com
                  </a>
                  <span className="mx-1.5 text-slate-500">•</span>
                  <a href="mailto:healthca@gmail.com" className="hover:underline hover:text-blue-900 text-slate-800 font-semibold">
                    healthca@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={18} className="text-blue-900 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-900 font-extrabold">24/7 Telephone Emergency:</p>
                  <a href="tel:+917004710751" className="text-blue-900 font-extrabold text-sm tracking-wider hover:underline block mt-0.5">
                    +91 70047 10751
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Links & Help directories (4 columns) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <h4 className="font-display font-bold text-slate-900 text-sm uppercase tracking-widest border-b border-[#0f766e]/15 pb-2">
              Quick Links
            </h4>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-sm font-bold text-slate-800">
              <button onClick={() => handleQuickLink('about')} className="text-left text-slate-800 hover:text-blue-900 py-1 transition-colors cursor-pointer">
                • About Us
              </button>
              <button onClick={() => handleQuickLink('services')} className="text-left text-slate-800 hover:text-blue-900 py-1 transition-colors cursor-pointer">
                • Our Departments
              </button>
              <button onClick={() => handleQuickLink('contact')} className="text-left text-slate-800 hover:text-blue-900 py-1 transition-colors cursor-pointer">
                • Contact Us
              </button>
              <button onClick={onOpenBooking} className="text-left text-slate-800 hover:text-blue-900 py-1 transition-colors cursor-pointer">
                • Appointments
              </button>
              <button onClick={() => handleQuickLink('pmjay')} className="text-left text-slate-800 hover:text-blue-900 py-1 transition-colors cursor-pointer">
                • Help Center
              </button>
              <button onClick={() => handleQuickLink('gallery')} className="text-left text-slate-800 hover:text-blue-900 py-1 transition-colors cursor-pointer">
                • Our Gallery
              </button>
              <button onClick={() => handleQuickLink('news')} className="text-left text-slate-800 hover:text-blue-900 py-1 transition-colors cursor-pointer">
                • News & Events
              </button>
              <button onClick={() => onNavigate('admin')} className="text-left text-slate-800 hover:text-blue-900 py-1 transition-colors cursor-pointer" id="footer-admin-btn">
                • Staff Admin Panel
              </button>
            </div>
            
            {/* Location coordinates layout / Micro Directions tool */}
            <div className="pt-4 border-t border-[#0f766e]/15 space-y-2">
              <span className="text-[10px] font-extrabold uppercase text-[#0f766e] tracking-wider block">OPD Visiting Clock</span>
              <p className="text-xs text-slate-800 font-semibold">Daily Outpatients: 09:00 AM - 07:00 PM. Trauma care desk runs 24 hours.</p>
            </div>
          </div>

        </div>

        {/* Footer Brand Rights bottom section */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-800">
          <p className="text-center md:text-left">
            © 2025 Navjyoti Multispeciality Hospital. All Rights Reserved | Presented by Digital Communique
          </p>
          <div className="flex gap-4">
            <span className="bg-white/40 border border-[#2badad]/15 px-2.5 py-1 rounded text-slate-900 font-bold">Basti District</span>
            <span className="bg-white/40 border border-[#2badad]/15 px-2.5 py-1 rounded text-slate-900 font-bold">Uttar Pradesh</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
