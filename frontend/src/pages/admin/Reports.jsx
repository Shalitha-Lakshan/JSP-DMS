import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDownload, 
  faCalendarAlt, 
  faFilter,
  faFilePdf,
  faFileExcel,
  faFileCsv,
  faPrint,
  faChartBar,
  faChartLine,
  faChartPie
} from '@fortawesome/free-solid-svg-icons';

const Reports = () => {
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [reportType, setReportType] = useState('sales');
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock report data
  const salesData = [
    { date: '2023-01-01', sales: 12000, orders: 45, avgOrder: 266.67 },
    { date: '2023-02-01', sales: 15000, orders: 52, avgOrder: 288.46 },
    { date: '2023-03-01', sales: 18000, orders: 61, avgOrder: 295.08 },
    { date: '2023-04-01', sales: 16500, orders: 58, avgOrder: 284.48 },
    { date: '2023-05-01', sales: 21000, orders: 68, avgOrder: 308.82 },
  ];

  const inventoryData = [
    { category: 'Electronics', items: 45, value: 125000, lowStock: 8 },
    { category: 'Furniture', items: 32, value: 89000, lowStock: 5 },
    { category: 'Office Supplies', items: 78, value: 42000, lowStock: 12 },
    { category: 'Stationery', items: 56, value: 18000, lowStock: 3 },
  ];

  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
    }, 1500);
  };

  const handleExport = (format) => {
    console.log(`Exporting report as ${format}`);
    // Export logic would go here
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Reports</h2>
        <p className="mt-1 text-sm text-gray-500">Generate and export detailed reports</p>
      </div>

      {/* Report Controls */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="report-type" className="block text-sm font-medium text-gray-700 mb-1">
              Report Type
            </label>
            <select
              id="report-type"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="sales">Sales Report</option>
              <option value="inventory">Inventory Report</option>
              <option value="staff">Staff Performance</option>
              <option value="customers">Customer Analytics</option>
            </select>
          </div>
          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faCalendarAlt} className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="date"
                id="start-date"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faCalendarAlt} className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="date"
                id="end-date"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              />
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isGenerating ? 'Generating...' : 'Generate Report'}
            </button>
          </div>
        </div>
      </div>

      {/* Report Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white shadow rounded-lg p-4">
        <div className="mb-3 sm:mb-0">
          <h3 className="text-base font-medium text-gray-900">
            {reportType === 'sales' ? 'Sales Report' : 
             reportType === 'inventory' ? 'Inventory Report' :
             reportType === 'staff' ? 'Staff Performance Report' : 'Customer Analytics Report'}
          </h3>
          <p className="text-sm text-gray-500">
            {dateRange.start && dateRange.end 
              ? `Showing data from ${new Date(dateRange.start).toLocaleDateString()} to ${new Date(dateRange.end).toLocaleDateString()}`
              : 'Select a date range to generate the report'}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleExport('pdf')}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FontAwesomeIcon icon={faFilePdf} className="h-4 w-4 mr-2 text-red-600" />
            PDF
          </button>
          <button
            onClick={() => handleExport('excel')}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FontAwesomeIcon icon={faFileExcel} className="h-4 w-4 mr-2 text-green-600" />
            Excel
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FontAwesomeIcon icon={faFileCsv} className="h-4 w-4 mr-2 text-blue-600" />
            CSV
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FontAwesomeIcon icon={faPrint} className="h-4 w-4 mr-2 text-gray-600" />
            Print
          </button>
        </div>
      </div>

      {/* Report Content */}
      {reportType === 'sales' && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-base font-medium text-gray-900">Sales Overview</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <p className="text-2xl font-semibold text-gray-900">$82,500</p>
                <p className="text-sm text-green-600 mt-1">
                  <span className="font-medium">+12.5%</span> from last period
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-900">284</p>
                <p className="text-sm text-green-600 mt-1">
                  <span className="font-medium">+8.2%</span> from last period
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Average Order Value</p>
                <p className="text-2xl font-semibold text-gray-900">$290.49</p>
                <p className="text-sm text-green-600 mt-1">
                  <span className="font-medium">+4.1%</span> from last period
                </p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-900">Sales Trend</h4>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-xs font-medium rounded-md bg-blue-100 text-blue-800">
                    Daily
                  </button>
                  <button className="px-3 py-1 text-xs font-medium rounded-md text-gray-600 hover:bg-gray-100">
                    Weekly
                  </button>
                  <button className="px-3 py-1 text-xs font-medium rounded-md text-gray-600 hover:bg-gray-100">
                    Monthly
                  </button>
                </div>
              </div>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                <div className="text-center">
                  <FontAwesomeIcon icon={faChartLine} className="h-10 w-10 text-gray-400 mx-auto" />
                  <p className="mt-2 text-sm text-gray-500">Sales chart will be displayed here</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Sales</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Orders
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sales
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avg. Order
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {salesData.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.orders}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${item.sales.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${item.avgOrder.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {reportType === 'inventory' && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-base font-medium text-gray-900">Inventory Overview</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Inventory by Category</h4>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                  <div className="text-center">
                    <FontAwesomeIcon icon={faChartPie} className="h-10 w-10 text-gray-400 mx-auto" />
                    <p className="mt-2 text-sm text-gray-500">Inventory distribution chart will be displayed here</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Stock Status</h4>
                <div className="space-y-3">
                  {inventoryData.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-900">{item.category}</span>
                        <span className="text-gray-500">{item.items} items (${item.value.toLocaleString()})</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(item.items / 100) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.lowStock} items low in stock
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Low Stock Items</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Stock
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reorder Level
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="bg-red-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Wireless Mouse X1
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Electronics
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        3
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        5
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Low Stock
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-yellow-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Ergonomic Keyboard
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Electronics
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        7
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        10
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Warning
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {reportType === 'staff' && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="text-center">
            <FontAwesomeIcon icon={faChartBar} className="h-12 w-12 text-gray-400 mx-auto" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Staff Performance Report</h3>
            <p className="mt-1 text-sm text-gray-500">
              Select a date range and click "Generate Report" to view staff performance metrics.
            </p>
          </div>
        </div>
      )}

      {reportType === 'customers' && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="text-center">
            <FontAwesomeIcon icon={faChartLine} className="h-12 w-12 text-gray-400 mx-auto" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Customer Analytics Report</h3>
            <p className="mt-1 text-sm text-gray-500">
              Select a date range and click "Generate Report" to view customer analytics.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
