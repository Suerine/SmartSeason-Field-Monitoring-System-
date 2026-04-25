import React from 'react';
import { AlertTriangle, Clock, MapPin, Leaf } from 'lucide-react';

const FieldCard = ({ field, isSelected, onSelect }) => {
  const stageColor = {
    Planted: 'bg-amber-50 border-amber-300 text-amber-700',
    Growing: 'bg-green-50 border-green-300 text-green-700',
    Ready: 'bg-orange-50 border-orange-300 text-orange-700',
    Harvested: 'bg-blue-50 border-blue-300 text-blue-700'
  };

  const urgencyColor = {
    overdue: 'border-l-4 border-l-red-500 bg-red-50/50',
    alert: 'border-l-4 border-l-yellow-500 bg-yellow-50/50',
    normal: 'border-l-4 border-l-green-500 bg-white'
  };

  const getUrgencyStatus = () => {
    if (field.stageOverdue) return 'overdue';
    if (field.stageAlert) return 'alert';
    return 'normal';
  };

  const urgency = getUrgencyStatus();

  return (
    <button
      onClick={() => onSelect(field)}
      className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
        isSelected ? 'border-green-500 ring-2 ring-green-100 bg-green-50' : urgencyColor[urgency]
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-black text-lg text-gray-900 truncate">{field.name}</h3>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
            <Leaf className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{field.cropType?.name || 'Unknown Crop'}</span>
          </div>
        </div>

        {/* Urgency Icon */}
        {urgency === 'overdue' && (
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
        )}
        {urgency === 'alert' && (
          <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0" />
        )}
      </div>

      {/* Current Stage Badge */}
      <div
        className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border ${
          stageColor[field.mappedCategory] || stageColor.Growing
        }`}
      >
        {field.currentStage}
      </div>

      {/* Urgency Message */}
      {urgency === 'overdue' && (
        <p className="text-xs font-bold text-red-700 mt-3">
          ⚠️ Immediate Update Required
        </p>
      )}
      {urgency === 'alert' && (
        <p className="text-xs font-bold text-yellow-700 mt-3">
          ⏱️ Transition Soon
        </p>
      )}
    </button>
  );
};

export default FieldCard;
