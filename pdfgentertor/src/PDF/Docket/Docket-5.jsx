import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Upgraded Styles for High Data Volume & Full Page Coverage
const styles = StyleSheet.create({
  page: {
    padding: 24,
    backgroundColor: '#fff',
    flexDirection: 'column',
    fontSize: 10.5, // Increased base font size to fill blank space cleanly
    fontFamily: 'Helvetica',

  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottom: '2px solid #000',
    paddingBottom: 4,
    marginBottom: 4,
  },
  logo: {
    width: 100,
    height: 65,
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  subHeader: {
    fontSize: 10,
    marginTop: 2,
  },
  copyBox: {
    border: '2px solid #000',
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  riskText: {
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  /* Top Meta Row */
  topSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 1,
  },

  /* Main 3-Column Core Workspace */
  workspaceGrid: {
    flexDirection: 'row',
    flex: 1, // Forces grid to grow and dynamically occupy empty vertical spaces
    minHeight: 280,
  },

  /* Column 1: Left Stack (Consignor -> Consignee -> Items) */
  leftVerticalStack: {
    width: '38%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  /* Column 2: Middle Stack (One-to-One Invoice & Eway Table) */
  middleDocStack: {
    width: '34%',
    paddingHorizontal: 6,
    flexDirection: 'column',
  },

  /* Column 3: Right Stack (Truck Data + Freight Breakdown) */
  rightControlStack: {
    width: '28%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor:"red"
  },

  /* Box Styles */
  box: {
    border: '1px solid #000',
    padding: 8,
    marginBottom: 6,
    flexGrow: 1, // Automatically stretches containers out to prevent page gaps

  },
  label: {
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    padding: 3,
    marginBottom: 4,
    borderBottom: '1px solid #000',
  },

  /* Unified Table Architectures */
  table: {
    width: '100%',
    border: '1px solid #000',
    marginTop: 2,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #000',
    alignItems: 'center',
  },
  tableRowLast: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableColHeader: {
    backgroundColor: '#f5f5f5',
    padding: 5,
    fontWeight: 'bold',
    fontSize: 10,
    borderRight: '1px solid #000',
  },
  tableCol: {
    padding: 5,
    fontSize: 9.5,
    borderRight: '1px solid #000',
  },
  colNoBorder: {
    borderRight: 0,
  },

  /* Freight Mapping Row items */
  freightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
    borderBottom: '1px dashed #e0e0e0',
  },
  freightTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    marginTop: 4,
    borderTop: '2px solid #000',

  },

  /* Bottom Blocks */
  footerMetaRow: {
    flexDirection: 'row',
    marginTop: 4,
    width: "71%"

  },
  termsContainer: {
    marginTop: 0,
    borderTop: '1px solid #000',
    paddingTop: 6,
  },
  termItem: {
    fontSize: 7,
    marginTop: 2,
    lineHeight: 1.3,
    textAlign: 'justify',
  },
});

// Normalized Dynamic Dataset matching your precise mappings
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
  ChargedWeight: "1000 Kg",

  // 3-4 Dynamic Item entries
  ItemsList: [
    { product: "Industrial Spare Parts", pkgs: "25", method: "Crates", value: "₹4,50,000" },
    // { product: "Hydraulic Pumps", pkgs: "10", method: "Boxes", value: "₹2,10,000" },
    // { product: "Control Panels", pkgs: "05", method: "Pallets", value: "₹3,20,000" },
    // { product: "Control Panels", pkgs: "05", method: "Pallets", value: "₹3,20,000" },
    // { product: "Control Panels", pkgs: "05", method: "Pallets", value: "₹3,20,000" },
  ],

  // Perfect 1:1 Mapping Array for Invoices and E-way bills (Supports up to 10 entries comfortably)
  DocumentMappings: [
    { invoice: "INV/2025/1123", eway: "321005445667" },
    { invoice: "INV/2025/1124", eway: "321005445668" },
    { invoice: "INV/2025/1125", eway: "321005445669" },
    { invoice: "INV/2025/1126", eway: "321005445670" },
    { invoice: "INV/2025/1127", eway: "321005445671" },
    { invoice: "INV/2025/1128", eway: "321005445672" },
    // { invoice: "INV/2025/1129", eway: "321005445673" },
    // { invoice: "INV/2025/1130", eway: "321005445674" },
    // { invoice: "INV/2025/1130", eway: "321005445674" },
    // { invoice: "INV/2025/1130", eway: "321005445674" },
  ],

  FreightDetails: {
    Freight: "12,000",
    MultiPointPickUp: "1,000",
    MultiPointDelivery: "500",
    Labour: "800",
    DocketCharge: "100",
    OtherCharges: "200",
    SubTotal: "14,600",
    OtherStateTax: "1,400",
    GST: "2,628",
    GrandTotal: "17,228",
  },
  PaymentMode: "To Pay",
  BillingBranch: "Pune Branch",
  GSTINPayableBy: "Consignor",
  Remarks: "Handle with care – fragile items.",
};

const Row = ({ label, value }) => (
  <Text style={{ marginVertical: 1 }}>
    <Text style={styles.label}>{label}:</Text> {value || ' - '}
  </Text>
);

