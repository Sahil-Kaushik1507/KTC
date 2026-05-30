-- ==============================
-- DATABASE (Optional)
-- ==============================
-- CREATE DATABASE IF NOT EXISTS ktc_db;
-- USE ktc_db;

-- ==============================
-- BRANCHES (without manager first)
-- ==============================
CREATE TABLE IF NOT EXISTS branches (
    branch_id INT AUTO_INCREMENT PRIMARY KEY,
    branch_name VARCHAR(150) NOT NULL UNIQUE,
    branch_code VARCHAR(3) NOT NULL UNIQUE,
    address TEXT
);

-- ==============================
-- userS
-- ==============================
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(150) NOT NULL,
    phone_no VARCHAR(15) UNIQUE,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    date_of_joining DATE,
    branch_id INT,
    salary DECIMAL(12,2),
    date_of_leaving DATE,
    role ENUM('MANAGER','ACCOUNTANT','OPERATOR','ADMIN','HELPER') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (branch_id)
        REFERENCES branches(branch_id)
        ON DELETE SET NULL
);

-- ==============================
-- Add manager_id to branches (after users)
-- ==============================
ALTER TABLE branches
ADD COLUMN  manager_id INT NULL UNIQUE,
ADD CONSTRAINT fk_branch_manager
FOREIGN KEY (manager_id)
REFERENCES users(user_id)
ON DELETE SET NULL;

-- ==============================
-- PARTIES (Consignor)
-- ==============================
CREATE TABLE IF NOT EXISTS consignor_parties (
    consignor_party_id INT AUTO_INCREMENT PRIMARY KEY,
    branch_id INT,
    consignor_party_name VARCHAR(255) NOT NULL ,
    consignor_party_code VARCHAR(15) NOT NULL UNIQUE,
    consignor_address TEXT NOT NULL,
    consignor_gst_no VARCHAR(20) NOT NULL UNIQUE,
    consignor_contact_person VARCHAR(150),
    consignor_contact_number VARCHAR(15),
    UNIQUE (consignor_party_name, branch_id),
    FOREIGN KEY (branch_id)
        REFERENCES branches(branch_id)
        ON DELETE SET NULL
);
-- ==============================
-- PARTIES (Consignee)
-- ==============================
CREATE TABLE IF NOT EXISTS consignee_parties (
    consignee_party_id INT AUTO_INCREMENT PRIMARY KEY,
    branch_id INT,
    consignee_party_name VARCHAR(255) NOT NULL ,
    consignee_address TEXT NOT NULL,
    consignee_gst_no VARCHAR(20) NOT NULL UNIQUE,
    consignee_contact_person VARCHAR(150),
    consignee_contact_number VARCHAR(15),
    UNIQUE (consignee_party_name, branch_id),
    FOREIGN KEY (branch_id)
        REFERENCES branches(branch_id)
        ON DELETE SET NULL
);

-- ==============================
-- SEQUENCE (Master)
-- ==============================
CREATE TABLE sequence_master (
    sequence_name VARCHAR(50) PRIMARY KEY,
    next_number INT NOT NULL
);


-- ==============================
-- PRODUCTS (MASTER)
-- ==============================
CREATE TABLE party_products (
    consignor_party_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    priority INT DEFAULT 0,
    PRIMARY KEY (consignor_party_id, product_name),
    FOREIGN KEY (consignor_party_id)
        REFERENCES consignor_parties(consignor_party_id)
        ON DELETE CASCADE
);


-- ==============================
-- VEHICLE SIZES (MASTER)
-- ==============================
CREATE TABLE IF NOT EXISTS vehicle_sizes (
    size_id INT AUTO_INCREMENT PRIMARY KEY,
    size_name VARCHAR(50) UNIQUE NOT NULL
);

-- ==============================
-- VEHICLES
-- ==============================
CREATE TABLE IF NOT EXISTS vehicles (
    vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
    lorry_no VARCHAR(50) UNIQUE NOT NULL,
    size_id INT,
    actual_weight DECIMAL(12,2),
    driver_name VARCHAR(150),
    driver_phone VARCHAR(15),
    FOREIGN KEY (size_id)
        REFERENCES vehicle_sizes(size_id)
        ON DELETE SET NULL
);
-- ==============================
-- RATE MASTER
-- ==============================
CREATE TABLE IF NOT EXISTS rate_master (
    rate_id INT AUTO_INCREMENT PRIMARY KEY,
    consignor_party_id INT,
    source VARCHAR(150),
    destination VARCHAR(150),
    size_id INT,
    freight DECIMAL(12,2),
    UNIQUE(consignor_party_id,source,destination,size_id),
    FOREIGN KEY (consignor_party_id)
        REFERENCES consignor_parties(consignor_party_id)
        ON DELETE CASCADE,
    FOREIGN KEY (size_id)
        REFERENCES vehicle_sizes(size_id)
        ON DELETE SET NULL
);

