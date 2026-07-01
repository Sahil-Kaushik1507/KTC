import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'column',
    fontSize: 9, // Slightly reduced base size for high data density safely fitting one page
    fontFamily: 'Helvetica',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottom: '1px solid #000',
    paddingBottom: 6,
    marginBottom: 8,
  },
  logo: {
    width: 140,
    height: 60,
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 9,
    marginTop: 1,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  copyBox: {
    border: '2px solid #000', 
    padding: 5,
    justifyContent: 'center', 
    alignItems: 'center',    
  },
  riskText: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  box: {
    flex: 1,
    border: '1px solid #000',
    padding: 5,
    margin: 1,
  },
  truckdetails: {
    flex: 1.2,
    border: '1px solid #000',
    padding: 5,
    margin: 1,
    justifyContent: 'space-between'
  },
  label: {
    fontWeight: 'bold',
  },
  size2: {
    fontSize: 11,
    marginBottom: 2,
  },

  /* Clean Two-Column Setup for Dynamic Body Area */
  mainBodySection: {
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 4,
  },
  leftDataPanel: {
    width: '73%',
    marginRight: '1%',
  },
  rightFreightPanel: {
    width: '26%',
    border: '1px solid #000',
    padding: 5,
  },

  /* Refactored Dynamic Table Layout */
  table: {
    width: '100%',
    border: '1px solid #000',
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #000',
  },
  tableRowLast: {
    flexDirection: 'row',
  },
  tableColHeader: {
    backgroundColor: '#f0f0f0',
    padding: 4,
    fontWeight: 'bold',
    borderRight: '1px solid #000',
  },
  tableCol: {
    padding: 4,
    borderRight: '1px solid #000',
  },
  colLast: {
    borderRight: 0,
  },

  /* Document Grid for Invoices and E-way bills */
  docGridContainer: {
    border: '1px solid #000',
    padding: 5,
    marginTop: 2,
  },
  docGridRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  docGridLabel: {
    width: '15%',
    fontWeight: 'bold',
  },
  docGridValue: {
    width: '85%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badgeText: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 4,
    paddingVertical: 1,
    marginRight: 4,
    marginBottom: 2,
    border: '1px solid #ccc',
    fontSize: 8.5,
  },

  /* Freight Line Items */
  freightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 1,
  },
  freightTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
    marginTop: 2,
    borderTop: '1px solid #000',
    fontWeight: 'bold',
  },

  /* Footers & Terms */
  footer: {
    textAlign: 'center',
    marginTop: 4,
    fontSize: 8.5,
  },
  termsContainer: {
    marginTop: 4,
    borderTop: '1px solid #000',
    paddingTop: 4,
  },
  termItem: {
    fontSize: 8,
    marginTop: 1,
    lineHeight: 1.2,
    textAlign: 'justify',
  },
});

// Mocked Multi-item data structures matching your live environment 
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

  // 1. Array implementation for items list (Supports 3-4 dynamic records cleanly)
  ItemsList: [
    { product: "Industrial Spare Parts", pkgs: "25", method: "Wooden Crates", value: "₹4,50,000" },
    { product: "Hydraulic Pumps", pkgs: "10", method: "Box Packing", value: "₹2,10,000" },
    { product: "Control Panels", pkgs: "05", method: "Wooden Pallets", value: "₹3,20,000" },
  ],

  // 2. Array layout for multiple structural elements (Supports up to 8-10 items seamlessly)
  InvoiceNumbers: ["INV/2025/1123", "INV/2025/1124", "INV/2025/1125", "INV/2025/1126"],
  EwayBillNumbers: [
    "321005445667", "321005445668", "321005445669", 
    "321005445670", "321005445671", "321005445672",
    "321005445673", "321005445674", "321005445675"
  ],

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
  PaymentMode: "To Pay",
  BillingBranch: "Pune Branch",
  GSTINPayableBy: "Consignor",
  Remarks: "Handle with care – fragile items.",
};

