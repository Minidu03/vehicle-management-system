-- PL/SQL Procedures and Functions for Vehicle Service Management System

-- Procedure to add a new customer
CREATE OR REPLACE PROCEDURE add_customer(
    p_first_name IN VARCHAR2,
    p_last_name IN VARCHAR2,
    p_email IN VARCHAR2,
    p_phone IN VARCHAR2,
    p_address IN VARCHAR2 DEFAULT NULL,
    p_city IN VARCHAR2 DEFAULT NULL,
    p_postal_code IN VARCHAR2 DEFAULT NULL,
    p_customer_id OUT NUMBER
) AS
BEGIN
    INSERT INTO customers (first_name, last_name, email, phone, address, city, postal_code)
    VALUES (p_first_name, p_last_name, p_email, p_phone, p_address, p_city, p_postal_code)
    RETURNING customer_id INTO p_customer_id;
    
    COMMIT;
EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        RAISE_APPLICATION_ERROR(-20001, 'Email already exists');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Error adding customer: ' || SQLERRM);
END;
/

-- Procedure to add a new vehicle
CREATE OR REPLACE PROCEDURE add_vehicle(
    p_customer_id IN NUMBER,
    p_make IN VARCHAR2,
    p_model IN VARCHAR2,
    p_year IN NUMBER,
    p_vin IN VARCHAR2,
    p_license_plate IN VARCHAR2,
    p_mileage IN NUMBER DEFAULT 0,
    p_engine_type IN VARCHAR2 DEFAULT NULL,
    p_transmission IN VARCHAR2 DEFAULT NULL,
    p_color IN VARCHAR2 DEFAULT NULL,
    p_purchase_date IN DATE DEFAULT NULL,
    p_vehicle_id OUT NUMBER
) AS
BEGIN
    INSERT INTO vehicles (customer_id, make, model, year, vin, license_plate, mileage, engine_type, transmission, color, purchase_date)
    VALUES (p_customer_id, p_make, p_model, p_year, p_vin, p_license_plate, p_mileage, p_engine_type, p_transmission, p_color, p_purchase_date)
    RETURNING vehicle_id INTO p_vehicle_id;
    
    COMMIT;
EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        RAISE_APPLICATION_ERROR(-20003, 'VIN or License Plate already exists');
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20004, 'Customer not found');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20005, 'Error adding vehicle: ' || SQLERRM);
END;
/

-- Procedure to create service booking
CREATE OR REPLACE PROCEDURE create_service_booking(
    p_vehicle_id IN NUMBER,
    p_mechanic_id IN NUMBER,
    p_service_type IN VARCHAR2,
    p_service_date IN DATE,
    p_start_time IN TIMESTAMP,
    p_estimated_cost IN NUMBER DEFAULT NULL,
    p_notes IN VARCHAR2 DEFAULT NULL,
    p_booking_id OUT NUMBER
) AS
    v_mechanic_available NUMBER;
BEGIN
    -- Check if mechanic is available
    SELECT COUNT(*) INTO v_mechanic_available
    FROM service_bookings
    WHERE mechanic_id = p_mechanic_id
    AND service_date = p_service_date
    AND status IN ('SCHEDULED', 'IN_PROGRESS')
    AND ((p_start_time BETWEEN start_time AND NVL(end_time, p_start_time + INTERVAL '1' HOUR))
         OR (p_start_time + INTERVAL '1' HOUR BETWEEN start_time AND NVL(end_time, start_time + INTERVAL '1' HOUR)));
    
    IF v_mechanic_available > 0 THEN
        RAISE_APPLICATION_ERROR(-20006, 'Mechanic is not available at the requested time');
    END IF;
    
    INSERT INTO service_bookings (vehicle_id, mechanic_id, service_type, service_date, start_time, estimated_cost, notes)
    VALUES (p_vehicle_id, p_mechanic_id, p_service_type, p_service_date, p_start_time, p_estimated_cost, p_notes)
    RETURNING booking_id INTO p_booking_id;
    
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20007, 'Vehicle or Mechanic not found');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20008, 'Error creating booking: ' || SQLERRM);
END;
/

-- Procedure to update service booking status
CREATE OR REPLACE PROCEDURE update_booking_status(
    p_booking_id IN NUMBER,
    p_status IN VARCHAR2,
    p_end_time IN TIMESTAMP DEFAULT NULL,
    p_actual_cost IN NUMBER DEFAULT NULL
) AS
    v_current_status VARCHAR2(20);
