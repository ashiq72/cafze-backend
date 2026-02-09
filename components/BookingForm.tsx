
import React, { useState } from 'react';
import { JobApplication } from '../types.ts';

interface Props {
  onApply: (app: Omit<JobApplication, 'id' | 'status' | 'date'>) => void;
}

const BookingForm: React.FC<Props> = ({ onApply }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    expertise: 'Construction & Civil',
    experience: 5,
    location: '',
    countryPreference: 'United Kingdom'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({
      fullName: '',
      email: '',
      expertise: 'Construction & Civil',
      experience: 5,
      location: '',
      countryPreference: 'United Kingdom'
    });
  };

  return (
    <section id="apply" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="bg-slate-900 rounded-[40px] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full"></div>
        
        <div className="lg:w-1/2 text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Apply for <br />International Placement.</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-md leading-relaxed">
            Ready to take the next step? Submit your details for our specialized Construction and Agriculture opportunities.
          </p>

          <div className="space-y-6">
            {[
              { label: 'Direct Placement', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745V17a2 2 0 002 2h14a2 2 0 002-2v-3.745z' },
              { label: 'Visa Sponsorship', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' }
            ].map(item => (
              <div key={item.label} className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center transition-colors group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                  </svg>
                </div>
                <span className="font-bold text-slate-200">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/2 w-full bg-white p-8 md:p-10 rounded-3xl shadow-2xl relative z-10">
          {isSubmitted ? (
            <div className="py-20 text-center animate-fade-enter-active">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Application Received!</h3>
              <p className="text-slate-500 mt-2">Track your status in the 'My Applications' dashboard.</p>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    placeholder="John Carter" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Primary Expertise</label>
                <select 
                  value={formData.expertise}
                  onChange={(e) => setFormData({...formData, expertise: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all cursor-pointer"
                >
                  <option>Construction & Civil</option>
                  <option>Agriculture & Farming</option>
                  <option>Other / Not Listed</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Experience (Years)</label>
                  <input 
                    type="number" 
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: Number(e.target.value)})}
                    placeholder="5" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Desired Country</label>
                  <select 
                    value={formData.countryPreference}
                    onChange={(e) => setFormData({...formData, countryPreference: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  >
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Germany</option>
                    <option>Dubai (UAE)</option>
                    <option>Australia</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Current Location</label>
                <input 
                  required
                  type="text" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="City, Country" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" 
                />
              </div>

              <button type="submit" className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg transform active:scale-[0.98]">
                Submit Application
              </button>
              <p className="text-[10px] text-center text-slate-400 font-medium">By submitting, you agree to our privacy policy regarding professional data processing.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
