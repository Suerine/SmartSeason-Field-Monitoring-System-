import React, { useState, useEffect } from 'react';
import { Send, History } from 'lucide-react';

const UpdateForm = ({ field, stages, onSubmit, isSubmitting }) => {
  const [newStage, setNewStage] = useState(field?.currentStage || '');
  const [note, setNote] = useState('');

  useEffect(() => {
    setNewStage(field?.currentStage || '');
  }, [field]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newStage) return;
    onSubmit({ newStage, note });
    setNote('');
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
          <History className="w-5 h-5 text-emerald-500" />
        </div>
        <h3 className="text-sm font-black text-white uppercase tracking-widest">Log Field Activity</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[10px] font-black text-green-500 uppercase tracking-widest mb-2 ml-1">
            Growth Stage Update
          </label>
          <select
            value={newStage}
            onChange={(e) => setNewStage(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all appearance-none"
          >
            {stages.map((stage) => (
              <option key={stage.stageName} value={stage.stageName} className="bg-green-950 text-white">
                {stage.stageName} ({stage.category})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-black text-green-500 uppercase tracking-widest mb-2 ml-1">
            Field Observation Notes
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Describe soil moisture, pest activity, or general health..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all h-32 resize-none placeholder:text-white/20"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full group relative overflow-hidden bg-green-500 hover:bg-green-400 disabled:opacity-50 text-green-950 font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] active:scale-[0.98]"
        >
          <div className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-green-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Field Log</span>
              </>
            )}
          </div>
          
          {/* Shine effect */}
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/40 opacity-40 group-hover:animate-shine" />
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
