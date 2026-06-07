import { z } from 'zod'
import { itemSchema } from './itemSchema'
import { truckDetailsSchema } from './truckDetailsSchema'
import { truckFreightSchema } from './truckFreightSchema'
import { partyFreightSchema } from './partyFreightSchema'


export const newDocketSchema = z.object({

    docket_no: z
        .string()
        .min(1, "Docket Number is Required"),
    docket_date: z
        .date()
        .min(1, "required"),

    branch_id: z
        .string("Required")
        .min(1, "Required"),


    source: z
        .string("Required")
        .min(3, "Required"),
    destination: z
        .string("Required")
        .min(3, "Required"),

    truck_details: truckDetailsSchema,

    consignor_id: z
        .number()
        .min(1, "Required"),
    consignee_id: z
        .number()
        .min(1, "Required"),


    docket_items: z.array(itemSchema).min(1, "At least one item is required"),

    temp_invoice_no: z.
        string().min(1, "Required"),
    temp_eway_bill_no: z.
        string().regex(/^\d{12}$/, "Invalid E-way Bill. It Should be 12 digit No."),

    eway_bills: z
        .array(
            z.object({
                invoice_no: z.string().min(1),
                eway_bill_no: z.string().regex(/^\d{12}$/)
            })
        )
        .min(1, "At least one Invoice/E-Way Bill is required"),

    truck_freight: truckFreightSchema,

    party_freight: partyFreightSchema,

    billing_branch_id: z
        .number()
        .min(1, "Required"),
    gstin_payable_by: z
        .string()
        .min(1, "Required"),
    payment_mode: z
        .string()
        .min(1, "Required"),


    remarks: z
        .string()

}

)



