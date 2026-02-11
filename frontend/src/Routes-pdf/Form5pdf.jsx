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



const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontFamily: "NotoSansDevanagari",
    backgroundColor: "#f9fafb",
  },
  headerBand: {
    backgroundColor: "#FCD34D",
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 6,
    fontWeight: "bold",
    color: "#064e3b",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 12,
    color: "#064e3b",
  },
  table: {
    display: "table",
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 12,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol1: {
    width: "10%",
    border: "1pt solid #d1d5db",
    padding: 6,
  },
  tableColName: {
    width: "45%",
    border: "1pt solid #d1d5db",
    padding: 6,
  },
  tableColMaterial: {
    width: "45%",
    border: "1pt solid #d1d5db",
    padding: 6,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111827",
  },
  tableCell: {
    fontSize: 11,
    textAlign: "left",
    color: "#1f2937",
  },
  footerRow: {
    flexDirection: "row",
    marginTop: 8,
    backgroundColor: "#fde68a",
  },
  footerCol: {
    width: "50%",
    padding: 6,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111827",
  },
});

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
        <View style={styles.headerBand}>
          <Text style={styles.title}>{mandalname}</Text>
        </View>
        <Text style={styles.subtitle}>प्रसाद साहित्य</Text>

        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
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
              <View key={idx} style={styles.tableRow} wrap={false}>
                <View style={styles.tableCol1}>
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

        {/* Optional Footer: total items */}
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
