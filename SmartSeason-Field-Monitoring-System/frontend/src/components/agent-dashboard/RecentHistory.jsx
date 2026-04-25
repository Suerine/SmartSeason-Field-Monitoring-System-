import React from 'react';
import { Clock } from 'lucide-react';

const RecentHistory = ({ updates }) => {
  if (!updates || updates.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-5 border-2 border-gray-200">
        <h3 className="font-black text-gray-900 text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Recent Activity
        </h3>
        <p className="text-xs text-gray-500 text-center py-4">No activity recorded yet</p>
      </div>
    );
  }

  const recentThree = [...updates].reverse().slice(0, 3);

  return (
    <div className="bg-white rounded-2xl p-5 border-2 border-gray-200">
      <h3 className="font-black text-gray-900 text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
        <Clock className="w-4 h-4" />
        Recent Activity
      </h3>

      <div className="space-y-3">
        {recentThree.map((update, idx) => (
          <div key={idx} className="flex gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-black text-xs">
                ✓
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-gray-600 uppercase tracking-widest">
                {update.stage}
              </p>
              <p className="text-xs text-gray-700 leading-relaxed mt-1">{update.note}</p>
              <p className="text-[10px] text-gray-400 mt-1.5">
                {new Date(update.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentHistory;
