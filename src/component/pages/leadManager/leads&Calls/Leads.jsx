import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  FaPlay, FaBullhorn, FaCheckCircle, FaLayerGroup, FaRedo,
  FaChevronDown, FaChevronLeft, FaChevronRight, FaPhoneAlt,
  FaClock, FaChartLine, FaSearch, FaTimes
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

const LEAD_STATUSES = [
  "New",
  "Interested",
  "Not Interested",
  "Call Back",
  "No Answer",
  "Follow Up",
  "Converted",
  "Closed",
];

const CAMPAIGNS = [
  "Make New Mobile Application",
  "Website Development",
  "Digital Marketing",
  "SEO Services",
];

function Leads() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab]           = useState('active');
  const [subTab, setSubTab]                 = useState('Started');
  const [searchRef, setSearchRef]           = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [viewAllCampaigns, setViewAllCampaigns] = useState(false);
  const [currentPage, setCurrentPage]       = useState(1);
  const [statusOpen, setStatusOpen]         = useState(false);
  const [campaignOpen, setCampaignOpen]     = useState(false);
  const statusRef  = useRef(null);
  const campaignRef = useRef(null);
  const recordsPerPage = 8;

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (statusRef.current && !statusRef.current.contains(e.target))   setStatusOpen(false);
      if (campaignRef.current && !campaignRef.current.contains(e.target)) setCampaignOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const leadData = useMemo(() => {
    const names = ["Tracey", "Novella", "Celia", "Akeem", "Cyrus", "Jacques", "Catalina", "John", "Rahul", "Priya"];
    const statuses = LEAD_STATUSES;
    return Array.from({ length: 50 }).map((_, i) => ({
      ref:      `MEP_${6464579 + i}`,
      campaign: CAMPAIGNS[i % CAMPAIGNS.length],
      name:     names[i % names.length],
      email:    `${names[i % names.length].toLowerCase()}${i}@example.com`,
      status:   i % 2 === 0 ? "Started" : "Not Started",
      leadStatus: statuses[i % statuses.length],
    }));
  }, []);

  const filteredData = useMemo(() => {
    return leadData.filter((item) => {
      const matchSubTab    = item.status === subTab;
      const matchRef       = searchRef.trim() === "" || item.ref.toLowerCase().includes(searchRef.trim().toLowerCase());
      const matchStatus    = selectedStatus === "" || item.leadStatus === selectedStatus;
      const matchCampaign  = selectedCampaign === "" || item.campaign === selectedCampaign;
      return matchSubTab && matchRef && matchStatus && matchCampaign;
    });
  }, [subTab, searchRef, selectedStatus, selectedCampaign, leadData]);

  const totalPages    = Math.max(1, Math.ceil(filteredData.length / recordsPerPage));
  const currentRecords = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handleSubTab = (tab) => { setSubTab(tab); setCurrentPage(1); };
  const handleSearchChange = (e) => { setSearchRef(e.target.value); setCurrentPage(1); };
  const clearSearch = () => { setSearchRef(""); setCurrentPage(1); };

  const statCards = [
    { icon: <FaLayerGroup />,  value: "3",         label: "Active Campaign",     bg: "bg-indigo-50 dark:bg-indigo-900/20", border: "border-indigo-100 dark:border-indigo-800", iconBg: "bg-indigo-500", textColor: "text-indigo-400" },
    { icon: <FaChartLine />,   value: "4",         label: "Completed Campaign",  bg: "bg-red-50 dark:bg-red-900/20",       border: "border-red-100 dark:border-red-800",       iconBg: "bg-red-400",    textColor: "text-red-400" },
    { icon: <FaBullhorn />,    value: "123",       label: "Total Leads",         bg: "bg-orange-50 dark:bg-orange-900/20", border: "border-orange-100 dark:border-orange-800", iconBg: "bg-orange-500", textColor: "text-orange-400" },
    { icon: <FaPhoneAlt />,    value: "65",        label: "Call Made",           bg: "bg-green-50 dark:bg-green-900/20",   border: "border-green-100 dark:border-green-800",   iconBg: "bg-green-500",  textColor: "text-green-400" },
    { icon: <FaClock />,       value: "4H 22M 30S",label: "Total Duration",      bg: "bg-teal-50 dark:bg-teal-900/20",     border: "border-teal-100 dark:border-teal-800",     iconBg: "bg-teal-500",   textColor: "text-teal-400" },
  ];

  // ── Custom Dropdown Component ──
  const CustomDropdown = ({ refObj, open, setOpen, value, setValue, options, placeholder, onClear }) => (
    <div ref={refObj} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-2.5 border rounded-md text-sm bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-gray-300 outline-none hover:border-blue-400 transition-colors"
      >
        <span className={value ? "text-gray-800 dark:text-white" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <div className="flex items-center gap-1.5">
          {value && (
            <span
              onClick={(e) => { e.stopPropagation(); setValue(""); onClear && onClear(); setCurrentPage(1); }}
              className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer"
            >
              <FaTimes size={9} />
            </span>
          )}
          <FaChevronDown size={10} className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </div>
      </button>

      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl overflow-hidden">
          {/* All option */}
          <div
            onClick={() => { setValue(""); setOpen(false); setCurrentPage(1); }}
            className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-between ${
              value === "" ? "bg-blue-50 dark:bg-slate-700 text-blue-600 font-semibold" : "text-gray-700 dark:text-gray-300"
            }`}
          >
            All
            {value === "" && <FaCheckCircle size={11} className="text-blue-500" />}
          </div>
          <div className="max-h-52 overflow-y-auto">
            {options.map((opt) => (
              <div
                key={opt}
                onClick={() => { setValue(opt); setOpen(false); setCurrentPage(1); }}
                className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-between ${
                  value === opt ? "bg-blue-50 dark:bg-slate-700 text-blue-600 font-semibold" : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {opt}
                {value === opt && <FaCheckCircle size={11} className="text-blue-500" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-4 md:p-6 bg-[#f8f9fa] dark:bg-slate-900 min-h-screen">

      {/* PAGE HEADER */}
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

        {/* MAIN TABS */}
        <div className="flex gap-4 md:gap-8 border-b dark:border-slate-700 mb-6 overflow-x-auto no-scrollbar">
          <button
            className={`flex items-center gap-2 pb-3 border-b-2 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'active' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            onClick={() => setActiveTab('active')}
          >
            <FaPlay className="text-[10px]" /> Active Campaign
          </button>
          <button
            className={`flex items-center gap-2 pb-3 border-b-2 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'completed' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            onClick={() => setActiveTab('completed')}
          >
            <FaCheckCircle size={14} /> Completed Campaign
          </button>
        </div>

        {/* MOBILE STAT CARDS */}
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

          {/* DESKTOP LEFT SIDEBAR */}
          {!isMobile && (
            <div className="col-span-12 lg:col-span-3 space-y-4">
              <div>
                <p className="text-sm font-medium mb-2 dark:text-gray-300">Campaign Name</p>
                <CustomDropdown
                  refObj={campaignRef}
                  open={campaignOpen}
                  setOpen={setCampaignOpen}
                  value={selectedCampaign}
                  setValue={setSelectedCampaign}
                  options={CAMPAIGNS}
                  placeholder="Select Campaign Name..."
                />
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

          {/* RIGHT CONTENT */}
          <div className={`col-span-12 ${!isMobile ? 'lg:col-span-9' : ''}`}>

            {/* MOBILE CAMPAIGN DROPDOWN */}
            {isMobile && (
              <div className="mb-4">
                <CustomDropdown
                  refObj={campaignRef}
                  open={campaignOpen}
                  setOpen={setCampaignOpen}
                  value={selectedCampaign}
                  setValue={setSelectedCampaign}
                  options={CAMPAIGNS}
                  placeholder="Select Campaign Name..."
                />
              </div>
            )}

            {/* SUB TABS */}
            <div className="flex gap-6 border-b dark:border-slate-700 mb-5 overflow-x-auto no-scrollbar">
              <button
                onClick={() => handleSubTab('Started')}
                className={`flex items-center gap-2 pb-2 border-b-2 font-bold text-[13px] whitespace-nowrap transition-colors ${subTab === 'Started' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                <FaLayerGroup size={12} /> Started
              </button>
              <button
                onClick={() => handleSubTab('Not Started')}
                className={`flex items-center gap-2 pb-2 border-b-2 font-bold text-[13px] whitespace-nowrap transition-colors ${subTab === 'Not Started' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                <FaRedo size={11} /> Not Started
              </button>
            </div>

            {/* SEARCH + STATUS FILTER */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              {/* Search Input */}
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
                <input
                  type="text"
                  value={searchRef}
                  placeholder="Search Reference Number..."
                  onChange={handleSearchChange}
                  className="w-full pl-9 pr-8 py-2.5 border rounded-md text-sm bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-white outline-none focus:border-blue-400 transition-colors"
                />
                {searchRef && (
                  <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors">
                    <FaTimes size={10} />
                  </button>
                )}
              </div>

              {/* Lead Status Dropdown */}
              <div className="flex-1">
                <CustomDropdown
                  refObj={statusRef}
                  open={statusOpen}
                  setOpen={setStatusOpen}
                  value={selectedStatus}
                  setValue={setSelectedStatus}
                  options={LEAD_STATUSES}
                  placeholder="Select Lead Status..."
                />
              </div>
            </div>

            {/* TABLE / CARDS */}
            {isMobile ? (
              <div className="flex flex-col gap-3">
                {currentRecords.length === 0 ? (
                  <div className="text-center py-12 text-gray-400 text-sm">No records found</div>
                ) : currentRecords.map((item, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 border dark:border-slate-700 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-blue-500 font-semibold text-sm underline decoration-dotted cursor-pointer">{item.ref}</span>
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
                      <div className="flex justify-between items-center py-1 border-b dark:border-slate-700">
                        <span className="text-gray-400 text-xs font-semibold">Status</span>
                        <span className="text-xs font-semibold text-blue-500">{item.leadStatus}</span>
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
                      <th className="p-4 font-semibold border-b dark:border-slate-700">Lead Status</th>
                      <th className="p-4 font-semibold border-b dark:border-slate-700 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-slate-700 text-gray-700 dark:text-gray-300">
                    {currentRecords.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-gray-400 text-sm">No records found</td>
                      </tr>
                    ) : currentRecords.map((item, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-slate-900/50 transition-colors">
                        <td className="p-4 text-blue-500 font-medium cursor-pointer underline decoration-dotted">{item.ref}</td>
                        <td className="p-4">{item.campaign}</td>
                        <td className="p-4 font-medium">{item.name}</td>
                        <td className="p-4 text-gray-400">{item.email}</td>
                        <td className="p-4">
                          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                            {item.leadStatus}
                          </span>
                        </td>
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

            {/* PAGINATION */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-5">
              <span className="text-xs text-gray-500 order-2 sm:order-1 text-center sm:text-left">
                Showing {filteredData.length > 0 ? (currentPage - 1) * recordsPerPage + 1 : 0} to {Math.min(currentPage * recordsPerPage, filteredData.length)} of {filteredData.length} entries
              </span>
              <div className="flex items-center gap-1 order-1 sm:order-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border rounded-md hover:bg-gray-100 dark:border-slate-700 disabled:opacity-40 dark:text-white transition-colors"
                >
                  <FaChevronLeft size={10} />
                </button>
                <div className="flex gap-1 overflow-x-auto max-w-[150px] sm:max-w-none no-scrollbar">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 text-xs rounded-md border min-w-[32px] transition-colors ${
                        currentPage === i + 1
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'dark:border-slate-700 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border rounded-md hover:bg-gray-100 dark:border-slate-700 disabled:opacity-40 dark:text-white transition-colors"
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