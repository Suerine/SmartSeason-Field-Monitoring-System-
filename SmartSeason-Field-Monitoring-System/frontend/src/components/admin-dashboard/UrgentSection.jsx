import Section from './Section';
import UrgentFeed from './UrgentFeed';

const UrgentSection = ({ fields }) => {
    const atRiskFields = fields.filter(f => f.status === 'At Risk');

    return (
        <Section title="Urgent Attention" badge={`${atRiskFields.length} flagged`}>
            <UrgentFeed fields={fields} />
            {atRiskFields.length > 5 && (
                <p className="text-center text-xs text-gray-400 mt-3">
                    + {atRiskFields.length - 5} more at-risk fields
                </p>
            )}
        </Section>
    );
};

export default UrgentSection;