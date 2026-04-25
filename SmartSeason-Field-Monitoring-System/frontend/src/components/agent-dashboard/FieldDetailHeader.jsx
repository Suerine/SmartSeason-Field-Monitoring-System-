import React from 'react';
import { ChevronLeft, Leaf, MapPin, User } from 'lucide-react';

const FieldDetailHeader = ({ field, onBack }) => {
  return (
    <div className="bg-white border-b-2 border-gray-200 px-6 py-5 sticky top-0 z-10">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-green-600 font-black text-sm uppercase tracking-wider mb-4 hover:text-green-700 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        Back
      </button>

      <h2 className="text-3xl font-black text-gray-900 mb-3">{field.name}</h2>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-gray-700 font-bold">
          <Leaf className="w-4 h-4 text-amber-500 flex-shrink-0" />
          <span className="truncate">{field.cropType?.name || 'Unknown'}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 font-bold">
          <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
          <span className="truncate">{field.location || 'Farm Area'}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 font-bold">
          <User className="w-4 h-4 text-purple-500 flex-shrink-0" />
          <span className="truncate">Assigned to You</span>
        </div>
        <div className={`inline-block px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider border ${
          field.status === 'Active'
            ? 'bg-green-50 border-green-300 text-green-700'
            : 'bg-gray-50 border-gray-300 text-gray-700'
        }`}>
          {field.status}
        </div>
      </div>
    </div>
  );
};

export default FieldDetailHeader;
