
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4a1 1 0 01-.8 1.6H6a3 3 0 01-3-3V6zm3 2a1 1 0 100 2 1 1 0 000-2zm0-4a1 1 0 100 2 1 1 0 000-2z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-900">
                GlobalForce<span className="text-emerald-600 font-medium tracking-tighter">AI</span>
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed text-sm">
              Empowering global mobility through intelligent recruitment and automated immigration processing. We turn borders into opportunities.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-widest">Job Seekers</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#roadmap" className="text-slate-500 hover:text-emerald-600 transition-colors">Permit Checker</a></li>
              <li><a href="#sectors" className="text-slate-500 hover:text-emerald-600 transition-colors">Open Sectors</a></li>
              <li><a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors">CV Optimization</a></li>
              <li><a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors">Global Salary Guide</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-widest">Employers</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors">Talent Sourcing</a></li>
              <li><a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors">Manpower Solutions</a></li>
              <li><a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors">Compliance Services</a></li>
              <li><a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors">Corporate Relocation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-widest">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors">Contact Support</a></li>
              <li><a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors">Licensing & Legal</a></li>
              <li><a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-10 text-center text-xs text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} GlobalForce Recruitment AI. Certified International Manpower Agency.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
