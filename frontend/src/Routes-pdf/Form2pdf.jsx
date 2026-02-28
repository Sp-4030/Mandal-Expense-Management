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

// ------------------ Theme Object ------------------
const THEME = {
  pageBackground: "#f0f4f8",     // Page background
  headerLine: "#2563eb",          // Header bottom line
  title: "#1e3a8a",               // Title color
  subtitle: "#1e40af",            // Subtitle color
  tableHeader: "#3b82f6",         // Table header row
  rowEven: "#eff6ff",             // Even table row
  rowOdd: "#ffffff",              // Odd table row
  footerBackground: "#93c5fd",    // Footer row
  footerText: "#1e3a8a",          // Footer text
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

  tableColIndex: {
    width: "8%",
    border: "1pt solid #d1d5db",
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  tableColMaterial: {
    width: "50%",
    border: "1pt solid #d1d5db",
    padding: 6,
  },

  tableColBuyer: {
    width: "30%",
    border: "1pt solid #d1d5db",
    padding: 6,
  },

  tableColAmount: {
    width: "12%",
    border: "1pt solid #d1d5db",
    padding: 6,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  tableCellHeader: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
  },

  tableCell: {
    fontSize: 11,
    color: "#1f2937",
  },

  tableCellAmount: {
    fontSize: 11,
    textAlign: "right",
    color: "#1f2937",
    paddingRight: 4,
  },

  footerRow: {
    flexDirection: "row",
    backgroundColor: THEME.footerBackground,
    borderRadius: 6,
    marginTop: 12,
  },

  footerCol: {
    width: "33.33%",
    padding: 8,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: THEME.footerText,
  },
});

// ------------------ Component ------------------
const Form2Pdf = () => {
  const [data, setData] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    auth.loadToken();
    axios
      .get("http://localhost:8080/api/market/all")
      .then((res) => {
        setData(res.data);
        setApiError(false);
      })
      .catch(() => setApiError(true));
  }, []);

  const totalExpense = data.reduce((sum, item) => sum + (item.expense || 0), 0);

  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{mandalname}</Text>
          <Text style={styles.subtitle}>महाप्रसाद बाजार</Text>
        </View>

        {/* Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.headerRow]}fixed>
            <View style={styles.tableColIndex}>
              <Text style={styles.tableCellHeader}>आ. क्र.</Text>
            </View>
            <View style={styles.tableColMaterial}>
              <Text style={styles.tableCellHeader}>साहित्य</Text>
            </View>
            <View style={styles.tableColBuyer}>
              <Text style={styles.tableCellHeader}>वस्तू खरेदीदार</Text>
            </View>
            <View style={styles.tableColAmount}>
              <Text style={styles.tableCellHeader}>खर्च (₹)</Text>
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
                    backgroundColor:
                      idx % 2 === 0 ? THEME.rowEven : THEME.rowOdd,
                  },
                ]}
                wrap={false}
              >
                <View style={styles.tableColIndex}>
                  <Text style={styles.tableCell}>{idx + 1}</Text>
                </View>
                <View style={styles.tableColMaterial}>
                  <Text style={styles.tableCell}>{item.material}</Text>
                </View>
                <View style={styles.tableColBuyer}>
                  <Text style={styles.tableCell}>{item.buyer}</Text>
                </View>
                <View style={styles.tableColAmount}>
                  <Text style={styles.tableCellAmount}>{item.expense}</Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Footer / Total */}
        <View style={styles.footerRow}>
          <View style={styles.footerCol}>
            <Text>एकूण</Text>
          </View>
          <View style={styles.footerCol}></View>
          <View style={styles.footerCol}>
            <Text>₹{totalExpense}</Text>
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

export default Form2Pdf;
