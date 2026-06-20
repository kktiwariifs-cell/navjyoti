import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, Image as ImageIcon, Maximize2 } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Campus' | 'Facilities' | 'Surgical Wing' | 'Equipment';
  imageUrl: string;
  description: string;
}

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'gallery-campus-1',
      title: 'Hospital Main Facade',
      category: 'Campus',
      imageUrl: '/src/assets/images/navjyoti_campus_facade_1781922515870.jpg',
      description: 'Navjyoti Multispeciality Hospital main building, state-of-the-art campus in Basti, Uttar Pradesh.'
    },
    {
      id: 'gallery-facility-1',
      title: 'Advanced ICU & Patient Care',
      category: 'Facilities',
      imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=1200',
      description: 'Our intensive care unit is fully equipped with advanced patient monitoring systems and life-support gear.'
    },
    {
      id: 'gallery-surgical-1',
      title: 'Modular Laparoscopic OT',
      category: 'Surgical Wing',
      imageUrl: 'https://images.unsplash.com/photo-1581594549595-b56bc374860e?auto=format&fit=crop&q=80&w=1200',
      description: 'Ultra-clean laminar airflow theatre optimized for keyhole gastroenterology and laparoscopic procedures.'
    },
    {
      id: 'gallery-equipment-1',
      title: 'Hemodialysis Treatment Bays',
      category: 'Equipment',
      imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1200',
      description: 'High-precision dialysis machinery providing sanitary care inside sterilized separate treatment cubicles.'
    },
    {
      id: 'gallery-facility-2',
      title: 'Diagnostic Lab',
      category: 'Facilities',
      imageUrl: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=1200',
      description: 'Fully automated biochemistry, pathology, and diagnostic sample analysis setup for rapid reports.'
    },
    {
      id: 'gallery-campus-2',
      title: 'Ambulance Entry & Emergency Reception',
      category: 'Campus',
      imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200',
      description: 'Our 24/7 dedicated emergency bay and ambulance driveway guarantees zero-delay transfers.'
    }
  ];

  const categories = ['All', 'Campus', 'Facilities', 'Surgical Wing', 'Equipment'];

  const filteredItems = galleryItems.filter((item) => {
    return activeCategory === 'All' ? true : item.category === activeCategory;
  });

  const handleOpenLightbox = (id: string) => {
    const index = galleryItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryItems.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  const currentLightboxItem = lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white border-b border-slate-200 font-sans text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title and Badge */}
        <div className="text-center md:text-left mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 tracking-wider uppercase mb-3">
            <ImageIcon size={12} /> Hospital Life
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0d2a63] tracking-tight">
            Our Hospital Gallery
          </h2>
          <p className="mt-4 text-slate-500 max-w-2xl text-sm sm:text-base leading-relaxed">
            Take a virtual tour inside Navjyoti Multispeciality Hospital in Basti, UP. Explore our advanced campus, operational facilities, surgical OTs, and patient wards.
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2 border-b border-slate-100 justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`gallery-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#0d2a63] text-white shadow-md font-bold'
                  : 'text-slate-500 hover:text-[#0d2a63] hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          id="gallery-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25 }}
                key={item.id}
                id={`gallery-card-${item.id}`}
                className="group relative bg-[#0d2a63]/5 hover:bg-[#0d2a63]/10 rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image Section */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Accent Tag */}
                  <span className="absolute top-4 left-4 bg-[#0d2a63] text-white font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full z-10 shadow-sm">
                    {item.category}
                  </span>
                  
                  {/* Zoom Action Backdrop Overlay */}
                  <div 
                    onClick={() => handleOpenLightbox(item.id)}
                    className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer z-10"
                  >
                    <div className="bg-white/95 text-[#0d2a63] p-3 rounded-full shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center">
                      <Maximize2 size={18} />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-slate-800 text-base group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <ImageIcon className="mx-auto text-slate-300 mb-3" size={40} />
            <p className="text-sm text-slate-500 font-semibold">No media items present in this filter.</p>
          </div>
        )}

        {/* Lightbox Pop-up Overlay */}
        <AnimatePresence>
          {lightboxIndex !== null && currentLightboxItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/95 z-[999999] flex flex-col items-center justify-center p-4 touch-none"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Close Button */}
              <button 
                onClick={() => setLightboxIndex(null)}
                className="absolute top-4 right-4 md:top-8 md:right-8 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors cursor-pointer z-50 flex items-center justify-center"
              >
                <X size={20} />
              </button>

              {/* Slider Controls */}
              <div id="lightbox-container" className="relative w-full max-w-5xl flex items-center justify-between pointer-events-none">
                {/* Prev Button */}
                <button
                  onClick={handlePrev}
                  className="absolute left-0 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors cursor-pointer pointer-events-auto z-40 hidden sm:flex items-center justify-center"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Middle Image Wrapper */}
                <div 
                  className="mx-auto max-h-[75vh] max-w-full flex flex-col items-center pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.img
                    key={currentLightboxItem.id}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                    src={currentLightboxItem.imageUrl}
                    alt={currentLightboxItem.title}
                    referrerPolicy="no-referrer"
                    className="max-h-[60vh] md:max-h-[70vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/5 selection:bg-transparent select-none"
                  />

                  {/* Title and metadata info */}
                  <div className="mt-4 text-center text-white max-w-xl px-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-900/40 px-3 py-1 rounded-full border border-blue-500/25">
                      {currentLightboxItem.category}
                    </span>
                    <h4 className="mt-3 font-display font-bold text-lg sm:text-xl text-white">
                      {currentLightboxItem.title}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-slate-300">
                      {currentLightboxItem.description}
                    </p>
                  </div>
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-0 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors cursor-pointer pointer-events-auto z-40 hidden sm:flex items-center justify-center"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Swipe Guide / Mobile Status bar */}
              <div className="absolute bottom-4 text-white/50 text-[10px] sm:text-xs">
                Gallery View ({lightboxIndex + 1} / {galleryItems.length})
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
