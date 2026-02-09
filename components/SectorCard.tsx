
import React from 'react';
import { Sector } from '../types.ts';

interface Props {
  sector: Sector;
}

const SectorCard: React.FC<Props> = ({ sector }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-emerald-500/50 shadow-sm hover:shadow-xl transition-all duration-500">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={sector.imageUrl} 
          alt={sector.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">{sector.category}</p>
              <h3 className="text-xl font-bold text-white">{sector.name}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {sector.regions.map(region => (
            <span key={region} className="px-2 py-1 bg-slate-100 rounded-md text-[10px] font-bold text-slate-500 uppercase">
              {region}
            </span>
          ))}
        </div>
        
        <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed mb-6">
          {sector.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Avg. Salary</p>
            <p className="text-sm font-bold text-slate-900">{sector.averageSalary}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Placement</p>
            <p className="text-sm font-bold text-emerald-600">{sector.placementRate}%</p>
          </div>
        </div>

        <button className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-emerald-600 transition-colors">
          Explore Jobs
        </button>
      </div>
    </div>
  );
};

export default SectorCard;
