import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { config } from '@fortawesome/fontawesome-svg-core';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/manager/Dashboard';
import Inventory from './pages/manager/Inventory';
import Batches from './pages/manager/Batches';
import Suppliers from './pages/manager/Suppliers';
import AdminRoutes from './routes/AdminRoutes';
import ManagerRoutes from './routes/ManagerRoutes';

// Prevent Font Awesome from adding its CSS since we did it manually above
config.autoAddCss = false;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Check authentication status on initial load and route changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    
    // Close sidebar on route change for mobile
    if (window.innerWidth <= 992) {
      setSidebarOpen(false);
    }
  }, [location]);

  // Check if current route is an auth page, admin route, or manager route
  const isAuthPage = ['/login', '/register', '/'].includes(location.pathname);
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isManagerRoute = location.pathname.startsWith('/manager');

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`app ${isAuthPage ? 'auth-layout' : ''}`}>
      {!isAuthPage ? (
        isAuthenticated ? (
          <>
            {!isAuthPage && !isAdminRoute && !isManagerRoute && <Navbar toggleSidebar={toggleSidebar} />}
            <div className="d-flex">
              {!isAuthPage && !isAdminRoute && !isManagerRoute && <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
              <div className={`main-content ${!isAdminRoute && !isManagerRoute && sidebarOpen ? 'sidebar-open' : ''}`}>
                <Routes>
                  {/* Manager-specific routes */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/inventory/:itemId/batches" element={<Batches />} />
                  <Route path="/suppliers" element={<Suppliers />} />
                  
                  {/* Admin routes */}
                  <Route path="/admin/*" element={<AdminRoutes />} />
                  
                  {/* Manager routes */}
                  <Route path="/manager/*" element={<ManagerRoutes />} />
                  
                  {/* Redirect any other route to dashboard based on user role */}
                  <Route path="*" element={
                    localStorage.getItem('isAdmin') === 'true' 
                      ? <Navigate to="/admin/dashboard" replace /> 
                      : <Navigate to="/dashboard" replace />
                  } />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <Navigate to="/login" state={{ from: location.pathname }} replace />
        )
      ) : (
        <Routes>
          <Route path="/" element={isAuthenticated ? 
            (localStorage.getItem('isAdmin') === 'true' ? 
              <Navigate to="/admin/dashboard" replace /> : 
              <Navigate to="/dashboard" replace />) : 
            <Home />} 
          />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
                (localStorage.getItem('isAdmin') === 'true' ? 
                  <Navigate to="/admin/dashboard" replace /> : 
                  <Navigate to="/dashboard" replace />) : 
                <Login setIsAuthenticated={setIsAuthenticated} />
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Register />
            } 
          />
        </Routes>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
