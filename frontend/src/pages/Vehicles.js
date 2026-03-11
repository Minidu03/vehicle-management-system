import React, { useState, useEffect } from 'react';
import { 
  TruckIcon, 
  PlusIcon, 
  MagnifyingGlassIcon, 
  PencilIcon, 
  TrashIcon, 
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const Vehicles = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      vin: '1HGBH41JXMN109186',
      licensePlate: 'ABC-1234',
      color: 'Silver',
      engineType: 'Gasoline',
      transmission: 'Automatic',
      mileage: 15000,
      status: 'Available',
      lastServiceDate: '2024-02-15',
      nextServiceDate: '2024-05-15',
      customerName: 'John Doe',
      customerId: 1,
      notes: 'Regular maintenance schedule',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      make: 'Honda',
      model: 'Civic',
      year: 2023,
      vin: '2HGBH41JXMN109187',
      licensePlate: 'XYZ-5678',
      color: 'Blue',
      engineType: 'Gasoline',
      transmission: 'Manual',
      mileage: 8000,
      status: 'In Service',
      lastServiceDate: '2024-03-01',
      nextServiceDate: '2024-06-01',
      customerName: 'Jane Smith',
      customerId: 2,
      notes: 'Recently serviced',
      createdAt: '2024-02-01'
    },
    {
      id: 3,
      make: 'Ford',
      model: 'F-150',
      year: 2021,
      vin: '3HGBH41JXMN109188',
      licensePlate: 'DEF-9012',
      color: 'Red',
      engineType: 'Diesel',
      transmission: 'Automatic',
      mileage: 25000,
      status: 'Available',
      lastServiceDate: '2024-01-20',
      nextServiceDate: '2024-04-20',
      customerName: 'Bob Johnson',
      customerId: 3,
      notes: 'Heavy duty vehicle',
      createdAt: '2024-01-20'
    },
    {
      id: 4,
      make: 'BMW',
      model: '3 Series',
      year: 2023,
      vin: '4HGBH41JXMN109189',
      licensePlate: 'GHI-3456',
      color: 'Black',
      engineType: 'Gasoline',
      transmission: 'Automatic',
      mileage: 12000,
      status: 'Available',
      lastServiceDate: '2024-02-28',
      nextServiceDate: '2024-05-28',
      customerName: 'Alice Brown',
      customerId: 4,
      notes: 'Premium vehicle',
      createdAt: '2024-02-15'
    },
    {
      id: 5,
      make: 'Tesla',
      model: 'Model 3',
      year: 2023,
      vin: '5HGBH41JXMN109190',
      licensePlate: 'JKL-7890',
      color: 'White',
      engineType: 'Electric',
      transmission: 'Automatic',
      mileage: 18000,
      status: 'In Service',
      lastServiceDate: '2024-03-05',
      nextServiceDate: '2024-06-05',
      customerName: 'Charlie Wilson',
      customerId: 5,
      notes: 'Electric vehicle - special maintenance',
      createdAt: '2024-03-01'
    }
  ]);
  
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    vin: '',
    licensePlate: '',
    color: '',
    engineType: 'Gasoline',
    transmission: 'Automatic',
    mileage: '',
    status: 'Available',
    customerName: '',
    customerId: '',
    notes: ''
  });

  const [notification, setNotification] = useState({
    show: false,
    type: 'success',
    message: ''
  });

  // Load vehicles from localStorage on component mount
  useEffect(() => {
    const savedVehicles = localStorage.getItem('vehicles');
    if (savedVehicles) {
      setVehicles(JSON.parse(savedVehicles));
    }
  }, []);

  // Save vehicles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleAddVehicle = (e) => {
    e.preventDefault();
    
    // Check if VIN already exists
    const vinExists = vehicles.some(vehicle => vehicle.vin === formData.vin);
    if (vinExists) {
      showNotification('error', 'A vehicle with this VIN already exists!');
      return;
    }

    // Check if license plate already exists
    const plateExists = vehicles.some(vehicle => vehicle.licensePlate === formData.licensePlate);
    if (plateExists) {
      showNotification('error', 'A vehicle with this license plate already exists!');
      return;
    }

    const newVehicle = {
      id: Date.now(),
      ...formData,
      mileage: parseInt(formData.mileage),
      year: parseInt(formData.year),
      customerId: parseInt(formData.customerId) || null,
      lastServiceDate: new Date().toISOString().split('T')[0],
      nextServiceDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setVehicles(prev => [...prev, newVehicle]);
    showNotification('success', 'Vehicle added successfully!');
    
    // Reset form and close modal
    setFormData({
      make: '',
      model: '',
      year: '',
      vin: '',
      licensePlate: '',
      color: '',
      engineType: 'Gasoline',
      transmission: 'Automatic',
      mileage: '',
      status: 'Available',
      customerName: '',
      customerId: '',
      notes: ''
    });
    setShowAddModal(false);
  };

  const handleEditVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData({
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year.toString(),
      vin: vehicle.vin,
      licensePlate: vehicle.licensePlate,
      color: vehicle.color,
      engineType: vehicle.engineType,
      transmission: vehicle.transmission,
      mileage: vehicle.mileage.toString(),
      status: vehicle.status,
      customerName: vehicle.customerName || '',
      customerId: vehicle.customerId?.toString() || '',
      notes: vehicle.notes
    });
    setShowEditModal(true);
  };

  const handleUpdateVehicle = (e) => {
    e.preventDefault();
    
    // Check if VIN already exists (excluding current vehicle)
    const vinExists = vehicles.some(vehicle => 
      vehicle.vin === formData.vin && vehicle.id !== selectedVehicle.id
    );
    if (vinExists) {
      showNotification('error', 'A vehicle with this VIN already exists!');
      return;
    }

    // Check if license plate already exists (excluding current vehicle)
    const plateExists = vehicles.some(vehicle => 
      vehicle.licensePlate === formData.licensePlate && vehicle.id !== selectedVehicle.id
    );
    if (plateExists) {
      showNotification('error', 'A vehicle with this license plate already exists!');
      return;
    }

    setVehicles(prev => prev.map(vehicle =>
      vehicle.id === selectedVehicle.id
        ? { 
            ...vehicle, 
            ...formData,
            mileage: parseInt(formData.mileage),
            year: parseInt(formData.year),
            customerId: parseInt(formData.customerId) || null
          }
        : vehicle
    ));
    
    showNotification('success', 'Vehicle updated successfully!');
    
    // Reset form and close modal
    setFormData({
      make: '',
      model: '',
      year: '',
      vin: '',
      licensePlate: '',
      color: '',
      engineType: 'Gasoline',
      transmission: 'Automatic',
      mileage: '',
      status: 'Available',
      customerName: '',
      customerId: '',
      notes: ''
    });
    setShowEditModal(false);
    setSelectedVehicle(null);
  };

  const handleDeleteVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowDeleteModal(true);
  };

  const confirmDeleteVehicle = () => {
    setVehicles(prev => prev.filter(vehicle => vehicle.id !== selectedVehicle.id));
    showNotification('success', 'Vehicle deleted successfully!');
    setShowDeleteModal(false);
    setSelectedVehicle(null);
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Available': 'bg-green-100 text-green-800',
      'In Service': 'bg-yellow-100 text-yellow-800',
      'Maintenance': 'bg-red-100 text-red-800',
      'Out of Service': 'bg-gray-100 text-gray-800',
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
              <TruckIcon className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Vehicle Management</h1>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Vehicle
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
                  placeholder="Search vehicles by make, model, VIN, or license plate..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Total: <span className="font-semibold text-gray-900">{filteredVehicles.length}</span> vehicles
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredVehicles.map((vehicle) => (
              <li key={vehicle.id} className="hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <TruckIcon className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium text-gray-900">
                              {vehicle.year} {vehicle.make} {vehicle.model}
                            </h3>
                            {getStatusBadge(vehicle.status)}
                          </div>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <span className="font-medium">VIN:</span> {vehicle.vin}
                          </div>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <span className="font-medium">License:</span> {vehicle.licensePlate}
                          </div>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <span className="font-medium">Color:</span> {vehicle.color} | 
                            <span className="ml-2 font-medium">Engine:</span> {vehicle.engineType} | 
                            <span className="ml-2 font-medium">Transmission:</span> {vehicle.transmission}
                          </div>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <span className="font-medium">Mileage:</span> {vehicle.mileage.toLocaleString()} miles | 
                            <span className="ml-2 font-medium">Owner:</span> {vehicle.customerName || 'Unassigned'}
                          </div>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            Last Service: {vehicle.lastServiceDate} | Next: {vehicle.nextServiceDate}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEditVehicle(vehicle)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                        title="Edit Vehicle"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteVehicle(vehicle)}
                        className="p-2 text-gray-400 hover:text-red-600"
                        title="Delete Vehicle"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {filteredVehicles.length === 0 && (
            <div className="text-center py-12">
              <TruckIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles found</h3>
              <p className="text-gray-500">Get started by adding your first vehicle.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowAddModal(false)}></div>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Add New Vehicle</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleAddVehicle} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="make" className="block text-sm font-medium text-gray-700">
                        Make
                      </label>
                      <input
                        type="text"
                        id="make"
                        name="make"
                        value={formData.make}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Toyota"
                      />
                    </div>
                    <div>
                      <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                        Model
                      </label>
                      <input
                        type="text"
                        id="model"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Camry"
                      />
                    </div>
                    <div>
                      <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                        Year
                      </label>
                      <input
                        type="number"
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        required
                        min="1900"
                        max={new Date().getFullYear() + 1}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="2023"
                      />
                    </div>
                  </div>

                  {/* VIN and License Plate */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="vin" className="block text-sm font-medium text-gray-700">
                        VIN Number
                      </label>
                      <input
                        type="text"
                        id="vin"
                        name="vin"
                        value={formData.vin}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="1HGBH41JXMN109186"
                      />
                    </div>
                    <div>
                      <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700">
                        License Plate
                      </label>
                      <input
                        type="text"
                        id="licensePlate"
                        name="licensePlate"
                        value={formData.licensePlate}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="ABC-1234"
                      />
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                        Color
                      </label>
                      <input
                        type="text"
                        id="color"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Silver"
                      />
                    </div>
                    <div>
                      <label htmlFor="engineType" className="block text-sm font-medium text-gray-700">
                        Engine Type
                      </label>
                      <select
                        id="engineType"
                        name="engineType"
                        value={formData.engineType}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="Gasoline">Gasoline</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="transmission" className="block text-sm font-medium text-gray-700">
                        Transmission
                      </label>
                      <select
                        id="transmission"
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                        <option value="CVT">CVT</option>
                      </select>
                    </div>
                  </div>

                  {/* Mileage and Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">
                        Mileage
                      </label>
                      <input
                        type="number"
                        id="mileage"
                        name="mileage"
                        value={formData.mileage}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="15000"
                      />
                    </div>
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
                        <option value="Available">Available</option>
                        <option value="In Service">In Service</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Out of Service">Out of Service</option>
                      </select>
                    </div>
                  </div>

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
                      placeholder="Additional notes about the vehicle..."
                    />
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleAddVehicle}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add Vehicle
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

      {/* Edit Vehicle Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowEditModal(false)}></div>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Edit Vehicle</h3>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleUpdateVehicle} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="editMake" className="block text-sm font-medium text-gray-700">
                        Make
                      </label>
                      <input
                        type="text"
                        id="editMake"
                        name="make"
                        value={formData.make}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editModel" className="block text-sm font-medium text-gray-700">
                        Model
                      </label>
                      <input
                        type="text"
                        id="editModel"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editYear" className="block text-sm font-medium text-gray-700">
                        Year
                      </label>
                      <input
                        type="number"
                        id="editYear"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        required
                        min="1900"
                        max={new Date().getFullYear() + 1}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* VIN and License Plate */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="editVin" className="block text-sm font-medium text-gray-700">
                        VIN Number
                      </label>
                      <input
                        type="text"
                        id="editVin"
                        name="vin"
                        value={formData.vin}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editLicensePlate" className="block text-sm font-medium text-gray-700">
                        License Plate
                      </label>
                      <input
                        type="text"
                        id="editLicensePlate"
                        name="licensePlate"
                        value={formData.licensePlate}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="editColor" className="block text-sm font-medium text-gray-700">
                        Color
                      </label>
                      <input
                        type="text"
                        id="editColor"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editEngineType" className="block text-sm font-medium text-gray-700">
                        Engine Type
                      </label>
                      <select
                        id="editEngineType"
                        name="engineType"
                        value={formData.engineType}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="Gasoline">Gasoline</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="editTransmission" className="block text-sm font-medium text-gray-700">
                        Transmission
                      </label>
                      <select
                        id="editTransmission"
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                        <option value="CVT">CVT</option>
                      </select>
                    </div>
                  </div>

                  {/* Mileage and Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="editMileage" className="block text-sm font-medium text-gray-700">
                        Mileage
                      </label>
                      <input
                        type="number"
                        id="editMileage"
                        name="mileage"
                        value={formData.mileage}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
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
                        <option value="Available">Available</option>
                        <option value="In Service">In Service</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Out of Service">Out of Service</option>
                      </select>
                    </div>
                  </div>

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
                      placeholder="Additional notes about the vehicle..."
                    />
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleUpdateVehicle}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Update Vehicle
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

      {/* Delete Vehicle Modal */}
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
                      Delete Vehicle
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete {selectedVehicle?.year} {selectedVehicle?.make} {selectedVehicle?.model}? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={confirmDeleteVehicle}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete Vehicle
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

export default Vehicles; 
