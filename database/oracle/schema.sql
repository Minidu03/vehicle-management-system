-- Vehicle Service & Maintenance Management System
-- Oracle Database Schema

-- Drop existing tables if they exist
BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE invoice_items CASCADE CONSTRAINTS';
   EXECUTE IMMEDIATE 'DROP TABLE invoices CASCADE CONSTRAINTS';
   EXECUTE IMMEDIATE 'DROP TABLE service_bookings CASCADE CONSTRAINTS';
   EXECUTE IMMEDIATE 'DROP TABLE spare_parts_inventory CASCADE CONSTRAINTS';
   EXECUTE IMMEDIATE 'DROP TABLE vehicles CASCADE CONSTRAINTS';
   EXECUTE IMMEDIATE 'DROP TABLE customers CASCADE CONSTRAINTS';
   EXECUTE IMMEDIATE 'DROP TABLE mechanics CASCADE CONSTRAINTS';
EXCEPTION
   WHEN OTHERS THEN
      IF SQLCODE != -942 THEN
         RAISE;
      END IF;
END;
/

-- Create Customers table
CREATE TABLE customers (
    customer_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR2(50) NOT NULL,
    last_name VARCHAR2(50) NOT NULL,
    email VARCHAR2(100) UNIQUE NOT NULL,
    phone VARCHAR2(20) NOT NULL,
    address VARCHAR2(200),
    city VARCHAR2(50),
    postal_code VARCHAR2(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Mechanics table
CREATE TABLE mechanics (
    mechanic_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR2(50) NOT NULL,
    last_name VARCHAR2(50) NOT NULL,
    email VARCHAR2(100) UNIQUE NOT NULL,
    phone VARCHAR2(20) NOT NULL,
    specialization VARCHAR2(100),
    hourly_rate NUMBER(10,2) DEFAULT 0.00,
    years_experience NUMBER(2),
    hire_date DATE DEFAULT SYSDATE,
    is_active CHAR(1) DEFAULT 'Y' CHECK (is_active IN ('Y', 'N')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Vehicles table
CREATE TABLE vehicles (
    vehicle_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id NUMBER NOT NULL,
    make VARCHAR2(50) NOT NULL,
    model VARCHAR2(50) NOT NULL,
    year NUMBER(4) NOT NULL,
    vin VARCHAR2(17) UNIQUE NOT NULL,
    license_plate VARCHAR2(15) UNIQUE NOT NULL,
    mileage NUMBER(10) DEFAULT 0,
    engine_type VARCHAR2(50),
    transmission VARCHAR2(30),
    color VARCHAR2(30),
    purchase_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_vehicle_customer FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Create Spare Parts Inventory table
CREATE TABLE spare_parts_inventory (
    part_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    part_name VARCHAR2(100) NOT NULL,
    part_number VARCHAR2(50) UNIQUE NOT NULL,
    description VARCHAR2(300),
    category VARCHAR2(50),
    quantity_in_stock NUMBER(5) DEFAULT 0,
    min_stock_level NUMBER(5) DEFAULT 5,
    unit_price NUMBER(10,2) NOT NULL,
    supplier_name VARCHAR2(100),
    supplier_contact VARCHAR2(100),
    last_restocked DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_stock_quantity CHECK (quantity_in_stock >= 0),
    CONSTRAINT chk_min_stock CHECK (min_stock_level >= 0)
);

-- Create Service Bookings table
CREATE TABLE service_bookings (
    booking_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    vehicle_id NUMBER NOT NULL,
    mechanic_id NUMBER NOT NULL,
    service_type VARCHAR2(100) NOT NULL,
    service_date DATE NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    status VARCHAR2(20) DEFAULT 'SCHEDULED' CHECK (status IN ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
    estimated_cost NUMBER(10,2),
    actual_cost NUMBER(10,2),
    notes VARCHAR2(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_booking_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id),
    CONSTRAINT fk_booking_mechanic FOREIGN KEY (mechanic_id) REFERENCES mechanics(mechanic_id),
    CONSTRAINT chk_times CHECK (end_time IS NULL OR end_time > start_time),
    CONSTRAINT chk_costs CHECK (estimated_cost >= 0 AND (actual_cost IS NULL OR actual_cost >= 0))
);

-- Create Invoices table
CREATE TABLE invoices (
    invoice_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    booking_id NUMBER NOT NULL,
    invoice_date DATE DEFAULT SYSDATE NOT NULL,
    total_amount NUMBER(10,2) NOT NULL,
    tax_amount NUMBER(10,2) DEFAULT 0.00,
    discount_amount NUMBER(10,2) DEFAULT 0.00,
    final_amount NUMBER(10,2) NOT NULL,
    payment_status VARCHAR2(20) DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'PAID', 'PARTIAL', 'OVERDUE')),
    payment_method VARCHAR2(30),
    payment_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_invoice_booking FOREIGN KEY (booking_id) REFERENCES service_bookings(booking_id),
    CONSTRAINT chk_amounts CHECK (total_amount >= 0 AND tax_amount >= 0 AND discount_amount >= 0 AND final_amount >= 0)
);

-- Create Invoice Items table
CREATE TABLE invoice_items (
    item_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    invoice_id NUMBER NOT NULL,
    part_id NUMBER,
    description VARCHAR2(200) NOT NULL,
    quantity NUMBER(5) NOT NULL,
    unit_price NUMBER(10,2) NOT NULL,
    total_price NUMBER(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_item_invoice FOREIGN KEY (invoice_id) REFERENCES invoices(invoice_id),
    CONSTRAINT fk_item_part FOREIGN KEY (part_id) REFERENCES spare_parts_inventory(part_id),
    CONSTRAINT chk_item_quantity CHECK (quantity > 0),
    CONSTRAINT chk_item_prices CHECK (unit_price >= 0 AND total_price >= 0)
);

-- Create indexes for performance
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_name ON customers(last_name, first_name);
CREATE INDEX idx_vehicles_customer ON vehicles(customer_id);
CREATE INDEX idx_vehicles_vin ON vehicles(vin);
CREATE INDEX idx_vehicles_license ON vehicles(license_plate);
CREATE INDEX idx_mechanics_specialization ON mechanics(specialization);
CREATE INDEX idx_parts_category ON spare_parts_inventory(category);
CREATE INDEX idx_parts_stock ON spare_parts_inventory(quantity_in_stock);
CREATE INDEX idx_bookings_vehicle ON service_bookings(vehicle_id);
CREATE INDEX idx_bookings_mechanic ON service_bookings(mechanic_id);
CREATE INDEX idx_bookings_date ON service_bookings(service_date);
CREATE INDEX idx_bookings_status ON service_bookings(status);
CREATE INDEX idx_invoices_booking ON invoices(booking_id);
CREATE INDEX idx_invoices_status ON invoices(payment_status);
CREATE INDEX idx_invoice_items_invoice ON invoice_items(invoice_id);

-- Create sequence for triggers
CREATE SEQUENCE update_timestamp_seq;
START WITH 1;
INCREMENT BY 1;
NOCACHE;
NOCYCLE;

-- Create trigger to auto-update updated_at timestamp
CREATE OR REPLACE TRIGGER trg_customers_update
BEFORE UPDATE ON customers
FOR EACH ROW
BEGIN
    :NEW.updated_at := CURRENT_TIMESTAMP;
END;
/

CREATE OR REPLACE TRIGGER trg_mechanics_update
BEFORE UPDATE ON mechanics
FOR EACH ROW
BEGIN
    :NEW.updated_at := CURRENT_TIMESTAMP;
END;
/

CREATE OR REPLACE TRIGGER trg_vehicles_update
BEFORE UPDATE ON vehicles
FOR EACH ROW
BEGIN
    :NEW.updated_at := CURRENT_TIMESTAMP;
END;
/

CREATE OR REPLACE TRIGGER trg_parts_update
BEFORE UPDATE ON spare_parts_inventory
FOR EACH ROW
BEGIN
    :NEW.updated_at := CURRENT_TIMESTAMP;
END;
/

CREATE OR REPLACE TRIGGER trg_bookings_update
BEFORE UPDATE ON service_bookings
FOR EACH ROW
BEGIN
    :NEW.updated_at := CURRENT_TIMESTAMP;
END;
/

CREATE OR REPLACE TRIGGER trg_invoices_update
BEFORE UPDATE ON invoices
FOR EACH ROW
BEGIN
    :NEW.updated_at := CURRENT_TIMESTAMP;
END;
/

COMMIT;
