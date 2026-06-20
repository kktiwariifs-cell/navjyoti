import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, ArrowRight, X, Clock, MessageSquare, Share2 } from 'lucide-react';
import { getNewsEvents } from '../utils/database';

interface NewsItem {
  id: string;
  title: string;
  category: 'Announcement' | 'Health Camp' | 'Surgical Feat' | 'Ayushman Update';
  date: string;
  author: string;
  readTime: string;
  summary: string;
  fullContent: string;
  imageUrl: string;
}

export default function NewsSection() {
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [liveNews, setLiveNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const loadLiveNews = () => {
      const dbEvents = getNewsEvents();
      const mapped: NewsItem[] = dbEvents.map(event => {
        let category: 'Announcement' | 'Health Camp' | 'Surgical Feat' | 'Ayushman Update' = 'Announcement';
        const lowerTitle = event.title.toLowerCase();
        const lowerPost = event.post.toLowerCase();
        if (lowerTitle.includes('camp') || lowerPost.includes('camp') || lowerTitle.includes('checkup')) {
          category = 'Health Camp';
        } else if (lowerTitle.includes('ayushman') || lowerPost.includes('ayushman') || lowerTitle.includes('pm-jay')) {
          category = 'Ayushman Update';
        } else if (lowerTitle.includes('surgery') || lowerPost.includes('surgery') || lowerTitle.includes('surgical') || lowerTitle.includes('laparoscopic')) {
          category = 'Surgical Feat';
        }

        const dateObj = new Date(event.dateTime);
        const formattedDate = isNaN(dateObj.getTime()) 
          ? event.dateTime 
          : dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

        const wordCount = event.post.split(/\s+/).length;
        const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 180));

        return {
          id: event.id,
          title: event.title,
          category,
          date: formattedDate,
          author: 'Hospital Admin',
          readTime: `${readTimeMinutes} min read`,
          summary: event.post.length > 125 ? event.post.substring(0, 122) + '...' : event.post,
          fullContent: `${event.post}\n\n📍 Event location and venue detail: ${event.location}`,
          imageUrl: event.photoUrl || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600'
        };
      });
      setLiveNews(mapped);
    };

    loadLiveNews();
    window.addEventListener('db_update', loadLiveNews);
    return () => window.removeEventListener('db_update', loadLiveNews);
  }, []);

  const openedArticle = liveNews.find((n) => n.id === selectedNewsId);

  return (
    <section id="news" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200 font-sans text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Hospital Updates
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            News and Events
          </h2>
          <p className="text-slate-500 mt-3 sm:text-base text-sm leading-relaxed font-semibold">
            Stay informed about our upcoming rural health camps, technological upgrades, free clinical checkup drives, and medical milestones.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {liveNews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between group"
              id={`news-card-${item.id}`}
            >
              <div>
                {/* Visual Cover */}
                <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-600 text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Body Meta */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {item.date}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span>{item.readTime}</span>
                  </div>

                  <h3 className="font-display font-extrabold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 font-semibold">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => setSelectedNewsId(item.id)}
                  className="w-full py-2.5 px-4 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-slate-100 group-hover:border-blue-100"
                  id={`read-news-btn-${item.id}`}
                >
                  <span>Read Article</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Modal Dialogue */}
        <AnimatePresence>
          {selectedNewsId && openedArticle && (
            <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
              {/* Blur backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedNewsId(null)}
                className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
              />

              {/* Centre Container */}
              <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-150 z-10"
                >
                  {/* Top image layout */}
                  <div className="h-56 sm:h-64 w-full relative bg-slate-100">
                    <img
                      src={openedArticle.imageUrl}
                      alt={openedArticle.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                    
                    {/* Header tags */}
                    <div className="absolute bottom-5 left-6 right-6 text-white text-left">
                      <span className="bg-blue-600 block w-max mb-2 font-extrabold uppercase tracking-widest text-[9px] px-2.5 py-1 rounded-full shadow-md">
                        {openedArticle.category}
                      </span>
                      <h4 className="font-display font-extrabold text-lg sm:text-2xl leading-tight tracking-tight">
                        {openedArticle.title}
                      </h4>
                    </div>

                    {/* Close action */}
                    <button
                      onClick={() => setSelectedNewsId(null)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/50 hover:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center text-white transition-all cursor-pointer border border-white/10"
                      id="close-news-modal"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Body information */}
                  <div className="p-6 sm:p-8 space-y-5 text-left">
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 pb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-blue-600" />
                        {openedArticle.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <User size={13} />
                        Author: {openedArticle.author}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} />
                        {openedArticle.readTime}
                      </span>
                    </div>

                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-semibold">
                      {openedArticle.fullContent}
                    </p>

                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed pt-2.5 font-medium italic border-t border-slate-100">
                      Disclaimer: These updates are shared to keep patients in Basti aware of regular clinical drives and hospital operations. For any medical emergency consult our 24/7 Casualty ward.
                    </p>

                    {/* Sharing Actions */}
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center gap-2.5 text-xs text-slate-400 font-bold uppercase">
                        <MessageSquare size={13} />
                        <span>Leave Comments (Disabled)</span>
                      </div>
                      <button 
                        onClick={() => alert(`Copied link to article: ${openedArticle.title}`)}
                        className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 hover:underline font-bold"
                      >
                        <Share2 size={13} />
                        Share Post
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>

            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
