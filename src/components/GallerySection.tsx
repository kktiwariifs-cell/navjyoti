import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Image, Video, X, Eye, Film, Heart } from 'lucide-react';
import { getSiteSettings } from '../utils/database';

// Extract YouTube ID if valid
function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return null;
}

// Pre-seeded high quality fallback gallery assets
const DEFAULT_GALLERY = [
  {
    id: 'def_1',
    title: 'Advanced Surgical Theater Bloc',
    type: 'image' as const,
    url: 'https://images.unsplash.com/photo-1551076805-e1869e43f49b?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'def_2',
    title: 'Hospital Main Diagnostic Center',
    type: 'image' as const,
    url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'def_3',
    title: 'Digital Patient Consultation Suit',
    type: 'image' as const,
    url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'def_4',
    title: 'Premium Pediatric & Neo-natal Ward',
    type: 'image' as const,
    url: 'https://images.unsplash.com/photo-1502740479091-635887520276?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'def_5',
    title: 'Universal Trauma & Ambulance Bay',
    type: 'image' as const,
    url: 'https://images.unsplash.com/photo-1587351021355-a479a299d2f9?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'def_6',
    title: 'Hospital Tour Presentation (Overview)',
    type: 'video' as const,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' // Generic informative YouTube video fallback
  }
];

