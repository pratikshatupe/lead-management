import React, { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";

function SocialMediaCampagiens() {

  const [seconds, setSeconds] = useState(0);
  const [activeTab, setActiveTab] = useState("details");

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
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">

        <div>
          <h1 className="text-xl md:text-2xl font-semibold">
            Social Media Campaign
          </h1>

          <p className="text-xs md:text-sm text-gray-500">
            Dashboard - Call Manager - Social Media Campaign
          </p>
        </div>

        <div className="flex gap-2">

          <button className="bg-yellow-400 px-3 md:px-4 py-2 rounded text-white text-sm">
            Previous Lead
          </button>

          <button className="bg-green-500 px-3 md:px-4 py-2 rounded text-white text-sm">
            Next Lead
          </button>

        </div>

      </div>


      {/* Main Grid */}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

        {/* LEFT PANEL */}

        <div className="bg-white p-4 rounded shadow">

          <div className="flex items-center gap-2 text-lg md:text-xl font-semibold mb-4">
            <FaClock /> {formatTime()}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mb-4">

            <button className="bg-blue-500 text-white px-3 py-2 rounded text-sm">
              Lead Follow Up
            </button>

            <button className="bg-blue-500 text-white px-3 py-2 rounded text-sm">
              Salesman Bookings
            </button>

          </div>

          <h3 className="font-semibold mb-3">Lead Details</h3>

          <div className="text-sm space-y-2">

            <p>Lead Number : <b>68 / 97</b></p>

            <p>Last Actioner : <b>Admin</b></p>

            <p>Follow Up : -</p>

            <p>Salesman Booking : -</p>

          </div>

        </div>


        {/* CENTER PANEL */}

        <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded shadow">

          {/* Tabs */}

          <div className="flex gap-4 md:gap-6 border-b mb-6 overflow-x-auto">

            <button
              onClick={() => setActiveTab("details")}
              className={`pb-2 text-sm md:text-base whitespace-nowrap ${
                activeTab === "details"
                  ? "border-b-2 border-blue-500"
                  : "text-gray-500"
              }`}
            >
              Lead Details
            </button>

            <button
              onClick={() => setActiveTab("logs")}
              className={`pb-2 text-sm md:text-base whitespace-nowrap ${
                activeTab === "logs"
                  ? "border-b-2 border-blue-500"
                  : "text-gray-500"
              }`}
            >
              Call Logs
            </button>

            <button
              onClick={() => setActiveTab("notes")}
              className={`pb-2 text-sm md:text-base whitespace-nowrap ${
                activeTab === "notes"
                  ? "border-b-2 border-blue-500"
                  : "text-gray-500"
              }`}
            >
              Notes
            </button>

          </div>


{/* ================= Lead Details ================= */}

{activeTab === "details" && (

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div>
<label className="text-sm">Reference Number</label>
<input
type="text"
placeholder="Please Enter Reference Number"
className="border p-2 w-full rounded"
/>
</div>

<div>
<label className="text-sm">Lead Status</label>
<select className="border p-2 w-full rounded">
<option>Select Lead Status</option>
<option>New</option>
<option>Interested</option>
<option>Not Interested</option>
</select>
</div>

<div>
<label className="text-sm">First Name</label>
<input
type="text"
defaultValue="Anthony"
className="border p-2 w-full rounded"
/>
</div>

<div>
<label className="text-sm">Last Name</label>
<input
type="text"
defaultValue="Windler"
className="border p-2 w-full rounded"
/>
</div>

<div>
<label className="text-sm">Company</label>
<input
type="text"
defaultValue="O'Conner Group"
className="border p-2 w-full rounded"
/>
</div>

<div>
<label className="text-sm">Email</label>
<input
type="email"
defaultValue="iwitting@example.org"
className="border p-2 w-full rounded"
/>
</div>

<div>
<label className="text-sm">Website</label>
<input
type="text"
defaultValue="hand.net"
className="border p-2 w-full rounded"
/>
</div>

<div>
<label className="text-sm">Phone No.</label>
<input
type="text"
defaultValue="+13217057189"
className="border p-2 w-full rounded"
/>
</div>

<div className="col-span-1 md:col-span-2 mt-4 flex flex-wrap gap-3">

<button className="bg-blue-500 text-white px-4 py-2 rounded text-sm">
Save
</button>

<button className="bg-blue-500 text-white px-4 py-2 rounded text-sm">
Save & Exit
</button>

<span className="text-sm text-gray-500 flex items-center">
✓ Auto Save
</span>

</div>

</div>

)}

{/* ================= Call Logs ================= */}

{activeTab === "logs" && (

<div>

<div className="flex flex-col md:flex-row gap-3 mb-4">

<select className="border p-2 rounded w-full md:w-40">
<option>Select User...</option>
<option>Admin</option>
<option>Manager</option>
</select>

<input
type="date"
className="border p-2 rounded w-full md:w-auto"
/>

<input
type="date"
className="border p-2 rounded w-full md:w-auto"
/>

</div>

<div className="overflow-x-auto">

<table className="w-full border min-w-[500px]">

<thead className="bg-gray-100">

<tr>

<th className="p-2 border text-left">Call Duration</th>

<th className="p-2 border text-left">Called On</th>

<th className="p-2 border text-left">Called By</th>

</tr>

</thead>

<tbody>

<tr>

<td className="p-2 border">17 M, 45 S</td>

<td className="p-2 border">03-03-2026 10:05 am</td>

<td className="p-2 border">Admin</td>

</tr>

</tbody>

</table>

</div>

</div>

)}

{/* ================= Notes ================= */}

{activeTab === "notes" && (

<div>

<textarea
placeholder="Write notes..."
className="border p-3 w-full rounded h-40"
/>

<button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded text-sm">
Save Notes
</button>

</div>

)}

        </div>


        {/* RIGHT PANEL */}

        <div className="bg-white p-4 rounded shadow">

          <h3 className="font-semibold text-green-600 mb-4">
            Lead History
          </h3>

          <p className="text-sm text-gray-600">
            A new call started by Admin on
            <br />
            03-03-2026 10:05 am
          </p>

        </div>

      </div>

    </div>
  );
}

export default SocialMediaCampagiens;