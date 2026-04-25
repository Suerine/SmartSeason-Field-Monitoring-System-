import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import Section from './Section';
import AgentWorkloadChart from '../charts/AgentWorkloadChart';


const AgentWorkload = ({ data }) => (
    <Section title="Agent Workload" badge={`${data.length} agents`}>
        <div className="pt-1">
            <AgentWorkloadChart data={data} />
        </div>
        <div className="flex gap-4 mt-3 justify-end">
            <span className="flex items-center gap-1 text-xs text-gray-500">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" /> Active
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
                <span className="w-2.5 h-2.5 rounded-sm bg-red-500 inline-block" /> At Risk
            </span>
        </div>
        <div className="flex justify-center mt-4 bg-slate-100 rounded-xl p-2 cursor-pointer text-gray-700 hover:text-white hover:bg-green-500 transition-colors">
            <Link to="/fields" className="text-xs font-bold mr-1">
                View All Fields
            </Link>
            <ArrowRightIcon className="w-4 h-4" />
        </div>
    </Section>
);

export default AgentWorkload;