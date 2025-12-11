import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import Dashboard from './Dashboard';
import StaffManagement from './StaffManagement';
import Inventory from './Inventory';
import Reports from './Reports';
import Settings from './Settings';
import PageNotFound from '../../components/PageNotFound';

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="staff/*" element={<StaffManagement />} />
        <Route path="inventory/*" element={<Inventory />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
