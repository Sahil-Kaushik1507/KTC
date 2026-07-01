import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';



// Premium Balanced Style Configuration for High-Density Single Page Layouts
const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'column',
    fontSize: 10.5,
    fontFamily: 'Helvetica',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottom: '2px solid #000',
    paddingBottom: 4,
    marginBottom: 6,
  },
  logo: {
    width: 100,
    height: 60,
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
    fontSize: 9.5,
    marginTop: 1,
  },
  copyBox: {
    border: '2px solid #000',
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  riskText: {
    fontSize: 10.5,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  /* Top Summary Bar */
  topSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },

  /* Main Dynamic Workspace Area */
  workspaceGrid: {
    flexDirection: 'row',
    flex: 1,
  },

  /* Operational Left & Center Master Column Block */
  leftTwoThirdsBlock: {
    width: '72%',
    flexDirection: 'column',
  },

  /* Horizontal Splitting Pane inside Master Column Block */
  leftColumnsRow: {
    flexDirection: 'row',
    flex: 1,
  },

  /* Column 1 Layout */
  leftVerticalStack: {
    width: '53%',
    flexDirection: 'column',
  },

  /* Column 2 Layout */
  middleDocStack: {
    width: '47%',
    paddingLeft: 4,
    paddingRight: 4,
    flexDirection: 'column',
  },

  /* Column 3 Layout (Full Page Vertical Control Column) */
  rightControlStack: {
    width: '28%',
    flexDirection: 'column',
  },

  /* Card Containers */
  box: {
    border: '1px solid #000',
    padding: 6,
    marginBottom: 4,
    flexDirection: 'column',
  },
  boxGrow: {
    flex: 1, // Automatically balances matching row block sizes smoothly
  },
  label: {
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    padding: 2,
    marginBottom: 4,
    borderBottom: '1px solid #000',
  },

  /* Standardized Stable Table Structure */
  table: {
    width: '100%',
    border: '1px solid #000',
    marginTop: 2,
    flexDirection: 'column',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #000',
    alignItems: 'stretch', // Fixes text row height clipping bugs
    minHeight: 16,
  },
  tableRowLast: {
    flexDirection: 'row',
    alignItems: 'stretch',
    minHeight: 16,
  },
  tableColHeader: {
    backgroundColor: '#f5f5f5',
    paddingTop: 3,
    paddingBottom: 3,
    paddingHorizontal: 4,
    fontWeight: 'bold',
    fontSize: 9.5,
    borderRight: '1px solid #000',
  },
  tableCol: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingHorizontal: 4,
    fontSize: 9.5,
    borderRight: '1px solid #000',
    lineHeight: 1.1,
  },

  /* Freight Structure Rows */
  freightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 1.5,
    borderBottom: '1px dashed #e0e0e0',
  },
  freightTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    marginTop: 4, // Sticks totals beautifully to container bottoms
    borderTop: '2px solid #000',
  },

  /* Inline Metadata Bottom Area */
  footerMetaRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 0,
  },

  /* Signature Container Parameters */
  signatoryBox: {
    border: '1px solid #000',
    padding: 6,
    textAlign: 'center',
    justifyContent: 'space-between',
    height: 55,
    marginTop: 'auto', // Safely docks the component flush to terms container
  },

  /* Terms Panel Legibility Controls */
  termsContainer: {
    marginTop: 4,
    borderTop: '1px solid #000',
    paddingTop: 4,
  },
  termItem: {
    fontSize: 6.5,
    marginTop: 1,
    lineHeight: 1.2,
    textAlign: 'justify',
  },
});

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

