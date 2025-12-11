import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt,
  faUsers, 
  faBox, 
  faFileAlt,
  faCogs,
  faSignOutAlt,
  faBars,
  faTimes,
  faUserCircle,
  faUserShield,
  faUsersCog
} from '@fortawesome/free-solid-svg-icons';

const AdminLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isActive = (path) => {
    // Get the current path segments
    const segments = location.pathname.split('/').filter(Boolean);
    
    // For admin routes, the path will be ['admin', ...rest]
    if (segments[0] === 'admin') {
      // If we're at /admin, check if the path is dashboard
      if (segments.length === 1) {
        return path === 'dashboard';
      }
      // Handle nested routes like /admin/inventory/something
      if (segments[1] === path) {
        return true;
      }
      // Handle the case where we're at /admin/dashboard (exact match)
      if (segments[1] === 'dashboard' && path === 'dashboard') {
        return true;
      }
    }
    return false;
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    window.location.href = '/login';
  };

  const getPageTitle = () => {
    if (isActive('dashboard')) return 'Dashboard';
    if (isActive('staff')) return 'Staff Management';
    if (isActive('inventory')) return 'Inventory Management';
    if (isActive('reports')) return 'Reports';
    if (isActive('settings')) return 'Settings';
    return 'Dashboard';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out w-64 bg-white shadow-lg z-10`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-blue-600">Admin Panel</h1>
            <button 
              className="lg:hidden text-gray-500 hover:text-gray-600"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            <Link
              to="/admin/dashboard"
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive('dashboard')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <FontAwesomeIcon 
                icon={faTachometerAlt}
                className={`mr-3 h-5 w-5 ${
                  isActive('dashboard') ? 'text-blue-500' : 'text-gray-400'
                }`}
              />
              Dashboard
            </Link>

            <Link
              to="/admin/staff"
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive('staff')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <FontAwesomeIcon 
                icon={faUsers}
                className={`mr-3 h-5 w-5 ${
                  isActive('staff') ? 'text-blue-500' : 'text-gray-400'
                }`}
              />
              Staff Management
            </Link>

            <Link
              to="/admin/inventory"
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive('inventory')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <FontAwesomeIcon 
                icon={faBox}
                className={`mr-3 h-5 w-5 ${
                  isActive('inventory') ? 'text-blue-500' : 'text-gray-400'
                }`}
              />
              Inventory
            </Link>

            <Link
              to="/admin/reports"
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive('reports')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <FontAwesomeIcon 
                icon={faFileAlt}
                className={`mr-3 h-5 w-5 ${
                  isActive('reports') ? 'text-blue-500' : 'text-gray-400'
                }`}
              />
              Reports
            </Link>

            <Link
              to="/admin/settings"
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive('settings')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <FontAwesomeIcon 
                icon={faCogs}
                className={`mr-3 h-5 w-5 ${
                  isActive('settings') ? 'text-blue-500' : 'text-gray-400'
                }`}
              />
              Settings
            </Link>
          </nav>

          {/* User profile section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faUserCircle} className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Admin</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-3 w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-600 lg:hidden"
                onClick={toggleSidebar}
                aria-label="Open menu"
              >
                <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
              </button>
              <h1 className="ml-4 text-lg font-medium text-gray-800">
                {getPageTitle()}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <FontAwesomeIcon icon={faUserShield} className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
