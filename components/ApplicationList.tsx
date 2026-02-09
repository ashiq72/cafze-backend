
import React from 'react';
import { JobApplication, ApplicationStatus } from '../types';

interface Props {
  applications: JobApplication[];
  onBack: () => void;
}

const StatusBadge: React.FC<{ status: ApplicationStatus }> = ({ status }) => {
  const styles: Record<ApplicationStatus, string> = {
    'Pending': 'bg-amber-100 text-amber-700 border-amber-200',
    'Under Review': 'bg-blue-100 text-blue-700 border-blue-200',
    'Interview': 'bg-purple-100 text-purple-700 border-purple-200',
    'Visa Processing': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    'Accepted': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Rejected': 'bg-rose-100 text-rose-700 border-rose-200'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status]}`}>
      {status}
    </span>
  );
};

const ApplicationList: React.FC<Props> = ({ applications, onBack }) => {
  return (
    <section className="py-32 px-6 max-w-5xl mx-auto min-h-screen">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Application Tracker</h2>
          <p className="text-slate-500 mt-2">Manage your global career journey and visa progress.</p>
        </div>
        <button 
          onClick={onBack}
          className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Back to Careers
        </button>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-[32px] p-20 text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900">No Applications Yet</h3>
          <p className="text-slate-500 mt-2 mb-8 max-w-sm mx-auto">Start your journey today by applying to one of our high-demand sectors.</p>
          <button 
            onClick={onBack}
            className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg"
          >
            Explore Jobs
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {applications.map((app) => (
            <div key={app.id} className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 hover:shadow-xl transition-all group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745V17a2 2 0 002 2h14a2 2 0 002-2v-3.745z"/></svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-xl font-bold text-slate-900">{app.expertise}</h4>
                      <StatusBadge status={app.status} />
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        {app.countryPreference}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        Applied on {app.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        Ref: #{app.id}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 md:flex-none px-6 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                    View Details
                  </button>
                  <button className="flex-1 md:flex-none px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-emerald-600 transition-colors">
                    Upload Docs
                  </button>
                </div>
              </div>
              
              {/* Progress Bar Mock */}
              <div className="mt-8 pt-8 border-t border-slate-100">
                 <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                    <span>Submission</span>
                    <span>Review</span>
                    <span>Interview</span>
                    <span>Visa</span>
                    <span>Ready</span>
                 </div>
                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-1000" 
                      style={{ width: app.status === 'Pending' ? '20%' : app.status === 'Under Review' ? '40%' : app.status === 'Interview' ? '60%' : '85%' }}
                    ></div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ApplicationList;
