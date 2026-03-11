# Entity Relationship Diagram - Vehicle Service & Maintenance Management System

## Oracle Database Schema (Relational Data)

### Overview
The Oracle database stores structured, transactional data with clear relationships between entities.

### Entities and Relationships

```
┌─────────────────┐       ┌─────────────────┐
│    CUSTOMERS    │       │    MECHANICS    │
├─────────────────┤       ├─────────────────┤
│ customer_id (PK)│       │ mechanic_id (PK)│
│ first_name      │       │ first_name      │
│ last_name       │       │ last_name       │
│ email           │       │ email           │
│ phone           │       │ phone           │
│ address         │       │ specialization  │
│ city            │       │ hourly_rate     │
│ postal_code     │       │ years_experience│
│ created_at      │       │ hire_date       │
│ updated_at      │       │ is_active       │
└─────────────────┘       └─────────────────┘
         │                         │
         │                         │
         │                         │
         │                         │
         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐
│    VEHICLES     │       │SERVICE_BOOKINGS │
├─────────────────┤       ├─────────────────┤
│ vehicle_id (PK) │◄──────│ booking_id (PK) │
│ customer_id (FK)│       │ vehicle_id (FK) │
│ make            │       │ mechanic_id (FK)│
│ model           │       │ service_type    │
│ year            │       │ service_date    │
│ vin             │       │ start_time      │
│ license_plate   │       │ end_time        │
│ mileage         │       │ status          │
│ engine_type     │       │ estimated_cost  │
│ transmission    │       │ actual_cost     │
│ color           │       │ notes           │
│ purchase_date   │       │ created_at      │
│ created_at      │       │ updated_at      │
│ updated_at      │       └─────────────────┘
└─────────────────┘               │
         │                        │
         │                        │
         │                        │
         │                        │
         │                        ▼
         │              ┌─────────────────┐
         │              │    INVOICES     │
         │              ├─────────────────┤
         │              │ invoice_id (PK) │
         │              │ booking_id (FK) │
         │              │ invoice_date    │
         │              │ total_amount    │
         │              │ tax_amount      │
         │              │ discount_amount │
         │              │ final_amount    │
         │              │ payment_status  │
         │              │ payment_method  │
         │              │ payment_date    │
         │              │ created_at      │
         │              │ updated_at      │
         │              └─────────────────┘
         │                        │
         │                        │
         │                        │
         │                        ▼
         │              ┌─────────────────┐
         │              │  INVOICE_ITEMS  │
         │              ├─────────────────┤
         │              │ item_id (PK)    │
         │              │ invoice_id (FK) │
         │              │ part_id (FK)    │
         │              │ description     │
         │              │ quantity        │
         │              │ unit_price      │
         │              │ total_price     │
         │              │ created_at      │
         │              └─────────────────┘
         │                        │
         │                        │
         │                        │
         ▼                        ▼
┌─────────────────┐       ┌─────────────────┐
│SPARE_PARTS_INV  │       │                 │
├─────────────────┤       │                 │
│ part_id (PK)    │       │                 │
│ part_name       │       │                 │
│ part_number     │       │                 │
│ description     │       │                 │
│ category        │       │                 │
│ quantity_stock  │       │                 │
│ min_stock_level │       │                 │
│ unit_price      │       │                 │
│ supplier_name   │       │                 │
│ supplier_contact│       │                 │
│ last_restocked  │       │                 │
│ created_at      │       │                 │
│ updated_at      │       │                 │
└─────────────────┘       │                 │
         │                │                 │
         │                │                 │
         │                │                 │
         └────────────────┘                 │
                                            │
                                            │
                                            ▼
                                    ┌─────────────────┐
                                    │                 │
                                    │                 │
                                    │                 │
                                    │                 │
                                    │                 │
                                    │                 │
                                    │                 │
                                    │                 │
                                    │                 │
                                    │                 │
                                    │                 │
                                    │                 │
                                    │                 │
                                    │                 │
                                    │                 │
                                    │                 │
                                    │                 │
                                    └─────────────────┘
```

### Table Descriptions

#### CUSTOMERS
Stores customer information and contact details.
- **Primary Key**: customer_id
- **Indexes**: email (unique), last_name + first_name

#### MECHANICS
Stores mechanic information and specializations.
- **Primary Key**: mechanic_id
- **Indexes**: specialization

