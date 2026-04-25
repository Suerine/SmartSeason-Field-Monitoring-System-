import { Link } from 'react-router-dom';
import { Leaf, MapPin, User, Sprout, Target, AlertTriangle, Clock } from 'lucide-react';
import FieldStageTimeline from '../fields/FieldStageTimeline';

const getStatusColor = (status) => {
  switch (status) {
    case 'Active': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'At Risk': return 'bg-red-100 text-red-700 border-red-200';
    case 'Completed': return 'bg-slate-100 text-slate-700 border-slate-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getStripColor = (field) => {
  if (field.stageOverdue) return 'bg-red-500';
  if (field.stageAlert) return 'bg-yellow-400';
  return 'bg-emerald-500';
};

const FieldCard = ({ field }) => (
  <Link
    to={`/fields/${field._id}`}
    className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-emerald-100 transition-all duration-200 relative overflow-hidden group flex flex-col md:flex-row items-center gap-6 block cursor-pointer"
  >
    {/* Left color strip */}
    <div className={`absolute top-0 left-0 h-full w-1.5 ${getStripColor(field)} opacity-90`} />

    {/* Section 1: Name + status badge */}
    <div className="w-full md:w-1/4 flex flex-col items-start pl-2 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-4">
      <h3 className="font-bold text-gray-900 text-lg truncate w-full group-hover:text-emerald-700 transition-colors">
        {field.name}
      </h3>
      <span className={`mt-2 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold border ${getStatusColor(field.status)} whitespace-nowrap`}>
        {field.status}
      </span>
    </div>

    {/* Section 2: Stage + timeline */}
    <div className="w-full md:w-2/4 bg-gray-50/80 rounded-xl p-4 border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
        <div>
          <div className="flex items-center gap-1.5">
            <Target className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-bold text-emerald-900">{field.currentStage}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Sprout className="w-3.5 h-3.5 text-emerald-500/70" />
            <p className="text-[10px] font-bold text-emerald-700/80 uppercase tracking-wider">
              {field.mappedCategory} Phase
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold flex items-center gap-1 sm:justify-end">
          {field.stageOverdue ? (
            <span className="text-red-500 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> OVERDUE
            </span>
          ) : field.stageAlert ? (
            <span className="text-yellow-500 flex items-center gap-1">
              <Clock className="w-3 h-3" /> APPROACHING
            </span>
          ) : (
            <span className="text-gray-400">ON TRACK</span>
          )}
        </span>
      </div>

      <FieldStageTimeline
        mappedCategory={field.mappedCategory}
        currentStage={field.currentStage}
        stageOverdue={field.stageOverdue}
        stageAlert={field.stageAlert}
      />
    </div>

    {/* Section 3: Metadata */}
    <div className="w-full md:w-1/4 flex flex-col justify-center gap-2.5 pt-2 md:pt-0 pl-2">
      {[
        { icon: <Leaf className="w-3.5 h-3.5 text-amber-600" />, bg: 'bg-amber-50 border-amber-100', label: field.cropType?.name || 'Unknown Crop' },
        { icon: <MapPin className="w-3.5 h-3.5 text-blue-600" />, bg: 'bg-blue-50 border-blue-100', label: field.displayLocation },
        { icon: <User className="w-3.5 h-3.5 text-purple-600" />, bg: 'bg-purple-50 border-purple-100', label: field.assignedAgent?.name || 'Unassigned' },
      ].map(({ icon, bg, label }) => (
        <div key={label} className="flex items-center gap-3 text-sm text-gray-600">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center border flex-shrink-0 ${bg}`}>
            {icon}
          </div>
          <span className="truncate font-medium text-gray-900">{label}</span>
        </div>
      ))}
    </div>
  </Link>
);

export default FieldCard;