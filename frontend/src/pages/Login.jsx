import React, { useState, useEffect } from "react";
import axios from "axios";
import auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { mandalname } from "./Pdfs";
import toast, { Toaster } from "react-hot-toast";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [typedText, setTypedText] = useState("");
  const navigate = useNavigate();

  const fullText = `\n ${mandalname}\nAdmin `;

  // Redirect if already logged in
  useEffect(() => {
    const token = auth.loadToken();
    if (token) navigate("/Dashboard");
  }, [navigate]);

  // Typing animation
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [fullText]);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      toast.error(
        "Please fill in both username and password / कृपया वापरकर्तानाव आणि पासवर्ड भरा."
      );
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      });

      // ✅ Save token
      auth.saveToken(res.data.token);

      // ✅ Save username for sidebar
      localStorage.setItem("username", username);

      // ✅ Dynamic welcome message
      toast.success(
        `Welcome ${username}! / स्वागत आहे ${username}!`
      );

      // ✅ Navigate properly (NO full page reload)
      setTimeout(() => {
        navigate("/Dashboard");
      }, 1000);

    } catch (err) {
      toast.error(
        "Login failed! Check your credentials  /\n लॉगिन अयशस्वी! कृपया माहिती तपासा."
      );
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100 overflow-hidden relative">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex items-stretch justify-between w-full h-full gap-0 relative z-10">
        
        {/* Image Section */}
        <div className="hidden lg:block lg:w-1/2 relative h-full animate-slideInLeft overflow-hidden">
          <img
            src="https://wallpapers.com/images/hd/shivaji-maharaj-statue-with-garlands-hd-s2g4axsjame3uk9k.jpg"
            alt="Shivaji"
            className="w-full h-full object-cover opacity-95 hover:opacity-100 transition-opacity duration-500"
          />
        </div>

        {/* Login Form Section */}
        <div
          className="w-full lg:w-1/2 h-full flex items-center justify-center p-6 lg:p-12"
          style={{
            background:
              "linear-gradient(135deg, #fff3e6 0%, #ffead1 50%, #ffe0b8 100%)",
          }}
        >
          <div
            className="w-full max-w-sm bg-white rounded-2xl p-8 animate-fadeInUp hover:shadow-2xl transition-shadow duration-500"
            style={{
              boxShadow:
                "0 20px 60px rgba(0, 0, 0, 0.25), 0 0 0 2px #fff3e6, 0 0 0 3px #000000",
            }}
          >
            <div className="text-center mb-8">
              <div className="inline-block p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mb-3">
          
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>

              <div className="h-16 flex items-center justify-center">
                <h2
                  className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-600 leading-tight"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {typedText}
                  <span className="animate-blink">|</span>
                </h2>
              </div>
            </div>

            <div className="space-y-4">
              {/* Username */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "#ff9933" }}
                >
                  Username / वापरकर्तानाव
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-gray-50 hover:bg-white"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "#ff9933" }}
                >
                  Password / पासवर्ड
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-gray-50 hover:bg-white"
                />
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                className="w-full text-base text-white py-2.5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-bold mt-6 cursor-pointer"
                style={{
                  background:
                    "linear-gradient(135deg, #ff9933 0%, #ff6b35 100%)",
                  fontFamily: "Georgia, serif",
                }}
              >
                LogIn/लॉगिन करा
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out 0.3s both;
          }

          @keyframes slideInLeft {
            0% { opacity: 0; transform: translateX(-100px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          .animate-slideInLeft {
            animation: slideInLeft 0.8s ease-out;
          }

          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0; }
          }
          .animate-blink {
            display: inline-block;
            animation: blink 1s step-start infinite;
          }
        `}
      </style>
    </div>
  );
}
