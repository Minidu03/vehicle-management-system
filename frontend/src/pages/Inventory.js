import React, { useState, useEffect } from 'react';
import { 
  CubeIcon, 
  PlusIcon, 
  MagnifyingGlassIcon, 
  PencilIcon, 
  TrashIcon, 
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArchiveBoxIcon,
  CurrencyDollarIcon,
  TruckIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BellIcon
} from '@heroicons/react/24/outline';

const Inventory = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [inventory, setInventory] = useState([
    {
      id: 1,
      partNumber: 'ENG-001',
      partName: 'Engine Oil Filter',
      category: 'Engine',
      description: 'High-quality oil filter for most vehicle models',
      supplier: 'AutoParts Inc.',
      supplierContact: '+1-555-0101',
      unitPrice: 12.99,
      quantity: 45,
      minStockLevel: 10,
      maxStockLevel: 100,
      reorderPoint: 15,
      location: 'Aisle 1, Shelf A',
      lastUpdated: '2024-03-15',
      status: 'In Stock',
      brand: 'Premium Filters',
      sku: 'PF-1234',
      barcode: '1234567890123',
      weight: 0.5,
      dimensions: '4x3x2 inches',
      warranty: '12 months',
      notes: 'Compatible with most domestic and foreign vehicles'
    },
    {
      id: 2,
      partNumber: 'BRK-002',
      partName: 'Brake Pads - Front',
      category: 'Brakes',
      description: 'Ceramic brake pads for front wheels',
      supplier: 'BrakeMaster Co.',
      supplierContact: '+1-555-0102',
      unitPrice: 34.99,
      quantity: 8,
      minStockLevel: 5,
      maxStockLevel: 50,
      reorderPoint: 10,
      location: 'Aisle 2, Shelf B',
      lastUpdated: '2024-03-14',
      status: 'Low Stock',
      brand: 'StopTech',
      sku: 'BP-5678',
      barcode: '2345678901234',
      weight: 1.2,
      dimensions: '6x4x3 inches',
      warranty: '24 months',
      notes: 'Ceramic composition, low dust'
    },
    {
      id: 3,
      partNumber: 'TRN-003',
      partName: 'Transmission Fluid',
      category: 'Transmission',
      description: 'Synthetic automatic transmission fluid',
      supplier: 'Fluid Dynamics',
      supplierContact: '+1-555-0103',
      unitPrice: 18.75,
      quantity: 22,
      minStockLevel: 8,
      maxStockLevel: 40,
      reorderPoint: 12,
      location: 'Aisle 3, Shelf C',
      lastUpdated: '2024-03-13',
      status: 'In Stock',
      brand: 'SynthMax',
      sku: 'TF-9012',
      barcode: '3456789012345',
      weight: 2.0,
      dimensions: '8x6x4 inches',
      warranty: '36 months',
      notes: 'Compatible with most automatic transmissions'
    },
    {
      id: 4,
      partNumber: 'TIR-004',
      partName: 'All-Season Tire 205/55R16',
      category: 'Tires',
      description: 'High-performance all-season tire',
      supplier: 'TireWorld',
      supplierContact: '+1-555-0104',
      unitPrice: 89.99,
      quantity: 3,
      minStockLevel: 6,
      maxStockLevel: 30,
      reorderPoint: 8,
      location: 'Aisle 4, Shelf D',
      lastUpdated: '2024-03-12',
      status: 'Critical Low',
      brand: 'RoadGrip',
      sku: 'AS-20555',
      barcode: '4567890123456',
      weight: 22.0,
      dimensions: '24x24x8 inches',
      warranty: '60,000 miles',
      notes: 'Excellent wet and dry traction'
    },
    {
      id: 5,
      partNumber: 'BAT-005',
      partName: 'Car Battery 12V',
      category: 'Electrical',
      description: 'Maintenance-free automotive battery',
      supplier: 'PowerSource Ltd.',
      supplierContact: '+1-555-0105',
      unitPrice: 124.99,
      quantity: 15,
      minStockLevel: 4,
      maxStockLevel: 25,
      reorderPoint: 6,
      location: 'Aisle 5, Shelf E',
      lastUpdated: '2024-03-11',
      status: 'In Stock',
      brand: 'PowerPro',
      sku: 'CB-12V-48',
      barcode: '5678901234567',
      weight: 35.0,
      dimensions: '10x7x8 inches',
      warranty: '36 months',
      notes: '48-month warranty, 600 CCA'
    },
    {
      id: 6,
      partNumber: 'OIL-006',
      partName: 'Motor Oil 5W-30',
      category: 'Fluids',
      description: 'Synthetic motor oil 5W-30',
      supplier: 'LubriTech',
      supplierContact: '+1-555-0106',
      unitPrice: 7.99,
      quantity: 0,
      minStockLevel: 12,
      maxStockLevel: 60,
      reorderPoint: 20,
      location: 'Aisle 6, Shelf F',
      lastUpdated: '2024-03-10',
      status: 'Out of Stock',
      brand: 'SynthFlow',
      sku: 'MO-5W30',
      barcode: '6789012345678',
      weight: 8.5,
      dimensions: '10x3x3 inches',
      warranty: 'N/A',
      notes: '5-quart bottle, API certified'
    }
  ]);
  
  const [formData, setFormData] = useState({
    partNumber: '',
    partName: '',
    category: '',
    description: '',
    supplier: '',
    supplierContact: '',
    unitPrice: '',
    quantity: '',
    minStockLevel: '',
    maxStockLevel: '',
    reorderPoint: '',
    location: '',
    status: 'In Stock',
    brand: '',
    sku: '',
    barcode: '',
    weight: '',
    dimensions: '',
    warranty: '',
    notes: ''
  });

  const [notification, setNotification] = useState({
    show: false,
    type: 'success',
    message: ''
  });

  // Load inventory from localStorage on component mount
  useEffect(() => {
    const savedInventory = localStorage.getItem('inventory');
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    }
  }, []);

  // Save inventory to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  const filteredInventory = inventory.filter(item =>
    item.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
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

  const getStockStatus = (quantity, minStockLevel, maxStockLevel) => {
    if (quantity === 0) return { status: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (quantity <= minStockLevel) return { status: 'Critical Low', color: 'bg-red-100 text-red-800' };
    if (quantity <= minStockLevel * 2) return { status: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    if (quantity >= maxStockLevel) return { status: 'Overstocked', color: 'bg-blue-100 text-blue-800' };
    return { status: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    
    // Generate part number if not provided
    let partNumber = formData.partNumber;
    if (!partNumber) {
      const itemCount = inventory.length + 1;
      const categoryCode = formData.category.substring(0, 3).toUpperCase();
      partNumber = `${categoryCode}-${String(itemCount).padStart(3, '0')}`;
    }
    
    const quantity = parseInt(formData.quantity) || 0;
    const minStockLevel = parseInt(formData.minStockLevel) || 0;
    const maxStockLevel = parseInt(formData.maxStockLevel) || 0;
    
    const stockStatus = getStockStatus(quantity, minStockLevel, maxStockLevel);
    
    const newItem = {
      id: Date.now(),
      partNumber,
      ...formData,
      unitPrice: parseFloat(formData.unitPrice) || 0,
      quantity,
      minStockLevel,
      maxStockLevel,
      reorderPoint: parseInt(formData.reorderPoint) || 0,
      weight: parseFloat(formData.weight) || 0,
      status: stockStatus.status,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setInventory(prev => [...prev, newItem]);
    showNotification('success', 'Inventory item added successfully!');
    
    // Reset form and close modal
    setFormData({
      partNumber: '',
      partName: '',
      category: '',
      description: '',
      supplier: '',
      supplierContact: '',
      unitPrice: '',
      quantity: '',
      minStockLevel: '',
      maxStockLevel: '',
      reorderPoint: '',
      location: '',
      status: 'In Stock',
      brand: '',
      sku: '',
      barcode: '',
      weight: '',
      dimensions: '',
      warranty: '',
      notes: ''
    });
    setShowAddModal(false);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setFormData({
      partNumber: item.partNumber,
      partName: item.partName,
      category: item.category,
      description: item.description,
      supplier: item.supplier,
      supplierContact: item.supplierContact,
      unitPrice: item.unitPrice.toString(),
      quantity: item.quantity.toString(),
      minStockLevel: item.minStockLevel.toString(),
      maxStockLevel: item.maxStockLevel.toString(),
      reorderPoint: item.reorderPoint.toString(),
      location: item.location,
      status: item.status,
      brand: item.brand,
      sku: item.sku,
      barcode: item.barcode,
      weight: item.weight.toString(),
      dimensions: item.dimensions,
      warranty: item.warranty,
      notes: item.notes
    });
    setShowEditModal(true);
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    
    const quantity = parseInt(formData.quantity) || 0;
    const minStockLevel = parseInt(formData.minStockLevel) || 0;
    const maxStockLevel = parseInt(formData.maxStockLevel) || 0;
    
    const stockStatus = getStockStatus(quantity, minStockLevel, maxStockLevel);
    
    setInventory(prev => prev.map(item =>
      item.id === selectedItem.id
        ? { 
            ...item, 
            ...formData,
            unitPrice: parseFloat(formData.unitPrice) || 0,
            quantity,
            minStockLevel,
            maxStockLevel,
            reorderPoint: parseInt(formData.reorderPoint) || 0,
            weight: parseFloat(formData.weight) || 0,
            status: stockStatus.status,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : item
    ));
    
    showNotification('success', 'Inventory item updated successfully!');
    
    // Reset form and close modal
    setFormData({
      partNumber: '',
      partName: '',
      category: '',
      description: '',
      supplier: '',
      supplierContact: '',
      unitPrice: '',
      quantity: '',
      minStockLevel: '',
      maxStockLevel: '',
      reorderPoint: '',
      location: '',
      status: 'In Stock',
      brand: '',
      sku: '',
      barcode: '',
      weight: '',
      dimensions: '',
      warranty: '',
      notes: ''
    });
    setShowEditModal(false);
    setSelectedItem(null);
  };

  const handleDeleteItem = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const confirmDeleteItem = () => {
    setInventory(prev => prev.filter(item => item.id !== selectedItem.id));
    showNotification('success', 'Inventory item deleted successfully!');
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      'In Stock': 'bg-green-100 text-green-800',
      'Low Stock': 'bg-yellow-100 text-yellow-800',
      'Critical Low': 'bg-red-100 text-red-800',
      'Out of Stock': 'bg-red-100 text-red-800',
      'Overstocked': 'bg-blue-100 text-blue-800'
    };
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
  };

  const getLowStockItems = () => {
    return inventory.filter(item => 
      item.quantity <= item.minStockLevel || item.quantity === 0
    );
  };

  const getTotalValue = () => {
    return inventory.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
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
              <CubeIcon className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Parts Inventory</h1>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              New Item
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ArchiveBoxIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{inventory.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <ArrowTrendingUpIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">${getTotalValue().toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <BellIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-gray-900">{getLowStockItems().length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <ArrowTrendingDownIcon className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-gray-900">{inventory.filter(item => item.quantity === 0).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Low Stock Alert */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search inventory by part number, name, category, supplier, or brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Total: <span className="font-semibold text-gray-900">{filteredInventory.length}</span> items
              </div>
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        {getLowStockItems().length > 0 && (
          <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <BellIcon className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Low Stock Alert
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>You have {getLowStockItems().length} items that need to be reordered:</p>
                  <ul className="mt-1 list-disc list-inside">
                    {getLowStockItems().slice(0, 3).map(item => (
                      <li key={item.id}>{item.partName} ({item.quantity} left)</li>
                    ))}
                    {getLowStockItems().length > 3 && (
                      <li>...and {getLowStockItems().length - 3} more items</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredInventory.map((item) => (
              <li key={item.id} className="hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <ArchiveBoxIcon className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium text-gray-900">
                              {item.partName}
                            </h3>
                            {getStatusBadge(item.status)}
                          </div>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <span className="font-medium">Part #:</span> {item.partNumber} | 
                            <span className="ml-2 font-medium">SKU:</span> {item.sku} | 
                            <span className="ml-2 font-medium">Category:</span> {item.category}
                          </div>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <TruckIcon className="h-4 w-4 mr-1" />
                            <span className="font-medium">Supplier:</span> {item.supplier} | 
                            <span className="ml-2 font-medium">Brand:</span> {item.brand}
                          </div>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                            <span className="font-medium">Price:</span> ${item.unitPrice.toFixed(2)} | 
                            <span className="ml-2 font-medium">Quantity:</span> {item.quantity} | 
                            <span className="ml-2 font-medium">Location:</span> {item.location}
                          </div>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            <span className="font-medium">Last Updated:</span> {item.lastUpdated} | 
                            <span className="ml-2 font-medium">Min/Max:</span> {item.minStockLevel}/{item.maxStockLevel}
                          </div>
                          {item.description && (
                            <div className="mt-1 text-sm text-gray-500">
                              <span className="font-medium">Description:</span> {item.description}
                            </div>
                          )}
                          {item.notes && (
                            <div className="mt-1 text-sm text-gray-500">
                              <span className="font-medium">Notes:</span> {item.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEditItem(item)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                        title="Edit Item"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteItem(item)}
                        className="p-2 text-gray-400 hover:text-red-600"
                        title="Delete Item"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {filteredInventory.length === 0 && (
            <div className="text-center py-12">
              <ArchiveBoxIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No inventory items found</h3>
              <p className="text-gray-500">Get started by adding your first inventory item.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowAddModal(false)}></div>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">New Inventory Item</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleAddItem} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="partNumber" className="block text-sm font-medium text-gray-700">
                        Part Number
                      </label>
                      <input
                        type="text"
                        id="partNumber"
                        name="partNumber"
                        value={formData.partNumber}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="ENG-001"
                      />
                    </div>
                    <div>
                      <label htmlFor="partName" className="block text-sm font-medium text-gray-700">
                        Part Name
                      </label>
                      <input
                        type="text"
                        id="partName"
                        name="partName"
                        value={formData.partName}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Engine Oil Filter"
                      />
                    </div>
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="">Select category</option>
                        <option value="Engine">Engine</option>
                        <option value="Transmission">Transmission</option>
                        <option value="Brakes">Brakes</option>
                        <option value="Suspension">Suspension</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Tires">Tires</option>
                        <option value="Fluids">Fluids</option>
                        <option value="Filters">Filters</option>
                        <option value="Body">Body</option>
                        <option value="Interior">Interior</option>
                        <option value="Exterior">Exterior</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Description and Brand */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="High-quality part for most vehicles"
                      />
                    </div>
                    <div>
                      <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                        Brand
                      </label>
                      <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Premium Parts"
                      />
                    </div>
                  </div>

                  {/* Supplier Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">
                        Supplier
                      </label>
                      <input
                        type="text"
                        id="supplier"
                        name="supplier"
                        value={formData.supplier}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="AutoParts Inc."
                      />
                    </div>
                    <div>
                      <label htmlFor="supplierContact" className="block text-sm font-medium text-gray-700">
                        Supplier Contact
                      </label>
                      <input
                        type="text"
                        id="supplierContact"
                        name="supplierContact"
                        value={formData.supplierContact}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="+1-555-0101"
                      />
                    </div>
                  </div>

                  {/* SKU and Barcode */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                        SKU
                      </label>
                      <input
                        type="text"
                        id="sku"
                        name="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="PF-1234"
                      />
                    </div>
                    <div>
                      <label htmlFor="barcode" className="block text-sm font-medium text-gray-700">
                        Barcode
                      </label>
                      <input
                        type="text"
                        id="barcode"
                        name="barcode"
                        value={formData.barcode}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="1234567890123"
                      />
                    </div>
                  </div>

                  {/* Pricing and Stock */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700">
                        Unit Price ($)
                      </label>
                      <input
                        type="number"
                        id="unitPrice"
                        name="unitPrice"
                        value={formData.unitPrice}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="12.99"
                      />
                    </div>
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                        Quantity
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="45"
                      />
                    </div>
                    <div>
                      <label htmlFor="minStockLevel" className="block text-sm font-medium text-gray-700">
                        Min Stock Level
                      </label>
                      <input
                        type="number"
                        id="minStockLevel"
                        name="minStockLevel"
                        value={formData.minStockLevel}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="10"
                      />
                    </div>
                    <div>
                      <label htmlFor="maxStockLevel" className="block text-sm font-medium text-gray-700">
                        Max Stock Level
                      </label>
                      <input
                        type="number"
                        id="maxStockLevel"
                        name="maxStockLevel"
                        value={formData.maxStockLevel}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="100"
                      />
                    </div>
                  </div>

                  {/* Reorder Point and Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="reorderPoint" className="block text-sm font-medium text-gray-700">
                        Reorder Point
                      </label>
                      <input
                        type="number"
                        id="reorderPoint"
                        name="reorderPoint"
                        value={formData.reorderPoint}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="15"
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Aisle 1, Shelf A"
                      />
                    </div>
                  </div>

                  {/* Physical Properties */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                        Weight (lbs)
                      </label>
                      <input
                        type="number"
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        min="0"
                        step="0.1"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="0.5"
                      />
                    </div>
                    <div>
                      <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">
                        Dimensions
                      </label>
                      <input
                        type="text"
                        id="dimensions"
                        name="dimensions"
                        value={formData.dimensions}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="4x3x2 inches"
                      />
                    </div>
                    <div>
                      <label htmlFor="warranty" className="block text-sm font-medium text-gray-700">
                        Warranty
                      </label>
                      <input
                        type="text"
                        id="warranty"
                        name="warranty"
                        value={formData.warranty}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="12 months"
                      />
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
                      placeholder="Additional notes about the item..."
                    />
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add Item
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

      {/* Edit Item Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowEditModal(false)}></div>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Edit Inventory Item</h3>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleUpdateItem} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="editPartNumber" className="block text-sm font-medium text-gray-700">
                        Part Number
                      </label>
                      <input
                        type="text"
                        id="editPartNumber"
                        name="partNumber"
                        value={formData.partNumber}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editPartName" className="block text-sm font-medium text-gray-700">
                        Part Name
                      </label>
                      <input
                        type="text"
                        id="editPartName"
                        name="partName"
                        value={formData.partName}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editCategory" className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        id="editCategory"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="">Select category</option>
                        <option value="Engine">Engine</option>
                        <option value="Transmission">Transmission</option>
                        <option value="Brakes">Brakes</option>
                        <option value="Suspension">Suspension</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Tires">Tires</option>
                        <option value="Fluids">Fluids</option>
                        <option value="Filters">Filters</option>
                        <option value="Body">Body</option>
                        <option value="Interior">Interior</option>
                        <option value="Exterior">Exterior</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Description and Brand */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="editDescription" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <input
                        type="text"
                        id="editDescription"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editBrand" className="block text-sm font-medium text-gray-700">
                        Brand
                      </label>
                      <input
                        type="text"
                        id="editBrand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Supplier Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="editSupplier" className="block text-sm font-medium text-gray-700">
                        Supplier
                      </label>
                      <input
                        type="text"
                        id="editSupplier"
                        name="supplier"
                        value={formData.supplier}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editSupplierContact" className="block text-sm font-medium text-gray-700">
                        Supplier Contact
                      </label>
                      <input
                        type="text"
                        id="editSupplierContact"
                        name="supplierContact"
                        value={formData.supplierContact}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* SKU and Barcode */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="editSku" className="block text-sm font-medium text-gray-700">
                        SKU
                      </label>
                      <input
                        type="text"
                        id="editSku"
                        name="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editBarcode" className="block text-sm font-medium text-gray-700">
                        Barcode
                      </label>
                      <input
                        type="text"
                        id="editBarcode"
                        name="barcode"
                        value={formData.barcode}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Pricing and Stock */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label htmlFor="editUnitPrice" className="block text-sm font-medium text-gray-700">
                        Unit Price ($)
                      </label>
                      <input
                        type="number"
                        id="editUnitPrice"
                        name="unitPrice"
                        value={formData.unitPrice}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editQuantity" className="block text-sm font-medium text-gray-700">
                        Quantity
                      </label>
                      <input
                        type="number"
                        id="editQuantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editMinStockLevel" className="block text-sm font-medium text-gray-700">
                        Min Stock Level
                      </label>
                      <input
                        type="number"
                        id="editMinStockLevel"
                        name="minStockLevel"
                        value={formData.minStockLevel}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editMaxStockLevel" className="block text-sm font-medium text-gray-700">
                        Max Stock Level
                      </label>
                      <input
                        type="number"
                        id="editMaxStockLevel"
                        name="maxStockLevel"
                        value={formData.maxStockLevel}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Reorder Point and Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="editReorderPoint" className="block text-sm font-medium text-gray-700">
                        Reorder Point
                      </label>
                      <input
                        type="number"
                        id="editReorderPoint"
                        name="reorderPoint"
                        value={formData.reorderPoint}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editLocation" className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <input
                        type="text"
                        id="editLocation"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Physical Properties */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="editWeight" className="block text-sm font-medium text-gray-700">
                        Weight (lbs)
                      </label>
                      <input
                        type="number"
                        id="editWeight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        min="0"
                        step="0.1"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editDimensions" className="block text-sm font-medium text-gray-700">
                        Dimensions
                      </label>
                      <input
                        type="text"
                        id="editDimensions"
                        name="dimensions"
                        value={formData.dimensions}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editWarranty" className="block text-sm font-medium text-gray-700">
                        Warranty
                      </label>
                      <input
                        type="text"
                        id="editWarranty"
                        name="warranty"
                        value={formData.warranty}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
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
                      placeholder="Additional notes about the item..."
                    />
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleUpdateItem}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Update Item
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

      {/* Delete Item Modal */}
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
                      Delete Inventory Item
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete {selectedItem?.partName} ({selectedItem?.partNumber})? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={confirmDeleteItem}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete Item
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

export default Inventory;
