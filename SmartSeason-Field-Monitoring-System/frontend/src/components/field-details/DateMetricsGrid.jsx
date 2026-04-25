import React from 'react';
import { CalendarDays, Target, Clock } from 'lucide-react';

const DateMetricsGrid = ({
  plantingDate,
  expectedHarvestDate,
  globalDaysLeft,
  isFinishedGlobally
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4">
        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
          <CalendarDays className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Date Started</p>
          <p className="text-lg font-bold text-gray-900">{plantingDate.toLocaleDateString()}</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
          <Target className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Est. Completion</p>
          <p className="text-lg font-bold text-gray-900">{expectedHarvestDate.toLocaleDateString()}</p>
        </div>
      </div>

      <div
        className={`p-5 rounded-2xl border flex items-center gap-4 ${
          isFinishedGlobally ? 'bg-slate-50 border-slate-200' : 'bg-white border-gray-100'
        }`}
      >
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-full ${
            isFinishedGlobally ? 'bg-slate-200 text-slate-600' : 'bg-orange-50 text-orange-500'
          }`}
        >
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Global Days Left</p>
          <p className="text-lg font-bold text-gray-900">
            {isFinishedGlobally ? 'COMPLETED' : `${globalDaysLeft} Days`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DateMetricsGrid;
