import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function WebsiteDevelopmentCampagines() {

  const [seconds, setSeconds] = useState(0);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">

        <div>
          <h1 className="text-lg md:text-xl font-semibold">
            Website Development Campaign (MEP_5708413)
          </h1>

          <p className="text-gray-500 text-sm">
            Dashboard - Call Manager - Website Development Campaign
          </p>
        </div>

        <div className="flex gap-2 mt-3 md:mt-0">

          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm">
            ← Previous Lead
          </button>

          <button
            onClick={() => navigate("/WebsiteDeevelopmentCampagines2")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
          >
            Next Lead →
          </button>

        </div>

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* LEFT PANEL */}
        <div className="lg:col-span-3 bg-white p-4 rounded shadow">

          <div className="flex items-center gap-2 text-xl md:text-2xl mb-4">
            ⏱ <span>{formatTime()}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">

            <button
              onClick={() => setShowFollowUpModal(true)}
              className="bg-blue-500 text-white px-3 py-2 rounded text-sm"
            >
              Lead Follow Up
            </button>

            <button className="bg-blue-500 text-white px-3 py-2 rounded text-sm">
              Salesman Bookings
            </button>

          </div>

          <h3 className="font-semibold mb-2">Lead Details</h3>

          <div className="text-sm text-gray-600 space-y-2">
            <p>Lead Number : 5 / 23</p>
            <p>Last Actioner : Admin</p>
            <p>Follow Up : Marielle Rosenbaum</p>
            <p>Salesman Booking : Lilla Wintheiser</p>
          </div>

          <hr className="my-4" />

          <h3 className="font-semibold">Campaign Details</h3>

        </div>

        {/* CENTER PANEL */}
        <div className="lg:col-span-6 bg-white p-4 rounded shadow">

          <div className="flex gap-6 border-b mb-4 overflow-x-auto">

            <button className="border-b-2 border-blue-500 pb-2 whitespace-nowrap">
              Lead Details
            </button>

            <button className="text-gray-500 whitespace-nowrap">
              Call Logs
            </button>

            <button className="text-gray-500 whitespace-nowrap">
              Notes
            </button>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="text-sm">Reference Number</label>
              <input className="border rounded w-full p-2" value="MEP_5708413" readOnly />
            </div>

            <div>
              <label className="text-sm">Lead Status</label>
              <select className="border rounded w-full p-2">
                <option>Select Lead Status</option>
                <option>New</option>
                <option>Interested</option>
                <option>Not Interested</option>
              </select>
            </div>

            <div>
              <label className="text-sm">First Name</label>
              <input className="border rounded w-full p-2" defaultValue="Dario" />
            </div>

            <div>
              <label className="text-sm">Last Name</label>
              <input className="border rounded w-full p-2" defaultValue="Beatty" />
            </div>

            <div>
              <label className="text-sm">Company</label>
              <input className="border rounded w-full p-2" defaultValue="Reichel-Schiller" />
            </div>

            <div>
              <label className="text-sm">Email</label>
              <input className="border rounded w-full p-2" defaultValue="toney73@example.org" />
            </div>

            <div>
              <label className="text-sm">Website</label>
              <input className="border rounded w-full p-2" defaultValue="kris.org" />
            </div>

            <div>
              <label className="text-sm">Phone No.</label>
              <input className="border rounded w-full p-2" defaultValue="+17183709640" />
            </div>

            <div>
              <label className="text-sm">Notes</label>
              <input className="border rounded w-full p-2" placeholder="Enter notes" />
            </div>

            <div>
              <label className="text-sm">Company Name</label>
              <input className="border rounded w-full p-2" placeholder="Enter Company Name" />
            </div>

            <div>
              <label className="text-sm">Contact No.</label>
              <input className="border rounded w-full p-2" placeholder="Enter Contact Number" />
            </div>

            <div>
              <label className="text-sm">Software Name</label>
              <input className="border rounded w-full p-2" placeholder="Enter Software Name" />
            </div>

          </div>

          <div className="flex flex-wrap gap-3 mt-6">

            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>

            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Save & Exit
            </button>

          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="lg:col-span-3 bg-white p-4 rounded shadow">

          <h3 className="font-semibold mb-4 text-green-600">
            Lead History
          </h3>

          <div className="text-sm text-gray-600 space-y-4">

            <p>
              A new call started by Admin <br />
              28-02-2026 04:31 am
            </p>

            <p>
              A new call started by Admin <br />
              27-02-2026 10:59 am
            </p>

            <p>
              Follow up added by Admin for staff member <br />
              Marielle Rosenbaum
            </p>

          </div>

        </div>

      </div>

      {/* FOLLOW UP MODAL */}

      {showFollowUpModal && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">

          <div className="bg-white w-full max-w-lg rounded shadow-lg p-6">

            <h2 className="text-lg font-semibold mb-4">
              Lead Follow Up
            </h2>

            <div className="mb-4">
              <label className="text-sm font-medium">* Staff Member</label>

              <select className="border rounded w-full p-2 mt-1">
                <option>Marielle Rosenbaum</option>
                <option>Admin</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium">* Follow Up Time</label>

              <input type="datetime-local" className="border rounded w-full p-2 mt-1" />
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium">* Notes</label>

              <textarea
                className="border rounded w-full p-2 mt-1"
                rows="3"
                placeholder="Write notes..."
              ></textarea>
            </div>

            <div className="flex flex-wrap justify-end gap-3">

              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Update
              </button>

              <button className="bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>

              <button
                onClick={() => setShowFollowUpModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default WebsiteDevelopmentCampagines;