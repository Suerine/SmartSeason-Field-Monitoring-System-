import React from 'react';
import { Lightbulb, CheckCircle } from 'lucide-react';

const TaskBox = ({ careInstructions, currentStage }) => {
  if (!careInstructions) {
    return (
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-black text-gray-900 text-sm">No Instructions</h3>
          <p className="text-xs text-gray-600 mt-1">Care protocol not available for this stage</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-5">
      <div className="flex items-start gap-3 mb-3">
        <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-black text-gray-900 text-sm uppercase tracking-wide">
            Today's Care Task
          </h3>
          <p className="text-xs text-gray-600 font-bold uppercase tracking-widest mt-0.5">
            {currentStage} Phase
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-800 leading-relaxed font-medium">
        {careInstructions}
      </p>
    </div>
  );
};

export default TaskBox;
