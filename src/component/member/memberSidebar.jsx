import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaListAlt,
  FaCalendarCheck,
  FaEnvelope,
  FaWpforms,
  FaCog,
  FaSignOutAlt,
  FaTimes,
  FaChevronDown,
  FaChevronRight
} from "react-icons/fa";
import { useState } from "react";

export default function MemberSidebar({ onClose, collapsed }) {

  const navigate = useNavigate();
  const [leadMenu, setLeadMenu] = useState(false);
  const [messageMenu, setMessageMenu] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      className={`
        ${collapsed ? "w-20" : "w-64"}
        h-screen bg-blue-900 text-white
        flex flex-col
        transition-all duration-300
        fixed top-0 left-0 z-50
      `}
    >

      {/* HEADER */}
      <div className="flex justify-between items-center p-5 border-b border-blue-800 flex-shrink-0">
        <h1 className="text-xl font-bold tracking-wider">
          {collapsed ? "LP" : "LEADPRO"}
        </h1>
        <button onClick={onClose} className="md:hidden">
          <FaTimes />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">

        {/* DASHBOARD */}
        <NavLink
          to="/member"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 mx-2 mt-2 rounded-lg
            ${isActive ? "bg-blue-700" : "hover:bg-blue-800"}`
          }
        >
          <FaTachometerAlt />
          {!collapsed && "Dashboard"}
        </NavLink>

        {/* LEAD MANAGEMENT */}
        <div
          onClick={() => setLeadMenu(!leadMenu)}
          className="flex items-center justify-between p-3 mx-2 cursor-pointer hover:bg-blue-800 rounded-lg mt-2"
        >
          <div className="flex items-center gap-3">
            <FaListAlt />
            {!collapsed && "Lead Management"}
          </div>
          {!collapsed && (leadMenu ? <FaChevronDown /> : <FaChevronRight />)}
        </div>

        {leadMenu && !collapsed && (
          <div className="ml-6">
            <NavLink to="/member/calls" className="block p-2 hover:bg-blue-800 rounded">
              Call Manager
            </NavLink>
            <NavLink to="/member/leads" className="block p-2 hover:bg-blue-800 rounded">
              Leads & Calls
            </NavLink>
            <NavLink to="/member/notes" className="block p-2 hover:bg-blue-800 rounded">
              Lead Notes
            </NavLink>
          </div>
        )}

        {/* FOLLOW UP */}
        <NavLink
          to="/member/follow-up"
          className="flex items-center gap-3 p-3 mx-2 rounded-lg hover:bg-blue-800"
        >
          <FaCalendarCheck />
          {!collapsed && "Lead Follow Up"}
        </NavLink>

        {/* MESSAGING */}
        <div
          onClick={() => setMessageMenu(!messageMenu)}
          className="flex items-center justify-between p-3 mx-2 cursor-pointer hover:bg-blue-800 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <FaEnvelope />
            {!collapsed && "Messaging"}
          </div>
          {!collapsed && (messageMenu ? <FaChevronDown /> : <FaChevronRight />)}
        </div>

        {messageMenu && !collapsed && (
          <div className="ml-6">
            <NavLink to="/member/email-templates" className="block p-2 hover:bg-blue-800 rounded">
              Email Templates
            </NavLink>
          </div>
        )}

        {/* FORMS */}
        <NavLink
          to="/member/forms"
          className="flex items-center gap-3 p-3 mx-2 rounded-lg hover:bg-blue-800"
        >
          <FaWpforms />
          {!collapsed && "Forms"}
        </NavLink>

        {/* SETTINGS */}
        <NavLink
          to="/member/settings"
          className="flex items-center gap-3 p-3 mx-2 rounded-lg hover:bg-blue-800"
        >
          <FaCog />
          {!collapsed && "Settings"}
        </NavLink>
      </div>

      {/* LOGOUT */}
      <div className="p-3 border-t border-blue-800 flex-shrink-0">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 hover:bg-blue-800 rounded-lg"
        >
          <FaSignOutAlt />
          {!collapsed && "Logout"}
        </button>
      </div>

    </div>
  );
}