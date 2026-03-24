import { body } from "express-validator";

export const newRateValidator = [

    body("party_name")
        .trim()
        .notEmpty()
        .withMessage("Party name is required")
        .isLength({ min: 2, max: 150 })
        .withMessage("Party name must be between 2 and 150 characters"),

  body("source")
    .trim()
    .notEmpty()
    .withMessage("Source is required")
    .isLength({ min: 2, max: 150 })
    .withMessage("Source must be between 2 and 150 characters"),

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

    body("size_name")
        .notEmpty()
        .withMessage("Vehicle Size is required")
        .toUpperCase(),


  // Freight (Most Important)
  body("freight")
    .notEmpty()
    .withMessage("Freight is required")
    .isFloat({ min: 0 })
    .withMessage("Freight must be a positive number")
    .toFloat(),


];

export const updateValidator = [

    body("party_name")
        .trim()
        .notEmpty()
        .withMessage("Party name is required")
        .isLength({ min: 2, max: 150 })
        .withMessage("Party name must be between 2 and 150 characters"),

  body("source")
    .trim()
    .notEmpty()
    .withMessage("Source is required")
    .isLength({ min: 2, max: 150 })
    .withMessage("Source must be between 2 and 150 characters"),

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

    body("size_name")
        .notEmpty()
        .withMessage("Vehicle Size is required")
        .toUpperCase(),


  // Freight (Most Important)
  body("freight")
    .notEmpty()
    .withMessage("Freight is required")
    .isFloat({ min: 0 })
    .withMessage("Freight must be a positive number")
    .toFloat(),


];