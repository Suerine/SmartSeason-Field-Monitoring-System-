import React from 'react';
import { AlertCircle, Clock, CheckCircle2, ChevronRight, Siren } from 'lucide-react';

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
          icon: <Clock className="w-4 h-4 text-amber-400" />,
          message: `${field.name}: Stage "${field.currentStage}" is overdue (${daysInStage} days).`,
          action: 'Update Stage'
        });
      }
    }

    // 2. Ready for Harvest Logic
    if (currentStageInfo?.category === 'Ready') {
      notifications.push({
        id: `ready-${field._id}`,
        type: 'success',
        icon: <CheckCircle2 className="w-4 h-4 text-green-400" />,
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
        icon: <AlertCircle className="w-4 h-4 text-red-400" />,
        message: `No activity logged for ${field.name} in ${daysSinceLastUpdate} days.`,
        action: 'Check Field'
      });
    }
  });

  if (notifications.length === 0) return null;

  return (
    <div className="mb-8 overflow-hidden">
      <div className="flex items-center gap-3 mb-3">
        <Siren className="w-5 h-5 text-green-400 animate-pulse" />
        <h3 className="text-sm font-black text-green-400 uppercase tracking-widest">Priority Tasks</h3>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {notifications.map((note) => (
          <div 
            key={note.id}
            className="flex-shrink-0 w-80 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/10 transition-all cursor-pointer group"
          >
            <div className="flex gap-3 items-start">
              <div className="mt-1">{note.icon}</div>
              <p className="text-sm text-gray-200 font-medium leading-relaxed">
                {note.message}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[10px] font-black text-green-500 uppercase tracking-tighter">
                {note.action}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-green-400 transform group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationBar;
