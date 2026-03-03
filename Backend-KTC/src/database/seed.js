import { getPool } from "../config/db.js";

export const seedDatabase = async () => {
  try {
    console.log("Seeding ktc_db...");

    /* ======================================
       1️⃣ BRANCHES (No manager initially)
    ====================================== */
    await getPool().query(`
      INSERT INTO branches (branch_name, address)
      VALUES
        ('Pune Branch', 'Pune Industrial Area'),
        ('Kolkata Branch', 'Kolkata Transport Nagar')
      ON DUPLICATE KEY UPDATE branch_name = branch_name;
    `);

    /* ======================================
       2️⃣ EMPLOYEES
    ====================================== */
    await getPool().query(`
      INSERT INTO employees 
        (employee_name, phone_no, email, date_of_joining, branch_id, salary, role)
      VALUES
        ('Rahul Sharma', '9876543210', 'rahul@ktc.com', '2024-01-01', 1, 75000, 'ADMIN'),
        ('Amit Verma', '9123456780', 'amit@ktc.com', '2024-02-15', 1, 55000, 'MANAGER'),
        ('Suresh Gupta', '9988776655', 'suresh@ktc.com', '2024-03-01', 2, 45000, 'ACCOUNTANT'),
        ('Ramesh Yadav', '9012345678', 'ramesh@ktc.com', '2024-04-01', 2, 28000, 'OPERATOR'),
        ('Helper One', '9000000000', 'helper@ktc.com', '2024-05-01', 1, 18000, 'HELPER')
      ON DUPLICATE KEY UPDATE email = email;
    `);

    /* ======================================
       3️⃣ ASSIGN MANAGER TO BRANCH
    ====================================== */
    await getPool().query(`
      UPDATE branches
      SET manager_id = 2
      WHERE branch_name = 'Pune Branch';
    `);

    /* ======================================
       4️⃣ VEHICLE SIZES (MASTER)
    ====================================== */
    await getPool().query(`
      INSERT INTO vehicle_sizes (size_name)
      VALUES ('14FT'), ('17FT'), ('19FT'), ('22FT'), ('32FT')
      ON DUPLICATE KEY UPDATE size_name = size_name;
    `);

    /* ======================================
       5️⃣ VEHICLES
    ====================================== */
    await getPool().query(`
      INSERT INTO vehicles (lorry_no, size_id, driver_name, driver_phone, actual_weight)
      VALUES
        ('MH12AB1234', 1, 'Mahesh Yadav', '9876500001', 5000),
        ('WB34CD5678', 2, 'Rakesh Singh', '9123400002', 7000)
      ON DUPLICATE KEY UPDATE lorry_no = lorry_no;
    `);

    /* ======================================
       6️⃣ PRODUCTS (MASTER)
    ====================================== */
    await getPool().query(`
      INSERT INTO products (product_name)
      VALUES
        ('LED Lights'),
        ('Fans'),
        ('Mattress'),
        ('Raw Material')
      ON DUPLICATE KEY UPDATE product_name = product_name;
    `);

    /* ======================================
       7️⃣ PARTIES
    ====================================== */
    await getPool().query(`
      INSERT INTO parties 
        (branch_id, party_name, address, gst_no, contact_person, contact_number)
      VALUES
        (1, 'Halonix Pvt Ltd', 'Noida Industrial Area', '09AAACH1234F1Z2', 'Mr. Arjun', '9988001122'),
        (2, 'Varamuti Industries', 'Kolkata Warehouse Zone', '19AAACV5678K1Z5', 'Mr. Deepak', '8877003344')
      ON DUPLICATE KEY UPDATE party_name = party_name;
    `);

    /* ======================================
       8️⃣ PARTY - PRODUCTS (Regular Items)
    ====================================== */
    await getPool().query(`
      INSERT IGNORE INTO party_products (party_id, product_id)
      VALUES
        (1, 1),  -- Halonix → LED Lights
        (1, 2),  -- Halonix → Fans
        (2, 3);  -- Varamuti → Mattress
    `);

    /* ======================================
       9️⃣ RATE MASTER
    ====================================== */
    await getPool().query(`
      INSERT INTO rate_master (party_id, source, destination, size_id, freight)
      VALUES
        (1, 'Noida', 'Pune', 1, 12000),
        (2, 'Kolkata', 'Delhi', 2, 18000)
      ON DUPLICATE KEY UPDATE freight = VALUES(freight);
    `);

    /* ======================================
       🔟 DOCKETS + ITEMS + EWAY + FREIGHT
    ====================================== */
    // Docket 1
    await getPool().query(`
      INSERT INTO dockets 
        (docket_no, branch_id, docket_date, source, destination, vehicle_id, charged_weight, consignor_id, consignee_id, payment_mode, billing_branch_id, gstin_payable_by, remarks)
      VALUES 
        ('DKT001', 1, '2026-03-03', 'Noida', 'Pune', 1, 5200, 1, 2, 'CASH', 1, 'CONSIGNOR', 'Urgent delivery')
      ON DUPLICATE KEY UPDATE remarks = VALUES(remarks);
    `);

    // Docket Items for DKT001
    await getPool().query(`
      INSERT IGNORE INTO docket_items (docket_id, product_name, total_packages, packaging_method, declared_value)
      VALUES
        ('DKT001', 'LED Lights', 100, 'Box', 50000),
        ('DKT001', 'Fans', 50, 'Carton', 25000);
    `);

    // Eway Bill for DKT001
    await getPool().query(`
      INSERT IGNORE INTO eway_bills (docket_id, invoice_no, eway_bill_no)
      VALUES
        ('DKT001', 'INV1001', 'EWB1001');
    `);

    // Freight for DKT001
    await getPool().query(`
      INSERT IGNORE INTO freight (docket_id, rate_id, truck_freight, company_freight, multipoint_pickup, multipoint_delivery, labour, holding, docket_charge, other_charges, subtotal, gst, grand_total)
      VALUES
        ('DKT001', 1, 12000, 0, 0, 0, 500, 200, 100, 50, 12950, 1170, 14120);
    `);

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
    throw error;
  }
};