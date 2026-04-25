import React from 'react';
import { useAuth } from '../context/AuthContext';
import AgentDashboardContainer from '../components/agent-dashboard/AgentDashboardContainer';

const AgentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="py-8 px-6 min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Agent Dashboard
        </h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Welcome back, <span className="font-semibold text-gray-600">{user?.name}</span> — manage your fields and log updates.
        </p>
      </div>

      <AgentDashboardContainer />
    </div>
  );
};

export default AgentDashboard;