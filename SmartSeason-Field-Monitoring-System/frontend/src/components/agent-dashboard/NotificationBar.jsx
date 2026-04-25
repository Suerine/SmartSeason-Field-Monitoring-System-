import React from 'react';
import { AlertCircle, Clock, CheckCircle2, Siren, ChevronRight } from 'lucide-react';

const NotificationBar = ({ fields }) => {
  if (!fields || fields.length === 0) return null;

  const notifications = [];

  fields.forEach(field => {
    // 1. Overdue Stage Logic
    const currentStageInfo = field.cropType?.growthStages?.find(s => s.stageName === field.currentStage);
    if (currentStageInfo && currentStageInfo.durationDays) {
      const lastUpdate = field.updates?.length > 0 
        ? new Date(field.updates[field.updates.length - 1].createdAt)
        : new Date(field.plantingDate);
      
      const daysInStage = Math.floor((Date.now() - lastUpdate) / (1000 * 60 * 60 * 24));
      if (daysInStage > currentStageInfo.durationDays) {
        notifications.push({
          id: `overdue-${field._id}`,
          type: 'warning',
          icon: <Clock className="w-4 h-4 text-amber-600" />,
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          textColor: 'text-amber-900',
          message: `${field.name}: Stage "${field.currentStage}" is overdue (${daysInStage} days).`,
          action: 'Update Status'
        });
      }
    }

    // 2. Ready for Harvest Logic
    if (currentStageInfo?.category === 'Ready') {
      notifications.push({
        id: `ready-${field._id}`,
        type: 'success',
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        textColor: 'text-emerald-900',
        message: `${field.name} is ready for harvesting!`,
        action: 'Log Harvest'
      });
    }

    // 3. Stale Updates (No updates for 3 days)
    const lastLogDate = field.updates?.length > 0 
      ? new Date(field.updates[field.updates.length - 1].createdAt)
      : new Date(field.createdAt);
    const daysSinceLastUpdate = Math.floor((Date.now() - lastLogDate) / (1000 * 60 * 60 * 24));
    
    if (daysSinceLastUpdate >= 3 && currentStageInfo?.category !== 'Harvested') {
      notifications.push({
        id: `stale-${field._id}`,
        type: 'error',
        icon: <AlertCircle className="w-4 h-4 text-rose-600" />,
        bgColor: 'bg-rose-50',
        borderColor: 'border-rose-200',
        textColor: 'text-rose-900',
        message: `No activity logged for ${field.name} in ${daysSinceLastUpdate} days.`,
        action: 'Check Field'
      });
    }
  });

  if (notifications.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Siren className="w-4 h-4 text-gray-400" />
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Priority Focus</h3>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
        {notifications.map((note) => (
          <div 
            key={note.id}
            className={`flex-shrink-0 w-80 ${note.bgColor} border-2 ${note.borderColor} rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group`}
          >
            <div className="flex gap-3 items-start">
              <div className="mt-0.5">{note.icon}</div>
              <p className={`text-sm ${note.textColor} font-bold leading-snug`}>
                {note.message}
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-tighter opacity-60">
                {note.action}
              </span>
              <ChevronRight className="w-3 h-3 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationBar;
