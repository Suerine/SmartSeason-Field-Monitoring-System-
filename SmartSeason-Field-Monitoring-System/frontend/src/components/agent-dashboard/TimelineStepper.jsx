import React from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';

const TimelineStepper = ({ stages, currentStageName }) => {
  const currentIndex = stages.findIndex(s => s.stageName === currentStageName);

  return (
    <div className="py-4">
      <div className="relative flex justify-between items-start">
        {/* Connecting Line */}
        <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-100 -z-10" />
        
        {stages.map((stage, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isNext = idx === currentIndex + 1;

          return (
            <div key={stage.stageName} className="flex flex-col items-center flex-1">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center mb-2 z-10
                ${isCompleted ? 'bg-emerald-500 text-white' : 
                  isCurrent ? 'bg-white border-2 border-emerald-500 text-emerald-600' : 
                  'bg-white border-2 border-gray-200 text-gray-300'}
              `}>
                {isCompleted ? <CheckCircle2 size={20} /> : 
                 isCurrent ? <ArrowRight size={18} className="animate-pulse" /> : 
                 <Circle size={16} />}
              </div>
              <span className={`
                text-[10px] font-bold text-center px-1
                ${isCurrent ? 'text-emerald-700' : 'text-gray-400'}
              `}>
                {stage.stageName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineStepper;
