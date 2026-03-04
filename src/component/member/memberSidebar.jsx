import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt, FaPhoneAlt, FaListAlt,
  FaCalendarCheck, FaStickyNote, FaSignOutAlt, FaTimes,
} from "react-icons/fa";

const navItems = [
  { label: "Dashboard",      path: "/member",             icon: <FaTachometerAlt />, end: true },
  { label: "Call Manager",   path: "/member/calls",       icon: <FaPhoneAlt /> },
  { label: "Leads & Calls",  path: "/member/leads",       icon: <FaListAlt /> },
  { label: "Lead Follow Up", path: "/member/follow-up",   icon: <FaCalendarCheck /> },
  { label: "Lead Notes",     path: "/member/notes",       icon: <FaStickyNote /> },
];

export default function MemberSidebar({ onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-64 h-full bg-blue-900 dark:bg-slate-900 text-white flex flex-col border-r border-blue-800 dark:border-slate-800">

      {/* Header — Admin sidebar सारखाच style */}
      <div className="flex justify-between items-center p-5 border-b border-blue-800 dark:border-slate-800 sticky top-0 bg-blue-900 dark:bg-slate-900 z-10">
        <h1 className="text-xl font-bold tracking-wider">LEADPRO</h1>
        <button
          onClick={onClose}
          className="md:hidden text-white hover:text-blue-300 transition-colors"
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/* Nav Links */}
      <ul className="space-y-1 p-3 text-sm flex-1 overflow-y-auto">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all font-medium
                ${isActive
                  ? "bg-blue-800 text-white"
                  : "hover:bg-blue-800 dark:hover:bg-slate-800 text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Logout */}
      <ul className="p-3 text-sm border-t border-blue-800 dark:border-slate-800">
        <li
          onClick={handleLogout}
          className="flex items-center gap-3 hover:bg-blue-800 dark:hover:bg-slate-800 p-3 rounded-lg cursor-pointer transition-all font-medium"
        >
          <span className="text-lg"><FaSignOutAlt /></span>
          <span>Logout</span>
        </li>
      </ul>

    </div>
  );
}