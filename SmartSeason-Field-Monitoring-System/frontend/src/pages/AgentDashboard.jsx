import React from 'react';
import { useAuth } from '../context/AuthContext';
import AgentDashboardContainer from '../components/agent-dashboard/AgentDashboardContainer';

const AgentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-green-950 text-white selection:bg-green-500/30">
      {/* Background Atmosphere Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]"></div>
      </div>

      <div className="relative z-10 py-8 px-6 max-w-7xl mx-auto">
        {/* Page header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-black text-green-500 uppercase tracking-[0.3em]">Field Operations</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">
              Agent Dashboard
            </h1>
            <p className="text-green-400/60 text-sm font-medium mt-1">
              Welcome back, <span className="text-green-400 font-bold uppercase tracking-wider">{user?.name}</span>
            </p>
          </div>

          <div className="hidden md:block text-right">
            <span className="text-[10px] font-black text-green-500/40 uppercase tracking-widest block mb-1">Status</span>
            <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-black text-green-500 uppercase">
              Connected • Shamba_OS v2.4
            </div>
          </div>
        </div>

        <AgentDashboardContainer />
      </div>
    </div>
  );
};

export default AgentDashboard;