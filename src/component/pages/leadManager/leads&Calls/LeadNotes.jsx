import { useState } from "react";
import Layout from "../../../admin/Layout";

export default function LeadNotes() {

  const [activeTab, setActiveTab] = useState("active");
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;

  const notesData = Array.from({ length: 50 }, (_, i) => ({
    ref: "---",
    campaign: "Website Development Campaign",
    name: `User ${i + 1}`,
    email: `user${i + 1}@gmail.com`,
    note: "Customer interested in website development services.",
    type: i % 2 === 0 ? "active" : "completed"
  }));

  const filteredNotes = notesData.filter(
    (item) => item.type === activeTab
  );

  const totalPages = Math.ceil(filteredNotes.length / recordsPerPage);

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;

  const currentNotes = filteredNotes.slice(indexOfFirst, indexOfLast);

  return (

    

      <div className="p-4 md:p-6">

        {/* Title */}
        <h1 className="text-xl md:text-2xl font-bold mb-4 dark:text-white">
          Lead Notes
        </h1>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-4 md:p-6">

          {/* Tabs */}
          <div className="flex gap-6 border-b mb-6">

            <button
              onClick={() => {
                setActiveTab("active");
                setCurrentPage(1);
              }}
              className={`pb-2 text-sm font-medium ${
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
              className={`pb-2 text-sm font-medium ${
                activeTab === "completed"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
            >
              Completed Campaign
            </button>

          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mb-6">

            <select className="border rounded-lg px-3 py-2 text-sm dark:bg-slate-700 dark:text-white">
              <option>Select Campaign Name...</option>
              <option>Website Development Campaign</option>
              <option>SEO Campaign</option>
            </select>

            <select className="border rounded-lg px-3 py-2 text-sm dark:bg-slate-700 dark:text-white">
              <option>Admin</option>
              <option>Salesman 1</option>
              <option>Salesman 2</option>
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

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">

            <table className="w-full text-sm text-left">

              <thead className="border-b text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="py-3 px-3">Reference Number</th>
                  <th className="py-3 px-3">Campaign Name</th>
                  <th className="py-3 px-3">Name</th>
                  <th className="py-3 px-3">Email</th>
                  <th className="py-3 px-3">Notes</th>
                </tr>
              </thead>

              <tbody>

                {currentNotes.length > 0 ? (
                  currentNotes.map((note, index) => (

                    <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-slate-700">

                      <td className="py-3 px-3 text-blue-500">
                        {note.ref}
                      </td>

                      <td className="py-3 px-3">
                        {note.campaign}
                      </td>

                      <td className="py-3 px-3">
                        {note.name}
                      </td>

                      <td className="py-3 px-3">
                        {note.email}
                      </td>

                      <td className="py-3 px-3">
                        {note.note}
                      </td>

                    </tr>

                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-16 text-gray-400">
                      No data
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

          <div className="md:hidden space-y-4">

            {currentNotes.length > 0 ? (
              currentNotes.map((note, index) => (

                <div
                  key={index}
                  className="border rounded-lg p-4 shadow-sm bg-gray-50 dark:bg-slate-700"
                >

                  <p className="text-sm"><span className="font-semibold">Campaign:</span> {note.campaign}</p>
                  <p className="text-sm"><span className="font-semibold">Name:</span> {note.name}</p>
                  <p className="text-sm"><span className="font-semibold">Email:</span> {note.email}</p>
                  <p className="text-sm"><span className="font-semibold">Notes:</span> {note.note}</p>

                </div>

              ))
            ) : (
              <div className="text-center py-10 text-gray-400">
                No data
              </div>
            )}

          </div>

          {filteredNotes.length > 0 && (

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