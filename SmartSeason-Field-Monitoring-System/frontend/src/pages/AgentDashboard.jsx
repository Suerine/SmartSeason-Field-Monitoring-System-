import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AgentDashboardContainer from '../components/agent-dashboard/AgentDashboardContainer';
import AgentCropsList from '../components/agent-dashboard/AgentCropsList';
import { Briefcase, Leaf } from 'lucide-react';

const AgentDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('fields');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 md:py-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                Field Agent Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-1.5">
                Welcome, <span className="font-bold text-gray-700">{user?.name}</span> — manage your fields and view crop information.
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-6 border-b-2 border-gray-100">
            <button
              onClick={() => setActiveTab('fields')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${
                activeTab === 'fields'
                  ? 'text-green-700 border-green-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Your Fields
            </button>
            <button
              onClick={() => setActiveTab('crops')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${
                activeTab === 'crops'
                  ? 'text-green-700 border-green-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              <Leaf className="w-4 h-4" />
              Crop Library
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-10">
        {activeTab === 'fields' && <AgentDashboardContainer />}
        {activeTab === 'crops' && <AgentCropsList />}
      </div>
    </div>
  );
};

export default AgentDashboard;