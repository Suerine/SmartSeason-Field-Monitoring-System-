const Section = ({ title, badge, children }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">{title}</h2>
            {badge && (
                <span className="text-xs font-medium bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                    {badge}
                </span>
            )}
        </div>
        {children}
    </div>
);

export default Section;