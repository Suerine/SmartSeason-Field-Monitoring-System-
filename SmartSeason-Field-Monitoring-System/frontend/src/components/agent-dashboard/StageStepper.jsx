import React from 'react';
import { CheckCircle } from 'lucide-react';

const StageStepper = ({ stages, currentStageName }) => {
  const currentIdx = stages.findIndex(s => s.stageName === currentStageName);

  return (
    <div className="bg-white rounded-2xl p-5 border-2 border-gray-200">
      <h3 className="font-black text-gray-900 text-sm uppercase tracking-wide mb-4">
        Growth Timeline
      </h3>

      <div className="space-y-3">
        {stages.map((stage, idx) => {
          const isCompleted = idx < currentIdx;
          const isCurrent = idx === currentIdx;
          const isUpcoming = idx > currentIdx;

          return (
            <div key={idx} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-black text-xs flex-shrink-0 ${
                    isCompleted
                      ? 'bg-green-500 border-green-500 text-white'
                      : isCurrent
                      ? 'bg-green-100 border-green-500 text-green-700 ring-2 ring-green-200'
                      : 'bg-gray-100 border-gray-300 text-gray-400'
                  }`}
                >
                  {isCompleted ? '✓' : idx + 1}
                </div>
                {idx !== stages.length - 1 && (
                  <div
                    className={`w-0.5 h-8 my-1 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>

              <div className="pt-1 flex-1">
                <p className={`text-sm font-black ${isCompleted ? 'text-green-700' : isCurrent ? 'text-green-700' : 'text-gray-500'}`}>
                  {stage.stageName}
                </p>
                <p className={`text-xs ${isCompleted ? 'text-green-600' : isCurrent ? 'text-gray-600' : 'text-gray-400'}`}>
                  {stage.durationDays}d
                  {isCompleted && ' ✓ Completed'}
                  {isCurrent && ' (Now)'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StageStepper;
