import { body } from "express-validator";

export const frieghtValidator = [

  // 🔹 Docket No (FK + UNIQUE)
  body("docket_no")
    .trim()
    .toUpperCase()
    .notEmpty()
    .withMessage("Docket number is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Invalid docket number"),

  // 🔹 Required Core Freight Fields
  body("truck_freight")
    .notEmpty()
    .withMessage("Truck freight is required")
    .isFloat({ min: 0 })
    .withMessage("Truck freight must be positive")
    .toFloat(),

  body("company_freight")
    .notEmpty()
    .withMessage("Company freight is required")
    .isFloat({ min: 0 })
    .withMessage("Company freight must be positive")
    .toFloat(),

  // 🔹 Optional Charges (default 0)
  body("multipoint_pickup")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage("Multipoint pickup must be positive")
    .toFloat(),

  body("multipoint_delivery")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 })
    .toFloat(),

  body("labour")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 })
    .toFloat(),

  body("holding")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 })
    .toFloat(),

  body("docket_charge")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 })
    .toFloat(),

  body("other_charges")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 })
    .toFloat(),

  // 🔹 Taxes
  body("other_state_tax")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 })
    .toFloat(),

  body("gst")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 })
    .toFloat(),

  // 🔹 Payment Status
  body("payment_status")
    .optional()
    .isIn(["PENDING", "RECEIVED"])
    .withMessage("Invalid payment status"),

  //  BUSINESS LOGIC VALIDATION (VERY IMPORTANT)

  body()
    .custom((_, { req }) => {

      const {
        truck_freight = 0,
        company_freight = 0,
        multipoint_pickup = 0,
        multipoint_delivery = 0,
        labour = 0,
        holding = 0,
        docket_charge = 0,
        other_charges = 0,
        other_state_tax = 0,
        gst = 0,
        subtotal,
        grand_total
      } = req.body;

      // 🔹 Calculate subtotal
      const calculatedSubtotal =
        Number(company_freight) +
        Number(multipoint_pickup) +
        Number(multipoint_delivery) +
        Number(labour) +
        Number(holding) +
        Number(docket_charge) +
        Number(other_charges);

      if (subtotal !== undefined && Number(subtotal) !== calculatedSubtotal) {
        throw new Error("Subtotal mismatch");
      }

      // 🔹 Calculate grand total
      const calculatedGrandTotal =
        calculatedSubtotal +
        Number(other_state_tax) +
        Number(gst);

      if (grand_total !== undefined && Number(grand_total) !== calculatedGrandTotal) {
        throw new Error("Grand total mismatch");
      }

      return true;
    })
];