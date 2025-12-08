import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserCog, 
  faUsers, 
  faBox, 
  faChartBar, 
  faSignOutAlt,
  faHome
} from '@fortawesome/free-solid-svg-icons';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-indigo-700 text-white">
        <div className="flex items-center justify-center h-16 bg-indigo-800">
          <h1 className="text-xl font-bold">JSP Admin</h1>
        </div>
        <nav className="mt-6">
          <div className="px-6 py-3 text-xs font-semibold text-indigo-200 uppercase tracking-wider">
            Main
          </div>
          <div className="mt-2">
            <Link 
              to="/admin/dashboard" 
              className="flex items-center px-6 py-3 text-indigo-100 hover:bg-indigo-600"
            >
              <FontAwesomeIcon icon={faChartBar} className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <Link 
              to="/admin/staff" 
              className="flex items-center px-6 py-3 text-indigo-100 hover:bg-indigo-600 bg-indigo-600"
            >
              <FontAwesomeIcon icon={faUsers} className="w-5 h-5 mr-3" />
              Staff Management
            </Link>
            <Link 
              to="/admin/inventory" 
              className="flex items-center px-6 py-3 text-indigo-100 hover:bg-indigo-600"
            >
              <FontAwesomeIcon icon={faBox} className="w-5 h-5 mr-3" />
              Inventory
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Navigation */}
        <header className="bg-white shadow">
          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex items-center">
              <Link to="/" className="text-indigo-600 hover:text-indigo-800 mr-4">
                <FontAwesomeIcon icon={faHome} />
              </Link>
              <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Admin</span>
                <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center">
                  <FontAwesomeIcon icon={faUserCog} className="text-indigo-600" />
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="text-gray-600 hover:text-indigo-600"
                title="Logout"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
