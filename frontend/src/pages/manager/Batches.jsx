import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// Sample data (replace with API call in a real application)
const sampleBatches = [
  {
    id: 1,
    batchNumber: 'BATCH-001',
    manufactureDate: '2023-01-15',
    expiryDate: '2024-01-15',
    quantity: 100,
    available: 45.5,
    status: 'Active',
    supplier: 'ABC Spices Ltd',
    notes: 'Initial batch',
    itemId: 1
  },
  // Add more sample data as needed
];

const Batches = () => {
  const { itemId } = useParams();
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBatchForm, setShowBatchForm] = useState(false);
  const [currentBatch, setCurrentBatch] = useState(null);
  const [formData, setFormData] = useState({
    batchNumber: '',
    manufactureDate: '',
    expiryDate: '',
    quantity: '',
    available: '',
    supplier: '',
    notes: ''
  });

  useEffect(() => {
    // In a real app, fetch batches for the specific item
    const fetchBatches = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        const itemBatches = sampleBatches.filter(batch => batch.itemId === parseInt(itemId));
        setBatches(itemBatches);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load batch data');
        setLoading(false);
      }
    };

    if (itemId) {
      fetchBatches();
    } else {
      // If no itemId, show all batches (for the batches page)
      setBatches(sampleBatches);
      setLoading(false);
    }
  }, [itemId]);

  const columns = [
    {
      name: 'Batch Number',
      selector: row => row.batchNumber,
      sortable: true,
    },
    {
      name: 'Manufacture Date',
      selector: row => new Date(row.manufactureDate).toLocaleDateString(),
      sortable: true,
    },
    {
      name: 'Expiry Date',
      selector: row => new Date(row.expiryDate).toLocaleDateString(),
      sortable: true,
      cell: row => {
        const expiryDate = new Date(row.expiryDate);
        const today = new Date();
        const daysToExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
        
        let statusClass = '';
        if (daysToExpiry < 0) statusClass = 'text-danger';
        else if (daysToExpiry < 30) statusClass = 'text-warning';
        
        return (
          <span className={statusClass}>
            {expiryDate.toLocaleDateString()}
            {daysToExpiry < 30 && (
              <small className="d-block">
                {daysToExpiry < 0 
                  ? 'Expired' 
                  : `${daysToExpiry} days left`}
              </small>
            )}
          </span>
        );
      },
    },
    {
      name: 'Quantity',
      selector: row => row.quantity,
      sortable: true,
    },
    {
      name: 'Available',
      selector: row => row.available,
      sortable: true,
      cell: row => (
        <div>
          {row.available} / {row.quantity}
          <div className="progress mt-1" style={{ height: '5px' }}>
            <div 
              className={`progress-bar ${
                (row.available / row.quantity) < 0.2 ? 'bg-danger' : 'bg-success'
              }`} 
              role="progressbar" 
              style={{ width: `${(row.available / row.quantity) * 100}%` }}
              aria-valuenow={row.available}
              aria-valuemin="0"
              aria-valuemax={row.quantity}
            ></div>
          </div>
        </div>
      ),
    },
    {
      name: 'Status',
      cell: row => (
        <span className={`badge ${
          row.status === 'Active' ? 'bg-success' : 'bg-secondary'
        }`}>
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="btn-group">
          <button 
            className="btn btn-sm btn-outline-secondary"
            onClick={() => handleEdit(row)}
            title="Edit"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button 
            className="btn btn-sm btn-outline-danger"
            onClick={() => handleDelete(row.id)}
            title="Delete"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, save to API
    if (currentBatch) {
      // Update existing batch
      setBatches(batches.map(batch => 
        batch.id === currentBatch.id ? { ...formData, id: currentBatch.id } : batch
      ));
      toast.success('Batch updated successfully');
    } else {
      // Add new batch
      const newBatch = {
        ...formData,
        id: Math.max(0, ...batches.map(b => b.id)) + 1,
        itemId: itemId ? parseInt(itemId) : null,
        status: 'Active'
      };
      setBatches([...batches, newBatch]);
      toast.success('Batch added successfully');
    }
    setShowBatchForm(false);
    resetForm();
  };

  const handleEdit = (batch) => {
    setCurrentBatch(batch);
    setFormData({
      batchNumber: batch.batchNumber,
      manufactureDate: batch.manufactureDate,
      expiryDate: batch.expiryDate,
      quantity: batch.quantity,
      available: batch.available,
      supplier: batch.supplier,
      notes: batch.notes || ''
    });
    setShowBatchForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this batch?')) {
      setBatches(batches.filter(batch => batch.id !== id));
      toast.success('Batch deleted successfully');
    }
  };

  const resetForm = () => {
    setFormData({
      batchNumber: '',
      manufactureDate: '',
      expiryDate: '',
      quantity: '',
      available: '',
      supplier: '',
      notes: ''
    });
    setCurrentBatch(null);
  };

  const handleAddNew = () => {
    resetForm();
    setShowBatchForm(true);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div className="d-flex align-items-center">
          {itemId && (
            <Link to="/inventory" className="btn btn-sm btn-outline-secondary me-2">
              <FontAwesomeIcon icon={faArrowLeft} /> Back to Inventory
            </Link>
          )}
          <h1 className="h2 mb-0">
            {itemId ? 'Batch Management' : 'All Batches'}
          </h1>
        </div>
        <button 
          className="btn btn-primary"
          onClick={handleAddNew}
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" /> Add New Batch
        </button>
      </div>

      {showBatchForm ? (
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">{currentBatch ? 'Edit Batch' : 'Add New Batch'}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Batch Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="batchNumber"
                    value={formData.batchNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Supplier</label>
                  <select
                    className="form-select"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Supplier</option>
                    <option value="ABC Spices Ltd">ABC Spices Ltd</option>
                    <option value="XYZ Food Products">XYZ Food Products</option>
                    <option value="PQR Distributors">PQR Distributors</option>
                  </select>
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-4">
                  <label className="form-label">Manufacture Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="manufactureDate"
                    value={formData.manufactureDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Expiry Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Status</label>
                  <select className="form-select" disabled>
                    <option>Active</option>
                  </select>
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Total Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    min="0"
                    step="0.001"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Available Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    name="available"
                    value={formData.available}
                    onChange={handleInputChange}
                    min="0"
                    step="0.001"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Notes</label>
                <textarea
                  className="form-control"
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary me-2"
                  onClick={() => {
                    setShowBatchForm(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {currentBatch ? 'Update Batch' : 'Add Batch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <DataTable
              columns={columns}
              data={batches}
              progressPending={loading}
              pagination
              paginationPerPage={10}
              paginationRowsPerPageOptions={[5, 10, 25, 50]}
              highlightOnHover
              striped
              responsive
              className="table-hover"
              noDataComponent={<div className="p-4 text-center">No batches found</div>}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Batches;
