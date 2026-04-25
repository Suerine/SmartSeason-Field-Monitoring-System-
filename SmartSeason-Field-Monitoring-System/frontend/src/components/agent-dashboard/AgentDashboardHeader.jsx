import React from 'react';
import { User, LogOut } from 'lucide-react';

const AgentDashboardHeader = ({ agentName, onLogout }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Daily Tasks</h1>
        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">
          Field Agent Portal
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-full border border-gray-200">
          <User className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-bold text-gray-700">{agentName}</span>
        </div>
        <button
          onClick={onLogout}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AgentDashboardHeader;
