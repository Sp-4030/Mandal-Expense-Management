// Form1Pdf.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import auth from "../utils/auth";
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
import { mandalname } from "../pages/Pdfs";

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
 left: "50px",
 textTransform: "capitalize",
 
  },
  tableRow: { flexDirection: "row" },
  tableColHeader: {
    width: "50%",
    backgroundColor: "#f3f4f6",
    border: "1pt solid #d1d5db",
    padding: 6,
    
  
  },
  tableCol: { width: "50%", border: "1pt solid #d1d5db", padding: 6 },
  tableColAmount: { width: "22%", border: "1pt solid #d1d5db", padding: 6 },
  tableCol1: { width: "8%", border: "1pt solid #d1d5db", padding: 6 },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111827",
    
  },
  tableCell: { fontSize: 11,color: "#1f2937",  textAlign:"center", },
  tableCellAmount: {
    fontSize: 11,
    textAlign: "right",
    color: "#1f2937",
    paddingRight: 4   ,
  },
  footerRow: { flexDirection: "row", marginTop: 8, backgroundColor: "#fde68a" },
  footerCol: {
    width: "33.33%",
    padding: 6,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111827",
  },
});

const Form1Pdf = () => {
  const [data, setData] = useState([]);
  const [previousYearAmount, setPreviousYearAmount] = useState(0);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    
    const token = auth.loadToken(); // reads same key used by Login ("jwt")
    if (!token) return setApiError(true);

    // Fetch all data
    axios
      .get("http://localhost:8080/api/all")
      .then((res) => {
        setData(res.data);
        setApiError(false);
      })
      .catch(() => setApiError(true));

    // Fetch previous year amount
    axios
      .get("http://localhost:8080/api/previous-year")
      .then((res) => setPreviousYearAmount(res.data.amount || 0))
      .catch(() => setPreviousYearAmount(0));
  }, []);

  const totalAmount =
    data.reduce((sum, item) => sum + (item.amount || 0), 0) +
    previousYearAmount;

  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBand}>
          <Text style={styles.title}>{mandalname}</Text>
        </View>
        <Text style={styles.subtitle}>वर्गणी</Text>

        {previousYearAmount > 0 && (
          <Text style={{ marginBottom: 12, textAlign: "right", fontSize: 12 }}>
            मागील वर्ष शिल्लक रक्कम: ₹{previousYearAmount}
          </Text>
        )}

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCellHeader}>आ. क्र.</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>नाव</Text>
            </View>
            <View style={styles.tableColAmount}>
              <Text style={styles.tableCellHeader}>रक्कम (₹)</Text>
            </View>
          </View>

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
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.name}</Text>
                </View>
                <View style={styles.tableColAmount}>
                  <Text style={styles.tableCellAmount}>{item.amount}</Text>
                </View>
              </View>
            ))
          )}
        </View>

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
    <div className="w-full h-screen">
      <PDFViewer style={{ width: "100%", height: "100%" }}>{MyDocument}</PDFViewer>
    </div>
  );
};

export default Form1Pdf;
