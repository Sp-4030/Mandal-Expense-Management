import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import auth from "../utils/auth";
import Logo from "../components/Logo";

export default function Create() {
  const [loading, setLoading] = useState(false);

  const handleTruncate = async () => {
    if (loading) return;

    const confirmed1 = window.confirm(
      "⚠️ Warning 1: This will permanently delete ALL data from all tables!\n\n" +
        "⚠️ इशारा १: हे सर्व टेबलमधील सर्व डेटा कायमचा हटवेल!"
    );
    if (!confirmed1) return;

    const confirmed2 = window.confirm(
      "🚨 Warning 2: Are you absolutely sure? This action cannot be undone!\n\n" +
        "🚨 इशारा २: तुम्हाला पूर्ण खात्री आहे का? ही क्रिया परत आणता येणार नाही!"
    );
    if (!confirmed2) return;

    const token = auth.loadToken();
    if (!token) {
      toast.error("❌ No admin token found. कृपया पुन्हा लॉगिन करा.");
      return;
    }

    try {
      setLoading(true);

      await toast.promise(
        axios.delete("http://localhost:8080/api/truncate-all", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        {
          loading: "🧹 Truncating tables... / टेबल्स रिकामी करत आहोत...",
          success:
            "✅ All tables truncated successfully! / सर्व टेबल्स यशस्वीरित्या रिकामी झाली!",
          error:
            "❌ Failed to truncate tables (check token or backend logs) / टेबल्स रिकामी करण्यात अयशस्वी",
        }
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 space-y-6">
      <Toaster position="top-right" />

      {/* Logo */}
      <div className="w-60 h-28">
        <Logo className="w-full h-full object-contain" />
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        Admin Panel (प्रशासन पॅनेल)
      </h1>

      {/* Button */}
      <button
        onClick={handleTruncate}
        disabled={loading}
        className={`bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading
          ? "Processing... 🧹"
          : "Create New Data / नवीन डेटा तयार करा (Truncate Tables)"}
      </button>
    </div>
  );
}