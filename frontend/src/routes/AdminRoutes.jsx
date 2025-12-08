import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../pages/admin/AdminLayout';
import Dashboard from '../pages/admin/AdminDashboard';
import StaffList from '../pages/admin/StaffList';

const AdminRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('token');
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    
    setIsAuthenticated(!!token);
    setIsAdmin(adminStatus);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated || !isAdmin) {
    // Store the intended URL before redirecting to login
    localStorage.setItem('redirectAfterLogin', '/admin/dashboard');
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="staff" element={<StaffList />} />
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
