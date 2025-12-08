import React from 'react';

const Dashboard = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="bg-indigo-50 p-6 rounded-lg">
          <h3 className="text-gray-500 text-sm font-medium">Total Staff</h3>
          <p className="text-3xl font-bold text-indigo-600">24</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-gray-500 text-sm font-medium">Active Users</h3>
          <p className="text-3xl font-bold text-green-600">18</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg">
          <h3 className="text-gray-500 text-sm font-medium">Pending Requests</h3>
          <p className="text-3xl font-bold text-yellow-600">5</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
          <p className="text-3xl font-bold text-purple-600">$12,345</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
