import React from 'react'
import { Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import {styles } from './pdfStyle'

export default function PDFPage({copy, docketData}) {


console.log("pdf page----",docketData)
    const Row = ({ label, value, }) => (
      <Text style={{ marginVertical: 0.5 }}>
        <Text style={styles.label}>{label}:</Text> {value || ' - '}
      </Text>
    );

  return (
   <Page size="A4" style={styles.page} orientation="landscape">
   
           {/* Header Block */}
           <View style={styles.headerContainer}>
             <Image style={styles.logo} src="/Images/logo/Logo-png-1.png" />
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
               <Text style={styles.riskText}>{copy} COPY</Text>
   
             </View>
           </View>
   
           {/* Top Summary Route Fields */}
           <View style={styles.topSummaryRow}>
             <View style={[styles.styles ? {} : styles.box, { flex: 1, marginRight: 4 }]}><Row label="GR No." value={docketData.docket_no} /></View>
             <View style={[styles.styles ? {} : styles.box, { flex: 1, marginRight: 4 }]}><Row label="Date" value={docketData.docket_date} /></View>
             <View style={[styles.styles ? {} : styles.box, { flex: 1, marginRight: 4 }]}><Row label="Branch" value={docketData.bookingBranch} /></View>
             <View style={[styles.styles ? {} : styles.box, { flex: 1, marginRight: 4 }]}><Row label="From" value={docketData.source} /></View>
             <View style={[styles.box, { flex: 1 }]}><Row label="To" value={docketData.destination} /></View>
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
                     <Text style={{ fontWeight: 'bold' }}>{docketData.consignorDetails.consignor_party_name}</Text>
                     <Text style={{ fontSize: 10, marginTop: 1 }}>{docketData.consignorDetails.consignor_address}</Text>
                     <Text style={{ marginTop: 2 }}><Text style={styles.label}>GST:</Text> {docketData.consignorDetails.consignor_gst_no}</Text>
                   </View>
   
                   <View style={[styles.box, styles.boxGrow]}>
                     <Text style={styles.sectionTitle}>Consignee Details</Text>
                     <Text style={{ fontWeight: 'bold' }}>{docketData.consigneeDetails.consignee_party_name}</Text>
                     <Text style={{ fontSize: 10, marginTop: 1 }}>{docketData.consigneeDetails.consignee_address}</Text>
                     <Text style={{ marginTop: 2 }}>
                       <Text style={styles.label}>GST:</Text> {docketData.consigneeDetails.consignee_gst_no} | <Text style={styles.label}>Mob:</Text> {docketData.consigneeDetails.consignee_contact_number}
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
                       {docketData.docket_items.map((item, index) => (
                         <View
                           key={index}
                           style={index === docketData.docket_items.length - 1 ? styles.tableRowLast : styles.tableRow}
                         >
                           <Text style={[styles.tableCol, { width: '42%' }]}>{item.product_name}</Text>
                           <Text style={[styles.tableCol, { width: '16%' }]}>{item.total_packages}</Text>
                           <Text style={[styles.tableCol, { width: '22%' }]}>{item.packaging_method}</Text>
                           <Text style={[styles.tableCol, { width: '20%', borderRight: 0 }]}>{item.declared_value}</Text>
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
                       {docketData.eway_bills.map((doc, index) => (
                         <View
                           key={index}
                           style={index === docketData.eway_bills.length - 1 ? styles.tableRowLast : styles.tableRow}
                         >
                           <Text style={[styles.tableCol, { width: '15%', textAlign: 'center' }]}>{index + 1}</Text>
                           <Text style={[styles.tableCol, { width: '42.5%', fontWeight: 'bold' }]}>{doc.invoice_no}</Text>
                           <Text style={[styles.tableCol, { width: '42.5%', borderRight: 0 }]}>{doc.eway_bill_no}</Text>
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
                     <Text style={styles.label}>Payment Mode:</Text> {docketData.payment_mode || ' - '}
                   </Text>
                   {/* <Row label="Payment Mode" value={docketData.PaymentMode} /> */}
                   <Row label="Billing Branch" value={docketData.billingBranch} />
                 </View>
                 <View style={[styles.box, { width: '35%', marginRight: 4, marginBottom: 0 }]}>
                   <Row label="GST Payable By" value={docketData.gstin_payable_by} />
                   <Text style={[styles.riskText, { fontSize: 9, marginTop: 10, borderTop: '1px solid #000', paddingTop: 5 }]}>
                     At Owner's Risk
                   </Text>
                 </View>
                 <View style={[styles.box, { width: '35%', marginBottom: 0 }]}>
                   <Row label="Remarks/Instructions" value={docketData.remarks} />
                 </View>
               </View>
   
             </View>
   
             {/* COLUMN 3: Right Stack Column running top-to-bottom consistently */}
             <View style={[styles.rightControlStack, { paddingLeft: 4 }]}>
   
               {/* Vehicle Card Container */}
               <View style={[styles.box, { marginBottom: 4 }]}>
                 <Text style={styles.sectionTitle}>Vehicle Details</Text>
                 <Row label="Truck Number" value={docketData.truck_details.truck_no} />
                 <Row label="Ch. Wt./ Act.Wt." value={docketData.charged_weight + " / " + docketData.truck_details.actual_weight} />
                 <Row label="Size" value={docketData.truck_details.size} />
                 <Row label="Seal No" value={docketData.seal_no} />
               </View>
   
               {/* Document Reference Box (Fixed Column Percent Widths Prevent Any Row Compression) */}
   
   
               <View style={[styles.box, { marginBottom: 4, flex: 1 }]}>
                 <Text style={styles.sectionTitle}>Freight Structure</Text>
   
                 <View style={styles.freightRow}>
                   <Text style={styles.label}>Freight:</Text>
                   <Text>{docketData.party_freight.freightamt || ' - '}</Text>
                 </View>
                 <View style={styles.freightRow}>
                   <Text style={styles.label}>Holding:</Text>
                   <Text>{docketData.party_freight.holding || ' - '}</Text>
                 </View>
                 <View style={styles.freightRow}>
                   <Text style={styles.label}>Multi-Point Pick:</Text>
                   <Text>{docketData.party_freight.multipoint_pickup || ' - '}</Text>
                 </View>
                 <View style={styles.freightRow}>
                   <Text style={styles.label}>Multi-Point Delv:</Text>
                   <Text>{docketData.party_freight.multipoint_delivery || ' - '}</Text>
                 </View>
                 <View style={styles.freightRow}>
                   <Text style={styles.label}>Labour Charges:</Text>
                   <Text>{docketData.party_freight.labour || ' - '}</Text>
                 </View>
                 <View style={styles.freightRow}>
                   <Text style={styles.label}>docketData Charges:</Text>
                   <Text>{docketData.party_freight.docket_charge || ' - '}</Text>
                 </View>
                 <View style={styles.freightRow}>
                   <Text style={styles.label}>Other Charges:</Text>
                   <Text>{docketData.party_freight.other_charges || ' - '}</Text>
                 </View>
                 <View style={styles.freightRow}>
                   <Text style={styles.label}>Sub Total:</Text>
                   <Text>{docketData.party_freight.SubTotal || ' - '}</Text>
                 </View>
                 <View style={styles.freightRow}>
                   <Text style={styles.label}>State Tax:</Text>
                   <Text>{docketData.party_freight.OtherStateTax || ' - '}</Text>
                 </View>
                 <View style={styles.freightRow}>
                   <Text style={styles.label}>GST Amount:</Text>
                   <Text>{docketData.party_freight.GST || ' - '}</Text>
                 </View>
   
                 {/* Grand Total Row - Renders immediately underneath last element */}
                 <View style={styles.freightTotalRow}>
                   <Text style={[styles.label, { fontSize: 11.5 }]}>Grand Total:</Text>
                   <Text style={[styles.label, { fontSize: 11.5 }]}>₹{docketData.party_freight.GrandTotal}</Text>
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
               1) Shipment shall not be detained, diverted, or re-routed without the written approval of the consignor or consignee, and delivery will be made only at the destination mentioned in this docketData.
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
  )
}
