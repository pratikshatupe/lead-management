import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

export default function MemberNavbar({ toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-white shadow px-4 py-3 sticky top-0 z-10">

      {/* Left Side */}
      <div className="flex items-center gap-4">
        {/* ✅ Mobile toggle — blue-900 theme */}
        <button
          onClick={toggleSidebar}
          className="md:hidden bg-blue-900 text-white px-3 py-1.5 rounded text-sm"
        >
          ☰
        </button>

        <h1 className="text-base md:text-lg font-semibold text-gray-700">
          Member Panel
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-blue-900 font-medium text-sm">
          <FaUserCircle size={20} />
          <span className="hidden sm:block">Member</span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-red-500 hover:text-red-700 text-xs border border-red-300 hover:border-red-500 px-2.5 py-1.5 rounded-lg transition-all"
        >
          <FaSignOutAlt size={12} /> Logout
        </button>
      </div>

    </div>
  );
}