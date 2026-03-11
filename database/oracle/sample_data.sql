-- Sample Data for Oracle Database
-- Vehicle Service & Maintenance Management System

-- Insert Sample Customers
INSERT INTO customers (first_name, last_name, email, phone, address, city, postal_code) VALUES
('John', 'Smith', 'john.smith@email.com', '555-0101', '123 Main St', 'New York', '10001'),
('Sarah', 'Johnson', 'sarah.j@email.com', '555-0102', '456 Oak Ave', 'Los Angeles', '90001'),
('Michael', 'Brown', 'michael.brown@email.com', '555-0103', '789 Pine Rd', 'Chicago', '60007'),
('Emily', 'Davis', 'emily.davis@email.com', '555-0104', '321 Elm St', 'Houston', '77001'),
('David', 'Wilson', 'david.wilson@email.com', '555-0105', '654 Maple Dr', 'Phoenix', '85001'),
('Jessica', 'Miller', 'jessica.miller@email.com', '555-0106', '987 Cedar Ln', 'Philadelphia', '19101'),
('Robert', 'Taylor', 'robert.taylor@email.com', '555-0107', '147 Birch Way', 'San Antonio', '78201'),
('Amanda', 'Anderson', 'amanda.anderson@email.com', '555-0108', '258 Spruce Ct', 'San Diego', '92101'),
('Christopher', 'Thomas', 'chris.thomas@email.com', '555-0109', '369 Fir Blvd', 'Dallas', '75201'),
('Lisa', 'Jackson', 'lisa.jackson@email.com', '555-0110', '741 Redwood Sq', 'San Jose', '95101');

-- Insert Sample Mechanics
INSERT INTO mechanics (first_name, last_name, email, phone, specialization, hourly_rate, years_experience) VALUES
('James', 'Garcia', 'james.garcia@garage.com', '555-0201', 'Engine Specialist', 85.00, 8),
('Carlos', 'Martinez', 'carlos.martinez@garage.com', '555-0202', 'Transmission Expert', 90.00, 12),
('Maria', 'Rodriguez', 'maria.rodriguez@garage.com', '555-0203', 'Brake Specialist', 75.00, 6),
('Daniel', 'Hernandez', 'daniel.hernandez@garage.com', '555-0204', 'General Mechanic', 70.00, 5),
('Jennifer', 'Lopez', 'jennifer.lopez@garage.com', '555-0205', 'Electrical Systems', 80.00, 7),
('Richard', 'Gonzalez', 'richard.gonzalez@garage.com', '555-0206', 'HVAC Specialist', 75.00, 4),
('Nancy', 'Perez', 'nancy.perez@garage.com', '555-0207', 'Diagnostic Expert', 95.00, 15),
('Steven', 'Sanchez', 'steven.sanchez@garage.com', '555-0208', 'Tire & Alignment', 65.00, 3),
('Karen', 'Ramirez', 'karen.ramirez@garage.com', '555-0209', 'Oil Change Specialist', 55.00, 2),
('Brian', 'Torres', 'brian.torres@garage.com', '555-0210', 'General Mechanic', 70.00, 6);

