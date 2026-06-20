import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Megaphone, Calendar, ArrowRight } from 'lucide-react';
import { getSiteSettings } from '../utils/database';

export default function AnnouncementPopup() {
  const [settings, setSettings] = useState(() => getSiteSettings());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(getSiteSettings());
    };
    window.addEventListener('db_update', handleUpdate);
    return () => window.removeEventListener('db_update', handleUpdate);
  }, []);

  useEffect(() => {
    const popupConfig = settings.announcementPopup;
    if (popupConfig && popupConfig.enabled && popupConfig.title) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
    }
  }, [settings.announcementPopup]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const popupConfig = settings.announcementPopup;
  if (!popupConfig || !popupConfig.enabled || !popupConfig.title) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
        >
          {/* Main Card Dynamic Notice */}
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="bg-white rounded-3xl overflow-hidden max-w-xl w-full border border-slate-200 shadow-2xl relative"
            id="announcement-popup-dialog"
          >
            {/* Artistic Header Background */}
            <div className="bg-gradient-to-r from-[#0d2a63] via-blue-900 to-[#1e66f5] p-6 text-white relative">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Megaphone size={120} />
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 shrink-0 animate-pulse">
                  <Megaphone size={20} className="stroke-[2.5]" />
                </span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#ffe066] block font-mono">
                    {popupConfig.badgeText || 'IMPORTANT UPDATE'}
                  </span>
                  <span className="text-xs text-blue-105 font-semibold opacity-90 block">
                    Broadcasted by Navjyoti Clinical Board
                  </span>
                </div>
              </div>
              
              {/* Manual Close Cross Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all cursor-pointer"
                id="announcement-popup-close-btn"
                aria-label="Close Notice"
              >
                <X size={16} />
              </button>
            </div>

            {/* Interactive Body Text Content */}
            <div className="p-6 md:p-8 space-y-5 text-left">
              <h3 className="font-display font-black text-slate-900 text-lg sm:text-xl leading-snug tracking-tight uppercase">
                {popupConfig.title}
              </h3>
              
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl">
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">
                  {popupConfig.message}
                </p>
              </div>

              {/* Action Buttons footer */}
              <div className="flex items-center justify-between gap-4 pt-1 flex-wrap">
                <span className="text-[10px] font-mono text-slate-400 font-extrabold tracking-tight uppercase flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  Verified Broadcast
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleClose}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
                  >
                    Dismiss
                  </button>
                  {popupConfig.linkText && popupConfig.linkUrl && (
                    <a
                      href={popupConfig.linkUrl}
                      onClick={() => setIsOpen(false)}
                      className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{popupConfig.linkText}</span>
                      <ArrowRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
