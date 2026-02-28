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

// ------------------ Green Theme ------------------
const THEME = {
  pageBackground: "#f0fdf4",    // light green page
  headerLine: "#16a34a",        // green header line
  title: "#166534",             // dark green title
  subtitle: "#15803d",          // subtitle
  tableHeader: "#22c55e",       // table header
  rowEven: "#dcfce7",           // even rows
  rowOdd: "#ffffff",            // odd rows
  footerBackground: "#bbf7d0",  // footer background
  footerText: "#166534",        // footer text
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
  tableColMaterial: { width: "45%", border: "1pt solid #d1d5db", padding: 6 },
  tableCellHeader: { fontSize: 12, fontWeight: "bold", textAlign: "center", color: "#ffffff" },
  tableCell: { fontSize: 11, color: "#1f2937" },
  footerRow: { flexDirection: "row", backgroundColor: THEME.footerBackground, borderRadius: 6, marginTop: 12 },
  footerCol: { width: "50%", padding: 8, fontSize: 12, fontWeight: "bold", textAlign: "center", color: THEME.footerText },
});

// ------------------ Component ------------------
const Form5Pdf = () => {
  const [data, setData] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    auth.loadToken();
    axios
      .get("http://localhost:8080/api/materials/all")
      .then((res) => {
        setData(res.data);
        setApiError(false);
      })
      .catch(() => setApiError(true));
  }, []);

  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{mandalname}</Text>
          <Text style={styles.subtitle}>प्रसाद साहित्य</Text>
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
            <View style={styles.tableColMaterial}>
              <Text style={styles.tableCellHeader}>देणारे साहित्य</Text>
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
                <View style={styles.tableColMaterial}>
                  <Text style={styles.tableCell}>{item.material}</Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Footer */}
        <View style={styles.footerRow}>
          <View style={styles.footerCol}>
            <Text>एकूण नोंदी</Text>
          </View>
          <View style={styles.footerCol}>
            <Text>{data.length}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="w-full h-screen">
      <PDFViewer style={{ width: "100%", height: "100%" }}>{MyDocument}</PDFViewer>
    </div>
  );
};

export default Form5Pdf;
