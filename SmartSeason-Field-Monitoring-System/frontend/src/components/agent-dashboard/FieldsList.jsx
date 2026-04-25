import React from 'react';
import { ChevronRight, MapPin } from 'lucide-react';

const FieldsList = ({ fields, selectedFieldId, onSelectField }) => {
  if (fields.length === 0) {
    return (
      <div className="p-12 text-center">
        <p className="text-gray-500 text-xs font-black uppercase tracking-widest">No Fields Assigned</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-white/5">
      {fields.map((field) => {
        const isSelected = selectedFieldId === field._id;
        const currentStageInfo = field.cropType?.growthStages?.find(s => s.stageName === field.currentStage);
        
        return (
          <div
            key={field._id}
            onClick={() => onSelectField(field)}
            className={`group relative p-6 cursor-pointer transition-all duration-300 ${
              isSelected 
                ? 'bg-green-500/10' 
                : 'hover:bg-white/[0.02]'
            }`}
          >
            {/* Selection indicator */}
            {isSelected && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
            )}

            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                    isSelected ? 'bg-green-500 text-white border-green-500' : 'bg-white/5 text-gray-400 border-white/10'
                  }`}>
                    {field.cropType?.name || 'CROP'}
                  </span>
                  {field.currentStage && (
                    <span className="text-[9px] font-bold text-green-500/60 uppercase tracking-tighter">
                      {field.currentStage}
                    </span>
                  )}
                </div>
                
                <h4 className={`text-lg font-black tracking-tight truncate transition-colors ${
                  isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'
                }`}>
                  {field.name}
                </h4>

                <div className="flex items-center gap-2 mt-1 opacity-60">
                  <MapPin className="w-3 h-3 text-gray-500" />
                  <span className="text-[10px] font-medium text-gray-500 truncate uppercase tracking-tighter">
                    {field.location || 'Location Pending'}
                  </span>
                </div>
              </div>

              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                isSelected ? 'bg-green-500 text-white scale-110 shadow-lg' : 'bg-white/5 text-gray-600 group-hover:text-gray-300'
              }`}>
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>

            {/* Micro Progress Bar */}
            <div className="mt-4 w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ease-out ${
                  isSelected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-green-500/30'
                }`}
                style={{ width: `${(fields.indexOf(field) + 1) * 20}%` }} // Mock progress for list
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FieldsList;
