import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Pages & Components
import Pdfs from "./pages/Pdfs";
import Layout from "./components/Layout";
import Add from "./components/Add";
import Form1Pdf from "./Routes-pdf/Form1pdf";
import Form2Pdf from "./Routes-pdf/Form2pdf";
import Form3Pdf from "./Routes-pdf/Form3pdf";
import Form4Pdf from "./Routes-pdf/Form4pdf";
import Form5Pdf from "./Routes-pdf/Form5pdf";
import Form6Pdf from "./Routes-pdf/Form6pdf";
import NotFound from "./components/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Create from "./pages/Create";
import Gallary from "./pages/gallary";
import Welcome from "./pages/Welcome";

// Auth Utility
import auth from "./utils/auth";


// ✅ Protected Route (Still Needed)
const ProtectedRoute = ({ children }) => {
  const token = auth.loadToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      auth.clearToken();
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    auth.clearToken();
    return <Navigate to="/login" replace />;
  }

  return children;
};


const App = () => {

  // ✅ REAL AUTO LOGOUT TIMER
 useEffect(() => {
  const interval = setInterval(() => {
    const token = auth.loadToken();
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        auth.clearToken();
        window.location.href = "/login";
      }
    } catch (error) {
      auth.clearToken();
      window.location.href = "/login";
    }
  }, 3000); // check every 3 seconds

  return () => clearInterval(interval);
}, []);

  return (
    <Routes>

      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<Create />} />
        <Route path="/pdfs" element={<Pdfs />} />
        <Route path="/add" element={<Add />} />
        <Route path="/gallary" element={<Gallary />} />
        <Route path="/dashboard" element={<Welcome />} />

        <Route path="/form1pdf" element={<Form1Pdf />} />
        <Route path="/form2pdf" element={<Form2Pdf />} />
        <Route path="/form3pdf" element={<Form3Pdf />} />
        <Route path="/form4pdf" element={<Form4Pdf />} />
        <Route path="/form5pdf" element={<Form5Pdf />} />
        <Route path="/form6pdf" element={<Form6Pdf />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
};

export default App;
