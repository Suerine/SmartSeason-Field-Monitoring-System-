const STAGE_COLORS = {
    Planted: { bg: 'bg-amber-400', border: 'border-amber-400' },
    Growing: { bg: 'bg-green-500', border: 'border-green-500' },
    Ready: { bg: 'bg-orange-500', border: 'border-orange-500' },
    Harvested: { bg: 'bg-blue-500', border: 'border-blue-500' },
};

const STAGES = ['Planted', 'Growing', 'Ready', 'Harvested'];

const FieldStageTimeline = ({ mappedCategory, currentStage, stageOverdue, stageAlert }) => {
    let activeIdx = STAGES.indexOf(mappedCategory);
    if (activeIdx === -1) activeIdx = 0;

    const lineFillPct = (activeIdx / 3) * 100;

    let activeColor = STAGE_COLORS[STAGES[activeIdx]];
    if (stageOverdue) activeColor = { bg: 'bg-red-500', border: 'border-red-500' };
    else if (stageAlert) activeColor = { bg: 'bg-yellow-400', border: 'border-yellow-400' };

    return (
        <div className="relative mt-6 mb-2 mx-2">
            {/* Background track */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1.5 bg-gray-200 rounded-full" />

            {/* Active fill */}
            <div
                className={`absolute top-1/2 left-0 -translate-y-1/2 h-1.5 rounded-full transition-all duration-700 ease-out ${activeColor.bg}`}
                style={{ width: `${lineFillPct}%` }}
            />

            {/* Nodes */}
            {STAGES.map((stage, idx) => {
                const leftPct = (idx / 3) * 100;
                const isReached = idx <= activeIdx;
                const isCurrent = idx === activeIdx;
                const nodeColor = STAGE_COLORS[stage];
                const displayColor = (isCurrent && (stageOverdue || stageAlert)) ? activeColor : nodeColor;

                return (
                    <div
                        key={stage}
                        className="absolute top-1/2 -translate-y-1/2 -ml-2.5 w-5 h-5 flex items-center justify-center"
                        style={{ left: `${leftPct}%` }}
                        title={isCurrent ? `Category: ${stage} (Current: ${currentStage})` : `Category: ${stage}`}
                    >
                        <div className={`w-3.5 h-3.5 rounded-full border-[2.5px] transition-colors duration-500 ${isReached
                                ? `${displayColor.border} bg-white shadow-sm`
                                : 'border-gray-300 bg-gray-100'
                            }`}>
                            {isCurrent && (
                                <div className={`w-1 h-1 m-[2px] rounded-full animate-pulse ${displayColor.bg}`} />
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default FieldStageTimeline;