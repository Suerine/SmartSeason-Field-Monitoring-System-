import React, { useState, useEffect, useMemo } from 'react';
import api, { API_PATHS } from '../../utils/apiPaths';
import { Leaf, Search, ListTree, Thermometer, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

const AgentCropsList = () => {
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
      setError('Failed to load crops');
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
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading crops library…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl border border-red-100">
          ⚠️ {error}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search crops..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      {filteredCrops.length === 0 ? (
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-12 text-center">
          <Leaf className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-800">No crops found</h3>
          <p className="text-sm text-gray-400 mt-1">Try a different search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCrops.map(crop => (
            <Link
              to={`/crops/${crop._id}`}
              key={crop._id}
              className="group bg-white rounded-2xl p-5 border-2 border-gray-200 hover:border-green-300 hover:shadow-md transition-all flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                  <Leaf className="w-5 h-5 text-green-600" />
                </div>
                <span className="bg-gray-50 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider border border-gray-100 flex items-center gap-1">
                  <ListTree className="w-3 h-3" /> {crop.growthStages?.length || 0}
                </span>
              </div>

              <h3 className="text-base font-black text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                {crop.name}
              </h3>

              <p className="text-xs text-gray-500 mb-4 line-clamp-2 min-h-[32px]">
                {crop.description || 'No description available.'}
              </p>

              <div className="mt-auto grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
                  <Thermometer className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                  <span className="truncate font-medium">{crop.optimalConditions?.temperature || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
                  <Droplets className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  <span className="truncate font-medium">{crop.optimalConditions?.humidity || 'N/A'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentCropsList;
