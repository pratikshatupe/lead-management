import { useState } from "react";
import Sidebar from "../admin/SideBar";
import Navbar from "../admin/Navbar";

export default function ManagerLayout({ children }) {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex w-full min-h-screen bg-gray-100">

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpenSidebar(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-900 text-white p-2 rounded"
      >
        ☰
      </button>

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-full z-40
          transform transition-transform duration-300
          ${openSidebar ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
      >
        <Sidebar />
      </div>

      {/* OVERLAY MOBILE */}
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-30"
        />
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col w-full pt-16 md:pt-0">
        <Navbar />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}