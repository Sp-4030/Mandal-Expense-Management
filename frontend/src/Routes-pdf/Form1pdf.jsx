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

// Register Marathi Font
Font.register({ family: "NotoSansDevanagari", src: NotoSansDevanagari });

// ------------------- Theme -------------------
const THEME = {
  pageBackground: "#f0fdf4",
  headerLine: "#15803d",
  title: "#166534",
  subtitle: "#14532d",
  tableHeader: "#22c55e",
  rowEven: "#dcfce7",
  rowOdd: "#ffffff",
  footerBackground: "#bbf7d0",
  footerText: "#166534",
};

// ------------------- Styles -------------------
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
    width: "10%",
    border: "1pt solid #d1d5db",
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  tableColName: {
    width: "55%",
    border: "1pt solid #d1d5db",
    padding: 6,
  },
  tableColAmount: {
    width: "35%",
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
    width: "50%",
    padding: 8,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: THEME.footerText,
  },
});

// ------------------- Component -------------------
const Form1Pdf = () => {
  const [data, setData] = useState([]);
  const [previousYearAmount, setPreviousYearAmount] = useState(0);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    auth.loadToken();

    const fetchData = async () => {
      try {
        const currentRes = await axios.get(
          "http://localhost:8080/api/all"
        );
        const previousRes = await axios.get(
          "http://localhost:8080/api/previous-year"
        );

        setData(currentRes.data);

        // If previous-year API returns object like { amount: 5000 }
        if (previousRes.data.amount !== undefined) {
          setPreviousYearAmount(previousRes.data.amount);
        }
        // If it returns array like [{ amount: 5000 }]
        else if (Array.isArray(previousRes.data)) {
          setPreviousYearAmount(previousRes.data[0]?.amount || 0);
        }

        setApiError(false);
      } catch (error) {
        console.error("API Error:", error);
        setApiError(true);
      }
    };

    fetchData();
  }, []);

  const totalAmount = data.reduce(
    (sum, item) => sum + (Number(item.amount) || 0),
    0
  );

  const grandTotal = totalAmount + previousYearAmount;

  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{mandalname}</Text>
          <Text style={styles.subtitle}>वर्गणी अहवाल</Text>
        </View>

        {/* Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.headerRow]} fixed>
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
              <Text style={styles.tableCell}>
                डेटा लोड करण्यात अयशस्वी...
              </Text>
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
                <View style={styles.tableColName}>
                  <Text style={styles.tableCell}>{item.name}</Text>
                </View>
                <View style={styles.tableColAmount}>
                  <Text style={styles.tableCellAmount}>
                    ₹{item.amount}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Footer */}
        <View style={styles.footerRow}>
          <View style={styles.footerCol}>
            <Text>मागील वर्ष शिल्लक</Text>
          </View>
          <View style={styles.footerCol}>
            <Text>₹{previousYearAmount}</Text>
          </View>
        </View>

        <View style={styles.footerRow}>
          <View style={styles.footerCol}>
            <Text>एकूण रक्कम</Text>
          </View>
          <View style={styles.footerCol}>
            <Text>₹{grandTotal}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <PDFViewer style={{ width: "100%", height: "100%" }}>
        {MyDocument}
      </PDFViewer>
    </div>
  );
};

export default Form1Pdf;