#### VEHICLES
Stores vehicle information linked to customers.
- **Primary Key**: vehicle_id
- **Foreign Key**: customer_id → CUSTOMERS.customer_id
- **Indexes**: vin (unique), license_plate (unique), customer_id

#### SERVICE_BOOKINGS
Stores service appointment information.
- **Primary Key**: booking_id
- **Foreign Keys**: 
  - vehicle_id → VEHICLES.vehicle_id
  - mechanic_id → MECHANICS.mechanic_id
- **Indexes**: vehicle_id, mechanic_id, service_date, status

#### INVOICES
Stores invoice information for completed services.
- **Primary Key**: invoice_id
- **Foreign Key**: booking_id → SERVICE_BOOKINGS.booking_id
- **Indexes**: booking_id, payment_status

#### INVOICE_ITEMS
Stores line items for each invoice.
- **Primary Key**: item_id
- **Foreign Keys**: 
  - invoice_id → INVOICES.invoice_id
  - part_id → SPARE_PARTS_INV.part_id
- **Indexes**: invoice_id

#### SPARE_PARTS_INV
Stores spare parts inventory information.
- **Primary Key**: part_id
- **Indexes**: part_number (unique), category, quantity_in_stock

### Relationship Types

1. **One-to-Many**: CUSTOMERS → VEHICLES (One customer can have many vehicles)
2. **One-to-Many**: MECHANICS → SERVICE_BOOKINGS (One mechanic can have many bookings)
3. **One-to-Many**: VEHICLES → SERVICE_BOOKINGS (One vehicle can have many bookings)
4. **One-to-One**: SERVICE_BOOKINGS → INVOICES (One booking generates one invoice)
5. **One-to-Many**: INVOICES → INVOICE_ITEMS (One invoice can have many items)
6. **One-to-Many**: SPARE_PARTS_INV → INVOICE_ITEMS (One part can be in many invoice items)

### Constraints

1. **Primary Key Constraints**: All tables have auto-incrementing primary keys
2. **Foreign Key Constraints**: Referential integrity maintained
3. **Unique Constraints**: email, vin, license_plate, part_number
4. **Check Constraints**: 
   - is_active in ('Y', 'N')
   - status in ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')
   - payment_status in ('PENDING', 'PAID', 'PARTIAL', 'OVERDUE')
   - quantity_in_stock >= 0
   - min_stock_level >= 0
5. **Timestamp Triggers**: Automatic update of updated_at columns

## MongoDB Collections (Non-Relational Data)

### Overview
MongoDB stores flexible, semi-structured, and unstructured data that doesn't fit well in a relational model.

### Collections

#### 1. service_technician_notes
Stores detailed notes from technicians during service appointments.
```json
{
  "bookingId": 1,
  "technicianId": 1,
  "notes": "Detailed technician observations...",
  "recommendations": ["Recommendation 1", "Recommendation 2"],
  "partsUsed": [
    {
      "partName": "Oil Filter",
      "partNumber": "OF-001",
      "quantity": 1,
      "condition": "New"
    }
  ],
  "images": [
    {
      "url": "/images/repair.jpg",
      "description": "Repair area",
      "timestamp": "2024-03-10T10:00:00Z"
    }
  ],
  "severity": "LOW",
  "estimatedTime": 45,
  "actualTime": 40,
  "createdAt": "2024-03-10T09:00:00Z",
  "updatedAt": "2024-03-10T09:40:00Z"
}
```

#### 2. vehicle_service_logs
Stores detailed service history and diagnostic information.
```json
{
  "vehicleId": 1,
  "logType": "MAINTENANCE",
  "timestamp": "2024-03-10T09:00:00Z",
  "data": {
    "odometerReading": 45000,
    "diagnosticCodes": ["P0301", "P0171"],
    "symptoms": ["Check engine light"],
    "actionsTaken": ["Oil change", "Filter replacement"],
    "nextServiceDue": "2024-08-10T00:00:00Z",
    "performanceMetrics": {
      "engineTemp": 195.5,
      "oilPressure": 42.1,
      "fuelEfficiency": 28.5
    }
  },
  "technicianId": 1,
  "duration": 40,
  "cost": 54.00
}
```

