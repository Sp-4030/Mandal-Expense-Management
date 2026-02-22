import React, { useEffect, useState } from "react";
import axios from "axios";
import auth from "../utils/auth";
import { mandalname } from "../pages/Pdfs";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import NotoSansDevanagari from "../fonts/NotoSansDevanagari-Regular.ttf";

// Register font
Font.register({ family: "NotoSansDevanagari", src: NotoSansDevanagari });

// ------------------ Purple Theme ------------------
const THEME = {
  pageBackground: "#f5f3ff",    // light purple page
  headerLine: "#7c3aed",        // deep purple bottom line
  title: "#5b21b6",             // dark purple title
  subtitle: "#6d28d9",          // subtitle
  tableHeader: "#a78bfa",       // table header
  rowEven: "#ede9fe",           // even rows
  rowOdd: "#ffffff",            // odd rows
  footerBackground: "#c4b5fd",  // footer background
  footerText: "#5b21b6",        // footer text
};

// ------------------ Styles ------------------
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "NotoSansDevanagari",
    backgroundColor: THEME.pageBackground,
  },
  headerContainer: {
    borderBottom: `4pt solid ${THEME.headerLine}`,
    paddingBottom: 12,
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
    color: THEME.title,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 4,
    color: THEME.subtitle,
  },
  table: {
    display: "table",
    width: "100%",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  headerRow: {
    backgroundColor: THEME.tableHeader,
  },
  tableColIndex: { width: "8%", border: "1pt solid #d1d5db", padding: 6 },
  tableColName: { width: "60%", border: "1pt solid #d1d5db", padding: 6 },
  tableColPerson: { width: "30%", border: "1pt solid #d1d5db", padding: 6 },
  tableColAmount: { width: "12%", border: "1pt solid #d1d5db", padding: 6 },
  tableCellHeader: { fontSize: 12, fontWeight: "bold", textAlign: "center", color: "#ffffff" },
  tableCell: { fontSize: 11, color: "#1f2937" },
  tableCellAmount: { fontSize: 11, textAlign: "right", color: "#1f2937", paddingRight: 4 },
  footerRow: { flexDirection: "row", backgroundColor: THEME.footerBackground, borderRadius: 6, marginTop: 12 },
  footerCol: { width: "33.33%", padding: 8, fontSize: 12, fontWeight: "bold", textAlign: "center", color: THEME.footerText },
});

// ------------------ Component ------------------
const Form4Pdf = () => {
  const [data, setData] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    auth.loadToken();
    axios
      .get("http://localhost:8080/api/donations/all")
      .then((res) => {
        setData(res.data);
        setApiError(false);
      })
      .catch(() => setApiError(true));
  }, []);

  const totalAmount = data.reduce((sum, item) => sum + (item.amount || 0), 0);

  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{mandalname}</Text>
          <Text style={styles.subtitle}>प्रसाद देणगी</Text>
        </View>

        {/* Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.headerRow]}fixed>
            <View style={styles.tableColIndex}>
              <Text style={styles.tableCellHeader}>आ. क्र.</Text>
            </View>
            <View style={styles.tableColName}>
              <Text style={styles.tableCellHeader}>नाव</Text>
            </View>
            <View style={styles.tableColPerson}>
              <Text style={styles.tableCellHeader}>ठरीवनारा व आणारयांचे नावे</Text>
            </View>
            <View style={styles.tableColAmount}>
              <Text style={styles.tableCellHeader}>रक्कम (₹)</Text>
            </View>
          </View>

          {/* Table Data */}
          {apiError ? (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>डेटा लोड करण्यात अयशस्वी...</Text>
            </View>
          ) : (
            data.map((item, idx) => (
              <View
                key={idx}
                style={[
                  styles.tableRow,
                  {
                    backgroundColor: idx % 2 === 0 ? THEME.rowEven : THEME.rowOdd,
                  },
                ]}
                wrap={false}
              >
                <View style={styles.tableColIndex}>
                  <Text style={styles.tableCell}>{idx + 1}</Text>
                </View>
                <View style={styles.tableColName}>
                  <Text style={styles.tableCell}>{item.name}</Text>
                </View>
                <View style={styles.tableColPerson}>
                  <Text style={styles.tableCell}>{item.person}</Text>
                </View>
                <View style={styles.tableColAmount}>
                  <Text style={styles.tableCellAmount}>{item.amount}</Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Footer */}
        <View style={styles.footerRow}>
          <View style={styles.footerCol}>
            <Text>एकूण</Text>
          </View>
          <View style={styles.footerCol}></View>
          <View style={styles.footerCol}>
            <Text>₹{totalAmount}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <PDFViewer style={{ width: "100%", height: "100%" }}>{MyDocument}</PDFViewer>
    </div>
  );
};

export default Form4Pdf;
