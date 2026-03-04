import { useState } from "react";
import { Outlet } from "react-router-dom";
import MemberSidebar from "./MemberSidebar";
import MemberNavbar from "./memberNavBar";

// ✅ Outlet वापरतो — children नाही
// ✅ Admin चा Sidebar नाही — Member चा स्वतःचा Sidebar
export default function MemberLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Mobile Overlay */}
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-30"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full z-40
          transform transition-transform duration-300
          ${openSidebar ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:flex-shrink-0
        `}
      >
        <MemberSidebar onClose={() => setOpenSidebar(false)} />
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col w-full min-w-0">

        {/* Navbar */}
        <MemberNavbar toggleSidebar={() => setOpenSidebar(!openSidebar)} />

        {/* ✅ Outlet — nested routes इथे render होतात */}
        <div className="p-4 md:p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
}