# Vehicle Service & Maintenance Management System

A comprehensive vehicle service and maintenance management system that combines Oracle (relational) and MongoDB (non-relational) databases with a modern React frontend and Node.js backend.

## 🚀 Features

- **Dual Database Architecture**: Oracle for structured data, MongoDB for flexible documents
- **Modern UI/UX**: React with Tailwind CSS for responsive, beautiful interface
- **RESTful API**: Node.js/Express backend with comprehensive endpoints
- **Real-time Dashboard**: Analytics and insights with interactive charts
- **Customer Management**: Complete customer lifecycle management
- **Vehicle Tracking**: Detailed vehicle information and service history
- **Service Booking**: Easy appointment scheduling and management
- **Inventory Management**: Spare parts tracking with low-stock alerts
- **Invoice System**: Automated billing and payment tracking
- **Feedback System**: Customer complaints and feedback management
- **Diagnostic Reports**: Comprehensive vehicle health assessments
- **Activity Logging**: Complete audit trail for compliance

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- React 18
- React Router
- React Query (TanStack Query)
- Tailwind CSS
- Heroicons
- Recharts (for charts)

**Backend:**
- Node.js
- Express.js
- Oracle DB (oracledb)
- MongoDB (mongodb)
- JWT Authentication
- Joi Validation
- Morgan Logging

**Database:**
- Oracle XE (Relational Data)
- MongoDB Community (Document Data)

### Database Design

**Oracle (Relational Data):**
- Customers
- Vehicles
- Mechanics
- Service Bookings
- Invoices
- Invoice Items
- Spare Parts Inventory

**MongoDB (Document Data):**
- Service Technician Notes
- Vehicle Service Logs
- Customer Feedback
- Diagnostic Summaries
- Activity Logs

## 📋 Prerequisites

- Node.js 16+ 
- Oracle XE Database
- MongoDB Community Server
- Git

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd vehicle-management-system
```

### 2. Oracle Database Setup

1. **Install Oracle XE** if not already installed
2. **Create Database User:**

```sql
-- Connect as SYS
CREATE USER vehicle_management IDENTIFIED BY "your_password";
GRANT CONNECT, RESOURCE, DBA TO vehicle_management;
GRANT UNLIMITED TABLESPACE TO vehicle_management;
```

3. **Run Schema and Sample Data:**

```bash
# Using SQL Developer or SQL*Plus
# Connect as vehicle_management user
@database/oracle/schema.sql
@database/oracle/plsql_procedures.sql
@database/oracle/sample_data.sql
```

### 3. MongoDB Setup

1. **Install MongoDB Community Server**
2. **Start MongoDB Service:**

```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl start mongod
```

3. **Run Collections and Sample Data:**

```bash
# Using MongoDB Compass or mongo shell
# Connect to localhost:27017
mongo < database/mongodb/collections.js
mongo < database/mongodb/sample_data.js
```

### 4. Backend Setup

```bash
cd backend
npm install

# Create environment file
cp .env.example .env

# Edit .env with your database credentials
nano .env
```

**Environment Variables:**
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Oracle Database
ORACLE_HOST=localhost
ORACLE_PORT=1521
ORACLE_SERVICE=XE
ORACLE_USER=vehicle_management
ORACLE_PASSWORD=your_password

# MongoDB
MONGODB_URI=mongodb://localhost:27017/vehicle_management

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here
```

### 5. Frontend Setup

```bash
cd frontend
npm install
```

## 🚀 Running the Application

### 1. Start Backend Server

```bash
cd backend
npm run dev
```

Backend will be available at: `http://localhost:5000`

### 2. Start Frontend Development Server

```bash
cd frontend
npm start
```

Frontend will be available at: `http://localhost:3000`

### 3. Verify Installation

1. **Health Check:** `http://localhost:5000/health`
2. **Frontend:** `http://localhost:3000`
3. **API Documentation:** `http://localhost:5000/api/` (when running)

## 📊 Sample Data

The system comes with comprehensive sample data:

**Oracle Sample Data:**
- 10 Customers
- 10 Mechanics  
- 11 Vehicles
- 10 Spare Parts
- 10 Service Bookings
- 2 Invoices with items

**MongoDB Sample Data:**
- Service technician notes
- Vehicle service logs
- Customer feedback entries
- Diagnostic reports
- Activity logs

## 🎯 Usage Guide

### Dashboard
- View key statistics and metrics
- Monitor recent bookings and activities
- Check low stock alerts
- Analyze revenue trends

