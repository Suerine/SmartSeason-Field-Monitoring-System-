import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Label,
} from 'recharts';

const CenterLabel = ({ totalAmount }) => {
  return (
    <g>
      <text
        x="50%"
        y="50%"
        dy="-8"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: 30, fontWeight: 700, fill: '#1e293b' }}
      >
        {totalAmount}
      </text>
      <text
        x="50%"
        y="50%"
        dy="18"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8', letterSpacing: '0.08em' }}
      >
        TOTAL FIELDS
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-3 py-2 text-sm">
      <span className="font-semibold text-gray-800">{name}:</span>{' '}
      <span className="text-gray-600">{value} fields</span>
    </div>
  );
};

const HealthPieChart = ({ data, totalAmount, colors }) => (
  <ResponsiveContainer width="100%" height={220}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={72}
        outerRadius={100}
        paddingAngle={3}
        dataKey="value"
        labelLine={false}
        label={false}
      >
        {data.map((entry, i) => (
          <Cell key={entry.name} fill={colors[i % colors.length]} stroke="transparent" />
        ))}
        <Label
          content={(props) => <CenterLabel {...props} totalAmount={totalAmount} />}
          position="center"
        />
      </Pie>
      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  </ResponsiveContainer>
);

export default HealthPieChart;