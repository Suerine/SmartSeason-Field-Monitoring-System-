import React from 'react';
import { Activity, Filter, X } from 'lucide-react';
import FeedItem from './FeedItem';

const GlobalFeed = ({ visibleUpdates, activeAgentFilter, onClearFilter, formatRelativeTime }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col h-[800px] sticky top-8">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-white rounded-t-3xl z-10 shrink-0">
        <div>
          <h3 className="font-extrabold text-gray-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" /> Global Feed
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">Top 15 most recent logs</p>
        </div>
        {activeAgentFilter && (
          <button
            onClick={onClearFilter}
            className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider bg-green-50 text-green-600 px-2 py-1 rounded-full hover:bg-green-100 transition-colors"
          >
            <Filter className="w-3 h-3" /> Filtered <X className="w-3 h-3 ml-0.5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {visibleUpdates.length === 0 ? (
          <div className="text-center py-10">
            <Activity className="w-8 h-8 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No recent activity detected.</p>
          </div>
        ) : (
          visibleUpdates.map((update, i) => (
            <FeedItem
              key={i}
              update={update}
              isLast={i === visibleUpdates.length - 1}
              formatRelativeTime={formatRelativeTime}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GlobalFeed;
