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