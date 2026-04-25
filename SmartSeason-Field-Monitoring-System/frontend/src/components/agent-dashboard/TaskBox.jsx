import React from 'react';
import { ClipboardList, Sparkles } from 'lucide-react';

const TaskBox = ({ careInstructions, currentStage }) => {
  return (
    <div className="relative group overflow-hidden">
      <div className="absolute inset-0 bg-green-500/5 transition-colors group-hover:bg-green-500/10"></div>
      
      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Field Protocol</h3>
              <p className="text-[10px] font-bold text-green-500 uppercase tracking-tighter">Current: {currentStage}</p>
            </div>
          </div>
          <Sparkles className="w-4 h-4 text-green-500/40" />
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
            <p className="text-sm text-gray-300 leading-relaxed italic">
              {careInstructions || "No specific care instructions provided for this stage. Maintain standard monitoring protocols."}
            </p>
          </div>

          <div className="flex items-center gap-2 px-1">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-green-950 bg-green-900/50 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-50"></div>
                </div>
              ))}
            </div>
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Active Monitoring</span>
          </div>
        </div>

        {/* Technical Grid Overlay Decoration */}
        <div className="absolute bottom-2 right-2 opacity-[0.03] pointer-events-none">
          <svg width="60" height="60" viewBox="0 0 60 60">
            <path d="M0 10 H60 M0 20 H60 M0 30 H60 M0 40 H60 M0 50 H60" stroke="white" strokeWidth="1" />
            <path d="M10 0 V60 M20 0 V60 M30 0 V60 M40 0 V60 M50 0 V60" stroke="white" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TaskBox;
