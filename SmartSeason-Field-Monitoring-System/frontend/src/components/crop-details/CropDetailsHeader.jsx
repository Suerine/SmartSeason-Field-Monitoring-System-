import React from 'react';
import { Leaf, Edit2, Check, X } from 'lucide-react';

const CropDetailsHeader = ({
  crop,
  draftCrop,
  isEditing,
  isSaving,
  userRole,
  onEdit,
  onSave,
  onCancel,
  onDraftChange
}) => {
  return (
    <div
      className={`rounded-3xl p-6 md:p-8 border shadow-sm mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden transition-colors ${
        isEditing ? 'bg-amber-50/30 border-amber-200' : 'bg-white border-gray-100'
      }`}
    >
      <Leaf className="absolute -right-8 -top-8 w-48 h-48 text-gray-50 opacity-50 rotate-12 pointer-events-none" />
      <div className="relative z-10 w-full flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="w-full flex-1">
          {isEditing ? (
            <>
              <input
                type="text"
                value={draftCrop.name}
                onChange={(e) => onDraftChange({ ...draftCrop, name: e.target.value })}
                className="text-3xl font-extrabold text-gray-900 mb-2 truncate w-full bg-white border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <textarea
                value={draftCrop.description}
                onChange={(e) => onDraftChange({ ...draftCrop, description: e.target.value })}
                className="text-sm text-gray-700 w-full max-w-2xl leading-relaxed bg-white border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
                rows="3"
              />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2 truncate w-full">
                {crop.name}
              </h1>
              <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
                {crop.description || 'No extended generic description has been added for this crop classification.'}
              </p>
            </>
          )}
        </div>

        {userRole === 'admin' && (
          <div className="shrink-0 flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={onCancel}
                  className="p-2.5 bg-gray-100 text-gray-500 font-bold rounded-full hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <button
                  onClick={onSave}
                  disabled={isSaving}
                  className="px-5 py-2.5 bg-green-600 text-white text-sm font-bold rounded-full hover:bg-green-700 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
                >
                  <Check className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Save Updates'}
                </button>
              </>
            ) : (
              <button
                onClick={onEdit}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2 border border-gray-200"
              >
                <Edit2 className="w-4 h-4" /> Edit Blueprint
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CropDetailsHeader;
