import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt,
  faBoxes,
  faTruck,
  faUsers,
  faBars,
  faTimes,
  faSignOutAlt,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';

const ManagerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    // Handle logout logic
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out w-64 bg-white shadow-lg z-10`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-blue-600">Manager Panel</h1>
            <button 
              className="lg:hidden text-gray-500 hover:text-gray-600"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            <Link
              to="/manager/dashboard"
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
              to="/manager/inventory"
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive('inventory')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <FontAwesomeIcon 
                icon={faBoxes}
                className={`mr-3 h-5 w-5 ${
                  isActive('inventory') ? 'text-blue-500' : 'text-gray-400'
                }`}
              />
              Inventory
            </Link>

            <Link
              to="/manager/suppliers"
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive('suppliers')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <FontAwesomeIcon 
                icon={faTruck}
                className={`mr-3 h-5 w-5 ${
                  isActive('suppliers') ? 'text-blue-500' : 'text-gray-400'
                }`}
              />
              Suppliers
            </Link>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faUserCircle} className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Manager</p>
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
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              onClick={toggleSidebar}
              aria-label="Open menu"
            >
              <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-medium text-gray-800">
              {isActive('dashboard') && 'Dashboard'}
              {isActive('inventory') && 'Inventory Management'}
              {isActive('suppliers') && 'Suppliers'}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                <FontAwesomeIcon icon={faUserCircle} className="h-6 w-6" />
              </button>
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

export default ManagerLayout;
