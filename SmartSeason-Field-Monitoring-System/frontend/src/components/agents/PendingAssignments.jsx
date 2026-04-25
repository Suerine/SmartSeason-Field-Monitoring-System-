import React from 'react';
import { AlertTriangle } from 'lucide-react';

const PendingAssignments = ({ unassignedFields, agents, onQuickAssign, assigningFieldId }) => {
  if (unassignedFields.length === 0) return null;

  return (
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
                onChange={(e) => onQuickAssign(field._id, e.target.value)}
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
  );
};

export default PendingAssignments;
