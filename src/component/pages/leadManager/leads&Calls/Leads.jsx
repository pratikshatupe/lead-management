import React, { useState, useMemo, useEffect } from 'react';
import Layout from "../../../admin/Layout";
import {
  FaPlay, FaBullhorn, FaCheckCircle, FaLayerGroup, FaRedo,
  FaChevronDown, FaChevronLeft, FaChevronRight, FaPhoneAlt, FaClock, FaChartLine
} from 'react-icons/fa';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

function Leads() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('active');
  const [subTab, setSubTab] = useState('Started');
  const [selectedRef, setSelectedRef] = useState("");
  const [viewAllCampaigns, setViewAllCampaigns] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;

  const leadData = useMemo(() => {
    const names = ["Tracey", "Novella", "Celia", "Akeem", "Cyrus", "Jacques", "Catalina", "John", "Rahul", "Priya"];
    const campaigns = ["Make New Mobile Application", "Website Development", "Digital Marketing", "SEO Services"];
    return Array.from({ length: 50 }).map((_, i) => ({
      ref: `MEP_${6464579 + i}`,
      campaign: campaigns[i % campaigns.length],
      name: names[i % names.length],
      email: `${names[i % names.length].toLowerCase()}${i}@example.com`,
      status: i % 2 === 0 ? "Started" : "Not Started"
    }));
  }, []);

  const filteredData = useMemo(() => {
    return leadData.filter((item) => {
      const matchSubTab = item.status === subTab;
      const matchRef = selectedRef === "" || item.ref.includes(selectedRef);
      return matchSubTab && matchRef;
    });
  }, [subTab, selectedRef, leadData]);

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const currentRecords = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const statCards = [
    { icon: <FaLayerGroup />, value: "3", label: "Active Campaign", bg: "bg-indigo-50 dark:bg-indigo-900/20", border: "border-indigo-100 dark:border-indigo-800", iconBg: "bg-indigo-500", textColor: "text-indigo-400" },
    { icon: <FaChartLine />, value: "4", label: "Completed Campaign", bg: "bg-red-50 dark:bg-red-900/20", border: "border-red-100 dark:border-red-800", iconBg: "bg-red-400", textColor: "text-red-400" },
    { icon: <FaBullhorn />, value: "123", label: "Total Leads", bg: "bg-orange-50 dark:bg-orange-900/20", border: "border-orange-100 dark:border-orange-800", iconBg: "bg-orange-500", textColor: "text-orange-400" },
    { icon: <FaPhoneAlt />, value: "65", label: "Call Made", bg: "bg-green-50 dark:bg-green-900/20", border: "border-green-100 dark:border-green-800", iconBg: "bg-green-500", textColor: "text-green-400" },
    { icon: <FaClock />, value: "4H 22M 30S", label: "Total Duration", bg: "bg-teal-50 dark:bg-teal-900/20", border: "border-teal-100 dark:border-teal-800", iconBg: "bg-teal-500", textColor: "text-teal-400" },
  ];

  return (
    <div className="p-4 md:p-6 bg-[#f8f9fa] dark:bg-slate-900 min-h-screen">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Leads</h1>
          <p className="text-[10px] md:text-xs text-gray-400 font-medium italic">
            Dashboard - Leads & Calls - <span className="text-gray-300">Leads</span>
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm border dark:border-slate-700">
          <span className="text-xs text-gray-500">View All Campaigns</span>
          <div
            onClick={() => setViewAllCampaigns(!viewAllCampaigns)}
            className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors duration-300 ${viewAllCampaigns ? 'bg-blue-500' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${viewAllCampaigns ? 'right-1' : 'left-1'}`}></div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border dark:border-slate-700 p-4 md:p-6">

        <div className="flex gap-4 md:gap-8 border-b dark:border-slate-700 mb-6 overflow-x-auto no-scrollbar">
          <button
            className={`flex items-center gap-2 pb-3 border-b-2 text-sm font-medium whitespace-nowrap ${activeTab === 'active' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-400'}`}
            onClick={() => setActiveTab('active')}
          >
            <FaPlay className="text-[10px]" /> Active Campaign
          </button>
          <button
            className={`flex items-center gap-2 pb-3 border-b-2 text-sm font-medium whitespace-nowrap ${activeTab === 'completed' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-400'}`}
            onClick={() => setActiveTab('completed')}
          >
            <FaCheckCircle size={14} /> Completed Campaign
          </button>
        </div>

        {isMobile && (
          <div className="grid grid-cols-2 gap-3 mb-5">
            {statCards.map((s, i) => (
              <div key={i} className={`p-3 rounded-xl flex items-center gap-3 ${s.bg} border ${s.border} ${i === 4 ? 'col-span-2' : ''}`}>
                <div className={`${s.iconBg} p-2 rounded-lg text-white shadow-md text-sm flex-shrink-0`}>{s.icon}</div>
                <div>
                  <h4 className="text-base font-bold dark:text-white">{s.value}</h4>
                  <p className={`text-[9px] ${s.textColor} font-bold uppercase leading-tight`}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-12 gap-6 md:gap-8">

          {!isMobile && (
            <div className="col-span-12 lg:col-span-3 space-y-4">
              <div>
                <p className="text-sm font-medium mb-2 dark:text-gray-300">Campaign Name</p>
                <div className="relative">
                  <select className="w-full p-2.5 border rounded-md text-sm bg-gray-50 dark:bg-slate-900 dark:border-slate-700 dark:text-gray-400 outline-none appearance-none">
                    <option>Select Campaign Name...</option>
                    <option>Make New Mobile Application</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-4 text-gray-300" size={10} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {statCards.map((s, i) => (
                  <div key={i} className={`p-4 rounded-xl flex items-center gap-4 ${s.bg} border ${s.border} ${i === 4 ? 'col-span-1 sm:col-span-2 lg:col-span-1' : ''}`}>
                    <div className={`${s.iconBg} p-3 rounded-lg text-white shadow-lg`}>{s.icon}</div>
                    <div>
                      <h4 className={`${i === 4 ? 'text-sm' : 'text-xl'} font-bold dark:text-white`}>{s.value}</h4>
                      <p className={`text-[10px] ${s.textColor} font-bold uppercase leading-tight`}>{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={`col-span-12 ${!isMobile ? 'lg:col-span-9' : ''}`}>

            {isMobile && (
              <div className="relative mb-4">
                <select className="w-full p-2.5 border rounded-md text-sm bg-gray-50 dark:bg-slate-900 dark:border-slate-700 dark:text-gray-400 outline-none appearance-none">
                  <option>Select Campaign Name...</option>
                  <option>Make New Mobile Application</option>
                </select>
                <FaChevronDown className="absolute right-3 top-4 text-gray-300" size={10} />
              </div>
            )}

            <div className="flex gap-6 border-b dark:border-slate-700 mb-5 overflow-x-auto no-scrollbar">
              <button
                onClick={() => { setSubTab('Started'); setCurrentPage(1); }}
                className={`flex items-center gap-2 pb-2 border-b-2 font-bold text-[13px] whitespace-nowrap ${subTab === 'Started' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'}`}
              >
                <FaLayerGroup size={12} /> Started
              </button>
              <button
                onClick={() => { setSubTab('Not Started'); setCurrentPage(1); }}
                className={`flex items-center gap-2 pb-2 border-b-2 font-bold text-[13px] whitespace-nowrap ${subTab === 'Not Started' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'}`}
              >
                <FaRedo size={11} /> Not Started
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <input
                type="text"
                placeholder="Search Reference Number..."
                className="flex-1 p-2.5 border rounded-md text-sm bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-white outline-none"
                onChange={(e) => { setSelectedRef(e.target.value); setCurrentPage(1); }}
              />
              <div className="relative flex-1">
                <select className="w-full p-2.5 border rounded-md text-sm bg-gray-50 dark:bg-slate-900 dark:border-slate-700 dark:text-gray-400 outline-none appearance-none">
                  <option>Select Lead Status...</option>
                </select>
                <FaChevronDown className="absolute right-3 top-4 text-gray-300" size={10} />
              </div>
            </div>

            {isMobile ? (
              <div className="flex flex-col gap-3">
                {currentRecords.length === 0 ? (
                  <div className="text-center py-12 text-gray-400 text-sm">No records found</div>
                ) : currentRecords.map((item, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 border dark:border-slate-700 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-blue-500 font-semibold text-sm underline decoration-dotted cursor-pointer">
                        {item.ref}
                      </span>
                      <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 shadow-sm transition-all active:scale-95">
                        <FaPlay size={10} />
                      </button>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center py-1 border-b dark:border-slate-700">
                        <span className="text-gray-400 text-xs font-semibold">Campaign</span>
                        <span className="text-gray-700 dark:text-gray-300 font-medium text-right max-w-[55%] text-xs leading-tight">{item.campaign}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b dark:border-slate-700">
                        <span className="text-gray-400 text-xs font-semibold">Name</span>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{item.name}</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-400 text-xs font-semibold">Email</span>
                        <span className="text-gray-400 text-xs truncate max-w-[60%]">{item.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto border dark:border-slate-700 rounded-lg">
                <table className="w-full text-left text-[13px] border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-slate-900/50 text-gray-600 dark:text-gray-400">
                      <th className="p-4 font-semibold border-b dark:border-slate-700">Reference Number</th>
                      <th className="p-4 font-semibold border-b dark:border-slate-700">Campaign Name</th>
                      <th className="p-4 font-semibold border-b dark:border-slate-700">Name</th>
                      <th className="p-4 font-semibold border-b dark:border-slate-700">Email</th>
                      <th className="p-4 font-semibold border-b dark:border-slate-700 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-slate-700 text-gray-700 dark:text-gray-300">
                    {currentRecords.map((item, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-slate-900/50 transition-colors">
                        <td className="p-4 text-blue-500 font-medium cursor-pointer underline decoration-dotted">{item.ref}</td>
                        <td className="p-4">{item.campaign}</td>
                        <td className="p-4 font-medium">{item.name}</td>
                        <td className="p-4 text-gray-400">{item.email}</td>
                        <td className="p-4 text-center">
                          <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 shadow-sm transition-all active:scale-95">
                            <FaPlay size={10} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-5">
              <span className="text-xs text-gray-500 order-2 sm:order-1 text-center sm:text-left">
                Showing {filteredData.length > 0 ? (currentPage - 1) * recordsPerPage + 1 : 0} to {Math.min(currentPage * recordsPerPage, filteredData.length)} of {filteredData.length} entries
              </span>
              <div className="flex items-center gap-1 order-1 sm:order-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border rounded-md hover:bg-gray-100 dark:border-slate-700 disabled:opacity-50 dark:text-white"
                >
                  <FaChevronLeft size={10} />
                </button>
                <div className="flex gap-1 overflow-x-auto max-w-[150px] sm:max-w-none no-scrollbar">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 text-xs rounded-md border min-w-[32px] ${currentPage === i + 1 ? 'bg-blue-500 text-white border-blue-500' : 'dark:border-slate-700 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border rounded-md hover:bg-gray-100 dark:border-slate-700 disabled:opacity-50 dark:text-white"
                >
                  <FaChevronRight size={10} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Leads;