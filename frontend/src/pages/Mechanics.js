import React, { useState, useEffect } from 'react';
import { 
  WrenchScrewdriverIcon, 
  PlusIcon, 
  MagnifyingGlassIcon, 
  PencilIcon, 
  TrashIcon, 
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  ClockIcon,
  StarIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

const Mechanics = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [mechanics, setMechanics] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      employeeId: 'MECH001',
      email: 'john.smith@garage.com',
      phone: '+1-555-0101',
      specialization: 'Engine Repair',
      experience: 8,
      hourlyRate: 45.00,
      status: 'Available',
      hireDate: '2016-03-15',
      certifications: ['ASE Master Technician', 'Engine Specialist'],
      address: '123 Main St, City, State 12345',
      availability: 'Full-time',
      rating: 4.8,
      completedJobs: 342,
      currentWorkload: 3,
      skills: ['Engine Diagnostics', 'Transmission Repair', 'Electrical Systems'],
      notes: 'Senior mechanic with excellent customer service skills'
    },
    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Johnson',
      employeeId: 'MECH002',
      email: 'sarah.johnson@garage.com',
      phone: '+1-555-0102',
      specialization: 'Transmission',
      experience: 5,
      hourlyRate: 42.00,
      status: 'Busy',
      hireDate: '2019-06-20',
      certifications: ['Transmission Specialist', 'Hybrid Vehicle Certified'],
      address: '456 Oak Ave, City, State 12345',
      availability: 'Full-time',
      rating: 4.6,
      completedJobs: 256,
      currentWorkload: 5,
      skills: ['Transmission Overhaul', 'Clutch Repair', 'CV Joint Service'],
      notes: 'Specializes in automatic and manual transmissions'
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Williams',
      employeeId: 'MECH003',
      email: 'mike.williams@garage.com',
      phone: '+1-555-0103',
      specialization: 'Brake Systems',
      experience: 6,
      hourlyRate: 40.00,
      status: 'Available',
      hireDate: '2018-01-10',
      certifications: ['Brake Systems Specialist', 'Safety Inspector'],
      address: '789 Pine Rd, City, State 12345',
      availability: 'Full-time',
      rating: 4.7,
      completedJobs: 189,
      currentWorkload: 2,
      skills: ['Brake Repair', 'ABS Systems', 'Wheel Alignment'],
      notes: 'Very efficient with brake diagnostics and repairs'
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Brown',
      employeeId: 'MECH004',
      email: 'emily.brown@garage.com',
      phone: '+1-555-0104',
      specialization: 'Electrical Systems',
      experience: 4,
      hourlyRate: 38.00,
      status: 'On Leave',
      hireDate: '2020-02-15',
      certifications: ['Electrical Systems Certified', 'Hybrid Specialist'],
      address: '321 Elm St, City, State 12345',
      availability: 'Part-time',
      rating: 4.5,
      completedJobs: 98,
      currentWorkload: 0,
      skills: ['Wiring Diagnostics', 'Battery Service', 'ECU Programming'],
      notes: 'Expert in modern vehicle electronics and diagnostics'
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Davis',
      employeeId: 'MECH005',
      email: 'david.davis@garage.com',
      phone: '+1-555-0105',
      specialization: 'General Service',
      experience: 3,
      hourlyRate: 35.00,
      status: 'Available',
      hireDate: '2021-07-01',
      certifications: ['Basic Maintenance', 'Oil Change Specialist'],
      address: '654 Maple Dr, City, State 12345',
      availability: 'Full-time',
      rating: 4.3,
      completedJobs: 67,
      currentWorkload: 1,
      skills: ['Oil Changes', 'Tire Service', 'Basic Maintenance'],
      notes: 'Great with routine maintenance and customer education'
    }
  ]);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    employeeId: '',
    email: '',
    phone: '',
    specialization: '',
    experience: '',
    hourlyRate: '',
    status: 'Available',
    hireDate: '',
    certifications: '',
    address: '',
    availability: 'Full-time',
    rating: '',
    completedJobs: '',
    currentWorkload: '',
    skills: '',
    notes: ''
  });

  const [notification, setNotification] = useState({
    show: false,
    type: 'success',
    message: ''
  });

  // Load mechanics from localStorage on component mount
  useEffect(() => {
    const savedMechanics = localStorage.getItem('mechanics');
    if (savedMechanics) {
      setMechanics(JSON.parse(savedMechanics));
    }
  }, []);

  // Save mechanics to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('mechanics', JSON.stringify(mechanics));
  }, [mechanics]);

  const filteredMechanics = mechanics.filter(mechanic =>
    mechanic.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mechanic.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mechanic.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mechanic.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mechanic.email.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleAddMechanic = (e) => {
    e.preventDefault();
    
    // Generate employee ID if not provided
    let employeeId = formData.employeeId;
    if (!employeeId) {
      const mechanicCount = mechanics.length + 1;
      employeeId = `MECH${String(mechanicCount).padStart(3, '0')}`;
    }
    
    const newMechanic = {
      id: Date.now(),
      employeeId,
      ...formData,
      experience: parseInt(formData.experience) || 0,
      hourlyRate: parseFloat(formData.hourlyRate) || 0,
      rating: parseFloat(formData.rating) || 0,
      completedJobs: parseInt(formData.completedJobs) || 0,
      currentWorkload: parseInt(formData.currentWorkload) || 0,
      certifications: formData.certifications.split(',').map(cert => cert.trim()).filter(cert => cert),
      skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill),
      hireDate: formData.hireDate || new Date().toISOString().split('T')[0]
    };

    setMechanics(prev => [...prev, newMechanic]);
    showNotification('success', 'Mechanic added successfully!');
    
    // Reset form and close modal
    setFormData({
      firstName: '',
      lastName: '',
      employeeId: '',
      email: '',
      phone: '',
      specialization: '',
      experience: '',
      hourlyRate: '',
      status: 'Available',
      hireDate: '',
      certifications: '',
      address: '',
      availability: 'Full-time',
      rating: '',
      completedJobs: '',
      currentWorkload: '',
      skills: '',
      notes: ''
    });
    setShowAddModal(false);
  };

  const handleEditMechanic = (mechanic) => {
    setSelectedMechanic(mechanic);
    setFormData({
      firstName: mechanic.firstName,
      lastName: mechanic.lastName,
      employeeId: mechanic.employeeId,
      email: mechanic.email,
      phone: mechanic.phone,
      specialization: mechanic.specialization,
      experience: mechanic.experience.toString(),
      hourlyRate: mechanic.hourlyRate.toString(),
      status: mechanic.status,
      hireDate: mechanic.hireDate,
      certifications: mechanic.certifications.join(', '),
      address: mechanic.address,
      availability: mechanic.availability,
      rating: mechanic.rating.toString(),
      completedJobs: mechanic.completedJobs.toString(),
      currentWorkload: mechanic.currentWorkload.toString(),
      skills: mechanic.skills.join(', '),
      notes: mechanic.notes
    });
    setShowEditModal(true);
  };

  const handleUpdateMechanic = (e) => {
    e.preventDefault();
    
    setMechanics(prev => prev.map(mechanic =>
      mechanic.id === selectedMechanic.id
        ? { 
            ...mechanic, 
            ...formData,
            experience: parseInt(formData.experience) || 0,
            hourlyRate: parseFloat(formData.hourlyRate) || 0,
            rating: parseFloat(formData.rating) || 0,
            completedJobs: parseInt(formData.completedJobs) || 0,
            currentWorkload: parseInt(formData.currentWorkload) || 0,
            certifications: formData.certifications.split(',').map(cert => cert.trim()).filter(cert => cert),
            skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
          }
        : mechanic
    ));
    
    showNotification('success', 'Mechanic updated successfully!');
    
    // Reset form and close modal
    setFormData({
      firstName: '',
      lastName: '',
      employeeId: '',
      email: '',
      phone: '',
      specialization: '',
      experience: '',
      hourlyRate: '',
      status: 'Available',
      hireDate: '',
      certifications: '',
      address: '',
      availability: 'Full-time',
      rating: '',
      completedJobs: '',
      currentWorkload: '',
      skills: '',
      notes: ''
    });
    setShowEditModal(false);
    setSelectedMechanic(null);
  };

  const handleDeleteMechanic = (mechanic) => {
    setSelectedMechanic(mechanic);
    setShowDeleteModal(true);
  };

  const confirmDeleteMechanic = () => {
    setMechanics(prev => prev.filter(mechanic => mechanic.id !== selectedMechanic.id));
    showNotification('success', 'Mechanic deleted successfully!');
    setShowDeleteModal(false);
    setSelectedMechanic(null);
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Available': 'bg-green-100 text-green-800',
      'Busy': 'bg-yellow-100 text-yellow-800',
      'On Leave': 'bg-gray-100 text-gray-800',
      'Off Duty': 'bg-red-100 text-red-800'
    };
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />);
    }
    if (hasHalfStar) {
      stars.push(<StarIcon key="half" className="h-4 w-4 text-yellow-400 fill-current opacity-50" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<StarIcon key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    return stars;
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
              <WrenchScrewdriverIcon className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Mechanics Management</h1>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              New Mechanic
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
                  placeholder="Search mechanics by name, ID, specialization, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Total: <span className="font-semibold text-gray-900">{filteredMechanics.length}</span> mechanics
              </div>
            </div>
          </div>
        </div>

        {/* Mechanics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMechanics.map((mechanic) => (
            <div key={mechanic.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <WrenchScrewdriverIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">
                        {mechanic.firstName} {mechanic.lastName}
                      </h3>
                      <p className="text-sm text-gray-500">{mechanic.employeeId}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleEditMechanic(mechanic)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                      title="Edit Mechanic"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteMechanic(mechanic)}
                      className="p-2 text-gray-400 hover:text-red-600"
                      title="Delete Mechanic"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Status</span>
                    {getStatusBadge(mechanic.status)}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <WrenchScrewdriverIcon className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium">Specialization:</span> {mechanic.specialization}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium">Email:</span> {mechanic.email}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium">Phone:</span> {mechanic.phone}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium">Experience:</span> {mechanic.experience} years
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <CurrencyDollarIcon className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium">Rate:</span> ${mechanic.hourlyRate}/hr
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium">Hired:</span> {mechanic.hireDate}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <StarIcon className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium">Rating:</span>
                    <div className="flex items-center ml-1">
                      {getRatingStars(mechanic.rating)}
                      <span className="ml-1 text-gray-600">({mechanic.rating})</span>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircleIcon className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium">Completed Jobs:</span> {mechanic.completedJobs}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <WrenchScrewdriverIcon className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium">Current Workload:</span> {mechanic.currentWorkload} jobs
                  </div>

                  {mechanic.certifications.length > 0 && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Certifications:</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {mechanic.certifications.map((cert, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {mechanic.skills.length > 0 && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Skills:</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {mechanic.skills.map((skill, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {mechanic.notes && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Notes:</span>
                      <p className="mt-1 text-gray-500">{mechanic.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMechanics.length === 0 && (
          <div className="text-center py-12">
            <WrenchScrewdriverIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No mechanics found</h3>
            <p className="text-gray-500">Get started by adding your first mechanic.</p>
          </div>
        )}
      </div>

      {/* Add Mechanic Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowAddModal(false)}></div>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">New Mechanic</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleAddMechanic} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
                        Employee ID
                      </label>
                      <input
                        type="text"
                        id="employeeId"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="MECH001"
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="john.smith@garage.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="+1-555-0101"
                      />
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
                        Specialization
                      </label>
                      <select
                        id="specialization"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="">Select specialization</option>
                        <option value="Engine Repair">Engine Repair</option>
                        <option value="Transmission">Transmission</option>
                        <option value="Brake Systems">Brake Systems</option>
                        <option value="Electrical Systems">Electrical Systems</option>
                        <option value="General Service">General Service</option>
                        <option value="HVAC">HVAC</option>
                        <option value="Suspension">Suspension</option>
                        <option value="Diagnostics">Diagnostics</option>
                        <option value="Hybrid Vehicles">Hybrid Vehicles</option>
                        <option value="Performance">Performance</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                        Experience (years)
                      </label>
                      <input
                        type="number"
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                        min="0"
                        max="50"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="5"
                      />
                    </div>
                    <div>
                      <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
                        Hourly Rate ($)
                      </label>
                      <input
                        type="number"
                        id="hourlyRate"
                        name="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="40.00"
                      />
                    </div>
                  </div>

                  {/* Status and Availability */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                        <option value="Busy">Busy</option>
                        <option value="On Leave">On Leave</option>
                        <option value="Off Duty">Off Duty</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                        Availability
                      </label>
                      <select
                        id="availability"
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Seasonal">Seasonal</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="hireDate" className="block text-sm font-medium text-gray-700">
                        Hire Date
                      </label>
                      <input
                        type="date"
                        id="hireDate"
                        name="hireDate"
                        value={formData.hireDate}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                        Rating (0-5)
                      </label>
                      <input
                        type="number"
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        min="0"
                        max="5"
                        step="0.1"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="4.5"
                      />
                    </div>
                    <div>
                      <label htmlFor="completedJobs" className="block text-sm font-medium text-gray-700">
                        Completed Jobs
                      </label>
                      <input
                        type="number"
                        id="completedJobs"
                        name="completedJobs"
                        value={formData.completedJobs}
                        onChange={handleInputChange}
                        min="0"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="100"
                      />
                    </div>
                    <div>
                      <label htmlFor="currentWorkload" className="block text-sm font-medium text-gray-700">
                        Current Workload
                      </label>
                      <input
                        type="number"
                        id="currentWorkload"
                        name="currentWorkload"
                        value={formData.currentWorkload}
                        onChange={handleInputChange}
                        min="0"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="123 Main St, City, State 12345"
                    />
                  </div>

                  {/* Certifications */}
                  <div>
                    <label htmlFor="certifications" className="block text-sm font-medium text-gray-700">
                      Certifications (comma-separated)
                    </label>
                    <input
                      type="text"
                      id="certifications"
                      name="certifications"
                      value={formData.certifications}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="ASE Master Technician, Engine Specialist"
                    />
                  </div>

                  {/* Skills */}
                  <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                      Skills (comma-separated)
                    </label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Engine Diagnostics, Transmission Repair, Electrical Systems"
                    />
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
                      placeholder="Additional notes about the mechanic..."
                    />
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleAddMechanic}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add Mechanic
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

      {/* Edit Mechanic Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowEditModal(false)}></div>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Edit Mechanic</h3>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleUpdateMechanic} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="editFirstName" className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="editFirstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editLastName" className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="editLastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editEmployeeId" className="block text-sm font-medium text-gray-700">
                        Employee ID
                      </label>
                      <input
                        type="text"
                        id="editEmployeeId"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="editEmail" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="editEmail"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editPhone" className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="editPhone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="editSpecialization" className="block text-sm font-medium text-gray-700">
                        Specialization
                      </label>
                      <select
                        id="editSpecialization"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="">Select specialization</option>
                        <option value="Engine Repair">Engine Repair</option>
                        <option value="Transmission">Transmission</option>
                        <option value="Brake Systems">Brake Systems</option>
                        <option value="Electrical Systems">Electrical Systems</option>
                        <option value="General Service">General Service</option>
                        <option value="HVAC">HVAC</option>
                        <option value="Suspension">Suspension</option>
                        <option value="Diagnostics">Diagnostics</option>
                        <option value="Hybrid Vehicles">Hybrid Vehicles</option>
                        <option value="Performance">Performance</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="editExperience" className="block text-sm font-medium text-gray-700">
                        Experience (years)
                      </label>
                      <input
                        type="number"
                        id="editExperience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                        min="0"
                        max="50"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editHourlyRate" className="block text-sm font-medium text-gray-700">
                        Hourly Rate ($)
                      </label>
                      <input
                        type="number"
                        id="editHourlyRate"
                        name="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Status and Availability */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                        <option value="Busy">Busy</option>
                        <option value="On Leave">On Leave</option>
                        <option value="Off Duty">Off Duty</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="editAvailability" className="block text-sm font-medium text-gray-700">
                        Availability
                      </label>
                      <select
                        id="editAvailability"
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Seasonal">Seasonal</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="editHireDate" className="block text-sm font-medium text-gray-700">
                        Hire Date
                      </label>
                      <input
                        type="date"
                        id="editHireDate"
                        name="hireDate"
                        value={formData.hireDate}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="editRating" className="block text-sm font-medium text-gray-700">
                        Rating (0-5)
                      </label>
                      <input
                        type="number"
                        id="editRating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        min="0"
                        max="5"
                        step="0.1"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editCompletedJobs" className="block text-sm font-medium text-gray-700">
                        Completed Jobs
                      </label>
                      <input
                        type="number"
                        id="editCompletedJobs"
                        name="completedJobs"
                        value={formData.completedJobs}
                        onChange={handleInputChange}
                        min="0"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="editCurrentWorkload" className="block text-sm font-medium text-gray-700">
                        Current Workload
                      </label>
                      <input
                        type="number"
                        id="editCurrentWorkload"
                        name="currentWorkload"
                        value={formData.currentWorkload}
                        onChange={handleInputChange}
                        min="0"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label htmlFor="editAddress" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      id="editAddress"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  {/* Certifications */}
                  <div>
                    <label htmlFor="editCertifications" className="block text-sm font-medium text-gray-700">
                      Certifications (comma-separated)
                    </label>
                    <input
                      type="text"
                      id="editCertifications"
                      name="certifications"
                      value={formData.certifications}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  {/* Skills */}
                  <div>
                    <label htmlFor="editSkills" className="block text-sm font-medium text-gray-700">
                      Skills (comma-separated)
                    </label>
                    <input
                      type="text"
                      id="editSkills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
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
                      placeholder="Additional notes about the mechanic..."
                    />
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleUpdateMechanic}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Update Mechanic
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

      {/* Delete Mechanic Modal */}
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
                      Delete Mechanic
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete {selectedMechanic?.firstName} {selectedMechanic?.lastName} ({selectedMechanic?.employeeId})? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={confirmDeleteMechanic}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete Mechanic
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

export default Mechanics;
