import {Router} from 'express';
import {addNewDocket,sendNextDocketNo} from '../controllers/docket.controllers.js'
const router = Router();


router.route("/new").post(addNewDocket)
router.route("/new/company").get(sendNextDocketNo)




router.route('/new').get((req,res)=>{
    res.send("in api/v1/docket/new")
})

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

router.route('/view').get((req,res)=>{
    console.log(req.query)
    res.send(docket);
})



export default router;