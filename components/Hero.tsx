
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[90vh] min-h-[700px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070" 
          alt="Modern Business District" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-slate-900/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-bold tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            NOW PLACING IN 12+ COUNTRIES
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Connecting <span className="text-emerald-400">Global Talent</span> to World-Class Opportunity.
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
            We simplify international recruitment and work permit processing using advanced AI. Whether you're a skilled professional or an enterprise looking for manpower, we bridge the gap.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <a href="#apply" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2">
              Apply for Job
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            </a>
            <a href="#sectors" className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 rounded-xl font-bold transition-all flex items-center justify-center">
              View Sectors
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/10 max-w-xl">
            <div>
              <p className="text-3xl font-bold text-white">5,000+</p>
              <p className="text-slate-400 text-sm">Placements Made</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">98%</p>
              <p className="text-slate-400 text-sm">Visa Success Rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">24hr</p>
              <p className="text-slate-400 text-sm">AI Response Time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
