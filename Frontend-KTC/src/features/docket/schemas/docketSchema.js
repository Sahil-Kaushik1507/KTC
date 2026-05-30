import { z } from 'zod'

// {
//   "docket_no": "HDW-2026-00045",
//   "branch_id": 1,
//   "docket_date": "2026-03-24",
//   "source": "Haridwar",
//   "destination": "Delhi",
//   "vehicle_id": 5,
//   "charged_weight": 9000.50,
//   "consignor_id": 12,
//   "consignee_id": 18,
//   "payment_mode": "TO_PAY",
//   "billing_branch_id": 2,
//   "gstin_payable_by": "CONSIGNEE",
//   "remarks": "Handle with care. Fragile goods."
// }


// {
//   "docket": {
//     "branchId": "1",
//     "docketDate": "2026-03-03",
//     "docketNo": "HDW-2026-00045",
//     "source": "Haridwar",
//     "destination": "Delhi",
//     "billingBranchId": "2",
//     "PaymentMode": "To Pay",
//     "remarks": "Handle with care. Fragile material."
//   },
//   "vehicle": {
//     "id": "5",
//     "lorryNo": "HR38AB1234",
//     "vehicleSize": "32 FT",
//     "actualWeight": "8500",
//     "chargedWeight": "9000",
//     "driverName": "Rajesh Kumar",
//     "driverPhone": "9876543210"
//   },
//   "consignor": {
//     "id": "12",
//     "name": "Shiv Steel Industries",
//     "address": "SIDCUL Industrial Area, Haridwar, Uttarakhand",
//     "gst": "05ABCDE1234F1Z5",
//     "contactPerson": "Amit Sharma",
//     "contactNumber": "9811122233"
//   },
//   "consignee": {
//     "id": "18",
//     "name": "Metro Hardware Pvt Ltd",
//     "address": "Bawana Industrial Area, Delhi",
//     "gst": "07PQRSX5678L1Z2",
//     "contactPerson": "Sandeep Verma",
//     "contactNumber": "9898989898"
//   },
//   "items": [
//     {
//       "productName": "TMT Steel Bars",
//       "totalPackages": "120",
//       "packagingMethod": "Bundles",
//       "declaredValue": "450000"
//     },
//     {
//       "productName": "Iron Rods",
//       "totalPackages": "80",
//       "packagingMethod": "Loose",
//       "declaredValue": "250000"
//     }
//   ],
//   "eway": {
//     "invoiceNo": "INV-4587/2026",
//     "ewayBillNo": "311009876543"
//   },
//   "freight": {
//     "truckFreight": 28000,
//     "companyFreight": 32000,
//     "charges": {
//       "multipointPickup": 2000,
//       "multipointDelivery": 1500,
//       "labour": 3000,
//       "holding": 1000,
//       "docketCharge": 500,
//       "otherCharges": 700
//     },
//     "subtotal": 40700,
//     "taxes": {
//       "gst": 18,
//       "gstinPayableBy": "Consignor",
//       "otherStateTax": 0
//     },
//     "grandTotal": 48026
//   }
// }

export const newDocketSchema = z.object({

    docket_no: z
        .string()
        .min(1, "Docket Number is Required"),

    branch_id: z
        .string()
        .min(1, "Required"),
    docket_date: z
        .date()
        .min(1, "required"),
    source: z
        .string()
        .min(1, "Required"),
    destination: z
        .string()
        .min(1, "Required"),
    vehicle_id: z
        .number()
        .min(1, "Required"),
    charged_weight: z
        .string()
        .min(1, "Required"),
    consignor_id: z
        .string()
        .min(1, "Required"),
    consignee_id: z
        .string()
        .min(1, "Required"),
    payment_mode: z
        .string()
        .min(1, "Required"),
    billing_branch_id: z
        .string()
        .min(1, "Required"),
    gstin_payable_by: z
        .string()
        .min(1, "Required"),
    remarks: z
        .string()

}

)