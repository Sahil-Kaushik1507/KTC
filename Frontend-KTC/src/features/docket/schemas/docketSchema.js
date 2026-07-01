import { z } from "zod";
import { itemSchema } from "./itemSchema";
import { truckDetailsSchema } from "./truckDetailsSchema";
import { truckFreightSchema } from "./truckFreightSchema";
import { partyFreightSchema } from "./partyFreightSchema";

export const newDocketSchema = z.object({
    docket_no: z
        .string({
            required_error: "Docket number is required",
            invalid_type_error: "Docket number is required",
        })
        .trim()
        .min(1, "Docket number is required"),

    docket_date: z.coerce.date({
        required_error: "Docket date is required",
        invalid_type_error: "Please select a valid docket date",
    }),

    branch_id: z.coerce
        .string({
            required_error: "Branch is required",
            invalid_type_error: "Branch is required",
        })
        .trim()
        .min(1, "Branch is required"),

    source: z.coerce
        .string({
            required_error: "Source is required",
            invalid_type_error: "Source is required",
        })
        .trim()
        .min(3, "Source must be at least 3 characters"),

    destination: z
        .string({
            required_error: "Destination is required",
            invalid_type_error: "Destination is required",
        })
        .trim()
        .min(3, "Destination must be at least 3 characters"),
    
    charged_weight: z.coerce
        .number({
            error: "Charged weight must be a valid number",
        })
        .positive("Charged weight must be greater than 0")
        .max(100000, "Charged weight seems unrealistic"),

    truck_details: truckDetailsSchema,

      seal_no: z
         .string({
            invalid_type_error: "Seal No. must be text/number",
        })
        .optional()
        .default(""),

    consignor_id: z.coerce
        .number({
            required_error: "Consignor is required",
            invalid_type_error: "Consignor is required",
        })
        .min(1, "Please select a consignor"),

    consignee_id: z.coerce
        .number({
            required_error: "Consignee is required",
            invalid_type_error: "Consignee is required",
        })
        .min(1, "Please select a consignee"),

    docket_items: z
        .array(itemSchema)
        .min(1, "At least one item is required"),

    temp_invoice_no: z
        .string({
            required_error: "Invoice number is required",
            invalid_type_error: "Invoice number is required",
        })
        .trim()
        .min(1, "Invoice number is required"),

    temp_eway_bill_no: z
        .string({
            required_error: "E-Way Bill number is required",
            invalid_type_error: "E-Way Bill number is required",
        })
        .regex(
            /^\d{12}$/,
            "E-Way Bill number must contain exactly 12 digits"
        ),

    eway_bills: z
        .array(
            z.object({
                invoice_no: z
                    .string({
                        required_error: "Invoice number is required",
                        invalid_type_error: "Invoice number is required",
                    })
                    .trim()
                    .min(1, "Invoice number is required"),

                eway_bill_no: z
                    .string({
                        required_error: "E-Way Bill number is required",
                        invalid_type_error: "E-Way Bill number is required",
                    })
                    .regex(
                        /^\d{12}$/,
                        "E-Way Bill number must contain exactly 12 digits"
                    ),
            })
        )
        .min(1, "At least one Invoice / E-Way Bill is required"),

    truck_freight: truckFreightSchema,

    party_freight: partyFreightSchema,

    billing_branch_id: z.coerce
        .number({
            required_error: "Billing branch is required",
            invalid_type_error: "Billing branch is required",
        })
        .min(1, "Please select a billing branch"),

    gstin_payable_by: z
        .string({
            required_error: "GST payable by is required",
            invalid_type_error: "GST payable by is required",
        })
        .trim()
        .min(1, "GST payable by is required"),

    payment_mode: z
        .string({
            required_error: "Payment mode is required",
            invalid_type_error: "Payment mode is required",
        })
        .trim()
        .min(1, "Payment mode is required"),

    remarks: z
        .string({
            invalid_type_error: "Remarks must be text",
        })
        .optional()
        .default(""),

    request_id: z.string()
});