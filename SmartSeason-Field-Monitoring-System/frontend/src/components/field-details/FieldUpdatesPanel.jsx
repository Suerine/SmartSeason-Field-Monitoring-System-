import React from 'react';
import { Clock } from 'lucide-react';

const FieldUpdatesPanel = ({ updates, newNote, onNoteChange, onSubmit, isUpdating }) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col">
      <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Clock className="w-5 h-5 text-gray-400" /> Field Updates
      </h2>

      <div className="flex-1 overflow-y-auto max-h-80 mb-6 pr-2 space-y-4">
        {updates?.length === 0 ? (
          <p className="text-gray-400 italic text-sm text-center py-6">No updates logged yet.</p>
        ) : (
          [...(updates || [])].reverse().map((update, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-green-400 mt-2" />
                {i !== updates.length - 1 && <div className="w-px h-full bg-gray-100 my-1" />}
              </div>
              <div className="bg-gray-50 rounded-xl p-3 flex-1 border border-gray-100">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold uppercase text-green-700 bg-green-100 px-2 py-0.5 rounded">
                    {update.stage}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {new Date(update.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{update.note}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={onSubmit} className="mt-auto border-t border-gray-100 pt-4">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
          Record an Observation
        </label>
        <textarea
          value={newNote}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="Observed conditions..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm mb-3 focus:ring-2 focus:ring-green-500"
          rows="3"
          required
        />
        <button
          type="submit"
          disabled={isUpdating}
          className="w-full bg-green-600 text-white font-bold text-sm py-2.5 rounded-xl hover:bg-green-700 transition disabled:opacity-50"
        >
          {isUpdating ? 'Saving...' : 'Post Update'}
        </button>
      </form>
    </div>
  );
};

export default FieldUpdatesPanel;
