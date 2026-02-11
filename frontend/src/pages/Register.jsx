import React, { useEffect, useState } from "react";
import axios from "axios";
import auth from "../utils/auth";
import toast, { Toaster } from "react-hot-toast";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editUserId, setEditUserId] = useState(null);

  const token = auth.loadToken();

  // ✅ Load Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/auth/register/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ CREATE
  const handleCreate = async () => {
    if (!username || !password) {
      toast.error("Fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:8080/auth/register", {
        username,
        password,
      });

      toast.success("User Created");
      setUsername("");
      setPassword("");
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Create failed");
    }
  };



  // ✅ DELETE
  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this user?");

  if (!confirmDelete) return;

  try {
    await axios.delete(
      `http://localhost:8080/auth/register/delete/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    toast.success("User Deleted");
    fetchUsers();
  } catch (err) {
    toast.error(err.response?.data?.message || "Delete failed");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster position="top-center" />

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-orange-600">
          User Management
        </h2>

        {/* CREATE SECTION */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleCreate}
            className="bg-green-500 text-white px-4 rounded"
          >
            Create
          </button>
        </div>

        {/* USERS TABLE */}
        <table className="w-full border">
          <thead>
            <tr className="bg-orange-100">
           
              <th className="p-2 border">Username</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
        
                <td className="border p-2">{user.username}</td>
                <td className="border p-2 space-x-2">
                  {editUserId === user.id ? (
                    <>
                      <input
                        type="password"
                        placeholder="New Password"
                        value={editPassword}
                        onChange={(e) => setEditPassword(e.target.value)}
                        className="border p-1 rounded"
                      />
                      <button
                        onClick={() => handleUpdate(user.id)}
                        className="bg-blue-500 text-white px-2 rounded"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                  
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-2 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
