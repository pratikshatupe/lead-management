import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaListAlt, FaCheckCircle, FaExchangeAlt } from "react-icons/fa";

// ✅ Admin चा Sidebar नाही — MemberLayout मधूनच sidebar येतो
export default function MemberDashboard() {
  const navigate = useNavigate();

  // ✅ Role check — member नसेल तर login वर redirect
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "member") {
      navigate("/");
    }
  }, [navigate]);

  const stats = [
    { label: "My Leads",   value: "25", color: "bg-blue-500",   icon: <FaListAlt /> },
    { label: "Active",     value: "15", color: "bg-green-500",  icon: <FaCheckCircle /> },
    { label: "Converted",  value: "5",  color: "bg-purple-500", icon: <FaExchangeAlt /> },
  ];

  const leads = [
    { name: "Rahul Patil",  phone: "9876543210", status: "Active",    statusColor: "text-green-600" },
    { name: "Sneha More",   phone: "9123456780", status: "Pending",   statusColor: "text-yellow-600" },
    { name: "Amit Jadhav",  phone: "9988776655", status: "Converted", statusColor: "text-blue-600" },
  ];

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">
        Welcome, Member 👋
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className={`${s.color} text-white rounded-xl p-5 shadow-md flex items-center gap-4`}>
            <div className="text-3xl opacity-80">{s.icon}</div>
            <div>
              <p className="text-sm font-medium opacity-90">{s.label}</p>
              <p className="text-3xl font-bold">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white rounded-xl shadow p-5 overflow-x-auto">
        <h2 className="text-base font-semibold text-gray-700 mb-4 border-b pb-2">
          My Recent Leads
        </h2>
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="p-2 font-semibold">Name</th>
              <th className="p-2 font-semibold">Phone</th>
              <th className="p-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, i) => (
              <tr key={i} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-2 font-medium text-gray-800">{lead.name}</td>
                <td className="p-2 text-gray-600">{lead.phone}</td>
                <td className={`p-2 font-semibold ${lead.statusColor}`}>{lead.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}