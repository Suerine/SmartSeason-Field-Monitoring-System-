import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api, { API_PATHS } from '../utils/apiPaths';
import { useAuth } from '../context/AuthContext';
import { Leaf, Search, Plus, ListTree, Thermometer, Droplets } from 'lucide-react';
import CreateCropModal from '../components/CreateCropModal';

const Crops = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(API_PATHS.CROPS.GET_ALL_CROPS);
      setCrops(data);
    } catch (err) {
      setError("Failed to load crops data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCrops = useMemo(() => {
    return crops.filter(crop =>
      crop.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [crops, searchTerm]);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading crops library...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="max-w-xl mx-auto bg-red-50 border border-red-100 p-6 rounded-2xl text-center">
          <h3 className="text-red-800 font-bold mb-1">Error</h3>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto mb-8">

        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <Leaf className="text-green-600 w-6 h-6" /> Crop Types Library
            </h1>
            <p className="text-sm text-gray-500 mt-1">Manage global generic crop definitions and optimal parameters.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search crops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium focus:ring-2 focus:ring-green-500 focus:outline-none w-full sm:w-64"
              />
            </div>
            {user?.role === 'admin' && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 px-5 py-2 bg-green-600 text-white text-sm font-semibold rounded-full hover:bg-green-700 transition-all shadow-lg shadow-green-100 shrink-0"
              >
                <Plus className="w-4 h-4" /> Add Crop
              </button>
            )}
          </div>
        </div>

        {/* Crops Grid */}
        {filteredCrops.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-sm">
            <Leaf className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800">No crops found</h3>
            <p className="text-gray-500 mt-2">Does not match your search parameter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCrops.map(crop => (
              <Link
                to={`/crops/${crop._id}`}
                key={crop._id}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-green-200 hover:shadow-md transition-all group flex flex-col h-full cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors shrink-0">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="bg-gray-50 text-gray-500 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-gray-100 flex items-center gap-1.5">
                    <ListTree className="w-3 h-3" /> {crop.growthStages?.length || 0} Stages
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 truncate group-hover:text-green-700 transition-colors">
                  {crop.name}
                </h3>

                <p className="text-sm text-gray-500 mb-6 line-clamp-2 min-h-[40px]">
                  {crop.description || "No specific generic description provided."}
                </p>

                <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Thermometer className="w-4 h-4 text-orange-400" />
                    <span className="truncate">{crop.optimalConditions?.temperature || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Droplets className="w-4 h-4 text-blue-400" />
                    <span className="truncate">{crop.optimalConditions?.humidity || 'N/A'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
      <CreateCropModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => fetchCrops()}
      />
    </div>
  );
};

export default Crops;