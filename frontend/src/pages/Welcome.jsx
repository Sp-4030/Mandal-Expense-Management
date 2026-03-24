import React from "react";
import { Link } from "react-router-dom";
import {
  ClipboardList,
  BarChart3,
  FileDown,
  ShieldCheck,
  ArrowRight,
} from "lucide-react"; // Optional: Install lucide-react for icons
import { FaRobot } from "react-icons/fa";

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      
      <h1 className="text-4xl 
font-black text-red-600 mb-4">
       Welcome To Mandal Expense Management
      </h1>

      <p className="text-gray-500 mb-6 font-bold">
        Easily manage your mandal expenses
      </p>
<div className=" text-center">
          <Link
            to="/gallary"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-2.5 px-6 rounded-full shadow-md hover:scale-105 transition-all duration-300 text-sm"
          >
            Get Started / सुरुवात करा
            <ArrowRight size={16} />
          </Link>
        </div>
     

    </div>
  );
}