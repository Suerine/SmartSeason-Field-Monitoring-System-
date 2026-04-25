import React from 'react';
import { Target, Zap } from 'lucide-react';

const StageStepper = ({ stages, currentStageName }) => {
  const buckets = ['Planted', 'Growing', 'Ready', 'Harvested'];
  const CATEGORY_COLORS = {
    'Planted': 'from-amber-400 to-amber-600',
    'Growing': 'from-green-400 to-emerald-600',
    'Ready': 'from-orange-400 to-red-600',
    'Harvested': 'from-blue-400 to-indigo-600'
  };

  // Find the current stage object to get its category
  const currentStageObj = stages.find(s => s.stageName === currentStageName);
  const mappedCategory = currentStageObj?.category || 'Planted';

  let activeBucketIdx = buckets.indexOf(mappedCategory);
  if (activeBucketIdx === -1) activeBucketIdx = 0;
  
  const lineFillPct = (activeBucketIdx / 3) * 100;
  const currentCategoryColor = CATEGORY_COLORS[mappedCategory] || CATEGORY_COLORS['Planted'];

  return (
    <div className="relative pt-12 pb-16">
      {/* Background Track */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-white/5 rounded-full" />

      {/* Progress Track */}
      <div
        className={`absolute top-1/2 left-0 -translate-y-1/2 h-1 rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${currentCategoryColor} shadow-[0_0_20px_rgba(34,197,94,0.3)]`}
        style={{ width: `${lineFillPct}%` }}
      />

      <div className="relative flex justify-between">
        {buckets.map((bucket, idx) => {
          const isCurrent = idx === activeBucketIdx;
          const isPassed = idx < activeBucketIdx;
          const bucketColor = CATEGORY_COLORS[bucket];

          return (
            <div key={bucket} className="relative flex flex-col items-center">
              {/* Node */}
              <div
                className={`relative w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 border ${
                  isCurrent
                    ? `bg-green-500 border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.4)] scale-110 z-10`
                    : isPassed
                    ? `bg-white/10 border-green-500/50`
                    : 'bg-white/5 border-white/10'
                }`}
              >
                {isCurrent ? (
                  <Zap className="w-5 h-5 text-white animate-pulse" />
                ) : isPassed ? (
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                )}

                {/* Pulse ring for current node */}
                {isCurrent && (
                  <div className="absolute -inset-1 border border-green-500 rounded-2xl animate-ping opacity-30" />
                )}
              </div>

              {/* Label */}
              <div className="absolute top-14 flex flex-col items-center min-w-max">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                  isCurrent ? 'text-white' : 'text-gray-500'
                }`}>
                  {bucket}
                </span>
                {isCurrent && (
                  <span className="text-[9px] font-bold text-green-500 mt-1 uppercase">
                    {currentStageName}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StageStepper;
