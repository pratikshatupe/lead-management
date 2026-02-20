import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // 🔐 Login Protection
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminAuth");

    if (isLoggedIn !== "true") {
      navigate("/admin-login");
    }
  }, [navigate]);

  // 🚪 Logout Function
  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin-login");
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-blue-700 text-white p-5">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <ul className="space-y-4">
          <li className="hover:bg-blue-600 p-2 rounded cursor-pointer">
            Dashboard
          </li>
          <li className="hover:bg-blue-600 p-2 rounded cursor-pointer">
            Users
          </li>
          <li className="hover:bg-blue-600 p-2 rounded cursor-pointer">
            Reports
          </li>
          <li
            onClick={handleLogout}
            className="hover:bg-red-600 p-2 rounded cursor-pointer mt-10 bg-red-500"
          >
            Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="bg-white px-4 py-2 rounded shadow">
            Welcome, Admin
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-2xl font-bold mt-2">150</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold">Active Users</h3>
            <p className="text-2xl font-bold mt-2">110</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold">Pending Requests</h3>
            <p className="text-2xl font-bold mt-2">12</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Users</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-2">Rahul Patil</td>
                <td className="p-2">rahul@gmail.com</td>
                <td className="p-2 text-green-600 font-semibold">Manager</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-2">Sneha More</td>
                <td className="p-2">sneha@gmail.com</td>
                <td className="p-2 text-blue-600 font-semibold">User</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-2">Amit Jadhav</td>
                <td className="p-2">amit@gmail.com</td>
                <td className="p-2 text-purple-600 font-semibold">Manager</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}