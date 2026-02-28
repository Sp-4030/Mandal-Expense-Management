import { Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { FaBars, FaChevronCircleLeft, FaFilePdf, FaPlus, FaRegImages, FaUsers } from "react-icons/fa";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setIsOpen(false);
      } else {
        setIsMobile(false);
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get logged user
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setLoggedUser(storedUser);
    }
  }, []);

  const linkClass =
    "flex items-center gap-2 px-3 py-2 rounded hover:text-yellow-300 transition-colors duration-200";

  const activeClass = "bg-blue-900 text-yellow-300 font-semibold";

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 text-white bg-red-600 p-2 rounded-md md:hidden"
        >
          <FaBars />
        </button>
      )}

      {/* Overlay (Mobile Only) */}
      {isMobile && isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
        />
      )}

      <aside
        className={`fixed md:relative z-50 flex flex-col h-full bg-red-500 text-white p-4 shadow-md transition-all duration-300
        ${isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full md:w-16 md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          {isOpen && <h2 className="text-2xl font-bold">Dashboard</h2>}
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="text-white text-xl cursor-pointer"
            >
              {isOpen ? <FaChevronCircleLeft className="size-7" /> : <FaBars />}
            </button>
          )}
        </div>

        {/* Nav Links */}
        <ul className="flex-1 space-y-4 overflow-y-auto">
          {[
            { to: "/gallary", icon: <FaRegImages />, label: "Gallery" },
            { to: "/register", icon: <FaUsers />, label: "Admins" },
            { to: "/create", icon: <MdOutlineCreateNewFolder />, label: "Create New Year PDF" },
            { to: "/Add", icon: <FaPlus />, label: "Add / Remove / Update" },
            { to: "/pdfs", icon: <FaFilePdf />, label: "PDFs" },
          ].map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                onClick={() => isMobile && setIsOpen(false)}
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                {item.icon}
                {isOpen && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Bottom User Section */}
        <div className="mt-auto">
          {loggedUser && (
            <div className="flex items-center gap-2 bg-red-600 p-2 rounded shadow">
              <Lock size={18} />
              {isOpen && (
                <span className="text-sm font-semibold capitalize">
                  Welcome, {loggedUser}
                </span>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
