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
      TruckFright: "",

      Product: "",
      TotalPackages: "",
      MethodOfPkg: "",
      InvoiceNo: "",
      DeclaredValue: "As Per Bill",
      EwayBillNo: "",

      ProvisionalAmount: "",
      GreenTax: "",
      LabourCharges: "",
      HoldingCharges: "",
      MultiPointPickUpCharges: "",
      MultiPointDileveryCharges: "",
      DocketCharges: "",
      OtherCharges: "",
      PaymentMode: "",
      TotalAmount: "",
      GSTINPayableBy: "",
      BillingBranch: "",
      Remarks: "",
    }),
    []
  );
};

export default useInitialValues;
