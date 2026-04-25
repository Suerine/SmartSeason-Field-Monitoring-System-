import React, { useState, useEffect } from 'react';
import api, { API_PATHS } from '../utils/apiPaths';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, AlertCircle, RefreshCw } from 'lucide-react';
import AgentFieldCard from '../components/agent-dashboard/AgentFieldCard';
import FieldActionPanel from '../components/agent-dashboard/FieldActionPanel';

const AgentDashboard = () => {
  const { user } = useAuth();
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedField, setSelectedField] = useState(null);

  const fetchFields = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get(API_PATHS.FIELDS.GET_ALL_FIELDS);
      setFields(data);
    } catch (err) {
      console.error('Error fetching agent fields:', err);
      setError('Could not load your fields. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFields();
  }, []);

  const handleUpdate = async (updateData) => {
    try {
      const { data } = await api.put(API_PATHS.FIELDS.UPDATE_FIELD(selectedField._id), updateData);
      
      // Update the fields list with the new data
      setFields(prev => prev.map(f => f._id === data._id ? data : f));
      
      // Update selected field to reflect changes in the panel
      setSelectedField(data);
    } catch (err) {
      console.error('Error updating field:', err);
      throw err; // Re-throw to be handled by the form's error state
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-bold animate-pulse">Loading your daily tasks...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* App Header */}
      <header className="bg-white border-b border-gray-100 p-6 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-sm font-black text-emerald-600 uppercase tracking-widest mb-1">
              Agent Portal
            </h1>
            <p className="text-2xl font-black text-gray-900 leading-none">
              My Fields
            </p>
          </div>
          <button 
            onClick={fetchFields}
            className="p-3 bg-gray-50 text-gray-400 rounded-2xl active:rotate-180 transition-all duration-500"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 pb-24 max-w-2xl mx-auto">
        {error ? (
          <div className="bg-red-50 border-2 border-red-100 p-6 rounded-3xl flex flex-col items-center text-center">
            <AlertCircle className="text-red-500 w-12 h-12 mb-4" />
            <h3 className="text-red-900 font-black text-xl mb-2">Sync Error</h3>
            <p className="text-red-700 font-medium mb-6">{error}</p>
            <button 
              onClick={fetchFields}
              className="px-8 py-3 bg-red-600 text-white rounded-2xl font-bold shadow-lg shadow-red-100"
            >
              Retry Connection
            </button>
          </div>
        ) : fields.length > 0 ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-4 text-gray-400">
              <LayoutDashboard size={16} />
              <span className="text-xs font-black uppercase tracking-widest">
                {fields.length} Fields Assigned
              </span>
            </div>
            
            {fields.map(field => (
              <AgentFieldCard 
                key={field._id} 
                field={field} 
                onClick={setSelectedField} 
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-12 flex flex-col items-center text-center">
            <div className="bg-gray-50 p-6 rounded-full mb-6">
              <LayoutDashboard className="text-gray-300 w-12 h-12" />
            </div>
            <h3 className="text-gray-900 font-black text-xl mb-2">No Fields Assigned</h3>
            <p className="text-gray-500 font-medium">
              You don't have any fields assigned to you yet. Contact your administrator to get started.
            </p>
          </div>
        )}
      </main>

      {/* Detail Overlay */}
      {selectedField && (
        <FieldActionPanel 
          field={selectedField}
          onClose={() => setSelectedField(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default AgentDashboard;