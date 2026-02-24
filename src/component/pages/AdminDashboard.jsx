import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../component/admin/Layout";
import { 
  FaBullhorn, FaCalendarCheck, FaPhone, FaClock, 
  FaCalendarAlt, FaChevronRight 
} from "react-icons/fa";
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend 
} from "recharts";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") navigate("/");
  }, [navigate]);

  const pieData = [
    { name: "Job Applications", value: 40, color: "#3f6212" }, 
    { name: "Website Development Campaign", value: 30, color: "#4ade80" }, 
    { name: "Make New Mobile Application", value: 30, color: "#a3e635" }, 
  ];

  const barData = [
    { date: "2026-02-15", calls: 1 },
    { date: "2026-02-19", calls: 2 },
    { date: "2026-02-20", calls: 1 },
    { date: "2026-02-21", calls: 3 },
    { date: "2026-02-22", calls: 6 },
    { date: "2026-02-23", calls: 9 },
    { date: "2026-02-24", calls: 1 },
  ];

  return (
    <Layout>
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold dark:text-white">Dashboard Overview</h1>
      </div>

      {/* DATE FILTER SECTION */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-md px-4 py-2 shadow-sm transition-all">
          <input 
            type="text" 
            placeholder="Start Date"
            className="bg-transparent outline-none text-sm text-gray-500 dark:text-slate-300 w-24"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span className="text-gray-300">→</span>
          <input 
            type="text" 
            placeholder="End Date"
            className="bg-transparent outline-none text-sm text-gray-500 dark:text-slate-300 w-24"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <FaCalendarAlt className="text-gray-300 ml-2" size={16} />
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Active Campaigns", val: "3", icon: <FaBullhorn />, color: "bg-[#14b8a6]" },
          { label: "Total Follow Up", val: "2", icon: <FaCalendarCheck />, color: "bg-[#22c55e]" },
          { label: "Call Made", val: "23", icon: <FaPhone />, color: "bg-[#ea580c]" },
          { label: "Total Duration", val: "1 H, 34 M", icon: <FaClock />, color: "bg-[#f87171]" }
        ].map((card, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border dark:border-slate-700 flex items-center gap-6">
            <div className={`${card.color} text-white p-4 rounded-xl shadow-md`}>
              {card.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold dark:text-white leading-tight">{card.val}</h2>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-tighter">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* PIE CHART */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-6 flex flex-col">
          <h3 className="font-semibold mb-6 dark:text-white text-sm uppercase tracking-wider">Active Campaigns Distribution</h3>
          <div className="flex-grow" style={{ minHeight: '250px', width: '100%' }}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" innerRadius={60} outerRadius={85} paddingAngle={2} stroke="none">
                  {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-8 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase truncate w-full">
                  {entry.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* BAR CHART */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold dark:text-white text-sm uppercase tracking-wider">Call Logs Analysis</h3>
            <button 
              onClick={() => navigate("/leads")}
              className="text-blue-500 text-xs font-semibold flex items-center gap-1 hover:underline"
            >
              View Leads <FaChevronRight size={10} />
            </button>
          </div>
          <div style={{ minHeight: '350px', width: '100%' }}>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8'}} allowDecimals={false} />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '12px' }} />
                <Bar name="Calls Count" dataKey="calls" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* TABLES SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Salesman Booking */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold dark:text-white">Recent Salesman Bookings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-gray-400 border-b dark:border-slate-700 bg-gray-50/50 dark:bg-slate-900/50">
                  <th className="p-3 font-semibold uppercase">Campaign</th>
                  <th className="p-3 font-semibold uppercase">Salesman</th>
                  <th className="p-3 font-semibold uppercase text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="3" className="py-10 text-center text-gray-400 italic">No bookings found</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Follow Up */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold dark:text-white">Upcoming Follow Ups</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-gray-400 border-b dark:border-slate-700 bg-gray-50/50 dark:bg-slate-900/50">
                  <th className="p-3 font-semibold uppercase">Campaign Name</th>
                  <th className="p-3 font-semibold uppercase text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="2" className="py-10 text-center text-gray-400 italic">No follow ups scheduled</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}