### Customer Management
- Add new customers
- View customer details and vehicles
- Track customer service history

### Vehicle Management
- Register new vehicles
- View vehicle specifications
- Track service history and diagnostics

### Service Booking
- Schedule new appointments
- Assign mechanics
- Track booking status
- Generate invoices

### Inventory Management
- Manage spare parts inventory
- Track stock levels
- Receive low-stock alerts
- Manage suppliers

### Reports & Analytics
- Generate financial reports
- View technician performance
- Analyze service trends
- Export data

## 🔧 API Endpoints

### Dashboard
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/dashboard/recent-bookings` - Recent bookings
- `GET /api/dashboard/low-stock-parts` - Low stock alerts
- `GET /api/dashboard/revenue-data` - Revenue chart data

### Customers
- `GET /api/customers` - List customers
- `POST /api/customers` - Create customer
- `GET /api/customers/:id` - Get customer details
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Vehicles
- `GET /api/vehicles` - List vehicles
- `POST /api/vehicles` - Add vehicle
- `GET /api/vehicles/:id` - Get vehicle details
- `PUT /api/vehicles/:id` - Update vehicle

### Bookings
- `GET /api/bookings` - List bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id/status` - Update booking status
- `GET /api/bookings/:id/history` - Service history

### Mechanics
- `GET /api/mechanics` - List mechanics
- `POST /api/mechanics` - Add mechanic
- `GET /api/mechanics/:id/schedule` - Mechanic schedule

### Inventory
- `GET /api/inventory` - List parts
- `POST /api/inventory` - Add part
- `PUT /api/inventory/:id` - Update part stock

### Invoices
- `GET /api/invoices` - List invoices
- `POST /api/invoices` - Generate invoice
- `PUT /api/invoices/:id/payment` - Update payment status

### Feedback
- `GET /api/feedback` - List feedback
- `POST /api/feedback` - Submit feedback
- `PUT /api/feedback/:id/status` - Update feedback status

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📁 Project Structure

```
vehicle-management-system/
├── backend/                 # Node.js backend
│   ├── config/             # Database configuration
│   ├── middleware/         # Express middleware
│   ├── models/             # Data models
│   ├── routes/             # API routes
│   ├── src/                # Source files
│   ├── utils/              # Utility functions
│   └── server.js           # Main server file
├── frontend/               # React frontend
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # React context
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   └── package.json
├── database/              # Database files
│   ├── oracle/            # Oracle schemas and data
│   └── mongodb/           # MongoDB collections and data
├── docs/                  # Documentation
└── README.md
```

## 🔐 Security Features

- JWT-based authentication
- Input validation and sanitization
- SQL injection prevention
- Rate limiting
- CORS protection
- Helmet.js security headers
- Password hashing (bcryptjs)

## 🚀 Performance Optimizations

- Database connection pooling
- Query optimization with indexes
- React Query for data caching
- Code splitting in React
- Image optimization
- Compression middleware

## 🔄 Data Consistency

The system maintains data consistency between Oracle and MongoDB through:

1. **Application-level validation**
2. **Transaction management**
3. **Event-driven updates**
4. **Periodic synchronization**
5. **Referential integrity checks**

## 📈 Monitoring & Logging

- Morgan HTTP request logging
- Error tracking and reporting
- Performance metrics
- Database query logging
- Activity audit trails

## 🐛 Troubleshooting

### Common Issues

**Oracle Connection Issues:**
```bash
# Check Oracle service
net start OracleServiceXE

# Verify connection with SQL Developer
# Test with: sqlplus vehicle_management/password@localhost:1521/XE
```

**MongoDB Connection Issues:**
```bash
# Check MongoDB service
net start MongoDB

# Verify connection
mongo --eval "db.adminCommand('ismaster')"
```

**Backend Port Issues:**
```bash
# Check what's using port 5000
netstat -ano | findstr :5000

# Kill process if needed
taskkill /PID <PID> /F
```

**Frontend Build Issues:**
```bash
# Clear node modules
rm -rf node_modules package-lock.json
npm install

# Clear cache
npm start -- --reset-cache
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:

- Create an issue in the repository
- Email: support@vehiclemanagement.com
- Documentation: [docs/](./docs/)

## 🎯 Future Enhancements

- Mobile app development
- Real-time notifications
- Advanced reporting
- Multi-location support
- Integration with parts suppliers
- Automated appointment reminders
- Customer portal
- Mechanic mobile app
- Predictive maintenance
- AI-powered diagnostics

---

**Built with ❤️ for the automotive service industry**
