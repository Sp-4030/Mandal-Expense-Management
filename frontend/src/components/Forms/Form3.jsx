import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import auth from "../../utils/auth";
import { Pencil, Trash2, Plus } from "lucide-react";
import { FaCalendarCheck } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { Added, Update, Delete } from "./Form1";

function Form3() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ material: "", person: "", expense: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 5;
  const API_URL = "http://localhost:8080/api/expenses";

  const fetchData = () => {
    auth.loadToken();
    axios.get(`${API_URL}/all`)
      .then((res) => setData(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "material" || name === "person") {
      const sanitized = value
        .replace(/[^A-Za-z\u0900-\u097F\s]/g, "")
        .trimStart();
      setForm({ ...form, [name]: sanitized });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = () => {
    const nameRegex = /^[A-Za-z\u0900-\u097F\s]+$/;
    const trimmedMaterial = form.material.trim();
    const trimmedPerson = form.person.trim();

    if (!trimmedMaterial || !trimmedPerson) {
      toast.error("कृपया सर्व आवश्यक फिल्ड भरा");
      return;
    }

    if (!nameRegex.test(trimmedMaterial) || !nameRegex.test(trimmedPerson)) {
      toast.error("नाव किंवा साहित्य फक्त अक्षरे असावी");
      return;
    }

    const isDuplicate = data.some(
      (item) =>
        item.material.trim().toLowerCase() === trimmedMaterial.toLowerCase() &&
        item.person.trim().toLowerCase() === trimmedPerson.toLowerCase() &&
        item.id !== editId
    );

    if (isDuplicate) {
      toast.error("हे साहित्य आणि नाव आधीच नोंदलेले आहे");
      return;
    }

    const payload = {
      material: trimmedMaterial,
      person: trimmedPerson,
      expense: parseFloat(form.expense) || 0,
    };

    auth.loadToken();

    if (editId) {
      axios.put(`${API_URL}/update/${editId}`, payload).then(() => {
        fetchData();
        Update();
      });
    } else {
      axios.post(`${API_URL}/add`, payload).then(() => {
        fetchData();
        Added();
      });
    }

    setForm({ material: "", person: "", expense: "" });
    setEditId(null);
  };

  const handleEdit = (id) => {
    const record = data.find((item) => item.id === id);
    if (record) {
      setForm(record);
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    auth.loadToken();
    axios.delete(`${API_URL}/delete/${id}`).then(() => {
      setData(data.filter((item) => item.id !== id));
      Delete();
    });
  };

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

  const totalExpense = data.reduce((acc, cur) => acc + cur.expense, 0);

  return (
    <div className="p-4 sm:p-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="flex items-center">
          <FaCalendarCheck className="size-7 mr-2 text-blue-600" />
          <h2 className="text-xl sm:text-2xl font-bold">
            {new Date().getFullYear()} मधील खर्च
          </h2>
        </div>

        <input
          type="text"
          placeholder="शोधा..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:ml-auto w-full sm:w-48 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Form */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          name="material"
          placeholder="साहित्य/वस्तू"
          value={form.material}
          onChange={handleChange}
          className="flex-1 px-3 py-2 border rounded-lg"
        />
        <input
          name="person"
          placeholder="ठरीवनारा व आणारयांचे नावे"
          value={form.person}
          onChange={handleChange}
          className="flex-1 px-3 py-2 border rounded-lg"
        />
        <input
          name="expense"
          type="number"
          placeholder="खर्च"
          value={form.expense}
          onChange={handleChange}
          className="sm:w-40 px-3 py-2 border rounded-lg"
        />
        <button
          onClick={handleSubmit}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {editId ? "अपडेट करा" : (
            <>
              <Plus className="w-4 h-4" /> Add
            </>
          )}
        </button>
        <Toaster />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">आ न</th>
              <th className="border p-2">साहित्य</th>
              <th className="border p-2">नावे</th>
              <th className="border p-2">खर्च</th>
              <th className="border p-2">क्रिया</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={item.id} className="text-center hover:bg-gray-50">
                <td className="border p-2">
                  {index + 1 + (page - 1) * itemsPerPage}
                </td>
                <td className="border p-2">{item.material}</td>
                <td className="border p-2">{item.person}</td>
                <td className="border p-2">₹{item.expense}</td>
                <td className="border p-2 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="p-2 border rounded hover:bg-gray-100"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-orange-50 font-bold">
              <td colSpan="3" className="border p-2 text-right">
                एकूण
              </td>
              <td className="border p-2">₹{totalExpense}</td>
              <td className="border p-2"></td>
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

export default Form3;
