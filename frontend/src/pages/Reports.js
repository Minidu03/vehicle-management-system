import React, { useState } from 'react';
import { 
  ChartBarIcon, 
  CurrencyDollarIcon,
  UserIcon,
  WrenchScrewdriverIcon,
  CubeIcon,
  PrinterIcon,
  ArrowDownTrayIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('30days');
  const [isLoading, setIsLoading] = useState(false);

  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 45000, bookings: 120 },
    { month: 'Feb', revenue: 52000, bookings: 145 },
    { month: 'Mar', revenue: 48000, bookings: 130 },
    { month: 'Apr', revenue: 61000, bookings: 165 },
    { month: 'May', revenue: 58000, bookings: 155 },
    { month: 'Jun', revenue: 67000, bookings: 180 }
  ];

  const serviceTypeData = [
    { name: 'Oil Change', value: 35, color: '#3B82F6' },
    { name: 'Brake Service', value: 25, color: '#10B981' },
    { name: 'Engine Repair', value: 20, color: '#F59E0B' },
    { name: 'Transmission', value: 12, color: '#EF4444' },
    { name: 'Other', value: 8, color: '#8B5CF6' }
  ];

  const mechanicPerformanceData = [
    { name: 'John Smith', jobs: 45, revenue: 12500, rating: 4.8 },
    { name: 'Sarah Johnson', jobs: 38, revenue: 11200, rating: 4.6 },
    { name: 'Mike Williams', jobs: 42, revenue: 10800, rating: 4.7 },
    { name: 'Emily Brown', jobs: 35, revenue: 9800, rating: 4.5 },
    { name: 'David Davis', jobs: 28, revenue: 7200, rating: 4.3 }
  ];

  const inventoryValueData = [
    { category: 'Engine', value: 15000 },
    { category: 'Brakes', value: 8500 },
    { category: 'Transmission', value: 12000 },
    { category: 'Electrical', value: 6200 },
    { category: 'Tires', value: 9800 },
    { category: 'Fluids', value: 3500 }
  ];

  const customerRetentionData = [
    { month: 'Jan', new: 25, returning: 95 },
    { month: 'Feb', new: 30, returning: 115 },
    { month: 'Mar', new: 22, returning: 108 },
    { month: 'Apr', new: 35, returning: 130 },
    { month: 'May', new: 28, returning: 127 },
    { month: 'Jun', new: 40, returning: 140 }
  ];

  const topCustomersData = [
    { name: 'John Doe', visits: 12, spent: 2450, lastVisit: '2024-03-15' },
    { name: 'Jane Smith', visits: 10, spent: 1890, lastVisit: '2024-03-14' },
    { name: 'Bob Johnson', visits: 8, spent: 1650, lastVisit: '2024-03-13' },
    { name: 'Alice Brown', visits: 9, spent: 1520, lastVisit: '2024-03-12' },
    { name: 'Charlie Wilson', visits: 7, spent: 1280, lastVisit: '2024-03-11' }
  ];

  const lowStockItems = [
    { partNumber: 'BRK-002', partName: 'Brake Pads - Front', quantity: 8, minLevel: 10, supplier: 'BrakeMaster Co.' },
    { partNumber: 'TIR-004', partName: 'All-Season Tire 205/55R16', quantity: 3, minLevel: 6, supplier: 'TireWorld' },
    { partNumber: 'OIL-006', partName: 'Motor Oil 5W-30', quantity: 0, minLevel: 12, supplier: 'LubriTech' }
  ];

  const recentInvoices = [
    { invoiceNumber: 'INV-2024-001', customer: 'John Doe', amount: 450, status: 'Paid', date: '2024-03-15' },
    { invoiceNumber: 'INV-2024-002', customer: 'Jane Smith', amount: 890, status: 'Pending', date: '2024-03-14' },
    { invoiceNumber: 'INV-2024-003', customer: 'Bob Johnson', amount: 320, status: 'Paid', date: '2024-03-13' },
    { invoiceNumber: 'INV-2024-004', customer: 'Alice Brown', amount: 1200, status: 'Overdue', date: '2024-03-12' },
    { invoiceNumber: 'INV-2024-005', customer: 'Charlie Wilson', amount: 680, status: 'Paid', date: '2024-03-11' }
  ];

  const calculateTotalRevenue = () => {
    return revenueData.reduce((total, month) => total + month.revenue, 0);
  };

  const calculateTotalBookings = () => {
    return revenueData.reduce((total, month) => total + month.bookings, 0);
  };

  const calculateAverageJobValue = () => {
    return (calculateTotalRevenue() / calculateTotalBookings()).toFixed(2);
  };

  const calculateInventoryValue = () => {
    return inventoryValueData.reduce((total, category) => total + category.value, 0);
  };

  const calculateGrowthRate = () => {
    const firstMonth = revenueData[0].revenue;
    const lastMonth = revenueData[revenueData.length - 1].revenue;
    return ((lastMonth - firstMonth) / firstMonth * 100).toFixed(1);
  };

  const handleExportReport = () => {
    setIsLoading(true);
    // Simulate export functionality
    setTimeout(() => {
      setIsLoading(false);
      alert('Report exported successfully!');
    }, 2000);
  };

  const handlePrintReport = () => {
    window.print();
  };

  const renderOverviewReport = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${calculateTotalRevenue().toLocaleString()}</p>
              <p className="text-sm text-green-600">+{calculateGrowthRate()}% growth</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <WrenchScrewdriverIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{calculateTotalBookings()}</p>
              <p className="text-sm text-gray-500">Last 6 months</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <UserIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Customers</p>
              <p className="text-2xl font-bold text-gray-900">180</p>
              <p className="text-sm text-green-600">+12% this month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <CubeIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Inventory Value</p>
              <p className="text-2xl font-bold text-gray-900">${calculateInventoryValue().toLocaleString()}</p>
              <p className="text-sm text-gray-500">Total stock value</p>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue & Bookings Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#3B82F6" name="Revenue ($)" />
            <Line yAxisId="right" type="monotone" dataKey="bookings" stroke="#10B981" name="Bookings" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Service Types Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Service Types Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {serviceTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Retention</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={customerRetentionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="new" fill="#EF4444" name="New Customers" />
              <Bar dataKey="returning" fill="#10B981" name="Returning Customers" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderFinancialReport = () => (
    <div className="space-y-6">
      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Revenue</span>
              <span className="font-semibold">${calculateTotalRevenue().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average Job Value</span>
              <span className="font-semibold">${calculateAverageJobValue()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Growth Rate</span>
              <span className="font-semibold text-green-600">+{calculateGrowthRate()}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Services</h3>
          <div className="space-y-3">
            {serviceTypeData.slice(0, 3).map((service, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-600">{service.name}</span>
                <span className="font-semibold">{service.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Invoices</h3>
          <div className="space-y-3">
            {recentInvoices.slice(0, 3).map((invoice, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-600">{invoice.invoiceNumber}</span>
                <span className="font-semibold">${invoice.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Breakdown</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#3B82F6" name="Revenue ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Invoice Details Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Invoices</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentInvoices.map((invoice, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.invoiceNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${invoice.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderInventoryReport = () => (
    <div className="space-y-6">
      {/* Inventory Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Inventory Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Value</span>
              <span className="font-semibold">${calculateInventoryValue().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Low Stock Items</span>
              <span className="font-semibold text-red-600">{lowStockItems.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Categories</span>
              <span className="font-semibold">{inventoryValueData.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Low Stock Alert</h3>
          <div className="space-y-3">
            {lowStockItems.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-600">{item.partName}</span>
                <span className="font-semibold text-red-600">{item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Categories</h3>
          <div className="space-y-3">
            {inventoryValueData.slice(0, 3).map((category, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-600">{category.category}</span>
                <span className="font-semibold">${category.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory Value by Category */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Inventory Value by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={inventoryValueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#F59E0B" name="Value ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Low Stock Items Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Low Stock Items</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Part #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Part Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Qty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lowStockItems.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.partNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.partName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.quantity === 0 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.minLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.supplier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPerformanceReport = () => (
    <div className="space-y-6">
      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Team Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Jobs Completed</span>
              <span className="font-semibold">188</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average Rating</span>
              <span className="font-semibold">4.6/5.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Revenue per Mechanic</span>
              <span className="font-semibold">$10,300</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performer</h3>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <WrenchScrewdriverIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900">John Smith</h4>
            <p className="text-sm text-gray-500">45 jobs completed</p>
            <p className="text-sm font-semibold text-green-600">$12,500 revenue</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Service Efficiency</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. Job Duration</span>
              <span className="font-semibold">2.5 hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">On-Time Completion</span>
              <span className="font-semibold text-green-600">94%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Customer Satisfaction</span>
              <span className="font-semibold text-green-600">96%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mechanic Performance Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Mechanic Performance</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={mechanicPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="jobs" fill="#8B5CF6" name="Jobs Completed" />
            <Bar dataKey="revenue" fill="#10B981" name="Revenue ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Customers */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Top Customers</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topCustomersData.map((customer, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.visits}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${customer.spent}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.lastVisit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="1year">Last Year</option>
              </select>
              <button
                onClick={handlePrintReport}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PrinterIcon className="h-4 w-4 mr-2" />
                Print
              </button>
              <button
                onClick={handleExportReport}
                disabled={isLoading}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                {isLoading ? 'Exporting...' : 'Export'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setSelectedReport('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedReport === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <EyeIcon className="h-4 w-4 mr-2" />
                Overview
              </div>
            </button>
            <button
              onClick={() => setSelectedReport('financial')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedReport === 'financial'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                Financial
              </div>
            </button>
            <button
              onClick={() => setSelectedReport('inventory')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedReport === 'inventory'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <CubeIcon className="h-4 w-4 mr-2" />
                Inventory
              </div>
            </button>
            <button
              onClick={() => setSelectedReport('performance')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedReport === 'performance'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <WrenchScrewdriverIcon className="h-4 w-4 mr-2" />
                Performance
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Report Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        {selectedReport === 'overview' && renderOverviewReport()}
        {selectedReport === 'financial' && renderFinancialReport()}
        {selectedReport === 'inventory' && renderInventoryReport()}
        {selectedReport === 'performance' && renderPerformanceReport()}
      </div>
    </div>
  );
};

export default Reports;