#### 3. customer_feedback
Stores customer complaints, compliments, and suggestions.
```json
{
  "customerId": 1,
  "bookingId": 1,
  "vehicleId": 1,
  "type": "COMPLIMENT",
  "category": "SERVICE_QUALITY",
  "rating": 5,
  "feedback": "Excellent service!",
  "priority": "LOW",
  "status": "RESOLVED",
  "assignedTo": 1,
  "resolution": "Thank you for your feedback",
  "resolutionDate": "2024-03-10T16:00:00Z",
  "attachments": [
    {
      "url": "/images/feedback.jpg",
      "type": "IMAGE",
      "description": "Customer photo"
    }
  ],
  "createdAt": "2024-03-10T15:30:00Z"
}
```

#### 4. diagnostic_summaries
Stores comprehensive diagnostic reports with system health information.
```json
{
  "vehicleId": 1,
  "testDate": "2024-03-10T08:30:00Z",
  "technicianId": 1,
  "summary": "Vehicle in excellent condition",
  "overallHealth": "EXCELLENT",
  "systems": [
    {
      "systemName": "ENGINE",
      "status": "PASS",
      "details": "Engine running smoothly",
      "recommendations": ["Continue regular maintenance"],
      "estimatedCost": 0,
      "urgency": "ROUTINE"
    }
  ],
  "diagnosticCodes": [],
  "performanceMetrics": {
    "enginePerformance": 95,
    "fuelEfficiency": 88,
    "emissions": 92
  },
  "nextRecommendedService": {
    "type": "Battery Test",
    "dueDate": "2024-06-10T00:00:00Z",
    "estimatedCost": 25.00,
    "priority": "MEDIUM"
  }
}
```

#### 5. activity_logs
Stores system activity and audit trails.
```json
{
  "userId": 1,
  "userType": "CUSTOMER",
  "action": "BOOK",
  "entityType": "BOOKING",
  "entityId": 1,
  "details": {
    "serviceType": "Oil Change",
    "scheduledDate": "2024-03-10T09:00:00Z"
  },
  "ipAddress": "192.168.1.100",
  "userAgent": "Mozilla/5.0...",
  "sessionId": "sess_abc123",
  "timestamp": "2024-03-09T10:00:00Z",
  "success": true
}
```

### Data Linking Strategy

#### Oracle to MongoDB References
- **bookingId** in MongoDB collections references **service_bookings.booking_id** in Oracle
- **customerId** in MongoDB collections references **customers.customer_id** in Oracle
- **vehicleId** in MongoDB collections references **vehicles.vehicle_id** in Oracle
- **technicianId** in MongoDB collections references **mechanics.mechanic_id** in Oracle

#### Consistency Maintenance
1. **Application-level consistency**: Backend API ensures data consistency between databases
2. **Event-driven updates**: Changes in Oracle trigger corresponding updates in MongoDB
3. **Periodic synchronization**: Background jobs reconcile data between databases
4. **Transaction management**: Critical operations span both databases with rollback capabilities

### Indexes for Performance

#### MongoDB Indexes
- service_technician_notes: bookingId, technicianId, createdAt
- vehicle_service_logs: vehicleId, logType, timestamp, technicianId
- customer_feedback: customerId, type, status, createdAt, rating
- diagnostic_summaries: vehicleId, testDate, overallHealth, technicianId
- activity_logs: userId, action, entityType, timestamp, userType

### Data Validation

#### MongoDB Schema Validation
- Required fields enforced at collection level
- Data type validation for all fields
- Enum validation for categorical fields
- Custom validation rules for business logic

## Benefits of Hybrid Approach

### Oracle Strengths
- **ACID Compliance**: Ensures data integrity for financial transactions
- **Complex Queries**: Powerful SQL for reporting and analytics
- **Referential Integrity**: Enforced relationships between entities
- **Mature Technology**: Reliable and well-documented

### MongoDB Strengths
- **Flexible Schema**: Accommodates varying data structures
- **Document Storage**: Natural fit for notes, logs, and feedback
- **Scalability**: Easy horizontal scaling for large datasets
- **Performance**: Fast reads for unstructured data

### Combined Benefits
- **Best of Both Worlds**: Structured and unstructured data handled optimally
- **Performance Optimization**: Each database handles what it does best
- **Future-Proof**: Easy to evolve and extend the system
- **Cost Effective**: Efficient resource utilization
