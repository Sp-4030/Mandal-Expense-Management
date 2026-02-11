import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import auth from "../../utils/auth";
import { Pencil, Trash2, Plus, DeleteIcon } from "lucide-react";
import { mandalname } from "../../pages/Pdfs";

import toast, { Toaster } from 'react-hot-toast';
export const Added = () => toast.success('Added Successfully');
export const Update = () => toast.success('Updated Successfully');
export const Delete = () => toast.success('Deleted Successfully');

function Form1() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ name: "", amount: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [previousYearAmount, setPreviousYearAmount] = useState(0);

  const itemsPerPage = 5;
  const API_URL = "http://localhost:8080/api";

  const fetchData = () => {
    auth.loadToken();
    axios
      .get(`${API_URL}/all`)
      .then((res) => setData(res.data))
      .catch(console.error);
      
  };

  const fetchPreviousYearAmount = () => {
    auth.loadToken();
    axios
      .get(`${API_URL}/previous-year`)
      .then((res) => {
        if (res.data) setPreviousYearAmount(res.data.amount);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchData();
    fetchPreviousYearAmount();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the field is a name, strip digits and punctuation; allow Devanagari and letters and spaces
    if (name === "name") {
      const sanitized = value.replace(/[^A-Za-z\u0900-\u097F\s]/g, "");
      setForm({ ...form, [name]: sanitized });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handlePreviousYearChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setPreviousYearAmount(value);

    auth.loadToken();
    axios
      .put(`${API_URL}/previous-year`, { amount: value })
      .catch(console.error);
  };

  const handleSubmit = () => {
    
  
    const nameRegex = /^[A-Za-z\u0900-\u097F\s]+$/;
    if (!form.name || !nameRegex.test(form.name)) {
      toast.error("कृपया वैध नाव टाका (Name required, letters only)");
      return;
    }

    if (form.amount === "" || form.amount === null || form.amount === undefined) {
      toast.error("कृपया रक्कम टाका (Amount required)");
      return;
    }

    const payload = { name: form.name, amount: parseFloat(form.amount) };

    if (editId !== null) {
      auth.loadToken();
      axios
        .put(`${API_URL}/update/${editId}`, payload)
        .then(() => {fetchData()
          Update();

        })
        .catch(console.error);
    } else {
      auth.loadToken();
      axios
        .post(`${API_URL}/add`, payload)
        .then(() => {fetchData()
          Added();
        })
        .catch(console.error);
        
    }

    setForm({ name: "", amount: "" });
    setEditId(null);
  };

  const handleEdit = (id) => {
    const record = data.find((item) => item.id === id);
    if (record) {
      setForm({ name: record.name, amount: record.amount });
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    auth.loadToken();
    axios
      .delete(`${API_URL}/delete/${id}`)
      .then(() => {setData(data.filter((item) => item.id !== id))
        Delete();
      })
      .catch(console.error);
      
  };

  const filteredData = useMemo(
    () =>
      data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      ),
    [data, search]
  );

  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalAmount =
    previousYearAmount +
    data.reduce((acc, cur) => acc + Number(cur.amount), 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 gap-3 sm:gap-6">
        <h2 className="text-xl sm:text-2xl font-bold">
          {mandalname} {new Date().getFullYear()} वर्गणी
        </h2>
        <input
          type="text"
          placeholder="शोधा..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-48 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Previous Year Amount */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <label className="font-medium">
          मागील {new Date().getFullYear() - 1} वर्ष शिल्लक रक्कम:
        </label>
        <input
          type="number"
          value={previousYearAmount}
          onChange={handlePreviousYearChange}
          className="w-full sm:w-40 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Input Form */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          name="name"
          placeholder="नाव"
          value={form.name}
          onChange={handleChange}
          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="amount"
          type="number"
          placeholder="रक्कम"
          value={form.amount}
          onChange={handleChange}
          className="w-full sm:w-40 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="flex items-center cursor-pointer justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {editId !== null ? "Update"  : <><Plus className="w-4 h-4" /> Add</>}
        </button>
        <Toaster/>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border rounded-lg text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-10 border px-2 py-1">आ न</th>
              <th className="p-2 border">नाव</th>
              <th className="p-2 border">रक्कम</th>
              <th className="p-2 border">क्रिया</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={item.id} className="text-center hover:bg-gray-50">
                <td className="w-10 border px-2 py-1">
                  {index + 1 + (page - 1) * itemsPerPage}
                </td>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">₹{item.amount}</td>
                <td className="p-2 border flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(item.id)}
                              className="p-2 rounded-md border hover:bg-gray-100 cursor-pointer"
                            >
                              <Pencil className="w-4 h-4 cursor-pointer" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4 cursor-pointer" />
                            </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-blue-50 font-semibold">
              <td colSpan="2" className="p-2 border text-right">
                मागील वर्ष शिल्लक रक्कम
              </td>
              <td className="p-2 border">₹{previousYearAmount}</td>
              <td className="p-2 border"></td>
            </tr>
            <tr className="bg-orange-50 font-bold">
              <td colSpan="2" className="p-2 border text-right">
                एकूण
              </td>
              <td className="p-2 border">₹{totalAmount}</td>
              <td className="p-2 border"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center mt-6 gap-2">
        {Array.from(
          { length: Math.ceil(filteredData.length / itemsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded-md border ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Form1;
