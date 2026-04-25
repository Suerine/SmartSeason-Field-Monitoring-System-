import React, { useState, useEffect } from 'react';
import api, { API_PATHS } from '../utils/apiPaths';
import { X, Sprout, Loader2 } from 'lucide-react';

const CreateFieldModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    cropType: '',
    plantingDate: '',
    currentStage: 'Planted',
    assignedAgent: ''
  });

  const [crops, setCrops] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loadingMeta, setLoadingMeta] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchMetadata();
      // Reset form when opened
      setFormData({
        name: '',
        cropType: '',
        plantingDate: new Date().toISOString().split('T')[0],
        currentStage: 'Planted',
        assignedAgent: ''
      });
      setError(null);
    }
  }, [isOpen]);

  const fetchMetadata = async () => {
    try {
      setLoadingMeta(true);
      const [cropsRes, agentsRes] = await Promise.all([
        api.get(API_PATHS.FIELDS.META_CROPS),
        api.get(API_PATHS.FIELDS.META_AGENTS)
      ]);
      setCrops(cropsRes.data);
      setAgents(agentsRes.data);
      
      // Auto-select first item if available to speed up entry
      if (cropsRes.data.length > 0) {
        setFormData(prev => ({ ...prev, cropType: cropsRes.data[0]._id }));
      }
    } catch (err) {
      console.error("Failed to load metadata dropdowns", err);
      setError("Failed to load crops/agents data. Please close and try again.");
    } finally {
      setLoadingMeta(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    // Cleanup empty strings for optional fields or defaults
    const payload = { ...formData };
    if (!payload.assignedAgent) delete payload.assignedAgent;
    
    try {
      await api.post(API_PATHS.FIELDS.ADD_FIELD, payload);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create field');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
      <div 
        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 leading-tight">Create New Field</h2>
              <p className="text-xs text-gray-500 font-medium">Add a new plot to the monitoring system</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-100 hover:text-gray-600 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
              {error}
            </div>
          )}

          {loadingMeta ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-emerald-600">
              <Loader2 className="w-8 h-8 animate-spin" />
              <p className="text-sm font-medium text-gray-500">Loading form data...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Field Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. North Plot Sector A"
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow outline-none text-gray-800 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Crop Type</label>
                  <select
                    name="cropType"
                    value={formData.cropType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow outline-none text-gray-800"
                  >
                    <option value="" disabled>Select Crop</option>
                    {crops.map(crop => (
                      <option key={crop._id} value={crop._id}>{crop.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Planting Date</label>
                  <input
                    type="date"
                    name="plantingDate"
                    value={formData.plantingDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow outline-none text-gray-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Stage</label>
                  <select
                    name="currentStage"
                    value={formData.currentStage}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow outline-none text-gray-800"
                  >
                    <option value="Planted">Planted</option>
                    <option value="Growing">Growing</option>
                    <option value="Ready">Ready</option>
                    <option value="Harvested">Harvested</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Assign Agent (Optional)</label>
                  <select
                    name="assignedAgent"
                    value={formData.assignedAgent}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow outline-none text-gray-800"
                  >
                    <option value="">Unassigned</option>
                    {agents.map(agent => (
                      <option key={agent._id} value={agent._id}>{agent.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 w-full border-t border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-sm shadow-emerald-600/30 flex items-center justify-center min-w-[120px]"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Field'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateFieldModal;
