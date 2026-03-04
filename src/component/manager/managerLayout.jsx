import { useState } from "react";
import { Outlet } from "react-router-dom";
import ManagerSidebar from "./managerSidebar";
import ManagerNavbar from "./managerNavbar";

// ✅ Outlet वापरतो — children नाही
// ✅ Admin चा Sidebar नाही, Manager चा स्वतःचा Sidebar वापरतो
export default function ManagerLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex w-full min-h-screen bg-gray-100">

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpenSidebar(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-green-700 text-white p-2 rounded shadow"
      >
        ☰
      </button>

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-full z-40
          transform transition-transform duration-300
          ${openSidebar ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex-shrink-0
        `}
      >
        <ManagerSidebar onClose={() => setOpenSidebar(false)} />
      </div>

      {/* OVERLAY MOBILE */}
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-30"
        />
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col w-full min-w-0 pt-14 md:pt-0">
        <ManagerNavbar />
        <main className="p-4 md:p-6">
          {/* ✅ Outlet — nested routes इथे render होतात */}
          <Outlet />
        </main>
      </div>

    </div>
  );
}