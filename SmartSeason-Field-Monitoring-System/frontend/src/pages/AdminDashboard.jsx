import React from 'react';
import { useAuth } from '../context/AuthContext';
import InsightsDashboard from '../components/admin-dashboard/InsightsDashboard';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="py-8 px-6 min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Admin Insights
        </h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Welcome back, <span className="font-semibold text-gray-600">{user?.name}</span> — here's your field overview.
        </p>
      </div>

      <InsightsDashboard />
    </div>
  );
};

export default AdminDashboard;