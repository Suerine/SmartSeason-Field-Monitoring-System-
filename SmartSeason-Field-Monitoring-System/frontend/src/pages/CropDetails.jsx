import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api, { API_PATHS } from '../utils/apiPaths';
import { useAuth } from '../context/AuthContext';
import {
  ArrowLeft, Leaf, Thermometer, Droplets, Droplet,
  Info, ListTree, Clock, Check, X, Edit2, Trash2
} from 'lucide-react';

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
          <Link to="/crops" className="inline-flex items-center gap-2 text-gray-500 hover:text-green-700 transition font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Crops Library
          </Link>
        </div>

        {/* Header Block */}
        <div className={`rounded-3xl p-6 md:p-8 border shadow-sm mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden transition-colors ${isEditing ? 'bg-amber-50/30 border-amber-200' : 'bg-white border-gray-100'}`}>
          <Leaf className="absolute -right-8 -top-8 w-48 h-48 text-gray-50 opacity-50 rotate-12 pointer-events-none" />
          <div className="relative z-10 w-full flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="w-full flex-1">
              {isEditing ? (
                <>
                  <input 
                    type="text" 
                    value={draftCrop.name}
                    onChange={(e) => setDraftCrop({...draftCrop, name: e.target.value})}
                    className="text-3xl font-extrabold text-gray-900 mb-2 truncate w-full bg-white border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                  <textarea 
                    value={draftCrop.description}
                    onChange={(e) => setDraftCrop({...draftCrop, description: e.target.value})}
                    className="text-sm text-gray-700 w-full max-w-2xl leading-relaxed bg-white border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
                    rows="3"
                  />
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-extrabold text-gray-900 mb-2 truncate w-full">{crop.name}</h1>
                  <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
                    {crop.description || "No extended generic description has been added for this crop classification."}
                  </p>
                </>
              )}
            </div>
            
            {user?.role === 'admin' && (
              <div className="shrink-0 flex items-center gap-2">
                 {isEditing ? (
                   <>
                     <button onClick={handleCancel} className="p-2.5 bg-gray-100 text-gray-500 font-bold rounded-full hover:bg-gray-200 transition-colors">
                       <X className="w-5 h-5" />
                     </button>
                     <button 
                       onClick={handleSave}
                       disabled={isSaving}
                       className="px-5 py-2.5 bg-green-600 text-white text-sm font-bold rounded-full hover:bg-green-700 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
                     >
                       <Check className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Save Updates'}
                     </button>
                   </>
                 ) : (
                   <button 
                     onClick={() => setIsEditing(true)}
                     className="px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2 border border-gray-200"
                   >
                     <Edit2 className="w-4 h-4" /> Edit Blueprint
                   </button>
                 )}
              </div>
            )}
          </div>
        </div>

        {/* Optimal Parameters */}
        <h2 className="text-lg font-bold text-gray-800 mb-4 px-2 flex items-center gap-2">
          Optimal Environmental Parameters 
          {isEditing && <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full uppercase ml-1">Editable</span>}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center shrink-0">
              <Thermometer className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Temperature</p>
              {isEditing ? (
                 <input 
                   type="text" 
                   value={draftCrop.optimalConditions?.temperature || ''}
                   onChange={(e) => setDraftCrop({ ...draftCrop, optimalConditions: { ...draftCrop.optimalConditions, temperature: e.target.value }})}
                   className="mt-1 w-full text-sm font-bold text-gray-900 border-b border-dashed border-gray-300 focus:outline-none"
                 />
              ) : (
                 <p className="text-base font-bold text-gray-900 truncate">{optimalConditions?.temperature || 'Not Specified'}</p>
              )}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shrink-0">
              <Droplets className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Avg Humidity</p>
              {isEditing ? (
                 <input 
                   type="text" 
                   value={draftCrop.optimalConditions?.humidity || ''}
                   onChange={(e) => setDraftCrop({ ...draftCrop, optimalConditions: { ...draftCrop.optimalConditions, humidity: e.target.value }})}
                   className="mt-1 w-full text-sm font-bold text-gray-900 border-b border-dashed border-gray-300 focus:outline-none"
                 />
              ) : (
                 <p className="text-base font-bold text-gray-900 truncate">{optimalConditions?.humidity || 'Not Specified'}</p>
              )}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center shrink-0">
              <Droplet className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Soil Designation</p>
              {isEditing ? (
                 <input 
                   type="text" 
                   value={draftCrop.optimalConditions?.soilType || ''}
                   onChange={(e) => setDraftCrop({ ...draftCrop, optimalConditions: { ...draftCrop.optimalConditions, soilType: e.target.value }})}
                   className="mt-1 w-full text-sm font-bold text-gray-900 border-b border-dashed border-gray-300 focus:outline-none"
                 />
              ) : (
                 <p className="text-base font-bold text-gray-900 truncate">{optimalConditions?.soilType || 'Not Specified'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Stages */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm relative">
          <div className="flex flex-col sm:flex-row justify-between mb-8 gap-4 border-b border-gray-50 pb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <ListTree className="w-5 h-5 text-green-600" /> Lifecycle Schedule
              </h2>
              <p className="text-xs text-gray-500 mt-1">Expected progression tracks and generic stage bounds.</p>
            </div>
            <div className="bg-gray-50 rounded-xl px-4 py-2 border border-gray-100 flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Duration</p>
                <p className="text-lg font-bold text-gray-900">{totalLifecycleDays} <span className="text-xs font-normal text-gray-500">Days</span></p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {!growthStages || growthStages.length === 0 ? (
              <div className="text-center py-10"><p className="text-gray-400 italic">No stage data available.</p></div>
            ) : (
              growthStages.map((stage, idx) => (
                <div key={idx} className="relative group pl-6">
                  {idx !== growthStages.length - 1 && (
                    <div className="absolute left-[11px] top-6 bottom-[-30px] w-0.5 bg-gray-100 group-hover:bg-green-100 transition-colors" />
                  )}
                  <div className={`absolute left-[7px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-200 border-2 border-white ring-2 ring-transparent transition-all z-10 ${isEditing ? 'ring-amber-100 bg-amber-400' : 'group-hover:ring-green-50'}`} />
                  <div className={`rounded-2xl p-5 border transition-all ml-4 ${isEditing ? 'bg-amber-50/10 border-amber-100' : 'bg-gray-50 border-transparent hover:border-green-100 hover:bg-green-50/20 shadow-sm'}`}>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-lg">{stage.stageName}</h4>
                        <span className="inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-green-50 text-green-700">
                          {stage.category} Phase
                        </span>
                      </div>
                      <div className={`rounded-lg px-3 py-1.5 border shadow-sm flex items-center gap-2 ${isEditing ? 'bg-amber-50 border-amber-200' : 'bg-white border-gray-100'}`}>
                        {isEditing ? (
                           <>
                             <input type="number" min="0" value={stage.durationDays} onChange={(e) => updateStageParams(idx, 'durationDays', e.target.value)} className="w-16 px-2 py-0.5 text-sm font-bold text-gray-900 rounded focus:ring-2 focus:ring-amber-500" />
                             <span className="text-xs font-bold text-gray-700">Days</span>
                           </>
                        ) : (
                           <p className="text-xs font-bold text-gray-700">~ {stage.durationDays} Days</p>
                        )}
                      </div>
                    </div>
                    {(isEditing || stage.careInstructions) && (
                      <div className="mt-4 flex gap-3 text-sm p-4 rounded-xl border bg-white border-gray-100">
                        <Info className="w-5 h-5 shrink-0 text-blue-400 mt-0.5" />
                        <div className="flex-1">
                           <strong className="text-gray-800 block mb-1">Care Protocol:</strong> 
                           {isEditing ? (
                             <textarea value={stage.careInstructions || ''} onChange={(e) => updateStageParams(idx, 'careInstructions', e.target.value)} className="w-full text-sm bg-gray-50 border border-gray-200 rounded p-2 focus:ring-2 focus:ring-amber-500 resize-y min-h-[60px]" />
                           ) : (
                             <p className="text-gray-600 leading-relaxed">{stage.careInstructions}</p>
                           )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        {user?.role === 'admin' && !isEditing && (
          <div className="mt-12 pt-8 border-t border-gray-200 flex justify-center">
            <button 
              onClick={handleDelete}
              className="px-6 py-2.5 bg-white text-red-600 border border-red-200 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-50 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Delete Crop Blueprint
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropDetails;
