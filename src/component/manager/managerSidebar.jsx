import { useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBullhorn,
  FaListAlt,
  FaCalendarCheck,
  FaSignOutAlt,
  FaTimes,
  FaChevronDown,
  FaChevronRight,
  FaUserTie,
  FaHeadset,
  FaEnvelope,
  FaWpforms,
  FaCog,
  FaUserPlus,
} from "react-icons/fa";
import { useState } from "react";

const menuItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, path: "/manager" },
  {
    label: "Salesmans",
    icon: <FaUserTie />,
    children: [
      { label: "Salesmans", path: "/manager/salesmans" },
      { label: "Salesmans Bookings", path: "/manager/salesman-bookings" },
    ],
  },
  { label: "Lead Management", icon: <FaUserPlus />, path: "/manager/leads" },
  { label: "Call Manager", icon: <FaHeadset />, path: "/manager/calls" },
  { label: "Campaigns", icon: <FaBullhorn />, path: "/manager/campaigns" },
  {
    label: "Lead & Calls",
    icon: <FaListAlt />,
    children: [
      { label: "Leads", path: "/manager/leads" },
      { label: "Call Logs", path: "/manager/call-logs" },
      { label: "Lead Notes", path: "/manager/lead-notes" },
    ],
  },
  { label: "Lead Follow Up", icon: <FaCalendarCheck />, path: "/manager/follow-up" },
  {
    label: "Settings",
    icon: <FaCog />,
    children: [
      { label: "Lead Table Fields", path: "/manager/lead-table-fields" },
    ],
  },
  {
    label: "Messaging",
    icon: <FaEnvelope />,
    children: [
      { label: "Email Templates", path: "/manager/email-templates" },
    ],
  },
  { label: "Forms", icon: <FaWpforms />, path: "/manager/forms" },
  { label: "Logout", icon: <FaSignOutAlt />, logout: true },
];

export default function ManagerSidebar({ collapsed, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`${collapsed ? "w-20" : "w-64"} 
      h-screen bg-blue-900 text-white flex flex-col transition-all duration-300
      fixed top-0 left-0 z-50`}
    >
      {/* Logo */}
      <div className="flex justify-between items-center p-5 border-b border-blue-800 flex-shrink-0">
        {!collapsed && <h1 className="text-xl font-bold">LEADPRO</h1>}
        <button onClick={onClose} className="md:hidden">
          <FaTimes size={20} />
        </button>
      </div>

      {/* Menu - Scrollable */}
      <ul className="space-y-1 p-3 text-sm flex-1 overflow-y-auto">
        {menuItems.map((item, i) => (
          <div key={i}>
            <li
              onClick={() => {
                if (item.logout) return handleLogout();
                if (item.children) {
                  setOpenMenu(openMenu === i ? null : i);
                } else if (item.path) {
                  navigate(item.path);
                  onClose?.();
                }
              }}
              className={`flex justify-between items-center p-3 rounded-lg cursor-pointer
              ${
                item.path && isActive(item.path)
                  ? "bg-white/20"
                  : "hover:bg-blue-800"
              }`}
            >
              {/* Icon + Label */}
              <div className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </div>

              {/* Dropdown Arrow */}
              {item.children && !collapsed && (
                openMenu === i ? (
                  <FaChevronDown size={12} />
                ) : (
                  <FaChevronRight size={12} />
                )
              )}
            </li>

            {/* Dropdown */}
            {item.children && openMenu === i && !collapsed && (
              <ul className="ml-8 mt-1 space-y-1 border-l border-blue-700">
                {item.children.map((child, j) => (
                  <li
                    key={j}
                    onClick={() => {
                      navigate(child.path);
                      onClose?.();
                    }}
                    className={`py-2 px-4 text-xs cursor-pointer rounded
                    ${
                      isActive(child.path)
                        ? "bg-blue-700 text-white"
                        : "text-gray-300 hover:text-white hover:bg-blue-800"
                    }`}
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
  );
}