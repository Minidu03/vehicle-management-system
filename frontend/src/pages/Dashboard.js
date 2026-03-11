import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UsersIcon, 
  TruckIcon, 
  CalendarIcon, 
  CurrencyDollarIcon, 
  ArrowTrendingUpIcon, 
  ExclamationTriangleIcon,
  PlusIcon,
  XMarkIcon,
  CheckCircleIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'; 
const Dashboard = () => {
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: 'success', message: '' });

  const [bookingData, setBookingData] = useState({
    customerName: '',
    vehicleMake: '',
    vehicleModel: '',
    serviceType: '',
    date: '',
    time: '',
    notes: ''
  });

  const [vehicleData, setVehicleData] = useState({
    customerId: '',
    make: '',
    model: '',
    year: '',
    vin: '',
    licensePlate: '',
    color: '',
    mileage: '',
    notes: ''
  });

  const [invoiceData, setInvoiceData] = useState({
    customerName: '',
    vehicleInfo: '',
    items: [{ description: '', quantity: 1, price: 0 }],
    subtotal: 0,
    tax: 0,
    total: 0
  }); 
  const revenueData = [ 
    { month: 'Jan', revenue: 4000, bookings: 12 }, 
    { month: 'Feb', revenue: 3000, bookings: 10 }, 
    { month: 'Mar', revenue: 5000, bookings: 15 }, 
    { month: 'Apr', revenue: 4500, bookings: 13 }, 
    { month: 'May', revenue: 6000, bookings: 18 }, 
    { month: 'Jun', revenue: 5500, bookings: 16 }, 
  ]; 
  const serviceTypeData = [ 
    { name: 'Oil Change', value: 35, color: '#3b82f6' }, 
    { name: 'Brake Service', value: 25, color: '#10b981' }, 
    { name: 'Tire Service', value: 20, color: '#f59e0b' }, 
    { name: 'Engine Diagnostics', value: 15, color: '#ef4444' }, 
    { name: 'Other', value: 5, color: '#6b7280' }, 
  ]; 
  const stats = [ 
    { name: 'Total Customers', value: '1,234', icon: UsersIcon, change: '+12%', changeType: 'positive' }, 
    { name: 'Active Vehicles', value: '856', icon: TruckIcon, change: '+8%', changeType: 'positive' }, 
    { name: 'Today\'s Bookings', value: '24', icon: CalendarIcon, change: '+4%', changeType: 'positive' }, 
    { name: 'Monthly Revenue', value: '$5,500', icon: CurrencyDollarIcon, change: '+15%', changeType: 'positive' }, 
  ]; 
  const recentBookings = [ 
    { id: 1, customer: 'John Doe', vehicle: 'Toyota Camry', service: 'Oil Change', date: '2024-03-10', status: 'In Progress' }, 
    { id: 2, customer: 'Jane Smith', vehicle: 'Honda Civic', service: 'Brake Service', date: '2024-03-10', status: 'Completed' }, 
    { id: 3, customer: 'Bob Johnson', vehicle: 'Ford F-150', service: 'Tire Rotation', date: '2024-03-11', status: 'Scheduled' }, 
    { id: 4, customer: 'Alice Brown', vehicle: 'BMW 3 Series', service: 'Engine Diagnostics', date: '2024-03-11', status: 'Scheduled' }, 
  ]; 
  const lowStockParts = [ 
    { id: 1, name: 'Oil Filter 5W-30', currentStock: 3, minStock: 5 }, 
    { id: 2, name: 'Brake Pads Front', currentStock: 2, minStock: 4 }, 
    { id: 3, name: 'Air Filter', currentStock: 1, minStock: 3 }, 
  ]; 
  const getStatusBadge = (status) => { 
    const statusStyles = { 
      'Scheduled': 'bg-blue-100 text-blue-800', 
      'In Progress': 'bg-yellow-100 text-yellow-800', 
      'Completed': 'bg-green-100 text-green-800', 
      'Cancelled': 'bg-red-100 text-red-800', 
    };
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-blue-100 text-blue-800'}`}>{status}</span>;
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const newBooking = {
      id: Date.now(),
      ...bookingData,
      status: 'Scheduled',
      createdAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    showNotification('success', 'Booking created successfully!');
    setBookingData({
      customerName: '',
      vehicleMake: '',
      vehicleModel: '',
      serviceType: '',
      date: '',
      time: '',
      notes: ''
    });
    setShowBookingModal(false);
  };

  const handleVehicleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage
    const vehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
    const newVehicle = {
      id: Date.now(),
      ...vehicleData,
      createdAt: new Date().toISOString()
    };
    vehicles.push(newVehicle);
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
    
    showNotification('success', 'Vehicle added successfully!');
    setVehicleData({
      customerId: '',
      make: '',
      model: '',
      year: '',
      vin: '',
      licensePlate: '',
      color: '',
      mileage: '',
      notes: ''
    });
    setShowVehicleModal(false);
  };

  const handleInvoiceSubmit = (e) => {
    e.preventDefault();
    // Calculate totals
    const subtotal = invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    
    // Save to localStorage
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const newInvoice = {
      id: Date.now(),
      invoiceNumber: `INV-${Date.now()}`,
      ...invoiceData,
      subtotal,
      tax,
      total,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    invoices.push(newInvoice);
    localStorage.setItem('invoices', JSON.stringify(invoices));
    
    showNotification('success', 'Invoice generated successfully!');
    setInvoiceData({
      customerName: '',
      vehicleInfo: '',
      items: [{ description: '', quantity: 1, price: 0 }],
      subtotal: 0,
      tax: 0,
      total: 0
    });
    setShowInvoiceModal(false);
  };

  const addInvoiceItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, price: 0 }]
    }));
  };

  const updateInvoiceItem = (index, field, value) => {
    setInvoiceData(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };

  const removeInvoiceItem = (index) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  }; 
  return ( 
    <div className="min-h-screen bg-gray-50"> 
      <div className="p-6"> 
        <div className="mb-8"> 
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1> 
          <p className="mt-1 text-sm text-gray-600">Welcome back! Here's what's happening with your vehicle service business today.</p> 
        </div> 
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"> 
          {stats.map((stat) => ( 
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg"> 
              <div className="p-5"> 
                <div className="flex items-center"> 
                  <div className="flex-shrink-0"> 
                    <stat.icon className="h-6 w-6 text-gray-400" aria-hidden="true" /> 
                  </div> 
                  <div className="ml-5 w-0 flex-1"> 
                    <dl> 
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt> 
                      <dd className="flex items-baseline"> 
                        <div className="text-2xl font-semibold text-gray-900">{stat.value}</div> 
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${ 
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600' 
                        }`}> 
                          <span className="flex items-center"> 
                            <ArrowTrendingUpIcon className="self-center flex-shrink-0 h-4 w-4" /> 
                            <span className="ml-1">{stat.change}</span> 
                          </span> 
                        </div> 
                      </dd> 
                    </dl> 
                  </div> 
                </div> 
              </div> 
            </div> 
          ))} 
        </div> 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"> 
          <div className="bg-white overflow-hidden shadow rounded-lg"> 
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Revenue & Bookings Trend</h3>
            </div> 
            <div className="px-4 py-5 sm:p-6"> 
              <ResponsiveContainer width="100%" height={300}> 
                <LineChart data={revenueData}> 
                  <CartesianGrid strokeDasharray="3 3" /> 
                  <XAxis dataKey="month" /> 
                  <YAxis yAxisId="left" /> 
                  <YAxis yAxisId="right" orientation="right" /> 
                  <Tooltip /> 
                  <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} /> 
                  <Line yAxisId="right" type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={2} /> 
                </LineChart> 
              </ResponsiveContainer> 
            </div> 
          </div> 
          <div className="bg-white overflow-hidden shadow rounded-lg"> 
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200"> 
              <h3 className="text-lg font-medium text-gray-900">Service Type Distribution</h3> 
            </div> 
            <div className="px-4 py-5 sm:p-6"> 
              <ResponsiveContainer width="100%" height={300}> 
                <PieChart> 
                  <Pie 
                    data={serviceTypeData} 
                    cx="50%" 
                    cy="50%" 
                    labelLine={false} 
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} 
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
          </div> 
        </div> 
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"> 
          <div className="lg:col-span-2 bg-white overflow-hidden shadow rounded-lg"> 
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200"> 
              <h3 className="text-lg font-medium text-gray-900">Recent Bookings</h3> 
            </div> 
            <div className="px-4 py-5 sm:p-6"> 
              <div className="overflow-x-auto"> 
                <table className="min-w-full divide-y divide-gray-200"> 
                  <thead> 
                    <tr> 
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th> 
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th> 
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th> 
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th> 
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th> 
                    </tr> 
                  </thead> 
                  <tbody className="bg-white divide-y divide-gray-200"> 
                    {recentBookings.map((booking) => ( 
                      <tr key={booking.id} className="hover:bg-gray-50"> 
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.customer}</td> 
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.vehicle}</td> 
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.service}</td> 
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td> 
                        <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(booking.status)}</td> 
                      </tr> 
                    ))} 
                  </tbody> 
                </table> 
              </div> 
            </div> 
          </div> 
          <div className="bg-white overflow-hidden shadow rounded-lg"> 
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200"> 
              <div className="flex items-center"> 
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mr-2" /> 
                <h3 className="text-lg font-medium text-gray-900">Low Stock Alerts</h3> 
              </div> 
            </div> 
            <div className="px-4 py-5 sm:p-6"> 
              <div className="space-y-3"> 
                {lowStockParts.map((part) => ( 
                  <div key={part.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg"> 
                    <div className="flex-1"> 
                      <p className="text-sm font-medium text-gray-900">{part.name}</p> 
                      <p className="text-sm text-gray-500">
                        Current: {part.currentStock} | Min: {part.minStock}
                      </p> 
                    </div> 
                    <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"> 
                      Reorder 
                    </button> 
                  </div> 
                ))} 
              </div> 
            </div> 
          </div> 
        </div> 
        <div className="bg-white overflow-hidden shadow rounded-lg"> 
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200"> 
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3> 
          </div> 
          <div className="px-4 py-5 sm:p-6"> 
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"> 
              <button 
                onClick={() => setShowBookingModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              > 
                <CalendarIcon className="h-5 w-5 mr-2" /> 
                New Booking 
              </button> 
              <button 
                onClick={() => navigate('/customers')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              > 
                <UsersIcon className="h-5 w-5 mr-2" /> 
                Add Customer 
              </button> 
              <button 
                onClick={() => setShowVehicleModal(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              > 
                <TruckIcon className="h-5 w-5 mr-2" /> 
                Add Vehicle 
              </button> 
              <button 
                onClick={() => setShowInvoiceModal(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              > 
                <CurrencyDollarIcon className="h-5 w-5 mr-2" /> 
                Generate Invoice 
              </button> 
            </div> 
          </div> 
        </div> 
      </div>

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

      {/* New Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowBookingModal(false)}></div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">New Booking</h3>
                  <button onClick={() => setShowBookingModal(false)} className="text-gray-400 hover:text-gray-600">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                    <input
                      type="text"
                      required
                      value={bookingData.customerName}
                      onChange={(e) => setBookingData({...bookingData, customerName: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter customer name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Vehicle Make</label>
                      <input
                        type="text"
                        required
                        value={bookingData.vehicleMake}
                        onChange={(e) => setBookingData({...bookingData, vehicleMake: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Toyota"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Vehicle Model</label>
                      <input
                        type="text"
                        required
                        value={bookingData.vehicleModel}
                        onChange={(e) => setBookingData({...bookingData, vehicleModel: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Camry"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Service Type</label>
                    <select
                      required
                      value={bookingData.serviceType}
                      onChange={(e) => setBookingData({...bookingData, serviceType: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select service</option>
                      <option value="Oil Change">Oil Change</option>
                      <option value="Brake Service">Brake Service</option>
                      <option value="Tire Service">Tire Service</option>
                      <option value="Engine Diagnostics">Engine Diagnostics</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date</label>
                      <input
                        type="date"
                        required
                        value={bookingData.date}
                        onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Time</label>
                      <input
                        type="time"
                        required
                        value={bookingData.time}
                        onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea
                      value={bookingData.notes}
                      onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Additional notes..."
                    />
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleBookingSubmit}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Create Booking
                </button>
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {showVehicleModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowVehicleModal(false)}></div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Add Vehicle</h3>
                  <button onClick={() => setShowVehicleModal(false)} className="text-gray-400 hover:text-gray-600">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleVehicleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Customer ID</label>
                    <input
                      type="text"
                      required
                      value={vehicleData.customerId}
                      onChange={(e) => setVehicleData({...vehicleData, customerId: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter customer ID"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Make</label>
                      <input
                        type="text"
                        required
                        value={vehicleData.make}
                        onChange={(e) => setVehicleData({...vehicleData, make: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Toyota"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Model</label>
                      <input
                        type="text"
                        required
                        value={vehicleData.model}
                        onChange={(e) => setVehicleData({...vehicleData, model: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Camry"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Year</label>
                      <input
                        type="number"
                        required
                        value={vehicleData.year}
                        onChange={(e) => setVehicleData({...vehicleData, year: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="2024"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Color</label>
                      <input
                        type="text"
                        value={vehicleData.color}
                        onChange={(e) => setVehicleData({...vehicleData, color: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Silver"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">VIN</label>
                      <input
                        type="text"
                        value={vehicleData.vin}
                        onChange={(e) => setVehicleData({...vehicleData, vin: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="1HGCM82633A123456"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">License Plate</label>
                      <input
                        type="text"
                        value={vehicleData.licensePlate}
                        onChange={(e) => setVehicleData({...vehicleData, licensePlate: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="ABC-1234"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mileage</label>
                    <input
                      type="number"
                      value={vehicleData.mileage}
                      onChange={(e) => setVehicleData({...vehicleData, mileage: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="45000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea
                      value={vehicleData.notes}
                      onChange={(e) => setVehicleData({...vehicleData, notes: e.target.value})}
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Additional notes..."
                    />
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleVehicleSubmit}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add Vehicle
                </button>
                <button
                  type="button"
                  onClick={() => setShowVehicleModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generate Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowInvoiceModal(false)}></div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Generate Invoice</h3>
                  <button onClick={() => setShowInvoiceModal(false)} className="text-gray-400 hover:text-gray-600">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleInvoiceSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                      <input
                        type="text"
                        required
                        value={invoiceData.customerName}
                        onChange={(e) => setInvoiceData({...invoiceData, customerName: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter customer name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Vehicle Info</label>
                      <input
                        type="text"
                        required
                        value={invoiceData.vehicleInfo}
                        onChange={(e) => setInvoiceData({...invoiceData, vehicleInfo: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Make, Model, Year"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Invoice Items</label>
                      <button
                        type="button"
                        onClick={addInvoiceItem}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                      >
                        <PlusIcon className="h-4 w-4 mr-1" />
                        Add Item
                      </button>
                    </div>
                    <div className="space-y-2">
                      {invoiceData.items.map((item, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Description"
                            value={item.description}
                            onChange={(e) => updateInvoiceItem(index, 'description', e.target.value)}
                            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                          <input
                            type="number"
                            placeholder="Qty"
                            value={item.quantity}
                            onChange={(e) => updateInvoiceItem(index, 'quantity', parseInt(e.target.value) || 0)}
                            className="w-20 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                          <input
                            type="number"
                            placeholder="Price"
                            value={item.price}
                            onChange={(e) => updateInvoiceItem(index, 'price', parseFloat(e.target.value) || 0)}
                            className="w-24 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => removeInvoiceItem(index)}
                            className="p-2 text-red-600 hover:text-red-800"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleInvoiceSubmit}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Generate Invoice
                </button>
                <button
                  type="button"
                  onClick={() => setShowInvoiceModal(false)}
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
export default Dashboard; 
