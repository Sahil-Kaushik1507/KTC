import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 15,
    backgroundColor: '#fff',
    flexDirection: 'column',
    fontSize: 9,
    fontFamily: 'Helvetica',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottom: '1px solid #000',
    paddingBottom: 4,
    marginBottom: 6,
  },
  logo: {
    width: 150,
    height: 100,
    marginRight: 10,
   
  },
  headerTextContainer: {
    flex: 2,
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 9,
    marginTop: 2,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  box: {
    flex: 1,
    border: '1px solid #000',
    padding: 5,
    margin: 1,
  },
  label: {
    fontWeight: 'bold',
  },
  table: {
    display: 'table',
    width: '100%',
    border: '1px solid #000',
    marginTop: 5,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '16.6%',
    borderRight: '1px solid #000',
    backgroundColor: '#f0f0f0',
    padding: 2,
    fontWeight: 'bold',
  },
  tableCol: {
    width: '16.6%',
    borderRight: '1px solid #000',
    padding: 2,
  },
  tableText: {
    fontSize: 8,
  },
  footer: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 8,
  },
});

const Docket = {
  DocketNo: "6605",
  Branch: "Haridwar",
  Date: "28/10/2025",
  TruckNo: "UK08A 5566",
  ConsignorName: "ABC Traders",
  ConsignorAddress: "12 Industrial Area, Delhi",
  ConsigneeName: "XYZ Retail Pvt. Ltd.",
  ConsigneeAddress: "45 Mall Road, Gurugram",
  Product: "Electrical Goods",
  TotalPackages: "25",
  ActualWeight: "1800 kg",
  Freight: "₹3500",
  Labour: "₹200",
  OtherCharges: "₹100",
  TotalAmount: "₹3800",
  PaymentMode: "To Pay",
  Remarks: "Handle with care",
};

// Row component
const Row = ({ label, value }) => (
  <Text>
    <Text style={styles.label}>{label}:</Text> {value || '-'}
  </Text>
);

export default function DocketPDF() {
  return (
    <Document>
      <Page size="A4"  style={styles.page}>

        {/* Header with Logo */}
        <View style={styles.headerContainer}>
          {/* 🖼️ Replace with your actual logo path or URL */}
          <Image
            style={styles.logo}
            // src="/Logo-png.png"
            src="/KTCLogo.png"
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>KAUSHIK TRANSPORT COMPANY (REGD.)</Text>
            <Text style={styles.subHeader}>
              H.O.: Kaushik House, Transport Nagar, Jwalapur, Haridwar (U.K)
            </Text>
            <Text style={styles.subHeader}>
              Mob: 8077958775, 9720169680 | Email: ktc.haridwar@gmail.com
            </Text>
          </View>
        </View>

        {/* Top Summary */}
        <View style={styles.sectionRow}>
          <View style={styles.box}><Row label="GR No." value={Docket.DocketNo} /></View>
          <View style={styles.box}><Row label="Date" value={Docket.Date} /></View>
          <View style={styles.box}><Row label="Branch" value={Docket.Branch} /></View>
          <View style={styles.box}><Row label="Truck No" value={Docket.TruckNo} /></View>
          <View style={styles.box}><Row label="Payment" value={Docket.PaymentMode} /></View>
        </View>

        {/* Consignor & Consignee */}
        <View style={styles.sectionRow}>
          <View style={[styles.box, { flex: 1 }]}>
            <Text style={styles.label}>Consignor</Text>
            <Text>{Docket.ConsignorName}</Text>
            <Text>{Docket.ConsignorAddress}</Text>
          </View>
          <View style={[styles.box, { flex: 1 }]}>
            <Text style={styles.label}>Consignee</Text>
            <Text>{Docket.ConsigneeName}</Text>
            <Text>{Docket.ConsigneeAddress}</Text>
          </View>
        </View>

        {/* Goods Table */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Description</Text>
            <Text style={styles.tableColHeader}>Total Pkgs</Text>
            <Text style={styles.tableColHeader}>Actual Wt.</Text>
            <Text style={styles.tableColHeader}>Freight</Text>
            <Text style={styles.tableColHeader}>Labour</Text>
            <Text style={styles.tableColHeader}>Other Ch.</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>{Docket.Product}</Text>
            <Text style={styles.tableCol}>{Docket.TotalPackages}</Text>
            <Text style={styles.tableCol}>{Docket.ActualWeight}</Text>
            <Text style={styles.tableCol}>{Docket.Freight}</Text>
            <Text style={styles.tableCol}>{Docket.Labour}</Text>
            <Text style={styles.tableCol}>{Docket.OtherCharges}</Text>
          </View>
        </View>

        {/* Footer Info */}
        <View style={styles.sectionRow}>
          <View style={styles.box}>
            <Row label="Total Amount" value={Docket.TotalAmount} />
            <Row label="Remarks" value={Docket.Remarks} />
          </View>
          <View style={styles.box}>
            <Text>For KAUSHIK TRANSPORT COMPANY</Text>
            <Text style={{ marginTop: 20 }}>Authorized Signatory</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Subject to Haridwar Jurisdiction | Kindly do not deduct TDS under Section 194C of I.T. Act 1961
        </Text>
      </Page>
    </Document>
  );
}
