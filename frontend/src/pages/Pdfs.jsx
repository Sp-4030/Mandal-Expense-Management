import React from "react";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate, NavLink } from "react-router-dom";
import auth from "../utils/auth"; // ✅ import your auth helper

export const mandalname = "हिंदवी स्वराज्य मित्र मंडळ";

const pdfs = [
  { title: "वर्गणी", navigators: "/Form1pdf" },
  { title: "महाप्रसाद बाजार", navigators: "/Form2pdf" },
  { title: "वार्षिक खर्च", navigators: "/Form3pdf" },
  { title: "प्रसाद देणगी", navigators: "/Form4pdf" },
  { title: "प्रसाद साहित्य", navigators: "/Form5pdf" },
  { title: "आरतीतील वर्गणी", navigators: "/Form6pdf" },
];

const Pdfs = () => {
  const navigate = useNavigate();

  const handleLogout = () => {

    auth.clearToken();
    navigate("/login", { replace: true }); 
  };

  return (
    <div className="p-4  bg-white rounded-md shadow-md h-full min-h-screen">
      {/* Header */}
      <div className="relative flex items-center border-b pb-4 mb-6">
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-4xl font-bold text-orange-500 drop-shadow-md pointer-events-none">
          {mandalname}
        </h1>
        <div className="ml-auto z-20">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 cursor-pointer text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <IoMdLogOut className="text-lg mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* PDF List */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
        {pdfs.map((pdf, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-center border rounded-md p-6 h-auto shadow-md"
          >
            <h2 className="font-bold mb-4 text-2xl">{pdf.title}</h2>
            <NavLink
              to={pdf.navigators}
              className="bg-blue-700 hover:bg-orange-600 text-white py-2 px-4 rounded-full font-bold"
            >
              View
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pdfs;
