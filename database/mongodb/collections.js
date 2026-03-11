// MongoDB Collections and Schemas for Vehicle Service Management System
// This file defines the structure and validation rules for MongoDB collections

// Service Technician Notes Collection
db.createCollection("service_technician_notes", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["bookingId", "technicianId", "notes", "createdAt"],
         properties: {
            bookingId: {
               bsonType: "int",
               description: "Reference to Oracle service_bookings.booking_id"
            },
            technicianId: {
               bsonType: "int",
               description: "Reference to Oracle mechanics.mechanic_id"
            },
            notes: {
               bsonType: "string",
               description: "Detailed notes from the technician",
               maxLength: 2000
            },
            recommendations: {
               bsonType: "array",
               items: {
                  bsonType: "string"
               },
               description: "List of recommendations for future service"
            },
            partsUsed: {
               bsonType: "array",
               items: {
                  bsonType: "object",
                  required: ["partName", "quantity"],
                  properties: {
                     partName: { bsonType: "string" },
                     partNumber: { bsonType: "string" },
                     quantity: { bsonType: "int", minimum: 1 },
                     condition: { bsonType: "string" }
                  }
               }
            },
            images: {
               bsonType: "array",
               items: {
                  bsonType: "object",
                  required: ["url", "description"],
                  properties: {
                     url: { bsonType: "string" },
                     description: { bsonType: "string" },
                     timestamp: { bsonType: "date" }
                  }
               }
            },
            severity: {
               bsonType: "string",
               enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
               description: "Severity level of issues found"
            },
            estimatedTime: {
               bsonType: "int",
               description: "Estimated time to complete in minutes"
            },
            actualTime: {
               bsonType: "int",
               description: "Actual time taken in minutes"
            },
            createdAt: {
               bsonType: "date",
               description: "Timestamp when note was created"
            },
            updatedAt: {
               bsonType: "date",
               description: "Timestamp when note was last updated"
            }
         }
      }
   }
});

// Vehicle Service History Logs Collection
db.createCollection("vehicle_service_logs", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["vehicleId", "logType", "timestamp", "data"],
         properties: {
            vehicleId: {
               bsonType: "int",
               description: "Reference to Oracle vehicles.vehicle_id"
            },
            logType: {
               bsonType: "string",
               enum: ["DIAGNOSTIC", "REPAIR", "MAINTENANCE", "INSPECTION", "CLEANING", "OTHER"],
               description: "Type of service log"
            },
            timestamp: {
               bsonType: "date",
               description: "When the service was performed"
            },
            data: {
               bsonType: "object",
               description: "Flexible data structure for different log types",
               properties: {
                  odometerReading: { bsonType: "int" },
                  diagnosticCodes: {
                     bsonType: "array",
                     items: { bsonType: "string" }
                  },
                  symptoms: {
                     bsonType: "array",
                     items: { bsonType: "string" }
                  },
                  actionsTaken: {
                     bsonType: "array",
                     items: { bsonType: "string" }
                  },
                  nextServiceDue: { bsonType: "date" },
                  performanceMetrics: {
                     bsonType: "object",
                     properties: {
                        engineTemp: { bsonType: "double" },
                        oilPressure: { bsonType: "double" },
                        fuelEfficiency: { bsonType: "double" },
                        tirePressure: {
                           bsonType: "array",
                           items: { bsonType: "double" }
                        }
                     }
                  }
               }
            },
            technicianId: {
               bsonType: "int",
               description: "Reference to Oracle mechanics.mechanic_id"
            },
            duration: {
               bsonType: "int",
               description: "Duration in minutes"
            },
            cost: {
               bsonType: "double",
               description: "Cost of service"
            },
            warrantyInfo: {
               bsonType: "object",
               properties: {
                  covered: { bsonType: "bool" },
                  warrantyProvider: { bsonType: "string" },
                  claimNumber: { bsonType: "string" }
               }
            }
         }
      }
   }
});

