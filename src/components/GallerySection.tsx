import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image, Maximize2, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Campus' | 'Diagnostics' | 'Surgical' | 'Wards' | 'Camps';
  imageUrl: string;
  description: string;
}

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Campus', 'Diagnostics', 'Surgical', 'Wards', 'Camps'];

  const galleryItems: GalleryItem[] = [
    {
      id: 'g1',
      title: 'Hospital Main Exterior Front',
      category: 'Campus',
      imageUrl: 'https://images.unsplash.com/photo-1587351021355-a479a299d2f9?auto=format&fit=crop&q=80&w=800',
      description: 'Clean outer infrastructure and secure multi-floor hospital emergency entry gates located in Basti.'
    },
    {
      id: 'g2',
      title: 'Modular Laparoscopic Operating Suite',
      category: 'Surgical',
      imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=800',
      description: 'Ultra-sanitised modular OT set up with specialized high-intensity surgical lights and laparoscopy columns.'
    },
    {
      id: 'g3',
      title: 'Advanced Hemodialysis Recliner Bays',
      category: 'Wards',
      imageUrl: 'https://images.unsplash.com/photo-1584515906207-50c550df322d?auto=format&fit=crop&q=80&w=800',
      description: 'Air-conditioned patient healing suites for continuous RO dialysis treatment cycle.'
    },
    {
      id: 'g4',
      title: 'Pathology Diagnostics & Lab',
      category: 'Diagnostics',
      imageUrl: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=800',
      description: 'Computerized bio-chemistry fluid counters, microscopy setups, and automated pathology screening tools.'
    },
    {
      id: 'g5',
      title: 'Clean In-Patient Recovery Ward',
      category: 'Wards',
      imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
      description: 'Spacious inpatient beds outfitted with central oxygen portals and custom medical attendants couches.'
    },
    {
      id: 'g6',
      title: 'Free Public Rural Eyecare Camp',
      category: 'Camps',
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
      description: 'Our regular outreach camping programs providing consultations, free medicines, and eye testing across rural sub-blocks.'
    }
  ];

  // Filtering logic
  const filteredItems = galleryItems.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const openLightbox = (id: string) => {
    const index = galleryItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryItems.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  const currentLightboxItem = lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white border-b border-slate-200 font-sans text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Visual Transparency
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Our Hospital Gallery
          </h2>
          <p className="text-slate-500 mt-3 sm:text-base text-sm leading-relaxed font-semibold">
            Take a visual tour of our infrastructure, diagnostics pathology laboratories, sanitized recovery wards, and rural camping outreach events.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-3 gap-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap border shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 border-transparent text-white shadow-lg shadow-blue-200'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200'
              }`}
              id={`gallery-filter-${cat}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm hover:shadow-xl transition-all duration-300"
                onClick={() => openLightbox(item.id)}
                id={`gallery-card-${item.id}`}
              >
                {/* Image Wrap */}
                <div className="h-64 sm:h-72 w-full overflow-hidden relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {/* Category Accent Badge */}
                  <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">
                    {item.category}
                  </span>
                  
                  {/* Overlay Interaction elements */}
                  <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Maximize2 size={18} />
                    </div>
                  </div>
                </div>

                {/* Info area */}
                <div className="p-6 text-left">
                  <h3 className="font-display font-extrabold text-slate-900 text-base sm:text-lg mb-1 leading-snug group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 leading-relaxed font-semibold">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dynamic Lightbox Dialog Overlay */}
        <AnimatePresence>
          {lightboxIndex !== null && currentLightboxItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm z-[100] flex flex-col justify-between p-4 sm:p-8"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Close, Index Info */}
              <div className="max-w-7xl mx-auto w-full flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                  <Image size={18} className="text-blue-400" />
                  <span className="text-xs uppercase tracking-widest text-slate-300 font-bold">
                    Gallery View ({lightboxIndex + 1} / {galleryItems.length})
                  </span>
                </div>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
                  id="close-lightbox-btn"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Main Photo Layout with Left, Right arrows */}
              <div className="grow flex items-center justify-center max-w-5xl mx-auto w-full relative my-4">
                {/* Left Arrow */}
                <button
                  onClick={prevPhoto}
                  className="absolute left-0 sm:-left-16 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer z-10"
                  id="prev-lightbox-photo"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Photo */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="max-h-[60vh] sm:max-h-[70vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={currentLightboxItem.imageUrl}
                    alt={currentLightboxItem.title}
                    referrerPolicy="no-referrer"
                    className="max-h-[55vh] sm:max-h-[65vh] object-contain w-auto h-auto mx-auto"
                  />
                </motion.div>

                {/* Right Arrow */}
                <button
                  onClick={nextPhoto}
                  className="absolute right-0 sm:-right-16 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer z-10"
                  id="next-lightbox-photo"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Text Meta at Bottom */}
              <div className="max-w-4xl mx-auto w-full text-center text-white space-y-2 pb-4">
                <span className="inline-block bg-blue-600 font-extrabold uppercase tracking-widest text-[9px] px-3 py-1 rounded-full">
                  {currentLightboxItem.category}
                </span>
                <h4 className="font-display font-extrabold text-xl sm:text-2xl tracking-tight">
                  {currentLightboxItem.title}
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
                  {currentLightboxItem.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
