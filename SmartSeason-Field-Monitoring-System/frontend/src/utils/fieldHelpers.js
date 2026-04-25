export function computeStatusCounts(fields) {
    return fields.reduce(
        (acc, f) => {
            const s = f.status || 'Active';
            acc[s] = (acc[s] || 0) + 1;
            return acc;
        },
        { Active: 0, 'At Risk': 0, Completed: 0 }
    );
}

export function computeAgentWorkload(fields) {
    const map = {};
    fields.forEach((f) => {
        const name = f.assignedAgent?.name || 'Unassigned';
        if (!map[name]) map[name] = { agent: name, Active: 0, 'At Risk': 0, Completed: 0, total: 0 };
        const s = f.status || 'Active';
        map[name][s] = (map[name][s] || 0) + 1;
        map[name].total += 1;
    });
    return Object.values(map).sort((a, b) => b.total - a.total);
}