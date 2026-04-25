import React, { useState } from 'react';
import { Save, X, AlertCircle } from 'lucide-react';

const UpdateStageForm = ({ field, onUpdate, onCancel }) => {
  const [stage, setStage] = useState(field.currentStage);
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const stages = field.cropType?.growthStages || [];
  const currentIndex = stages.findIndex(s => s.stageName === field.currentStage);
  
  // Agents can usually only move forward or stay in current stage
  const availableStages = stages.slice(currentIndex);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stage) return;
    
    setSubmitting(true);
    setError(null);
    
    try {
      await onUpdate({ currentStage: stage, note });
    } catch (err) {
      setError('Failed to save update. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-tight">
          Current Growth Stage
        </label>
        <select
          value={stage}
          onChange={(e) => setStage(e.target.value)}
          className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-lg font-bold text-gray-900 focus:border-emerald-500 focus:ring-0 outline-none appearance-none"
        >
          {availableStages.map((s) => (
            <option key={s.stageName} value={s.stageName}>
              {s.stageName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-tight">
          Field Observations
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. Noticed slight yellowing of leaves..."
          rows="4"
          className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-lg text-gray-900 focus:border-emerald-500 focus:ring-0 outline-none resize-none"
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 font-medium">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold text-lg active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <X size={20} /> Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          <Save size={20} /> {submitting ? 'Saving...' : 'Save Update'}
        </button>
      </div>
    </form>
  );
};

export default UpdateStageForm;
