import React, { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function WebsiteDeevelopmentCampagines2() {

  const navigate = useNavigate();

  const [seconds, setSeconds] = useState(0);
  const [activeTab, setActiveTab] = useState("lead");

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
    <div className="bg-gray-100 min-h-screen p-3 md:p-5">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 mb-4">

        <div>
          <h1 className="text-lg md:text-xl font-semibold">
            Website Development Campaign
          </h1>

          <p className="text-gray-500 text-sm">
            Dashboard - Call Manager - Website Development Campaign
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">

          <button
            onClick={() => navigate("/lead-details")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm"
          >
            ← Previous Lead
          </button>

          <button
            onClick={() => navigate("/WDC1")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
          >
            Next Lead →
          </button>

        </div>

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">

        {/* LEFT PANEL */}
        <div className="xl:col-span-3 bg-white rounded shadow p-4">

          {/* TIMER */}
          <div className="flex items-center gap-3 text-2xl mb-4 text-gray-700">
            <FaClock />
            <span className="font-semibold">{formatTime()}</span>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-2 mb-4">

            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm w-full">
              Lead Follow Up
            </button>

            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm w-full">
              Salesman Bookings
            </button>

          </div>

          {/* LEAD DETAILS */}
          <h3 className="font-semibold mb-2">Lead Details</h3>

          <div className="text-sm text-gray-600 space-y-2">
            <p><b>Lead Number</b> : 16 / 23</p>
            <p><b>Last Actioner</b> : Admin</p>
            <p><b>Follow Up</b> : -</p>
            <p><b>Salesman Booking</b> : -</p>
          </div>

          <hr className="my-4"/>

          <h3 className="font-semibold">Campaign Details</h3>

        </div>


        {/* CENTER PANEL */}
        <div className="xl:col-span-6 bg-white rounded shadow p-4">

          {/* TABS */}
          <div className="flex gap-6 border-b mb-4 overflow-x-auto">

            <button
              onClick={() => setActiveTab("lead")}
              className={`pb-2 whitespace-nowrap ${
                activeTab === "lead"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
            >
              Lead Details
            </button>

            <button
              onClick={() => setActiveTab("logs")}
              className={`pb-2 whitespace-nowrap ${
                activeTab === "logs"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
            >
              Call Logs
            </button>

            <button
              onClick={() => setActiveTab("notes")}
              className={`pb-2 whitespace-nowrap ${
                activeTab === "notes"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
            >
              Notes
            </button>

          </div>


          {/* TAB CONTENT */}

          {activeTab === "lead" && (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="text-sm">Reference Number</label>
                <input className="border rounded w-full p-2"
                  placeholder="Please Enter Reference Number"
                />
              </div>

              <div>
                <label className="text-sm">Lead Status</label>
                <select className="border rounded w-full p-2">
                  <option>Select Lead Status...</option>
                  <option>New</option>
                  <option>Interested</option>
                  <option>Not Interested</option>
                </select>
              </div>

              <div>
                <label className="text-sm">First Name</label>
                <input className="border rounded w-full p-2"
                  defaultValue="Pansy"
                />
              </div>

              <div>
                <label className="text-sm">Last Name</label>
                <input className="border rounded w-full p-2"
                  defaultValue="Kshlerin"
                />
              </div>

              <div>
                <label className="text-sm">Company</label>
                <input className="border rounded w-full p-2"
                  defaultValue="White, Nader and Toy"
                />
              </div>

              <div>
                <label className="text-sm">Email</label>
                <input className="border rounded w-full p-2"
                  defaultValue="grayce54@example.net"
                />
              </div>

              <div>
                <label className="text-sm">Website</label>
                <input className="border rounded w-full p-2"
                  defaultValue="grimes.com"
                />
              </div>

              <div>
                <label className="text-sm">Phone No.</label>
                <input className="border rounded w-full p-2"
                  defaultValue="+18108368554"
                />
              </div>

            </div>

          )}


          {activeTab === "logs" && (
            <div className="text-gray-600 text-sm">
              No Call Logs Available
            </div>
          )}


          {activeTab === "notes" && (
            <textarea
              className="border rounded w-full p-2"
              rows="5"
              placeholder="Enter Notes..."
            />
          )}


          {/* BUTTONS */}
          <div className="flex flex-wrap gap-3 mt-6">

            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Save
            </button>

            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Save & Exit
            </button>

          </div>

        </div>


        {/* RIGHT PANEL */}
        <div className="xl:col-span-3 bg-white rounded shadow p-4">

          <h3 className="text-green-600 font-semibold mb-4">
            Lead History
          </h3>

          <div className="text-sm text-gray-600 space-y-4">

            <p>
              A new call started by Admin on <br/>
              28-02-2026 09:10 am
            </p>

            <p>
              A new call started by Admin on <br/>
              28-02-2026 04:35 am
            </p>

            <p>
              A new call started by Member on <br/>
              27-02-2026 06:09 am
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default WebsiteDeevelopmentCampagines2;