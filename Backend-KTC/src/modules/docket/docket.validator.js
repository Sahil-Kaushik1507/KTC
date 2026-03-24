import { body, param } from "express-validator";

export const docketValidator = [

  // 🔹 Docket Number (Primary Key)
  body("docket_no")
    .trim()
    .toUpperCase()
    .notEmpty()
    .withMessage("Docket number is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Docket number must be between 3 and 50 characters"),

  // 🔹 Branch ID
  body("branch_id")
    .notEmpty()
    .withMessage("Branch ID is required")
    .isInt({ min: 1 })
    .withMessage("Branch ID must be a positive integer")
    .toInt(),

  // 🔹 Docket Date
  body("docket_date")
    .notEmpty()
    .withMessage("Docket date is required")
    .isDate()
    .withMessage("Invalid date format")
    .custom((value) => {
      const today = new Date();
      const inputDate = new Date(value);
      if (inputDate > today) {
        throw new Error("Docket date cannot be in the future");
      }
      return true;
    }),

  // 🔹 Source
  body("source")
    .trim()
    .notEmpty()
    .withMessage("Source is required")
    .isLength({ min: 2, max: 150 })
    .withMessage("Source must be between 2 and 150 characters"),

  // 🔹 Destination
  body("destination")
    .trim()
    .notEmpty()
    .withMessage("Destination is required")
    .isLength({ min: 2, max: 150 })
    .withMessage("Destination must be between 2 and 150 characters")
    .custom((value, { req }) => {
      if (value.toLowerCase() === req.body.source?.toLowerCase()) {
        throw new Error("Source and Destination cannot be same");
      }
      return true;
    }),

  // 🔹 Vehicle ID
  body("vehicle_id")
    .optional({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("Vehicle ID must be a positive integer")
    .toInt(),
  // .custom(async (value) => {
  //   const [rows] = await connectionPool.query(
  //     "SELECT vehicle_id FROM vehicles WHERE vehicle_id = ?",
  //     [value]
  //   );
  //   if (rows.length === 0) {
  //     throw new Error("Invalid Vehicle ID");
  //   }
  //   return true;
  // }),

  // 🔹 Charged Weight
  body("charged_weight")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage("Charged weight must be a positive number")
    .toFloat()
    .custom((value) => {
      if (value > 100000) {
        throw new Error("Weight seems unrealistic");
      }
      return true;
    }),

  // 🔹 Consignor ID
  body("consignor_id")
    .notEmpty()
    .withMessage("Consignor is required")
    .isInt({ min: 1 })
    .toInt(),
  // .custom(async (value) => {
  //   const [rows] = await connectionPool.query(
  //     "SELECT party_id FROM parties WHERE party_id = ?",
  //     [value]
  //   );
  //   if (rows.length === 0) {
  //     throw new Error("Invalid Consignor");
  //   }
  //   return true;
  // }),

  // 🔹 Consignee ID
  body("consignee_id")
    .notEmpty()
    .withMessage("Consignee is required")
    .isInt({ min: 1 })
    .toInt()
    // .custom(async (value) => {
    //   const [rows] = await connectionPool.query(
    //     "SELECT party_id FROM parties WHERE party_id = ?",
    //     [value]
    //   );
    //   if (rows.length === 0) {
    //     throw new Error("Invalid Consignee");
    //   }
    //   return true;
    // })
    .custom((value, { req }) => {
      if (value === req.body.consignor_id) {
        throw new Error("Consignor and Consignee cannot be same");
      }
      return true;
    }),

  // 🔹 Payment Mode
  body("payment_mode")
    .notEmpty()
    .withMessage("Payment mode is required")
    .isIn(["CASH", "NEFT", "RTGS", "CHEQUE", "TO_PAY", "PAID"])
    .withMessage("Invalid payment mode"),

  // 🔹 Billing Branch
  body("billing_branch_id")
    .optional({ checkFalsy: true })
    .isInt({ min: 1 })
    .toInt(),
  // .custom(async (value) => {
  //   const [rows] = await connectionPool.query(
  //     "SELECT branch_id FROM branches WHERE branch_id = ?",
  //     [value]
  //   );
  //   if (rows.length === 0) {
  //     throw new Error("Invalid Billing Branch");
  //   }
  //   return true;
  // }),

  // 🔹 GST Payable By
  body("gstin_payable_by")
    .optional({ checkFalsy: true })
    .isIn(["CONSIGNOR", "CONSIGNEE"])
    .withMessage("Invalid GST payable option"),

  // 🔹 Remarks
  body("remarks")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage("Remarks too long")
];


export const viewDocketValidator = [

  param("docket_no")
    .trim()
    .toUpperCase()
    .notEmpty()
    .withMessage("Docket number is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Docket number must be between 3 and 50 characters"),


];