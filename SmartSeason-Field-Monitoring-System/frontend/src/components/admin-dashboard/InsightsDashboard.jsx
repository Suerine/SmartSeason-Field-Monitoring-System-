import { useEffect, useState } from 'react';
import api from '../../utils/apiPaths';
import { computeStatusCounts, computeAgentWorkload } from '../../utils/fieldHelpers';
import KpiGrid from './KpiGrid';
import StatusDistribution from './StatusDistribution';
import AgentWorkload from './AgentWorkload';
import CropHealthList from './CropHealthList';
import UrgentSection from './UrgentSection';
import Section from './Section';

const InsightsDashboard = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/fields')
      .then(({ data }) => setFields(data))
      .catch(err => setError(err.response?.data?.message || 'Failed to load field data'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-sm text-gray-400">Loading insights…</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-48">
      <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl border border-red-100">⚠️ {error}</p>
    </div>
  );

  const counts = computeStatusCounts(fields);
  const agentData = computeAgentWorkload(fields);

  return (
    <div className="space-y-6">
      <KpiGrid
        total={fields.length}
        active={counts.Active}
        atRisk={counts['At Risk']}
        completed={counts.Completed}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StatusDistribution counts={counts} total={fields.length} />
        <AgentWorkload data={agentData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Section title="Crop Health Analysis" badge="At-risk by crop">
          <CropHealthList fields={fields} />
        </Section>
        <UrgentSection fields={fields} />
      </div>
    </div>
  );
};

export default InsightsDashboard;