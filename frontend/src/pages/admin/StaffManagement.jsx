import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faPlus, 
  faEdit, 
  faTrash, 
  faUserPlus,
  faUserTie,
  faEnvelope,
  faPhone,
  faCalendarAlt,
  faEye,
  faEyeSlash,
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

const StaffManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'Staff',
    joinDate: new Date().toISOString().split('T')[0],
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordSuggestions, setPasswordSuggestions] = useState([]);

  // Mock staff data
  const staffMembers = [
    { id: 1, name: 'John Doe', role: 'Manager', email: 'john@example.com', phone: '123-456-7890', joinDate: '2022-01-15' },
    { id: 2, name: 'Jane Smith', role: 'Staff', email: 'jane@example.com', phone: '123-456-7891', joinDate: '2022-02-20' },
    { id: 3, name: 'Robert Johnson', role: 'Staff', email: 'robert@example.com', phone: '123-456-7892', joinDate: '2022-03-10' },
    { id: 4, name: 'Emily Davis', role: 'Supervisor', email: 'emily@example.com', phone: '123-456-7893', joinDate: '2022-01-05' },
    { id: 5, name: 'Michael Brown', role: 'Staff', email: 'michael@example.com', phone: '123-456-7894', joinDate: '2022-04-15' },
  ];

  const filteredStaff = staffMembers.filter(staff => 
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (staff) => {
    setSelectedStaff(staff);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Handle delete logic here
    console.log('Deleting staff:', selectedStaff);
    setShowDeleteModal(false);
    setSelectedStaff(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value
    };
    
    setFormData(newFormData);
    
    // Check password strength when password changes
    if (name === 'password') {
      const { strength, suggestions } = checkPasswordStrength(value);
      setPasswordStrength(strength);
      setPasswordSuggestions(suggestions);
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    const suggestions = [];
    
    // Check password length
    if (password.length >= 8) strength++;
    else suggestions.push('At least 8 characters');
    
    // Check for uppercase letters
    if (/[A-Z]/.test(password)) strength++;
    else suggestions.push('At least one uppercase letter');
    
    // Check for numbers
    if (/[0-9]/.test(password)) strength++;
    else suggestions.push('At least one number');
    
    // Check for special characters
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    else suggestions.push('At least one special character');
    
    return { strength, suggestions };
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Phone validation
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength < 3) {
      newErrors.password = 'Please choose a stronger password';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Role validation
    if (!formData.role) newErrors.role = 'Role is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-red-500';
    if (passwordStrength === 1) return 'bg-yellow-500';
    if (passwordStrength === 2) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return 'Very Weak';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Good';
    return 'Strong';
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      const { confirmPassword, ...staffData } = formData; // Remove confirmPassword before sending
      console.log('Form submitted:', staffData);
      
      // Here you would typically make an API call to add the staff
      // For now, we'll just close the modal and reset the form
      setShowAddStaffModal(false);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'Staff',
        joinDate: new Date().toISOString().split('T')[0],
        address: ''
      });
      
      // Reset password strength
      setPasswordStrength(0);
      setPasswordSuggestions([]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Staff Management</h2>
          <p className="mt-1 text-sm text-gray-500">Manage your staff members and their permissions</p>
        </div>
        <button
          onClick={() => setShowAddStaffModal(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FontAwesomeIcon icon={faUserPlus} className="mr-2 h-4 w-4" />
          Add Staff
        </button>
      </div>

      {/* Search and filter */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={faSearch} className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search staff..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Staff list */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredStaff.length > 0 ? (
            filteredStaff.map((staff) => (
              <li key={staff.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FontAwesomeIcon icon={faUserTie} className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                        <div className="text-sm text-gray-500">{staff.role}</div>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex space-x-2">
                      <button
                        className="p-1 rounded-full text-blue-600 hover:text-blue-800 focus:outline-none"
                        onClick={() => {
                          setSelectedStaff(staff);
                          setShowAddStaffModal(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1 rounded-full text-red-600 hover:text-red-800 focus:outline-none"
                        onClick={() => handleDeleteClick(staff)}
                      >
                        <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <FontAwesomeIcon icon={faEnvelope} className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {staff.email}
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <FontAwesomeIcon icon={faPhone} className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {staff.phone}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <FontAwesomeIcon icon={faCalendarAlt} className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      Joined on {staff.joinDate}
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-6 text-center text-gray-500">
              No staff members found matching your search.
            </li>
          )}
        </ul>
      </div>

      {/* Add/Edit Staff Modal */}
      {showAddStaffModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {selectedStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
                    </h3>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                      {/* Name Field */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                          placeholder="John Doe"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                      </div>

                      {/* Email Field */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
                            placeholder="john@example.com"
                          />
                        </div>
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                      </div>

                      {/* Phone Field */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon icon={faPhone} className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.phone ? 'border-red-500' : ''}`}
                            placeholder="(123) 456-7890"
                          />
                        </div>
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                      </div>

                      {/* Password Field */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Password
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.password ? 'border-red-500' : ''}`}
                            placeholder="••••••••"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <button
                              type="button"
                              className="text-gray-500 hover:text-gray-700 focus:outline-none"
                              onClick={togglePasswordVisibility}
                            >
                              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        {formData.password && (
                          <div className="mt-1">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${getPasswordStrengthColor()}`}
                                style={{ width: `${(passwordStrength / 3) * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Strength: {getPasswordStrengthText()}
                            </p>
                            {passwordSuggestions.length > 0 && (
                              <ul className="text-xs text-gray-500 mt-1 space-y-1">
                                {passwordSuggestions.map((suggestion, index) => (
                                  <li key={index} className="flex items-center">
                                    <FontAwesomeIcon icon={faTimesCircle} className="h-3 w-3 text-red-500 mr-1" />
                                    {suggestion}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                      </div>

                      {/* Confirm Password Field */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                          Confirm Password
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.confirmPassword ? 'border-red-500' : ''}`}
                            placeholder="••••••••"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <button
                              type="button"
                              className="text-gray-500 hover:text-gray-700 focus:outline-none"
                              onClick={toggleConfirmPasswordVisibility}
                            >
                              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        {errors.confirmPassword && (
                          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                        )}
                      </div>

                      {/* Role Field */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                          id="role"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          <option value="Manager">Manager</option>
                          <option value="Sales Representative">Sales Representative</option>
                          <option value="Accountant">Accountant</option>
                        </select>
                        {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
                      </div>

                      {/* Join Date Field */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700">
                          Join Date
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon icon={faCalendarAlt} className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="date"
                            id="joinDate"
                            name="joinDate"
                            value={formData.joinDate}
                            onChange={handleInputChange}
                            className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      {/* Address Field */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                          Address
                        </label>
                        <textarea
                          id="address"
                          name="address"
                          rows={3}
                          value={formData.address}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          placeholder="123 Main St, City, Country"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200">
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-6 py-2.5 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSubmit}
                >
                  <FontAwesomeIcon icon={faUserPlus} className="mr-2 h-4 w-4" />
                  {selectedStaff ? 'Update Staff' : 'Add Staff Member'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setShowAddStaffModal(false);
                    setSelectedStaff(null);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      password: '',
                      confirmPassword: '',
                      role: 'Staff',
                      joinDate: new Date().toISOString().split('T')[0],
                      address: ''
                    });
                    setErrors({});
                    setPasswordStrength(0);
                    setPasswordSuggestions([]);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FontAwesomeIcon icon={faTrash} className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Staff Member</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete {selectedStaff?.name}? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