BEGIN
    SELECT status INTO v_current_status
    FROM service_bookings
    WHERE booking_id = p_booking_id;
    
    IF v_current_status = 'COMPLETED' AND p_status != 'COMPLETED' THEN
        RAISE_APPLICATION_ERROR(-20009, 'Cannot reopen completed booking');
    END IF;
    
    UPDATE service_bookings
    SET status = p_status,
        end_time = NVL(p_end_time, end_time),
        actual_cost = NVL(p_actual_cost, actual_cost)
    WHERE booking_id = p_booking_id;
    
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20010, 'Booking not found');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20011, 'Error updating booking: ' || SQLERRM);
END;
/

-- Procedure to add/update spare parts
CREATE OR REPLACE PROCEDURE manage_spare_part(
    p_part_name IN VARCHAR2,
    p_part_number IN VARCHAR2,
    p_description IN VARCHAR2 DEFAULT NULL,
    p_category IN VARCHAR2 DEFAULT NULL,
    p_quantity_in_stock IN NUMBER DEFAULT 0,
    p_min_stock_level IN NUMBER DEFAULT 5,
    p_unit_price IN NUMBER,
    p_supplier_name IN VARCHAR2 DEFAULT NULL,
    p_supplier_contact IN VARCHAR2 DEFAULT NULL,
    p_part_id OUT NUMBER
) AS
    v_existing_part NUMBER;
BEGIN
    -- Check if part already exists
    SELECT part_id INTO v_existing_part
    FROM spare_parts_inventory
    WHERE part_number = p_part_number;
    
    -- Update existing part
    UPDATE spare_parts_inventory
    SET part_name = p_part_name,
        description = p_description,
        category = p_category,
        quantity_in_stock = p_quantity_in_stock,
        min_stock_level = p_min_stock_level,
        unit_price = p_unit_price,
        supplier_name = p_supplier_name,
        supplier_contact = p_supplier_contact,
        last_restocked = SYSDATE
    WHERE part_id = v_existing_part;
    
    p_part_id := v_existing_part;
    
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        -- Insert new part
        INSERT INTO spare_parts_inventory (part_name, part_number, description, category, quantity_in_stock, min_stock_level, unit_price, supplier_name, supplier_contact, last_restocked)
        VALUES (p_part_name, p_part_number, p_description, p_category, p_quantity_in_stock, p_min_stock_level, p_unit_price, p_supplier_name, p_supplier_contact, SYSDATE)
        RETURNING part_id INTO p_part_id;
        
        COMMIT;
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20012, 'Error managing spare part: ' || SQLERRM);
END;
/

-- Function to get customer vehicles
CREATE OR REPLACE FUNCTION get_customer_vehicles(
    p_customer_id IN NUMBER
) RETURN SYS_REFCURSOR AS
    v_cursor SYS_REFCURSOR;
BEGIN
    OPEN v_cursor FOR
    SELECT v.vehicle_id, v.make, v.model, v.year, v.vin, v.license_plate, 
           v.mileage, v.engine_type, v.transmission, v.color, v.purchase_date
    FROM vehicles v
    WHERE v.customer_id = p_customer_id
    ORDER BY v.make, v.model, v.year;
    
    RETURN v_cursor;
EXCEPTION
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20013, 'Error retrieving customer vehicles: ' || SQLERRM);
END;
/

-- Function to get service history for a vehicle
CREATE OR REPLACE FUNCTION get_vehicle_service_history(
    p_vehicle_id IN NUMBER
) RETURN SYS_REFCURSOR AS
    v_cursor SYS_REFCURSOR;
BEGIN
    OPEN v_cursor FOR
    SELECT b.booking_id, b.service_type, b.service_date, b.start_time, b.end_time,
           b.status, b.estimated_cost, b.actual_cost, b.notes,
           m.first_name || ' ' || m.last_name AS mechanic_name,
           m.specialization
    FROM service_bookings b
    JOIN mechanics m ON b.mechanic_id = m.mechanic_id
    WHERE b.vehicle_id = p_vehicle_id
    ORDER BY b.service_date DESC, b.start_time DESC;
    
    RETURN v_cursor;
EXCEPTION
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20014, 'Error retrieving service history: ' || SQLERRM);
END;
/

-- Function to get low stock parts
CREATE OR REPLACE FUNCTION get_low_stock_parts RETURN SYS_REFCURSOR AS
    v_cursor SYS_REFCURSOR;
BEGIN
    OPEN v_cursor FOR
    SELECT part_id, part_name, part_number, category, quantity_in_stock, 
           min_stock_level, unit_price, supplier_name
    FROM spare_parts_inventory
    WHERE quantity_in_stock <= min_stock_level
    ORDER BY quantity_in_stock ASC;
    
    RETURN v_cursor;
