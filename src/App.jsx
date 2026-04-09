import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateResume from './pages/CreateResume';
import EditResume from './pages/EditResume';
import Landing from './pages/Landing';
import { useAuth } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" />;
  return children;
};

const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (currentUser) return <Navigate to="/dashboard" />;
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/resume/new" element={
        <ProtectedRoute>
          <DashboardLayout>
            <CreateResume />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/resume/:id" element={
        <ProtectedRoute>
          <DashboardLayout>
            <EditResume />
          </DashboardLayout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
