import { body } from "express-validator";

export const itemValidator = [

    // 🔹 Docket Number (FK)
    body("docket_no")
        .trim()
        .toUpperCase()
        .notEmpty()
        .withMessage("Docket number is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("Invalid docket number"),

    // 🔹 Product Name
    body("product_name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required")
        .isLength({ min: 2, max: 255 })
        .withMessage("Product name must be between 2 and 255 characters"),

    // 🔹 Total Packages
    body("total_packages")
        .notEmpty()
        .withMessage("Total packages is required")
        .isInt({ min: 1 })
        .withMessage("Total packages must be a positive integer")
        .toInt(),

    // 🔹 Packaging Method
    body("packaging_method")
        .trim()
        .notEmpty()
        .withMessage("Packaging Method is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Packaging method must be between 2 and 100 characters"),

    // 🔹 Declared Value
    body("declared_value")
        .notEmpty()
        .withMessage("Declared value is required")
        .isFloat({ min: 0 })
        .withMessage("Declared value must be a positive number")
        .toFloat()
        .custom((value) => {
            if (value > 100000000) { // 10 crore safety limit
                throw new Error("Declared value too large");
            }
            return true;
        }),

    
]