import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api, { API_PATHS } from '../../utils/apiPaths';
import FieldsList from './FieldsList';
import TaskBox from './TaskBox';
import StageStepper from './StageStepper';
import UpdateForm from './UpdateForm';
import RecentHistory from './RecentHistory';
import NotificationBar from './NotificationBar';

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
      alert('Field updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update field. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading your fields…</p>
        </div>
      </div>
    );
  }

  if (error && fields.length === 0) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl border border-red-100">
          ⚠️ {error}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <NotificationBar fields={fields} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Left Column: Fields List */}
      <div className="xl:col-span-1">
        <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden h-fit">
          <div className="px-6 py-5 border-b-2 border-gray-200 bg-gradient-to-r from-white to-gray-50">
            <h3 className="font-black text-gray-900 text-base uppercase tracking-wide">Assigned Fields</h3>
            <p className="text-xs text-gray-500 font-bold mt-0.5">{fields.length} field{fields.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="max-h-[600px] overflow-y-auto">
            <FieldsList
              fields={fields}
              selectedFieldId={selectedField?._id}
              onSelectField={setSelectedField}
            />
          </div>
        </div>
      </div>

      {/* Right Column: Field Details */}
      <div className="xl:col-span-2">
        {selectedField ? (
          <div className="space-y-6">
            {/* Header Card */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
              <h2 className="text-2xl font-black text-gray-900 mb-1">{selectedField.name}</h2>
              <p className="text-sm text-gray-500">
                <span className="font-bold text-gray-700">{selectedField.cropType?.name || 'Unknown Crop'}</span>
                {selectedField.location && <> • {selectedField.location}</>}
              </p>
              {selectedField.currentStage && (
                <div className="mt-4">
                  <span className="inline-block px-3 py-1.5 bg-green-50 border-2 border-green-200 text-green-700 text-xs font-bold uppercase tracking-wider rounded-lg">
                    Current Stage: {selectedField.currentStage}
                  </span>
                </div>
              )}
            </div>

            {/* Content Cards */}
            <div className="space-y-5">
              {/* Care Instructions */}
              <TaskBox
                careInstructions={
                  selectedField.cropType?.growthStages?.find(
                    s => s.stageName === selectedField.currentStage
                  )?.careInstructions
                }
                currentStage={selectedField.currentStage}
              />

              {/* Growth Timeline */}
              {selectedField.cropType?.growthStages && (
                <StageStepper
                  stages={selectedField.cropType.growthStages}
                  currentStageName={selectedField.currentStage}
                />
              )}

              {/* Update Form */}
              {selectedField.cropType?.growthStages && (
                <UpdateForm
                  field={selectedField}
                  stages={selectedField.cropType.growthStages}
                  onSubmit={handleUpdateField}
                  isSubmitting={isSubmitting}
                />
              )}

              {/* Recent History */}
              <RecentHistory updates={selectedField.updates} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-96 bg-white rounded-2xl border-2 border-gray-200">
            <p className="text-gray-400 font-semibold">Select a field to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDashboardContainer;
