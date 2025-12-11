import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers,
  faBox,
  faDollarSign,
  faChartLine,
  faClock,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

const StatCard = ({ icon, title, value, change, isPositive = true }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-blue-100 text-blue-600">
        <FontAwesomeIcon icon={icon} className="h-6 w-6" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="flex items-center">
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {change && (
            <span className={`ml-2 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {change}%
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

const RecentActivityItem = ({ icon, title, time, isWarning = false }) => (
  <div className="flex items-start py-3">
    <div className={`p-2 rounded-full ${isWarning ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
      <FontAwesomeIcon icon={icon} className="h-4 w-4" />
    </div>
    <div className="ml-4">
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const stats = [
    { icon: faUsers, title: 'Total Staff', value: '24', change: 12 },
    { icon: faBox, title: 'Inventory Items', value: '1,234', change: 8 },
    { icon: faDollarSign, title: 'Monthly Revenue', value: '$12,345', change: -2 },
    { icon: faChartLine, title: 'Productivity', value: '87%', change: 5 },
  ];

  const recentActivities = [
    { icon: faBox, title: 'New inventory item added', time: '5 minutes ago' },
    { icon: faUsers, title: 'New staff member onboarded', time: '1 hour ago' },
    { 
      icon: faExclamationTriangle, 
      title: 'Low stock alert: Item #1234', 
      time: '3 hours ago',
      isWarning: true 
    },
    { icon: faClock, title: 'Scheduled maintenance', time: 'Yesterday' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Overview</h2>
        <p className="mt-1 text-sm text-gray-500">Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} isPositive={stat.change >= 0} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-base font-medium text-gray-900">Recent Activity</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {recentActivities.map((activity, index) => (
                <RecentActivityItem 
                  key={index} 
                  {...activity} 
                  isWarning={activity.isWarning}
                />
              ))}
            </div>
            <div className="px-6 py-3 bg-gray-50 text-center">
              <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                View all activity
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-base font-medium text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-4 space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Add New Item
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Generate Report
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Manage Staff
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-base font-medium text-gray-900">System Status</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <div className="flex justify-between text-sm font-medium text-gray-900 mb-1">
                  <span>Storage</span>
                  <span>65% used</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium text-gray-900 mb-1">
                  <span>Database</span>
                  <span className="text-green-600">Operational</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium text-gray-900 mb-1">
                  <span>Last Backup</span>
                  <span>Today, 2:00 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