-- Insert Sample Vehicles
INSERT INTO vehicles (customer_id, make, model, year, vin, license_plate, mileage, engine_type, transmission, color, purchase_date) VALUES
(1, 'Toyota', 'Camry', 2020, '1HGBH41JXMN109186', 'ABC-1234', 45000, '2.5L I4', 'Automatic', 'Silver', TO_DATE('2020-06-15', 'YYYY-MM-DD')),
(1, 'Honda', 'CR-V', 2022, '2HGBH41JXMN109187', 'XYZ-5678', 25000, '1.5L Turbo', 'CVT', 'Blue', TO_DATE('2022-03-20', 'YYYY-MM-DD')),
(2, 'Ford', 'F-150', 2019, '3HGBH41JXMN109188', 'DEF-9012', 60000, '3.5L V6', 'Automatic', 'Red', TO_DATE('2019-08-10', 'YYYY-MM-DD')),
(3, 'Chevrolet', 'Malibu', 2021, '4HGBH41JXMN109189', 'GHI-3456', 35000, '1.5L Turbo', 'Automatic', 'Black', TO_DATE('2021-01-25', 'YYYY-MM-DD')),
(4, 'BMW', '3 Series', 2020, '5HGBH41JXMN109190', 'JKL-7890', 40000, '2.0L Turbo', 'Automatic', 'White', TO_DATE('2020-11-30', 'YYYY-MM-DD')),
(5, 'Mercedes', 'C-Class', 2022, '6HGBH41JXMN109191', 'MNO-2345', 20000, '2.0L Turbo', 'Automatic', 'Gray', TO_DATE('2022-05-15', 'YYYY-MM-DD')),
(6, 'Audi', 'A4', 2021, '7HGBH41JXMN109192', 'PQR-6789', 30000, '2.0L Turbo', 'Automatic', 'Black', TO_DATE('2021-09-20', 'YYYY-MM-DD')),
(7, 'Nissan', 'Altima', 2020, '8HGBH41JXMN109193', 'STU-0123', 42000, '2.5L I4', 'CVT', 'Silver', TO_DATE('2020-07-10', 'YYYY-MM-DD')),
(8, 'Hyundai', 'Sonata', 2022, '9HGBH41JXMN109194', 'VWX-4567', 18000, '2.5L I4', 'Automatic', 'Blue', TO_DATE('2022-02-28', 'YYYY-MM-DD')),
(9, 'Kia', 'Optima', 2021, '0HGBH41JXMN109195', 'YZA-8901', 28000, '2.0L Turbo', 'Automatic', 'Red', TO_DATE('2021-06-15', 'YYYY-MM-DD')),
(10, 'Subaru', 'Outback', 2020, '1HGBH41JXMN109196', 'BCD-2345', 38000, '2.5L Boxer', 'CVT', 'Green', TO_DATE('2020-10-20', 'YYYY-MM-DD'));

-- Insert Sample Spare Parts
INSERT INTO spare_parts_inventory (part_name, part_number, description, category, quantity_in_stock, min_stock_level, unit_price, supplier_name, supplier_contact) VALUES
('Oil Filter 5W-30', 'OF-5W30-001', 'Premium oil filter for synthetic oil', 'Filters', 12, 5, 8.99, 'AutoParts Inc', 'parts@autoparts.com'),
('Brake Pads Front', 'BP-FRONT-002', 'Ceramic brake pads for front wheels', 'Brakes', 8, 4, 45.99, 'BrakeMaster', 'orders@brakemaster.com'),
('Air Filter', 'AF-STANDARD-003', 'Standard engine air filter', 'Filters', 15, 3, 12.99, 'FilterPro', 'sales@filterpro.com'),
('Spark Plug', 'SP-PLATINUM-004', 'Platinum spark plug', 'Ignition', 20, 10, 6.99, 'IgnitionCo', 'info@ignitionco.com'),
('Transmission Fluid', 'TF-ATF-005', 'Automatic transmission fluid', 'Fluids', 6, 3, 24.99, 'FluidMaster', 'orders@fluidmaster.com'),
('Coolant', 'CL-5050-006', '50/50 coolant mixture', 'Fluids', 8, 4, 15.99, 'CoolantPro', 'sales@coolantpro.com'),
('Brake Rotors Front', 'BR-FRONT-007', 'Front brake rotors', 'Brakes', 4, 2, 89.99, 'BrakeMaster', 'orders@brakemaster.com'),
('Oil 5W-30 Synthetic', 'OL-SYN-008', 'Full synthetic motor oil 5W-30', 'Fluids', 25, 10, 9.99, 'OilCo', 'orders@oilco.com'),
('Wiper Blades Front', 'WB-FRONT-009', 'Front windshield wiper blades', 'Accessories', 10, 5, 18.99, 'WiperPro', 'sales@wiperpro.com'),
('Battery 12V', 'BT-12V-010', '12V car battery', 'Electrical', 3, 2, 149.99, 'BatteryPlus', 'orders@batteryplus.com');

