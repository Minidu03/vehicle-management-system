import React, { useState, useEffect } from 'react';
import { 
  CalendarIcon, 
  PlusIcon, 
  MagnifyingGlassIcon, 
  PencilIcon, 
  TrashIcon, 
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  UserIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

const Bookings = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      customerId: 1,
      vehicleMake: 'Toyota',
      vehicleModel: 'Camry',
      vehicleYear: 2022,
      vehicleVin: '1HGBH41JXMN109186',
      serviceType: 'Oil Change',
      date: '2024-03-15',
      time: '10:00 AM',
      status: 'Scheduled',
      mechanic: 'Mike Johnson',
      mechanicId: 1,
      estimatedDuration: '2 hours',
      estimatedCost: 75.00,
      notes: 'Regular maintenance schedule',
      createdAt: '2024-03-01'
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      customerId: 2,
      vehicleMake: 'Honda',
      vehicleModel: 'Civic',
      vehicleYear: 2023,
      vehicleVin: '2HGBH41JXMN109187',
      serviceType: 'Brake Inspection',
      date: '2024-03-15',
      time: '2:00 PM',
      status: 'In Progress',
      mechanic: 'Sarah Williams',
      mechanicId: 2,
      estimatedDuration: '3 hours',
      estimatedCost: 150.00,
      notes: 'Customer reported squeaking brakes',
      createdAt: '2024-03-02'
    },
    {
      id: 3,
      customerName: 'Bob Johnson',
      customerId: 3,
      vehicleMake: 'Ford',
      vehicleModel: 'F-150',
      vehicleYear: 2021,
      vehicleVin: '3HGBH41JXMN109188',
      serviceType: 'Tire Rotation',
      date: '2024-03-16',
      time: '9:00 AM',
      status: 'Scheduled',
      mechanic: 'Tom Davis',
      mechanicId: 3,
      estimatedDuration: '1 hour',
      estimatedCost: 50.00,
      notes: 'Regular tire maintenance',
      createdAt: '2024-03-03'
    },
    {
      id: 4,
      customerName: 'Alice Brown',
      customerId: 4,
      vehicleMake: 'BMW',
      vehicleModel: '3 Series',
      vehicleYear: 2023,
      vehicleVin: '4HGBH41JXMN109189',
      serviceType: 'Full Service',
      date: '2024-03-14',
      time: '11:00 AM',
      status: 'Completed',
      mechanic: 'Mike Johnson',
      mechanicId: 1,
      estimatedDuration: '4 hours',
      estimatedCost: 300.00,
      notes: 'Comprehensive vehicle inspection',
      createdAt: '2024-03-04'
    },
    {
      id: 5,
      customerName: 'Charlie Wilson',
      customerId: 5,
      vehicleMake: 'Tesla',
      vehicleModel: 'Model 3',
      vehicleYear: 2023,
      vehicleVin: '5HGBH41JXMN109190',
      serviceType: 'Battery Check',
      date: '2024-03-17',
      time: '3:00 PM',
      status: 'Scheduled',
      mechanic: 'Sarah Williams',
      mechanicId: 2,
      estimatedDuration: '1.5 hours',
      estimatedCost: 100.00,
      notes: 'Electric vehicle battery diagnostic',
      createdAt: '2024-03-05'
    }
  ]);
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerId: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleVin: '',
    serviceType: '',
    date: '',
    time: '',
    status: 'Scheduled',
    mechanic: '',
    mechanicId: '',
    estimatedDuration: '',
    estimatedCost: '',
    notes: ''
  });

  const [notification, setNotification] = useState({
    show: false,
    type: 'success',
    message: ''
  });

  // Load bookings from localStorage on component mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const filteredBookings = bookings.filter(booking =>
    booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.vehicleMake.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.vehicleModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.mechanic.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleAddBooking = (e) => {
    e.preventDefault();
    
    const newBooking = {
      id: Date.now(),
      ...formData,
      customerId: parseInt(formData.customerId) || null,
      mechanicId: parseInt(formData.mechanicId) || null,
      vehicleYear: parseInt(formData.vehicleYear),
      estimatedCost: parseFloat(formData.estimatedCost) || 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setBookings(prev => [...prev, newBooking]);
    showNotification('success', 'Booking created successfully!');
    
    // Reset form and close modal
    setFormData({
      customerName: '',
      customerId: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vehicleVin: '',
      serviceType: '',
      date: '',
      time: '',
      status: 'Scheduled',
      mechanic: '',
      mechanicId: '',
      estimatedDuration: '',
      estimatedCost: '',
      notes: ''
    });
    setShowAddModal(false);
  };

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    setFormData({
      customerName: booking.customerName,
      customerId: booking.customerId?.toString() || '',
      vehicleMake: booking.vehicleMake,
      vehicleModel: booking.vehicleModel,
      vehicleYear: booking.vehicleYear.toString(),
      vehicleVin: booking.vehicleVin,
      serviceType: booking.serviceType,
      date: booking.date,
      time: booking.time,
      status: booking.status,
      mechanic: booking.mechanic,
      mechanicId: booking.mechanicId?.toString() || '',
      estimatedDuration: booking.estimatedDuration,
      estimatedCost: booking.estimatedCost.toString(),
      notes: booking.notes
    });
    setShowEditModal(true);
  };

  const handleUpdateBooking = (e) => {
    e.preventDefault();
    
    setBookings(prev => prev.map(booking =>
      booking.id === selectedBooking.id
        ? { 
            ...booking, 
            ...formData,
            customerId: parseInt(formData.customerId) || null,
            mechanicId: parseInt(formData.mechanicId) || null,
            vehicleYear: parseInt(formData.vehicleYear),
            estimatedCost: parseFloat(formData.estimatedCost) || 0
          }
        : booking
    ));
    
    showNotification('success', 'Booking updated successfully!');
    
    // Reset form and close modal
    setFormData({
      customerName: '',
      customerId: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vehicleVin: '',
      serviceType: '',
      date: '',
      time: '',
      status: 'Scheduled',
      mechanic: '',
      mechanicId: '',
      estimatedDuration: '',
      estimatedCost: '',
      notes: ''
    });
    setShowEditModal(false);
    setSelectedBooking(null);
  };

  const handleDeleteBooking = (booking) => {
    setSelectedBooking(booking);
    setShowDeleteModal(true);
  };

  const confirmDeleteBooking = () => {
    setBookings(prev => prev.filter(booking => booking.id !== selectedBooking.id));
    showNotification('success', 'Booking deleted successfully!');
    setShowDeleteModal(false);
    setSelectedBooking(null);
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Scheduled': 'bg-blue-100 text-blue-800',
      'In Progress': 'bg-yellow-100 text-yellow-800',
      'Completed': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800',
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
              <CalendarIcon className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Service Bookings</h1>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              New Booking
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
                  placeholder="Search bookings by customer, vehicle, service, or mechanic..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Total: <span className="font-semibold text-gray-900">{filteredBookings.length}</span> bookings
              </div>
            </div>
          </div>
        </div>

        {/* Booking Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredBookings.map((booking) => (
              <li key={booking.id} className="hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <CalendarIcon className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium text-gray-900">
                              {booking.serviceType}
                            </h3>
                            {getStatusBadge(booking.status)}
                          </div>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <UserIcon className="h-4 w-4 mr-1" />
                            <span className="font-medium">Customer:</span> {booking.customerName} | 
                            <TruckIcon className="h-4 w-4 ml-2 mr-1" />
                            <span className="font-medium">Vehicle:</span> {booking.vehicleYear} {booking.vehicleMake} {booking.vehicleModel}
                          </div>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            <span className="font-medium">Date:</span> {booking.date} at {booking.time} | 
                            <span className="ml-2 font-medium">Duration:</span> {booking.estimatedDuration} | 
                            <span className="ml-2 font-medium">Cost:</span> ${booking.estimatedCost.toFixed(2)}
                          </div>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <UserIcon className="h-4 w-4 mr-1" />
                            <span className="font-medium">Mechanic:</span> {booking.mechanic} | 
                            <span className="ml-2 font-medium">VIN:</span> {booking.vehicleVin}
                          </div>
                          {booking.notes && (
                            <div className="mt-1 text-sm text-gray-500">
                              <span className="font-medium">Notes:</span> {booking.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEditBooking(booking)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                        title="Edit Booking"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteBooking(booking)}
                        className="p-2 text-gray-400 hover:text-red-600"
                        title="Delete Booking"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-500">Get started by creating your first booking.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowAddModal(false)}></div>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">New Booking</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleAddBooking} className="space-y-6">
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

                  {/* VIN and Service Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="vehicleVin" className="block text-sm font-medium text-gray-700">
                        VIN Number
                      </label>
                      <input
                        type="text"
                        id="vehicleVin"
                        name="vehicleVin"
                        value={formData.vehicleVin}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="1HGBH41JXMN109186"
                      />
                    </div>
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
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Date
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
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                        Time
                      </label>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Status and Mechanic */}
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
                        <option value="Scheduled">Scheduled</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="mechanic" className="block text-sm font-medium text-gray-700">
                        Mechanic
                      </label>
                      <input
                        type="text"
                        id="mechanic"
                        name="mechanic"
                        value={formData.mechanic}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Mike Johnson"
                      />
                    </div>
                  </div>

                  {/* Duration and Cost */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="estimatedDuration" className="block text-sm font-medium text-gray-700">
                        Estimated Duration
                      </label>
                      <input
                        type="text"
                        id="estimatedDuration"
                        name="estimatedDuration"
                        value={formData.estimatedDuration}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="2 hours"
                      />
                    </div>
                    <div>
                      <label htmlFor="estimatedCost" className="block text-sm font-medium text-gray-700">
                        Estimated Cost ($)
                      </label>
                      <input
                        type="number"
                        id="estimatedCost"
                        name="estimatedCost"
                        value={formData.estimatedCost}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="75.00"
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
                      placeholder="Additional notes about the booking..."
                    />
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleAddBooking}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Create Booking
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

      {/* Edit Booking Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowEditModal(false)}></div>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Edit Booking</h3>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleUpdateBooking} className="space-y-6">
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

                  {/* VIN and Service Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="editVehicleVin" className="block text-sm font-medium text-gray-700">
                        VIN Number
                      </label>
                      <input
                        type="text"
                        id="editVehicleVin"
                        name="vehicleVin"
                        value={formData.vehicleVin}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
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
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="editDate" className="block text-sm font-medium text-gray-700">
                        Date
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
                      <label htmlFor="editTime" className="block text-sm font-medium text-gray-700">
                        Time
                      </label>
                      <input
                        type="time"
                        id="editTime"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Status and Mechanic */}
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
                        <option value="Scheduled">Scheduled</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="editMechanic" className="block text-sm font-medium text-gray-700">
                        Mechanic
                      </label>
                      <input
                        type="text"
                        id="editMechanic"
                        name="mechanic"
                        value={formData.mechanic}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Duration and Cost */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="editEstimatedDuration" className="block text-sm font-medium text-gray-700">
                        Estimated Duration
                      </label>
                      <input
                        type="text"
                        id="editEstimatedDuration"
                        name="estimatedDuration"
                        value={formData.estimatedDuration}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editEstimatedCost" className="block text-sm font-medium text-gray-700">
                        Estimated Cost ($)
                      </label>
                      <input
                        type="number"
                        id="editEstimatedCost"
                        name="estimatedCost"
                        value={formData.estimatedCost}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
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
                      placeholder="Additional notes about the booking..."
                    />
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleUpdateBooking}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Update Booking
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

      {/* Delete Booking Modal */}
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
                      Delete Booking
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete the booking for {selectedBooking?.serviceType} on {selectedBooking?.date}? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={confirmDeleteBooking}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete Booking
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

export default Bookings; 
