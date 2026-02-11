import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import auth from "../../utils/auth";
import { Pencil, Trash2, Plus } from "lucide-react";
import { FaCalendarCheck } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import { Added, Update, Delete } from "./Form1";
function Form3() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ material: "", person: "", expense: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 5;
  const API_URL = "http://localhost:8080/api/expenses"; // replace with your API

  // Fetch Data
  const fetchData = () => {
    auth.loadToken();
    axios
      .get(`${API_URL}/all`)
      .then((res) => setData(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "material" || name === "person") {
      // allow only Devanagari + Latin letters and spaces
      const sanitized = value.replace(/[^A-Za-z\u0900-\u097F\s]/g, "").trimStart();
      setForm({ ...form, [name]: sanitized });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Add / Update record
  const handleSubmit = () => {
    const nameRegex = /^[A-Za-z\u0900-\u097F\s]+$/;
    if (!form.material || !form.person) {
      toast.error('कृपया सर्व आवश्यक फिल्ड भरा (Please fill required fields)');
      return;
    }
    if (!nameRegex.test(form.material) || !nameRegex.test(form.person)) {
      toast.error('नाव किंवा साहित्य फक्त अक्षरे असावी');
      return;
    }

    const payload = {
      material: form.material,
      person: form.person,
  expense: parseFloat(form.expense) || 0,
    };

    if (editId) {
      auth.loadToken();
      axios
        .put(`${API_URL}/update/${editId}`, payload)
        .then(() =>{ fetchData()
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

    setForm({ material: "", person: "", expense: "" });
    setEditId(null);
  };

  // Edit record
  const handleEdit = (id) => {
    const record = data.find((item) => item.id === id);
    if (record) {
      setForm({
        material: record.material,
        person: record.person,
        expense: record.expense,
      });
      setEditId(id);
    }
  };

  // Delete record
  const handleDelete = (id) => {
    auth.loadToken();
    axios
      .delete(`${API_URL}/delete/${id}`)
      .then(() => {setData(data.filter((item) => item.id !== id))
        Delete();
      })
      .catch(console.error);
  };

  // Filter & Pagination
  const filteredData = useMemo(
    () =>
      data.filter(
        (item) =>
          item.material.toLowerCase().includes(search.toLowerCase()) ||
          item.person.toLowerCase().includes(search.toLowerCase())
      ),
    [data, search]
  );

  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Total expense
  const totalExpense = data.reduce((acc, cur) => acc + cur.expense, 0);

  return (
    <div className="p-6">
      {/* Header + Search */}
      <div className="flex items-center mb-6">
        <FaCalendarCheck className="size-8 mr-2 text-blue-600" />
        <h2 className="text-2xl font-bold">{new Date().getFullYear()} मधील खर्च</h2>
        <FaCalendarCheck className="size-8 ml-2 text-blue-600" />
        <input
          type="text"
          placeholder="शोधा..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-auto w-40 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Input Form */}
      <div className="flex gap-3 mb-6">
        <input
          name="material"
          placeholder="साहित्य/वस्तू"
          value={form.material}
          onChange={handleChange}
          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="person"
          placeholder="ठरीवनारा व आणारयांचे नावे"
          value={form.person}
          onChange={handleChange}
          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="expense"
          type="number"
          placeholder="खर्च"
          value={form.expense}
          onChange={handleChange}
          className="w-40 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {editId ? "अपडेट करा" : <><Plus className="w-4 h-4" /> Add</>}
        </button>
        <Toaster />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-10 border">आ न</th>
              <th className="p-2 border">साहित्य/वस्तू</th>
              <th className="p-2 border">ठरीवनारा व आणारयांचे नावे</th>
              <th className="p-2 border">खर्च</th>
              <th className="p-2 border">क्रिया</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={item.id} className="text-center hover:bg-gray-50">
                <td className="w-10 border">{index + 1 + (page - 1) * itemsPerPage}</td>
                <td className="p-2 border">{item.material}</td>
                <td className="p-2 border">{item.person}</td>
                <td className="p-2 border">₹{item.expense}</td>
                <td className="p-2 border flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="p-2 rounded-md border hover:bg-gray-100 cursor-pointer"
                    aria-label={`Edit expense ${item.id}`}
                  >
                    <Pencil className="w-4 h-4 cursor-pointer" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                    aria-label={`Delete expense ${item.id}`}
                  >
                    <Trash2 className="w-4 h-4 cursor-pointer" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-orange-50 font-bold">
              <td colSpan="3" className="p-2 border text-right">एकूण</td>
              <td className="p-2 border">₹{totalExpense}</td>
              <td className="p-2 border"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded-md border ${page === i + 1 ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Form3;
