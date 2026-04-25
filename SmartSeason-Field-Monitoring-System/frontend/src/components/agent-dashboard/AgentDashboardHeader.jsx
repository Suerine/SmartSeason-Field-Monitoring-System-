import React from 'react';
import { LogOut } from 'lucide-react';

const AgentDashboardHeader = ({ agentName, onLogout }) => {
  return (
    <div className="bg-white border-b-2 border-gray-200 px-6 py-4 sticky top-0 z-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            Welcome, {agentName || 'Agent'}
          </h1>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">
            Daily Field Tasks
          </p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border-2 border-red-300 text-red-600 font-black text-xs uppercase tracking-wider rounded-lg hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AgentDashboardHeader;
