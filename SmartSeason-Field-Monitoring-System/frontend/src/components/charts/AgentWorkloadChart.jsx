import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell, LabelList,
} from 'recharts';



const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-3 py-2 text-sm min-w-[140px]">
        <p className="font-semibold text-gray-800 mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.fill }} className="font-medium">
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AgentWorkloadChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400 text-sm italic">
        No agent data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={Math.max(data.length * 52, 120)}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
        barSize={18}
      >
        <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
        <YAxis
          type="category"
          dataKey="agent"
          width={110}
          tick={{ fontSize: 12, fill: '#475569', fontWeight: 500 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9' }} />
        <Bar dataKey="Active" name="Active" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]}>
        </Bar>
        <Bar dataKey="At Risk" name="At Risk" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]}>

        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AgentWorkloadChart;
