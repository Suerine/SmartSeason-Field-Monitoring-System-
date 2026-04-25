import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api, { API_PATHS } from '../utils/apiPaths';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';
import CropDetailsHeader from '../components/crop-details/CropDetailsHeader';
import OptimalConditionsGrid from '../components/crop-details/OptimalConditionsGrid';
import LifecycleSchedule from '../components/crop-details/LifecycleSchedule';
import DeleteAction from '../components/crop-details/DeleteAction';

const CropDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [draftCrop, setDraftCrop] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchCropDetails();
  }, [id]);

  const fetchCropDetails = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(API_PATHS.CROPS.GET_CROP(id));
      setCrop(data);
      setDraftCrop(JSON.parse(JSON.stringify(data)));
    } catch (err) {
      setError("Failed to load crop details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this crop blueprint? This action is permanent and cannot be undone.")) return;
    
    try {
      setLoading(true);
      await api.delete(API_PATHS.CROPS.DELETE_CROP(id));
      navigate('/crops');
    } catch (err) {
      alert("Failed to delete crop blueprint.");
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const { data } = await api.put(API_PATHS.CROPS.UPDATE_CROP(id), draftCrop);
      setCrop(data);
      setDraftCrop(JSON.parse(JSON.stringify(data)));
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update blueprint definitions.");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setDraftCrop(JSON.parse(JSON.stringify(crop)));
    setIsEditing(false);
  };

  const updateStageParams = (idx, field, value) => {
    const updatedStages = [...draftCrop.growthStages];
    if (field === 'durationDays') {
      updatedStages[idx][field] = parseInt(value, 10) || 0;
    } else {
      updatedStages[idx][field] = value;
    }
    setDraftCrop({ ...draftCrop, growthStages: updatedStages });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !crop || !draftCrop) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen font-medium">
        <div className="max-w-xl mx-auto bg-red-50 border border-red-100 p-6 rounded-2xl text-center">
            <h3 className="text-red-800 font-bold mb-1">Architecture Error</h3>
            <p className="text-red-600 text-sm">{error || "Crop blueprint not found"}</p>
            <Link to="/crops" className="mt-4 inline-block text-sm text-red-700 underline">Return to Crops Library</Link>
        </div>
      </div>
    );
  }

  const activeCropView = isEditing ? draftCrop : crop;
  const { optimalConditions, growthStages } = activeCropView;
  const totalLifecycleDays = growthStages?.reduce((acc, stg) => acc + (stg.durationDays || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/crops"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-green-700 transition font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Crops Library
          </Link>
        </div>

        {/* Header Block */}
        <CropDetailsHeader
          crop={crop}
          draftCrop={draftCrop}
          isEditing={isEditing}
          isSaving={isSaving}
          userRole={user?.role}
          onEdit={() => setIsEditing(true)}
          onSave={handleSave}
          onCancel={handleCancel}
          onDraftChange={setDraftCrop}
        />

        {/* Optimal Parameters */}
        <OptimalConditionsGrid
          optimalConditions={optimalConditions}
          draftCrop={draftCrop}
          isEditing={isEditing}
          onDraftChange={setDraftCrop}
        />

        {/* Lifecycle Schedule */}
        <LifecycleSchedule
          growthStages={growthStages}
          totalLifecycleDays={totalLifecycleDays}
          isEditing={isEditing}
          onUpdateStage={updateStageParams}
        />

        {/* Bottom Actions */}
        <DeleteAction userRole={user?.role} isEditing={isEditing} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default CropDetails;
