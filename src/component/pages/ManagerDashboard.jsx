import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../admin/SideBar";

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = useState(false);

  // ✅ login check
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "manager") {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ✅ Mobile Menu Button (fixed top-left) */}
      <button
        onClick={() => setOpenSidebar(!openSidebar)}
        className="md:hidden fixed top-4 left-4 z-50 bg-purple-700 text-white px-3 py-2 rounded shadow"
      >
        ☰
      </button>

      {/* ✅ Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full z-40
          transform ${openSidebar ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 transition-transform duration-300
        `}
      >
        <Sidebar />
      </div>

      {/* ✅ Overlay (mobile only) */}
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-30"
        />
      )}

      {/* ✅ MAIN CONTENT */}
      <div className="flex-1 w-full md:ml-64">

        {/* ✅ Header (extra top padding for mobile button space) */}
        <div className="bg-white shadow p-4 md:p-6 pt-16 md:pt-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">
            Manager Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded w-fit"
          >
            Logout
          </button>
        </div>

        {/* ✅ Page Content */}
        <div className="p-4 md:p-6">
          <div className="bg-white p-6 rounded-xl shadow">
            Welcome Manager 🚀
          </div>
        </div>

      </div>
    </div>
  );
}