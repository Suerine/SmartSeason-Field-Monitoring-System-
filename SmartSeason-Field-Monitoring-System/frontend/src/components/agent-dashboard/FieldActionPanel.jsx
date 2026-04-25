import React, { useState } from 'react';
import { X, ClipboardList, History, MessageSquare, Plus } from 'lucide-react';
import TimelineStepper from './TimelineStepper';
import UpdateStageForm from './UpdateStageForm';

const FieldActionPanel = ({ field, onClose, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);

  if (!field) return null;

  const currentStageObj = field.cropType?.growthStages?.find(
    s => s.stageName === field.currentStage
  );

  const recentNotes = (field.updates || [])
    .slice(-3)
    .reverse();

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white animate-in fade-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b bg-emerald-600 text-white">
        <div>
          <h2 className="text-2xl font-black">{field.name}</h2>
          <p className="text-emerald-100 font-bold opacity-80 uppercase tracking-tighter text-sm">
            {field.cropType?.name} • Action Panel
          </p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 bg-emerald-500 rounded-full active:scale-90 transition-transform"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="p-6 space-y-8">
          
          {!showForm ? (
            <>
              {/* Task Box: Pinned Instructions */}
              <div className="bg-emerald-50 border-2 border-emerald-100 rounded-3xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-emerald-600 p-2 rounded-xl text-white">
                    <ClipboardList size={20} />
                  </div>
                  <h3 className="text-lg font-black text-emerald-900 uppercase tracking-tight">
                    Task: {field.currentStage}
                  </h3>
                </div>
                <p className="text-emerald-800 text-lg leading-relaxed font-medium italic">
                  "{currentStageObj?.careInstructions || 'No specific instructions for this stage.'}"
                </p>
              </div>

              {/* Growth Timeline */}
              <div>
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                  Growth Progress
                </h4>
                <TimelineStepper 
                  stages={field.cropType?.growthStages || []} 
                  currentStageName={field.currentStage} 
                />
              </div>

              {/* Action Button */}
              <button
                onClick={() => setShowForm(true)}
                className="w-full py-5 bg-emerald-600 text-white rounded-3xl font-black text-xl shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
              >
                <Plus size={24} strokeWidth={3} /> Update Progress
              </button>

              {/* Recent History */}
              <div className="pt-4">
                <div className="flex items-center gap-2 mb-4">
                  <History className="text-gray-400" size={18} />
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    Recent Activity
                  </h4>
                </div>
                
                <div className="space-y-4">
                  {recentNotes.length > 0 ? recentNotes.map((update, idx) => (
                    <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="bg-white p-2 h-fit rounded-full shadow-sm text-gray-400">
                        <MessageSquare size={16} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-black text-emerald-700 uppercase">{update.stage}</span>
                          <span className="text-[10px] text-gray-400">
                            {new Date(update.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <p className="text-gray-700 font-medium leading-snug">
                          {update.note || 'No notes added.'}
                        </p>
                      </div>
                    </div>
                  )) : (
                    <p className="text-sm text-gray-400 italic text-center py-4">
                      No recent activity recorded yet.
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* Update Form */
            <div>
               <div className="flex items-center gap-3 mb-6">
                <button 
                  onClick={() => setShowForm(false)}
                  className="p-2 bg-gray-100 rounded-full text-gray-600"
                >
                  <ClipboardList size={20} />
                </button>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                  Update Stage
                </h3>
              </div>
              <UpdateStageForm 
                field={field} 
                onUpdate={onUpdate}
                onCancel={() => setShowForm(false)} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FieldActionPanel;
