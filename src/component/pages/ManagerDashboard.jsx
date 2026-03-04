import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  FaPhoneAlt, FaBullhorn, FaListAlt, FaCalendarCheck,
} from "react-icons/fa";

// ✅ Admin चा Sidebar नाही — ManagerLayout मधूनच sidebar येतो
export default function ManagerDashboard() {
  const navigate = useNavigate();

  // ✅ Role check — manager नसेल तर login वर redirect
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "manager") {
      navigate("/");
    }
  }, [navigate]);

  const stats = [
    { label: "Total Leads",      value: "248", color: "bg-green-500",  icon: <FaListAlt /> },
    { label: "Calls Today",      value: "34",  color: "bg-blue-500",   icon: <FaPhoneAlt /> },
    { label: "Follow Ups",       value: "12",  color: "bg-yellow-500", icon: <FaCalendarCheck /> },
    { label: "Active Campaigns", value: "5",   color: "bg-purple-500", icon: <FaBullhorn /> },
  ];

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">
        Welcome, Manager 👋
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
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

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-base font-semibold text-gray-700 mb-4 border-b pb-2">
          Recent Activity
        </h2>
        <div className="space-y-3 text-sm text-gray-600">
          {[
            "Lead #245 was updated by Admin",
            "Campaign 'Social Media' resumed",
            "Follow up scheduled for Lead #231",
            "New lead added: John Doe",
            "Call log saved for Lead #198",
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0">
              <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
              {activity}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}