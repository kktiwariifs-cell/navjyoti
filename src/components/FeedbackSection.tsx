import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Feedback } from '../types';
import { MailCheck, MessageSquarePlus, Star, Send, ShieldAlert, Heart, Landmark } from 'lucide-react';
import { getFeedbacks, addFeedback } from '../utils/database';

export default function FeedbackSection() {
  // Feedbacks state loaded from DB
  const [feedbacksList, setFeedbacksList] = useState<Feedback[]>([]);

  useEffect(() => {
    setFeedbacksList(getFeedbacks());

    // Listen to updates from other modules (e.g. Admin Panel)
    const handleSync = () => {
      setFeedbacksList(getFeedbacks());
    };
    window.addEventListener('db_update', handleSync);
    return () => window.removeEventListener('db_update', handleSync);
  }, []);

  // Form states
  const [newsEmail, setNewsEmail] = useState('');
  const [isNewsSubscribed, setIsNewsSubscribed] = useState(false);

  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackContent, setFeedbackContent] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);

  // Handlers
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsEmail) {
      setIsNewsSubscribed(true);
      setNewsEmail('');
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedbackName && feedbackEmail && feedbackContent) {
      const newFeedback: Feedback = {
        id: `fb_${Date.now()}`,
        name: feedbackName,
        email: feedbackEmail,
        content: feedbackContent,
        rating: feedbackRating,
        date: new Date().toISOString().split('T')[0],
        isApproved: false, // Must be approved inside the admin dashboard!
      };

      addFeedback(newFeedback);
      setFeedbacksList(getFeedbacks());
      setIsFeedbackSubmitted(true);

      // Reset fields
      setFeedbackName('');
      setFeedbackEmail('');
      setFeedbackContent('');
      setFeedbackRating(5);

      // Clear alert after some time
      setTimeout(() => {
        setIsFeedbackSubmitted(false);
      }, 5000);
    }
  };


  return (
    <section id="feedback" className="py-16 md:py-24 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Double block container: Newsletter & Feedback Forms */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Block: Newsletter + Live feedbacks list (8 columns or split) */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            {/* Newsletter registration */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-blue-900/40">
              <div className="absolute right-0 bottom-0 p-4 opacity-5 pointer-events-none">
                <MailCheck size={200} />
              </div>

              <div className="relative z-10 space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-extrabold tracking-widest bg-blue-500/20 border border-blue-400/20 px-3 py-1 rounded-md text-blue-300">
                    Stay Connected
                  </span>
                  <h3 className="font-display font-extrabold text-2xl mt-2.5">
                    Get Breaking News And More!
                  </h3>
                  <p className="text-slate-350 text-slate-300 text-xs sm:text-sm leading-relaxed mt-1.5">
                    Register For Our Newsletter to receive health notices, PM-JAY policy updates, free medical camps calendars, and sanitization guidelines.
                  </p>
                </div>

                {!isNewsSubscribed ? (
                  <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Your Email Address"
                      value={newsEmail}
                      onChange={(e) => setNewsEmail(e.target.value)}
                      className="grow px-4 py-3 rounded-2xl border border-slate-705 bg-white/5 text-white placeholder-slate-400 focus:bg-white focus:text-slate-900 focus:outline-none focus:border-blue-500 text-sm transition-all"
                      id="newsletter-email-input"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full text-xs sm:text-sm transition-all cursor-pointer shrink-0 shadow-lg shadow-blue-500/25"
                      id="newsletter-submit-btn"
                    >
                      Subscribe
                    </button>
                  </form>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/10 p-4 rounded-xl border border-white/10 flex items-center gap-3">
                    <span className="text-blue-350 text-blue-300 font-bold">✔</span>
                    <p className="text-xs font-bold">Awesome! You have successfully registered for our digital health news letters.</p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Display list of Feedbacks */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-extrabold text-slate-900 text-lg">
                  Recent Patient Testimonials
                </h4>
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  Real Reviews, verified
                </span>
              </div>

              {/* Scrollable container of reviews */}
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin">
                <AnimatePresence>
                  {feedbacksList.filter(fb => fb.isApproved).map((fb) => (
                    <motion.div
                      key={fb.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm relative text-left"
                    >
                      {/* Rating stars */}
                      <div className="flex gap-0.5 text-yellow-400 mb-2">
                        {Array.from({ length: fb.rating }).map((_, i) => (
                          <Star key={i} size={13} className="fill-yellow-400" />
                        ))}
                      </div>
                      
                      {/* Content */}
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
                        "{fb.content}"
                      </p>

                      {/* Author */}
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-900 truncate max-w-xs">{fb.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono font-medium">{fb.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

            </div>

          </div>

          {/* Right Block: Feedback Intake Form (6 columns) */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md text-left">
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <MessageSquarePlus size={24} />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-slate-900 text-base sm:text-lg leading-tight">
                    Send Us Your Feedback
                  </h3>
                  <p className="text-xs text-slate-400">Your experiences guide our hospital care improvements</p>
                </div>
              </div>

              {/* Form elements */}
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                
                {/* Rating selection widget */}
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Choose Treatment Rating *</label>
                  <div className="flex items-center gap-2 mt-1">
                    {[1, 2, 3, 4, 5].map((stars) => (
                      <button
                        key={stars}
                        type="button"
                        onClick={() => setFeedbackRating(stars)}
                        className="text-slate-350 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          size={24}
                          className={stars <= feedbackRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-blue-700 font-bold ml-2">
                      {feedbackRating === 5 ? 'Excellent Care' : feedbackRating === 4 ? 'Very Good' : 'Good Care'}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase block">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={feedbackName}
                    onChange={(e) => setFeedbackName(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                    id="feedback-name-input"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase block">Your Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@email.com"
                    value={feedbackEmail}
                    onChange={(e) => setFeedbackEmail(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                    id="feedback-email-input"
                  />
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase block">Write Feedback *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your treatment experience with the doctors, facilities, or empanelled PM-JAY support representatives..."
                    value={feedbackContent}
                    onChange={(e) => setFeedbackContent(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                    id="feedback-content-input"
                  />
                </div>

                {/* Feedback Submission success notification */}
                {isFeedbackSubmitted && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-blue-50 border border-blue-150 text-blue-800 text-xs rounded-xl font-bold">
                    Thank you! Your feedback has been published in our live patient stream.
                  </motion.div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-full text-center text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-600/15"
                  id="submit-feedback-btn"
                >
                  <Send size={14} />
                  Submit Feedback
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
