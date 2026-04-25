import React from 'react';
import { Target } from 'lucide-react';

const StageStepper = ({ stages, currentStageName }) => {
  const buckets = ['Planted', 'Growing', 'Ready', 'Harvested'];
  const STAGE_COLORS = {
    'Planted': { bg: 'bg-amber-400', border: 'border-amber-400' },
    'Growing': { bg: 'bg-green-500', border: 'border-green-500' },
    'Ready': { bg: 'bg-orange-500', border: 'border-orange-500' },
    'Harvested': { bg: 'bg-blue-500', border: 'border-blue-500' }
  };

  // Determine current bucket index based on current stage category
  const currentStageObj = stages.find(s => s.stageName === currentStageName);
  const mappedCategory = currentStageObj?.category || 'Planted';

  let activeBucketIdx = buckets.indexOf(mappedCategory);
  if (activeBucketIdx === -1) activeBucketIdx = 0;
  
  const lineFillPct = (activeBucketIdx / 3) * 100;
  const activeColor = STAGE_COLORS[buckets[activeBucketIdx]] || STAGE_COLORS['Planted'];

  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
      <h3 className="font-black text-gray-900 text-sm uppercase tracking-wide mb-6 flex items-center gap-2">
        <Target className="w-4 h-4 text-gray-400" /> Growth Timeline
      </h3>

      <div className="relative mt-8 mb-10 mx-4">
        {/* Background Track */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-2 bg-gray-100 rounded-full" />

        {/* Progress Fill */}
        <div
          className={`absolute top-1/2 left-0 -translate-y-1/2 h-2 rounded-full transition-all duration-700 ease-out ${activeColor.bg}`}
          style={{ width: `${lineFillPct}%` }}
        />

        {/* Nodes */}
        {buckets.map((bucket, idx) => {
          const leftPct = (idx / 3) * 100;
          const isCurrent = idx === activeBucketIdx;
          const isPassed = idx <= activeBucketIdx;
          const nodeColor = STAGE_COLORS[bucket];

          return (
            <div
              key={bucket}
              className="absolute top-1/2 -translate-y-1/2 -ml-4 w-8 h-8 flex items-center justify-center cursor-pointer group"
              style={{ left: `${leftPct}%` }}
            >
              <div
                className={`w-5 h-5 rounded-full border-[3px] transition-colors duration-500 ${
                  isPassed
                    ? `${nodeColor.border} bg-white shadow-md`
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                {isCurrent && (
                  <div className={`w-2 h-2 m-[3px] rounded-full animate-pulse ${nodeColor.bg}`} />
                )}
              </div>
              
              <div className="absolute top-10 flex flex-col items-center min-w-max">
                <span className={`text-[10px] font-black uppercase tracking-widest ${isCurrent ? 'text-gray-900' : 'text-gray-400'}`}>
                  {bucket}
                </span>
                {isCurrent && (
                  <span className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">
                    {currentStageName}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Spacer to prevent overlap with elements below */}
      <div className="h-4"></div>
    </div>
  );
};

export default StageStepper;
