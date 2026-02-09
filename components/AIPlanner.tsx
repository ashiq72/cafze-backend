
import React, { useState } from 'react';
import { generateWorkPermitRoadmap } from '../services/geminiService';
import { CareerRoadmap } from '../types';

const CareerAI: React.FC = () => {
  const [role, setRole] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [roadmap, setRoadmap] = useState<CareerRoadmap | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const countries = ['United Kingdom', 'Canada', 'Germany', 'Dubai (UAE)', 'Australia', 'Japan', 'United States'];

  const handleGenerate = async () => {
    if (!role) {
      setError('Please enter your professional role');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const result = await generateWorkPermitRoadmap(role, country);
      setRoadmap(result);
    } catch (err) {
      setError('Failed to generate roadmap. Please verify your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="roadmap" className="py-24 bg-white border-y border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div>
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-bold uppercase tracking-widest mb-4">AI Permit Assistant</span>
              <h2 className="text-4xl font-bold text-slate-900 leading-tight">
                Get Your Personalized <br />
                <span className="text-emerald-600 italic">Visa Roadmap</span> in Seconds.
              </h2>
              <p className="text-slate-500 mt-6 text-lg max-w-md">
                Enter your role and target country. Our AI will analyze current immigration policies to build your step-by-step relocation guide.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Professional Role</label>
                <input 
                  type="text" 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Registered Nurse, Civil Engineer, Web Developer..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Target Country</label>
                <select 
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {countries.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={loading}
                className="w-full py-4 bg-slate-900 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing Policies...</span>
                  </div>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                    Generate Roadmap
                  </>
                )}
              </button>
              {error && <p className="text-red-500 text-sm font-medium mt-2">{error}</p>}
            </div>
          </div>

          <div className="min-h-[500px]">
            {roadmap ? (
              <div className="bg-white border border-slate-200 rounded-3xl shadow-xl p-8 animate-fade-enter-active">
                <div className="flex justify-between items-start mb-8 pb-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{roadmap.role}</h3>
                    <p className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mt-1">{roadmap.country} Work Permit</p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  </div>
                </div>

                <div className="space-y-8">
                  {roadmap.roadmap.map((step, idx) => (
                    <div key={idx} className="relative pl-10">
                      <div className="absolute left-0 top-1 w-7 h-7 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-600">
                        {step.step}
                      </div>
                      {idx !== roadmap.roadmap.length - 1 && <div className="absolute left-[13px] top-8 w-[2px] h-[calc(100%+32px)] bg-slate-100"></div>}
                      
                      <div className="mb-2 flex justify-between items-center">
                        <h4 className="font-bold text-slate-900">{step.title}</h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-50 px-2 py-0.5 rounded border border-slate-100">{step.estimatedTimeline}</span>
                      </div>
                      <p className="text-slate-500 text-sm mb-3 leading-relaxed">{step.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {step.requirements.map((req, rIdx) => (
                          <span key={rIdx} className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                            ✓ {req}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-5 bg-slate-900 rounded-2xl text-slate-300 text-sm leading-relaxed">
                  <div className="flex gap-3 mb-2">
                    <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span className="text-white font-bold">Expert Counsel:</span>
                  </div>
                  {roadmap.generalAdvice}
                </div>
              </div>
            ) : (
              <div className="h-full border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center bg-slate-50">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 border border-slate-100">
                  <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-400 mb-2">Build Your Global Career</h3>
                <p className="text-slate-500 max-w-xs">Fill in your professional details to see your customized work permit requirements.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerAI;
