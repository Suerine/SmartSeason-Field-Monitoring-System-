import { Sprout } from 'lucide-react';

const FieldsEmptyState = ({ onClear }) => (
  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center p-16 text-center">
    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
      <Sprout className="w-10 h-10 text-gray-300" />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">No fields found</h3>
    <p className="text-gray-500 max-w-sm mb-6">
      No field plots match your active filters. Try clearing them to see all fields.
    </p>
    <button
      onClick={onClear}
      className="px-6 py-2.5 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition"
    >
      Reset Filters
    </button>
  </div>
);

export default FieldsEmptyState;