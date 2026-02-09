
import React from 'react';
import { Destination } from '../types';

interface Props {
  destination: Destination;
}

const DestinationCard: React.FC<Props> = ({ destination }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={destination.imageUrl} 
          alt={destination.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-indigo-600 uppercase tracking-wider shadow-sm">
            {destination.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-lg text-white text-sm font-semibold">
          <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          {destination.rating}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{destination.name}</h3>
            <p className="text-sm text-slate-500 font-medium">{destination.country}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Starts from</p>
            <p className="text-lg font-bold text-indigo-600">${destination.price}</p>
          </div>
        </div>
        
        <p className="text-slate-600 text-sm line-clamp-2 mt-3 leading-relaxed">
          {destination.description}
        </p>

        <button className="w-full mt-6 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default DestinationCard;
