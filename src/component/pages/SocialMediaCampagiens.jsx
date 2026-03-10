import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaClock, FaArrowLeft, FaTrash } from "react-icons/fa";

function SocialMediaCampagiens() {

  const navigate = useNavigate();
  const location = useLocation();

  const [seconds, setSeconds] = useState(0);
  const [activeTab, setActiveTab] = useState("details");

  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([
    { id: 1, text: "Called customer, interested in premium plan.", time: "03-03-2026 10:05 am" },
  ]);

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

  const handleBack = () => {
    const from = location.state?.from;
    if (from) {
      navigate(from);
    } else {
      navigate(-1);
    }
  };

  const handleLeadFollowUp = () => {
    navigate("/admin/follow-up", { state: { from: location.pathname } });
  };

  const handleSalesmanBooking = () => {
    navigate("/admin/salesman-bookings", { state: { from: location.pathname } });
  };

  const handleSaveNote = () => {
    if (!noteText.trim()) return;
    const now = new Date();
    const formatted =
      String(now.getDate()).padStart(2, "0") + "-" +
      String(now.getMonth() + 1).padStart(2, "0") + "-" +
      now.getFullYear() + " " +
      now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }).toLowerCase();

    setNotes((prev) => [
      { id: Date.now(), text: noteText.trim(), time: formatted },
      ...prev,
    ]);
    setNoteText("");
  };

  const handleDeleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-6">
        <div className="flex items-start gap-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded shadow-sm text-sm transition-all flex-shrink-0 mt-0.5"
          >
            <FaArrowLeft size={12} />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">Social Media Campaign</h1>
            <p className="text-xs md:text-sm text-gray-500">
              Dashboard - Call Manager - Social Media Campaign
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button className="bg-yellow-400 px-3 md:px-4 py-2 rounded text-white text-sm">Previous Lead</button>
          <button className="bg-green-500 px-3 md:px-4 py-2 rounded text-white text-sm">Next Lead</button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

        {/* LEFT PANEL */}
        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center gap-2 text-lg md:text-xl font-semibold mb-4">
            <FaClock /> {formatTime()}
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 mb-4">
            <button
              onClick={handleLeadFollowUp}
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors"
            >
              Lead Follow Up
            </button>
            <button
              onClick={handleSalesmanBooking}
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors"
            >
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
            {["details", "logs", "notes"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm md:text-base whitespace-nowrap capitalize transition-colors ${
                  activeTab === tab
                    ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "details" ? "Lead Details" : tab === "logs" ? "Call Logs" : "Notes"}
              </button>
            ))}
          </div>

          {/* Lead Details Tab */}
          {activeTab === "details" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Reference Number</label>
                <input type="text" placeholder="Please Enter Reference Number" className="border p-2 w-full rounded mt-1" />
              </div>
              <div>
                <label className="text-sm">Lead Status</label>
                <select className="border p-2 w-full rounded mt-1">
                  <option>Select Lead Status</option>
                  <option>New</option>
                  <option>Interested</option>
                  <option>Not Interested</option>
                </select>
              </div>
              <div>
                <label className="text-sm">First Name</label>
                <input type="text" defaultValue="Anthony" className="border p-2 w-full rounded mt-1" />
              </div>
              <div>
                <label className="text-sm">Last Name</label>
                <input type="text" defaultValue="Windler" className="border p-2 w-full rounded mt-1" />
              </div>
              <div>
                <label className="text-sm">Company</label>
                <input type="text" defaultValue="O'Conner Group" className="border p-2 w-full rounded mt-1" />
              </div>
              <div>
                <label className="text-sm">Email</label>
                <input type="email" defaultValue="iwitting@example.org" className="border p-2 w-full rounded mt-1" />
              </div>
              <div>
                <label className="text-sm">Website</label>
                <input type="text" defaultValue="hand.net" className="border p-2 w-full rounded mt-1" />
              </div>
              <div>
                <label className="text-sm">Phone No.</label>
                <input type="text" defaultValue="+13217057189" className="border p-2 w-full rounded mt-1" />
              </div>
              <div className="col-span-1 md:col-span-2 mt-4 flex flex-wrap gap-3">
                <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm">Save</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm">Save & Exit</button>
                <span className="text-sm text-gray-500 flex items-center">✓ Auto Save</span>
              </div>
            </div>
          )}

          {/* Call Logs Tab */}
          {activeTab === "logs" && (
            <div>
              <div className="flex flex-col md:flex-row gap-3 mb-4">
                <select className="border p-2 rounded w-full md:w-40">
                  <option>Select User...</option>
                  <option>Admin</option>
                  <option>Manager</option>
                </select>
                <input type="date" className="border p-2 rounded w-full md:w-auto" />
                <input type="date" className="border p-2 rounded w-full md:w-auto" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border min-w-[500px]">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 border text-left text-sm">Call Duration</th>
                      <th className="p-2 border text-left text-sm">Called On</th>
                      <th className="p-2 border text-left text-sm">Called By</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border text-sm">17 M, 45 S</td>
                      <td className="p-2 border text-sm">03-03-2026 10:05 am</td>
                      <td className="p-2 border text-sm">Admin</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Notes Tab ── */}
          {activeTab === "notes" && (
            <div>

              {/* Input area */}
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Write a note..."
                className="border p-3 w-full rounded h-32 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              />

              <button
                onClick={handleSaveNote}
                disabled={!noteText.trim()}
                className="mt-2 mb-5 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded text-sm transition-colors"
              >
                Save Note
              </button>

              {/* Notes List */}
              {notes.length === 0 ? (
                <div className="text-center text-gray-400 text-sm py-6 border rounded-lg">
                  No notes yet. Add your first note above.
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className="border border-gray-200 rounded-lg p-3 bg-gray-50 flex items-start justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">{note.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{note.time}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-red-400 hover:text-red-600 transition-colors shrink-0 mt-0.5"
                        title="Delete note"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-green-600 mb-4">Lead History</h3>
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