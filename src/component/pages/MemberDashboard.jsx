import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function MemberDashboard() {
  const navigate = useNavigate();

  // 🔐 Page Protection
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "member") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-purple-700 text-white p-5">
        <h2 className="text-2xl font-bold mb-8">Member Panel</h2>

        <ul className="space-y-4">
          <li className="hover:bg-purple-600 p-2 rounded cursor-pointer">
            Dashboard
          </li>
          <li className="hover:bg-purple-600 p-2 rounded cursor-pointer">
            My Leads
          </li>
          <li className="hover:bg-purple-600 p-2 rounded cursor-pointer">
            Profile
          </li>

          <li
            onClick={() => {
              localStorage.removeItem("role");
              navigate("/");
            }}
            className="hover:bg-red-600 p-2 rounded cursor-pointer mt-10 bg-red-500"
          >
            Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Top Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Member Dashboard</h1>
          <div className="bg-white px-4 py-2 rounded shadow">
            Welcome, Member
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">

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

        {/* Recent Leads Table */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4">My Recent Leads</h3>

          <table className="w-full text-left border-collapse">
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