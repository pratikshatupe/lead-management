import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../admin/SideBar";

export default function MemberDashboard() {
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = useState(false);

  // ✅ Page protection
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "member") {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ✅ Mobile Toggle Button */}
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

      {/* ✅ Main Content */}
      {/* pl-14 → toggle overlap fix */}
      <div className="flex-1 p-4 md:p-6 w-full md:ml-64 pl-14 md:pl-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            Member Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded w-fit"
          >
            Logout
          </button>
        </div>

        {/* ✅ Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold">My Leads</h3>
            <p className="text-2xl font-bold mt-2">25</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold">Active</h3>
            <p className="text-2xl font-bold mt-2">15</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold">Converted</h3>
            <p className="text-2xl font-bold mt-2">5</p>
          </div>

        </div>

        {/* ✅ Table */}
        <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4">
            My Recent Leads
          </h3>

          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2">Name</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-2">Rahul Patil</td>
                <td className="p-2">9876543210</td>
                <td className="p-2 text-green-600 font-semibold">Active</td>
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className="p-2">Sneha More</td>
                <td className="p-2">9123456780</td>
                <td className="p-2 text-yellow-600 font-semibold">Pending</td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="p-2">Amit Jadhav</td>
                <td className="p-2">9988776655</td>
                <td className="p-2 text-blue-600 font-semibold">Converted</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}