const Row = ({ label, value }) => (
  <Text>
    <Text style={styles.label}>{label}:</Text> {value || ' - '}
  </Text>
);

export default function DocketPDF() {
  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">

        {/* Header */}
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
          <View style={{ justifyContent: 'center' }}>
            <View style={styles.copyBox}>
              <Text style={styles.riskText}>TRANSPORTER COPY</Text>
              <Text style={[styles.riskText, { fontSize: 8, marginTop: 4, borderTop: '1px solid #000', paddingTop: 2 }]}>
                At Owner's Risk
              </Text>
            </View>
          </View>
        </View>

        {/* Top Summary */}
        <View style={styles.sectionRow}>
          <View style={styles.box}><Row label="GR No." value={Docket.DocketNo} /></View>
          <View style={styles.box}><Row label="Date" value={Docket.Date} /></View>
          <View style={styles.box}><Row label="Branch" value={Docket.Branch} /></View>
          <View style={styles.box}><Row label="From" value={Docket.Source} /></View>
          <View style={styles.box}><Row label="To" value={Docket.Destination} /></View>
        </View>

        {/* Consignor & Consignee */}
        <View style={styles.sectionRow}>
          <View style={[styles.box, { flex: 2 }]}>
            <Text style={[styles.label, styles.size2]}>Consignor</Text>
            <Text style={{ fontWeight: 'bold' }}>{Docket.ConsignorName}</Text>
            <Text>{Docket.ConsignorAddress}</Text>
            <Text style={{ marginTop: 2 }}><Text style={styles.label}>GST:</Text> {Docket.ConsignorGST}</Text>
          </View>

          <View style={[styles.box, { flex: 2 }]}>
            <Text style={[styles.label, styles.size2]}>Consignee</Text>
            <Text style={{ fontWeight: 'bold' }}>{Docket.ConsigneeName}</Text>
            <Text>{Docket.ConsigneeAddress}</Text>
            <Text style={{ marginTop: 2 }}><Text style={styles.label}>GST:</Text> {Docket.ConsigneeGST} | <Text style={styles.label}>Contact:</Text> {Docket.ConsigneeContact}</Text>
          </View>

          <View style={styles.truckdetails}>
            <Text style={[styles.label, styles.size2]}>Dispatch Vehicle</Text>
            <Row label="Truck No" value={Docket.LorryNo} />
            <Row label="Act. Wt." value={Docket.ActualWeight} />
            <Row label="Charged Wt./Size" value={Docket.Size} />
          </View>
        </View>

        {/* Main Operational Container */}
        <View style={styles.mainBodySection}>
          
          {/* LEFT: Product Table + Invoices/Eway Panel */}
          <View style={styles.leftDataPanel}>
            
            {/* Dynamic Items Table */}
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableColHeader, { width: '45%' }]}>Description of Goods</Text>
                <Text style={[styles.tableColHeader, { width: '15%' }]}>Total Pkgs</Text>
                <Text style={[styles.tableColHeader, { width: '20%' }]}>Method of Pkg</Text>
                <Text style={[styles.tableColHeader, { width: '20%', borderRight: 0 }]}>Declared Value</Text>
              </View>

              {Docket.ItemsList.map((item, index) => (
                <View 
                  key={index} 
                  style={index === Docket.ItemsList.length - 1 ? styles.tableRowLast : styles.tableRow}
                >
                  <Text style={[styles.tableCol, { width: '45%' }]}>{item.product}</Text>
                  <Text style={[styles.tableCol, { width: '15%' }]}>{item.pkgs}</Text>
                  <Text style={[styles.tableCol, { width: '20%' }]}>{item.method}</Text>
                  <Text style={[styles.tableCol, { width: '20%', borderRight: 0 }]}>{item.value}</Text>
                </View>
              ))}
            </View>

            {/* Dynamic Invoice and E-way list container */}
            <View style={styles.docGridContainer}>
              <View style={styles.docGridRow}>
                <Text style={styles.docGridLabel}>Invoices:</Text>
                <View style={styles.docGridValue}>
                  {Docket.InvoiceNumbers.map((inv, idx) => (
                    <Text key={idx} style={styles.badgeText}>{inv}</Text>
                  ))}
                </View>
              </View>
              
              <View style={[styles.docGridRow, { marginBottom: 0 }]}>
                <Text style={styles.docGridLabel}>E-Way Bills:</Text>
                <View style={styles.docGridValue}>
                  {Docket.EwayBillNumbers.map((bill, idx) => (
                    <Text key={idx} style={styles.badgeText}>{bill}</Text>
                  ))}
                </View>
              </View>
            </View>

          </View>

          {/* RIGHT: Safe Freight Summary Area */}
          <View style={styles.rightFreightPanel}>
            <Text style={[styles.label, { borderBottom: '1px solid #000', paddingBottom: 2, marginBottom: 3 }]}>
              Freight Structure
            </Text>
            <View style={styles.freightRow}><Row label="Freight" value={Docket.FreightDetails.Freight} /></View>
            <View style={styles.freightRow}><Row label="Multi-Pick" value={Docket.FreightDetails.MultiPointPickUp} /></View>
            <View style={styles.freightRow}><Row label="Multi-Delv" value={Docket.FreightDetails.MultiPointDelivery} /></View>
            <View style={styles.freightRow}><Row label="Labour" value={Docket.FreightDetails.Labour} /></View>
            <View style={styles.freightRow}><Row label="Docket Chg" value={Docket.FreightDetails.DocketCharge} /></View>
            <View style={styles.freightRow}><Row label="Other Chg" value={Docket.FreightDetails.OtherCharges} /></View>
            <View style={styles.freightRow}><Row label="Sub Total" value={Docket.FreightDetails.SubTotal} /></View>
            <View style={styles.freightRow}><Row label="State Tax" value={Docket.FreightDetails.OtherStateTax} /></View>
            <View style={styles.freightRow}><Row label="GST" value={Docket.FreightDetails.GST} /></View>
            <View style={styles.freightTotalRow}>
              <Text style={styles.label}>Grand Total:</Text>
              <Text style={styles.label}>₹{Docket.FreightDetails.GrandTotal}</Text>
            </View>
          </View>

        </View>

        {/* Footer Section */}
        <View style={styles.sectionRow}>
          <View style={styles.box}>
            <Row label="Payment Mode" value={Docket.PaymentMode} />
            <Row label="Billing Branch" value={Docket.BillingBranch} />
            <Row label="GST Payable By" value={Docket.GSTINPayableBy} />
          </View>
          <View style={styles.box}>
            <Row label="Remarks" value={Docket.Remarks} />
          </View>
          <View style={[styles.box, { textAlign: 'center', justifyContent: 'space-between' }]}>
            <Text style={{ fontWeight: 'bold' }}>For KAUSHIK TRANSPORT COMPANY</Text>
            <Text style={{ marginTop: 15, fontSize: 8, fontStyle: 'italic' }}>Authorized Signatory</Text>
          </View>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.termsContainer}>
          <Text style={[styles.footer, styles.label]}>
            This G.C. Note is issued subject to the following Terms & Conditions:
          </Text>
          <Text style={styles.termItem}>
            1. Shipment shall not be detained, diverted, or re-routed without written approval of the consignor/consignee. 
            2. All goods are carried entirely at owner’s risk; company isn't liable for losses via natural causes, fire, or theft.
            3. Perishables or fragile structures are accepted strictly at owner's vulnerability. 
            4. No Valuables/gold or contraband items allowed. 
            5. Free storage window is 24 hrs post-arrival; subsequent demurrage applies at ₹2/quintal/day.
            6. Non-delivery resolution via auction process occurs after 2 months. 
            7. No TDS deduction applicable under Sec 194C. 
            8. All disputes fall under Haridwar jurisdiction.
          </Text>
        </View>
      </Page>
    </Document>
  );
}