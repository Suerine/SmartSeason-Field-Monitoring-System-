import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AgentDashboard from './pages/AgentDashboard';
import Navbar from './components/layouts/Navbar';
import Agents from './pages/Agents';
import Fields from './pages/Fields';
import FieldDetails from './pages/FieldDetails';
import Crops from './pages/Crops';
import CropDetails from './pages/CropDetails';

function PrivateRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-field-cream">
      {user && <Navbar />}
      <div className={user ? 'md:ml-56 pt-16 md:pt-0 pb-20 md:pb-0' : ''}>
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          
          <Route path="/" element={
            <PrivateRoute>
              {user?.role === 'admin' ? <AdminDashboard /> : <AgentDashboard />}
            </PrivateRoute>
          } />

          <Route path="/fields" element={
            <PrivateRoute><Fields /></PrivateRoute>
          } />

          <Route path="/fields/:id" element={
            <PrivateRoute><FieldDetails /></PrivateRoute>
          } />

          <Route path="/agents" element={
            <PrivateRoute role="admin"><Agents /></PrivateRoute>
          } />

          <Route path="/crops" element={
            <PrivateRoute><Crops /></PrivateRoute>
          } />

          <Route path="/crops/:id" element={
            <PrivateRoute><CropDetails /></PrivateRoute>
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}