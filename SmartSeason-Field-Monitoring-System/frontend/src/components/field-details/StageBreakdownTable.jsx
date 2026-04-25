import React from 'react';
import { ListPlus, CheckCircle } from 'lucide-react';

const StageBreakdownTable = ({
  stages,
  currentIdx,
  isFinishedGlobally,
  stageInfo
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm overflow-hidden">
      <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
        <ListPlus className="w-5 h-5 text-gray-400" /> Stage Breakdown
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold rounded-xl border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 rounded-tl-lg">Stage name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3 text-right">Duration</th>
              <th className="px-4 py-3 text-right rounded-tr-lg">Days Left</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {stages.map((stg, i) => {
              const isUpcoming = currentIdx !== -1 && i > currentIdx;
              const isCompleted = currentIdx !== -1 && i < currentIdx;
              const isCurrent = i === currentIdx;
              let daysLeftStr = '-';
              let rowClass = 'text-gray-600';
              let icon = null;

              if (isCompleted) {
                daysLeftStr = '✔';
                icon = <CheckCircle className="inline-block w-3.5 h-3.5 text-green-500 mr-2" />;
              } else if (isCurrent) {
                daysLeftStr = isFinishedGlobally ? '✔' : `${stageInfo?.daysUntilNextStage || 0}d left`;
                rowClass = 'font-bold text-green-800 bg-green-50/30';
              } else if (isUpcoming) {
                daysLeftStr = `${stg.durationDays}d total`;
                rowClass = 'text-gray-400';
              }

              return (
                <tr key={i} className={rowClass}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {icon}
                    {stg.stageName}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${
                        isCurrent ? 'bg-green-100 text-green-700' : 'bg-gray-100'
                      }`}
                    >
                      {stg.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{stg.durationDays}d</td>
                  <td className="px-4 py-3 text-right tabular-nums">{daysLeftStr}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StageBreakdownTable;
