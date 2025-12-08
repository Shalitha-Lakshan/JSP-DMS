import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faBoxes, 
  faBoxOpen, 
  faTruck,
  faListUl,
  faExclamationTriangle,
  faClock,
  faTags
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const isInventoryActive = location.pathname.startsWith('/inventory');

  const navItems = [
    { to: "/", icon: faTachometerAlt, label: "Dashboard" },
    { to: "/inventory", icon: faBoxes, label: "Inventory" },
    { to: "/batches", icon: faBoxOpen, label: "Batches" },
    { to: "/suppliers", icon: faTruck, label: "Suppliers" },
  ];

  const subNavItems = [
    { to: "/inventory/all", icon: faListUl, label: "All Items" },
    { to: "/inventory/low-stock", icon: faExclamationTriangle, label: "Low Stock" },
    { to: "/inventory/expiring-soon", icon: faClock, label: "Expiring Soon" },
    { to: "/inventory/categories", icon: faTags, label: "Categories" },
  ];

  return (
    <div className={`sidebar ${isOpen ? '' : 'collapsed'}`}>
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.to || 
                          (item.to === "/inventory" && isInventoryActive);
                          
            return (
              <li className="nav-item" key={index}>
                <NavLink 
                  to={item.to} 
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  <FontAwesomeIcon icon={item.icon} className="me-2" />
                  <span className="nav-text">{item.label}</span>
                </NavLink>
                
                {item.to === "/inventory" && isOpen && (
                  <ul className="nav flex-column ms-4 mt-1">
                    {subNavItems.map((subItem, subIndex) => {
                      const isSubActive = location.pathname === subItem.to;
                      return (
                        <li className="nav-item" key={`sub-${subIndex}`}>
                          <NavLink 
                            to={subItem.to}
                            className={`nav-link ${isSubActive ? 'active' : ''}`}
                          >
                            <FontAwesomeIcon icon={subItem.icon} className="me-2" />
                            <span className="nav-text">{subItem.label}</span>
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