export default function GallerySection() {
  const [settings, setSettings] = useState(() => getSiteSettings());
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [selectedMedia, setSelectedMedia] = useState<{ url: string; type: 'image' | 'video'; title: string } | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(getSiteSettings());
    };
    window.addEventListener('db_update', handleUpdate);
    return () => window.removeEventListener('db_update', handleUpdate);
  }, []);

  const galleryItems = useMemo(() => {
    if (settings.gallery && settings.gallery.length > 0) {
      return settings.gallery;
    }
    return DEFAULT_GALLERY;
  }, [settings.gallery]);

  const filteredItems = useMemo(() => {
    if (filter === 'all') return galleryItems;
    return galleryItems.filter(item => item.type === filter);
  }, [galleryItems, filter]);

  return (
    <section className="py-12 bg-slate-50 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Decorative Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#1e66f5] bg-blue-50 px-3.5 py-1.5 rounded-full inline-block mb-3.5">
            Visual Media & Walkthroughs
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight uppercase">
            Hospital Gallery & Tour Channel
          </h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed mt-2">
            Explore state-of-the-art machinery, surgical suites, and browse hospital tour videos catalogued instantly by our clinical administrators.
          </p>
        </div>

        {/* Dynamic Filters */}
        <div className="flex justify-center flex-wrap gap-2.5 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-[#1e66f5] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-205'
            }`}
          >
            All Media ({galleryItems.length})
          </button>
          <button
            onClick={() => setFilter('image')}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === 'image'
                ? 'bg-[#1e66f5] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-205'
            }`}
          >
            <Image size={14} />
            Diagnostics & Campus Photos ({galleryItems.filter(i => i.type === 'image').length})
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === 'video'
                ? 'bg-[#1e66f5] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-205'
            }`}
          >
            <Video size={14} />
            Virtual Tours & Videos ({galleryItems.filter(i => i.type === 'video').length})
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const ytEmbed = item.type === 'video' ? getYouTubeEmbedUrl(item.url) : null;
              
              return (
                <motion.div
                  key={item.id || index}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-150 shadow-sm hover:shadow-xl hover:border-slate-300 group cursor-pointer transition-all flex flex-col justify-between"
                  onClick={() => setSelectedMedia({ url: item.url, type: item.type, title: item.title })}
                >
                  {/* Aspect Box */}
                  <div className="aspect-video w-full bg-slate-900 relative overflow-hidden">
                    {item.type === 'video' ? (
                      <>
                        {ytEmbed ? (
                          <div className="absolute inset-0 w-full h-full bg-slate-950 flex flex-col items-center justify-center">
                            <img 
                              src={`https://img.youtube.com/vi/${item.url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)?.[2]}/0.jpg`} 
                              alt={item.title} 
                              className="w-full h-full object-cover opacity-60 absolute inset-0"
                            />
                            <div className="absolute inset-0 bg-slate-950/40" />
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0d2a63] to-slate-900" />
                        )}
                        {/* Play overlay button */}
                        <div className="absolute inset-0 flex items-center justify-center transition-transform group-hover:scale-110">
                          <span className="w-14 h-14 rounded-full bg-[#1e66f5]/90 text-white flex items-center justify-center shadow-lg backdrop-blur-sm relative z-10 border-4 border-white/20">
                            <Play size={20} className="fill-white ml-0.5" />
                          </span>
                        </div>
                      </>
                    ) : (
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    )}

                    {/* Badge */}
                    <div className="absolute top-3.5 left-3.5 bg-slate-900/80 backdrop-blur-md text-white font-mono font-black text-[9px] uppercase px-2.5 py-1 tracking-widest rounded-full z-10">
                      {item.type === 'video' ? 'VIDEO Walkthrough' : 'PHOTOGRAPH'}
                    </div>

                    {/* Glass hover sheet */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center z-10">
                      <span className="text-white text-xs font-bold font-display tracking-widest uppercase flex items-center gap-2">
                        <Eye size={14} />
                        Launch Viewer
                      </span>
                    </div>
                  </div>

                  {/* Caption details footer */}
                  <div className="p-5 flex items-center justify-between border-t border-slate-100 bg-white">
                    <div className="min-w-0 pr-3">
                      <h4 className="font-display font-black text-[#0d2a63] text-sm truncate uppercase tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-bold tracking-tight">
                        {item.type === 'video' ? 'Interactive YouTube/Video Presentation' : 'Hospital facility & infrastructure showcase'}
                      </p>
                    </div>
                    <span className="text-slate-300 hover:text-blue-500 shrink-0">
                      {item.type === 'video' ? <Film size={18} /> : <Image size={18} />}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Media Overlay Modal */}
        <AnimatePresence>
          {selectedMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/95 z-[9999] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8"
              onClick={() => setSelectedMedia(null)}
            >
              <div 
                className="max-w-5xl w-full flex flex-col relative bg-slate-900/50 rounded-3xl overflow-hidden border border-white/10"
                onClick={e => e.stopPropagation()}
              >
                {/* Header context */}
                <div className="p-5 border-b border-white/5 flex items-center justify-between bg-slate-950/60">
                  <div className="min-w-0 pr-6">
                    <h3 className="font-display font-black text-white text-base truncate uppercase tracking-wider">
                      {selectedMedia.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-0.5">
                      Navjyoti Multispeciality Gallery • {selectedMedia.type === 'video' ? 'Interactive Video Stream' : 'Accredited Photo'}
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedMedia(null)}
                    className="p-2 border border-white/10 hover:border-white/30 text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer shrink-0"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Main Body Stage */}
                <div className="aspect-video w-full bg-black relative flex items-center justify-center">
                  {selectedMedia.type === 'video' ? (
                    (() => {
                      const ytLink = getYouTubeEmbedUrl(selectedMedia.url);
                      if (ytLink) {
                        return (
                          <iframe
                            src={`${ytLink}?autoplay=1&rel=0`}
                            title={selectedMedia.title}
                            className="w-full h-full border-none absolute inset-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        );
                      }
                      return (
                        <div className="p-8 text-center text-slate-300 text-xs w-full">
                          <p className="font-extrabold mb-3">Custom/Native Video Document Link :</p>
                          <a 
                            href={selectedMedia.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline break-all block font-mono text-[11px]"
                          >
                            {selectedMedia.url}
                          </a>
                          <video 
                            src={selectedMedia.url} 
                            controls 
                            autoPlay 
                            className="w-full max-h-[80vh] mt-4 rounded-xl"
                          />
                        </div>
                      );
                    })()
                  ) : (
                    <img 
                      src={selectedMedia.url} 
                      alt={selectedMedia.title} 
                      className="max-w-full max-h-[80vh] object-contain"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
