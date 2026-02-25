import { useNavigate } from "react-router-dom";
import {
  FaHome, FaBox, FaMoneyBill, FaUsers, FaUserTie, FaPhone,
  FaBullhorn, FaEnvelope, FaFileAlt, FaCog, FaSignOutAlt,
  FaChevronDown, FaChevronRight, FaTimes, 
  FaCalendarCheck, // Fix for the error
  FaWpforms
} from "react-icons/fa";
import { useState } from "react";

export default function Sidebar({ sidebarOpen, setSidebarOpen, collapsed }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [openMenu, setOpenMenu] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menuByRole = {
    admin: [
      { label: "Dashboard", icon: <FaHome />, path: "/admin" },
      { label: "Products", icon: <FaBox />, path: "/products" },
      {
        label: "Expense Manager",
        icon: <FaMoneyBill />,
        children: [
          { label: "Expense Categories", path: "/expense-categories" },
          { label: "Expenses", path: "/expense" },
        ],
      },
      { label: "User Management", icon: <FaUsers />, path: "/users" },
      { label: "Staff Members", icon: <FaUserTie />, path: "/staff" },
      {
        label: "Salesmans",
        icon: <FaUserTie />,
        children: [
          { label: "Salesmans", path: "/salesmans" },
          { label: "Salesmans Bookings", path: "/salesman-bookings" },
        ],
      },
      { label: "Lead Management", icon: <FaPhone />, path: "/leads" },
      { label: "Call Manager", icon: <FaPhone />, path: "/calls" },
      { label: "Campaigns", icon: <FaBullhorn />, path: "/campaigns" },
      {
        label: "Lead & Calls",
        icon: <FaPhone />,
        children: [
          { label: "Leads", path: "/leads" },
          { label: "Call Logs", path: "/call-logs" },
          { label: "Lead Notes", path: "/lead-notes" },
        ],
      },
      { label: "Lead Follow Up", icon: <FaCalendarCheck />, path: "/follow-up" },
      {
        label: "Settings",
        icon: <FaCog />,
        children: [
          { label: "Lead Table Fields", path: "/lead-table-fields" },
        ],
      },
      {
        label: "Messaging",
        icon: <FaEnvelope />,
        children: [
          { label: "Email Templates", path: "/email-templates" },
        ],
      },
      { label: "Forms Settings", icon: <FaWpforms />, path: "/forms-settings" },
      { label: "Logout", icon: <FaSignOutAlt />, logout: true },
    ],
  };

  const menu = menuByRole[role] || [];

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div
        className={`fixed md:static top-0 left-0 h-screen bg-blue-900 dark:bg-slate-900 text-white overflow-y-auto z-50
        transition-all duration-300 transform border-r dark:border-slate-800
        ${collapsed ? "w-20" : "w-64"}
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex justify-between items-center p-5 border-b border-blue-800 dark:border-slate-800 sticky top-0 bg-blue-900 dark:bg-slate-900 z-10">
          {!collapsed && <h1 className="text-xl font-bold tracking-wider">LEADPRO</h1>}
          <button className="md:hidden text-white" onClick={() => setSidebarOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>

        <ul className="space-y-1 p-3 text-sm">
          {menu.map((item, i) => (
            <div key={i}>
              <li
                onClick={() => {
                  if (item.logout) return handleLogout();
                  if (item.children) setOpenMenu(openMenu === i ? null : i);
                  else if (item.path) { navigate(item.path); setSidebarOpen(false); }
                }}
                className={`flex justify-between items-center hover:bg-blue-800 dark:hover:bg-slate-800 p-3 rounded-lg cursor-pointer transition-all ${openMenu === i ? 'bg-blue-800/50' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                </div>
                {!collapsed && item.children && (
                  <span className="transition-transform duration-200">
                    {openMenu === i ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
                  </span>
                )}
              </li>
              
              {item.children && openMenu === i && !collapsed && (
                <ul className="ml-9 mt-1 space-y-1 border-l border-blue-700 dark:border-slate-700">
                  {item.children.map((child, j) => (
                    <li 
                      key={j} 
                      onClick={() => { navigate(child.path); setSidebarOpen(false); }} 
                      className="hover:text-white text-gray-300 dark:text-slate-400 cursor-pointer py-2 px-4 text-xs hover:bg-blue-800/30 rounded-r-md transition-colors"
                    >
                      {child.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}