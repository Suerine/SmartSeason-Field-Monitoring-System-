import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api, { API_PATHS } from '../utils/apiPaths';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import FieldDetailsHeader from '../components/field-details/FieldDetailsHeader';
import DateMetricsGrid from '../components/field-details/DateMetricsGrid';
import LifecycleMap from '../components/field-details/LifecycleMap';
import StageBreakdownTable from '../components/field-details/StageBreakdownTable';
import FieldUpdatesPanel from '../components/field-details/FieldUpdatesPanel';
import DeleteAction from '../components/field-details/DeleteAction';

const FieldDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [field, setField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [newNote, setNewNote] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchFieldDetails();
  }, [id]);

  const fetchFieldDetails = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(API_PATHS.FIELDS.GET_FIELD(id));
      
      let category = data.currentStage;
      if (data.cropType && data.cropType.growthStages) {
        const stageObj = data.cropType.growthStages.find(s => s.stageName === data.currentStage);
        if (stageObj) category = stageObj.category;
      }
      
      setField({ ...data, mappedCategory: category });
    } catch (err) {
      setError("Failed to load field details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this field? This action is permanent and cannot be undone.")) return;
    
    try {
      setLoading(true);
      await api.delete(API_PATHS.FIELDS.DELETE_FIELD(id));
      navigate('/fields');
    } catch (err) {
      alert("Failed to delete field.");
      setLoading(false);
    }
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    try {
      setIsUpdating(true);
      const { data } = await api.put(API_PATHS.FIELDS.UPDATE_FIELD(id), { note: newNote });
      
      let category = data.currentStage;
      if (data.cropType && data.cropType.growthStages) {
        const stageObj = data.cropType.growthStages.find(s => s.stageName === data.currentStage);
        if (stageObj) category = stageObj.category;
      }
      
      setField({ ...data, mappedCategory: category });
      setNewNote('');
    } catch (err) {
      console.error(err);
      alert("Failed to post update.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !field) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-xl mx-auto bg-red-50 p-6 rounded-2xl flex items-center gap-4">
          <AlertTriangle className="text-red-500 w-8 h-8" />
          <div>
            <h3 className="text-red-800 font-bold">Error</h3>
            <p className="text-red-600 mt-1">{error || "Field not found"}</p>
            <Link to="/fields" className="mt-4 inline-block text-sm text-red-700 underline">Return to Fields</Link>
          </div>
        </div>
      </div>
    );
  }

  const plantingDate = new Date(field.plantingDate);
  const stages = field.cropType?.growthStages || [];
  
  let totalDuration = 0;
  stages.forEach(s => totalDuration += (s.durationDays || 0));
  
  const expectedHarvestDate = new Date(plantingDate);
  expectedHarvestDate.setDate(expectedHarvestDate.getDate() + totalDuration);
  
  const today = new Date();
  const globalDaysLeft = Math.max(0, Math.ceil((expectedHarvestDate - today) / (1000 * 60 * 60 * 24)));
  const isFinishedGlobally = field.mappedCategory === 'Harvested' || field.status === 'Completed';

  const currentStageName = field.currentStage;
  const currentIdx = stages.findIndex(s => s.stageName === currentStageName);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/fields"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-green-700 transition font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Fields
        </Link>

        {/* Field Header */}
        <FieldDetailsHeader field={field} />

        {/* Date Metrics */}
        <DateMetricsGrid
          plantingDate={plantingDate}
          expectedHarvestDate={expectedHarvestDate}
          globalDaysLeft={globalDaysLeft}
          isFinishedGlobally={isFinishedGlobally}
        />

        {/* Lifecycle Map */}
        <LifecycleMap mappedCategory={field.mappedCategory} currentStage={field.currentStage} />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <StageBreakdownTable
            stages={stages}
            currentIdx={currentIdx}
            isFinishedGlobally={isFinishedGlobally}
            stageInfo={field.stageInfo}
          />

          <FieldUpdatesPanel
            updates={field.updates}
            newNote={newNote}
            onNoteChange={setNewNote}
            onSubmit={submitUpdate}
            isUpdating={isUpdating}
          />
        </div>

        {/* Delete Action */}
        <DeleteAction userRole={user?.role} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default FieldDetails;