-- Insert Sample Service Bookings
INSERT INTO service_bookings (vehicle_id, mechanic_id, service_type, service_date, start_time, status, estimated_cost, notes) VALUES
(1, 1, 'Oil Change', TO_DATE('2024-03-10', 'YYYY-MM-DD'), TO_TIMESTAMP('2024-03-10 09:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'COMPLETED', 45.00, 'Regular oil change service'),
(2, 2, 'Brake Service', TO_DATE('2024-03-10', 'YYYY-MM-DD'), TO_TIMESTAMP('2024-03-10 10:30:00', 'YYYY-MM-DD HH24:MI:SS'), 'COMPLETED', 189.99, 'Front brake pad replacement'),
(3, 3, 'Tire Rotation', TO_DATE('2024-03-11', 'YYYY-MM-DD'), TO_TIMESTAMP('2024-03-11 08:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'SCHEDULED', 35.00, 'Regular tire rotation and balance'),
(4, 4, 'Engine Diagnostics', TO_DATE('2024-03-11', 'YYYY-MM-DD'), TO_TIMESTAMP('2024-03-11 11:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'SCHEDULED', 120.00, 'Check engine light diagnosis'),
(5, 5, 'Transmission Service', TO_DATE('2024-03-12', 'YYYY-MM-DD'), TO_TIMESTAMP('2024-03-12 09:30:00', 'YYYY-MM-DD HH24:MI:SS'), 'SCHEDULED', 250.00, 'Transmission fluid change and filter'),
(6, 6, 'HVAC Service', TO_DATE('2024-03-12', 'YYYY-MM-DD'), TO_TIMESTAMP('2024-03-12 13:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'SCHEDULED', 150.00, 'AC not cooling properly'),
(7, 7, 'General Inspection', TO_DATE('2024-03-13', 'YYYY-MM-DD'), TO_TIMESTAMP('2024-03-13 10:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'SCHEDULED', 75.00, 'Annual vehicle inspection'),
(8, 8, 'Wheel Alignment', TO_DATE('2024-03-13', 'YYYY-MM-DD'), TO_TIMESTAMP('2024-03-13 14:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'SCHEDULED', 95.00, 'Four-wheel alignment'),
(9, 9, 'Battery Replacement', TO_DATE('2024-03-14', 'YYYY-MM-DD'), TO_TIMESTAMP('2024-03-14 09:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'SCHEDULED', 189.99, 'Battery replacement and testing'),
(10, 10, 'Oil Change', TO_DATE('2024-03-14', 'YYYY-MM-DD'), TO_TIMESTAMP('2024-03-14 11:30:00', 'YYYY-MM-DD HH24:MI:SS'), 'SCHEDULED', 45.00, 'Synthetic oil change');

-- Update some bookings with actual costs and end times
UPDATE service_bookings 
SET end_time = start_time + INTERVAL '1' HOUR, 
    actual_cost = estimated_cost + 5.00,
    status = 'COMPLETED'
WHERE booking_id IN (1, 2);

-- Insert Sample Invoices
INSERT INTO invoices (booking_id, total_amount, tax_amount, discount_amount, final_amount, payment_status, payment_date) VALUES
(1, 50.00, 4.00, 0.00, 54.00, 'PAID', TO_DATE('2024-03-10', 'YYYY-MM-DD')),
(2, 194.99, 15.60, 10.00, 200.59, 'PAID', TO_DATE('2024-03-10', 'YYYY-MM-DD'));

-- Insert Sample Invoice Items
INSERT INTO invoice_items (invoice_id, part_id, description, quantity, unit_price, total_price) VALUES
(1, 1, 'Oil Filter 5W-30', 1, 8.99, 8.99),
(1, NULL, 'Labor - Oil Change', 1, 36.01, 36.01),
(2, 2, 'Brake Pads Front', 1, 45.99, 45.99),
(2, NULL, 'Labor - Brake Service', 1, 149.00, 149.00);

COMMIT;
