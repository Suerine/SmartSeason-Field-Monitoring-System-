import React from 'react';
import { Clock, MessageSquare, ChevronDown } from 'lucide-react';

const RecentHistory = ({ updates }) => {
  if (!updates || updates.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-12 text-center h-full flex flex-col items-center justify-center">
        <Clock className="w-8 h-8 text-white/20 mb-3" />
        <p className="text-gray-500 text-xs font-black uppercase tracking-widest">No Log History</p>
      </div>
    );
  }

  // Show latest 5 updates
  const latestUpdates = [...updates].reverse().slice(0, 5);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <h3 className="text-sm font-black text-white uppercase tracking-widest">Update Stream</h3>
        </div>
        <span className="text-[10px] font-black text-green-500/40 uppercase tracking-widest">Live Audit</span>
      </div>

      <div className="space-y-6 relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/10"></div>

        {latestUpdates.map((update, idx) => (
          <div key={idx} className="relative pl-12 group">
            {/* Timeline node */}
            <div className={`absolute left-0 top-1.5 w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center transition-all group-hover:border-green-500/50 ${
              idx === 0 ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)] border-green-400' : 'bg-white/5'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-green-950' : 'bg-gray-500'}`} />
            </div>

            <div className="bg-white/5 border border-white/5 rounded-2xl p-4 transition-all group-hover:bg-white/[0.08] group-hover:border-white/10">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className={`text-[10px] font-black uppercase tracking-widest ${idx === 0 ? 'text-green-500' : 'text-gray-400'}`}>
                  {update.stage}
                </span>
                <span className="text-[9px] font-bold text-gray-500 uppercase">
                  {new Date(update.createdAt).toLocaleDateString()}
                </span>
              </div>

              {update.note && (
                <div className="flex gap-2 items-start mt-2">
                  <MessageSquare className="w-3 h-3 text-gray-600 mt-1 flex-shrink-0" />
                  <p className="text-xs text-gray-400 italic leading-relaxed">
                    "{update.note}"
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}

        {updates.length > 5 && (
          <div className="pt-4 text-center">
            <button className="text-[9px] font-black text-green-500/50 uppercase tracking-[0.2em] hover:text-green-500 transition-colors flex items-center justify-center gap-1 mx-auto">
              View Full History <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentHistory;
