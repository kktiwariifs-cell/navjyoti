import React, { useState, useEffect } from 'react';
import { Phone, Mail, Clock, Heart, Menu, X, ShieldAlert } from 'lucide-react';
// @ts-ignore
import logoImg from '../assets/images/navjyoti_hospital_logo_1781803671791.jpg';
import { getSiteSettings } from '../utils/database';


interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, onOpenBooking, activeSection }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [settings, setSettings] = useState(() => getSiteSettings());

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(getSiteSettings());
    };
    window.addEventListener('db_update', handleUpdate);
    return () => window.removeEventListener('db_update', handleUpdate);
  }, []);


  const navItems = [
    { label: 'Home', target: 'home' },
    { label: 'About', target: 'about' },
    { label: 'Departments', target: 'services' },
    { label: 'Facilities', target: 'facilities' },
    { label: 'Our Doctors', target: 'specialists' },
    { label: 'PM-JAY (Ayushman)', target: 'pmjay' },
    { label: 'News and events', target: 'news' },
    { label: 'Contact', target: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full z-50">
      {/* Top emergency bar */}
      <div className="bg-blue-900 text-white text-xs py-2 px-3 sm:px-6 shadow-inner">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          {/* Emergency support */}
          <div className="flex items-center gap-1.5 font-bold">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <Phone size={12} className="text-red-300 animate-pulse" />
            <span className="text-gray-100 font-semibold text-[10px] sm:text-xs">Emergency 24/7:</span>
            <a href="tel:+917004710751" className="text-white hover:underline hover:text-blue-200 font-bold tracking-wider text-[11px] sm:text-xs">
              +91 70047 10751
            </a>
          </div>

          {/* Email / Cashless support */}
          <div className="flex items-center gap-3 text-[11px] font-semibold">
            <div className="hidden md:flex items-center gap-1.5 text-blue-100">
              <Mail size={12} />
              <span className="font-medium text-gray-200">Email:</span>
              <a href="mailto:healthca@gmail.com" className="hover:underline hover:text-white font-bold">
                healthca@gmail.com
              </a>
            </div>
            <div className="hidden lg:flex items-center gap-1 text-blue-100">
              <Clock size={12} />
              <span>OPD: 09:00 AM - 07:00 PM</span>
            </div>
            <button
              onClick={() => handleLinkClick('pmjay')}
              className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold px-3 py-1 rounded-full text-[9px] sm:text-[10px] uppercase flex items-center gap-1 tracking-wider shadow-sm animate-pulse cursor-pointer border-none transition-all"
            >
              <ShieldAlert size={10} className="stroke-[3]" /> PM-JAY Cashless
            </button>
          </div>
        </div>
      </div>

      {/* Main header navigation */}
      <nav id="header-nav" className="bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm sticky top-0 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo area */}
            <div className="flex-shrink-0 flex items-center gap-2 sm:gap-3 max-w-[75%] sm:max-w-none">
              <img
                src={settings.logoUrl || logoImg}
                alt="Navjyoti Multi Speciality Hospital Basti Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-xl shadow-md border border-slate-100 bg-white"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-display font-black text-sm sm:text-lg text-blue-900 leading-none tracking-tight uppercase truncate">
                  NAVJYOTI
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold tracking-wider uppercase mt-0.5 leading-none truncate">
                  Multispeciality Hospital
                </span>
                <span className="text-[8px] sm:text-[9px] text-gray-400 font-semibold tracking-tight mt-0.5 leading-none truncate block">
                  Basti, UP (Ayushman Approved)
                </span>
              </div>
            </div>

            {/* Desktop Navigation links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.target}
                  onClick={() => handleLinkClick(item.target)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    activeSection === item.target
                      ? 'text-blue-600 bg-blue-50/70 border-b-2 border-blue-600'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                  id={`nav-link-${item.target}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA action button */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                id="staff-portal-btn"
                onClick={() => handleLinkClick('admin')}
                className="bg-slate-100 hover:bg-slate-200 text-[#0d2a63] border border-slate-200/80 px-4 py-2.5 rounded-full font-bold text-xs tracking-wide transition-all cursor-pointer"
              >
                Staff Lock
              </button>
              <button
                id="book-appointment-btn"
                onClick={onOpenBooking}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 px-5 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                Book Appointment
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-blue-900 hover:bg-blue-50 focus:outline-none transition-colors"
                id="mobile-menu-toggle"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl py-3 px-4 space-y-2 animate-fadeIn">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleLinkClick(item.target)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold block transition-all ${
                  activeSection === item.target
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-800 hover:bg-blue-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-3">
              <button
                onClick={() => {
                  onOpenBooking();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-center shadow-md text-sm transition-all cursor-pointer"
              >
                Book Appointment
              </button>
              <button
                onClick={() => {
                  handleLinkClick('admin');
                  setIsMenuOpen(false);
                }}
                className="w-full bg-slate-100 hover:bg-slate-200 text-[#0d2a63] font-bold py-2.5 px-4 rounded-xl text-center text-xs transition-all border border-slate-200 cursor-pointer"
              >
                Staff Administrative Lock
              </button>
              <div className="flex justify-center items-center gap-1.5 py-2 text-xs text-gray-500 font-semibold bg-gray-50 rounded-xl">
                <Phone size={13} className="text-red-500" />
                <span>Call Emergency:</span>
                <a href="tel:+9170047-10751" className="text-blue-700 hover:underline">
                  +91 70047 10751
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
