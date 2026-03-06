import { body } from "express-validator";

export const newPartyValidator = [

    body("branch_id")
        .notEmpty()
        .withMessage("Branch ID is required")
        .isInt({ min: 1 })
        .withMessage("Branch ID must be a positive integer")
        .toInt(),

    body("party_name")
        .trim()
        .notEmpty()
        .withMessage("Party name is required")
        .isLength({ min: 2, max: 150 })
        .withMessage("Party name must be between 2 and 150 characters"),

    body("address")
        .trim()
        .notEmpty()
        .withMessage("Address is required")
        .isLength({ max: 300 })
        .withMessage("Address cannot exceed 300 characters"),

    body("gst_no")
        .trim()
        .notEmpty()
        .withMessage("GST NO. is required")
        .toUpperCase()
        .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)
        .withMessage("Invalid GST number format"),

    body("contact_person")
        .trim()
        .notEmpty()
        .withMessage("Contact Person from party is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Contact person name must be between 2 and 100 characters"),

    body("contact_number")
        .trim()
        .notEmpty()
        .withMessage("Phone No. of Contact Person is required")
        .isMobilePhone("en-IN")
        .withMessage("Invalid Indian mobile number")
];