export default function DocketPDF() {
  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">

        {/* Header Block */}
        <View style={styles.headerContainer}>
          <Image style={styles.logo} src="/logo1.png" />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>KAUSHIK TRANSPORT COMPANY (REGD.)</Text>
            <Text style={styles.subHeader}>
              H.O.: Kaushik House, T.O.-1/40 Transport Nagar, Jwalapur, Haridwar (U.K)-249407
            </Text>
            <Text style={styles.subHeader}>
              B.O.: Goel Rice Mills Compound, New Sidcul Bypass Road, Bahadrabad, Haridwar (U.K)-249402
            </Text>
            <Text style={styles.subHeader}>
              Mob: 8077958775, 9720169680 | Email: ktc.haridwar@gmail.com
            </Text>
            <Text style={styles.subHeader}>
              GSTIN: 05AMKPJ3865E1Z2 | PAN: AMKPJ3865E | SAC/HSN Code: 996511
            </Text>
          </View>
          <View style={styles.copyBox}>
            <Text style={styles.riskText}>TRANSPORTER COPY</Text>
            <Text style={[styles.riskText, { fontSize: 9, marginTop: 4, borderTop: '1px solid #000', paddingTop: 2 }]}>
              At Owner's Risk
            </Text>
          </View>
        </View>

        {/* Top Summary Route Fields */}
        <View style={styles.topSummaryRow}>
          <View style={[styles.box, { marginRight: 4 }]}><Row label="GR No." value={Docket.DocketNo} /></View>
          <View style={[styles.box, { marginRight: 4 }]}><Row label="Date" value={Docket.Date} /></View>
          <View style={[styles.box, { marginRight: 4 }]}><Row label="Branch" value={Docket.Branch} /></View>
          <View style={[styles.box, { marginRight: 4 }]}><Row label="From" value={Docket.Source} /></View>
          <View style={styles.box}><Row label="To" value={Docket.Destination} /></View>
        </View>

        {/* Main 3-Column Grid Wrapper */}
        <View style={styles.workspaceGrid}>

          {/* COLUMN 1: Vertical Stack (Consignor -> Consignee -> Items) */}
          <View style={styles.leftVerticalStack}>
            <View style={styles.box}>
              <Text style={styles.sectionTitle}>Consignor</Text>
              <Text style={{ fontWeight: 'bold' }}>{Docket.ConsignorName}</Text>
              <Text style={{ fontSize: 9.5, marginTop: 1 }}>{Docket.ConsignorAddress}</Text>
              <Text style={{ marginTop: 3 }}><Text style={styles.label}>GST:</Text> {Docket.ConsignorGST}</Text>
            </View>

            <View style={styles.box}>
              <Text style={styles.sectionTitle}>Consignee</Text>
              <Text style={{ fontWeight: 'bold' }}>{Docket.ConsigneeName}</Text>
              <Text style={{ fontSize: 9.5, marginTop: 1 }}>{Docket.ConsigneeAddress}</Text>
              <Text style={{ marginTop: 3 }}>
                <Text style={styles.label}>GST:</Text> {Docket.ConsigneeGST} | <Text style={styles.label}>Mob:</Text> {Docket.ConsigneeContact.split(' - ')[1]}
              </Text>
            </View>

            <View style={[styles.box, { marginBottom: 0 }]}>
              <Text style={styles.sectionTitle}>Item Details</Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={[styles.tableColHeader, { width: '40%' }]}>Description</Text>
                  <Text style={[styles.tableColHeader, { width: '18%' }]}>Pkgs</Text>
                  <Text style={[styles.tableColHeader, { width: '22%' }]}>Method</Text>
                  <Text style={[styles.tableColHeader, { width: '20%', borderRight: 0 }]}>Value</Text>
                </View>
                {Docket.ItemsList.map((item, index) => (
                  <View
                    key={index}
                    style={index === Docket.ItemsList.length - 1 ? styles.tableRowLast : styles.tableRow}
                  >
                    <Text style={[styles.tableCol, { width: '40%' }]}>{item.product}</Text>
                    <Text style={[styles.tableCol, { width: '18%' }]}>{item.pkgs}</Text>
                    <Text style={[styles.tableCol, { width: '22%' }]}>{item.method}</Text>
                    <Text style={[styles.tableCol, { width: '20%', borderRight: 0 }]}>{item.value}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* COLUMN 2: 1-to-1 Mapping Table (Invoice & E-way Bill Mapping) */}
          <View style={styles.middleDocStack}>

            <View style={[styles.box, { marginBottom: 0, flexGrow: 2 }]}>
              <Text style={styles.sectionTitle}>Freight Structure</Text>
              <View style={styles.freightRow}><Row label="Basic Freight" value={Docket.FreightDetails.Freight} /></View>
              <View style={styles.freightRow}><Row label="Multi-Point Pick" value={Docket.FreightDetails.MultiPointPickUp} /></View>
              <View style={styles.freightRow}><Row label="Multi-Point Delv" value={Docket.FreightDetails.MultiPointDelivery} /></View>
              <View style={styles.freightRow}><Row label="Labour Charges" value={Docket.FreightDetails.Labour} /></View>
              <View style={styles.freightRow}><Row label="Docket Charges" value={Docket.FreightDetails.DocketCharge} /></View>
              <View style={styles.freightRow}><Row label="Other Charges" value={Docket.FreightDetails.OtherCharges} /></View>
              <View style={styles.freightRow}><Row label="Sub Total" value={Docket.FreightDetails.SubTotal} /></View>
              <View style={styles.freightRow}><Row label="State Tax" value={Docket.FreightDetails.OtherStateTax} /></View>
              <View style={styles.freightRow}><Row label="GST Amount" value={Docket.FreightDetails.GST} /></View>

              <View style={styles.freightTotalRow}>
                <Text style={[styles.label, { fontSize: 11 }]}>Grand Total:</Text>
                <Text style={[styles.label, { fontSize: 11 }]}>₹{Docket.FreightDetails.GrandTotal}</Text>
              </View>
            </View>

          </View>

          {/* COLUMN 3: Right Stack (Vehicle Details + Freight Breakdown) */}
          <View style={styles.rightControlStack}>

            <View style={styles.box}>
              <Text style={styles.sectionTitle}>Vehicle Details</Text>
              <Row label="Truck Number" value={Docket.LorryNo} />
              <Row label="Ch. Wt./ Act.Wt." value={Docket.ChargedWeight + "/" + Docket.ActualWeight} />
              <Row label="Size" value={Docket.Size} />
            </View>

            <View style={[styles.box, { marginBottom: 0 }]}>

              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={[styles.tableColHeader, { width: '12%', textAlign: 'center' }]}>#</Text>
                  <Text style={[styles.tableColHeader, { width: '44%' }]}>Invoice Number</Text>
                  <Text style={[styles.tableColHeader, { width: '44%', borderRight: 0 }]}>E-Way Bill</Text>
                </View>
                {Docket.DocumentMappings.map((doc, index) => (
                  <View
                    key={index}
                    style={index === Docket.DocumentMappings.length - 1 ? styles.tableRowLast : styles.tableRow}
                  >
                    <Text style={[styles.tableCol, { width: '12%', textAlign: 'center' }]}>{index + 1}</Text>
                    <Text style={[styles.tableCol, { width: '44%', fontWeight: 'bold' }]}>{doc.invoice}</Text>
                    <Text style={[styles.tableCol, { width: '44%', borderRight: 0 }]}>{doc.eway}</Text>
                  </View>
                ))}
              </View>

            </View>


            <View style={[styles.box, { textAlign: 'center', justifyContent: 'space-between', marginTop: 20 }]}>
              <Text style={{ fontWeight: 'bold', fontSize: 9.5 }}>For KAUSHIK TRANSPORT COMPANY</Text>
              <Text style={{ marginTop: 10, fontSize: 9, fontStyle: 'italic' }}>Authorized Signatory</Text>
            </View>
          </View>

        </View>

        {/* Bottom Metadata Blocks */}
        <View style={styles.footerMetaRow}>
          <View style={[styles.box, { marginRight: 4 }]}>
            <Row label="Payment Mode" value={Docket.PaymentMode} />
            <Row label="Billing Branch" value={Docket.BillingBranch} />

          </View>
          <View style={[styles.box, { marginRight: 4, flex: 4 }]}>
            <Row label="GST Payable By" value={Docket.GSTINPayableBy} />
          </View>
          <View style={[styles.box, { marginRight: 4, flex: 4 }]}>
            <Row label="Remarks/Delivery Instructions" value={Docket.Remarks} />
          </View>

        </View>

        {/* Expanded Terms and Conditions to cover bottom area */}
        <View style={styles.termsContainer}>
          <Text style={[styles.label, { fontSize: 8, marginBottom: 0, textAlign: 'center' }]}>
            TERMS & CONDITIONS
          </Text>
          <Text style={styles.termItem}>
            1) Shipment shall not be detained, diverted, or re-routed without the written approval of the consignor or consignee, and delivery will be made only at the destination mentioned in this docket.
            2) All goods are carried entirely at the consignor’s/owner’s risk, and the company is not responsible for any loss or damage due to natural causes, accidents, theft, fire, leakage, or other unavoidable events.
            3) Perishable, fragile, or liquid goods are accepted strictly at the owner’s risk.
            4) The company does not accept valuables (gold, jewelry, documents, etc.) or prohibited/inflammable items unless properly declared and permitted.
            5) The consignee must collect goods within 24 hours of arrival; demurrage charges of Rs.2 per quintal per day on billed weight will apply after 15 days or beyond the permitted free period.
            6) Undelivered consignments may be disposed of by auction after two months, or after two days in the case of perishables.
            7) The company reserves the right to delay, detain, or cancel transport or delivery without prior notice.
            8) No TDS deduction under Section 194C of the Income Tax Act, 1961 shall be made on transportation charges.
            9) All disputes are subject to District Court, Haridwar jurisdiction Only.

          </Text>
        </View>

      </Page>
    </Document>
  );
}