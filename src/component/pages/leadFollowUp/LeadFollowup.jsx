import { useState, useRef, useEffect } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Trash2, ChevronDown } from "lucide-react";

// ── Custom Dropdown Component ──────────────────────────────────────────────
function CustomDropdown({ options, value, onChange, placeholder, width = "w-full md:w-48" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className={`relative ${width}`}>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between gap-2 border rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <span className={value ? "text-gray-800 dark:text-white" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <ChevronDown
          size={14}
          className={`flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <ul className="absolute left-0 top-[calc(100%+4px)] w-full bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg shadow-xl z-[9999] max-h-52 overflow-y-auto">
          {/* Placeholder option */}
          <li
            onClick={() => { onChange(""); setOpen(false); }}
            className="px-3 py-2 text-sm text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-600 cursor-pointer"
          >
            {placeholder}
          </li>
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`px-3 py-2 text-sm cursor-pointer transition-colors
                ${value === opt
                  ? "bg-blue-50 text-blue-600 font-medium dark:bg-slate-600 dark:text-blue-300"
                  : "text-gray-700 dark:text-white hover:bg-blue-50 dark:hover:bg-slate-600"
                }`}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function LeadFollowup() {

  const [showPopup, setShowPopup] = useState(false);
  const [campaign, setCampaign]   = useState("");
  const [user, setUser]           = useState("Admin");

  const data = [
    {
      id: 1,
      ref: "---",
      campaign: "Jillian Stanley",
      time: "06-03-2026 10:07 am",
      follow: "Admin"
    }
  ];

  return (
    <div className="p-4 md:p-6">

      <h1 className="text-2xl font-bold mb-4 dark:text-white">
        Lead Follow Up
      </h1>

      {/* ── Filters ── */}
      <div className="flex flex-col md:flex-row md:flex-wrap md:justify-end gap-3 mb-4">

        {/* Campaign Dropdown */}
        <CustomDropdown
          options={["Campaign 1", "Campaign 2"]}
          value={campaign}
          onChange={setCampaign}
          placeholder="Select Campaign..."
        />

        {/* User Dropdown */}
        <CustomDropdown
          options={["Admin", "Test1", "Test2", "Team Leader"]}
          value={user}
          onChange={setUser}
          placeholder="Select User..."
          width="w-full md:w-40"
        />

        {/* Start Date — separate box */}
        <input
          type="date"
          className="w-full md:w-auto border rounded-lg px-3 py-2 text-sm outline-none bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-400"
        />

        {/* End Date — separate box */}
        <input
          type="date"
          className="w-full md:w-auto border rounded-lg px-3 py-2 text-sm outline-none bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-400"
        />

      </div>

      {/* ── Desktop Table ── */}
      <div className="hidden md:block bg-white dark:bg-slate-800 rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b text-gray-500">
            <tr>
              <th className="p-3"><input type="checkbox" /></th>
              <th className="p-3 text-left">Reference Number</th>
              <th className="p-3 text-left">Campaign Name</th>
              <th className="p-3 text-left">Follow Up Time</th>
              <th className="p-3 text-left">Follow Up By</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50 dark:hover:bg-slate-700">
                <td className="p-3"><input type="checkbox" /></td>
                <td className="p-3 text-blue-500">{item.ref}</td>
                <td className="p-3 dark:text-white">{item.campaign}</td>
                <td className="p-3 dark:text-white">{item.time}</td>
                <td className="p-3 dark:text-white">{item.follow}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowPopup(true)}
                      className="w-9 h-9 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-sm"
                    >
                      <MdKeyboardDoubleArrowRight size={16} />
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-sm">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Cards ── */}
      <div className="md:hidden space-y-4">
        {data.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500 text-sm">Reference</span>
              <span className="text-blue-500 text-sm font-medium">{item.ref}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500 text-sm">Campaign</span>
              <span className="text-sm dark:text-white">{item.campaign}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500 text-sm">Follow Time</span>
              <span className="text-sm dark:text-white">{item.time}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-gray-500 text-sm">Follow By</span>
              <span className="text-sm dark:text-white">{item.follow}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowPopup(true)}
                className="w-9 h-9 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-sm"
              >
                <MdKeyboardDoubleArrowRight size={16} />
              </button>
              <button className="w-9 h-9 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-sm">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Confirm Popup ── */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-sm text-center shadow-xl">
            <h2 className="text-lg font-semibold mb-2 dark:text-white">Start?</h2>
            <p className="text-gray-500 mb-6 text-sm">
              Are you sure you want to start this follow up lead...
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="px-5 py-2 border rounded-lg text-sm hover:bg-gray-50 dark:text-white dark:border-slate-600"
              >
                No
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}