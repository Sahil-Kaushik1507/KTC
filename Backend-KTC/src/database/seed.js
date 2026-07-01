import { getPool } from "../config/db.js";

export const seedDatabase = async () => {
  try {
    console.log("Seeding ktc_db with extensive testing data...");

    /* ======================================
       1️⃣ BRANCHES (12 entries)
    ====================================== */
    await getPool().query(`
      INSERT INTO branches (branch_name, branch_code, address)
      VALUES
        ('Pune', 'PUN', 'Pune Industrial Area, Sector 4, Maharashtra'),
        ('Kolkata', 'KOL', 'Kolkata Transport Nagar, NH6, West Bengal'),
        ('Haridwar', 'HDR', 'Haridwar Industrial Area, SIDCUL, Uttarakhand'),
        ('Delhi', 'DEL', 'Okhla Industrial Area Phase-III, New Delhi'),
        ('Mumbai', 'BOM', 'Andheri East Logistics Hub, Mumbai, Maharashtra'),
        ('Bengaluru', 'BLR', 'Whitefield Industrial Zone, Bengaluru, Karnataka'),
        ('Hyderabad', 'HYD', 'HITEC City Cargo Terminal, Hyderabad, Telangana'),
        ('Chennai', 'MAA', 'Guindy Industrial Estate, Chennai, Tamil Nadu'),
        ('Ahmedabad', 'AMD', 'GIDC Naroda Logistics Yard, Ahmedabad, Gujarat'),
        ('Indore', 'IND', 'Sanwer Road Sector C, Indore, Madhya Pradesh'),
        ('Jaipur', 'JAI', 'VKI Area Road No. 14, Jaipur, Rajasthan'),
        ('Patna', 'PAT', 'Transport Nagar Bypass Road, Patna, Bihar')
      ON DUPLICATE KEY UPDATE branch_name = branch_name;
    `);

    /* ======================================
       2️⃣ USERS (15 entries - password--> Password@123)
    ====================================== */
    await getPool().query(`
      INSERT INTO users (user_name, phone_no, email, password_hash, date_of_joining, branch_id, salary, role)
      VALUES
        ('Rahul Sharma', '9876543210', 'rahul@ktc.com', '$2b$10$gNh7owmMrRi2hKg/xyjHaejdf/X4QKU/XEo545.DatoauKsgVJlW6', '2024-01-01', 1, 75000, 'ADMIN'),
        ('Amit Verma', '9123456780', 'amit@ktc.com', '$2b$10$gNh7owmMrRi2hKg/xyjHaejdf/X4QKU/XEo545.DatoauKsgVJlW6', '2024-02-15', 1, 55000, 'MANAGER'),
        ('Suresh Gupta', '9988776655', 'suresh@ktc.com', '$2b$10$gNh7owmMrRi2hKg/xyjHaejdf/X4QKU/XEo545.DatoauKsgVJlW6', '2024-03-01', 2, 45000, 'ACCOUNTANT'),
        ('Ramesh Yadav', '9012345678', 'ramesh@ktc.com', '$2b$10$gNh7owmMrRi2hKg/xyjHaejdf/X4QKU/XEo545.DatoauKsgVJlW6', '2024-04-01', 2, 28000, 'OPERATOR'),
        ('Helper One', '9000000000', 'helper1@ktc.com', '$2b$10$gNh7owmMrRi2hKg/xyjHaejdf/X4QKU/XEo545.DatoauKsgVJlW6', '2024-05-01', 1, 18000, 'HELPER'),
        ('Vikram Singh', '9823456781', 'vikram@ktc.com', '$2b$10$gNh7owmMrRi2hKg/xyjHaejdf/X4QKU/XEo545.DatoauKsgVJlW6', '2024-06-10', 3, 56000, 'MANAGER'),
        ('Neha Joshi', '9543216782', 'neha@ktc.com', '$2b$10$gNh7owmMrRi2hKg/xyjHaejdf/X4QKU/XEo545.DatoauKsgVJlW6', '2024-07-01', 4, 58000, 'MANAGER'),
        ('Kiran Reddy', '9701234569', 'kiran@ktc.com', '$2b$10$gNh7owmMrRi2hKg/xyjHaejdf/X4QKU/XEo545.DatoauKsgVJlW6', '2024-08-12', 7, 54000, 'MANAGER'),
        ('Anand Verma', '9109876541', 'anand@ktc.com', '$2b$10$gNh7owmMrRi2hKg/xyjHaejdf/X4QKU/XEo545.DatoauKsgVJlW6', '2024-09-15', 10, 53000, 'MANAGER'),
        ('Rajesh Shah', '9543210982', 'rajesh@ktc.com', '$2b$10$gNh7owmMrRi2hKg/xyjHaejdf/X4QKU/XEo545.DatoauKsgVJlW6', '2024-10-01', 9, 46000, 'ACCOUNTANT'),
        ('Priya Nair', '9123456782', 'priya@ktc.com', '$2b$10$gNh7owmMrRi2hKg/xyjHaejdf/X4QKU/XEo545.DatoauKsgVJlW6', '2024-11-20', 5, 47000, 'ACCOUNTANT'),
        ('Sanjay Dutt', '9321098761', 'sanjay@ktc.com', '$2b$10$gNh7owmMrRi2hKg/xyjHaejdf/X4QKU/XEo545.DatoauKsgVJlW6', '2024-12-05', 4, 29000, 'OPERATOR'),
        ('Arjun Mehta', '9988001121', 'arjun@ktc.com', '$2b$10$gNh7owmMrRi2hKg/xyjHaejdf/X4QKU/XEo545.DatoauKsgVJlW6', '2025-01-10', 6, 30000, 'OPERATOR'),
        ('Deepak Kumar', '8877003341', 'deepak@ktc.com', '$2b$10$gNh7owmMrRi2hKg/xyjHaejdf/X4QKU/XEo545.DatoauKsgVJlW6', '2025-02-01', 8, 28500, 'OPERATOR'),
        ('Helper Two', '9111111111', 'helper2@ktc.com', '$2b$10$gNh7owmMrRi2hKg/xyjHaejdf/X4QKU/XEo545.DatoauKsgVJlW6', '2025-02-15', 2, 18500, 'HELPER')
      ON DUPLICATE KEY UPDATE email = email;
    `);

    /* ======================================
       3️⃣ ASSIGN MANAGERS TO BRANCHES
    ====================================== */
    await getPool().query(`UPDATE branches SET manager_id = 2 WHERE branch_name = 'Pune';`);
    await getPool().query(`UPDATE branches SET manager_id = 3 WHERE branch_name = 'Kolkata';`);
    await getPool().query(`UPDATE branches SET manager_id = 6 WHERE branch_name = 'Haridwar';`);
    await getPool().query(`UPDATE branches SET manager_id = 7 WHERE branch_name = 'Delhi';`);
    await getPool().query(`UPDATE branches SET manager_id = 8 WHERE branch_name = 'Hyderabad';`);
    await getPool().query(`UPDATE branches SET manager_id = 9 WHERE branch_name = 'Indore';`);

    /* ======================================
       4️⃣ SEQUENCE MASTER (12 entries)
    ====================================== */
    await getPool().query(`
      INSERT INTO sequence_master (sequence_name, next_number)
      VALUES 
        ('PTY-KOL', 101), ('DKT-KOL-2026', 25), 
        ('PTY-PUN', 51), ('DKT-PUN-2026', 12),
        ('PTY-HDR', 40), ('DKT-HDR-2026', 8),
        ('PTY-DEL', 200), ('DKT-DEL-2026', 95),
        ('PTY-BOM', 150), ('DKT-BOM-2026', 60),
        ('PTY-BLR', 85), ('DKT-BLR-2026', 14)
      ON DUPLICATE KEY UPDATE next_number = VALUES(next_number);
    `);

    /* ======================================
       5️⃣ VEHICLE SIZES (10 entries)
    ====================================== */
    await getPool().query(`
      INSERT INTO vehicle_sizes (size_name)
      VALUES 
        ('14FT'), ('17FT'), ('19FT'), ('22FT'), ('32FT Single Axle'), 
        ('32FT Multi Axle'), ('40FT Trailer'), ('20FT Container'), 
        ('40FT Container'), ('Chhota Hathi / Pickup')
      ON DUPLICATE KEY UPDATE size_name = size_name;
    `);

    /* ======================================
       6️⃣ VEHICLES (12 entries)
    ====================================== */
    await getPool().query(`
      INSERT INTO vehicles (truck_no, size_id, driver_name, driver_phone, actual_weight)
      VALUES
        ('MH-12-AB-1234', 1, 'Mahesh Yadav', '9876500001', 5000),
        ('WB-34-CD-5678', 2, 'Rakesh Singh', '9123400002', 7000),
        ('DL-01-EF-9012', 4, 'Sukhwinder Singh', '9988112233', 9500),
        ('HR-55-GH-3456', 5, 'Satnam Singh', '9812344321', 14000),
        ('MH-04-IJ-7890', 3, 'Ganesh Gaitonde', '9004561230', 8200),
        ('KA-03-KL-1122', 6, 'Manjunath Hegde', '9448012345', 16000),
        ('TS-07-MN-4455', 8, 'Venkat Reddy', '9704567891', 11000),
        ('TN-01-OP-6677', 9, 'Muthu Krishnan', '9600123456', 22000),
        ('GJ-01-QR-8899', 7, 'Hardik Patel', '9825012345', 25000),
        ('MP-09-ST-2233', 2, 'Shivraj Chouhan', '9425098765', 7200),
        ('RJ-14-UV-4455', 5, 'Ram Charan Mina', '9414012345', 13800),
        ('BR-01-WX-6677', 10, 'Lalu Prasad Yadav', '9304012345', 2500)
      ON DUPLICATE KEY UPDATE truck_no = truck_no;
    `);

    /* ======================================
       7️⃣ CONSIGNOR PARTIES (12 entries)
    ====================================== */
    await getPool().query(`
      INSERT INTO consignor_parties 
        (branch_id, consignor_party_name, consignor_party_code, consignor_address, consignor_gst_no, consignor_contact_person, consignor_contact_number)
      VALUES
        (1, 'Halonix Pvt Ltd', 'PTY_KOL_0201', 'Noida Industrial Area, Sec 62, Delhi NCR', '09AAACH1234F1Z2', 'Mr. Arjun', '9988001122'),
        (2, 'Varamuti Industries', 'PTY_PUN_0301', 'Kolkata Warehouse Zone, Gate No 3', '19AAACV5678K1Z5', 'Mr. Deepak', '8877003344'),  
        (4, 'Apex Logistics & Trading', 'PTY_DEL_0101', 'Okhla Phase III, New Delhi', '07AAAAA1111A1Z1', 'Mr. Rohan Sharma', '9876543210'),
        (5, 'Bluestar Manufacturing', 'PTY_BOM_0102', 'Andheri East, Mumbai', '27BBBBB2222B2Z2', 'Ms. Priya Nair', '9123456789'),
        (6, 'Zenith Electronics', 'PTY_BLR_0103', 'Whitefield, Bengaluru', '29CCCCC3333C3Z3', 'Mr. Amit Patel', '9812345678'),
        (7, 'Matrix Pharma Solutions', 'PTY_HYD_0104', 'HITEC City, Hyderabad', '36DDDDD4444D4Z4', 'Dr. Kiran Reddy', '9701234567'),
        (8, 'Falcon FMCG Corp', 'PTY_MAA_0105', 'Guindy Industrial Estate, Chennai', '33EEEEE5555E5Z5', 'Mr. S. Kumar', '9689543210'),
        (9, 'Omega Textile Mills', 'PTY_AMD_0106', 'GIDC Naroda, Ahmedabad', '24FFFFF6666F6Z6', 'Mr. Rajesh Shah', '9543210987'),
        (1, 'Pioneer Auto Components', 'PTY_PUN_0107', 'Chakan Industrial Area, Pune', '27GGGGG7777G7Z7', 'Ms. Neha Joshi', '9432109876'),
        (2, 'Horizon Paper Products', 'PTY_KOL_0108', 'Salt Lake Sector V, Kolkata', '19HHHHH8888H8Z8', 'Mr. Subhash Das', '9321098765'),
        (3, 'Quantum Chemical Ltd', 'PTY_BRD_0109', 'Anand Industrial Zone, Vadodara', '24IIIII9999I9Z9', 'Mr. Vijay Mehta', '9210987654'),
        (10, 'Vanguard Engineering', 'PTY_IND_0110', 'Sanwer Road, Indore', '23JJJJJ0000J0Z0', 'Mr. Anand Verma', '9109876543')
      ON DUPLICATE KEY UPDATE consignor_party_name = consignor_party_name;
    `);

    /* ======================================
       8️⃣ CONSIGNEE PARTIES (12 entries)
    ====================================== */
    await getPool().query(`
      INSERT INTO consignee_parties 
        (branch_id, consignee_party_name, consignee_address, consignee_gst_no, consignee_contact_person, consignee_contact_number)
      VALUES
        (1, 'Hawa Pvt Ltd', 'Noida Industrial Area, Block C', '09AAACH1234F1Z2', 'Mr. Arjun', '9988001122'),
        (2, 'Vara Industries', 'Kolkata Warehouse Zone, Complex B', '19AAACV5678K1Z5', 'Mr. Deepak', '8877003344'),
        (4, 'Delphi Auto Distributors', 'Automobile Market, Karol Bagh, Delhi', '07AABBD1122C1Z0', 'Mr. Jagdish Singh', '9811223344'),
        (5, 'Mumbai Engineering Mart', 'Vasai East Industrial Estate, Mumbai', '27CCDDD3344E1Z1', 'Mr. Nitin Desai', '9022334455'),
        (6, 'Bangalore Tech Retailers', 'SP Road, Cross Complex, Bengaluru', '29EFEGH5566F1Z2', 'Mr. Venkatesh', '9444556677'),
        (7, 'Nizam Pharma Distributors', 'Koti Medical Market, Hyderabad', '36GGHHI7788H1Z3', 'Mr. Ali Khan', '9700112233'),
        (8, 'Madras Provisions Ltd', 'Koyambedu Wholesale Hub, Chennai', '33IIJJK9900J1Z4', 'Mr. Ramakrishnan', '9600778899'),
        (9, 'Gujarat Enterprise Corp', 'Aslali Logistics Park, Ahmedabad', '24KKLLM1122K1Z5', 'Mr. Praful Patel', '9824011223'),
        (1, 'Western Auto Spares', 'Nana Peth Automotive Zone, Pune', '27MMNNO3344M1Z6', 'Mr. Vivek Tapkir', '9422012345'),
        (2, 'Eastern India Print House', 'Burrabazar Trading St, Kolkata', '19OOPPQ5566P1Z7', 'Mr. P. K. Ghosh', '9331012345'),
        (3, 'Himalayan Traders', 'SIDCUL Sector 2 Plot 4, Haridwar', '05QQRRS7788Q1Z8', 'Mr. Harish Rawat', '9412012345'),
        (10, 'Malwa Tools & Machinery', 'Loha Mandi Road, Indore', '23SSTTU9900S1Z9', 'Mr. Suresh Patidar', '9425012345')
      ON DUPLICATE KEY UPDATE consignee_party_name = consignee_party_name;
    `);

    /* ======================================
       9️⃣ PARTY - PRODUCTS (48 entries mapped correctly)
    ====================================== */
    await getPool().query(`
      INSERT INTO party_products (consignor_party_id, product_name, priority)
      VALUES
        (1, 'Steel Rods', 1), (1, 'Iron Sheets', 2), (1, 'Copper Wires', 3), (1, 'Aluminum Strips', 4),
        (2, 'Cement Bags', 1), (2, 'Concrete Blocks', 2), (2, 'Flyash Bricks', 3), (2, 'Gypsum Boards', 4),
        (3, 'Industrial Safety Gloves', 1), (3, 'Cardboard Packaging Boxes', 2), (3, 'Stretch Wrap Rolls', 3), (3, 'Heavy Duty Nylon Ropes', 4),
        (4, 'Aluminum Channels', 1), (4, 'Stainless Steel Bolts', 2), (4, 'Brass Washers', 3), (4, 'Metal Welding Rods', 4),
        (5, 'LED Display Panels', 1), (5, 'Microcontroller Chips', 2), (5, 'Copper Heat Sinks', 3), (5, 'Lithium-Ion Batteries', 4),
        (6, 'Paracetamol Raw Powder', 1), (6, 'Sterile Glass Vials', 2), (6, 'Surgical Face Masks', 3), (6, 'Antiseptic Liquid Concentrates', 4),
        (7, 'Refined Sunflower Oil', 1), (7, 'Packaged Wheat Flour', 2), (7, 'Organic Tea Leaves', 3), (7, 'Detergent Powder Bags', 4),
        (8, 'Cotton Yarn Spools', 1), (8, 'Polyester Fabric Rolls', 2), (8, 'Denim Cloth Material', 3), (8, 'Industrial Sewing Thread', 4),
        (9, 'Brake Pad Assemblies', 1), (9, 'Spark Plug Sets', 2), (9, 'Rubber Engine Mounts', 3), (9, 'Oil Filter Cartridges', 4),
        (10, 'Kraft Paper Rolls', 1), (10, 'A4 Copy Paper Reams', 2), (10, 'Corrugated Sheet Boards', 3), (10, 'Duplex Board Cartons', 4),
        (11, 'Industrial Grade Ethanol', 1), (11, 'Caustic Soda Flakes', 2), (11, 'Liquid Sulphuric Acid', 3), (11, 'Hydrogen Peroxide Drums', 4),
        (12, 'Pneumatic Drill Machines', 1), (12, 'Hydraulic Jack Cylinders', 2), (12, 'High-Torque Impact Wrenches', 3), (12, 'Carbon Steel Saw Blades', 4)
      ON DUPLICATE KEY UPDATE product_name = product_name;
    `);

    /* ======================================
       🔟 RATE MASTER (15 entries)
    ====================================== */
    await getPool().query(`
      INSERT INTO rate_master (consignor_party_id, source, destination, size_id, freight)
      VALUES
        (1, 'Noida', 'Pune', 1, 12000),
        (2, 'Kolkata', 'Delhi', 2, 18000),
        (3, 'Delhi', 'Mumbai', 4, 32000),
        (4, 'Mumbai', 'Bengaluru', 3, 24000),
        (5, 'Bengaluru', 'Hyderabad', 6, 21000),
        (6, 'Hyderabad', 'Chennai', 8, 16000),
        (7, 'Chennai', 'Ahmedabad', 9, 45000),
        (8, 'Ahmedabad', 'Indore', 2, 14000),
        (9, 'Pune', 'Jaipur', 5, 29000),
        (10, 'Kolkata', 'Patna', 10, 9000),
        (11, 'Vadodara', 'Haridwar', 7, 38000),
        (12, 'Indore', 'Delhi', 2, 16500),
        (1, 'Noida', 'Kolkata', 5, 27000),
        (3, 'Delhi', 'Haridwar', 10, 8500),
        (4, 'Mumbai', 'Pune', 1, 6000)
      ON DUPLICATE KEY UPDATE freight = VALUES(freight);
    `);

    /* ======================================
       1️⃣1️⃣ DOCKETS (10 fully relational entries)
    ====================================== */
    await getPool().query(`
      INSERT INTO dockets 
        (docket_no, branch_id, docket_date, source, destination, vehicle_id, charged_weight, seal_no, consignor_id, consignee_id, payment_mode, billing_branch_id, gstin_payable_by, remarks, request_id)
      VALUES 
        ('HDR-2026-000001', 1, '2026-03-03', 'Noida', 'Pune', 1, 5200,'KTC-1', 1, 1, 'CASH', 1, 'CONSIGNOR', 'Urgent delivery', '3f50c8a2-1b6a-4d9e-9c2a-7f8b2a1e6d45'),
        ('KOL-2026-000002', 2, '2026-03-04', 'Kolkata', 'Delhi', 2, 7100,'KTC-2', 2, 2, 'CHEQUE', 2, 'CONSIGNEE', 'Handle with care', '4a60c8a2-1b6a-4d9e-9c2a-7f8b2a1e6d46'),
        ('DEL-2026-000003', 4, '2026-03-05', 'Delhi', 'Mumbai', 3, 9800,'KTC-3', 3, 3, 'TO BE BILLED', 4, 'CONSIGNOR', 'Industrial stock delivery', '5b70c8a2-1b6a-4d9e-9c2a-7f8b2a1e6d47'),
        ('BOM-2026-000004', 5, '2026-03-05', 'Mumbai', 'Bengaluru', 5, 8300,'KTC-1', 4, 4, 'TO PAY', 5, 'CONSIGNOR', 'Standard dispatch', '6c80c8a2-1b6a-4d9e-9c2a-7f8b2a1e6d48'),
        ('BLR-2026-000005', 6, '2026-03-06', 'Bengaluru', 'Hyderabad', 6, 15500,'KTC-1', 5, 5, 'NEFT', 6, 'CONSIGNEE', 'Electronics consignment', '7d90c8a2-1b6a-4d9e-9c2a-7f8b2a1e6d49'),
        ('HYD-2026-000006', 7, '2026-03-06', 'Hyderabad', 'Chennai', 7, 11200,'KTC-5', 6, 6, 'CASH', 7, 'CONSIGNOR', 'Pharma cool cargo', '8e00c8a2-1b6a-4d9e-9c2a-7f8b2a1e6d50'),
        ('MAA-2026-000007', 8, '2026-03-07', 'Chennai', 'Ahmedabad', 8, 21800,'KTC-1', 7, 7, 'RTGS', 8, 'CONSIGNOR', 'FMCG priority supply', '9f10c8a2-1b6a-4d9e-9c2a-7f8b2a1e6d51'),
        ('AMD-2026-000008', 9, '2026-03-07', 'Ahmedabad', 'Indore', 9, 24500,'KTC-1', 8, 8, 'CHEQUE', 9, 'CONSIGNEE', 'Textile material raw', '0a20c8a2-1b6a-4d9e-9c2a-7f8b2a1e6d52'),
        ('PUN-2026-000009', 1, '2026-03-08', 'Pune', 'Jaipur', 1, 5100,'KTC-8', 9, 9, 'CASH', 1, 'CONSIGNOR', 'Auto parts cluster', '1b30c8a2-1b6a-4d9e-9c2a-7f8b2a1e6d53'),
        ('IND-2026-000010', 10, '2026-03-08', 'Indore', 'Delhi', 10, 7300,'KTC-1', 12, 12, 'TO BE BILLED', 10, 'CONSIGNEE', 'Engineering tools batch', '2c40c8a2-1b6a-4d9e-9c2a-7f8b2a1e6d54')
      ON DUPLICATE KEY UPDATE remarks = VALUES(remarks);
    `);

    /* ======================================
       1️⃣2️⃣ DOCKET ITEMS (15 entries)
    ====================================== */
    await getPool().query(`
      INSERT IGNORE INTO docket_items (docket_no, product_name, total_packages, packaging_method, declared_value)
      VALUES
        ('HDR-2026-000001', 'LED Lights', 100, 'Box', 50000),
        ('HDR-2026-000001', 'Fans', 50, 'Carton', 25000),
        ('KOL-2026-000002', 'Cement Bags Grade A', 200, 'PP Bag', 80000),
        ('DEL-2026-000003', 'Industrial Safety Gloves', 500, 'Box', 150000),
        ('DEL-2026-000003', 'Stretch Wrap Rolls', 40, 'Pallet', 60000),
        ('BOM-2026-000004', 'Aluminum Channels', 120, 'Bundle', 220000),
        ('BLR-2026-000005', 'LED Display Panels', 30, 'Crate', 450000),
        ('BLR-2026-000005', 'Microcontroller Chips', 5, 'Anti-Static Box', 950000),
        ('HYD-2026-000006', 'Paracetamol Raw Powder', 80, 'Drum', 380000),
        ('MAA-2026-000007', 'Refined Sunflower Oil', 600, 'Tin Case', 720000),
        ('MAA-2026-000007', 'Packaged Wheat Flour', 400, 'PP Bag', 180000),
        ('AMD-2026-000008', 'Cotton Yarn Spools', 150, 'Bag', 310000),
        ('AMD-2026-000008', 'Polyester Fabric Rolls', 80, 'Roll', 420000),
        ('PUN-2026-000009', 'Brake Pad Assemblies', 250, 'Box', 280000),
        ('IND-2026-000010', 'Pneumatic Drill Machines', 45, 'Wooden Case', 540000);
    `);

    /* ======================================
       1️⃣3️⃣ EWAY BILLS (10 entries)
    ====================================== */
    await getPool().query(`
      INSERT IGNORE INTO eway_bills (docket_no, invoice_no, eway_bill_no)
      VALUES
        ('HDR-2026-000001', 'INV-1001', 'EWB-2026-0301'),
        ('KOL-2026-000002', 'INV-8891', 'EWB-2026-0302'),
        ('DEL-2026-000003', 'INV-4512', 'EWB-2026-0303'),
        ('BOM-2026-000004', 'INV-2041', 'EWB-2026-0304'),
        ('BLR-2026-000005', 'INV-7732', 'EWB-2026-0305'),
        ('HYD-2026-000006', 'INV-1109', 'EWB-2026-0306'),
        ('MAA-2026-000007', 'INV-5541', 'EWB-2026-0307'),
        ('AMD-2026-000008', 'INV-9023', 'EWB-2026-0308'),
        ('PUN-2026-000009', 'INV-3145', 'EWB-2026-0309'),
        ('IND-2026-000010', 'INV-6721', 'EWB-2026-0310');
    `);


    /* ======================================
       1️⃣4️⃣ DOCKET TRUCK FREIGHT (10 entries)
    ====================================== */
    await getPool().query(`
      INSERT INTO truck_freight (
    docket_no, freightamt, advance, balance, 
    labour, holding, multipoint_pickup, multipoint_delivery, 
    other_charges, grand_total
      ) VALUES
      ('HDR-2026-000001', 45000.00, 20000.00, 25000.00,  1200.00, 0.00, 1500.00, 0.00, 300.00, 48500.00),
      ('KOL-2026-000002', 55000.00, 30000.00, 25000.00,  2000.00, 0.00, 0.00, 0.00, 500.00, 58250.00),
      ('DEL-2026-000003', 28000.00, 10000.00, 18000.00,  0.00, 0.00, 1000.00, 1000.00, 200.00, 30700.00),
      ('BOM-2026-000004', 62000.00, 40000.00, 22000.00, 2500.00, 1500.00, 2000.00, 1500.00, 1000.00, 71500.00),
      ('BLR-2026-000005', 48000.00, 25000.00, 23000.00, 1500.00, 0.00, 0.00, 800.00, 0.00, 50300.00),
      ('HYD-2026-000006', 39000.00, 19000.00, 20000.00,  1100.00, 800.00, 1200.00, 0.00, 400.00, 43000.00),
      ('MAA-2026-000007', 51000.00, 26000.00, 25000.00,  1800.00, 0.00, 0.00, 1100.00, 0.00, 54650.00),
      ('AMD-2026-000008', 34000.00, 15000.00, 19000.00, 900.00, 500.00, 1000.00, 1000.00, 100.00, 37500.00),
      ('PUN-2026-000009', 32000.00, 15000.00, 17000.00, 800.00, 1000.00, 0.00, 1200.00, 0.00, 35000.00),
      ('IND-2026-000010', 25000.00, 10000.00, 15000.00, 500.00, 0.00, 0.00, 0.00, 0.00, 25500.00);
    `);


    /* ======================================
       1️⃣4️⃣ DOCKET COMPANY FREIGHT (10 entries)
    ====================================== */
    await getPool().query(`
      INSERT INTO party_freight (
    docket_no, freightamt, labour, holding, 
    multipoint_pickup, multipoint_delivery, docket_charge, green_tax,
    other_charges, gst_remark, gst_amt, 
    other_state_tax_remark, other_state_tax_amt, grand_total
      ) VALUES
      ('HDR-2026-000001', 52000.00, 1500.00, 0.00, 1800.00, 0.00, 150.00, 200.00, 500.00, '5% GST Standard', 2797.50, 'No Border Tax', 0.00, 58747.50),
      ('PUN-2026-000009', 38000.00, 1000.00, 1500.00, 0.00, 1500.00, 150.00, 200.00, 0.00, '5% GST Standard', 2107.50, 'No Border Tax', 0.00, 44257.50),
      ('KOL-2026-000002', 64000.00, 2500.00, 0.00, 0.00, 0.00, 150.00, 200.00, 800.00, '5% GST Standard', 3372.50, 'WB Entry Tax Flat', 500.00, 71322.50),
      ('DEL-2026-000003', 34000.00, 0.00, 0.00, 1200.00, 1200.00, 150.00, 200.00, 300.00, '5% GST Standard', 1842.50, 'No Border Tax', 0.00, 38692.50),
      ('BOM-2026-000004', 73000.00, 3000.00, 2000.00, 2500.00, 1800.00, 150.00, 200.00, 1200.00, '5% GST Standard', 4182.50, 'MH Local Body Tax', 800.00, 88632.50),
      ('BLR-2026-000005', 56000.00, 2000.00, 0.00, 0.00, 1000.00, 150.00, 200.00, 0.00, '5% GST Standard', 2957.50, 'No Border Tax', 0.00, 62107.50),
      ('HYD-2026-000006', 46000.00, 1400.00, 1200.00, 1500.00, 0.00, 150.00, 200.00, 600.00, '5% GST Standard', 2542.50, 'No Border Tax', 0.00, 53392.50),
      ('MAA-2026-000007', 60000.00, 2200.00, 0.00, 0.00, 1400.00, 150.00, 200.00, 0.00, '5% GST Standard', 3187.50, 'TN Green Cess', 600.00, 67537.50),
      ('AMD-2026-000008', 40000.00, 1200.00, 800.00, 1200.00, 1200.00, 150.00, 200.00, 200.00, '5% GST Standard', 2237.50, 'No Border Tax', 0.00, 46987.50),
      ('IND-2026-000010', 30000.00, 800.00, 0.00, 0.00, 0.00, 150.00, 200.00, 0.00, '5% GST Standard', 1547.50, 'No Border Tax', 0.00, 32497.50);
    `);
    
    console.log("Database seeded successfully with a robust testing payload!");
  } catch (error) {
    console.error("Critical: Database seeding pipeline crashed!", error);
    throw error;
  }
};