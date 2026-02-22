import React from "react";
import { Link } from "react-router-dom";
import { ClipboardList, BarChart3, FileDown, ShieldCheck, ArrowRight } from "lucide-react"; // Optional: Install lucide-react for icons

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center px-15 py-1">
      
      {/* Hero Section */}
      <div className="text-center mb-5 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-4">
          Mandal Expense Management
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-medium">
          मंडळ खर्च व्यवस्थापन प्रणाली – आपल्या मंडळाच्या आर्थिक व्यवहारांचे डिजिटल व्यवस्थापन.
        </p>
      </div>

      {/* About Section */}
      <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 md:p-8 max-w-4xl w-full border border-white">
  
  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
    <span className="h-1 w-8 bg-orange-500 rounded-full"></span>
    Key Features / वैशिष्ट्ये
    <span className="h-1 w-8 bg-orange-500 rounded-full"></span>
  </h2>

  <div className="grid md:grid-cols-2 gap-5">

    {/* Feature 1 */}
    <div className="group bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-orange-600 group-hover:text-white transition-colors">
        <ClipboardList size={22} />
      </div>
      <h3 className="font-semibold text-lg mb-1 text-gray-800">
        Expense Forms / खर्च फॉर्म
      </h3>
      <p className="text-sm text-gray-600">
        Easily create and manage expense forms.
        <br />
        <span className="italic text-xs">
          मंडळातील उत्पन्न व खर्च नोंदविण्यासाठी सोपे फॉर्म.
        </span>
      </p>
    </div>

    {/* Feature 2 */}
    <div className="group bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <BarChart3 size={22} />
      </div>
      <h3 className="font-semibold text-lg mb-1 text-gray-800">
        Reports / अहवाल
      </h3>
      <p className="text-sm text-gray-600">
        View records in structured format.
        <br />
        <span className="italic text-xs">
          सर्व आर्थिक नोंदी पारदर्शक पद्धतीने पाहता येतात.
        </span>
      </p>
    </div>

    {/* Feature 3 */}
    <div className="group bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-600 group-hover:text-white transition-colors">
        <FileDown size={22} />
      </div>
      <h3 className="font-semibold text-lg mb-1 text-gray-800">
        Export PDF / पीडीएफ
      </h3>
      <p className="text-sm text-gray-600">
        Download and print reports instantly.
        <br />
        <span className="italic text-xs">
          अहवाल PDF स्वरूपात डाउनलोड करून प्रिंट करा.
        </span>
      </p>
    </div>

    {/* Feature 4 */}
    <div className="group bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-600 group-hover:text-white transition-colors">
        <ShieldCheck size={22} />
      </div>
      <h3 className="font-semibold text-lg mb-1 text-gray-800">
        Admin Control / प्रशासन
      </h3>
      <p className="text-sm text-gray-600">
        Securely manage authorized users.
        <br />
        <span className="italic text-xs">
          अधिकृत वापरकर्त्यांचे नियंत्रण आणि सुरक्षित प्रवेश.
        </span>
      </p>
    </div>

  </div>

  {/* Action Button */}
  <div className="mt-8 text-center">
    <Link
      to="/gallary"
      className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-2.5 px-6 rounded-full shadow-md hover:scale-105 transition-all duration-300 text-sm"
    >
      Get Started / सुरुवात करा
      <ArrowRight size={16} />
    </Link>
  </div>

</div>

      
    
    </div>
  );
}