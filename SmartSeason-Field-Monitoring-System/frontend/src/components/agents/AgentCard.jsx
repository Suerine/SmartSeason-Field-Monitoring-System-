import React from 'react';
import { CheckCircle, Activity, AlertTriangle, Mail, Briefcase } from 'lucide-react';

const AgentCard = ({ agent, fields, isFiltered, onAgentClick }) => {
  // Workload Aggregation specifically for this agent
  const agentFields = fields.filter(f => f.assignedAgent?._id === agent._id);
  const totalWorkload = agentFields.length;

  const activeCount = agentFields.filter(f => f.status?.state === 'Active').length;
  // Derive health based on pure %
  let healthScore = 100;
  if (totalWorkload > 0) {
    healthScore = Math.round((activeCount / totalWorkload) * 100);
  }

  return (
    <div
      onClick={() => onAgentClick(agent._id)}
      className={`bg-white rounded-3xl p-6 border-2 transition-all cursor-pointer shadow-sm relative overflow-hidden group ${
        isFiltered ? 'border-green-500 ring-2 ring-green-100' : 'border-gray-100 hover:border-green-200'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg transition-colors ${
              isFiltered ? 'bg-green-600 text-white' : 'bg-green-50 text-green-600 group-hover:bg-green-100'
            }`}
          >
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
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">
            Workload
          </p>
          <div className="flex items-center gap-1.5 text-gray-900 font-bold">
            <Briefcase className="w-4 h-4 text-gray-400" />
            <span>{totalWorkload} Fields</span>
          </div>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">
            Health Score
          </p>
          <div className="flex items-center gap-1.5">
            {healthScore >= 80 ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : healthScore >= 50 ? (
              <Activity className="w-4 h-4 text-orange-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-500" />
            )}
            <span
              className={`font-bold ${
                healthScore >= 80 ? 'text-green-700' : healthScore >= 50 ? 'text-orange-600' : 'text-red-600'
              }`}
            >
              {totalWorkload === 0 ? 'N/A' : `${healthScore}%`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
