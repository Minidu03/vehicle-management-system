import React, { useState, useEffect } from 'react';
import { 
  DocumentTextIcon, 
  PlusIcon, 
  MagnifyingGlassIcon, 
  PencilIcon, 
  TrashIcon, 
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  UserIcon,
  TruckIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

const Invoices = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      invoiceNumber: 'INV-2024-001',
      customerName: 'John Doe',
      customerId: 1,
      vehicleMake: 'Toyota',
      vehicleModel: 'Camry',
      vehicleYear: 2022,
      serviceType: 'Oil Change',
      date: '2024-03-15',
      dueDate: '2024-04-15',
      status: 'Paid',
      subtotal: 75.00,
      tax: 6.00,
      total: 81.00,
      paymentMethod: 'Credit Card',
      notes: 'Regular maintenance service',
      createdAt: '2024-03-15'
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-002',
      customerName: 'Jane Smith',
      customerId: 2,
      vehicleMake: 'Honda',
      vehicleModel: 'Civic',
      vehicleYear: 2023,
      serviceType: 'Brake Inspection',
      date: '2024-03-14',
      dueDate: '2024-04-14',
      status: 'Pending',
      subtotal: 150.00,
      tax: 12.00,
      total: 162.00,
      paymentMethod: 'Pending',
      notes: 'Brake service and pad replacement',
      createdAt: '2024-03-14'
    },
    {
      id: 3,
      invoiceNumber: 'INV-2024-003',
      customerName: 'Bob Johnson',
      customerId: 3,
      vehicleMake: 'Ford',
      vehicleModel: 'F-150',
      vehicleYear: 2021,
      serviceType: 'Tire Rotation',
      date: '2024-03-13',
      dueDate: '2024-04-13',
      status: 'Overdue',
      subtotal: 50.00,
      tax: 4.00,
      total: 54.00,
      paymentMethod: 'Cash',
      notes: 'Tire rotation and balancing',
      createdAt: '2024-03-13'
    },
    {
      id: 4,
      invoiceNumber: 'INV-2024-004',
      customerName: 'Alice Brown',
      customerId: 4,
      vehicleMake: 'BMW',
      vehicleModel: '3 Series',
      vehicleYear: 2023,
      serviceType: 'Full Service',
      date: '2024-03-12',
      dueDate: '2024-04-12',
      status: 'Paid',
      subtotal: 300.00,
      tax: 24.00,
      total: 324.00,
      paymentMethod: 'Bank Transfer',
      notes: 'Comprehensive vehicle service',
      createdAt: '2024-03-12'
    },
    {
      id: 5,
      invoiceNumber: 'INV-2024-005',
      customerName: 'Charlie Wilson',
      customerId: 5,
      vehicleMake: 'Tesla',
      vehicleModel: 'Model 3',
      vehicleYear: 2023,
      serviceType: 'Battery Check',
      date: '2024-03-16',
      dueDate: '2024-04-16',
      status: 'Draft',
      subtotal: 100.00,
      tax: 8.00,
      total: 108.00,
      paymentMethod: 'Pending',
      notes: 'Electric vehicle battery diagnostic',
      createdAt: '2024-03-16'
    }
  ]);
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerId: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    serviceType: '',
    date: '',
    dueDate: '',
    status: 'Draft',
    subtotal: '',
    tax: '',
    total: '',
    paymentMethod: '',
    notes: ''
  });

  const [notification, setNotification] = useState({
    show: false,
    type: 'success',
    message: ''
  });

  // Load invoices from localStorage on component mount
  useEffect(() => {
    const savedInvoices = localStorage.getItem('invoices');
    if (savedInvoices) {
      setInvoices(JSON.parse(savedInvoices));
    }
  }, []);

  // Save invoices to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }, [invoices]);

  const filteredInvoices = invoices.filter(invoice =>
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.vehicleMake.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.vehicleModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate total when subtotal or tax changes
  const calculateTotal = () => {
    const subtotal = parseFloat(formData.subtotal) || 0;
    const tax = parseFloat(formData.tax) || 0;
    const total = subtotal + tax;
    setFormData(prev => ({ ...prev, total: total.toFixed(2) }));
  };

  const handleAddInvoice = (e) => {
    e.preventDefault();
    
    // Generate invoice number
    const invoiceCount = invoices.length + 1;
    const invoiceNumber = `INV-2024-${String(invoiceCount).padStart(3, '0')}`;
    
    const newInvoice = {
      id: Date.now(),
      invoiceNumber,
      ...formData,
      customerId: parseInt(formData.customerId) || null,
      vehicleYear: parseInt(formData.vehicleYear),
      subtotal: parseFloat(formData.subtotal) || 0,
      tax: parseFloat(formData.tax) || 0,
      total: parseFloat(formData.total) || 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setInvoices(prev => [...prev, newInvoice]);
    showNotification('success', 'Invoice created successfully!');
    
    // Reset form and close modal
    setFormData({
      customerName: '',
      customerId: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      serviceType: '',
      date: '',
      dueDate: '',
      status: 'Draft',
      subtotal: '',
      tax: '',
      total: '',
      paymentMethod: '',
      notes: ''
    });
    setShowAddModal(false);
  };

  const handleEditInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setFormData({
      customerName: invoice.customerName,
      customerId: invoice.customerId?.toString() || '',
      vehicleMake: invoice.vehicleMake,
      vehicleModel: invoice.vehicleModel,
      vehicleYear: invoice.vehicleYear.toString(),
      serviceType: invoice.serviceType,
      date: invoice.date,
      dueDate: invoice.dueDate,
      status: invoice.status,
      subtotal: invoice.subtotal.toString(),
      tax: invoice.tax.toString(),
      total: invoice.total.toString(),
      paymentMethod: invoice.paymentMethod,
      notes: invoice.notes
    });
    setShowEditModal(true);
  };

  const handleUpdateInvoice = (e) => {
    e.preventDefault();
    
    setInvoices(prev => prev.map(invoice =>
      invoice.id === selectedInvoice.id
        ? { 
            ...invoice, 
            ...formData,
            customerId: parseInt(formData.customerId) || null,
            vehicleYear: parseInt(formData.vehicleYear),
            subtotal: parseFloat(formData.subtotal) || 0,
            tax: parseFloat(formData.tax) || 0,
            total: parseFloat(formData.total) || 0
          }
        : invoice
    ));
    
    showNotification('success', 'Invoice updated successfully!');
    
    // Reset form and close modal
    setFormData({
      customerName: '',
      customerId: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      serviceType: '',
      date: '',
      dueDate: '',
      status: 'Draft',
      subtotal: '',
      tax: '',
      total: '',
      paymentMethod: '',
      notes: ''
    });
    setShowEditModal(false);
    setSelectedInvoice(null);
  };

  const handleDeleteInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowDeleteModal(true);
  };

  const confirmDeleteInvoice = () => {
    setInvoices(prev => prev.filter(invoice => invoice.id !== selectedInvoice.id));
    showNotification('success', 'Invoice deleted successfully!');
    setShowDeleteModal(false);
    setSelectedInvoice(null);
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Draft': 'bg-gray-100 text-gray-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Paid': 'bg-green-100 text-green-800',
      'Overdue': 'bg-red-100 text-red-800',
    };
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
          notification.type === 'success' 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {notification.type === 'success' ? (
                <CheckCircleIcon className="h-5 w-5 text-green-400" />
              ) : (
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
              )}
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${
                notification.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {notification.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Invoice Management</h1>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              New Invoice
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Stats */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search invoices by number, customer, vehicle, or service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Total: <span className="font-semibold text-gray-900">{filteredInvoices.length}</span> invoices
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredInvoices.map((invoice) => (
              <li key={invoice.id} className="hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium text-gray-900">
                              {invoice.invoiceNumber}
                            </h3>
                            {getStatusBadge(invoice.status)}
                          </div>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <UserIcon className="h-4 w-4 mr-1" />
                            <span className="font-medium">Customer:</span> {invoice.customerName} | 
                            <TruckIcon className="h-4 w-4 ml-2 mr-1" />
                            <span className="font-medium">Vehicle:</span> {invoice.vehicleYear} {invoice.vehicleMake} {invoice.vehicleModel}
                          </div>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            <span className="font-medium">Date:</span> {invoice.date} | 
                            <span className="ml-2 font-medium">Due:</span> {invoice.dueDate} | 
                            <span className="ml-2 font-medium">Service:</span> {invoice.serviceType}
                          </div>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <BanknotesIcon className="h-4 w-4 mr-1" />
                            <span className="font-medium">Total:</span> ${invoice.total.toFixed(2)} | 
                            <span className="ml-2 font-medium">Payment:</span> {invoice.paymentMethod}
                          </div>
                          {invoice.notes && (
                            <div className="mt-1 text-sm text-gray-500">
                              <span className="font-medium">Notes:</span> {invoice.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEditInvoice(invoice)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                        title="Edit Invoice"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteInvoice(invoice)}
                        className="p-2 text-gray-400 hover:text-red-600"
                        title="Delete Invoice"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {filteredInvoices.length === 0 && (
            <div className="text-center py-12">
              <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
              <p className="text-gray-500">Get started by creating your first invoice.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Invoice Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowAddModal(false)}></div>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">New Invoice</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleAddInvoice} className="space-y-6">
                  {/* Customer Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
                        Customer Name
                      </label>
                      <input
                        type="text"
                        id="customerName"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="customerId" className="block text-sm font-medium text-gray-700">
                        Customer ID
                      </label>
                      <input
                        type="number"
                        id="customerId"
                        name="customerId"
                        value={formData.customerId}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  {/* Vehicle Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="vehicleMake" className="block text-sm font-medium text-gray-700">
                        Vehicle Make
                      </label>
                      <input
                        type="text"
                        id="vehicleMake"
                        name="vehicleMake"
                        value={formData.vehicleMake}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Toyota"
                      />
                    </div>
                    <div>
                      <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-700">
                        Vehicle Model
                      </label>
                      <input
                        type="text"
                        id="vehicleModel"
                        name="vehicleModel"
                        value={formData.vehicleModel}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Camry"
                      />
                    </div>
                    <div>
                      <label htmlFor="vehicleYear" className="block text-sm font-medium text-gray-700">
                        Year
                      </label>
                      <input
                        type="number"
                        id="vehicleYear"
                        name="vehicleYear"
                        value={formData.vehicleYear}
                        onChange={handleInputChange}
                        required
                        min="1900"
                        max={new Date().getFullYear() + 1}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="2023"
                      />
                    </div>
                  </div>

                  {/* Service and Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">
                        Service Type
                      </label>
                      <select
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="">Select a service</option>
                        <option value="Oil Change">Oil Change</option>
                        <option value="Brake Inspection">Brake Inspection</option>
                        <option value="Tire Rotation">Tire Rotation</option>
                        <option value="Full Service">Full Service</option>
                        <option value="Battery Check">Battery Check</option>
                        <option value="Transmission Service">Transmission Service</option>
                        <option value="Engine Diagnostic">Engine Diagnostic</option>
                        <option value="AC Service">AC Service</option>
                        <option value="Wheel Alignment">Wheel Alignment</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Invoice Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                        Due Date
                      </label>
                      <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Financial Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="subtotal" className="block text-sm font-medium text-gray-700">
                        Subtotal ($)
                      </label>
                      <input
                        type="number"
                        id="subtotal"
                        name="subtotal"
                        value={formData.subtotal}
                        onChange={(e) => {
                          handleInputChange(e);
                          calculateTotal();
                        }}
                        required
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="75.00"
                      />
                    </div>
                    <div>
                      <label htmlFor="tax" className="block text-sm font-medium text-gray-700">
                        Tax ($)
                      </label>
                      <input
                        type="number"
                        id="tax"
                        name="tax"
                        value={formData.tax}
                        onChange={(e) => {
                          handleInputChange(e);
                          calculateTotal();
                        }}
                        required
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="6.00"
                      />
                    </div>
                    <div>
                      <label htmlFor="total" className="block text-sm font-medium text-gray-700">
                        Total ($)
                      </label>
                      <input
                        type="number"
                        id="total"
                        name="total"
                        value={formData.total}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="81.00"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Status and Payment */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Overdue">Overdue</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                        Payment Method
                      </label>
                      <select
                        id="paymentMethod"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="">Select payment method</option>
                        <option value="Cash">Cash</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Check">Check</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                      Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Additional notes about the invoice..."
                    />
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleAddInvoice}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Create Invoice
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Invoice Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowEditModal(false)}></div>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Edit Invoice</h3>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleUpdateInvoice} className="space-y-6">
                  {/* Customer Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="editCustomerName" className="block text-sm font-medium text-gray-700">
                        Customer Name
                      </label>
                      <input
                        type="text"
                        id="editCustomerName"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editCustomerId" className="block text-sm font-medium text-gray-700">
                        Customer ID
                      </label>
                      <input
                        type="number"
                        id="editCustomerId"
                        name="customerId"
                        value={formData.customerId}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Vehicle Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="editVehicleMake" className="block text-sm font-medium text-gray-700">
                        Vehicle Make
                      </label>
                      <input
                        type="text"
                        id="editVehicleMake"
                        name="vehicleMake"
                        value={formData.vehicleMake}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editVehicleModel" className="block text-sm font-medium text-gray-700">
                        Vehicle Model
                      </label>
                      <input
                        type="text"
                        id="editVehicleModel"
                        name="vehicleModel"
                        value={formData.vehicleModel}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editVehicleYear" className="block text-sm font-medium text-gray-700">
                        Year
                      </label>
                      <input
                        type="number"
                        id="editVehicleYear"
                        name="vehicleYear"
                        value={formData.vehicleYear}
                        onChange={handleInputChange}
                        required
                        min="1900"
                        max={new Date().getFullYear() + 1}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Service and Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="editServiceType" className="block text-sm font-medium text-gray-700">
                        Service Type
                      </label>
                      <select
                        id="editServiceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="">Select a service</option>
                        <option value="Oil Change">Oil Change</option>
                        <option value="Brake Inspection">Brake Inspection</option>
                        <option value="Tire Rotation">Tire Rotation</option>
                        <option value="Full Service">Full Service</option>
                        <option value="Battery Check">Battery Check</option>
                        <option value="Transmission Service">Transmission Service</option>
                        <option value="Engine Diagnostic">Engine Diagnostic</option>
                        <option value="AC Service">AC Service</option>
                        <option value="Wheel Alignment">Wheel Alignment</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="editDate" className="block text-sm font-medium text-gray-700">
                        Invoice Date
                      </label>
                      <input
                        type="date"
                        id="editDate"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editDueDate" className="block text-sm font-medium text-gray-700">
                        Due Date
                      </label>
                      <input
                        type="date"
                        id="editDueDate"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Financial Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="editSubtotal" className="block text-sm font-medium text-gray-700">
                        Subtotal ($)
                      </label>
                      <input
                        type="number"
                        id="editSubtotal"
                        name="subtotal"
                        value={formData.subtotal}
                        onChange={(e) => {
                          handleInputChange(e);
                          calculateTotal();
                        }}
                        required
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editTax" className="block text-sm font-medium text-gray-700">
                        Tax ($)
                      </label>
                      <input
                        type="number"
                        id="editTax"
                        name="tax"
                        value={formData.tax}
                        onChange={(e) => {
                          handleInputChange(e);
                          calculateTotal();
                        }}
                        required
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editTotal" className="block text-sm font-medium text-gray-700">
                        Total ($)
                      </label>
                      <input
                        type="number"
                        id="editTotal"
                        name="total"
                        value={formData.total}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Status and Payment */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="editStatus" className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        id="editStatus"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Overdue">Overdue</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="editPaymentMethod" className="block text-sm font-medium text-gray-700">
                        Payment Method
                      </label>
                      <select
                        id="editPaymentMethod"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="">Select payment method</option>
                        <option value="Cash">Cash</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Check">Check</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label htmlFor="editNotes" className="block text-sm font-medium text-gray-700">
                      Notes
                    </label>
                    <textarea
                      id="editNotes"
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Additional notes about the invoice..."
                    />
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleUpdateInvoice}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Update Invoice
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Invoice Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowDeleteModal(false)}></div>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete Invoice
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete invoice {selectedInvoice?.invoiceNumber}? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={confirmDeleteInvoice}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete Invoice
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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

export default Invoices; 
