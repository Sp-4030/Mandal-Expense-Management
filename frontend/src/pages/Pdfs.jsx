import React from "react";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate, NavLink } from "react-router-dom";
import auth from "../utils/auth";


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
    <div className="p-4 sm:p-6 bg-white rounded-md shadow-md min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500 text-center flex-1">
          {mandalname}
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center sm:justify-start w-full sm:w-auto cursor-pointer"
        >
          <IoMdLogOut className="text-lg mr-2" />
          Logout
        </button>
      </div>

      {/* PDF Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
     
        {pdfs.map((pdf, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between items-center border rounded-md p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="font-bold text-xl sm:text-2xl mb-4">{pdf.title}</h2>
            <NavLink
              to={pdf.navigators}
              className="bg-blue-700 hover:bg-orange-600 text-white py-2 px-4 rounded-full font-bold w-full text-center transition-colors duration-300"
            >
              View / Download
            </NavLink>
          </div>
        ))}
       
      </div>

    </div>
  );
};

export default Pdfs;
