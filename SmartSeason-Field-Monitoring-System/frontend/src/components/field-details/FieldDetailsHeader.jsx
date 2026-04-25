import React from 'react';
import { Leaf, MapPin, User } from 'lucide-react';

const FieldDetailsHeader = ({ field }) => {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row justify-between md:items-center gap-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-extrabold text-gray-900">{field.name}</h1>
          <span
            className={`px-3 py-1 bg-opacity-10 rounded-full text-xs font-bold uppercase tracking-wider ${
              field.status === 'Active'
                ? 'bg-green-500 text-green-700'
                : field.status === 'At Risk'
                ? 'bg-red-500 text-red-700'
                : 'bg-slate-500 text-slate-700'
            }`}
          >
            {field.status}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <Leaf className="w-4 h-4 text-amber-500" /> {field.cropType?.name}
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-blue-500" /> {field.location || 'Farm Area'}
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-purple-500" /> Agent: {field.assignedAgent?.name || 'Unassigned'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldDetailsHeader;
