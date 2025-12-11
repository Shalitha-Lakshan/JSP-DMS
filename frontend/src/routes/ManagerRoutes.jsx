import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ManagerLayout from '../pages/manager/ManagerLayout';
import Dashboard from '../pages/manager/Dashboard';
import Inventory from '../pages/manager/Inventory';
import Batches from '../pages/manager/Batches';
import Suppliers from '../pages/manager/Suppliers';

const ManagerRoutes = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isManager, setIsManager] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    
    setIsAuthenticated(!!token);
    setIsManager(userRole === 'manager');
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated || !isManager) {
    // Store the intended URL before redirecting to login
    localStorage.setItem('redirectAfterLogin', '/manager/dashboard');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <ManagerLayout>
      <Routes>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="inventory/:itemId/batches" element={<Batches />} />
        <Route path="suppliers" element={<Suppliers />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </ManagerLayout>
  );
};

export default ManagerRoutes;
