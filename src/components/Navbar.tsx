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
    { label: 'Gallery', target: 'gallery' },
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
      <div className="bg-blue-900 text-white text-[10px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-6 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-row justify-between items-center gap-1.5 sm:gap-2">
          {/* Emergency support */}
          <div className="flex items-center gap-1 sm:gap-1.5 font-bold min-w-0">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <Phone size={12} className="text-red-300 animate-pulse shrink-0" />
            <span className="text-gray-100 font-semibold text-[9px] sm:text-xs truncate">Emergency 24/7:</span>
            <a href="tel:+917004710751" className="text-white hover:underline hover:text-blue-200 font-extrabold tracking-tight sm:tracking-wider text-[10px] sm:text-xs shrink-0">
              +91 70047 10751
            </a>
          </div>

          {/* Email / Cashless support */}
          <div className="flex items-center gap-2 sm:gap-3 font-semibold shrink-0">
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
              className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] uppercase flex items-center gap-1 tracking-wider shadow-sm animate-pulse cursor-pointer border-none transition-all"
            >
              <ShieldAlert size={10} className="stroke-[3]" /> <span className="hidden xs:inline">PM-JAY</span> Cashless
            </button>
          </div>
        </div>
      </div>

      {/* Main header navigation */}
      <nav id="header-nav" className="bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm sticky top-0 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo area */}
            <div className="flex-shrink-0 flex items-center gap-2 sm:gap-3 max-w-[85%] sm:max-w-none">
              <img
                src={settings.logoUrl || logoImg}
                alt="Navjyoti Multi Speciality Hospital Basti Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-xl shadow-md border border-slate-150 bg-white shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col min-w-0 justify-center">
                <span className="font-display font-black text-[13px] xs:text-sm sm:text-lg text-blue-900 leading-none tracking-tight uppercase">
                  NAVJYOTI
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold tracking-wide uppercase mt-1 leading-none truncate">
                  Multispeciality Hospital
                </span>
                <span className="text-[8px] sm:text-[9px] text-gray-400 font-semibold tracking-tight mt-1 leading-none truncate">
                  Basti, UP • Ayushman Approved
                </span>
              </div>

              {/* NABH Certification Badge - Compact & Ultra-trustworthy */}
              <div className="flex items-center pl-2 sm:pl-3 ml-1 sm:ml-2 border-l border-slate-200 shrink-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0" title="NABH Certified (Entry Level)">
                    <svg viewBox="0 0 100 100" className="w-full h-full select-none" aria-label="NABH Entry Level Certified">
                      <defs>
                        <path id="left-side" d="M 12,71 L 50,16" />
                        <path id="right-side" d="M 50,16 L 88,71" />
                      </defs>
                      <polygon points="50,2 98,82 2,82" fill="#1b5e20" />
                      <polygon points="50,17 86,70 14,70" fill="#ffffff" />
                      <text fontFamily="system-ui, -apple-system, sans-serif" fontSize="4.2" fontWeight="900" fill="#ffffff" letterSpacing="0.1">
                        <textPath href="#left-side" startOffset="50%" textAnchor="middle">
                          PATIENT SAFETY &amp;
                        </textPath>
                      </text>
                      <text fontFamily="system-ui, -apple-system, sans-serif" fontSize="4.2" fontWeight="900" fill="#ffffff" letterSpacing="0.1">
                        <textPath href="#right-side" startOffset="50%" textAnchor="middle">
                          QUALITY OF CARE
                        </textPath>
                      </text>
                      <text x="50" y="79" fontFamily="system-ui, -apple-system, sans-serif" fontSize="6.5" fontWeight="900" fill="#ffffff" textAnchor="middle" letterSpacing="0.8">
                        CERTIFIED
                      </text>
                      <circle cx="50" cy="42" r="12" fill="#0288d1" />
                      <circle cx="50" cy="42" r="9" fill="#ffffff" />
                      <polygon points="50,33 58,48 42,48" fill="#d32f2f" />
                      <line x1="50" y1="30" x2="50" y2="44" stroke="#0288d1" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M 46,36 C 48,34 52,34 54,36" stroke="#0288d1" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                      <path d="M 46,40 C 48,38 52,38 54,40" stroke="#0288d1" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                      <text x="50" y="60" fontFamily="system-ui, -apple-system, sans-serif" fontSize="8.5" fontWeight="950" fill="#0d2a63" textAnchor="middle" letterSpacing="0.4">
                        NABH
                      </text>
                      <text x="50" y="66" fontFamily="system-ui, -apple-system, sans-serif" fontSize="3.5" fontWeight="900" fill="#000000" textAnchor="middle" letterSpacing="0.1">
                        (ENTRY LEVEL)
                      </text>
                    </svg>
                  </div>
                  <div className="hidden xs:flex flex-col text-left leading-none">
                    <span className="text-[7.5px] sm:text-[9.5px] font-black tracking-wider text-emerald-800 uppercase">
                      NABH
                    </span>
                    <span className="text-[6px] sm:text-[7.5px] text-slate-500 font-extrabold uppercase mt-0.5 whitespace-nowrap">
                      CERTIFIED
                    </span>
                  </div>
                </div>
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
                className="inline-flex items-center justify-center p-2.5 rounded-xl text-blue-900 bg-slate-50 border border-slate-200/60 hover:bg-blue-50 focus:outline-none transition-all duration-200 hover:scale-[1.05] active:scale-95 cursor-pointer"
                id="mobile-menu-toggle"
              >
                {isMenuOpen ? <X size={20} className="text-blue-600" /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-md border-b border-slate-200 shadow-2xl py-4 px-4 space-y-2 animate-fadeIn relative z-50 rounded-b-3xl">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleLinkClick(item.target)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold block transition-all cursor-pointer ${
                  activeSection === item.target
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                    : 'text-slate-800 hover:bg-blue-50 active:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  onOpenBooking();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-extrabold py-3.5 px-4 rounded-xl text-center shadow-lg shadow-blue-200 text-sm transition-all cursor-pointer"
              >
                Book Appointment
              </button>
              <button
                onClick={() => {
                  handleLinkClick('admin');
                  setIsMenuOpen(false);
                }}
                className="w-full bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-[#0d2a63] font-bold py-3 px-4 rounded-xl text-center text-xs transition-all border border-slate-200 cursor-pointer"
              >
                Staff Administrative Lock
              </button>
              <div className="flex justify-center items-center gap-1.5 py-2.5 text-xs text-gray-600 font-bold bg-slate-50 border border-slate-100 rounded-xl">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span>Call Emergency 24/7:</span>
                <a href="tel:+917004710751" className="text-blue-700 hover:underline hover:text-blue-800 font-extrabold">
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
