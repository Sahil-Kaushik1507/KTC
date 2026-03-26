import { body,param } from "express-validator";

export const ewayBillsValidator = [

    // 🔹 Docket Number (FK)
    body("docket_no")
        .trim()
        .toUpperCase()
        .notEmpty()
        .withMessage("Docket number is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("Invalid docket number"),

  // 🔹 Invoice Number
  body("invoice_no")
    .trim()
    .notEmpty()
    .withMessage("Invoice number is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Invoice number must be between 2 and 50 characters")
    .matches(/^[A-Za-z0-9\-\/]+$/)
    .withMessage("Invoice number contains invalid characters"),

  // 🔹 E-Way Bill Number
  body("eway_bill_no")
    .trim()
    .notEmpty()
    .withMessage("E-way bill number is required")
    .matches(/^[0-9]{12}$/)
    .withMessage("E-way bill must be a 12-digit number"),

]


export const getEwayBillsValidator=[

     param("docket_no")
        .trim()
        .toUpperCase()
        .notEmpty()
        .withMessage("Docket number is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("Invalid docket number"),

]