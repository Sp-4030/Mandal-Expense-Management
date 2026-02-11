import React, { useState, useEffect } from "react";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { FaBars, FaFilePdf, FaChevronCircleLeft, FaHome, FaPlus, FaUser, FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Lock } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [loggedUser, setLoggedUser] = useState("");

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setLoggedUser(storedUser);
    }
  }, []);

  const linkClass =
    "flex items-center gap-2 px-2 py-2 rounded hover:text-yellow-300 transition-colors duration-200";

  const activeClass = "bg-blue-900 text-yellow-300 font-semibold";

  return (
    <aside
      className={`flex flex-col h-screen bg-red-500 text-white p-4 shadow-md transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex justify-between items-center mb-6">
        {isOpen && (
          <h2 className="text-2xl font-bold cursor-pointer">
            Dashboard
          </h2>
        )}
        <button
          onClick={toggleSidebar}
          className="text-white text-xl focus:outline-none cursor-pointer"
        >
          {isOpen ? <FaChevronCircleLeft className="size-7" /> : <FaBars />}
        </button>
      </div>

      {/* Nav Links */}
      <ul className="flex-1 space-y-4 overflow-y-auto">
        <li>
          <NavLink
            to="/gallary"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            <FaHome />
            {isOpen && <span>Home</span>}
          </NavLink>
        </li>

             <li>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            <FaUsers />
            {isOpen && <span>Admins</span>}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            <MdOutlineCreateNewFolder />
            {isOpen && <span>Create New Year PDF</span>}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/Add"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            <FaPlus />
            {isOpen && <span>Add / Remove / Update</span>}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/pdfs"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            <FaFilePdf />
            {isOpen && <span>PDFs</span>}
          </NavLink>
        </li>
      </ul>

      {/* Bottom User Section */}
      <div className="mt-auto">
        {loggedUser && (
          <div className="flex items-center gap-2 bg-red-600 p-2 rounded shadow">
            <Lock size={18} />
            {isOpen && (
              <span className="text-sm font-semibold text-transform: capitalize">
                Welcome, {loggedUser}
              </span>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
