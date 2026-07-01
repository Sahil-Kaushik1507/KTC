import { z } from "zod";

const truckNumberRegex =
    /^[A-Z]{2}[-\s]?\d{1,2}[A-Z]?[-\s]?[A-Z]{1,3}[-\s]?\d{4}$/;

const indianPhoneRegex =
  /^(\+91[\s-]?)?[6-9]\d{9}$/;

export const truckDetailsSchema = z.object({
  truck_no: z
    .string()
    .trim()
    .min(1, "Truck number is required")
    .transform((val) => val.toUpperCase())
    .refine(
      (val) => truckNumberRegex.test(val),
      "Enter a valid Indian vehicle number (e.g. HR12SK1507)"
    ),

  size_id: z
    .number()
    .min(1, "Vehicle size is required"),

  actual_weight: z.coerce
    .number({
      error: "Actual weight must be a valid number",
    })
    .positive("Actual weight must be greater than 0")
    .max(100000, "Actual weight seems unrealistic"),


  driver_name: z
    .string()
    .trim()
    .min(2, "Driver name must be at least 2 characters")
    .max(50, "Driver name cannot exceed 50 characters")
    .regex(
      /^[A-Za-z\s.'-]+$/,
      "Driver name contains invalid characters"
    ),

  driver_phone: z
    .string()
    .trim()
    .min(1, "Driver phone number is required")
    .refine(
      (val) => indianPhoneRegex.test(val),
      "Enter a valid Indian mobile number"
    ),
});