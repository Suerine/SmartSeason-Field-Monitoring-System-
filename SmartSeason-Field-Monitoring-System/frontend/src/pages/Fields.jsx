import { useState, useEffect, useMemo } from 'react';
import api, { API_PATHS } from '../utils/apiPaths';
import { AlertTriangle } from 'lucide-react';
import FieldsHeader from '../components/fields/FieldsHeader';
import FieldsFilter from '../components/fields/FieldsFilter';
import FieldCard from '../components/cards/FieldCard';
import FieldsEmptyState from '../components/fields/ FieldsEmptyState';
import CreateFieldModal from '../components/CreateFieldModal';

const Fields = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');
  const [filterAgent, setFilterAgent] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchFields = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(API_PATHS.FIELDS.GET_ALL_FIELDS);
      const processed = data.map(field => {
        let category = field.currentStage;
        if (field.cropType?.growthStages) {
          const stageObj = field.cropType.growthStages.find(s => s.stageName === field.currentStage);
          if (stageObj) category = stageObj.category;
        }
        return {
          ...field,
          mappedCategory: category,
          displayLocation: field.location || 'Main Farm Area',
          stageProgress: field.stageInfo?.stageProgress || 0,
          stageAlert: field.stageInfo?.stageAlert || false,
          stageOverdue: field.stageInfo?.stageOverdue || false,
        };
      });
      setFields(processed);
    } catch (err) {
      setError('Failed to load fields data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFields(); }, []);

  const uniqueLocations = useMemo(() => ['All', ...new Set(fields.map(f => f.displayLocation))], [fields]);
  const uniqueAgents = useMemo(() => ['All', ...new Set(fields.map(f => f.assignedAgent?.name || 'Unassigned'))], [fields]);

  const filteredFields = useMemo(() => fields.filter(field => {
    const matchSearch = field.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'All' || field.status === filterStatus;
    const matchLocation = filterLocation === 'All' || field.displayLocation === filterLocation;
    const matchAgent = filterAgent === 'All' || (field.assignedAgent?.name || 'Unassigned') === filterAgent;
    return matchSearch && matchStatus && matchLocation && matchAgent;
  }), [fields, searchTerm, filterStatus, filterLocation, filterAgent]);

  const clearFilters = () => {
    setSearchTerm('');
    setFilterStatus('All');
    setFilterLocation('All');
    setFilterAgent('All');
  };

  if (loading) return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
        <p className="text-gray-500 font-medium">Loading fields...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="p-8">
      <div className="max-w-xl mx-auto bg-red-50 border border-red-100 p-6 rounded-2xl flex items-center gap-4">
        <AlertTriangle className="text-red-500 w-8 h-8" />
        <div>
          <h3 className="text-red-800 font-bold">Error</h3>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto mb-8">
        <FieldsHeader
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onClear={clearFilters}
          onCreateClick={() => setIsModalOpen(true)}
        />
        <FieldsFilter
          filterStatus={filterStatus}
          filterLocation={filterLocation}
          filterAgent={filterAgent}
          uniqueLocations={uniqueLocations}
          uniqueAgents={uniqueAgents}
          onStatusChange={setFilterStatus}
          onLocationChange={setFilterLocation}
          onAgentChange={setFilterAgent}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {filteredFields.length === 0
          ? <FieldsEmptyState onClear={clearFilters} />
          : (
            <div className="grid grid-cols-1 gap-4">
              {filteredFields.map(field => (
                <FieldCard key={field._id} field={field} />
              ))}
            </div>
          )
        }
      </div>

      <CreateFieldModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchFields}
      />
    </div>
  );
};

export default Fields;