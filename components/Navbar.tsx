
import React, { useState, useEffect } from 'react';

interface Props {
  applicationCount: number;
  onViewChange: (view: 'home' | 'applications') => void;
  currentView: 'home' | 'applications';
}

const Navbar: React.FC<Props> = ({ applicationCount, onViewChange, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled || currentView === 'applications' ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewChange('home')}>
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4a1 1 0 01-.8 1.6H6a3 3 0 01-3-3V6zm3 2a1 1 0 100 2 1 1 0 000-2zm0-4a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
            </svg>
          </div>
          <span className={`text-xl font-bold tracking-tight ${isScrolled || currentView === 'applications' ? 'text-slate-900' : 'text-white'}`}>
            GlobalForce<span className="text-emerald-500">AI</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => onViewChange('home')} className={`font-medium transition-colors ${isScrolled || currentView === 'applications' ? 'text-slate-600 hover:text-emerald-600' : 'text-white/90 hover:text-white'}`}>Sectors</button>
          
          <button 
            onClick={() => onViewChange('applications')} 
            className={`font-medium transition-colors flex items-center gap-2 ${isScrolled || currentView === 'applications' ? 'text-slate-600 hover:text-emerald-600' : 'text-white/90 hover:text-white'}`}
          >
            My Applications
            {applicationCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                {applicationCount}
              </span>
            )}
          </button>

          <a href="#apply" onClick={() => onViewChange('home')} className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
            isScrolled || currentView === 'applications' ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg' : 'bg-white text-slate-900 hover:bg-emerald-50'
          }`}>Start Application</a>
        </div>

        <button className="md:hidden text-slate-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
