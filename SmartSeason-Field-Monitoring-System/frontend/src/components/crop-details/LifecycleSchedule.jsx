import React from 'react';
import { ListTree, Clock } from 'lucide-react';
import LifecycleStage from './LifecycleStage';

const LifecycleSchedule = ({
  growthStages,
  totalLifecycleDays,
  isEditing,
  onUpdateStage
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm relative">
      <div className="flex flex-col sm:flex-row justify-between mb-8 gap-4 border-b border-gray-50 pb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <ListTree className="w-5 h-5 text-green-600" /> Lifecycle Schedule
          </h2>
          <p className="text-xs text-gray-500 mt-1">Expected progression tracks and generic stage bounds.</p>
        </div>
        <div className="bg-gray-50 rounded-xl px-4 py-2 border border-gray-100 flex items-center gap-3">
          <Clock className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Duration</p>
            <p className="text-lg font-bold text-gray-900">
              {totalLifecycleDays} <span className="text-xs font-normal text-gray-500">Days</span>
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {!growthStages || growthStages.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400 italic">No stage data available.</p>
          </div>
        ) : (
          growthStages.map((stage, idx) => (
            <LifecycleStage
              key={idx}
              stage={stage}
              index={idx}
              totalStages={growthStages.length}
              isEditing={isEditing}
              onUpdateStage={onUpdateStage}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default LifecycleSchedule;
