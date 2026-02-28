import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import auth from "../../utils/auth";
import { Pencil, Trash2, Plus } from "lucide-react";
import { TbToolsKitchen2 } from "react-icons/tb";
import toast, { Toaster } from "react-hot-toast";
import { Added, Update, Delete } from "./Form1";

function Form5() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ name: "", material: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 5;
  const API_URL = "http://localhost:8080/api/materials";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      const sanitized = value.replace(/[^A-Za-z\u0900-\u097F\s]/g, "");
      setForm({ ...form, [name]: sanitized });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = () => {
    const nameRegex = /^[A-Za-z\u0900-\u097F\s]+$/;

    const trimmedName = form.name.trim();
    const trimmedMaterial = form.material.trim();

    if (!trimmedName) {
      toast.error("कृपया नाव भरा");
      return;
    }

    if (!nameRegex.test(trimmedName)) {
      toast.error("नाव फक्त अक्षरे असावे");
      return;
    }

    if (!trimmedMaterial) {
      toast.error("कृपया साहित्य भरा");
      return;
    }

    const isDuplicate = data.some(
      (item) =>
        item.name.trim().toLowerCase() === trimmedName.toLowerCase() &&
        item.material.trim().toLowerCase() === trimmedMaterial.toLowerCase() &&
        item.id !== editId
    );

    if (isDuplicate) {
      toast.error("हे नाव आणि साहित्य आधीच नोंदलेले आहे");
      return;
    }

    const payload = {
      name: trimmedName,
      material: trimmedMaterial,
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

    setForm({ name: "", material: "" });
    setEditId(null);
  };

  const handleEdit = (id) => {
    const record = data.find((item) => item.id === id);
    if (record) {
      setForm({ name: record.name, material: record.material });
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
    <div className="p-4 sm:p-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <div className="flex items-center">
          <TbToolsKitchen2 className="size-7 mr-2" />
          <h2 className="text-xl sm:text-2xl font-bold">
            प्रसाद साहित्य
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
          name="name"
          placeholder="नाव"
          value={form.name}
          onChange={handleChange}
          className="flex-1 px-3 py-2 border rounded-lg"
        />
        <input
          name="material"
          placeholder="देणारे साहित्य"
          value={form.material}
          onChange={handleChange}
          className="flex-1 px-3 py-2 border rounded-lg"
        />
        <button
          onClick={handleSubmit}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          {editId ? (
            "अपडेट करा"
          ) : (
            <>
              <Plus className="w-4 h-4" /> जोडा
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
              <th className="border p-2">नाव</th>
              <th className="border p-2">देणारे साहित्य</th>
              <th className="border p-2">क्रिया</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={item.id} className="text-center hover:bg-gray-50">
                <td className="border p-2">
                  {index + 1 + (page - 1) * itemsPerPage}
                </td>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.material}</td>
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
