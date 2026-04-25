import React from 'react';
import { Leaf, MapPin } from 'lucide-react';

const FieldsList = ({ fields, selectedFieldId, onSelectField }) => {
  if (!fields || fields.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 font-medium">No fields assigned yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-6">
      {fields.map((field) => (
        <FieldCard
          key={field._id}
          field={field}
          isSelected={selectedFieldId === field._id}
          onSelect={onSelectField}
        />
      ))}
    </div>
  );
};

const FieldCard = ({ field, isSelected, onSelect }) => {
  const stageColors = {
    Planted: { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-700' },
    Growing: { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-700' },
    Ready: { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-700' },
    Harvested: { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-700' }
  };

  const getUrgencyClass = () => {
    if (field.stageOverdue) return 'border-l-4 border-l-red-600 bg-red-50';
    if (field.stageAlert) return 'border-l-4 border-l-yellow-500 bg-yellow-50';
    return 'border-l-4 border-l-green-500';
  };

  const stageColor = stageColors[field.mappedCategory] || stageColors.Growing;

  return (
    <button
      onClick={() => onSelect(field)}
      className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
        isSelected ? 'border-green-600 ring-2 ring-green-200 bg-green-50 shadow-md' : `${getUrgencyClass()} border-gray-200`
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-black text-lg text-gray-900 truncate">{field.name}</h3>
          <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-1">
            <Leaf className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate font-medium">{field.cropType?.name || 'Unknown'}</span>
          </div>
        </div>

        {/* Urgency Icon */}
        {field.stageOverdue && (
          <div className="flex-shrink-0 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-black">
            !
          </div>
        )}
        {field.stageAlert && !field.stageOverdue && (
          <div className="flex-shrink-0 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-black">
            ⏱
          </div>
        )}
      </div>

      {/* Current Stage Badge */}
      <div className={`inline-block px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider border ${stageColor.bg} ${stageColor.border} ${stageColor.text}`}>
        {field.currentStage}
      </div>

      {/* Urgency Message */}
      {field.stageOverdue && (
        <p className="text-xs font-bold text-red-700 mt-3 flex items-center gap-1">
          ⚠️ Immediate Update Required
        </p>
      )}
      {field.stageAlert && !field.stageOverdue && (
        <p className="text-xs font-bold text-yellow-700 mt-3 flex items-center gap-1">
          ⏱️ Transition Soon
        </p>
      )}
    </button>
  );
};

export default FieldsList;
