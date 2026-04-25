import { Leaf, Search, FilterX, Plus } from 'lucide-react';

const FieldsHeader = ({ searchTerm, onSearch, onClear, onCreateClick }) => (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
        <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                <Leaf className="text-emerald-600 w-6 h-6" /> Field Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
                Review operational status and stages of all assigned plots.
            </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                    type="text"
                    placeholder="Search fields..."
                    value={searchTerm}
                    onChange={(e) => onSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none focus:border-emerald-500 w-full sm:w-64 transition-all shadow-sm"
                />
            </div>

            <button
                onClick={onClear}
                title="Clear filters"
                className="flex items-center justify-center p-2 rounded-full border border-gray-200 bg-white text-gray-500 hover:text-red-500 hover:border-red-200 transition-colors shadow-sm"
            >
                <FilterX className="w-4 h-4" />
            </button>

            <button
                onClick={onCreateClick}
                className="flex items-center justify-center gap-2 px-5 py-2 bg-green-500 text-white text-sm font-semibold rounded-full hover:bg-green-700 transition shadow-sm"
            >
                <Plus className="w-4 h-4" /> Create Field
            </button>
        </div>
    </div>
);

export default FieldsHeader;