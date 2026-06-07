import { z } from "zod";

export const itemSchema = z.object({
    
    product_name: z
        .string("Required")
        .trim()
        .min(2, { message: "Product name must be at least 2 characters long" }),

    total_packages: z
        .coerce.number({
            required_error: "Total packages is required",
            invalid_type_error: "Total packages must be a number",
        })
        .int({ message: "Total packages must be a whole number" })
        .positive({ message: "Total packages must be greater than 0" })
        .max(1000000, { message: "Total packages cannot exceed 10,00,000" }),


    packaging_method: z
        .string()
        .min(1, "required"),

    declared_value: z.
        coerce
        .number({
            required_error: "Declared value is required",
            invalid_type_error: "Declared value must be a valid number",
        })
        .positive("Declared value must be greater than 0")
        .refine(
            (val) => {
                const parts = val.toString().split(".");
                return !parts[1] || parts[1].length <= 2;
            },
            { message: "Declared value cannot have more than 2 decimal places" }
        ),
})
