import React, { useState, useRef, useEffect } from "react";
import { FaEye, FaTrash, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// ── Custom Dropdown Component (uses fixed positioning to escape overflow) ──
function CustomSelect({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  const selected = options.find((o) => o.value === value);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        btnRef.current && !btnRef.current.contains(e.target) &&
        menuRef.current && !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Calculate position when opening
  const [menuStyle, setMenuStyle] = useState({});
  const handleToggle = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const menuHeight = options.length * 40 + 8;
      const goUp = spaceBelow < menuHeight && rect.top > menuHeight;

      setMenuStyle({
        position: "fixed",
        top: goUp ? rect.top - menuHeight : rect.bottom + 2,
        left: rect.left,
        width: rect.width,
        zIndex: 99999,
      });
      setDropUp(goUp);
    }
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      {/* Trigger button */}
      <button
        ref={btnRef}
        type="button"
        onClick={handleToggle}
        className="w-full flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className={selected ? "text-gray-700" : "text-gray-400"}>
          {selected ? selected.label : placeholder}
        </span>
        <FaChevronDown
          size={11}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown menu — rendered via fixed so it escapes ALL overflow parents */}
      {open && (
        <ul
          ref={menuRef}
          style={menuStyle}
          className="bg-white border border-gray-200 rounded-lg shadow-lg py-1 overflow-y-auto max-h-60"
        >
          {/* "All" / placeholder option */}
          <li
            onClick={() => { onChange(""); setOpen(false); }}
            className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 hover:text-blue-600 ${value === "" ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"}`}
          >
            {placeholder}
          </li>
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 hover:text-blue-600 ${value === opt.value ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"}`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
function SalesmanBookings() {
  const navigate = useNavigate();

  const [campaignFilter, setCampaignFilter] = useState("");
  const [salesmanFilter, setSalesmanFilter] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [bookings, setBookings] = useState([
    { id: 1, ref: "---", campaign: "Website Development Campaign", time: "27-02-2026 11:08 am", salesman: "Aiyana Little" },
    { id: 2, ref: "MEP_5270929", campaign: "Website Development Campaign", time: "01-03-2026 11:38 am", salesman: "Dr. Art Rolfson" },
    { id: 3, ref: "MEP_8854845", campaign: "Website Development Campaign", time: "07-03-2026 02:29 pm", salesman: "Lilla Wintheiser" },
    { id: 4, ref: "MEP_5708413", campaign: "Website Development Campaign", time: "07-03-2026 06:03 pm", salesman: "Lilla Wintheiser" },
    { id: 5, ref: "MEP_5277486", campaign: "Website Development Campaign", time: "07-03-2026 10:53 pm", salesman: "Berta Hills" },
    { id: 6, ref: "MEP_9995760", campaign: "Make New Mobile Application", time: "08-03-2026 09:13 am", salesman: "Lilla Wintheiser" },
  ]);

  const campaignOptions = [
    { value: "Website Development Campaign", label: "Website Development Campaign" },
    { value: "Make New Mobile Application", label: "Make New Mobile Application" },
  ];

  const salesmanOptions = [
    { value: "Aiyana Little", label: "Aiyana Little" },
    { value: "Dr. Art Rolfson", label: "Dr. Art Rolfson" },
    { value: "Lilla Wintheiser", label: "Lilla Wintheiser" },
    { value: "Berta Hills", label: "Berta Hills" },
  ];

  const filteredBookings = bookings.filter((item) => {
    return (
      (campaignFilter === "" || item.campaign === campaignFilter) &&
      (salesmanFilter === "" || item.salesman === salesmanFilter)
    );
  });

  const handleResumeLead = () => {
    setShowPopup(false);
    navigate("/lead-details");
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    setBookings((prev) => prev.filter((item) => item.id !== selectedId));
    setShowDeletePopup(false);
    setSelectedId(null);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen w-full">

      {/* Page Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
        Salesman Bookings
      </h2>

      {/* ── Filters ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full">
        <div className="w-full sm:w-60">
          <CustomSelect
            value={campaignFilter}
            onChange={setCampaignFilter}
            options={campaignOptions}
            placeholder="Select Campaign"
          />
        </div>
        <div className="w-full sm:w-60">
          <CustomSelect
            value={salesmanFilter}
            onChange={setSalesmanFilter}
            options={salesmanOptions}
            placeholder="Select Salesman"
          />
        </div>
      </div>

      {/* ── DESKTOP TABLE (md and above) ── */}
      <div className="hidden md:block bg-white shadow rounded-lg overflow-visible">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
              <tr>
                <th className="p-3 w-10"></th>
                <th className="p-3">Reference Number</th>
                <th className="p-3">Campaign Name</th>
                <th className="p-3">Booking Time</th>
                <th className="p-3">Salesman</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-400">
                    No bookings found
                  </td>
                </tr>
              ) : (
                filteredBookings.map((item) => (
                  <tr key={item.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="p-3 text-blue-600 font-semibold">{item.ref}</td>
                    <td className="p-3">{item.campaign}</td>
                    <td className="p-3 whitespace-nowrap">{item.time}</td>
                    <td className="p-3">{item.salesman}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowPopup(true)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-colors"
                        >
                          <FaEye size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-colors"
                        >
                          <FaTrash size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── MOBILE CARDS (below md) ── */}
      <div className="flex flex-col gap-3 md:hidden">
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
            No bookings found
          </div>
        ) : (
          filteredBookings.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">

              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  {item.ref !== "---" && (
                    <span className="inline-block text-blue-600 font-bold text-xs bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md mb-1">
                      {item.ref}
                    </span>
                  )}
                  <p className="text-gray-800 font-semibold text-sm leading-snug">{item.campaign}</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 mb-3">
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {item.salesman}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item.time}
                </span>
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => setShowPopup(true)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                >
                  <FaEye size={11} /> View
                </button>
                <button
                  onClick={() => handleDeleteClick(item.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                >
                  <FaTrash size={11} /> Delete
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* ── VIEW POPUP MODAL ── */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xs text-center">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="text-base font-bold text-gray-800 mb-2">Are you sure?</h3>
            <p className="text-gray-500 text-sm mb-5">
              Are you sure you want to resume this lead?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                No
              </button>
              <button
                onClick={handleResumeLead}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRM POPUP MODAL ── */}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xs text-center">
            <div className="text-4xl mb-3">🗑️</div>
            <h3 className="text-base font-bold text-gray-800 mb-2">Delete Booking?</h3>
            <p className="text-gray-500 text-sm mb-5">
              Are you sure you want to delete this booking? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => { setShowDeletePopup(false); setSelectedId(null); }}
                className="px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                No
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default SalesmanBookings;