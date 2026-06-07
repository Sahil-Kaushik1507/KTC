import { z } from "zod";


// Helper to check for a maximum of 2 decimal places
const decimalTwoPlaces = (val) => {
  const parts = val.toString().split(".");
  return !parts[1] || parts[1].length <= 2;
};

// Helper to convert empty strings ("") or null values into 0
const preprocessDefaultZero = (val) => {
  if (val === "" || val === null || val === undefined) return 0;
  return Number(val);
};

export const partyFreightSchema = z
  .object({
    // Required fields (NOT NULL in Database)
    freightamt: z.coerce
      .number({ required_error: "Freight is required", invalid_type_error: "Must be a number" })
      .nonnegative("Freight cannot be negative")
      .max(999999999999.99, "Value exceeds max allowed for DECIMAL(14,2)")
      .refine(decimalTwoPlaces, "Cannot exceed 2 decimal places"),

    // Optional / Default 0 fields

    labour: z
      .preprocess(preprocessDefaultZero, z.number("Must be a number"))
      .pipe(z.number().nonnegative().refine(decimalTwoPlaces, "Cannot exceed 2 decimal places")),

    holding: z
      .preprocess(preprocessDefaultZero, z.number("Must be a number"))
      .pipe(z.number().nonnegative().refine(decimalTwoPlaces, "Cannot exceed 2 decimal places")),

    multipoint_pickup: z
      .preprocess(preprocessDefaultZero, z.number("Must be a number"))
      .pipe(z.number().nonnegative().refine(decimalTwoPlaces, "Cannot exceed 2 decimal places")),

    multipoint_delivery: z
      .preprocess(preprocessDefaultZero, z.number("Must be a number"))
      .pipe(z.number().nonnegative().refine(decimalTwoPlaces, "Cannot exceed 2 decimal places")),

    docket_charge: z
      .preprocess(preprocessDefaultZero, z.number("Must be a number"))
      .pipe(z.number().nonnegative().refine(decimalTwoPlaces, "Cannot exceed 2 decimal places")),
    green_tax: z
      .preprocess(preprocessDefaultZero, z.number("Must be a number"))
      .pipe(z.number().nonnegative().refine(decimalTwoPlaces, "Cannot exceed 2 decimal places")),

    other_charges: z
      .preprocess(preprocessDefaultZero, z.number("Must be a number"))
      .pipe(z.number().nonnegative().refine(decimalTwoPlaces, "Cannot exceed 2 decimal places")),
  })