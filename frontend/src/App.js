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

  // Check if current route is an auth page
  const isAuthPage = ['/login', '/register', '/'].includes(location.pathname);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`app ${isAuthPage ? 'auth-layout' : ''}`}>
      {!isAuthPage ? (
        isAuthenticated ? (
          <>
            <Navbar 
              toggleSidebar={toggleSidebar} 
              isAuthenticated={isAuthenticated} 
              setIsAuthenticated={setIsAuthenticated}
            />
            <div className="d-flex">
              <Sidebar isOpen={sidebarOpen} />
              <main className={`main-content ${!sidebarOpen ? 'expanded' : ''}`}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/inventory/:itemId/batches" element={<Batches />} />
                  <Route path="/suppliers" element={<Suppliers />} />
                  <Route path="/admin/*" element={<AdminRoutes />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </main>
            </div>
          </>
        ) : (
          <Navigate to="/login" state={{ from: location.pathname }} replace />
        )
      ) : (
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Home />} />
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
