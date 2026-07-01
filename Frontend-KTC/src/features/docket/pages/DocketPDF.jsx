import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, PDFViewer } from '@react-pdf/renderer';
import PDFPage from '../components/pdf/pdfPage';
import { useLoaderData, useLocation } from 'react-router-dom';



const Docket = {
  DocketNo: "ANU24567",
  Branch: "Kolkata",
  Date: "2026-06-09",
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
  ChargedWeight: "1000 Kg",

  ItemsList: [
    { product: "Industrial Spare Parts", pkgs: "25", method: "Crates", value: "₹4,50,000" },
    { product: "Hydraulic Pumps", pkgs: "10", method: "Boxes", value: "₹2,10,000" },
    { product: "Control Panels", pkgs: "05", method: "Pallets", value: "₹3,20,000" },
    { product: "Control Panels", pkgs: "05", method: "Pallets", value: "₹3,20,000" },
    { product: "Control Panels", pkgs: "05", method: "Pallets", value: "₹3,20,000" },
    { product: "Control Panels", pkgs: "05", method: "Pallets", value: "₹3,20,000" },
    // { product: "Control Panels", pkgs: "05", method: "Pallets", value: "₹3,20,000" },
  ],

  DocumentMappings: [
    { invoice: "INV/2026/1123", eway: "321005445667" },
    { invoice: "INV/2026/1124", eway: "321005445668" },
    { invoice: "INV/2026/1125", eway: "321005445669" },
    { invoice: "INV/2026/1126", eway: "321005445670" },
    { invoice: "INV/2026/1127", eway: "321005445671" },
    { invoice: "INV/2026/1128", eway: "321005445672" },
    { invoice: "INV/2026/1129", eway: "321005445673" },
    { invoice: "INV/2026/1130", eway: "321005445674" },
    { invoice: "INV/2026/1131", eway: "321005445675" },
    { invoice: "INV/2026/1132", eway: "321005445676" },
    { invoice: "INV/2026/1132", eway: "321005445676" },
  ],

  FreightDetails: {
    Freight: "12,000",
    Holding:"1000",
    MultiPointPickUp: "1,000",
    MultiPointDelivery: "500",
    Labour: "800",
    DocketCharge: "100",
    OtherCharges: "200",
    SubTotal: "14,600",
    OtherStateTax: "400",
    GST: "2,628",
    GrandTotal: "17,228",
  },
  PaymentMode: "To Be Billed",
  BillingBranch: "Pune Branch",
  GSTINPayableBy: "Consignor",
  Remarks: "Handle with care – fragile items. Handle with care – fragile items. ",
};



export default function DocketPDF() {
  const location = useLocation();
  const docketData = location.state.docketData;


  return (

    <PDFViewer style={{ width: "100%", height: "100%" }}>
    <Document>
    <PDFPage copy = "CONSIGNOR" docketData={docketData} />
    <PDFPage copy = "CONSIGNEE" docketData={docketData} />
    <PDFPage copy = "DRIVER" docketData={docketData} />
    </Document>
    </PDFViewer>

  );
}