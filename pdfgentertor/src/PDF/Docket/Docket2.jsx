import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'column',
    fontSize: 11,
    fontFamily: 'Helvetica',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottom: '1px solid #000',
    paddingBottom: 6,
    marginBottom: 10,
  },
  logo: {
    width: 160,
    height: 70,
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 2,
    textAlign: 'center',
    
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 10,
    marginTop: 2,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },

  copyBox:{

    display: 'flex',
   justifyContent: 'center', 
    alignItems: 'center',     
    border: '3px solid #000', 
    padding:5,
      //  height: 40,               
      // width: '17%',  
  // marginLeft:10,      

  },

  truckdetails:{
  flex: 1,
  border: '1px solid #000',
  padding: 6,
  margin: 1,
  height: 50,        
  justifyContent: 'flex-start'
  },

freightSection: {
    marginLeft: 10,
  width: 160,
  // minHeight: 150,
  position:"absolute",
  top:-25,      
  // justifyContent: 'space-between',
  },

  box: {
    flex: 1,
    border: '1px solid #000',
    padding: 6,
    margin: 1,
  },

  label: {
    fontWeight: 'bold',
  },

  size2: {
    fontSize: 12,
  },

  Item_Freight_InvoiceSection: {
    display: 'flex',
    flexDirection: 'row',
  },
  productSection: {
    width: 630,
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-evenly'
  },

  table: {
    display: 'table',
    width: '90%',
    border: '1px solid #000',
    marginTop: 6,
    marginBottom: 6,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '25%',
    borderRight: '1px solid #000',
    backgroundColor: '#f0f0f0',
    padding: 3,
    fontWeight: 'bold',
    fontSize: 10,
  },
  tableCol: {
    width: '25%',
    borderRight: '1px solid #000',
    padding: 3,
    fontSize: 10,
  },

riskBox: {
  display: 'flex',
  justifyContent: 'center', 
  alignItems: 'center',     
  border: '1px solid #000', 
  height: 40,               
  width: '17%',  
  marginLeft:10,          

},

riskText: {
  fontSize: 11,
  fontWeight: 'bold',
  textAlign: 'center',
},


  

  footer: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 9,
  },
  termsContainer: {
    marginTop: 6,
    borderTop: '1px solid #000',
    paddingTop: 6,
  },
  termItem: {
    fontSize: 9,
    marginTop: 2,
    lineHeight: 1.4,
    textAlign: 'justify',
  },
});

// Sample Data

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


