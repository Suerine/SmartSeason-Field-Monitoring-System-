import React, { useState } from 'react';
import api, { API_PATHS } from '../utils/apiPaths';
import { UserPlus, X, Mail, User, Lock, ShieldCheck } from 'lucide-react';

const CreateAgentModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'agent'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post(API_PATHS.USERS.CREATE_USER, formData);
      onSuccess();
      onClose();
      // Reset form
      setFormData({ name: '', email: '', password: '', role: 'agent' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create agent account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Subtle Decorative Header BG */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-emerald-50 -z-10" />
        
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <UserPlus className="w-6 h-6 text-emerald-600" />
                Add New Agent
              </h2>
              <p className="text-gray-500 text-sm mt-1">Register a new field agent to the SmartSeason platform.</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  placeholder="e.g. John Smith"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  placeholder="john@smartseason.com"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">System Role</label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all appearance-none"
                >
                  <option value="agent">Field Agent</option>
                  <option value="admin">System Administrator</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-2.5 rounded-full font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Agent'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAgentModal;