EXCEPTION
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20015, 'Error retrieving low stock parts: ' || SQLERRM);
END;
/

-- Function to get mechanic schedule
CREATE OR REPLACE FUNCTION get_mechanic_schedule(
    p_mechanic_id IN NUMBER,
    p_start_date IN DATE DEFAULT NULL,
    p_end_date IN DATE DEFAULT NULL
) RETURN SYS_REFCURSOR AS
    v_cursor SYS_REFCURSOR;
    v_start_date DATE := NVL(p_start_date, SYSDATE);
    v_end_date DATE := NVL(p_end_date, SYSDATE + 7);
BEGIN
    OPEN v_cursor FOR
    SELECT b.booking_id, b.service_type, b.service_date, b.start_time, b.end_time,
           b.status, b.estimated_cost,
           v.make || ' ' || v.model || ' (' || v.license_plate || ')' AS vehicle_info,
           c.first_name || ' ' || c.last_name AS customer_name
    FROM service_bookings b
    JOIN vehicles v ON b.vehicle_id = v.vehicle_id
    JOIN customers c ON v.customer_id = c.customer_id
    WHERE b.mechanic_id = p_mechanic_id
    AND b.service_date BETWEEN v_start_date AND v_end_date
    ORDER BY b.service_date, b.start_time;
    
    RETURN v_cursor;
EXCEPTION
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20016, 'Error retrieving mechanic schedule: ' || SQLERRM);
END;
/

-- Procedure to generate invoice
CREATE OR REPLACE PROCEDURE generate_invoice(
    p_booking_id IN NUMBER,
    p_tax_rate IN NUMBER DEFAULT 0.10,
    p_discount_rate IN NUMBER DEFAULT 0.00,
    p_invoice_id OUT NUMBER
) AS
    v_booking_status VARCHAR2(20);
    v_actual_cost NUMBER;
    v_total_amount NUMBER;
    v_tax_amount NUMBER;
    v_discount_amount NUMBER;
    v_final_amount NUMBER;
BEGIN
    -- Check if booking is completed
    SELECT status, actual_cost INTO v_booking_status, v_actual_cost
    FROM service_bookings
    WHERE booking_id = p_booking_id;
    
    IF v_booking_status != 'COMPLETED' THEN
        RAISE_APPLICATION_ERROR(-20017, 'Cannot generate invoice for incomplete booking');
    END IF;
    
    IF v_actual_cost IS NULL THEN
        RAISE_APPLICATION_ERROR(-20018, 'Actual cost not set for completed booking');
    END IF;
    
    -- Calculate amounts
    v_total_amount := v_actual_cost;
    v_tax_amount := v_total_amount * p_tax_rate;
    v_discount_amount := v_total_amount * p_discount_rate;
    v_final_amount := v_total_amount + v_tax_amount - v_discount_amount;
    
    -- Create invoice
    INSERT INTO invoices (booking_id, total_amount, tax_amount, discount_amount, final_amount)
    VALUES (p_booking_id, v_total_amount, v_tax_amount, v_discount_amount, v_final_amount)
    RETURNING invoice_id INTO p_invoice_id;
    
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20019, 'Booking not found');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20020, 'Error generating invoice: ' || SQLERRM);
END;
/

-- Function to get customer statistics
CREATE OR REPLACE FUNCTION get_customer_statistics(
    p_customer_id IN NUMBER
) RETURN SYS_REFCURSOR AS
    v_cursor SYS_REFCURSOR;
BEGIN
    OPEN v_cursor FOR
    SELECT 
        COUNT(DISTINCT v.vehicle_id) AS total_vehicles,
        COUNT(DISTINCT b.booking_id) AS total_services,
        SUM(CASE WHEN b.status = 'COMPLETED' THEN 1 ELSE 0 END) AS completed_services,
        NVL(SUM(i.final_amount), 0) AS total_spent,
        NVL(AVG(b.actual_cost), 0) AS avg_service_cost
    FROM customers c
    LEFT JOIN vehicles v ON c.customer_id = v.customer_id
    LEFT JOIN service_bookings b ON v.vehicle_id = b.vehicle_id
    LEFT JOIN invoices i ON b.booking_id = i.booking_id
    WHERE c.customer_id = p_customer_id;
    
    RETURN v_cursor;
EXCEPTION
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20021, 'Error retrieving customer statistics: ' || SQLERRM);
END;
/

COMMIT;
