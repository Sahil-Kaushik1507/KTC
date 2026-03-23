import { body } from "express-validator";

export const vehicleValidator = [

  // Lorry Number 
  body("lorry_no")
    .trim()
    .toUpperCase()
    .notEmpty()
    .withMessage("Vehicle number is required")
    .matches(/^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/)
    .withMessage("Invalid vehicle number format (e.g., HR38AB1234)"),
  

  //Size ID (Foreign Key)
  body("size_id")
    .optional({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("Size ID must be a positive integer")
    .toInt(),

  // Actual Weight
  body("actual_weight")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage("Weight must be a positive number")
    .toFloat(),

  // Driver Name
  body("driver_name")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 2, max: 150 })
    .withMessage("Driver name must be between 2 and 150 characters"),

  //Driver Phone
  body("driver_phone")
    .optional({ checkFalsy: true })
    .trim()
    .isMobilePhone("en-IN")
    .withMessage("Invalid Indian mobile number"),

];