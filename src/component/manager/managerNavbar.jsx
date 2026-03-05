import {
  FaBars,
  FaMoon,
  FaSun,
  FaUserCircle,
  FaGlobe,
  FaSignOutAlt,
} from "react-icons/fa";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ManagerNavbar({
  setSidebarOpen,
  setCollapsed,
  collapsed,
}) {

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const navigate = useNavigate();

  useEffect(() => {

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

  }, [isDarkMode]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-slate-900 border-b dark:border-slate-800 px-4 py-3 flex justify-between items-center sticky top-0 z-30">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        {/* Mobile Sidebar */}
        <button
          className="md:hidden text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 p-2 rounded"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars size={20} />
        </button>

        {/* Desktop Collapse */}
        <button
          className="hidden md:block text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 p-2 rounded"
          onClick={() => setCollapsed(!collapsed)}
        >
          <FaBars size={18} />
        </button>

        <h2 className="font-semibold text-lg dark:text-white hidden sm:block">
          Manager Dashboard
        </h2>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* Dark Mode */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="text-gray-600 dark:text-yellow-400"
        >
          {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>

        {/* Language */}
        <div className="hidden sm:flex items-center gap-1 text-gray-600 dark:text-gray-300 cursor-pointer">
          <FaGlobe />
          <span className="text-sm font-medium uppercase">EN</span>
        </div>

        {/* Profile */}
        <div
          onClick={() => navigate("/manager/profile")}
          className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:text-blue-600"
        >
          <FaUserCircle size={24} />
          <span className="hidden md:block text-sm font-semibold">
            Manager
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm border border-red-300 hover:border-red-500 px-3 py-1.5 rounded-lg transition-all"
        >
          <FaSignOutAlt size={14} />
          <span className="hidden sm:block">Logout</span>
        </button>

      </div>

    </nav>
  );
}