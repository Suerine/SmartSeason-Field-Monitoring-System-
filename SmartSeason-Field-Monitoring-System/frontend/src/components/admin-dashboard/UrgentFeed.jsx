import React from 'react';
import { Link } from 'react-router-dom';
import { Siren, Clock } from 'lucide-react';

/** Returns true if the last update was more than 7 days ago */
const isSilent = (field) => {
  if (!field.updates || field.updates.length === 0) return false;
  const last = new Date(field.updates[field.updates.length - 1].createdAt);
  const days = Math.floor((Date.now() - last) / (1000 * 60 * 60 * 24));
  return days > 7;
};

const UrgentFeed = ({ fields }) => {
  const urgent = fields
    .filter((f) => f.status === 'At Risk')
    .slice(0, 5);

  if (urgent.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-400 text-sm italic">
        No urgent fields — all good!
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {urgent.map((field) => {
        const silent = isSilent(field);
        const agentName = field.assignedAgent?.name || 'Unassigned';
        const agentInitials = agentName
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);

        return (
          <li
            key={field._id}
            className="flex items-start gap-3 p-3 bg-red-50/60 border border-red-100 rounded-xl hover:bg-red-50 transition-colors duration-150"
          >
            {/* Field color dot */}
            <div className="mt-0.5 w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-2" />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{field.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                {/* Agent avatar */}
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[9px] font-bold flex-shrink-0">
                  {agentInitials}
                </span>
                <span className="text-xs text-gray-500 truncate">{agentName}</span>
              </div>
            </div>

            {/* Risk reason badge */}
            <div className="flex-shrink-0">
              {silent ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-amber-100 text-amber-700 px-2 py-1 rounded-full whitespace-nowrap">
                  <Link to={`/fields/${field._id}`} className="flex items-center gap-1">
                    <Siren size={12} /> Agent Silence
                  </Link>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-red-100 text-red-700 px-2 py-1 rounded-full whitespace-nowrap">
                  <Link to={`/fields/${field._id}`} className="flex items-center gap-1">
                    <Clock size={12} /> Overdue Stage
                  </Link>
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default UrgentFeed;
