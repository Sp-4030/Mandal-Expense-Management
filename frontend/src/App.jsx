import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
import Gallary from "./pages/Gallary";
import Welcome from "./pages/Welcome";

// Auth Utility
import auth from "./utils/auth";


// ✅ Protected Route
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

  const navigate = useNavigate();

  // ✅ Auto Logout When Token Expires
  useEffect(() => {
    const token = auth.loadToken();
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        auth.clearToken();
        navigate("/login");
      }
    } catch (error) {
      auth.clearToken();
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Routes>

      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Welcome />} />
        <Route path="register" element={<Register />} />
        <Route path="create" element={<Create />} />
        <Route path="pdfs" element={<Pdfs />} />
        <Route path="add" element={<Add />} />
        <Route path="gallary" element={<Gallary />} />

        <Route path="form1pdf" element={<Form1Pdf />} />
        <Route path="form2pdf" element={<Form2Pdf />} />
        <Route path="form3pdf" element={<Form3Pdf />} />
        <Route path="form4pdf" element={<Form4Pdf />} />
        <Route path="form5pdf" element={<Form5Pdf />} />
        <Route path="form6pdf" element={<Form6Pdf />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Redirect Unknown Routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
};

export default App;