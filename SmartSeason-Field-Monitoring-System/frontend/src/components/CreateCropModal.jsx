import React, { useState } from 'react';
import api, { API_PATHS } from '../utils/apiPaths';
import { Leaf, X, Plus, Trash2, ArrowRight, ArrowLeft, ListTree } from 'lucide-react';


const CreateCropModal = ({ isOpen, onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    optimalConditions: {
      temperature: '',
      humidity: '',
      soilType: ''
    },
    growthStages: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("Crop Name is strictly required.");
      return;
    }
    setError(null);
    setCurrentStep(2);
  };

  const addStage = () => {
    setFormData({
      ...formData,
      growthStages: [
        ...formData.growthStages,
        { stageName: '', category: 'Planted', durationDays: 0, careInstructions: '' }
      ]
    });
  };

  const removeStage = (idx) => {
    const clone = [...formData.growthStages];
    clone.splice(idx, 1);
    setFormData({ ...formData, growthStages: clone });
  };

  const updateStage = (idx, field, value) => {
    const clone = [...formData.growthStages];
    if (field === 'durationDays') clone[idx][field] = parseInt(value, 10) || 0;
    else clone[idx][field] = value;
    setFormData({ ...formData, growthStages: clone });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic Validation
    for (let i = 0; i < formData.growthStages.length; i++) {
      const stg = formData.growthStages[i];
      if (!stg.stageName.trim()) {
        setError(`Stage sequence #${i + 1} is missing a descriptive Stage Name.`);
        setLoading(false);
        return;
      }
    }

    try {
      await api.post(API_PATHS.CROPS.ADD_CROP, formData);
      // Reset State entirely before flushing
      setFormData({
        name: '', description: '',
        optimalConditions: { temperature: '', humidity: '', soilType: '' },
        growthStages: []
      });
      setCurrentStep(1);

      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create crop template.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl relative my-8">
        <div className="p-6 md:p-8">

          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <Leaf className="w-6 h-6 text-emerald-600" />
                {currentStep === 1 ? 'Phase 1: Blueprint Origin' : 'Phase 2: Lifecycle Schedule'}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {currentStep === 1
                  ? 'Define optimal metrics and metadata for a new field crop.'
                  : 'Construct the strict progression of phase milestones this crop endures.'}
              </p>
            </div>
            <button
              onClick={() => {
                setError(null);
                setCurrentStep(1);
                onClose();
              }}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="mb-8 relative flex items-center justify-center w-full px-6 text-sm font-bold">
            <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-gray-100 rounded-full z-0"></div>
            <div className="w-full flex justify-between z-10 px-8">
              <span className={`px-4 py-1 rounded-full border-2 transition-colors ${currentStep === 1 ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-emerald-600 text-emerald-600'}`}>1. Generic Profile</span>
              <span className={`px-4 py-1 rounded-full border-2 transition-colors ${currentStep === 2 ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-gray-200 text-gray-300'}`}>2. Define Stages</span>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          {currentStep === 1 ? (
            <form onSubmit={handleNextStep} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Crop Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  placeholder="e.g. Arabica Coffee"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">General Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all resize-none"
                  placeholder="Brief summary of the crop characteristics..."
                  rows="3"
                />
              </div>

              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <h3 className="text-sm font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">Optimal Environmental Conditions</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Temperature</label>
                    <input
                      type="text"
                      value={formData.optimalConditions.temperature}
                      onChange={e => setFormData({
                        ...formData,
                        optimalConditions: { ...formData.optimalConditions, temperature: e.target.value }
                      })}
                      className="w-full bg-white border border-gray-200 text-gray-900 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      placeholder="e.g. 15-24°C"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Humidity</label>
                    <input
                      type="text"
                      value={formData.optimalConditions.humidity}
                      onChange={e => setFormData({
                        ...formData,
                        optimalConditions: { ...formData.optimalConditions, humidity: e.target.value }
                      })}
                      className="w-full bg-white border border-gray-200 text-gray-900 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      placeholder="e.g. 60-80%"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Soil Type / Target</label>
                    <input
                      type="text"
                      value={formData.optimalConditions.soilType}
                      onChange={e => setFormData({
                        ...formData,
                        optimalConditions: { ...formData.optimalConditions, soilType: e.target.value }
                      })}
                      className="w-full bg-white border border-gray-200 text-gray-900 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      placeholder="e.g. Well-drained, slightly acidic loam"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="submit"
                  className="px-8 py-2.5 rounded-full font-bold text-white bg-gray-900 hover:bg-black transition-colors flex items-center gap-2"
                >
                  Proceed to Stages <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Dynamically Populated Stages Block */}
              <div className="max-h-96 overflow-y-auto pr-2 space-y-4">
                {formData.growthStages.length === 0 ? (
                  <div className="border border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center text-center">
                    <ListTree className="w-10 h-10 text-gray-300 mb-2" />
                    <p className="text-gray-500 font-medium">No stages configured yet.</p>
                    <p className="text-gray-400 text-sm mt-1 mb-4 max-w-sm">Crops lacking growth stages won't have timeline tracking logic on Field Dashboard.</p>
                  </div>
                ) : (
                  formData.growthStages.map((stage, idx) => (
                    <div key={idx} className="bg-white border hover:border-emerald-200 border-gray-200 p-5 rounded-2xl relative shadow-sm group transition-all">

                      {/* Destructive Control */}
                      <button
                        type="button"
                        onClick={() => removeStage(idx)}
                        title="Remove Stage"
                        className="absolute top-4 right-4 text-red-300 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 pr-8">
                        <div className="md:col-span-1">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Phase Classification</label>
                          <select
                            value={stage.category}
                            onChange={(e) => updateStage(idx, 'category', e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder-gray-400 font-bold"
                          >
                            <option value="Planted">Planted Phase</option>
                            <option value="Growing">Growing Phase</option>
                            <option value="Ready">Ready Phase</option>
                            <option value="Harvested">Harvested Phase</option>
                          </select>
                        </div>

                        <div className="md:col-span-1">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Descriptor Bound</label>
                          <input
                            type="text"
                            required
                            value={stage.stageName}
                            placeholder="e.g. Seeding"
                            onChange={(e) => updateStage(idx, 'stageName', e.target.value)}
                            className="w-full bg-white border border-gray-200 text-gray-900 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder-gray-300 font-bold"
                          />
                        </div>

                        <div className="md:col-span-1">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Est. Duration</label>
                          <div className="relative">
                            <input
                              type="number"
                              min="0"
                              value={stage.durationDays}
                              onChange={(e) => updateStage(idx, 'durationDays', e.target.value)}
                              className="w-full bg-white border border-gray-200 text-gray-900 rounded-lg pl-3 pr-10 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder-gray-300 font-bold font-mono"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">Days</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Care & Attention Instructions</label>
                        <textarea
                          value={stage.careInstructions}
                          onChange={(e) => updateStage(idx, 'careInstructions', e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all resize-none"
                          placeholder="Note specific watering requirements, pruning schedules, etc."
                          rows="2"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border border-dashed border-emerald-300 bg-emerald-50/50 p-4 rounded-2xl flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">Total Lifecycle Blocks: {formData.growthStages.length}</p>
                  <p className="text-xs text-gray-500 mt-1 max-w-sm">Stages will be cleanly mapped timeline items when agents manage field instances of this base class.</p>
                </div>
                <button
                  type="button"
                  onClick={addStage}
                  className="px-4 py-2 border border-emerald-200 bg-white text-emerald-700 text-xs font-bold rounded-xl hover:bg-emerald-100 hover:border-emerald-300 transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" /> Expand Stage
                </button>
              </div>

              <div className="flex gap-3 justify-between pt-4 border-t border-gray-100 mt-2">
                <button
                  type="button"
                  onClick={() => { setError(null); setCurrentStep(1); }}
                  className="px-6 py-2.5 rounded-full font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 transition-colors flex items-center gap-2"
                  disabled={loading}
                >
                  <ArrowLeft className="w-4 h-4" /> Go Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-2.5 rounded-full font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-md disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Establish Blueprint'}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default CreateCropModal;
