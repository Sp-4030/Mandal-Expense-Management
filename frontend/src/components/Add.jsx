import React, { useState } from "react";
import Form1 from "./Forms/Form1";
import Form2 from "./Forms/Form2";
import Form3 from "./Forms/Form3";
import Form4 from "./Forms/Form4";
import Form5 from "./Forms/Form5";
import Form6 from "./Forms/Form6";
import toast, { Toaster } from 'react-hot-toast';
function Add() {
  // Set default active form to "वर्गणी" (Form1)
  const [activeForm, setActiveForm] = useState("वर्गणी");

  // Form tabs with Marathi names
  const formTabs = [
    "वर्गणी",
    "महाप्रसाद बाजार",
    "वार्षिक खर्च",
    "प्रसाद देणगी",
    "प्रसाद साहित्य",
    "आरतीतील वर्गणी",
  ];

  return (
    <div className="max-w-5xl mx-auto ">
      {/* 🔹 Form Switcher */}
      <div className="flex mt-4 justify-center gap-2 mb-6 flex-wrap">
        {formTabs.map((formName, i) => (
          <div
            key={i}
            className={`w-35  rounded-xl border shadow-md cursor-pointer tab-card ${
              activeForm === formName
                ? "tab-card-active border-blue-600 bg-blue-50"
                : "border-gray-300 bg-white"
            }`}
            onClick={() => setActiveForm(formName)}
          >
            <div
              className={`text-center font-bold text-lg py-2 rounded-t-xl ${
                activeForm === formName ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              {formName}
            </div>
            <div className="flex flex-col items-center p-3">
              <button  onClick={() => setActiveForm(formName)} className="w-full cursor-pointer py-1 mt-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition btn-press">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Active Form Render */}
      <div className="bg-white shadow-lg rounded-xl border p-2 m-6">
        {activeForm === "वर्गणी" && <Form1 />}
        {activeForm === "महाप्रसाद बाजार" && <Form2 />}
        {activeForm === "वार्षिक खर्च" && <Form3 />}
        {activeForm === "प्रसाद देणगी" && <Form4 />}
        {activeForm === "प्रसाद साहित्य" && <Form5 />}
        {activeForm === "आरतीतील वर्गणी" && <Form6 />}
      </div>
    </div>
  );
}

export default Add;
