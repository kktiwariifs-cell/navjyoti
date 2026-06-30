import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, CalendarRange, HeartHandshake, ChevronRight, ChevronLeft, Activity, Users } from 'lucide-react';
import { getSiteSettings } from '../utils/database';

interface HeroProps {
  onOpenBooking: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onOpenBooking, onNavigate }: HeroProps) {
  const [settings, setSettings] = useState(() => getSiteSettings());

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(getSiteSettings());
    };
    window.addEventListener('db_update', handleUpdate);
    return () => window.removeEventListener('db_update', handleUpdate);
  }, []);

  const slides = useMemo(() => {
    const arr: { url: string; label: string }[] = [];
    if (settings.heroImageUrl) {
      arr.push({ url: settings.heroImageUrl, label: 'Main Hospital View' });
    }
    if (settings.sliders && settings.sliders.length > 0) {
      settings.sliders.forEach((slide, idx) => {
        if (slide) {
          arr.push({ url: slide, label: `Clinical Facility Highlight #${idx + 1}` });
        }
      });
    }
    return arr;
  }, [settings]);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [slides.length]);

  const hasSlides = slides.length > 0;

  const defaultTitle = (
    <>
      Caring Hearts. <br />
      <span className={hasSlides ? "bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent" : "bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent"}>
        Expert Hands.
      </span>
    </>
  );

  const renderTitle = () => {
    if (settings.heroTitle === '') return null;
    if (!settings.heroTitle) return defaultTitle;
    const index = settings.heroTitle.indexOf('.');
    if (index !== -1 && index < settings.heroTitle.length - 1) {
      const first = settings.heroTitle.substring(0, index + 1);
      const second = settings.heroTitle.substring(index + 1);
      return (
        <>
          {first} <br />
          <span className={hasSlides ? "bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent" : "bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent"}>
            {second}
          </span>
        </>
      );
    }
    return settings.heroTitle;
  };

  return (
    <section 
      id="home" 
      className={`relative overflow-hidden border-b border-slate-200 transition-all duration-500 ${
        hasSlides 
          ? 'min-h-[85vh] flex items-start pt-24 pb-12 md:pt-28 md:pb-16 bg-slate-950' 
          : 'bg-gradient-to-br from-blue-50 via-white to-slate-50/50 pt-8 pb-16 md:py-24'
      }`}
    >
      {/* Background Slider behind all components if slides exist */}
      {hasSlides ? (
        <div className="absolute inset-0 z-0 overflow-hidden select-none">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide}
              src={slides[currentSlide].url}
              alt={slides[currentSlide].label}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          {/* Slides background without any darkening mask or scrim overlay */}
        </div>
      ) : (
        <>
          {/* Abstract medical design curves */}
          <div className="absolute right-0 top-0 -mr-48 -mt-48 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />
          <div className="absolute left-0 bottom-0 -ml-48 -mb-48 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />
        </>
      )}

      {/* Action buttons (rendered absolutely at top sky area for slider to avoid overlapping banner graphics) */}
      {hasSlides && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="absolute top-3 sm:top-4 md:top-6 lg:top-8 left-1/2 -translate-x-1/2 z-30 flex flex-col sm:flex-row gap-3 sm:gap-4 w-[90%] sm:w-auto justify-center items-center"
        >
          <button
            id="hero-book-btn-floating"
            onClick={onOpenBooking}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white shadow-xl shadow-blue-500/20 font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full flex items-center justify-center gap-2 text-xs sm:text-sm tracking-wide transition-all duration-300 cursor-pointer"
          >
            <CalendarRange size={18} />
            Book Free Consultation
          </button>

          <button
            id="hero-pmjay-btn-floating"
            onClick={() => onNavigate('pmjay')}
            className="w-full sm:w-auto font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full flex items-center justify-center gap-2 text-xs sm:text-sm transition-all duration-300 cursor-pointer border border-blue-400/30 bg-blue-950/70 hover:bg-blue-950/80 text-white backdrop-blur-md shadow-xl"
          >
            <HeartHandshake size={18} className="text-blue-300" />
            Ayushman Bharat Guide
            <ChevronRight size={16} />
          </button>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex justify-center">
        <div className={hasSlides ? "w-full max-w-4xl text-center flex flex-col items-center justify-start pt-2 md:pt-4 pb-8" : "grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full"}>
          
          {/* Main Hero copy & actions */}
          <div className={hasSlides ? "flex flex-col items-center text-center space-y-4 max-w-3xl" : "lg:col-span-7 flex flex-col items-start text-left space-y-6"}>
            
            {/* Action buttons (Only shown when NO slides are present) */}
            {!hasSlides && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto order-4"
              >
                <button
                  id="hero-book-btn"
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white shadow-lg shadow-blue-500/20 font-bold px-7 py-4 rounded-full flex items-center justify-center gap-2 text-sm tracking-wide transition-all duration-300 cursor-pointer"
                >
                  <CalendarRange size={18} />
                  Book Free Consultation
                </button>

                <button
                  id="hero-pmjay-btn"
                  onClick={() => onNavigate('pmjay')}
                  className="w-full sm:w-auto font-bold px-7 py-4 rounded-full flex items-center justify-center gap-2 text-sm transition-all duration-300 cursor-pointer border border-slate-200 bg-white hover:bg-blue-50 text-slate-800 shadow-sm"
                >
                  <HeartHandshake size={18} className="text-blue-600" />
                  Ayushman Bharat Guide
                  <ChevronRight size={16} />
                </button>
              </motion.div>
            )}

            {/* PM-JAY Notification chip - Only shown when NO slides are present to avoid overlapping slide graphics */}
            {!hasSlides && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full shadow-sm transition-all duration-300 bg-blue-50/85 border border-blue-100 text-blue-800"
                id="hero-pmjay-badge"
              >
                <ShieldCheck size={16} className="text-blue-600 stroke-[3]" />
                <span>Ayushman Bharat (PM-JAY) Approved Cashless Treatment</span>
              </motion.div>
            )}

            {/* Display header - Only shown when NO slides are present to avoid overlapping slide graphics */}
            {!hasSlides && renderTitle() && (
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight transition-colors duration-300 text-slate-900"
              >
                {renderTitle()}
              </motion.h1>
            )}

            {/* Sub-copy - Only shown when NO slides are present to avoid overlapping slide graphics */}
            {!hasSlides && settings.heroSubtitle !== "" && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg max-w-xl leading-relaxed font-sans transition-colors duration-300 text-slate-600"
              >
                {settings.heroSubtitle !== undefined && settings.heroSubtitle !== null ? settings.heroSubtitle : "Navjyoti Multispeciality Hospital, located in Basti, Uttar Pradesh, is committed to delivering modern, affordable, and deeply compassionate healthcare. Bring your Ayushman Bharat Card to enjoy free cashless hospital treatments today."}
              </motion.p>
            )}

            {/* Micro stats banner - Only shown when NO slides are present to avoid overlapping slide graphics */}
            {!hasSlides && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-3 gap-6 pt-6 border-t w-full transition-all duration-300 border-slate-200"
              >
                <div>
                  <span className="block text-3xl font-extrabold font-display text-blue-900">15k+</span>
                  <span className="text-xs font-medium text-slate-500">Patients Treated</span>
                </div>
                <div>
                  <span className="block text-3xl font-extrabold font-display text-blue-900">12+</span>
                  <span className="text-xs font-medium text-slate-500">Specialists Doctors</span>
                </div>
                <div>
                  <span className="block text-3xl font-extrabold font-display text-blue-900">100%</span>
                  <span className="text-xs font-medium text-slate-500">Cashless eligible PMJAY</span>
                </div>
              </motion.div>
            )}

          </div>

          {/* Interactive Visual widget (only shown when there are NO background slides) */}
          {!hasSlides && (
            <div className="lg:col-span-5 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-6 md:p-8 relative"
              >
                {/* Highlight status badge */}
                <div className="absolute -top-3 -right-3 bg-red-600 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  <span>Emergency Desk Live</span>
                </div>

                {/* Card core graphic */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-900 rounded-2xl p-6 text-white text-left relative overflow-hidden mb-6">
                  <div className="absolute right-0 bottom-0 pointer-events-none opacity-15">
                    <Activity size={180} />
                  </div>
                  <h3 className="font-display font-extrabold text-xl mb-1">Navjyoti Multispeciality</h3>
                  <p className="text-blue-100 text-xs font-semibold uppercase tracking-wider mb-4">Official Regional Care Hub</p>
                  <div className="space-y-3 relative z-10 text-sm">
                    <div className="flex items-start gap-2 bg-white/10 p-2.5 rounded-xl">
                      <span className="bg-white text-blue-700 font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shrink-0">1</span>
                      <div>
                        <p className="font-bold">Full diagnostics</p>
                        <p className="text-[11px] text-blue-100">Cataract, dialysis, laparoscopy, and ENT diagnostics</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 bg-white/10 p-2.5 rounded-xl">
                      <span className="bg-white text-blue-700 font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shrink-0">2</span>
                      <div>
                        <p className="font-bold">Affordable Treatments</p>
                        <p className="text-[11px] text-blue-100">Free under PM-JAY card or super budget-friendly OPD pricing</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Local clinic status indicator items */}
                <div className="space-y-4 text-left">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <Users size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Wait Time approx</p>
                        <p className="text-sm font-bold text-slate-900">10-15 Minutes</p>
                      </div>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-1 rounded-md">Fast Stream</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <ShieldCheck size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Ayushman Help Center</p>
                        <p className="text-sm font-bold text-slate-900">Room No. 3 (Ground Floor)</p>
                      </div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-md">Cashless Desk</span>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Sleek edge arrows & slide name overlay */}
      {hasSlides && (
        <>
          {slides.length > 1 && (
            <>
              <button
                onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-950/40 hover:bg-[#1e66f5] hover:scale-105 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border border-white/10 select-none"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-950/40 hover:bg-[#1e66f5] hover:scale-105 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border border-white/10 select-none"
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>

              {/* Bottom centered slider indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? 'w-6 bg-blue-500 shadow-md' : 'w-2 bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
