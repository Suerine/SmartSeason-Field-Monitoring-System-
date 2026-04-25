import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api, { API_PATHS } from '../utils/apiPaths';
import { useAuth } from '../context/AuthContext';
import {
  ArrowLeft, MapPin, User, Leaf, AlertTriangle, 
  Clock, Target, CalendarDays, CheckCircle, ListPlus, Trash2
} from 'lucide-react';

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
        <Link to="/fields" className="inline-flex items-center gap-2 text-gray-500 hover:text-green-700 transition font-medium mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Fields
        </Link>
        
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-extrabold text-gray-900">{field.name}</h1>
              <span className={`px-3 py-1 bg-opacity-10 rounded-full text-xs font-bold uppercase tracking-wider ${
                field.status === 'Active' ? 'bg-green-500 text-green-700' : 
                field.status === 'At Risk' ? 'bg-red-500 text-red-700' : 'bg-slate-500 text-slate-700'
              }`}>
                {field.status}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1.5"><Leaf className="w-4 h-4 text-amber-500" /> {field.cropType?.name}</div>
              <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-blue-500" /> {field.location || "Farm Area"}</div>
              <div className="flex items-center gap-1.5"><User className="w-4 h-4 text-purple-500" /> Agent: {field.assignedAgent?.name || "Unassigned"}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
              <CalendarDays className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Date Started</p>
              <p className="text-lg font-bold text-gray-900">{plantingDate.toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Est. Completion</p>
              <p className="text-lg font-bold text-gray-900">{expectedHarvestDate.toLocaleDateString()}</p>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border flex items-center gap-4 ${isFinishedGlobally ? 'bg-slate-50 border-slate-200' : 'bg-white border-gray-100'}`}>
            <div className={`w-12 h-12 flex items-center justify-center rounded-full ${isFinishedGlobally ? 'bg-slate-200 text-slate-600' : 'bg-orange-50 text-orange-500'}`}>
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Global Days Left</p>
              <p className="text-lg font-bold text-gray-900">{isFinishedGlobally ? 'COMPLETED' : `${globalDaysLeft} Days`}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2"><Target className="w-5 h-5 text-gray-400" /> Lifecycle Map</h2>
          
          <div className="relative mt-8 mb-6 mx-4">
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-2 bg-gray-100 rounded-full" />
            
            {(() => {
              const buckets = ['Planted', 'Growing', 'Ready', 'Harvested'];
              const STAGE_COLORS = {
                'Planted': { bg: 'bg-amber-400', border: 'border-amber-400' },
                'Growing': { bg: 'bg-green-500', border: 'border-green-500' },
                'Ready': { bg: 'bg-orange-500', border: 'border-orange-500' },
                'Harvested': { bg: 'bg-blue-500', border: 'border-blue-500' }
              };
              
              let activeBucketIdx = buckets.indexOf(field.mappedCategory);
              if (activeBucketIdx === -1) activeBucketIdx = 0; 
              const lineFillPct = (activeBucketIdx / 3) * 100;
              let activeColor = STAGE_COLORS[buckets[activeBucketIdx]];
              
              return (
                <>
                  <div className={`absolute top-1/2 left-0 -translate-y-1/2 h-2 rounded-full transition-all duration-700 ease-out ${activeColor.bg}`} style={{ width: `${lineFillPct}%` }} />
                  {buckets.map((bucket, idx) => {
                    const leftPct = (idx / 3) * 100;
                    const isCurrent = idx === activeBucketIdx;
                    const nodeColor = STAGE_COLORS[bucket];
                    return (
                      <div key={bucket} className="absolute top-1/2 -translate-y-1/2 -ml-4 w-8 h-8 flex items-center justify-center cursor-pointer group" style={{ left: `${leftPct}%` }}>
                        <div className={`w-5 h-5 rounded-full border-[3px] transition-colors duration-500 ${idx <= activeBucketIdx ? `${nodeColor.border} bg-white shadow-md` : 'border-gray-200 bg-gray-50'}`}>
                          {isCurrent && <div className={`w-2 h-2 m-[3px] rounded-full animate-pulse ${nodeColor.bg}`} />}
                        </div>
                        <div className="absolute top-10 flex flex-col items-center min-w-max">
                          <span className={`text-xs font-bold ${isCurrent ? nodeColor.text : 'text-gray-400'}`}>{bucket}</span>
                          {isCurrent && <span className="text-[10px] text-gray-400 mt-0.5">{field.currentStage}</span>}
                        </div>
                      </div>
                    );
                  })}
                </>
              );
            })()}
          </div>
          <div className="h-10"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm overflow-hidden">
            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2"><ListPlus className="w-5 h-5 text-gray-400" /> Stage Breakdown</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold rounded-xl border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Stage name</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3 text-right">Duration</th>
                    <th className="px-4 py-3 text-right rounded-tr-lg">Days Left</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {stages.map((stg, i) => {
                    const isUpcoming = currentIdx !== -1 && i > currentIdx;
                    const isCompleted = currentIdx !== -1 && i < currentIdx;
                    const isCurrent = i === currentIdx;
                    let daysLeftStr = "-";
                    let rowClass = "text-gray-600";
                    let icon = null;
                    if (isCompleted) { daysLeftStr = "✔"; icon = <CheckCircle className="inline-block w-3.5 h-3.5 text-green-500 mr-2" />; }
                    else if (isCurrent) { daysLeftStr = isFinishedGlobally ? "✔" : `${field.stageInfo?.daysUntilNextStage || 0}d left`; rowClass = "font-bold text-green-800 bg-green-50/30"; }
                    else if (isUpcoming) { daysLeftStr = `${stg.durationDays}d total`; rowClass = "text-gray-400"; }
                    return (
                      <tr key={i} className={rowClass}>
                        <td className="px-4 py-3 whitespace-nowrap">{icon}{stg.stageName}</td>
                        <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${isCurrent ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}>{stg.category}</span></td>
                        <td className="px-4 py-3 text-right tabular-nums">{stg.durationDays}d</td>
                        <td className="px-4 py-3 text-right tabular-nums">{daysLeftStr}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col">
            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2"><Clock className="w-5 h-5 text-gray-400" /> Field Updates</h2>
            <div className="flex-1 overflow-y-auto max-h-80 mb-6 pr-2 space-y-4">
              {field.updates?.length === 0 ? (
                <p className="text-gray-400 italic text-sm text-center py-6">No updates logged yet.</p>
              ) : (
                [...(field.updates || [])].reverse().map((update, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2" />
                      {i !== field.updates.length - 1 && <div className="w-px h-full bg-gray-100 my-1" />}
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 flex-1 border border-gray-100">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-bold uppercase text-green-700 bg-green-100 px-2 py-0.5 rounded">{update.stage}</span>
                        <span className="text-[10px] text-gray-400">{new Date(update.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-gray-700">{update.note}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <form onSubmit={submitUpdate} className="mt-auto border-t border-gray-100 pt-4">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Record an Observation</label>
              <textarea value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Observed conditions..." className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm mb-3 focus:ring-2 focus:ring-green-500" rows="3" required />
              <button type="submit" disabled={isUpdating} className="w-full bg-green-600 text-white font-bold text-sm py-2.5 rounded-xl hover:bg-green-700 transition disabled:opacity-50">{isUpdating ? 'Saving...' : 'Post Update'}</button>
            </form>
          </div>
        </div>

        {user?.role === 'admin' && (
          <div className="mt-12 pt-8 border-t border-gray-200 flex justify-center">
            <button onClick={handleDelete} className="px-6 py-2.5 bg-white text-red-600 border border-red-200 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-50 flex items-center gap-2 transition-colors">
              <Trash2 className="w-4 h-4" /> Delete Field Tracking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldDetails;
