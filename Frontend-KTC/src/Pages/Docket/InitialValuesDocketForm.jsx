import { useMemo } from "react";

const useInitialValues = () => {
  return useMemo(
    () => ({
      DocketNo: "",
      Branch: "",
      Date: null,

      ConsignorName: "",
      ConsignorAddress: "",
      ConsignorGST: "",
     
      ConsigneeName: "",
      ConsigneeAddress: "",
      ConsigneeGST: "",
      ConsigneeContactPerson: "",

      Source: "",
      Destination: "",

      LorryNo: "",
      Size: "",
      ActualWeight: "",
      ChargedWeight: "",

      TruckFreight: "",
      GreenTax: "",
      LabourCharges: "",
      HoldingCharges: "",
      MultiPointPickUpCharges: "",
      MultiPointDileveryCharges: "",
      DocketCharges: "",
      OtherCharges: "",
      
      SubTotal: "",
      OtherStateTax: "",
      GST: "",
      GrandTotalFreight: "",
      GrandTotalCompanyAmt: "",

      Product: "",
      TotalPackages: "",
      MethodOfPkg: "",
      InvoiceNo: "",
      DeclaredValue: "As Per Bill",
      EwayBillNo: "",
      
      ProvisionalAmount: "",
      PaymentMode: "",
      GSTINPayableBy: "",
      BillingBranch: "",
      
      Remarks: "",
 
      
    }),
    [],
  );
};

export default useInitialValues;



const Docket = {
  DocketNo: "ANU24567",
  Branch: "Kolkata",
  Date: "2025-11-04",

  ConsignorName: "ABC Manufacturing Pvt. Ltd.",
  ConsignorAddress: "Plot No. 56, Industrial Area, Pune, Maharashtra - 411038",
  ConsignorGST: "27AAACA1234F1Z9",

  ConsigneeName: "XYZ Traders Pvt. Ltd.",
  ConsigneeAddress: "Plot No. 56, 12A, MG Road, Bengaluru, Karnataka - 560001",
  ConsigneeGST: "29AAACX1234M1Z6",
  ConsigneeContact: "Mr. Rohan Kumar - 9825020102",

  Source: "Pune",
  Destination: "Bengaluru",
  LorryNo: "MH12AB5678",
  Size: "20 Feet",
  ActualWeight: "1450 Kg",

  /* ========= PRODUCT DETAILS ========= */
  Product: "Industrial Spare Parts",
  TotalPackages: "25",
  MethodOfPkg: "Wooden Crates",
  DeclaredValue: "₹4,50,000",
  InvoiceNo: "INV/2025/1123",
  EwayBillNo: "321005445667, 321005445667, 321005445667, 321005445667, 321005445667, 321005445667",

  /* ========= FREIGHT BREAKUP ========= */
  FreightDetails: {
    Freight: "12,000",
    MultiPointPickUp: "1,000",
    MultiPointDelivery: "500",
    Labour: "800",
    DocketCharge: "100",
    OtherCharges: "200",
    SubTotal: "14,600",
    OtherStateTax: "1400",
    GST: "2,628",
    GrandTotal: "17,228",
  },

  /* ========= PAYMENT ========= */
  PaymentMode: "To Pay",
  BillingBranch: "Pune Branch",
  GSTINPayableBy: "Consignor",
  Remarks: "Handle with care – fragile items.",
};


const initialValues = {
  // -------------------
  // Step 1: Docket Info
  // -------------------
  docket: {
    branchId: '',          // FK → BRANCHES
    docketDate: new Date(),// default today
    docketNo:'',
    
    source: '',          
    destination: '', 

    billingBranchId: '',   // FK → BRANCHES (if different from branchId) 
    PaymentMode:'',
    remarks: '',
  },

  // -------------------
  // Step 2: Vehicle
  // -------------------
  vehicle: {
    id: '',               // FK → VEHICLES
    lorryNo: '',
    vehicleSize: '',
    actualWeight:'',
    chargedWeight: "",
    driverName: '',
    driverPhone: ''
  },

  // -------------------
  // Step 3: Parties
  // -------------------
  consignor: {
    id: '',               // FK → PARTIES (if existing)
    name: '',             // only if adding new
    address: '',
    gst: '',
    contactPerson: '',
    contactNumber: '',
  },
  consignee: {
    id: '',               // FK → PARTIES
    name: '',
    address: '',
    gst: '',
    contactPerson: '',
    contactNumber: '',
  },



  // -------------------
  // Step 4: Docket Items (Dynamic Array)
  // -------------------
  items: [
    {
      productName: '',
      totalPackages: '',
      packagingMethod: '',
      declaredValue: ''
    }
  ],

  // -------------------
  // Step 5: Eway Bill
  // -------------------
  eway: {
    invoiceNo: '',
    ewayBillNo: ''
  },

  // -------------------
  // Step 6: Charges / Freight
  // -------------------
  freight:{
    truckFreight:0,
    companyFreight:0, 
    charges: { 
      multipointPickup: 0,
      multipointDelivery: 0,
      labour: 0,
      holding:0,
      docketCharge: 0,
      otherCharges: 0,
    },
    subtotal: 0,
    taxes:{
      gst: 0,
      gstinPayableBy: '',    // e.g., 'Consignor' or 'Consignee'
      otherStateTax: 0,
    },
     grandTotal: 0,
  },


};