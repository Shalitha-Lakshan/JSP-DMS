import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes, faExclamationTriangle, faClock, faCoins } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  // Sample data - in a real app, this would come from an API
  const stats = [
    { 
      title: 'Total Items', 
      value: '1,254', 
      icon: <FontAwesomeIcon icon={faBoxes} className="text-white opacity-75" size="2x" />,
      bgClass: 'bg-primary',
      link: '/inventory'
    },
    { 
      title: 'Low Stock', 
      value: '42', 
      icon: <FontAwesomeIcon icon={faExclamationTriangle} className="text-white opacity-75" size="2x" />,
      bgClass: 'bg-warning',
      link: '/inventory/low-stock'
    },
    { 
      title: 'Expiring Soon', 
      value: '18', 
      icon: <FontAwesomeIcon icon={faClock} className="text-white opacity-75" size="2x" />,
      bgClass: 'bg-danger',
      link: '/inventory/expiring-soon'
    },
    { 
      title: 'In Stock Value', 
      value: 'LKR 2.4M', 
      icon: <FontAwesomeIcon icon={faCoins} className="text-white opacity-75" size="2x" />,
      bgClass: 'bg-success',
      link: '/inventory'
    }
  ];

  // Recent activities sample data
  const recentActivities = [
    { id: 1, action: 'Added new batch', item: 'Chili Powder', time: '2 hours ago', icon: 'plus-circle', color: 'success' },
    { id: 2, action: 'Updated stock', item: 'Premium Coffee', time: '5 hours ago', icon: 'edit', color: 'primary' },
    { id: 3, action: 'Low stock alert', item: 'Red Lentils', time: '1 day ago', icon: 'exclamation-triangle', color: 'warning' },
    { id: 4, action: 'New supplier added', item: 'ABC Spices Ltd', time: '2 days ago', icon: 'truck', color: 'info' },
    { id: 5, action: 'Batch expired', item: 'Coconut Milk Powder', time: '3 days ago', icon: 'times-circle', color: 'danger' },
  ];

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">
              Export
            </button>
          </div>
          <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
            This week
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        {stats.map((stat, index) => (
          <div className="col-md-3 mb-3" key={index}>
            <Link to={stat.link} className="text-decoration-none">
              <div className={`card text-white h-100 ${stat.bgClass}`}>
                <div className="card-body py-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="card-title mb-1">{stat.title}</h6>
                      <h2 className="mb-0">{stat.value}</h2>
                    </div>
                    {stat.icon}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="row">
        {/* Recent Activities */}
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="mb-0">Recent Activities</h5>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="list-group-item border-0 py-3 px-4">
                    <div className="d-flex align-items-center">
                      <div className={`bg-${activity.color} bg-opacity-10 text-${activity.color} rounded-circle d-flex align-items-center justify-content-center me-3`} style={{ width: '40px', height: '40px' }}>
                        <i className={`fas fa-${activity.icon} fa-fw`}></i>
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">{activity.action}</h6>
                          <small className="text-muted">{activity.time}</small>
                        </div>
                        <small className="text-muted">{activity.item}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-footer bg-transparent border-top-0 text-end">
              <Link to="/activities" className="btn btn-sm btn-link">View All Activities</Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-6">
                  <Link to="/inventory/new" className="text-decoration-none">
                    <div className="card h-100 border-0 shadow-sm hover-shadow">
                      <div className="card-body text-center">
                        <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style={{ width: '60px', height: '60px' }}>
                          <i className="fas fa-plus fa-2x"></i>
                        </div>
                        <h6 className="mb-0">Add New Item</h6>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-6">
                  <Link to="/batches" className="text-decoration-none">
                    <div className="card h-100 border-0 shadow-sm hover-shadow">
                      <div className="card-body text-center">
                        <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style={{ width: '60px', height: '60px' }}>
                          <i className="fas fa-boxes fa-2x"></i>
                        </div>
                        <h6 className="mb-0">Manage Batches</h6>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-6">
                  <Link to="/inventory/low-stock" className="text-decoration-none">
                    <div className="card h-100 border-0 shadow-sm hover-shadow">
                      <div className="card-body text-center">
                        <div className="bg-warning bg-opacity-10 text-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style={{ width: '60px', height: '60px' }}>
                          <i className="fas fa-exclamation-triangle fa-2x"></i>
                        </div>
                        <h6 className="mb-0">Low Stock Alerts</h6>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-6">
                  <Link to="/reports" className="text-decoration-none">
                    <div className="card h-100 border-0 shadow-sm hover-shadow">
                      <div className="card-body text-center">
                        <div className="bg-info bg-opacity-10 text-info rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style={{ width: '60px', height: '60px' }}>
                          <i className="fas fa-chart-bar fa-2x"></i>
                        </div>
                        <h6 className="mb-0">View Reports</h6>
                      </div>
                    </div>
                  </Link>
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
