import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ChevronRight, HelpCircle, ShieldCheck, HeartPulse, UserCheck, AlertCircle, PhoneCall } from 'lucide-react';

export default function AyushmanAssistance() {
  const [eligibilityStep, setEligibilityStep] = useState(1);
  const [hasCard, setHasCard] = useState<string | null>(null);
  const [hasRation, setHasRation] = useState<string | null>(null);
  const [district, setDistrict] = useState('Basti');
  const [isSubmitCheck, setIsSubmitCheck] = useState(false);

  const resetWizard = () => {
    setEligibilityStep(1);
    setHasCard(null);
    setHasRation(null);
    setDistrict('Basti');
    setIsSubmitCheck(false);
  };

  return (
    <section id="pmjay" className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50/50 border-b border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-orange-100/50">
            Govt. Cashless Treatment Scheme
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Need Assistance with PM-JAY?
          </h2>
          <p className="text-slate-500 mt-3 sm:text-base text-sm leading-relaxed">
            We are here to guide you at every step under Ayushman Bharat (Pradhan Mantri Jan Arogya Yojana)
          </p>
        </div>

        {/* Info Grid - Copy requested by user */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16 text-left">
          
          {/* Main textual resources */}
          <div className="lg:col-span-7 space-y-8 animate-fadeIn">
            
            {/* Context About */}
            <div className="space-y-3">
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900">
                About PM-JAY (Ayushman Bharat Scheme)
              </h3>
              <p className="text-slate-655 text-slate-600 text-sm sm:text-base leading-relaxed">
                Pradhan Mantri Jan Arogya Yojana (PM-JAY), also known as Ayushman Bharat, is a flagship health insurance scheme by the Government of India providing cashless treatment to eligible families for secondary and tertiary care.
              </p>
              <p className="text-slate-655 text-slate-600 text-sm sm:text-base leading-relaxed">
                <strong className="text-slate-900">Navjyoti Multi Speciality Hospital, Basti (Uttar Pradesh)</strong> is an empanelled PM-JAY hospital committed to quality, transparency, and patient-centric healthcare without financial burden.
              </p>
            </div>

            {/* Benefits checks */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-lg text-slate-900">
                PM-JAY Benefits at Navjyoti Multi Speciality Hospital
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Cashless hospitalization for eligible patients',
                  'Health coverage up to ₹5,00,000 per family/year',
                  'Surgeries, diagnostics, medicines & follow-ups included',
                  'Multiple specialties under one roof',
                  'Reduced out-of-pocket medical expenses',
                  'Care as per government healthcare standards',
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-705 text-slate-700 font-medium">
                    <CheckCircle2 size={16} className="text-orange-600 shrink-0 mt-0.5 stroke-[2.5]" id={`benefit-${idx}`} />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How to avail */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="font-display font-bold text-lg text-slate-900">
                How to Avail PM-JAY Treatment
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                  { step: '01', title: 'Visit Desk', desc: 'Visit hospital with your PM-JAY Card or valid ID.' },
                  { step: '02', title: 'Verify ID', desc: 'Our support team verifies your eligibility.' },
                  { step: '03', title: 'Receive Care', desc: 'Receive approved cashless treatment.' },
                  { step: '04', title: 'Recovery', desc: 'Get continuous care from experienced doctors.' },
                ].map((s, idx) => (
                  <div key={idx} className="bg-orange-50/40 border border-orange-100/50 p-4 rounded-2xl relative">
                    <span className="absolute top-2 right-2 text-xs font-bold text-orange-400 font-mono">{s.step}</span>
                    <p className="font-display font-extrabold text-sm text-orange-950 mb-1">{s.title}</p>
                    <p className="text-[11px] text-slate-500 leading-normal">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Why choose Navjyoti */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="font-display font-bold text-lg text-slate-900">
                Why Choose Navjyoti Multi Speciality Hospital for PM-JAY?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  'PM-JAY empanelled hospital',
                  'Experienced specialist doctors',
                  'Advanced diagnostics & treatment facilities',
                  'Transparent & ethical processes',
                  'Convenient location in Basti, Uttar Pradesh',
                ].map((reason, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-orange-600 font-bold">✔</span>
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Interactive Assistance Help Tool Widget on Right */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-900/5 p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-orange-600 text-white font-extrabold text-[9px] uppercase tracking-widest px-3 py-1 rounded-bl-xl">
                Interactive Help Tool
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                  <ShieldCheck size={26} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-slate-900 text-base leading-tight">
                    Ayushman Eligibility Guide
                  </h4>
                  <p className="text-[11px] text-slate-400">Find out if you qualify for cashless operations instantly</p>
                </div>
              </div>

              {!isSubmitCheck ? (
                <div className="space-y-6 text-left">
                  {eligibilityStep === 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Step 1 of 3: Gold Card Status</p>
                      <h5 className="font-bold text-slate-800 text-sm">Do you or your family members hold an active Ayushman PM-JAY Golden Card?</h5>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => {
                            setHasCard('yes');
                            setEligibilityStep(3); // direct route to result for golden card holders
                          }}
                          className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all cursor-pointer ${
                            hasCard === 'yes' ? 'border-orange-500 bg-orange-50 text-orange-900' : 'border-slate-100 hover:border-slate-200 bg-slate-50/50 text-slate-700'
                          }`}
                        >
                          Yes, We have it
                        </button>
                        <button
                          onClick={() => {
                            setHasCard('no');
                            setEligibilityStep(2);
                          }}
                          className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all cursor-pointer ${
                            hasCard === 'no' ? 'border-orange-500 bg-orange-50 text-orange-900' : 'border-slate-100 hover:border-slate-200 bg-slate-50/50 text-slate-700'
                          }`}
                        >
                          No Card / Not sure
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {eligibilityStep === 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Step 2 of 3: Alternate Criteria</p>
                      <h5 className="font-bold text-slate-800 text-sm">Do you hold an Antyodaya Ration Card (Red/Yellow booklet) or belong to the SECC-2011 Rural household list?</h5>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => {
                            setHasRation('yes');
                            setEligibilityStep(3);
                          }}
                          className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all cursor-pointer ${
                            hasRation === 'yes' ? 'border-orange-500 bg-orange-50 text-orange-900' : 'border-slate-100 hover:border-slate-200 bg-slate-50/50 text-slate-700'
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => {
                            setHasRation('no');
                            setEligibilityStep(3);
                          }}
                          className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all cursor-pointer ${
                            hasRation === 'no' ? 'border-orange-500 bg-orange-50 text-orange-900' : 'border-slate-150 hover:border-slate-200 bg-slate-50/50 text-slate-700'
                          }`}
                        >
                          No/Not eligible
                        </button>
                      </div>

                      <button onClick={() => setEligibilityStep(1)} className="text-xs text-orange-600 font-bold underline mt-2 hover:text-orange-700 block cursor-pointer">
                        ← Go back
                      </button>
                    </motion.div>
                  )}

                  {eligibilityStep === 3 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Step 3 of 3: District Locality</p>
                      <h5 className="font-bold text-slate-800 text-sm">Select your Residential District:</h5>
                      
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full p-3 rounded-2xl border border-slate-200 bg-white text-sm focus:border-orange-500 focus:outline-none"
                      >
                        <option value="Basti">Basti (Uttar pradesh)</option>
                        <option value="Sant Kabir Nagar">Sant Kabir Nagar</option>
                        <option value="Siddharthnagar">Siddharthnagar</option>
                        <option value="Gorakhpur">Gorakhpur</option>
                        <option value="Ayodhya">Ayodhya</option>
                        <option value="Other">Other District</option>
                      </select>

                      <div className="flex gap-4 pt-2">
                        <button onClick={() => { if (hasCard === 'yes') { setEligibilityStep(1); } else { setEligibilityStep(2); } }} className="text-xs text-orange-600 font-bold underline hover:text-orange-700 block grow-0 shrink-0 cursor-pointer">
                          ← Go back
                        </button>
                        <button
                          onClick={() => setIsSubmitCheck(true)}
                          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-full text-center text-xs transition-colors cursor-pointer"
                          id="submit-pmjay-check"
                        >
                          Get Instant Guide Roadmap
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-left space-y-5">
                  <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-100 flex items-start gap-3">
                    <HeartPulse className="text-orange-600 shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-bold text-sm text-orange-950">Your Eligibility Roadmap</p>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1 font-medium">
                        {hasCard === 'yes' ? (
                          <span>You are <strong className="text-orange-900">Highly Eligible!</strong> Since you hold an active Golden Card, you qualify for 100% cashless diagnostics, medicines, and surgical procedures at Navjyoti Basti.</span>
                        ) : hasRation === 'yes' ? (
                          <span>You are <strong className="text-orange-900">Eligible under Ration criteria!</strong> Bring your active Red/Yellow Rationing booklet and Aadhaar cards. Our on-desk PM-JAY operator will print out your Golden card inside our hospital!</span>
                        ) : (
                          <span>Standard PM-JAY is based on government-held lists. We advise you to visit our specialized Room 3 on the Ground Floor with your family ID docs so we can run a structural database match.</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Operational instructions */}
                  <div className="space-y-3">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">Required documents to carry:</p>
                    <ul className="text-xs space-y-1.5 text-slate-700 font-medium">
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 size={13} className="text-orange-600 shrink-0" />
                        <span>Aadhaar Card (All family members)</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 size={13} className="text-orange-600 shrink-0" />
                        <span>PM-JAY Gold Card (if already printed)</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 size={13} className="text-orange-600 shrink-0" />
                        <span>Ration card / SECC family letter copy</span>
                      </li>
                    </ul>
                  </div>

                  {/* Immediate Assistance */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                    <p className="text-[11px] text-slate-500 font-semibold">
                      Need direct help? Contact our empanelled desk at Navjyoti Hospital:
                    </p>
                    <a
                      href="tel:+917004710751"
                      className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 px-4 rounded-full flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md shadow-orange-600/10 transition-transform active:scale-[0.98]"
                    >
                      <PhoneCall size={15} />
                      Call PM-JAY Coordinator: +91 70047 10751
                    </a>
                    <button onClick={resetWizard} className="text-xs text-center text-slate-500 hover:text-slate-700 underline block font-semibold mt-1 cursor-pointer">
                      Check eligibility for another family
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Coordinator prompt card */}
              <div className="mt-6 p-4 rounded-2xl border border-slate-100 bg-slate-50 text-left">
                <span className="font-bold text-xs text-slate-900 block mb-0.5">Need Help with Eligibility?</span>
                <p className="text-[11.5px] leading-relaxed text-slate-500">
                  Our specialist PM-JAY support team is always standing ready to guide you at every step inside the hospital reception lobby.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
