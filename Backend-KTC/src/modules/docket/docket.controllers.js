import asyncHandler from "../../middlewares/asyncHandler.js";
import { addDocket } from "./docket.model.js";
import { getConsignorDetails } from "../party/party.model.js";
import { getBranchDetails } from "../branch/branch.model.js";

const nextDocketNo = {
  compnayName: 0,
  Halonix: 11,
  Hilla: 200,
};

export const addNewDocket = asyncHandler(async (req, res) => {
  try {
    // console.log();
    const response = addDocket(Object.values(req.body));
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
    // console.log(req.query);
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
    DocketNo: 1,
    Branch: "Main Branch",
    Date: "2024-11-08", 
    Source: "Delhi",
    Destination: "Mumbai",
    LorryNo: "MH-01-AB-1234",
    Size: "Large",
    ActualWeight: "1000 kg",
    TruckFright: "1500 INR",
    ConsignorName: "John Doe",
    ConsignorAddress: "123 Main Street, Delhi",
    ConsignorGST: "07AABCU9609H1Z7",
    ConsigneeName: "Jane Smith",
    ConsigneeAddress: "456 Market Road, Mumbai",
    ConsigneeGST: "27AAACZ1234H1Z5",
    Product: "Electronics",
    TotalPackages: "50",
    MethodOfPkg: "Cartons",
    InvoiceNo: "INV123456",
    DeclaredValue: "As Per Bill",
    EwayBillNo: "1234567890",
    ProvisionalAmount: "50000 INR",
    GreenTax: "500 INR",
    LabourCharges: "1000 INR",
    HoldingCharges: "200 INR",
    MultiPointPickUpCharges: "300 INR",
    MultiPointDileveryCharges: "400 INR",
    DocketCharges: "50 INR",
    OtherCharges: "100 INR",
    PaymentMode: "Online",
    TotalAmount: "52500 INR",
    GSTINPayableBy: "Consignor",
    BillingBranch: "Delhi Branch",
    Remarks: "Urgent Delivery"
};
