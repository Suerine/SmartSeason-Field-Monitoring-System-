import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api, { API_PATHS } from '../utils/apiPaths';
import AgentDashboardHeader from '../components/agent-dashboard/AgentDashboardHeader';
import FieldsList from '../components/agent-dashboard/FieldsList';
import FieldDetailHeader from '../components/agent-dashboard/FieldDetailHeader';
import TaskBox from '../components/agent-dashboard/TaskBox';
import StageStepper from '../components/agent-dashboard/StageStepper';
import UpdateForm from '../components/agent-dashboard/UpdateForm';
import RecentHistory from '../components/agent-dashboard/RecentHistory';
import { useNavigate } from 'react-router-dom';

const AgentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

      // Filter fields assigned to current user
      const assignedFields = data.filter(
        f => f.assignedAgent?._id === user?.id
      );

      // Map category for each field
      const fieldsWithCategory = assignedFields.map(field => {
        let mappedCategory = field.currentStage;
        if (field.cropType?.growthStages) {
          const stageObj = field.cropType.growthStages.find(
            s => s.stageName === field.currentStage
          );
          if (stageObj) mappedCategory = stageObj.category;
        }
        return { ...field, mappedCategory };
      });

      setFields(fieldsWithCategory);
      if (fieldsWithCategory.length > 0) {
        setSelectedField(fieldsWithCategory[0]);
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

      // Update category mapping
      let mappedCategory = data.currentStage;
      if (data.cropType?.growthStages) {
        const stageObj = data.cropType.growthStages.find(
          s => s.stageName === data.currentStage
        );
        if (stageObj) mappedCategory = stageObj.category;
      }

      const updatedField = { ...data, mappedCategory };
      setSelectedField(updatedField);

      // Update in fields list
      setFields(fields.map(f => (f._id === updatedField._id ? updatedField : f)));

      // Show success
      alert('Field updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update field. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-bold">Loading your fields...</p>
        </div>
      </div>
    );
  }

  if (error && fields.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <AgentDashboardHeader agentName={user?.name} onLogout={handleLogout} />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center max-w-sm">
            <p className="text-red-700 font-bold">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* LEFT SIDE: Fields List */}
      <div className="lg:w-96 lg:h-screen lg:overflow-y-auto bg-white border-r border-gray-200 flex flex-col">
        <AgentDashboardHeader agentName={user?.name} onLogout={handleLogout} />
        <div className="flex-1 overflow-y-auto">
          <FieldsList
            fields={fields}
            selectedFieldId={selectedField?._id}
            onSelectField={setSelectedField}
          />
        </div>
      </div>

      {/* RIGHT SIDE: Field Detail */}
      {selectedField ? (
        <div className="flex-1 flex flex-col h-screen lg:h-auto overflow-y-auto">
          <FieldDetailHeader
            field={selectedField}
            onBack={() => {
              if (window.innerWidth < 1024) {
                setSelectedField(null);
              }
            }}
          />

          <div className="flex-1 overflow-y-auto p-6 space-y-5 pb-20">
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
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 font-bold">Select a field to view details</p>
        </div>
      )}
    </div>
  );
};

export default AgentDashboard;