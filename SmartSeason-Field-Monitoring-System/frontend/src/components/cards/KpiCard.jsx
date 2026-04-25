const KpiCard = ({ label, value, icon, accent, sub }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow duration-200">
        <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-xl ${accent}`}>
            {icon}
        </div>
        <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-0.5">{label}</p>
            <p className="text-3xl font-bold text-gray-800 leading-none">{value}</p>
            {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
        </div>
    </div>
);

export default KpiCard;
