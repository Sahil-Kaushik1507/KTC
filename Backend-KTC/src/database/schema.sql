
-- ==============================
-- DATABASE (Optional)
-- ==============================
-- CREATE DATABASE IF NOT EXISTS ktc_db;
-- USE ktc_db;

-- ==============================
-- BRANCHES
-- ==============================
-- ==============================
CREATE TABLE IF NOT EXISTS branches (
    branch_id INT AUTO_INCREMENT PRIMARY KEY,
    branch_name VARCHAR(150) NOT NULL UNIQUE,
    address TEXT
);

-- ==============================
-- EMPLOYEES
-- ==============================
CREATE TABLE IF NOT EXISTS employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_name VARCHAR(150) NOT NULL,
    phone_no VARCHAR(15),
    email VARCHAR(150),
    date_of_joining DATE,
    branch_id INT,
    salary DECIMAL(12,2),
    date_of_leaving DATE,
    role ENUM('MANAGER','ACCOUNTANT','OPERATOR','ADMIN','HELPER') NOT NULL,

    FOREIGN KEY (branch_id)
        REFERENCES branches(branch_id)
        ON DELETE SET NULL
);

-- ==============================
-- ADD MANAGER FK AFTER EMPLOYEE
-- ==============================
ALTER TABLE branches
ADD COLUMN manager_id INT,
ADD CONSTRAINT fk_branch_manager
FOREIGN KEY (manager_id)
REFERENCES employees(employee_id)
ON DELETE SET NULL;

-- ==============================
-- PARTIES (Consignor / Consignee)
-- ==============================
CREATE TABLE parties (
    party_id INT AUTO_INCREMENT PRIMARY KEY,
    branch_id INT,
    party_name VARCHAR(255) NOT NULL UNIQUE,
    address TEXT NOT NULL,
    gst_no VARCHAR(20) NOT NULL,
    contact_person VARCHAR(150),
    contact_number VARCHAR(15),

    FOREIGN KEY (branch_id)
        REFERENCES branches(branch_id)
        ON DELETE SET NULL
);

-- ==============================
-- VEHICLE SIZES (MASTER)
-- ==============================
CREATE TABLE vehicle_sizes (
    size_id INT AUTO_INCREMENT PRIMARY KEY,
    size_name VARCHAR(50) UNIQUE NOT NULL
);

-- ==============================
-- VEHICLES
-- ==============================
CREATE TABLE vehicles (
    vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
    lorry_no VARCHAR(50) UNIQUE NOT NULL,
    size_id INT,
    driver_name VARCHAR(150),
    driver_phone VARCHAR(15),

    FOREIGN KEY (size_id)
        REFERENCES vehicle_sizes(size_id)
        ON DELETE SET NULL
);

-- ==============================
-- PRODUCTS (MASTER)
-- ==============================
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) UNIQUE NOT NULL
    
);

-- ==============================
-- PARTY - PRODUCTS (Optional Mapping)
-- ==============================
CREATE TABLE party_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    party_id INT,
    product_id INT,

    UNIQUE (party_id, product_id),

    FOREIGN KEY (party_id)
        REFERENCES parties(party_id)
        ON DELETE CASCADE,

    FOREIGN KEY (product_id)
        REFERENCES products(product_id)
        ON DELETE CASCADE
);

-- ==============================
-- RATE MASTER
-- ==============================
CREATE TABLE rate_master (
    rate_id INT AUTO_INCREMENT PRIMARY KEY,
    party_id INT,
    source VARCHAR(150),
    destination VARCHAR(150),
    size_id INT,
    freight DECIMAL(12,2),

    FOREIGN KEY (party_id)
        REFERENCES parties(party_id)
        ON DELETE CASCADE,

    FOREIGN KEY (size_id)
        REFERENCES vehicle_sizes(size_id)
        ON DELETE SET NULL
);

