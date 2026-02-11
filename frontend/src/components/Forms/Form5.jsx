import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import auth from "../../utils/auth";
import { Pencil, Trash2, Plus } from "lucide-react";
import { TbToolsKitchen2 } from "react-icons/tb";
import toast, { Toaster } from 'react-hot-toast';
import { Added, Update, Delete } from "./Form1";
function Form5() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ name: "", material: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 5;
  const API_URL = "http://localhost:8080/api/materials"; // your backend API

  // Fetch data from backend
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
    if (name === "name") {
      const sanitized = value.replace(/[^A-Za-z\u0900-\u097F\s]/g, "");
      setForm({ ...form, [name]: sanitized });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Add / Update record
  const handleSubmit = () => {
    const nameRegex = /^[A-Za-z\u0900-\u097F\s]+$/;
    if (!form.name) {
      toast.error('कृपया नाव भरा (Name is required)');
      return;
    }
    if (!nameRegex.test(form.name)) {
      toast.error('नाव फक्त अक्षरे असावे');
      return;
    }
    if (!form.material) {
      toast.error('कृपया साहित्य भरा (Material required)');
      return;
    }

    const payload = { name: form.name, material: form.material };

    if (editId) {
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

  setForm({ name: "", material: "" });
    setEditId(null);
  };

  // Edit record
  const handleEdit = (id) => {
    const record = data.find((item) => item.id === id);
    if (record) {
      setForm({ name: record.name, material: record.material });
      setEditId(id);
    }
  };

  // Delete record
  const handleDelete = (id) => {
    auth.loadToken();
    axios
      .delete(`${API_URL}/delete/${id}`)
      .then(() =>{ setData(data.filter((item) => item.id !== id))
        Delete();
      })
      .catch(console.error);
  };

  // Filter & Pagination
  const filteredData = useMemo(
    () =>
      data.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.material.toLowerCase().includes(search.toLowerCase())
      ),
    [data, search]
  );

  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="p-6">
      {/* Header + Search */}
      <div className="flex items-center mb-2">
        <TbToolsKitchen2 className="size-8 m-2" />
        <h2 className="text-2xl font-bold">प्रसाद साहित्य</h2>
        <TbToolsKitchen2 className="size-8 m-2" />
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
          name="name"
          placeholder="नाव"
          value={form.name}
          onChange={handleChange}
          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="material"
          placeholder="देणारे साहित्य"
          value={form.material}
          onChange={handleChange}
          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 cursor-pointer"
        >
          {editId ? "अपडेट करा" : <><Plus className="w-4 h-4 cursor-pointer" /> जोडा</>}
        </button>
        <Toaster />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-10 border">आ न</th>
              <th className="p-2 border">नाव</th>
              <th className="p-2 border">देणारे साहित्य</th>
              <th className="p-2 border">क्रिया</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={item.id} className="text-center hover:bg-yellow-50">
                <td className="w-10 border">{index + 1 + (page - 1) * itemsPerPage}</td>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.material}</td>
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
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from(
          { length: Math.ceil(filteredData.length / itemsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded-md border ${
                page === i + 1
                  ? "bg-indigo-600 text-white"
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

export default Form5;
