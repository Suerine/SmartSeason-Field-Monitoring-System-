import React from 'react';
import AgentCard from './AgentCard';

const AgentGrid = ({ agents, fields, activeAgentFilter, onAgentFilterChange }) => {
  return (
    <div>
      <h2 className="text-lg font-extrabold text-gray-900 mb-4 px-2">Active Field Personnel</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {agents.map(agent => (
          <AgentCard
            key={agent._id}
            agent={agent}
            fields={fields}
            isFiltered={activeAgentFilter === agent._id}
            onAgentClick={() => {
              const isFiltered = activeAgentFilter === agent._id;
              onAgentFilterChange(isFiltered ? null : agent._id);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AgentGrid;
