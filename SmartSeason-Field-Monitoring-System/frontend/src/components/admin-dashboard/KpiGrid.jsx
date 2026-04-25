import KpiCard from "../cards/KpiCard";
import { Tractor, Leaf, AlertTriangle, Clock } from 'lucide-react';

const KpiGrid = ({ total, active, atRisk, completed }) => {
    const atRiskPct = total > 0 ? Math.round((atRisk / total) * 100) : 0;
    const activePct = total > 0 ? Math.round((active / total) * 100) : 0;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <KpiCard label="Total Fields" value={total} icon={<Tractor />} accent="bg-slate-100" sub="across all agents" />
            <KpiCard label="Active Fields" value={active} icon={<Leaf />} accent="bg-emerald-50" sub={`${activePct}% of total`} />
            <KpiCard label="At Risk" value={atRisk} icon={<AlertTriangle />} accent="bg-red-50" sub={`${atRiskPct}% high priority`} />
            <KpiCard label="Completed" value={completed} icon={<Clock />} accent="bg-amber-50" sub="harvested this season" />
        </div>
    );
};

export default KpiGrid;