-- ==============================
-- DOCKETS
-- ==============================
CREATE TABLE IF NOT EXISTS dockets (
    docket_no VARCHAR(50) PRIMARY KEY,
    branch_id INT,
    docket_date DATE,
    source VARCHAR(150),
    destination VARCHAR(150),
    vehicle_id INT,
    charged_weight DECIMAL(12,2),
    consignor_id INT,
    consignee_id INT,
    payment_mode ENUM('CASH','NEFT','RTGS','CHEQUE','TO_PAY','PAID'),
    billing_branch_id INT,
    gstin_payable_by ENUM('CONSIGNOR','CONSIGNEE'),
    remarks TEXT,
    request_id VARCHAR(100) NOT NULL UNIQUE,
    FOREIGN KEY (branch_id)
        REFERENCES branches(branch_id)
        ON DELETE SET NULL,
    FOREIGN KEY (billing_branch_id)
        REFERENCES branches(branch_id)
        ON DELETE SET NULL,
    FOREIGN KEY (consignor_id)
        REFERENCES consignor_parties(consignor_party_id)
        ON DELETE SET NULL,
    FOREIGN KEY (consignee_id)
        REFERENCES consignee_parties(consignee_party_id)
        ON DELETE SET NULL,
    FOREIGN KEY (vehicle_id)
        REFERENCES vehicles(vehicle_id)
        ON DELETE SET NULL
);

-- ==============================
-- DOCKET ITEMS
-- ==============================
CREATE TABLE IF NOT EXISTS docket_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    docket_no VARCHAR(50),
    product_name VARCHAR(255),
    total_packages INT,
    packaging_method VARCHAR(100),
    declared_value DECIMAL(14,2),
    CONSTRAINT uq_docket_product UNIQUE(docket_no,product_name),
    FOREIGN KEY (docket_no)
        REFERENCES dockets(docket_no)
        ON DELETE CASCADE
);

-- ==============================
-- EWAY BILLS
-- ==============================
CREATE TABLE IF NOT EXISTS eway_bills (
    eway_id INT AUTO_INCREMENT PRIMARY KEY,
    docket_no VARCHAR(50),
    invoice_no VARCHAR(50),
    eway_bill_no VARCHAR(50),
    CONSTRAINT uq_docket_invoice UNIQUE (docket_no, invoice_no),
    CONSTRAINT uq_docket_eway UNIQUE (docket_no, eway_bill_no),
    CONSTRAINT uq_invoice_eway UNIQUE (invoice_no, eway_bill_no),

    FOREIGN KEY (docket_no)
        REFERENCES dockets(docket_no)
        ON DELETE CASCADE
);

-- ==============================
-- FREIGHT (INCOME)
-- ==============================
CREATE TABLE IF NOT EXISTS docket_frieght (
    id INT AUTO_INCREMENT PRIMARY KEY,
    docket_no VARCHAR(50) UNIQUE,
    truck_freight DECIMAL(14,2) NOT NULL,
    company_freight DECIMAL(14,2) NOT NULL,
    multipoint_pickup DECIMAL(14,2) DEFAULT 0,
    multipoint_delivery DECIMAL(14,2) DEFAULT 0,
    labour DECIMAL(14,2) DEFAULT 0,
    holding DECIMAL(14,2) DEFAULT 0,
    docket_charge DECIMAL(14,2) DEFAULT 0,
    other_charges DECIMAL(14,2) DEFAULT 0,
    subtotal DECIMAL(14,2),
    other_state_tax DECIMAL(14,2) DEFAULT 0,
    gst DECIMAL(14,2) DEFAULT 0,
    grand_total DECIMAL(14,2),
    payment_status ENUM('PENDING','RECEIVED') DEFAULT 'PENDING',
    FOREIGN KEY (docket_no)
        REFERENCES dockets(docket_no)
        ON DELETE CASCADE
);