// Row Component
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
          <View>
              <View style={styles.copyBox}>
                <Text style={styles.riskText}>TRANSPORTER COPY</Text>
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
            <Text>{Docket.ConsignorName}</Text>
            <Text>{Docket.ConsignorAddress}</Text>
            <Text><Text style={styles.label}>GST:</Text> {Docket.ConsignorGST}</Text>
          </View>

          <View style={[styles.box, { flex: 2 }]}>
            <Text style={[styles.label, styles.size2]}>Consignee</Text>
            <Text>{Docket.ConsigneeName}</Text>
            <Text>{Docket.ConsigneeAddress}</Text>
            <Text><Text style={styles.label}>GST:</Text> {Docket.ConsigneeGST}</Text>
            <Text><Text style={styles.label}>Contact:</Text> {Docket.ConsigneeContact}</Text>
          </View>

          <View style={styles.truckdetails}>
            <Row label="Truck No" value={Docket.LorryNo} />
            {/* <Row label="Size" value= /> */}
            <Row label="Act. Wt." value={Docket.ActualWeight} />
            <Row label="Chargerd Wt./ Size" value={Docket.Size} />
          </View>
        </View>

        <View style={styles.Item_Freight_InvoiceSection}>
          <View style={styles.productSection}>

            <View style={styles.itemDetails}>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableColHeader}>Description</Text>
                  <Text style={styles.tableColHeader}>Total Pkgs</Text>
                  <Text style={styles.tableColHeader}>Method of Pkg</Text>
                  <Text style={styles.tableColHeader}>Declared Value</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCol}>{Docket.Product}</Text>
                  <Text style={styles.tableCol}>{Docket.TotalPackages}</Text>
                  <Text style={styles.tableCol}>{Docket.MethodOfPkg}</Text>
                  <Text style={styles.tableCol}>{Docket.DeclaredValue}</Text>

                </View>
              </View>
              <View style={styles.riskBox}>
                <Text style={styles.riskText}>At Owner's Risk</Text>
              </View>
            </View>
            {/* Eway Bill */}
            <View style={styles.sectionRow}>
              <View style={styles.box}><Row label="Invoice No." value={Docket.InvoiceNo} /></View>
            </View>
            <View style={styles.sectionRow}>
              <View style={styles.box}><Row label="Eway Bill No." value={Docket.EwayBillNo} /></View>
            </View>

          </View>

          <View>
            <View style={[styles.box, styles.freightSection]}>
              <Row label="Freight" value={Docket.FreightDetails.Freight} />
              <Row label="MultiPoint PickUp" value={Docket.FreightDetails.MultiPointPickUp} />
              <Row label="MultiPoint Delivery" value={Docket.FreightDetails.MultiPointDelivery} />
              <Row label="Labour" value={Docket.FreightDetails.Labour} />
              <Row label="Docket Charge" value={Docket.FreightDetails.DocketCharge} />
              <Row label="Other Charges" value={Docket.FreightDetails.OtherCharges} />
              <Row label="Sub Total" value={Docket.FreightDetails.SubTotal} />
              <Row label="Other State Tax" value={Docket.FreightDetails.OtherStateTax} />
              <Row label="GST" value={Docket.FreightDetails.GST} />
              <Row label="Grand Total" value={Docket.FreightDetails.GrandTotal} />
            </View>
          </View>


        </View>

        {/* Footer Section */}
        <View style={styles.sectionRow}>
          <View style={styles.box}>
            <Row label="Amount" value=" " />
            <Row label="Payment Mode" value={Docket.PaymentMode} />
            <Row label="Billing Branch" value={Docket.BillingBranch} />
            <Row label="GST Payble By" value={Docket.GSTINPayableBy} />
          </View>
          <View style={styles.box}>
            <Row label="Remarks" value={Docket.Remarks} />
          </View>
          <View style={styles.box}>
            <Text>For KAUSHIK TRANSPORT COMPANY</Text>
            <Text style={{ marginTop: 25 }}>Authorized Signatory</Text>
          </View>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.termsContainer}>
          <Text style={[styles.footer, styles.label]}>
            This G.C. Note is issued subject to the following Terms & Conditions:
          </Text>

          <Text style={styles.termItem}>
            1. Shipment shall not be detained, diverted, or re-routed without the written approval of the consignor or consignee, and delivery will be made only at the destination mentioned in this docket.
          </Text>
          <Text style={styles.termItem}>
            2. All goods are carried entirely at the consignor’s/owner’s risk, and the company is not responsible for any loss or damage due to natural causes, accidents, theft, fire, leakage, or other unavoidable events.
          </Text>
          <Text style={styles.termItem}>
            3. Perishable, fragile, or liquid goods are accepted strictly at the owner’s risk.
          </Text>
          <Text style={styles.termItem}>
            4. The company does not accept valuables (gold, jewelry, documents, etc.) or prohibited/inflammable items unless properly declared and permitted.
          </Text>
          <Text style={styles.termItem}>
            5. The consignee must collect goods within 24 hours of arrival; demurrage charges of ₹2 per quintal per day on billed weight will apply after 15 days or beyond the permitted free period.
          </Text>
          <Text style={styles.termItem}>
            6. Undelivered consignments may be disposed of by auction after two months, or after two days in the case of perishables.
          </Text>
          <Text style={styles.termItem}>
            7. The company reserves the right to delay, detain, or cancel transport or delivery without prior notice.
          </Text>
          <Text style={styles.termItem}>
            8. No TDS deduction under Section 194C of the Income Tax Act, 1961 shall be made on transportation charges.
          </Text>
          <Text style={styles.termItem}>
            9. All disputes are subject to District Court, Haridwar jurisdiction Only.
          </Text>

        </View>
      </Page>
    </Document>
  );
}
