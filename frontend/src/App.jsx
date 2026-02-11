import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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

// ✅ Auth utility
import auth from "./utils/auth";
import Home from "./pages/Create";
import Chatbot from "./components/Chatbot";
import Register from "./pages/Register";
import Create from "./pages/Create";
import Gallary from "./pages/gallary";

// ✅ Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const token = auth.loadToken(); 

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
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
      <Route path="/Dashboard" element={<Create />} />
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