-- ==============================
-- DOCKETS
-- ==============================
CREATE TABLE dockets (
    docket_no VARCHAR(50) PRIMARY KEY,
    branch_id INT,
    docket_date DATE,

    consignor_id INT,
    consignee_id INT,

    vehicle_id INT,

    source VARCHAR(150),
    destination VARCHAR(150),
    actual_weight DECIMAL(12,2),

    payment_mode ENUM('CASH','NEFT','RTGS','CHEQUE','TO_PAY','PAID'),

    billing_branch_id INT,
    gstin_payable_by ENUM('CONSIGNOR','CONSIGNEE'),

    remarks TEXT,

    FOREIGN KEY (branch_id)
        REFERENCES branches(branch_id)
        ON DELETE SET NULL,

    FOREIGN KEY (billing_branch_id)
        REFERENCES branches(branch_id)
        ON DELETE SET NULL,

    FOREIGN KEY (consignor_id)
        REFERENCES parties(party_id)
        ON DELETE SET NULL,

    FOREIGN KEY (consignee_id)
        REFERENCES parties(party_id)
        ON DELETE SET NULL,

    FOREIGN KEY (vehicle_id)
        REFERENCES vehicles(vehicle_id)
        ON DELETE SET NULL
);

-- ==============================
-- DOCKET ITEMS
-- ==============================
CREATE TABLE docket_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    docket_id VARCHAR(50),
    product_id INT,
    total_packages INT,
    packaging_method VARCHAR(100),
    declared_value DECIMAL(14,2),
    invoice_no VARCHAR(100),

    FOREIGN KEY (docket_id)
        REFERENCES dockets(docket_no)
        ON DELETE CASCADE,

    FOREIGN KEY (product_id)
        REFERENCES products(product_id)
        ON DELETE RESTRICT
);

-- ==============================
-- EWAY BILLS
-- ==============================
CREATE TABLE eway_bills (
    eway_id INT AUTO_INCREMENT PRIMARY KEY,
    docket_id VARCHAR(50),
    eway_bill_no VARCHAR(50),

    FOREIGN KEY (docket_id)
        REFERENCES dockets(docket_no)
        ON DELETE CASCADE
);

-- ==============================
-- COMPANY FREIGHT (INCOME)
-- ==============================
CREATE TABLE company_freight (
    id INT AUTO_INCREMENT PRIMARY KEY,
    docket_id VARCHAR(50),
    rate_id INT,

    freight DECIMAL(14,2),
    multipoint_pickup DECIMAL(14,2) DEFAULT 0,
    multipoint_delivery DECIMAL(14,2) DEFAULT 0,
    labour DECIMAL(14,2) DEFAULT 0,
    docket_charge DECIMAL(14,2) DEFAULT 0,
    other_charges DECIMAL(14,2) DEFAULT 0,
    subtotal DECIMAL(14,2),
    other_state_tax DECIMAL(14,2) DEFAULT 0,
    gst DECIMAL(14,2) DEFAULT 0,
    grand_total DECIMAL(14,2),

    payment_status ENUM('PENDING','RECEIVED') DEFAULT 'PENDING',

    FOREIGN KEY (docket_id)
        REFERENCES dockets(docket_no)
        ON DELETE CASCADE,

    FOREIGN KEY (rate_id)
        REFERENCES rate_master(rate_id)
        ON DELETE SET NULL
);

-- ==============================
-- DRIVER FREIGHT (EXPENSE)
-- ==============================
CREATE TABLE driver_freight (
    id INT AUTO_INCREMENT PRIMARY KEY,
    docket_id VARCHAR(50),

    freight DECIMAL(14,2),
    multipoint_pickup DECIMAL(14,2) DEFAULT 0,
    multipoint_delivery DECIMAL(14,2) DEFAULT 0,
    labour DECIMAL(14,2) DEFAULT 0,
    other_expense DECIMAL(14,2) DEFAULT 0,
    total_expense DECIMAL(14,2),

    FOREIGN KEY (docket_id)
        REFERENCES dockets(docket_no)
        ON DELETE CASCADE
);