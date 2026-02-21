import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../admin/Layout";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // login protection
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      navigate("/");
    }
  }, []);

  return (
    <Layout>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Active Campaigns</p>
          <h2 className="text-2xl font-bold">6</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Follow Up</p>
          <h2 className="text-2xl font-bold">24</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Call Made</p>
          <h2 className="text-2xl font-bold">59</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Duration</p>
          <h2 className="text-2xl font-bold">9h</h2>
        </div>

      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold">Active Campaigns</h3>
          <p className="text-gray-400 mt-4">Chart here</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold">Call Made</h3>
          <p className="text-gray-400 mt-4">Graph here</p>
        </div>

      </div>

    </Layout>
  );
}