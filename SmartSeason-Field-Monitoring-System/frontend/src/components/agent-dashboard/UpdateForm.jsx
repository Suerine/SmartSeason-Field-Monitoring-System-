import React, { useState } from 'react';
import { Send } from 'lucide-react';

const UpdateForm = ({ field, stages, onSubmit, isSubmitting }) => {
  const [selectedStage, setSelectedStage] = useState(field.currentStage);
  const [note, setNote] = useState('');

  const currentIdx = stages.findIndex(s => s.stageName === field.currentStage);
  const nextStages = stages.slice(currentIdx);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedStage || !note.trim()) return;

    onSubmit({
      newStage: selectedStage,
      note: note.trim()
    });

    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 border-2 border-gray-200">
      <h3 className="font-black text-gray-900 text-sm uppercase tracking-wide mb-4">
        Log Update
      </h3>

      {/* Stage Selector */}
      <div className="mb-4">
        <label className="block text-xs font-black text-gray-600 uppercase tracking-widest mb-2">
          Update to Stage
        </label>
        <select
          value={selectedStage}
          onChange={(e) => setSelectedStage(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
        >
          {nextStages.map((stage) => (
            <option key={stage.stageName} value={stage.stageName}>
              {stage.stageName}
            </option>
          ))}
        </select>
      </div>

      {/* Note Textarea */}
      <div className="mb-5">
        <label className="block text-xs font-black text-gray-600 uppercase tracking-widest mb-2">
          Observation Notes
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What did you observe? (e.g., 'Slight yellowing on lower leaves, plant growth looks strong')"
          rows="4"
          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 resize-none"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !note.trim()}
        className="w-full bg-green-600 text-white font-black py-4 rounded-xl hover:bg-green-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
      >
        <Send className="w-5 h-5" />
        {isSubmitting ? 'Saving...' : 'Update Progress'}
      </button>
    </form>
  );
};

export default UpdateForm;
