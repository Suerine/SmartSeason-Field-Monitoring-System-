import React from 'react';
import { Leaf, ChevronRight, AlertCircle, Clock } from 'lucide-react';

const AgentFieldCard = ({ field, onClick }) => {
  const { stageAlert, stageOverdue } = field.stageInfo || {};
  
  // Define border and icon based on urgency
  let borderColor = 'border-gray-200';
  let urgencyIcon = null;
  let urgencyText = null;

  if (stageOverdue) {
    borderColor = 'border-red-500 border-2';
    urgencyIcon = <AlertCircle className="w-5 h-5 text-red-500" />;
    urgencyText = 'Immediate Update Required';
  } else if (stageAlert) {
    borderColor = 'border-yellow-500 border-2';
    urgencyIcon = <Clock className="w-5 h-5 text-yellow-500" />;
    urgencyText = 'Transition Soon';
  }

  return (
    <button
      onClick={() => onClick(field)}
      className={`w-full text-left bg-white ${borderColor} rounded-2xl p-5 mb-4 shadow-sm active:scale-[0.98] transition-all flex items-center justify-between group`}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-xl font-bold text-gray-900">{field.name}</h3>
          {urgencyIcon}
        </div>
        
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <Leaf className="w-4 h-4 text-emerald-600" />
          <span className="font-medium">{field.cropType?.name || 'Unknown Crop'}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            {field.currentStage}
          </span>
          {urgencyText && (
            <span className={`text-[10px] font-black uppercase tracking-widest ${stageOverdue ? 'text-red-600' : 'text-yellow-600'}`}>
              {urgencyText}
            </span>
          )}
        </div>
      </div>

      <div className="bg-gray-50 p-2 rounded-full group-active:bg-emerald-50">
        <ChevronRight className="w-6 h-6 text-gray-400 group-active:text-emerald-500" />
      </div>
    </button>
  );
};

export default AgentFieldCard;
