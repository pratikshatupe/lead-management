import React, { useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";

function SalesmanBookings() {

  const [campaignFilter, setCampaignFilter] = useState("");
  const [salesmanFilter, setSalesmanFilter] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const bookings = [
    {
      id: 1,
      ref: "---",
      campaign: "Website Development Campaign",
      time: "27-02-2026 11:08 am",
      salesman: "Aiyana Little",
    },
    {
      id: 2,
      ref: "MEP_5270929",
      campaign: "Website Development Campaign",
      time: "01-03-2026 11:38 am",
      salesman: "Dr. Art Rolfson",
    },
    {
      id: 3,
      ref: "MEP_8854845",
      campaign: "Website Development Campaign",
      time: "07-03-2026 02:29 pm",
      salesman: "Lilla Wintheiser",
    },
    {
      id: 4,
      ref: "MEP_5708413",
      campaign: "Website Development Campaign",
      time: "07-03-2026 06:03 pm",
      salesman: "Lilla Wintheiser",
    },
    {
      id: 5,
      ref: "MEP_5277486",
      campaign: "Website Development Campaign",
      time: "07-03-2026 10:53 pm",
      salesman: "Berta Hills",
    },
    {
      id: 6,
      ref: "MEP_9995760",
      campaign: "Make New Mobile Application",
      time: "08-03-2026 09:13 am",
      salesman: "Lilla Wintheiser",
    },
  ];

  const filteredBookings = bookings.filter((item) => {
    return (
      (campaignFilter === "" || item.campaign === campaignFilter) &&
      (salesmanFilter === "" || item.salesman === salesmanFilter)
    );
  });

  return (
    <div className="p-6">

      <h2 className="text-2xl font-semibold mb-4">Salesman Bookings</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">

        <select
          onChange={(e) => setCampaignFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full md:w-60"
        >
          <option value="">Select Campaign</option>
          <option value="Website Development Campaign">
            Website Development Campaign
          </option>
          <option value="Make New Mobile Application">
            Make New Mobile Application
          </option>
        </select>

        <select
          onChange={(e) => setSalesmanFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full md:w-60"
        >
          <option value="">Select Salesman</option>
          <option value="Aiyana Little">Aiyana Little</option>
          <option value="Dr. Art Rolfson">Dr. Art Rolfson</option>
          <option value="Lilla Wintheiser">Lilla Wintheiser</option>
          <option value="Berta Hills">Berta Hills</option>
        </select>

      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white shadow rounded-lg overflow-x-auto">

        <table className="w-full text-sm text-left">

          <thead className="bg-gray-100 text-gray-600 text-xs uppercase">

            <tr>
              <th className="p-3"></th>
              <th className="p-3">Reference Number</th>
              <th className="p-3">Campaign Name</th>
              <th className="p-3">Booking Time</th>
              <th className="p-3">Salesman</th>
              <th className="p-3">Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredBookings.map((item) => (

              <tr key={item.id} className="border-t hover:bg-gray-50">

                <td className="p-3">
                  <input type="checkbox" />
                </td>

                <td className="p-3 text-blue-600 font-medium">
                  {item.ref}
                </td>

                <td className="p-3">{item.campaign}</td>

                <td className="p-3">{item.time}</td>

                <td className="p-3">{item.salesman}</td>

                <td className="p-3 flex gap-2">

                  {/* Eye Button */}
                  <button
                    onClick={() => setShowPopup(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                  >
                    <FaEye size={14} />
                  </button>

                  {/* Delete Button */}
                  <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                    <FaTrash size={14} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">

        {filteredBookings.map((item) => (

          <div key={item.id} className="bg-white shadow rounded-lg p-4">

            <div className="flex justify-between mb-2">
              <span className="text-gray-500 text-sm">Reference</span>
              <span className="text-blue-600 font-medium">{item.ref}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span className="text-gray-500 text-sm">Campaign</span>
              <span>{item.campaign}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span className="text-gray-500 text-sm">Booking Time</span>
              <span>{item.time}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span className="text-gray-500 text-sm">Salesman</span>
              <span>{item.salesman}</span>
            </div>

            <div className="flex gap-2">

              <button
                onClick={() => setShowPopup(true)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded flex justify-center items-center gap-2"
              >
                <FaEye size={14} />
                View
              </button>

              <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded flex justify-center items-center gap-2">
                <FaTrash size={14} />
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">

          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">

            <div className="text-yellow-500 text-3xl mb-2">⚠️</div>

            <h3 className="text-lg font-semibold mb-2">Are you sure?</h3>

            <p className="text-gray-600 mb-4">
              Are you sure you want to resume this lead?
            </p>

            <div className="flex justify-center gap-4">

              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 border rounded"
              >
                No
              </button>

              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-red-500 text-white rounded"
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

export default SalesmanBookings;