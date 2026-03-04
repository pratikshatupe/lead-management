import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

export default function ManagerNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-white shadow px-4 py-3 flex justify-between items-center w-full sticky top-0 z-10">

      <h2 className="text-base md:text-lg font-semibold text-gray-700">
        Manager Dashboard
      </h2>

      <div className="flex gap-3 items-center text-sm">
        <span className="text-gray-500 hidden sm:block">🌙</span>
        <span className="text-gray-500 hidden sm:block">EN</span>

        <div className="flex items-center gap-2 text-green-700 font-medium">
          <FaUserCircle size={20} />
          <span className="hidden sm:block">Manager</span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-red-500 hover:text-red-700 text-xs border border-red-300 hover:border-red-500 px-2.5 py-1.5 rounded-lg transition-all"
        >
          <FaSignOutAlt size={12} /> Logout
        </button>
      </div>

    </div>
  );
}