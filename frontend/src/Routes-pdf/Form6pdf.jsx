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

// Register Devanagari font
Font.register({ family: "NotoSansDevanagari", src: NotoSansDevanagari });

// ------------------ Purple Theme ------------------
const THEME = {
  pageBackground: "#fefce8",      // light yellow page background
  headerLine: "#f59e0b",           // orange-yellow header line
  title: "#b45309",                 // dark orange title
  subtitle: "#78350f",              // brownish subtitle
  tableHeader: "#facc15",           // bright yellow table header
  rowEven: "#fef9c3",               // pale yellow even row
  rowOdd: "#ffffff",                 // white odd row
  footerBackground: "#fde68a",      // soft yellow footer
  footerText: "#b45309",            // footer text color
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
  tableColIndex: { width: "10%", border: "1pt solid #d1d5db", padding: 6, justifyContent: "center", alignItems: "center" },
  tableColName: { width: "45%", border: "1pt solid #d1d5db", padding: 6 },
  tableColAmount: { width: "45%", border: "1pt solid #d1d5db", padding: 6, justifyContent: "flex-end", alignItems: "flex-end" },
  tableCellHeader: { fontSize: 12, fontWeight: "bold", textAlign: "center", color: "#ffffff" },
  tableCell: { fontSize: 11, color: "#1f2937" },
  tableCellAmount: { fontSize: 11, textAlign: "right", color: "#1f2937", paddingRight: 4 },
  footerRow: { flexDirection: "row", backgroundColor: THEME.footerBackground, borderRadius: 6, marginTop: 12 },
  footerCol: { width: "50%", padding: 8, fontSize: 12, fontWeight: "bold", textAlign: "center", color: THEME.footerText },
});

// ------------------ Component ------------------
const Form6Pdf = () => {
  const [data, setData] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    auth.loadToken();
    axios
      .get("http://localhost:8080/api/contributions/all")
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
          <Text style={styles.subtitle}>आरतीतील वर्गणी</Text>
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
            <View style={styles.tableColAmount}>
              <Text style={styles.tableCellHeader}>रक्कम (₹)</Text>
            </View>
          </View>

          {/* Table Rows */}
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
                  { backgroundColor: idx % 2 === 0 ? THEME.rowEven : THEME.rowOdd },
                ]}
                wrap={false}
              >
                <View style={styles.tableColIndex}>
                  <Text style={styles.tableCell}>{idx + 1}</Text>
                </View>
                <View style={styles.tableColName}>
                  <Text style={styles.tableCell}>{item.name}</Text>
                </View>
                <View style={styles.tableColAmount}>
                  <Text style={styles.tableCellAmount}>₹{item.amount}</Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Footer */}
        <View style={styles.footerRow}>
          <View style={styles.footerCol}>
            <Text>एकूण रक्कम</Text>
          </View>
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

export default Form6Pdf;
