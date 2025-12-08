import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faWarehouse, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ toggleSidebar, isAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('user');
    
    // Redirect to login page
    navigate('/login', { replace: true });
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div className="container-fluid px-3">
        <button 
          className="btn btn-link text-white p-0 me-2" 
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FontAwesomeIcon icon={faBars} className="fs-4" />
        </button>
        
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FontAwesomeIcon icon={faWarehouse} className="me-2" />
          <span>JSP Distributor</span>
        </Link>
        
        <div className="ms-auto d-flex align-items-center">
          <div className="text-light me-3 d-flex align-items-center">
            <FontAwesomeIcon icon={faUserCircle} className="me-1" />
            <span>Admin</span>
          </div>
          <button 
            className="btn btn-outline-light btn-sm"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="me-1" /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
