import { StyleSheet} from '@react-pdf/renderer';


export const  styles = StyleSheet.create({
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