// Customer Complaints and Feedback Collection
db.createCollection("customer_feedback", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["customerId", "type", "rating", "feedback", "createdAt"],
         properties: {
            customerId: {
               bsonType: "int",
               description: "Reference to Oracle customers.customer_id"
            },
            bookingId: {
               bsonType: "int",
               description: "Reference to Oracle service_bookings.booking_id (optional)"
            },
            vehicleId: {
               bsonType: "int",
               description: "Reference to Oracle vehicles.vehicle_id (optional)"
            },
            type: {
               bsonType: "string",
               enum: ["COMPLAINT", "COMPLIMENT", "SUGGESTION", "GENERAL_FEEDBACK"],
               description: "Type of feedback"
            },
            category: {
               bsonType: "string",
               enum: ["SERVICE_QUALITY", "WAIT_TIME", "PRICING", "STAFF_BEHAVIOR", "FACILITY", "PARTS_QUALITY", "OTHER"],
               description: "Category of feedback"
            },
            rating: {
               bsonType: "int",
               minimum: 1,
               maximum: 5,
               description: "Rating from 1 (very poor) to 5 (excellent)"
            },
            feedback: {
               bsonType: "string",
               description: "Detailed feedback text",
               maxLength: 1000
            },
            priority: {
               bsonType: "string",
               enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
               description: "Priority level for complaints"
            },
            status: {
               bsonType: "string",
               enum: ["PENDING", "IN_PROGRESS", "RESOLVED", "CLOSED"],
               default: "PENDING"
            },
            assignedTo: {
               bsonType: "int",
               description: "Reference to Oracle mechanics.mechanic_id who is handling the feedback"
            },
            resolution: {
               bsonType: "string",
               description: "Description of how the feedback was resolved"
            },
            resolutionDate: {
               bsonType: "date",
               description: "When the feedback was resolved"
            },
            followUpRequired: {
               bsonType: "bool",
               default: false
            },
            followUpDate: {
               bsonType: "date"
            },
            attachments: {
               bsonType: "array",
               items: {
                  bsonType: "object",
                  required: ["url", "type"],
                  properties: {
                     url: { bsonType: "string" },
                     type: { bsonType: "string", enum: ["IMAGE", "DOCUMENT", "VIDEO"] },
                     description: { bsonType: "string" }
                  }
               }
            },
            createdAt: {
               bsonType: "date",
               description: "When feedback was submitted"
            },
            updatedAt: {
               bsonType: "date",
               description: "When feedback was last updated"
            }
         }
      }
   }
});

// Diagnostic Data Summaries Collection
db.createCollection("diagnostic_summaries", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["vehicleId", "testDate", "summary", "overallHealth"],
         properties: {
            vehicleId: {
               bsonType: "int",
               description: "Reference to Oracle vehicles.vehicle_id"
            },
            testDate: {
               bsonType: "date",
               description: "When diagnostic test was performed"
            },
            technicianId: {
               bsonType: "int",
               description: "Reference to Oracle mechanics.mechanic_id"
            },
            summary: {
               bsonType: "string",
               description: "Brief summary of diagnostic results",
               maxLength: 500
            },
            overallHealth: {
               bsonType: "string",
               enum: ["EXCELLENT", "GOOD", "FAIR", "POOR", "CRITICAL"],
               description: "Overall vehicle health status"
            },
            systems: {
               bsonType: "array",
               items: {
                  bsonType: "object",
                  required: ["systemName", "status"],
                  properties: {
                     systemName: {
                        bsonType: "string",
                        enum: ["ENGINE", "TRANSMISSION", "BRAKES", "SUSPENSION", "ELECTRICAL", "EXHAUST", "COOLING", "FUEL_SYSTEM", "TIRES", "BATTERY"]
                     },
                     status: {
                        bsonType: "string",
                        enum: ["PASS", "WARN", "FAIL"]
                     },
                     details: { bsonType: "string" },
                     recommendations: {
                        bsonType: "array",
                        items: { bsonType: "string" }
                     },
                     estimatedCost: { bsonType: "double" },
                     urgency: {
                        bsonType: "string",
                        enum: ["IMMEDIATE", "SOON", "ROUTINE"]
                     }
                  }
               }
            },
            diagnosticCodes: {
               bsonType: "array",
               items: {
                  bsonType: "object",
                  required: ["code", "description"],
                  properties: {
                     code: { bsonType: "string" },
                     description: { bsonType: "string" },
                     severity: {
                        bsonType: "string",
                        enum: ["INFO", "WARNING", "ERROR"]
                     },
                     clearable: { bsonType: "bool" }
                  }
               }
            },
            performanceMetrics: {
               bsonType: "object",
               properties: {
                  enginePerformance: { bsonType: "double" },
                  fuelEfficiency: { bsonType: "double" },
                  emissions: { bsonType: "double" },
                  brakePerformance: { bsonType: "double" },
                  tireCondition: { bsonType: "double" }
               }
            },
            nextRecommendedService: {
               bsonType: "object",
               properties: {
                  type: { bsonType: "string" },
                  dueDate: { bsonType: "date" },
                  estimatedCost: { bsonType: "double" },
                  priority: {
                     bsonType: "string",
                     enum: ["LOW", "MEDIUM", "HIGH"]
                  }
               }
            },
            images: {
               bsonType: "array",
               items: {
                  bsonType: "object",
                  required: ["url", "description"],
                  properties: {
                     url: { bsonType: "string" },
                     description: { bsonType: "string" },
                     category: {
                        bsonType: "string",
                        enum: ["UNDER_HOOD", "UNDER_BODY", "INTERIOR", "EXTERIOR", "COMPONENTS"]
                     }
                  }
               }
            },
            testDuration: {
               bsonType: "int",
               description: "Test duration in minutes"
            },
            testEquipment: {
               bsonType: "array",
               items: { bsonType: "string" }
            },
            createdAt: {
               bsonType: "date"
            }
         }
      }
   }
});

