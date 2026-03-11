// Sample Data for MongoDB Collections
// Vehicle Service & Maintenance Management System
// Run this with: node sample_data.js

const { MongoClient } = require('mongodb');

async function insertSampleData() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('vehicle_management');
    
    // Sample Service Technician Notes
    await db.collection('service_technician_notes').insertMany([
  {
    bookingId: 1,
    technicianId: 1,
    notes: "Customer requested synthetic oil change. Vehicle in good condition. Oil filter replaced. Next service due in 5000 miles.",
    recommendations: ["Rotate tires at next service", "Check brake pads at 50,000 miles"],
    partsUsed: [
      {
        partName: "Oil Filter 5W-30",
        partNumber: "OF-5W30-001",
        quantity: 1,
        condition: "New"
      }
    ],
    severity: "LOW",
    estimatedTime: 45,
    actualTime: 40,
    createdAt: new Date("2024-03-10T09:00:00Z"),
    updatedAt: new Date("2024-03-10T09:40:00Z")
  },
  {
    bookingId: 2,
    technicianId: 2,
    notes: "Front brake pads were worn down to 2mm. Replaced with ceramic pads. Rotors in good condition, no resurfacing needed. Customer reported squealing noise when braking.",
    recommendations: ["Check rear brakes at next service", "Brake fluid flush at 60,000 miles"],
    partsUsed: [
      {
        partName: "Brake Pads Front",
        partNumber: "BP-FRONT-002",
        quantity: 1,
        condition: "New"
      }
    ],
    images: [
      {
        url: "/images/brake_pads_before.jpg",
        description: "Worn brake pads before replacement",
        timestamp: new Date("2024-03-10T10:30:00Z")
      },
      {
        url: "/images/brake_pads_after.jpg",
        description: "New brake pads installed",
        timestamp: new Date("2024-03-10T11:15:00Z")
      }
    ],
    severity: "MEDIUM",
    estimatedTime: 90,
    actualTime: 105,
    createdAt: new Date("2024-03-10T10:30:00Z"),
    updatedAt: new Date("2024-03-10T11:15:00Z")
  }]);

    // Sample Vehicle Service History Logs
    await db.collection('vehicle_service_logs').insertMany([
  {
    vehicleId: 1,
    logType: "MAINTENANCE",
    timestamp: new Date("2024-03-10T09:00:00Z"),
    data: {
      odometerReading: 45000,
      actionsTaken: ["Oil change", "Filter replacement", "Fluid level check"],
      nextServiceDue: new Date("2024-08-10T00:00:00Z"),
      performanceMetrics: {
        engineTemp: 195.5,
        oilPressure: 42.1,
        fuelEfficiency: 28.5
      }
    },
    technicianId: 1,
    duration: 40,
    cost: 54.00,
    warrantyInfo: {
      covered: false,
      warrantyProvider: null,
      claimNumber: null
    }
  },
  {
    vehicleId: 2,
    logType: "REPAIR",
    timestamp: new Date("2024-03-10T10:30:00Z"),
    data: {
      odometerReading: 25000,
      symptoms: ["Squealing noise when braking", "Reduced braking performance"],
      actionsTaken: ["Front brake pad replacement", "Brake system inspection"],
      nextServiceDue: new Date("2024-06-10T00:00:00Z"),
      performanceMetrics: {
        engineTemp: 192.3,
        oilPressure: 38.7,
        fuelEfficiency: 32.1
      }
    },
    technicianId: 2,
    duration: 105,
    cost: 200.59,
    warrantyInfo: {
      covered: true,
      warrantyProvider: "Honda Care",
      claimNumber: "HC-2024-0310-002"
    }
  },
  {
    vehicleId: 3,
    logType: "DIAGNOSTIC",
    timestamp: new Date("2024-03-09T14:00:00Z"),
    data: {
      odometerReading: 60000,
      diagnosticCodes: ["P0301", "P0171"],
      symptoms: ["Check engine light on", "Rough idle"],
      actionsTaken: ["Code scanning", "System diagnostics", "Recommend fuel system cleaning"],
      nextServiceDue: new Date("2024-03-11T00:00:00Z"),
      performanceMetrics: {
        engineTemp: 198.7,
        oilPressure: 35.2,
        fuelEfficiency: 22.3
      }
    },
    technicianId: 7,
    duration: 60,
    cost: 120.00,
    warrantyInfo: {
      covered: false,
      warrantyProvider: null,
      claimNumber: null
    }
  }]);

    // Sample Customer Complaints and Feedback
    await db.collection('customer_feedback').insertMany([
  {
    customerId: 1,
    bookingId: 1,
    vehicleId: 1,
    type: "COMPLIMENT",
    category: "SERVICE_QUALITY",
    rating: 5,
    feedback: "Excellent service! The mechanic was very professional and thorough. The oil change was done quickly and efficiently. Will definitely come back.",
    priority: "LOW",
    status: "RESOLVED",
    assignedTo: 1,
    resolution: "Thank you for your positive feedback. We appreciate your business!",
    resolutionDate: new Date("2024-03-10T16:00:00Z"),
    followUpRequired: false,
    createdAt: new Date("2024-03-10T15:30:00Z"),
    updatedAt: new Date("2024-03-10T16:00:00Z")
  },
  {
    customerId: 2,
    bookingId: 2,
    vehicleId: 2,
    type: "COMPLIMENT",
    category: "SERVICE_QUALITY",
    rating: 4,
    feedback: "Good service overall. The brake replacement was done well and the car stops much better now. The only issue was that it took a bit longer than expected.",
    priority: "MEDIUM",
    status: "RESOLVED",
    assignedTo: 2,
    resolution: "Thank you for your feedback. We apologize for the delay and will work on our timing.",
    resolutionDate: new Date("2024-03-10T17:00:00Z"),
    followUpRequired: false,
    createdAt: new Date("2024-03-10T16:30:00Z"),
    updatedAt: new Date("2024-03-10T17:00:00Z")
  },
  {
    customerId: 5,
    type: "COMPLAINT",
    category: "WAIT_TIME",
    rating: 2,
    feedback: "Had to wait 45 minutes past my appointment time. The service was good but the wait was unacceptable.",
    priority: "HIGH",
    status: "IN_PROGRESS",
    assignedTo: 6,
    followUpRequired: true,
    followUpDate: new Date("2024-03-15T00:00:00Z"),
    attachments: [
      {
        url: "/images/waiting_area.jpg",
        type: "IMAGE",
        description: "Busy waiting area"
      }
    ],
    createdAt: new Date("2024-03-11T09:00:00Z"),
    updatedAt: new Date("2024-03-11T09:00:00Z")
  },
  {
    customerId: 3,
    type: "SUGGESTION",
    category: "FACILITY",
    rating: 4,
    feedback: "Great service as always. Would be nice to have complimentary coffee in the waiting area.",
    priority: "LOW",
    status: "PENDING",
    createdAt: new Date("2024-03-11T10:30:00Z"),
    updatedAt: new Date("2024-03-11T10:30:00Z")
  }]);

    // Sample Diagnostic Data Summaries
    await db.collection('diagnostic_summaries').insertMany([
  {
    vehicleId: 1,
    testDate: new Date("2024-03-10T08:30:00Z"),
    technicianId: 1,
    summary: "Vehicle in excellent condition. All systems functioning properly. Regular maintenance recommended.",
    overallHealth: "EXCELLENT",
    systems: [
      {
        systemName: "ENGINE",
        status: "PASS",
        details: "Engine running smoothly, no issues detected",
        recommendations: ["Continue regular oil changes"],
        estimatedCost: 0,
        urgency: "ROUTINE"
      },
      {
        systemName: "TRANSMISSION",
        status: "PASS",
        details: "Transmission shifting normally",
        recommendations: ["Check fluid at 60,000 miles"],
        estimatedCost: 0,
        urgency: "ROUTINE"
      },
      {
        systemName: "BRAKES",
        status: "PASS",
        details: "Brake pads at 70% life",
        recommendations: ["Inspect at next service"],
        estimatedCost: 0,
        urgency: "ROUTINE"
      },
      {
        systemName: "BATTERY",
        status: "WARN",
        details: "Battery showing signs of age",
        recommendations: ["Test battery at next service", "Consider replacement before winter"],
        estimatedCost: 189.99,
        urgency: "SOON"
      }
    ],
    diagnosticCodes: [],
    performanceMetrics: {
      enginePerformance: 95,
      fuelEfficiency: 88,
      emissions: 92,
      brakePerformance: 90,
      tireCondition: 85
    },
    nextRecommendedService: {
      type: "Battery Test",
      dueDate: new Date("2024-06-10T00:00:00Z"),
      estimatedCost: 25.00,
      priority: "MEDIUM"
    },
    testDuration: 30,
    testEquipment: ["OBD-II Scanner", "Multimeter", "Battery Tester"],
    createdAt: new Date("2024-03-10T08:30:00Z")
  },
  {
    vehicleId: 3,
    testDate: new Date("2024-03-09T14:00:00Z"),
    technicianId: 7,
    summary: "Engine misfire detected. Fuel system cleaning recommended. Overall condition fair.",
    overallHealth: "FAIR",
    systems: [
      {
        systemName: "ENGINE",
        status: "FAIL",
        details: "Misfire detected in cylinder 1",
        recommendations: ["Fuel system cleaning", "Spark plug replacement", "Ignition coil inspection"],
        estimatedCost: 350.00,
        urgency: "IMMEDIATE"
      },
      {
        systemName: "FUEL_SYSTEM",
        status: "WARN",
        details: "Fuel injector showing deposits",
        recommendations: ["Fuel system cleaning service"],
        estimatedCost: 120.00,
        urgency: "SOON"
      },
      {
        systemName: "TRANSMISSION",
        status: "PASS",
        details: "Transmission functioning normally",
        recommendations: ["Regular maintenance"],
        estimatedCost: 0,
        urgency: "ROUTINE"
      }
    ],
    diagnosticCodes: [
      {
        code: "P0301",
        description: "Cylinder 1 Misfire Detected",
        severity: "ERROR",
        clearable: false
      },
      {
        code: "P0171",
        description: "System Too Lean (Bank 1)",
        severity: "WARNING",
        clearable: true
      }
    ],
    performanceMetrics: {
      enginePerformance: 65,
      fuelEfficiency: 72,
      emissions: 78,
      brakePerformance: 85,
      tireCondition: 80
    },
    nextRecommendedService: {
      type: "Engine Repair",
      dueDate: new Date("2024-03-11T00:00:00Z"),
      estimatedCost: 350.00,
      priority: "HIGH"
    },
    images: [
      {
        url: "/images/engine_compartment.jpg",
        description: "Engine compartment during diagnostic",
        category: "UNDER_HOOD"
      }
    ],
    testDuration: 60,
    testEquipment: ["OBD-II Scanner", "Fuel Pressure Gauge", "Compression Tester"],
    createdAt: new Date("2024-03-09T14:00:00Z")
  }]);

    // Sample Activity Logs
    await db.collection('activity_logs').insertMany([
  {
    userId: 1,
    userType: "CUSTOMER",
    action: "BOOK",
    entityType: "BOOKING",
    entityId: 1,
    details: {
      serviceType: "Oil Change",
      scheduledDate: "2024-03-10T09:00:00Z"
    },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    sessionId: "sess_abc123",
    timestamp: new Date("2024-03-09T10:00:00Z"),
    success: true
  },
  {
    userId: 1,
    userType: "MECHANIC",
    action: "UPDATE",
    entityType: "BOOKING",
    entityId: 1,
    details: {
      status: "COMPLETED",
      actualCost: 54.00
    },
    ipAddress: "192.168.1.50",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    sessionId: "sess_def456",
    timestamp: new Date("2024-03-10T09:40:00Z"),
    success: true
  },
  {
    userId: 1,
    userType: "CUSTOMER",
    action: "CREATE",
    entityType: "FEEDBACK",
    entityId: 1,
    details: {
      rating: 5,
      feedbackType: "COMPLIMENT"
    },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    sessionId: "sess_ghi789",
    timestamp: new Date("2024-03-10T15:30:00Z"),
    success: true
  },
  {
    userId: 2,
    userType: "MECHANIC",
    action: "CREATE",
    entityType: "NOTE",
    entityId: 2,
    details: {
      bookingId: 2,
      noteType: "SERVICE_COMPLETION"
    },
    ipAddress: "192.168.1.51",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    sessionId: "sess_jkl012",
    timestamp: new Date("2024-03-10T11:15:00Z"),
    success: true
  },
  {
    userId: 3,
    userType: "ADMIN",
    action: "VIEW",
    entityType: "REPORTS",
    entityId: null,
    details: {
      reportType: "MONTHLY_REVENUE"
    },
    ipAddress: "192.168.1.10",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    sessionId: "sess_mno345",
    timestamp: new Date("2024-03-11T09:00:00Z"),
    success: true
  }]);

    console.log('MongoDB sample data inserted successfully!');
    
  } catch (error) {
    console.error('Error inserting sample data:', error);
  } finally {
    await client.close();
  }
}

// Run the function
insertSampleData().catch(console.error);
