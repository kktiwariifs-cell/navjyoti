/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import SpecialtiesSection from './components/SpecialtiesSection';
import FacilitiesSection from './components/FacilitiesSection';
import WhyChooseUs from './components/WhyChooseUs';
import AyushmanAssistance from './components/AyushmanAssistance';
import DoctorsSection from './components/DoctorsSection';
import NewsSection from './components/NewsSection';
import FeedbackSection from './components/FeedbackSection';
import ContactSection from './components/ContactSection';
import GallerySection from './components/GallerySection';
import TpaSection from './components/TpaSection';
import AnnouncementPopup from './components/AnnouncementPopup';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';
import AdminPanel from './components/AdminPanel';
import SecurityShield from './components/SecurityShield';

export default function App() {
  // Navigation active control
  const [activeSection, setActiveSection] = useState('home');


  // Booking states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState('');
  const [selectedDepartmentForBooking, setSelectedDepartmentForBooking] = useState('');

  // Handle section scrolling and element highlights
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    
    if (['news', 'services', 'facilities', 'contact', 'pmjay'].includes(sectionId)) {
      window.scrollTo(0, 0);
    } else {
      // Allow DOM to render standard home section elements before calculating their scroll position.
      // We implement a robust polling mechanism to ensure the element is found after mount.
      let attempts = 0;
      const tryScroll = () => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else if (attempts < 10) {
          attempts++;
          setTimeout(tryScroll, 40);
        }
      };
      tryScroll();
    }
  };

  // Setup dynamic scroll listener to update navbar state
  useEffect(() => {
    const handleScroll = () => {
      if (['news', 'services', 'facilities', 'contact', 'pmjay'].includes(activeSection)) return;
      const sections = ['home', 'about', 'specialists', 'feedback'];
      const scrollPos = window.scrollY + 120; // offset

      for (const sect of sections) {
        const el = document.getElementById(sect);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            if (sect === 'feedback') {
              setActiveSection('home');
            } else {
              setActiveSection(sect);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // CTA helpers
  const handleOpenBooking = (doctorName?: string, departmentName?: string) => {
    setSelectedDoctorForBooking(doctorName || '');
    setSelectedDepartmentForBooking(departmentName || '');
    setIsBookingOpen(true);
  };

  if (activeSection === 'admin') {
    return (
      <>
        <SecurityShield />
        <AdminPanel onLogout={() => handleNavigate('home')} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between antialiased">
      <SecurityShield />
      {/* Sticky header navigation */}
      <Navbar
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        activeSection={activeSection}
      />

      {/* Main layout contents */}
      <main className="grow">
        {activeSection === 'news' ? (
          <div className="bg-slate-50 min-h-[60vh] pb-8">
            {/* Breadcrumbs navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
              <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 bg-white px-4 py-2.5 rounded-2xl border border-slate-100 w-fit">
                <button onClick={() => handleNavigate('home')} className="hover:text-blue-600 transition-colors cursor-pointer">
                  Home
                </button>
                <span>/</span>
                <span className="text-blue-600 font-bold">News & Events</span>
              </nav>
            </div>
            
            {/* News component */}
            <NewsSection />
          </div>
        ) : activeSection === 'services' ? (
          <div className="bg-slate-50 min-h-[60vh] pb-8">
            {/* Breadcrumbs navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
              <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 bg-white px-4 py-2.5 rounded-2xl border border-slate-100 w-fit">
                <button onClick={() => handleNavigate('home')} className="hover:text-blue-600 transition-colors cursor-pointer">
                  Home
                </button>
                <span>/</span>
                <span className="text-blue-600 font-bold">Specialized Hospital Departments</span>
              </nav>
            </div>
            
            {/* Specialty medical departments */}
            <SpecialtiesSection onOpenBooking={(dept) => handleOpenBooking('', dept)} />
          </div>
        ) : activeSection === 'facilities' ? (
          <div className="bg-slate-50 min-h-[60vh] pb-8">
            {/* Breadcrumbs navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
              <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 bg-white px-4 py-2.5 rounded-2xl border border-slate-100 w-fit">
                <button onClick={() => handleNavigate('home')} className="hover:text-blue-600 transition-colors cursor-pointer">
                  Home
                </button>
                <span>/</span>
                <span className="text-blue-600 font-bold">Our Hospital Facilities</span>
              </nav>
            </div>
            
            {/* State-of-the-art diagnostic, clinical, and ward setups */}
            <FacilitiesSection />
            <TpaSection />
          </div>
        ) : activeSection === 'contact' ? (
          <div className="bg-slate-50 min-h-[60vh] pb-8">
            {/* Breadcrumbs navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
              <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 bg-white px-4 py-2.5 rounded-2xl border border-slate-100 w-fit">
                <button onClick={() => handleNavigate('home')} className="hover:text-blue-600 transition-colors cursor-pointer">
                  Home
                </button>
                <span>/</span>
                <span className="text-blue-600 font-bold">Contact Us</span>
              </nav>
            </div>
            
            {/* Contact details and inquiry form */}
            <ContactSection />
          </div>
        ) : activeSection === 'pmjay' ? (
          <div className="bg-slate-50 min-h-[60vh] pb-8">
            {/* Breadcrumbs navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
              <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 bg-white px-4 py-2.5 rounded-2xl border border-slate-100 w-fit">
                <button onClick={() => handleNavigate('home')} className="hover:text-blue-600 transition-colors cursor-pointer">
                  Home
                </button>
                <span>/</span>
                <span className="text-blue-600 font-bold">PM-JAY Cashless Care Assistance</span>
              </nav>
            </div>
            
            {/* Prime Ayushman diagnostic and eligibility check wizard */}
            <AyushmanAssistance />
          </div>
        ) : activeSection === 'gallery' ? (
          <div className="bg-slate-50 min-h-[60vh] pb-8">
            {/* Breadcrumbs navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
              <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 bg-white px-4 py-2.5 rounded-2xl border border-slate-100 w-fit">
                <button onClick={() => handleNavigate('home')} className="hover:text-blue-600 transition-colors cursor-pointer">
                  Home
                </button>
                <span>/</span>
                <span className="text-blue-600 font-bold text-sm">Media Gallery & Video Walkthroughs</span>
              </nav>
            </div>
            
            {/* Gallery Section */}
            <GallerySection />
          </div>
        ) : (
          <>
            {/* Banner */}
            <Hero
              onOpenBooking={() => handleOpenBooking()}
              onNavigate={handleNavigate}
            />

            {/* Hospital stats, heritage, and director message */}
            <AboutSection />

            {/* Dynamic Navjyoti standard & highlights */}
            <WhyChooseUs />

            {/* Prime Ayushman diagnostic and eligibility check wizard */}
            <AyushmanAssistance />

            {/* Clinicians focus deck */}
            <DoctorsSection onOpenBooking={(doctor) => handleOpenBooking(doctor)} />

            {/* Comments slider and newsletter registry */}
            <FeedbackSection />
          </>
        )}
      </main>

      {/* Professional clinical foot */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Shared stateful scheduling model overlay */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedDoctor={selectedDoctorForBooking}
        preselectedDepartment={selectedDepartmentForBooking}
      />

      {/* Announcement notice popup */}
      <AnnouncementPopup />
    </div>
  );
}

