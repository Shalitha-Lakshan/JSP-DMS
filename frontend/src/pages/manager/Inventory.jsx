import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faBoxes, faPlus } from '@fortawesome/free-solid-svg-icons';

// Sample data (replace with API call in a real application)
const sampleData = [
  {
    id: 1,
    itemCode: 'SP001',
    itemName: 'Chili Powder',
    category: 'Spices',
    currentStock: 45.5,
    unit: 'kg',
    unitPrice: 1200.00,
    status: 'In Stock',
    reorderLevel: 10,
    description: 'Hot chili powder, 1kg packs'
  },
  // Add more sample data as needed
];

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  useEffect(() => {
    // In a real app, fetch data from an API
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setItems(sampleData);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load inventory data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      name: 'Item Code',
      selector: row => row.itemCode,
      sortable: true,
    },
    {
      name: 'Item Name',
      selector: row => row.itemName,
      sortable: true,
    },
    {
      name: 'Category',
      selector: row => row.category,
      sortable: true,
    },
    {
      name: 'Stock',
      cell: row => (
        <div>
          {row.currentStock} {row.unit}
          {row.currentStock <= row.reorderLevel && (
            <span className="badge bg-warning text-dark ms-2">Low</span>
          )}
        </div>
      ),
      sortable: true,
    },
    {
      name: 'Unit Price',
      selector: row => `LKR ${row.unitPrice.toFixed(2)}`,
      sortable: true,
    },
    {
      name: 'Status',
      cell: row => (
        <span className={`badge ${
          row.status === 'In Stock' ? 'bg-success' : 
          row.status === 'Low Stock' ? 'bg-warning text-dark' : 'bg-danger'
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
          <Link 
            to={`/inventory/view/${row.id}`} 
            className="btn btn-sm btn-outline-primary me-1"
          >
            <FontAwesomeIcon icon={faEye} />
          </Link>
          <button 
            className="btn btn-sm btn-outline-warning me-1"
            title="Edit"
            onClick={() => handleEdit(row.id)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <Link 
            to={`/inventory/${row.id}/batches`}
            className="btn btn-sm btn-outline-info"
            title="Manage Batches"
          >
            <FontAwesomeIcon icon={faBoxes} />
          </Link>
          <button 
            className="btn btn-sm btn-outline-danger"
            title="Delete"
            onClick={() => handleDelete(row.id)}
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

  const filteredItems = items.filter(
    item => 
      item.itemName.toLowerCase().includes(filterText.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(filterText.toLowerCase()) ||
      item.category.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleEdit = (id) => {
    // Handle edit logic
    toast.info(`Editing item ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete logic
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
      toast.success('Item deleted successfully');
    }
  };

  const subHeaderComponent = (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div className="col-md-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search items..."
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
          />
          <button 
            className="btn btn-outline-secondary" 
            type="button"
            onClick={() => {
              if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
              }
            }}
          >
            Clear
          </button>
        </div>
      </div>
      <Link to="/inventory/add" className="btn btn-primary">
        <FontAwesomeIcon icon={faPlus} className="me-2" /> Add New Item
      </Link>
    </div>
  );

  return (
    <div className="inventory">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2><FontAwesomeIcon icon={faBoxes} className="me-2" /> Inventory Management</h2>
      </div>

      <div className="card">
        <div className="card-body">
          <DataTable
            columns={columns}
            data={filteredItems}
            progressPending={loading}
            pagination
            paginationResetDefaultPage={resetPaginationToggle}
            subHeader
            subHeaderComponent={subHeaderComponent}
            persistTableHead
            highlightOnHover
            striped
            responsive
            className="table-hover"
          />
        </div>
      </div>
    </div>
  );
};

export default Inventory;
