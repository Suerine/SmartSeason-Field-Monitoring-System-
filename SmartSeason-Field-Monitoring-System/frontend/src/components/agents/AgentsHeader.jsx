import React from 'react';
import { Users, UserPlus } from 'lucide-react';

const AgentsHeader = ({ onAddAgentClick }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
          <Users className="text-green-600 w-8 h-8" /> Agent Management
        </h1>
        <p className="text-sm text-gray-500 mt-1 max-w-lg">
          Track dynamic field assignments, health workloads, and real-time field activity streams.
        </p>
      </div>

      <button
        onClick={onAddAgentClick}
        className="flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-green-700 transition-all shadow-lg shadow-green-100 shrink-0"
      >
        <UserPlus className="w-4 h-4" />
        Add Agent
      </button>
    </div>
  );
};

export default AgentsHeader;
