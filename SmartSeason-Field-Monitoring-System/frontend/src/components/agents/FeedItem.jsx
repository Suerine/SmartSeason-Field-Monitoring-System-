import React from 'react';
import { Clock, Activity } from 'lucide-react';

const FeedItem = ({ update, isLast, formatRelativeTime }) => {
  return (
    <div className="relative pl-6 group">
      {/* Feed Structural Timeline Line */}
      {!isLast && (
        <div className="absolute left-[9px] top-6 bottom-[-30px] w-0.5 bg-gray-100 group-hover:bg-green-100 transition-colors" />
      )}
      {/* Feed Dot */}
      <div className="absolute left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-green-200 border-2 border-white ring-2 ring-transparent group-hover:ring-green-50 transition-all z-10" />

      <div className="bg-gray-50 rounded-2xl p-4 border border-transparent hover:border-green-100 hover:bg-green-50/30 transition-colors">
        <div className="flex justify-between items-start mb-2 gap-2">
          <div className="min-w-0">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-green-600 truncate block">
              {update.agentRef.name}
            </span>
            <p className="font-bold text-gray-900 text-sm truncate">
              {update.fieldName}
            </p>
          </div>
          <div className="shrink-0 text-[10px] font-bold text-gray-400 bg-white px-2 py-0.5 rounded shadow-sm border border-gray-100">
            {formatRelativeTime(update.createdAt)}
          </div>
        </div>

        <div className="mt-2 inline-flex items-center text-[10px] font-bold bg-white border border-gray-100 rounded px-2 py-0.5 text-gray-500">
          <Clock className="w-3 h-3 mr-1" /> To: {update.stage}
        </div>

        {update.note && (
          <p className="text-sm text-gray-600 mt-3 leading-relaxed border-l-2 border-green-200 pl-3">
            "{update.note}"
          </p>
        )}
      </div>
    </div>
  );
};

export default FeedItem;
