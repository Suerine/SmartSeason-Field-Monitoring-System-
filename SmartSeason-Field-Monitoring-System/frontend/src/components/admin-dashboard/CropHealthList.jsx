import React from 'react';

const CropHealthList = ({ fields }) => {
  // Count At Risk instances per crop type name
  const cropRiskMap = {};

  fields.forEach((field) => {
    if (field.status !== 'At Risk') return;
    const cropName = field.cropType?.name || 'Unknown';
    if (!cropRiskMap[cropName]) {
      cropRiskMap[cropName] = { name: cropName, atRisk: 0, total: 0 };
    }
    cropRiskMap[cropName].atRisk += 1;
  });

  // Also count total per crop (for all statuses)
  fields.forEach((field) => {
    const cropName = field.cropType?.name || 'Unknown';
    if (!cropRiskMap[cropName]) {
      cropRiskMap[cropName] = { name: cropName, atRisk: 0, total: 0 };
    }
    cropRiskMap[cropName].total += 1;
  });

  const sorted = Object.values(cropRiskMap)
    .filter((c) => c.atRisk > 0)
    .sort((a, b) => b.atRisk - a.atRisk);

  if (sorted.length === 0) {
    return (
      <div className="flex items-center justify-center h-28 text-gray-400 text-sm italic">
        No at-risk crops 🌿
      </div>
    );
  }

  const max = sorted[0].atRisk;

  return (
    <ul className="space-y-3">
      {sorted.map((crop) => {
        const pct = Math.round((crop.atRisk / (crop.total || 1)) * 100);
        const barWidth = Math.round((crop.atRisk / max) * 100);
        return (
          <li key={crop.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{crop.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-red-500 font-semibold">
                  {crop.atRisk} at risk
                </span>
                <span className="text-xs text-gray-400">/ {crop.total} total</span>
                <span className="text-[10px] font-bold bg-red-50 text-red-600 px-1.5 py-0.5 rounded-full">
                  {pct}%
                </span>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-red-400 to-red-500 transition-all duration-500"
                style={{ width: `${barWidth}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CropHealthList;
