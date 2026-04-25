import React from 'react';
import { Thermometer, Droplets, Droplet } from 'lucide-react';

const OptimalConditionsGrid = ({ optimalConditions, draftCrop, isEditing, onDraftChange }) => {
  const handleConditionChange = (field, value) => {
    onDraftChange({
      ...draftCrop,
      optimalConditions: { ...draftCrop.optimalConditions, [field]: value }
    });
  };

  const conditions = [
    {
      label: 'Temperature',
      key: 'temperature',
      icon: Thermometer,
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-500'
    },
    {
      label: 'Avg Humidity',
      key: 'humidity',
      icon: Droplets,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-500'
    },
    {
      label: 'Soil Designation',
      key: 'soilType',
      icon: Droplet,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600'
    }
  ];

  return (
    <>
      <h2 className="text-lg font-bold text-gray-800 mb-4 px-2 flex items-center gap-2">
        Optimal Environmental Parameters
        {isEditing && (
          <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full uppercase ml-1">
            Editable
          </span>
        )}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {conditions.map(({ label, key, icon: Icon, bgColor, textColor }) => (
          <div key={key} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 ${bgColor} ${textColor} rounded-full flex items-center justify-center shrink-0`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{label}</p>
              {isEditing ? (
                <input
                  type="text"
                  value={draftCrop.optimalConditions?.[key] || ''}
                  onChange={(e) => handleConditionChange(key, e.target.value)}
                  className="mt-1 w-full text-sm font-bold text-gray-900 border-b border-dashed border-gray-300 focus:outline-none"
                />
              ) : (
                <p className="text-base font-bold text-gray-900 truncate">
                  {optimalConditions?.[key] || 'Not Specified'}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OptimalConditionsGrid;
