import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Facebook, Instagram } from 'lucide-react';
import { addInquiry } from '../utils/database';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to local storage database
    addInquiry({
      id: `inq_${Date.now()}`,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
      });
      setIsSubmitted(false);
    }, 5000);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 border-t border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-blue-650 font-extrabold text-blue-600 block mb-2.5">
            Contact Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            We are here to help you
          </h2>
          <p className="text-slate-500 mt-3 sm:text-base text-sm leading-relaxed font-semibold">
            Get in touch with our hospital administrators or send a direct inquiry to get quick information.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Contact Details */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 mb-6 border-b border-slate-200 pb-3">
                Contact Details
              </h3>
            </div>

            {/* Address */}
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/50">
                <MapPin size={22} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Address
                </h4>
                <p className="text-slate-700 text-sm sm:text-base font-semibold leading-relaxed">
                  Bansi Road, near Hardiya Chowraha, Basti, Uttar Pradesh 272001
                </p>
                <a 
                  href="https://www.google.com/maps?sca_esv=cbcb3eaaead68c4b&sxsrf=APpeQnvihzv7Nk54t_LS0GLlulud9jFZvg:1781921164924&biw=1600&bih=773&uact=5&gs_lp=Egxnd3Mtd2l6LXNlcnAiF25hdmp5b3RpIGhvc3BpdGFsIGJhc3RpMgsQLhiABBjHARivATIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHjILEAAYgAQYigUYhgMyCxAAGIAEGIoFGIYDMgsQABiABBiKBRiGAzIaEC4YgAQYxwEYrwEYlwUY3AQY3gQY4ATYAQFIqw9QpARY7AxwAXgBkAEBmAHMA6AB5wmqAQkwLjQuMS4wLjG4AQPIAQD4AQGYAgWgAtoGwgIQEC4YgAQYFBiHAhjHARivAcICEBAuGIAEGIoFGEMYxwEYrwHCAgUQABiABMICCBAAGIAEGMkDwgIFEAAY7wWYAwCIBgG6BgYIARABGBSSBwUwLjQuMaAHtVOyBwUwLjQuMbgH2gbCBwUyLTMuMsgHMYAIAQ&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KQFPOtI7xZA5MeKqHGoYqRXw&daddr=Bansi+Road,+near+Hardiya+Chowraha,+Basti,+Uttar+Pradesh+272001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-[#1e66f5] hover:text-[#154fc4] hover:underline"
                  id="contact-navigate-map-link"
                >
                  <MapPin size={13} />
                  <span>Navigate with Google Maps ↗</span>
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/50">
                <Mail size={22} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Email ID
                </h4>
                <a 
                  href="mailto:healthca@gmail.com" 
                  className="text-blue-600 hover:underline hover:text-blue-700 text-sm sm:text-base font-semibold block transition-colors"
                >
                  healthca@gmail.com
                </a>
              </div>
            </div>

            {/* Mobile */}
            <div className="flex gap-4 items-start pb-6 border-b border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/50">
                <Phone size={22} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Mobile No
                </h4>
                <a 
                  href="tel:+917004710751" 
                  className="text-slate-900 font-extrabold text-sm sm:text-base tracking-wider hover:underline hover:text-blue-600 block transition-colors"
                >
                  +91 70047 10751
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Follow Us Online
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/share/1AvpWuLhxJ/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-white hover:bg-blue-600 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-600/15 transition-all duration-300"
                  aria-label="Facebook"
                  id="contact-facebook-btn"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/navjyoti_multispeciality_basti?igsh=dXA2Z2xyd3Vncmt6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-white hover:bg-pink-600 hover:border-pink-500 hover:shadow-lg hover:shadow-pink-600/15 transition-all duration-300"
                  aria-label="Instagram"
                  id="contact-instagram-btn"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Block: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/85 shadow-md text-left">
              <h3 className="font-display font-extrabold text-slate-900 text-lg sm:text-xl mb-6">
                Inquiry Form
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="w-full text-sm p-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none text-slate-800 bg-white"
                    id="contact-name-input"
                  />
                </div>

                {/* Mobile No */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase block">
                    Mobile No
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    className="w-full text-sm p-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none text-slate-800 bg-white"
                    id="contact-phone-input"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase block">
                    Email ID
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="w-full text-sm p-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none text-slate-800 bg-white"
                    id="contact-email-input"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase block">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    className="w-full text-sm p-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none text-slate-800 bg-white"
                    id="contact-message-input"
                  />
                </div>

                {/* Submission status banner */}
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0 }}
                      className="p-4 bg-emerald-50 border border-emerald-150 text-emerald-800 text-xs sm:text-sm rounded-xl font-bold flex items-center gap-2"
                    >
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                      Thank you! Your inquiry has been submitted successfully. We will get back to you shortly.
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-full text-center text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-600/15 disabled:bg-blue-300 disabled:cursor-not-allowed"
                  id="submit-contact-btn"
                >
                  <Send size={14} />
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Interactive Hospital Map Embed */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4"
          id="hospital-embedded-map"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
            <div>
              <h4 className="font-display font-bold text-slate-900 text-base flex items-center gap-2">
                <MapPin className="text-[#1e66f5]" size={18} />
                <span>Interactive Hospital Location Map</span>
              </h4>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                Visit Navjyoti Multispeciality Hospital at Bansi Road, near Hardiya Chowraha, Basti.
              </p>
            </div>
            <a 
              href="https://www.google.com/maps?sca_esv=cbcb3eaaead68c4b&sxsrf=APpeQnvihzv7Nk54t_LS0GLlulud9jFZvg:1781921164924&biw=1600&bih=773&uact=5&gs_lp=Egxnd3Mtd2l6LXNlcnAiF25hdmp5b3RpIGhvc3BpdGFsIGJhc3RpMgsQLhiABBjHARivATIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHjILEAAYgAQYigUYhgMyCxAAGIAEGIoFGIYDMgsQABiABBiKBRiGAzIaEC4YgAQYxwEYrwEYlwUY3AQY3gQY4ATYAQFIqw9QpARY7AxwAXgBkAEBmAHMA6AB5wmqAQkwLjQuMS4wLjG4AQPIAQD4AQGYAgWgAtoGwgIQEC4YgAQYFBiHAhjHARivAcICEBAuGIAEGIoFGEMYxwEYrwHCAgUQABiABMICCBAAGIAEGMkDwgIFEAAY7wWYAwCIBgG6BgYIARABGBSSBwUwLjQuMaAHtVOyBwUwLjQuMbgH2gbCBwUyLTMuMsgHMYAIAQ&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KQFPOtI7xZA5MeKqHGoYqRXw&daddr=Bansi+Road,+near+Hardiya+Chowraha,+Basti,+Uttar+Pradesh+272001"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#1e66f5] hover:bg-[#154fc4] text-white text-xs font-bold px-5 py-2.5 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-100"
            >
              <span>Open in Google Maps ↗</span>
            </a>
          </div>

          <div className="w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border border-slate-150 relative bg-slate-50 shadow-inner">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.385419992389!2d82.68412613145459!3d26.800615967912232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39912beff2ee991d%3A0xe7261a86a603ac0c!2sNavjyoti%20Hospital%20Basti!5e0!3m2!1sen!2sin!4v1781803671791!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Navjyoti Multispeciality Hospital Map Location"
              className="grayscale-[5%] opacity-95 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
