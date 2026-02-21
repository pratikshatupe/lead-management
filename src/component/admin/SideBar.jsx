import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaMoneyBill,
  FaUsers,
  FaUserTie,
  FaPhone,
  FaBullhorn,
  FaEnvelope,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronRight,
  FaChevronLeft,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Sidebar() {
  // dropdown states
  const [openExpense, setOpenExpense] = useState(false);
  const [openSales, setOpenSales] = useState(false);
  const [openLeads, setOpenLeads] = useState(false);
  const [openMessaging, setOpenMessaging] = useState(false);

  // mobile sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // desktop collapse toggle (icons only)
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {/* ✅ Mobile Top Bar */}
      <div className="md:hidden flex justify-between items-center bg-blue-900 text-white p-4">
        <h1 className="font-bold">LEADPRO</h1>

        <button onClick={() => setSidebarOpen(true)}>
          <FaBars size={22} />
        </button>
      </div>

      {/* ✅ Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ✅ Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-screen bg-blue-900 text-white overflow-y-auto z-50
        transition-all duration-300 transform
        ${collapsed ? "w-20" : "w-64"}
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center sticky top-0 bg-blue-900 p-5 border-b border-blue-800">
          {!collapsed && <h1 className="text-xl font-bold">LEADPRO</h1>}

          <div className="flex gap-3">
            {/* Desktop collapse button */}
            <button
              className="hidden md:block"
              onClick={() => setCollapsed(!collapsed)}
            >
              <FaBars size={20} />
            </button>
            {/* Mobile close */}
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTimes />
            </button>
          </div>
        </div>

        <ul className="space-y-2 p-4 text-sm">

          {/* Dashboard */}
          <li className="flex items-center gap-3 bg-blue-700 p-3 rounded cursor-pointer">
            <FaHome />
            {!collapsed && "Dashboard"}
          </li>

          {/* Products */}
          <li className="flex items-center gap-3 hover:bg-blue-800 p-3 rounded cursor-pointer">
            <FaBox />
            {!collapsed && "Products"}
          </li>

          {/* Expense Manager */}
          <div>
            <li
              onClick={() => !collapsed && setOpenExpense(!openExpense)}
              className="flex justify-between items-center hover:bg-blue-800 p-3 rounded cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <FaMoneyBill />
                {!collapsed && "Expense Manager"}
              </div>
              {!collapsed &&
                (openExpense ? <FaChevronDown /> : <FaChevronRight />)}
            </li>

            {openExpense && !collapsed && (
              <ul className="ml-8 mt-2 space-y-2 text-gray-200">
                <li className="hover:text-white cursor-pointer">
                  Expense Categories
                </li>
                <li className="hover:text-white cursor-pointer">
                  Expenses
                </li>
              </ul>
            )}
          </div>

          {/* User Management */}
          <li className="flex items-center gap-3 hover:bg-blue-800 p-3 rounded cursor-pointer">
            <FaUsers />
            {!collapsed && "User Management"}
          </li>

          {/* Staff Members */}
          <li className="flex items-center gap-3 hover:bg-blue-800 p-3 rounded cursor-pointer">
            <FaUserTie />
            {!collapsed && "Staff Members"}
          </li>

          {/* Lead Management */}
          <li className="flex items-center gap-3 hover:bg-blue-800 p-3 rounded cursor-pointer">
            <FaPhone />
            {!collapsed && "Lead Management"}
          </li>

          {/* Campaigns */}
          <li className="flex items-center gap-3 hover:bg-blue-800 p-3 rounded cursor-pointer">
            <FaBullhorn />
            {!collapsed && "Campaigns"}
          </li>

          {/* Messaging */}
          <div>
            <li
              onClick={() => !collapsed && setOpenMessaging(!openMessaging)}
              className="flex justify-between items-center hover:bg-blue-800 p-3 rounded cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <FaEnvelope />
                {!collapsed && "Messaging"}
              </div>
              {!collapsed &&
                (openMessaging ? <FaChevronDown /> : <FaChevronRight />)}
            </li>

            {openMessaging && !collapsed && (
              <ul className="ml-8 mt-2 space-y-2 text-gray-200">
                <li className="hover:text-white cursor-pointer">
                  Email Templates
                </li>
              </ul>
            )}
          </div>

          {/* Forms */}
          <li className="flex items-center gap-3 hover:bg-blue-800 p-3 rounded cursor-pointer">
            <FaFileAlt />
            {!collapsed && "Forms"}
          </li>

          {/* Settings */}
          <li className="flex items-center gap-3 hover:bg-blue-800 p-3 rounded cursor-pointer">
            <FaCog />
            {!collapsed && "Settings"}
          </li>

          {/* Logout */}
          <li
            onClick={handleLogout}
            className="flex items-center gap-3 hover:bg-red-600 p-3 rounded cursor-pointer mt-6"
          >
            <FaSignOutAlt />
            {!collapsed && "Logout"}
          </li>

        </ul>
      </div>
    </>
  );
}