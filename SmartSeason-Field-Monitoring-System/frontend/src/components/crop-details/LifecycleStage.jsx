import React from 'react';
import { Info } from 'lucide-react';

const LifecycleStage = ({ stage, index, totalStages, isEditing, onUpdateStage }) => {
  const isLastStage = index === totalStages - 1;

  const handleUpdate = (field, value) => {
    onUpdateStage(index, field, value);
  };

  return (
    <div className="relative group pl-6">
      {!isLastStage && (
        <div className="absolute left-[11px] top-6 bottom-[-30px] w-0.5 bg-gray-100 group-hover:bg-green-100 transition-colors" />
      )}
      <div
        className={`absolute left-[7px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-200 border-2 border-white ring-2 ring-transparent transition-all z-10 ${
          isEditing ? 'ring-amber-100 bg-amber-400' : 'group-hover:ring-green-50'
        }`}
      />
      <div
        className={`rounded-2xl p-5 border transition-all ml-4 ${
          isEditing ? 'bg-amber-50/10 border-amber-100' : 'bg-gray-50 border-transparent hover:border-green-100 hover:bg-green-50/20 shadow-sm'
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-3">
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 text-lg">{stage.stageName}</h4>
            <span className="inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-green-50 text-green-700">
              {stage.category} Phase
            </span>
          </div>
          <div
            className={`rounded-lg px-3 py-1.5 border shadow-sm flex items-center gap-2 ${
              isEditing ? 'bg-amber-50 border-amber-200' : 'bg-white border-gray-100'
            }`}
          >
            {isEditing ? (
              <>
                <input
                  type="number"
                  min="0"
                  value={stage.durationDays}
                  onChange={(e) => handleUpdate('durationDays', e.target.value)}
                  className="w-16 px-2 py-0.5 text-sm font-bold text-gray-900 rounded focus:ring-2 focus:ring-amber-500"
                />
                <span className="text-xs font-bold text-gray-700">Days</span>
              </>
            ) : (
              <p className="text-xs font-bold text-gray-700">~ {stage.durationDays} Days</p>
            )}
          </div>
        </div>

        {(isEditing || stage.careInstructions) && (
          <div className="mt-4 flex gap-3 text-sm p-4 rounded-xl border bg-white border-gray-100">
            <Info className="w-5 h-5 shrink-0 text-blue-400 mt-0.5" />
            <div className="flex-1">
              <strong className="text-gray-800 block mb-1">Care Protocol:</strong>
              {isEditing ? (
                <textarea
                  value={stage.careInstructions || ''}
                  onChange={(e) => handleUpdate('careInstructions', e.target.value)}
                  className="w-full text-sm bg-gray-50 border border-gray-200 rounded p-2 focus:ring-2 focus:ring-amber-500 resize-y min-h-[60px]"
                />
              ) : (
                <p className="text-gray-600 leading-relaxed">{stage.careInstructions}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LifecycleStage;
