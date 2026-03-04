import asyncHandler from "../../middlewares/asyncHandler.js";
import { addDocket, addDocketNew } from "./docket.model.js";
import { getConsignorDetails } from "../party/party.model.js";
// import { getBranchDetails } from "../branch/branch.model.js";

const nextDocketNo = {
  compnayName: 0,
  Halonix: 11,
  Hilla: 200,
};

export const addNewDocket = asyncHandler(async (req, res) => {
  try {
    // console.log(req.body);
    // console.log("API HIT", req.method);
    // const response = addDocket(Object.values(req.body));
    const response = addDocketNew(req.body);
    res.send(response);

    if (response) {
      nextDocketNo[req.body.compnayName]++;
    }
  } catch (error) {
    console.log(error);
  }
});

export const sendNextDocketNo = asyncHandler(async (req, res) => {
  try {
    console.log(req.query);
    const { companyName } = req.query;
    const response = nextDocketNo[companyName];
    const response1 = await getConsignorDetails();
    const response2 = await getBranchDetails();

    console.log(response);
    console.log(response1)
    res.json({ DocketNo: response , consignorDetails:response1, BranchDetails:response2});
  } catch (error) {
    console.log(error);
  }
});


export const viewDocket = asyncHandler(async (req, res) => {
  try {
    // console.log(req.query);
    console.log(req.query)
    res.send(docket);

  } catch (error) {
    console.log(error);
  }
});

const docket = {
  "docket": {
    "branchId": "1",
    "docketDate": "2026-03-03",
    "docketNo": "HDW-2026-00045",
    "source": "Haridwar",
    "destination": "Delhi",
    "billingBranchId": "2",
    "PaymentMode": "To Pay",
    "remarks": "Handle with care. Fragile material."
  },
  "vehicle": {
    "id": "5",
    "lorryNo": "HR38AB1234",
    "vehicleSize": "32 FT",
    "actualWeight": "8500",
    "chargedWeight": "9000",
    "driverName": "Rajesh Kumar",
    "driverPhone": "9876543210"
  },
  "consignor": {
    "id": "12",
    "name": "Shiv Steel Industries",
    "address": "SIDCUL Industrial Area, Haridwar, Uttarakhand",
    "gst": "05ABCDE1234F1Z5",
    "contactPerson": "Amit Sharma",
    "contactNumber": "9811122233"
  },
  "consignee": {
    "id": "18",
    "name": "Metro Hardware Pvt Ltd",
    "address": "Bawana Industrial Area, Delhi",
    "gst": "07PQRSX5678L1Z2",
    "contactPerson": "Sandeep Verma",
    "contactNumber": "9898989898"
  },
  "items": [
    {
      "productName": "TMT Steel Bars",
      "totalPackages": "120",
      "packagingMethod": "Bundles",
      "declaredValue": "450000"
    },
    {
      "productName": "Iron Rods",
      "totalPackages": "80",
      "packagingMethod": "Loose",
      "declaredValue": "250000"
    }
  ],
  "eway": {
    "invoiceNo": "INV-4587/2026",
    "ewayBillNo": "311009876543"
  },
  "freight": {
    "truckFreight": 28000,
    "companyFreight": 32000,
    "charges": {
      "multipointPickup": 2000,
      "multipointDelivery": 1500,
      "labour": 3000,
      "holding": 1000,
      "docketCharge": 500,
      "otherCharges": 700
    },
    "subtotal": 40700,
    "taxes": {
      "gst": 18,
      "gstinPayableBy": "Consignor",
      "otherStateTax": 0
    },
    "grandTotal": 48026
  }
}