import { getPool } from "./index.js";

//Add a docket (newDocketData--> array of 34 )
export const addDocket = async (newDocketData) => {
  try {
    const connectionPool = getPool();
    if (!connectionPool) {
      throw new Error("Database connection pool is not initialized.");
    }
    const result = await connectionPool.query(
      `  INSERT INTO Docket (
      DocketNo, Branch, Date, Source, Destination, TruckNo, Size, ActualWeight,
      TruckFright, ConsignorName, ConsignorAddress, ConsignorGST, ConsigneeName,
      ConsigneeAddress, ConsigneeGST, Product, TotalPackages, MethodOfPkg,
      InvoiceNo, DeclaredValue, EwayBillNo, ProvisionalAmount, GreenTax,
      LabourCharges, HoldingCharges, MultiPointPickUpCharges,
      MultiPointDileveryCharges, DocketCharges, OtherCharges, PaymentMode,
      TotalAmount, GSTINPayableBy, BillingBranch, Remarks
      ) VALUES 
            (
              ?,?,STR_TO_DATE(?, '%d-%m-%Y'),?,?,?,?,?,?,?,
              ?,?,?,?,?,?,?,?,?,?,
              ?,?,?,?,?,?,?,?,?,?,
              ?,?,?,?
            );`,
      newDocketData,
    );
    if (result[0].affectedRows === 1) {
      console.log(`Docket No: ${newDocketData[0]} Added Succesfully!!`);
      return `Docket No: ${newDocketData[0]} Added Succesfully!!`;
    }
    return "Failed :Row Affected is not one";
  } catch (error) {
    console.log(`Docket Not Added: ${error}`);
  }
};
 
/* sample docket object
const docket = {
    DocketNo: 1,
    Branch: "Main Branch",
    Date: "2024-11-08", 
    Source: "Delhi",
    Destination: "Mumbai",
    TruckNo: "MH-01-AB-1234",
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
*/
