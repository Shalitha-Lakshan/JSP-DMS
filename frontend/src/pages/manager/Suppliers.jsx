import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch, faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Suppliers = () => {
  // Sample supplier data
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: 'ABC Spices Ltd',
      contactPerson: 'John Doe',
      email: 'john@abcspices.com',
      phone: '+94 77 123 4567',
      address: '123 Spice Road, Colombo 01',
      itemsSupplied: ['Chili Powder', 'Turmeric', 'Cumin'],
      status: 'Active'
    },
    {
      id: 2,
      name: 'XYZ Food Products',
      contactPerson: 'Jane Smith',
      email: 'jane@xyzfoods.com',
      phone: '+94 76 987 6543',
      address: '456 Food Street, Kandy',
      itemsSupplied: ['Wheat Flour', 'Rice Flour', 'Bread Crumbs'],
      status: 'Active'
    },
    {
      id: 3,
      name: 'PQR Distributors',
      contactPerson: 'Robert Johnson',
      email: 'robert@pqrdist.com',
      phone: '+94 71 555 1234',
      address: '789 Distribution Ave, Galle',
      itemsSupplied: ['Coconut Milk Powder', 'Coconut Oil'],
      status: 'Inactive'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    itemsSupplied: '',
    status: 'Active'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingSupplier) {
      // Update existing supplier
      setSuppliers(suppliers.map(supplier => 
        supplier.id === editingSupplier.id 
          ? { ...formData, id: editingSupplier.id, itemsSupplied: formData.itemsSupplied.split(',').map(item => item.trim()) }
          : supplier
      ));
    } else {
      // Add new supplier
      const newSupplier = {
        ...formData,
        id: Math.max(0, ...suppliers.map(s => s.id)) + 1,
        itemsSupplied: formData.itemsSupplied.split(',').map(item => item.trim())
      };
      setSuppliers([...suppliers, newSupplier]);
    }
    
    // Reset form and close
    setShowForm(false);
    setEditingSupplier(null);
    resetForm();
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setFormData({
      name: supplier.name,
      contactPerson: supplier.contactPerson,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      itemsSupplied: supplier.itemsSupplied.join(', '),
      status: supplier.status
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      setSuppliers(suppliers.filter(supplier => supplier.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
      itemsSupplied: '',
      status: 'Active'
    });
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Suppliers</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button 
            className="btn btn-primary"
            onClick={() => {
              setEditingSupplier(null);
              resetForm();
              setShowForm(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Supplier
          </button>
        </div>
      </div>

      {showForm ? (
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">{editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Supplier Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Contact Person</label>
                  <input
                    type="text"
                    className="form-control"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="mb-3">
                <FontAwesomeIcon icon={faEdit} className="me-1" />
                <label className="form-label">Address</label>
                <textarea
                  className="form-control"
                  name="address"
                  rows="2"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-8">
                  <label className="form-label">Items Supplied</label>
                  <input
                    type="text"
                    className="form-control"
                    name="itemsSupplied"
                    value={formData.itemsSupplied}
                    onChange={handleInputChange}
                    placeholder="Comma-separated list of items"
                    required
                  />
                  <div className="form-text">Separate multiple items with commas</div>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary me-2"
                  onClick={() => {
                    setShowForm(false);
                    setEditingSupplier(null);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingSupplier ? 'Update Supplier' : 'Add Supplier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Supplier List</h5>
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search suppliers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="card-body p-0">
            {filteredSuppliers.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <FontAwesomeIcon icon={faSearch} className="search-icon" />
                  <thead className="table-light">
                    <tr>
                      <th>Supplier Name</th>
                      <th>Contact Person</th>
                      <th>Contact Info</th>
                      <th>Items Supplied</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSuppliers.map(supplier => (
                      <tr key={supplier.id}>
                        <td>
                          <strong>{supplier.name}</strong>
                          <div className="small text-muted">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                            {supplier.address}
                          </div>
                        </td>
                        <td>{supplier.contactPerson}</td>
                        <td>
                          <div className="d-flex flex-column">
                            <a href={`mailto:${supplier.email}`} className="text-decoration-none">
                              <FontAwesomeIcon icon={faEnvelope} className="me-2" /> {supplier.email}
                            </a>
                            <a href={`tel:${supplier.phone}`} className="text-decoration-none">
                              <FontAwesomeIcon icon={faPhone} className="me-2" /> {supplier.phone}
                            </a>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex flex-wrap gap-1">
                            {supplier.itemsSupplied.map((item, index) => (
                              <span key={index} className="badge bg-light text-dark border">
                                {item}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${supplier.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                            {supplier.status}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group">
                            <button 
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleEdit(supplier)}
                              title="Edit"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(supplier.id)}
                              title="Delete"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center p-5">
                <FontAwesomeIcon icon={faSearch} size={48} className="text-muted mb-3" />
                <h5>No suppliers found</h5>
                <p className="text-muted">
                  {searchTerm ? 'Try a different search term' : 'Add a new supplier to get started'}
                </p>
                {!searchTerm && (
                  <button 
                    className="btn btn-primary mt-2"
                    onClick={() => setShowForm(true)}
                  >
                    <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Supplier
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;
