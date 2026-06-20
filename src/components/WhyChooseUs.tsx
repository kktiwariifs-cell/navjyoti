import React from 'react';
import { motion } from 'motion/react';
import { WHY_CHOOSE_US } from '../data';
import { Users, Truck, Receipt, Cpu, Zap, Heart } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Users: Users,
  Truck: Truck,
  Receipt: Receipt,
  Cpu: Cpu,
  Zap: Zap,
  Heart: Heart,
};

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header summary */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full inline-block mb-3">
            The Navjyoti Standard
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Why Our Families Choose Us?
          </h2>
          <p className="text-slate-500 mt-3 sm:text-base text-sm leading-relaxed">
            We are dedicated to building a healthcare facility where patients receive advanced medical diagnostics as well as respect, empathy, and transparent pricing.
          </p>
        </div>

        {/* Bento grid layout / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((item, index) => {
            const IconComp = iconMap[item.iconName] || Heart;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-50/60 hover:bg-white border border-slate-100 hover:border-blue-200 p-6 sm:p-8 rounded-3xl text-left shadow-sm hover:shadow-xl hover:shadow-blue-200/20 transition-all duration-300 group flex flex-col justify-between"
                id={`why-card-${item.id}`}
              >
                <div>
                  {/* Icon with beautiful circles background */}
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-blue-900 group-hover:text-white transition-all duration-300 shadow-sm">
                    <IconComp size={22} />
                  </div>
                  
                  {/* Title and body text */}
                  <h3 className="font-display font-extrabold text-lg text-slate-900 mb-2 truncate">
                    {item.title}
                  </h3>
                  <p className="text-slate-505 text-slate-500 text-xs sm:text-sm leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
                
                {/* Visual micro check */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-blue-600 font-bold uppercase tracking-wider">
                  <span>Guaranteed Patient Care</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-600">✓</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
