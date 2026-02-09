
import React, { useState } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import SectorCard from './components/SectorCard.tsx';
import CareerAI from './components/AIPlanner.tsx';
import BookingForm from './components/BookingForm.tsx';
import Footer from './components/Footer.tsx';
import ApplicationList from './components/ApplicationList.tsx';
import { Sector, Testimonial, JobApplication } from './types.ts';

const SECTORS: Sector[] = [
  {
    id: 's2',
    name: 'Construction & Civil',
    regions: ['Dubai', 'Qatar', 'Saudi Arabia'],
    description: 'Mega-projects looking for site engineers, architects, and skilled specialized labor in the Middle East and beyond.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    placementRate: 92,
    averageSalary: '$40k - $120k',
    category: 'Technical'
  },
  {
    id: 's5',
    name: 'Agriculture & Farming',
    regions: ['Australia', 'Italy', 'Spain'],
    description: 'Modern agricultural roles ranging from farm management to seasonal harvest operations with streamlined permits.',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
    placementRate: 94,
    averageSalary: '$35k - $55k',
    category: 'General'
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: 'Elena Petrova',
    avatar: 'https://i.pravatar.cc/150?u=elena',
    position: 'Project Coordinator, Dubai',
    content: 'GlobalForce handled everything from my document verification to the final visa interview. I am now working on major infrastructure projects.'
  },
  {
    id: 't2',
    author: 'Marcus J.',
    avatar: 'https://i.pravatar.cc/150?u=marcus',
    position: 'Agri-Specialist, Australia',
    content: 'The AI Roadmap was spot on. It predicted my visa processing time almost to the day. Highly recommended for skilled agricultural workers.'
  }
];

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [view, setView] = useState<'home' | 'applications'>('home');
  const [applications, setApplications] = useState<JobApplication[]>([]);

  const handleApply = (appData: Omit<JobApplication, 'id' | 'status' | 'date'>) => {
    const newApp: JobApplication = {
      ...appData,
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      status: 'Pending',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setApplications([newApp, ...applications]);
  };

  const categories = ['All', 'Technical', 'General'];
  const filteredSectors = activeCategory === 'All' 
    ? SECTORS 
    : SECTORS.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar 
        applicationCount={applications.length} 
        onViewChange={setView} 
        currentView={view} 
      />
      
      <main className="transition-opacity duration-300">
        {view === 'home' ? (
          <>
            <Hero />

            <section id="sectors" className="py-24 px-6 max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                  <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-2 block">Our Specialized Focus</span>
                  <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Placement Sectors</h2>
                  <p className="text-slate-500 max-w-lg">We focus exclusively on high-demand roles in Construction and Agriculture to provide the highest visa success rates.</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                        activeCategory === cat 
                          ? 'bg-slate-900 text-white shadow-lg' 
                          : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto gap-8">
                {filteredSectors.map(sector => (
                  <SectorCard key={sector.id} sector={sector} />
                ))}
              </div>
            </section>

            <CareerAI />

            <section className="py-24 bg-slate-100/50">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
                  <p className="text-slate-500">Hear from professionals who have successfully relocated in these sectors.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {TESTIMONIALS.map(t => (
                    <div key={t.id} className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
                      <p className="text-slate-700 text-lg italic mb-8">"{t.content}"</p>
                      <div className="flex items-center gap-4">
                        <img src={t.avatar} alt={t.author} className="w-14 h-14 rounded-2xl border-2 border-emerald-50 object-cover" />
                        <div>
                          <h4 className="font-bold text-slate-900">{t.author}</h4>
                          <p className="text-emerald-600 text-sm font-semibold">{t.position}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <BookingForm onApply={handleApply} />
          </>
        ) : (
          <ApplicationList 
            applications={applications} 
            onBack={() => setView('home')} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
