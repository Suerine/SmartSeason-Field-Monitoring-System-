import React, { useState, useEffect, useMemo } from 'react';
import api, { API_PATHS } from '../utils/apiPaths';
import {
  Users, Activity, AlertTriangle, CheckCircle, Clock,
  Mail, Briefcase, Filter, X, UserPlus
} from 'lucide-react';
import CreateAgentModal from '../components/CreateAgentModal';

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
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
              <Users className="text-green-600 w-8 h-8" /> Agent Management
            </h1>
            <p className="text-sm text-gray-500 mt-1 max-w-lg">Track dynamic field assignments, health workloads, and real-time field activity streams.</p>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-green-700 transition-all shadow-lg shadow-green-100 shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            Add Agent
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* LEFT COLUMN: Overview & Unassigned */}
          <div className="xl:col-span-2 space-y-8">

            {/* Unassigned Quick View Alert */}
            {unassignedFields.length > 0 && (
              <div className="bg-white border-2 border-orange-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-10" />
                <h3 className="text-lg font-extrabold text-gray-900 flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-orange-500" /> Pending Assignments ({unassignedFields.length})
                </h3>
                <div className="bg-orange-50/50 rounded-2xl border border-orange-100 divide-y divide-orange-100/50">
                  {unassignedFields.map(field => (
                    <div key={field._id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <p className="font-bold text-gray-900">{field.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{field.location || "Location not specified"}</p>
                      </div>
                      <div className="shrink-0 flex items-center gap-2">
                        <select
                          onChange={(e) => handleQuickAssign(field._id, e.target.value)}
                          disabled={assigningFieldId === field._id}
                          className="bg-white border border-gray-200 text-sm font-bold text-gray-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[140px]"
                        >
                          <option value="">Assign Agent...</option>
                          {agents.map(ag => (
                            <option key={ag._id} value={ag._id}>{ag.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Agent Grid */}
            <div>
              <h2 className="text-lg font-extrabold text-gray-900 mb-4 px-2">Active Field Personnel</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {agents.map(agent => {
                  // Workload Aggregation specifically for this agent
                  const agentFields = fields.filter(f => f.assignedAgent?._id === agent._id);
                  const totalWorkload = agentFields.length;

                  const activeCount = agentFields.filter(f => f.status?.state === 'Active').length;
                  // Derive health based on pure %
                  let healthScore = 100;
                  if (totalWorkload > 0) {
                    healthScore = Math.round((activeCount / totalWorkload) * 100);
                  }

                  const isFiltered = activeAgentFilter === agent._id;

                  return (
                    <div
                      key={agent._id}
                      onClick={() => setActiveAgentFilter(isFiltered ? null : agent._id)}
                      className={`bg-white rounded-3xl p-6 border-2 transition-all cursor-pointer shadow-sm relative overflow-hidden group ${isFiltered ? 'border-green-500 ring-2 ring-green-100' : 'border-gray-100 hover:border-green-200'}`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg transition-colors ${isFiltered ? 'bg-green-600 text-white' : 'bg-green-50 text-green-600 group-hover:bg-green-100'}`}>
                            {agent.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-extrabold text-gray-900 truncate">{agent.name}</h4>
                            <p className="text-xs text-gray-500 truncate">{agent.email}</p>
                          </div>
                        </div>
                        <a
                          href={`mailto:${agent.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 bg-gray-50 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-gray-50">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Workload</p>
                          <div className="flex items-center gap-1.5 text-gray-900 font-bold">
                            <Briefcase className="w-4 h-4 text-gray-400" />
                            <span>{totalWorkload} Fields</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Health Score</p>
                          <div className="flex items-center gap-1.5">
                            {healthScore >= 80 ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : healthScore >= 50 ? (
                              <Activity className="w-4 h-4 text-orange-400" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-red-500" />
                            )}
                            <span className={`font-bold ${healthScore >= 80 ? 'text-green-700' : healthScore >= 50 ? 'text-orange-600' : 'text-red-600'}`}>
                              {totalWorkload === 0 ? 'N/A' : `${healthScore}%`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Global Feed */}
          <div className="xl:col-span-1">
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
                    onClick={() => setActiveAgentFilter(null)}
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
                    <div key={i} className="relative pl-6 group">
                      {/* Feed Structural Timeline Line */}
                      {i !== visibleUpdates.length - 1 && (
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
                  ))
                )}
              </div>
            </div>
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