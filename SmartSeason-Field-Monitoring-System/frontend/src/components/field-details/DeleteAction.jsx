import React from 'react';
import { Trash2 } from 'lucide-react';

const DeleteAction = ({ userRole, onDelete }) => {
  if (userRole !== 'admin') return null;

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 flex justify-center">
      <button
        onClick={onDelete}
        className="px-6 py-2.5 bg-white text-red-600 border border-red-200 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-50 flex items-center gap-2 transition-colors"
      >
        <Trash2 className="w-4 h-4" /> Delete Field Tracking
      </button>
    </div>
  );
};

export default DeleteAction;
