import { useState } from "react";
import Layout from "../../../admin/Layout";

export default function CallLogs() {

  const [activeTab, setActiveTab] = useState("active");
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;

  const callLogs = Array.from({ length: 50 }, (_, i) => ({
    ref: "---",
    campaign: "Test IT",
    name: `User ${i + 1}`,
    email: `user${i + 1}@gmail.com`,
    duration: `${Math.floor(Math.random() * 5) + 1} M`,
    calledOn: "02-03-2026 04:41 am",
    type: "completed"
  }));

  const filteredLogs = callLogs.filter(
    (item) => item.type === activeTab
  );

  const totalPages = Math.ceil(filteredLogs.length / recordsPerPage);

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;

  const currentLogs = filteredLogs.slice(indexOfFirst, indexOfLast);

  return (

    

      <div className="p-4 md:p-6">

        <h1 className="text-xl md:text-2xl font-bold mb-4 dark:text-white">
          Call Logs
        </h1>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-4 md:p-6">

          {/* Tabs */}
          <div className="flex gap-6 border-b mb-6 text-sm md:text-base">

            <button
              onClick={() => {
                setActiveTab("active");
                setCurrentPage(1);
              }}
              className={`pb-2 ${
                activeTab === "active"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
            >
              Active Campaign
            </button>

            <button
              onClick={() => {
                setActiveTab("completed");
                setCurrentPage(1);
              }}
              className={`pb-2 ${
                activeTab === "completed"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
            >
              Completed Campaign
            </button>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mb-6">

            <select className="border rounded-lg px-3 py-2 text-sm dark:bg-slate-700 dark:text-white">
              <option>Select Campaign Name...</option>
            </select>

            <select className="border rounded-lg px-3 py-2 text-sm dark:bg-slate-700 dark:text-white">
              <option>Admin</option>
            </select>

            <input
              type="date"
              className="border rounded-lg px-3 py-2 text-sm dark:bg-slate-700 dark:text-white"
            />

            <input
              type="date"
              className="border rounded-lg px-3 py-2 text-sm dark:bg-slate-700 dark:text-white"
            />

          </div>

          <div className="hidden md:block overflow-x-auto">

            <table className="w-full text-sm text-left">

              <thead className="border-b text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="py-3 px-3">Reference Number</th>
                  <th className="py-3 px-3">Campaign Name</th>
                  <th className="py-3 px-3">Name</th>
                  <th className="py-3 px-3">Email</th>
                  <th className="py-3 px-3">Call Duration</th>
                  <th className="py-3 px-3">Called On</th>
                </tr>
              </thead>

              <tbody>

                {currentLogs.length > 0 ? (
                  currentLogs.map((log, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-slate-700">

                      <td className="py-3 px-3 text-blue-500">{log.ref}</td>
                      <td className="py-3 px-3">{log.campaign}</td>
                      <td className="py-3 px-3">{log.name}</td>
                      <td className="py-3 px-3">{log.email}</td>
                      <td className="py-3 px-3">{log.duration}</td>
                      <td className="py-3 px-3">{log.calledOn}</td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-16 text-gray-400">
                      No data
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

          <div className="md:hidden space-y-4">

            {currentLogs.length > 0 ? (
              currentLogs.map((log, index) => (

                <div
                  key={index}
                  className="border rounded-lg p-4 shadow-sm bg-gray-50 dark:bg-slate-700"
                >

                  <div className="text-sm">
                    <p><span className="font-semibold">Campaign:</span> {log.campaign}</p>
                    <p><span className="font-semibold">Name:</span> {log.name}</p>
                    <p><span className="font-semibold">Email:</span> {log.email}</p>
                    <p><span className="font-semibold">Duration:</span> {log.duration}</p>
                    <p><span className="font-semibold">Called On:</span> {log.calledOn}</p>
                  </div>

                </div>

              ))
            ) : (
              <div className="text-center py-10 text-gray-400">
                No data
              </div>
            )}

          </div>

          {filteredLogs.length > 0 && (

            <div className="flex flex-wrap justify-center md:justify-end items-center gap-2 mt-6">

              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
              >
                Next
              </button>

            </div>

          )}

        </div>

      </div>

    

  );
}