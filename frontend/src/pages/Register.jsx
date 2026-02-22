import React, { useEffect, useState } from "react";
import axios from "axios";
import auth from "../utils/auth";
import toast, { Toaster } from "react-hot-toast";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = auth.loadToken();

  // ✅ Load Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/auth/register/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users (वापरकर्ते लोड करण्यात अयशस्वी)");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Validation Function
  const validateForm = () => {
  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();
  const trimmedConfirmPassword = confirmPassword.trim();

  if (!trimmedUsername || !trimmedPassword || !trimmedConfirmPassword) {
    toast.error("Fill all fields (सर्व माहिती भरा)");
    return false;
  }

  if (trimmedUsername.length < 3) {
    toast.error("Username must be at least 3 characters");
    return false;
  }

  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(trimmedUsername)) {
    toast.error("Username only allows letters, numbers & underscore");
    return false;
  }

  // ✅ NEW: Prevent only numbers
  const onlyNumbers = /^[0-9]+$/;
  if (onlyNumbers.test(trimmedUsername)) {
    toast.error("Username cannot be only numbers (फक्त अंक चालणार नाहीत)");
    return false;
  }

  if (trimmedPassword.length < 4) {
    toast.error("Password must be at least 4 characters");
    return false;
  }

  if (trimmedPassword !== trimmedConfirmPassword) {
    toast.error("Passwords do not match (पासवर्ड जुळत नाही)");
    return false;
  }

  return true;
};

  // ✅ CREATE USER
  const handleCreate = async () => {
    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:8080/auth/register", {
        username: username.trim(),
        password: password.trim(),
      });

      toast.success("User Created (कार्यकर्ता तयार झाला)");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      fetchUsers();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Create failed (तयार करण्यात अयशस्वी)"
      );
    }
  };

  // ✅ DELETE USER
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user? (आपण हा कार्यकर्ता हटवू इच्छिता का?)"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:8080/auth/register/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("User Deleted (कार्यकर्ता हटवला)");
      fetchUsers();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Delete failed (हटवण्यात अयशस्वी)"
      );
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-6">
      <Toaster position="top-center" />

      <div className=" w-full max-w-4xl backdrop-blur-lg bg-white/80 border border-white/40 p-8 rounded-2xl shadow-2xl transition-all duration-500">

        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          User Management (कार्यकर्ते व्यवस्थापन)
        </h2>

        {/* CREATE SECTION */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">

          <input
            type="text"
            placeholder="Username (कार्यकर्ता नाव)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={25}
            className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:shadow-lg transition duration-300"
          />

          <input
            type="password"
            placeholder="Password (पासवर्ड)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={25}
            className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:shadow-lg transition duration-300"
          />

          <input
            type="password"
            placeholder="Confirm Password (पासवर्ड पुष्टी करा)"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            maxLength={25}
            className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:shadow-lg transition duration-300"
          />

          <button
            onClick={handleCreate}
            className="bg-gradient-to-r bg-green-500 text-white font-semibold px-5 py-3 rounded-lg shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            Create (तयार करा)
          </button>
        </div>

        {/* USERS TABLE */}
        <div className="overflow-hidden rounded-xl shadow-lg">
          <table className="w-full text-sm text-gray-700 border border-gray-300 border-collapse">
            <thead>
              <tr className="bg-gradient-to-r bg-orange-500  text-white">
                <th className="p-3 border border-gray-300">
                  Username (कार्यकर्ता नाव)
                </th>
                <th className="p-3 border border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`text-center transition duration-300 ${
                    index % 2 === 0 ? "bg-white" : "bg-orange-50"
                  } bg-white`}
                >
                  <td className="p-3 font-medium border border-gray-300">
                    {user.username}
                  </td>
                  <td className="p-3 border border-gray-300">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-gradient-to-r bg-red-500  text-white px-4 py-1.5 rounded-md shadow hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      Delete (काढून टाका)
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