const Row = ({ label, value, }) => (
  <Text style={{ marginVertical: 0.5 }}>
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
            <Text style={styles.hindiText}>
              {/* जय श्री बाला जी || जय माता दी */}
              Jai Shree Bala Ji
            </Text>
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

          </View>
        </View>

        {/* Top Summary Route Fields */}
        <View style={styles.topSummaryRow}>
          <View style={[styles.styles ? {} : styles.box, { flex: 1, marginRight: 4 }]}><Row label="GR No." value={Docket.DocketNo} /></View>
          <View style={[styles.styles ? {} : styles.box, { flex: 1, marginRight: 4 }]}><Row label="Date" value={Docket.Date} /></View>
          <View style={[styles.styles ? {} : styles.box, { flex: 1, marginRight: 4 }]}><Row label="Branch" value={Docket.Branch} /></View>
          <View style={[styles.styles ? {} : styles.box, { flex: 1, marginRight: 4 }]}><Row label="From" value={Docket.Source} /></View>
          <View style={[styles.box, { flex: 1 }]}><Row label="To" value={Docket.Destination} /></View>
        </View>

        {/* Main Workspace Frame */}
        <View style={styles.workspaceGrid}>

          {/* Master Operational Panel Area (Columns 1 & 2 + Bottom Footer Rows) */}
          <View style={styles.leftTwoThirdsBlock}>

            <View style={styles.leftColumnsRow}>

              {/* COLUMN 1: Consignor -> Consignee -> Item Details */}
              <View style={styles.leftVerticalStack}>
                <View style={[styles.box, styles.boxGrow]}>
                  <Text style={styles.sectionTitle}>Consignor Details</Text>
                  <Text style={{ fontWeight: 'bold' }}>{Docket.ConsignorName}</Text>
                  <Text style={{ fontSize: 10, marginTop: 1 }}>{Docket.ConsignorAddress}</Text>
                  <Text style={{ marginTop: 2 }}><Text style={styles.label}>GST:</Text> {Docket.ConsignorGST}</Text>
                </View>

                <View style={[styles.box, styles.boxGrow]}>
                  <Text style={styles.sectionTitle}>Consignee Details</Text>
                  <Text style={{ fontWeight: 'bold' }}>{Docket.ConsigneeName}</Text>
                  <Text style={{ fontSize: 10, marginTop: 1 }}>{Docket.ConsigneeAddress}</Text>
                  <Text style={{ marginTop: 2 }}>
                    <Text style={styles.label}>GST:</Text> {Docket.ConsigneeGST} | <Text style={styles.label}>Mob:</Text> {Docket.ConsigneeContact.split(' - ')[1]}
                  </Text>
                </View>

                <View style={[styles.box, { marginBottom: 4 }]}>
                  <Text style={styles.sectionTitle}>Item Details</Text>
                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <Text style={[styles.tableColHeader, { width: '42%' }]}>Description</Text>
                      <Text style={[styles.tableColHeader, { width: '16%' }]}>Pkgs</Text>
                      <Text style={[styles.tableColHeader, { width: '22%' }]}>Method</Text>
                      <Text style={[styles.tableColHeader, { width: '20%', borderRight: 0 }]}>Value</Text>
                    </View>
                    {Docket.ItemsList.map((item, index) => (
                      <View
                        key={index}
                        style={index === Docket.ItemsList.length - 1 ? styles.tableRowLast : styles.tableRow}
                      >
                        <Text style={[styles.tableCol, { width: '42%' }]}>{item.product}</Text>
                        <Text style={[styles.tableCol, { width: '16%' }]}>{item.pkgs}</Text>
                        <Text style={[styles.tableCol, { width: '22%' }]}>{item.method}</Text>
                        <Text style={[styles.tableCol, { width: '20%', borderRight: 0 }]}>{item.value}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              {/* COLUMN 2: Freight Structure Card */}
              <View style={styles.middleDocStack}>
                <View style={[styles.box, { flex: 1, marginBottom: 4 }]}>
                  <Text style={styles.sectionTitle}>Invoive & E-way Bill Details</Text>
                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <Text style={[styles.tableColHeader, { width: '15%', textAlign: 'center' }]}>#</Text>
                      <Text style={[styles.tableColHeader, { width: '42.5%' }]}>Invoice Number</Text>
                      <Text style={[styles.tableColHeader, { width: '42.5%', borderRight: 0 }]}>E-Way Bill</Text>
                    </View>
                    {Docket.DocumentMappings.map((doc, index) => (
                      <View
                        key={index}
                        style={index === Docket.DocumentMappings.length - 1 ? styles.tableRowLast : styles.tableRow}
                      >
                        <Text style={[styles.tableCol, { width: '15%', textAlign: 'center' }]}>{index + 1}</Text>
                        <Text style={[styles.tableCol, { width: '42.5%', fontWeight: 'bold' }]}>{doc.invoice}</Text>
                        <Text style={[styles.tableCol, { width: '42.5%', borderRight: 0 }]}>{doc.eway}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

            </View>

            {/* Bottom Metadata Storage Fields */}
            <View style={styles.footerMetaRow}>
              <View style={[styles.box, { width: '30%', marginRight: 4, marginBottom: 0, }]}>

                <Text style={{ marginVertical: 0.5,marginBottom:10 }}>
                  <Text style={styles.label}>Payment Mode:</Text> {Docket.PaymentMode || ' - '}
                </Text>
                {/* <Row label="Payment Mode" value={Docket.PaymentMode} /> */}
                <Row label="Billing Branch" value={Docket.BillingBranch} />
              </View>
              <View style={[styles.box, { width: '35%', marginRight: 4, marginBottom: 0 }]}>
                <Row label="GST Payable By" value={Docket.GSTINPayableBy} />
                <Text style={[styles.riskText, { fontSize: 9, marginTop: 10, borderTop: '1px solid #000', paddingTop: 5 }]}>
                  At Owner's Risk
                </Text>
              </View>
              <View style={[styles.box, { width: '35%', marginBottom: 0 }]}>
                <Row label="Remarks/Instructions" value={Docket.Remarks} />
              </View>
            </View>

          </View>

          {/* COLUMN 3: Right Stack Column running top-to-bottom consistently */}
          <View style={[styles.rightControlStack, { paddingLeft: 4 }]}>

            {/* Vehicle Card Container */}
            <View style={[styles.box, { marginBottom: 4 }]}>
              <Text style={styles.sectionTitle}>Vehicle Details</Text>
              <Row label="Truck Number" value={Docket.LorryNo} />
              <Row label="Ch. Wt./ Act.Wt." value={Docket.ChargedWeight + " / " + Docket.ActualWeight} />
              <Row label="Size" value={Docket.Size} />
            </View>

            {/* Document Reference Box (Fixed Column Percent Widths Prevent Any Row Compression) */}


            <View style={[styles.box, { marginBottom: 4, flex: 1 }]}>
              <Text style={styles.sectionTitle}>Freight Structure</Text>

              <View style={styles.freightRow}>
                <Text style={styles.label}>Basic Freight:</Text>
                <Text>{Docket.FreightDetails.Freight || ' - '}</Text>
              </View>
              <View style={styles.freightRow}>
                <Text style={styles.label}>Holding:</Text>
                <Text>{Docket.FreightDetails.Holding || ' - '}</Text>
              </View>
              <View style={styles.freightRow}>
                <Text style={styles.label}>Multi-Point Pick:</Text>
                <Text>{Docket.FreightDetails.MultiPointPickUp || ' - '}</Text>
              </View>
              <View style={styles.freightRow}>
                <Text style={styles.label}>Multi-Point Delv:</Text>
                <Text>{Docket.FreightDetails.MultiPointDelivery || ' - '}</Text>
              </View>
              <View style={styles.freightRow}>
                <Text style={styles.label}>Labour Charges:</Text>
                <Text>{Docket.FreightDetails.Labour || ' - '}</Text>
              </View>
              <View style={styles.freightRow}>
                <Text style={styles.label}>Docket Charges:</Text>
                <Text>{Docket.FreightDetails.DocketCharge || ' - '}</Text>
              </View>
              <View style={styles.freightRow}>
                <Text style={styles.label}>Other Charges:</Text>
                <Text>{Docket.FreightDetails.OtherCharges || ' - '}</Text>
              </View>
              <View style={styles.freightRow}>
                <Text style={styles.label}>Sub Total:</Text>
                <Text>{Docket.FreightDetails.SubTotal || ' - '}</Text>
              </View>
              <View style={styles.freightRow}>
                <Text style={styles.label}>State Tax:</Text>
                <Text>{Docket.FreightDetails.OtherStateTax || ' - '}</Text>
              </View>
              <View style={styles.freightRow}>
                <Text style={styles.label}>GST Amount:</Text>
                <Text>{Docket.FreightDetails.GST || ' - '}</Text>
              </View>

              {/* Grand Total Row - Renders immediately underneath last element */}
              <View style={styles.freightTotalRow}>
                <Text style={[styles.label, { fontSize: 11.5 }]}>Grand Total:</Text>
                <Text style={[styles.label, { fontSize: 11.5 }]}>₹{Docket.FreightDetails.GrandTotal}</Text>
              </View>
            </View>

            {/* Authorized Signature Card Block */}
            <View style={styles.signatoryBox}>
              <Text style={{ fontWeight: 'bold', fontSize: 10 }}>For KAUSHIK TRANSPORT COMPANY</Text>
              <Text style={{ fontSize: 9.5, fontStyle: 'italic' }}>Authorized Signatory</Text>
            </View>
          </View>

        </View>

        {/* Global Footer Terms Container */}
        <View style={styles.termsContainer}>
          <Text style={[styles.label, { fontSize: 8.5, marginBottom: 1, textAlign: 'center' }]}>
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