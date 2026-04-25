const FieldsFilter = ({
    filterStatus, filterLocation, filterAgent,
    uniqueLocations, uniqueAgents,
    onStatusChange, onLocationChange, onAgentChange,
}) => (
    <div className="flex flex-wrap gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm shadow-emerald-900/5">
        {[
            {
                label: 'Status',
                value: filterStatus,
                onChange: onStatusChange,
                options: [
                    { value: 'All', label: 'All Statuses' },
                    { value: 'Active', label: 'Active' },
                    { value: 'At Risk', label: 'At Risk' },
                    { value: 'Completed', label: 'Completed' },
                ],
            },
            {
                label: 'Location',
                value: filterLocation,
                onChange: onLocationChange,
                options: uniqueLocations.map(loc => ({ value: loc, label: loc })),
            },
            {
                label: 'Agent',
                value: filterAgent,
                onChange: onAgentChange,
                options: uniqueAgents.map(ag => ({ value: ag, label: ag })),
            },
        ].map(({ label, value, onChange, options }) => (
            <div key={label} className="flex-1 min-w-[150px]">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {label}
                </label>
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>
        ))}
    </div>
);

export default FieldsFilter;