import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api, { API_PATHS } from '../../utils/apiPaths';
import FieldsList from './FieldsList';
import TaskBox from './TaskBox';
import StageStepper from './StageStepper';
import UpdateForm from './UpdateForm';
import RecentHistory from './RecentHistory';
import NotificationBar from './NotificationBar';
import { LayoutGrid, Info } from 'lucide-react';

const AgentDashboardContainer = () => {
  const { user } = useAuth();

  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchAssignedFields();
  }, [user?.id]);

  const fetchAssignedFields = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(API_PATHS.FIELDS.GET_ALL_FIELDS);
      const assignedFields = data.filter(f => f.assignedAgent?._id === user?.id);
      setFields(assignedFields);
      if (assignedFields.length > 0) {
        setSelectedField(assignedFields[0]);
      }
    } catch (err) {
      setError('Failed to load your assigned fields');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateField = async (updateData) => {
    try {
      setIsSubmitting(true);
      const { data } = await api.put(
        API_PATHS.FIELDS.UPDATE_FIELD(selectedField._id),
        {
          currentStage: updateData.newStage,
          note: updateData.note
        }
      );

      const updatedField = data;
      setSelectedField(updatedField);
      setFields(fields.map(f => (f._id === updatedField._id ? updatedField : f)));
    } catch (err) {
      console.error(err);
      alert('Failed to update field. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-green-500/10 border-t-green-500 rounded-full animate-spin" />
          <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full"></div>
        </div>
        <p className="text-sm font-black text-green-500 uppercase tracking-widest animate-pulse">Synchronizing Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Notifications Section */}
      <NotificationBar fields={fields} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column: Fields List (4 cols) */}
        <div className="xl:col-span-4 space-y-4">
          <div className="flex items-center gap-2 px-2">
            <LayoutGrid className="w-4 h-4 text-green-500" />
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Your Assigned Fields</h3>
            <span className="ml-auto text-[10px] font-black text-green-500/40">{fields.length} ACTIVE</span>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden">
            <div className="max-h-[700px] overflow-y-auto no-scrollbar">
              <FieldsList
                fields={fields}
                selectedFieldId={selectedField?._id}
                onSelectField={setSelectedField}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Field Details (8 cols) */}
        <div className="xl:col-span-8">
          {selectedField ? (
            <div className="space-y-8">
              {/* Main Detail Card */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-black text-green-500 uppercase tracking-widest">
                          {selectedField.cropType?.name || 'Crop'}
                        </span>
                        {selectedField.location && (
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                            {selectedField.location}
                          </span>
                        )}
                      </div>
                      <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
                        {selectedField.name}
                      </h2>
                    </div>

                    <div className="flex flex-col items-end">
                      <div className="text-[10px] font-black text-green-500/40 uppercase tracking-widest mb-2 text-right">Current Phase</div>
                      <div className="text-2xl font-black text-white uppercase tracking-tight">
                        {selectedField.currentStage}
                      </div>
                    </div>
                  </div>

                  {/* Growth Progress (Lifecycle Map Style) */}
                  <div className="mt-12">
                     <StageStepper
                      stages={selectedField.cropType?.growthStages || []}
                      currentStageName={selectedField.currentStage}
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Content Panels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <TaskBox
                    careInstructions={
                      selectedField.cropType?.growthStages?.find(
                        s => s.stageName === selectedField.currentStage
                      )?.careInstructions
                    }
                    currentStage={selectedField.currentStage}
                  />
                  <UpdateForm
                    field={selectedField}
                    stages={selectedField.cropType?.growthStages || []}
                    onSubmit={handleUpdateField}
                    isSubmitting={isSubmitting}
                  />
                </div>
                
                <div className="space-y-8">
                  <RecentHistory updates={selectedField.updates} />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-white/5 backdrop-blur-xl border border-white/10 border-dashed rounded-[3rem] p-12 text-center">
              <div className="w-20 h-20 bg-green-500/10 rounded-[2rem] flex items-center justify-center mb-6">
                <Info className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight mb-2">Select a Field</h3>
              <p className="text-gray-400 max-w-xs mx-auto">Choose a field from the list to view detailed status and log updates.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentDashboardContainer;
