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
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [openMenu, setOpenMenu] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // ================= ROLE BASED MENU =================
  const menuByRole = {
    // ================= ADMIN =================
    admin: [
      { label: "Dashboard", icon: <FaHome />, path: "/admin" },
      { label: "Products", icon: <FaBox />, path: "/admin/products" },

      {
        label: "Expense Manager",
        icon: <FaMoneyBill />,
        children: [
          { label: "Expense Categories", path: "/admin/expense-categories" },
          { label: "Expenses", path: "/admin/expenses" },
        ],
      },

      { label: "User Management", icon: <FaUsers />, path: "/admin/users" },
      { label: "Staff Members", icon: <FaUserTie />, path: "/admin/staff" },

      {
        label: "Salesmans",
        icon: <FaUserTie />,
        children: [
          { label: "Salesmans", path: "/admin/salesmans" },
          { label: "Salesmans Bookings", path: "/admin/salesman-bookings" },
        ],
      },

      { label: "Lead Management", icon: <FaPhone />, path: "/admin/leads" },
      { label: "Call Manager", icon: <FaPhone />, path: "/admin/calls" },
      { label: "Campaigns", icon: <FaBullhorn />, path: "/admin/campaigns" },

      {
        label: "Lead & Calls",
        icon: <FaPhone />,
        children: [
          { label: "Leads", path: "/admin/all-leads" },
          { label: "Call Logs", path: "/admin/call-logs" },
          { label: "Lead Notes", path: "/admin/lead-notes" },
        ],
      },

      { label: "Lead Follow Up", icon: <FaPhone />, path: "/admin/followups" },
      { label: "Lead Table Fields", icon: <FaFileAlt />, path: "/admin/lead-fields" },

      {
        label: "Messaging",
        icon: <FaEnvelope />,
        children: [
          { label: "Email Templates", path: "/admin/email-templates" },
        ],
      },

      { label: "Forms", icon: <FaFileAlt />, path: "/admin/forms" },
      { label: "Settings", icon: <FaCog />, path: "/admin/settings" },
      { label: "Logout", icon: <FaSignOutAlt />, logout: true },
    ],

    // ================= MANAGER =================
    manager: [
      { label: "Dashboard", icon: <FaHome />, path: "/manager" },
      { label: "User Management", icon: <FaUsers />, path: "/manager/users" },

      {
        label: "Salesmans",
        icon: <FaUserTie />,
        children: [
          { label: "Salesmans", path: "/manager/salesmans" },
          { label: "Salesman Bookings", path: "/manager/salesman-bookings" },
        ],
      },

      { label: "Lead Management", icon: <FaPhone />, path: "/manager/leads" },
      { label: "Call Manager", icon: <FaPhone />, path: "/manager/calls" },
      { label: "Campaigns", icon: <FaBullhorn />, path: "/manager/campaigns" },
      { label: "Lead & Calls", icon: <FaPhone />, path: "/manager/lead-calls" },
      { label: "Lead Follow Up", icon: <FaPhone />, path: "/manager/followups" },

      {
        label: "Messaging",
        icon: <FaEnvelope />,
        children: [
          { label: "Email Templates", path: "/manager/email-templates" },
        ],
      },

      { label: "Forms", icon: <FaFileAlt />, path: "/manager/forms" },
      { label: "Settings", icon: <FaCog />, path: "/manager/settings" },
      { label: "Logout", icon: <FaSignOutAlt />, logout: true },
    ],

    // ================= MEMBER (UPDATED) =================
    member: [
      { label: "Dashboard", icon: <FaHome />, path: "/member" },

      { label: "Lead Management", icon: <FaPhone />, path: "/member/leads" },
      { label: "Call Manager", icon: <FaPhone />, path: "/member/calls" },
      { label: "Leads & Calls", icon: <FaPhone />, path: "/member/lead-calls" },
      { label: "Lead Follow Up", icon: <FaPhone />, path: "/member/followups" },

      {
        label: "Messaging",
        icon: <FaEnvelope />,
        children: [
          { label: "Email Templates", path: "/member/email-templates" },
        ],
      },

      { label: "Forms", icon: <FaFileAlt />, path: "/member/forms" },
      { label: "Settings", icon: <FaCog />, path: "/member/settings" },

      { label: "Logout", icon: <FaSignOutAlt />, logout: true },
    ],
  };

  const menu = menuByRole[role] || [];

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex justify-between items-center bg-blue-900 text-white p-4">
        <h1 className="font-bold">LEADPRO</h1>
        <button onClick={() => setSidebarOpen(true)}>
          <FaBars size={22} />
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
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
            <button
              className="hidden md:block"
              onClick={() => setCollapsed(!collapsed)}
            >
              <FaBars />
            </button>

            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* MENU */}
        <ul className="space-y-2 p-4 text-sm">
          {menu.map((item, i) => (
            <div key={i}>
              <li
                onClick={() => {
                  if (item.logout) return handleLogout();

                  if (item.children) {
                    setOpenMenu(openMenu === i ? null : i);
                  } else if (item.path) {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }
                }}
                className="flex justify-between items-center hover:bg-blue-800 p-3 rounded cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {!collapsed && item.label}
                </div>

                {!collapsed &&
                  item.children &&
                  (openMenu === i ? <FaChevronDown /> : <FaChevronRight />)}
              </li>

              {item.children && openMenu === i && !collapsed && (
                <ul className="ml-8 mt-2 space-y-2 text-gray-200">
                  {item.children.map((child, j) => (
                    <li
                      key={j}
                      onClick={() => {
                        navigate(child.path);
                        setSidebarOpen(false);
                      }}
                      className="hover:text-white cursor-pointer"
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