// Activity Logs Collection
db.createCollection("activity_logs", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["userId", "action", "entityType", "entityId", "timestamp"],
         properties: {
            userId: {
               bsonType: "int",
               description: "ID of user who performed the action"
            },
            userType: {
               bsonType: "string",
               enum: ["CUSTOMER", "MECHANIC", "ADMIN", "SYSTEM"],
               description: "Type of user"
            },
            action: {
               bsonType: "string",
               enum: ["CREATE", "UPDATE", "DELETE", "VIEW", "LOGIN", "LOGOUT", "BOOK", "CANCEL", "COMPLETE", "PAY"],
               description: "Action performed"
            },
            entityType: {
               bsonType: "string",
               enum: ["BOOKING", "CUSTOMER", "VEHICLE", "INVOICE", "PART", "FEEDBACK", "NOTE", "DIAGNOSTIC"],
               description: "Type of entity affected"
            },
            entityId: {
               bsonType: "int",
               description: "ID of the entity affected"
            },
            details: {
               bsonType: "object",
               description: "Additional details about the action"
            },
            ipAddress: {
               bsonType: "string",
               description: "IP address from which action was performed"
            },
            userAgent: {
               bsonType: "string",
               description: "User agent string of the client"
            },
            sessionId: {
               bsonType: "string",
               description: "Session identifier"
            },
            timestamp: {
               bsonType: "date",
               description: "When the action occurred"
            },
            success: {
               bsonType: "bool",
               default: true
            },
            errorMessage: {
               bsonType: "string",
               description: "Error message if action failed"
            }
         }
      }
   }
});

// Create indexes for performance
db.service_technician_notes.createIndex({ "bookingId": 1 });
db.service_technician_notes.createIndex({ "technicianId": 1 });
db.service_technician_notes.createIndex({ "createdAt": -1 });

db.vehicle_service_logs.createIndex({ "vehicleId": 1 });
db.vehicle_service_logs.createIndex({ "logType": 1 });
db.vehicle_service_logs.createIndex({ "timestamp": -1 });
db.vehicle_service_logs.createIndex({ "technicianId": 1 });

db.customer_feedback.createIndex({ "customerId": 1 });
db.customer_feedback.createIndex({ "type": 1 });
db.customer_feedback.createIndex({ "status": 1 });
db.customer_feedback.createIndex({ "createdAt": -1 });
db.customer_feedback.createIndex({ "rating": 1 });

db.diagnostic_summaries.createIndex({ "vehicleId": 1 });
db.diagnostic_summaries.createIndex({ "testDate": -1 });
db.diagnostic_summaries.createIndex({ "overallHealth": 1 });
db.diagnostic_summaries.createIndex({ "technicianId": 1 });

db.activity_logs.createIndex({ "userId": 1 });
db.activity_logs.createIndex({ "action": 1 });
db.activity_logs.createIndex({ "entityType": 1 });
db.activity_logs.createIndex({ "timestamp": -1 });
db.activity_logs.createIndex({ "userType": 1 });

print("MongoDB collections and indexes created successfully!");
