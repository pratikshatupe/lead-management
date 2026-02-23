import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../admin/Layout";

// ICONS
import {
  FaBullhorn,
  FaCalendarCheck,
  FaPhone,
  FaClock,
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // 🔐 Login Protection
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") navigate("/");
  }, [navigate]);

  // ✅ Pie Chart Data
  const pieData = [
    { name: "Sell Home Loan Campaign", value: 30, color: "#14b8a6" },
    { name: "Live Event Campaign", value: 10, color: "#ef4444" },
    { name: "Job Applications", value: 15, color: "#9333ea" },
    { name: "Electronic Item Sell Campaign", value: 20, color: "#2563eb" },
    { name: "Website Development Campaign", value: 25, color: "#22c55e" },
  ];

  // ✅ Bar Chart Data
  const barData = [
    { date: "2026-02-13", calls: 1 },
    { date: "2026-02-14", calls: 1 },
    { date: "2026-02-15", calls: 1 },
    { date: "2026-02-19", calls: 2 },
    { date: "2026-02-20", calls: 2 },
    { date: "2026-02-21", calls: 3 },
    { date: "2026-02-22", calls: 7 },
    { date: "2026-02-23", calls: 14 },
  ];

  return (
    <Layout>
      {/* ===== PAGE TITLE ===== */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* ===== TOP STATS CARDS WITH ICON ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

        {/* Active Campaign */}
        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <div className="bg-teal-500 text-white p-4 rounded-lg">
            <FaBullhorn size={20} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Active Campaigns</p>
            <h2 className="text-2xl font-bold">6</h2>
          </div>
        </div>

        {/* Follow Up */}
        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <div className="bg-green-500 text-white p-4 rounded-lg">
            <FaCalendarCheck size={20} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Follow Up</p>
            <h2 className="text-2xl font-bold">3</h2>
          </div>
        </div>

        {/* Call Made */}
        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <div className="bg-orange-500 text-white p-4 rounded-lg">
            <FaPhone size={20} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Call Made</p>
            <h2 className="text-2xl font-bold">31</h2>
          </div>
        </div>

        {/* Duration */}
        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <div className="bg-pink-400 text-white p-4 rounded-lg">
            <FaClock size={20} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Duration</p>
            <h2 className="text-2xl font-bold">2h 5s</h2>
          </div>
        </div>

      </div>

      {/* ===== CHART SECTION ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ===== PIE CHART (smaller side) ===== */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-4">
            Active Actioned Campaigns
          </h3>

          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={110}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ===== BAR CHART (bigger side) ===== */}
        <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
          <h3 className="font-semibold mb-4">Call Made</h3>

          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calls" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </Layout>
  );
}