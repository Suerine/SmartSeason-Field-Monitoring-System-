import Section from './Section';
import HealthPieChart from '../charts/HealthPieChart';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';

const STATUS_COLORS = ['#22c55e', '#ef4444', '#EFBF04'];

const legend = [
    { label: 'Active', color: '#22c55e' },
    { label: 'At Risk', color: '#ef4444' },
    { label: 'Completed', color: '#EFBF04' },
];

const StatusDistribution = ({ counts, total }) => {
    const data = [
        { name: 'Active', value: counts.Active },
        { name: 'At Risk', value: counts['At Risk'] },
        { name: 'Completed', value: counts.Completed },
    ];

    return (
        <Section title="FIELDS OVERVIEW" badge={`${total} fields`}>
            <HealthPieChart data={data} totalAmount={total} colors={STATUS_COLORS} />
            <div className="flex justify-center gap-6 mt-2">
                {legend.map((l) => (
                    <div key={l.label} className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: l.color }} />
                        <span className="text-xs text-gray-500">{l.label}</span>
                        <span className="text-xs font-bold text-gray-700">{counts[l.label] ?? 0}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4 bg-slate-100 rounded-xl p-2 cursor-pointer text-gray-700 hover:text-white hover:bg-green-500 transition-colors">
                <Link to="/fields" className="text-xs font-bold mr-1">
                    View All Fields
                </Link>
                <ArrowRightIcon className="w-4 h-4" />
            </div>
        </Section>
    );
};

export default StatusDistribution;