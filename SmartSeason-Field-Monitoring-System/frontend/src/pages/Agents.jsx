import React, { useState, useEffect, useMemo } from 'react';
import api, { API_PATHS } from '../utils/apiPaths';
import CreateAgentModal from '../components/CreateAgentModal';
import AgentsHeader from '../components/agents/AgentsHeader';
import PendingAssignments from '../components/agents/PendingAssignments';
import AgentGrid from '../components/agents/AgentGrid';
import GlobalFeed from '../components/agents/GlobalFeed';

const Agents = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [agents, setAgents] = useState([]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeAgentFilter, setActiveAgentFilter] = useState(null);

  // Unassigned Quick-Assign State
  const [assigningFieldId, setAssigningFieldId] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [agentsRes, fieldsRes] = await Promise.all([
        api.get(API_PATHS.USERS.GET_ALL_AGENTS),
        api.get(API_PATHS.FIELDS.GET_ALL_FIELDS)
      ]);
      setAgents(agentsRes.data);
      setFields(fieldsRes.data);
    } catch (err) {
      setError("Failed to load generic overview data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatRelativeTime = (isoString) => {
    const diffInSeconds = Math.floor((new Date() - new Date(isoString)) / 1000);
    if (diffInSeconds < 60) return `Just now`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hrs ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const handleQuickAssign = async (fieldId, agentId) => {
    if (!agentId) return;
    try {
      setAssigningFieldId(fieldId);
      const { data } = await api.put(`${API_PATHS.FIELDS.GET_ALL_FIELDS}/${fieldId}`, {
        assignedAgent: agentId
      });

      // Update local state by replacing the mutated field
      setFields(prev => prev.map(f => f._id === fieldId ? data : f));
    } catch (err) {
      alert("Failed to bind agent to field.");
    } finally {
      setAssigningFieldId(null);
    }
  };

  // 1. Data Aggregation: Timelines
  const globalUpdates = useMemo(() => {
    let rawUpdates = [];
    fields.forEach(field => {
      if (field.updates && field.updates.length > 0) {
        field.updates.forEach(update => {
          rawUpdates.push({
            ...update,
            fieldId: field._id,
            fieldName: field.name,
            // Try to match agent object cleanly from our agents array if populated
            agentRef: agents.find(a => a._id === update.updatedBy) || { name: 'Unknown' }
          });
        });
      }
    });

    rawUpdates.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return rawUpdates;
  }, [fields, agents]);

  // Handle feed filtering
  const visibleUpdates = useMemo(() => {
    if (!activeAgentFilter) return globalUpdates.slice(0, 15);
    return globalUpdates.filter(u => u.updatedBy === activeAgentFilter).slice(0, 15);
  }, [globalUpdates, activeAgentFilter]);

  // 2. Data Aggregation: Unassigned Array
  const unassignedFields = useMemo(() => {
    return fields.filter(f => !f.assignedAgent);
  }, [fields]);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading Agents</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="max-w-xl mx-auto bg-red-50 border border-red-100 p-6 rounded-2xl text-center">
          <h3 className="text-red-800 font-bold mb-1">Architecture Error</h3>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Top Header */}
        <AgentsHeader onAddAgentClick={() => setIsCreateModalOpen(true)} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* LEFT COLUMN: Overview & Unassigned */}
          <div className="xl:col-span-2 space-y-8">

            {/* Unassigned Quick View Alert */}
            <PendingAssignments
              unassignedFields={unassignedFields}
              agents={agents}
              onQuickAssign={handleQuickAssign}
              assigningFieldId={assigningFieldId}
            />

            {/* Agent Grid */}
            <AgentGrid
              agents={agents}
              fields={fields}
              activeAgentFilter={activeAgentFilter}
              onAgentFilterChange={setActiveAgentFilter}
            />

          </div>

          {/* RIGHT COLUMN: Global Feed */}
          <div className="xl:col-span-1">
            <GlobalFeed
              visibleUpdates={visibleUpdates}
              activeAgentFilter={activeAgentFilter}
              onClearFilter={() => setActiveAgentFilter(null)}
              formatRelativeTime={formatRelativeTime}
            />
          </div>

        </div>
      </div>

      <CreateAgentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchDashboardData}
      />
    </div>
  );
};

export default Agents;