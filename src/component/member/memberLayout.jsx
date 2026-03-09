import { useState } from "react";
import { Outlet } from "react-router-dom";
import MemberSidebar from "./memberSidebar";
import MemberNavbar from "./memberNavBar";

export default function MemberLayout() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex w-full min-h-screen bg-gray-100 dark:bg-slate-950">

      <div
        className={`fixed top-0 left-0 z-40 h-screen transform transition-all duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        ${collapsed ? "w-20" : "w-64"}`}
      >
        <MemberSidebar
          collapsed={collapsed}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-30"
        />
      )}

      <div className={`flex flex-col flex-1 min-h-screen transition-all duration-300
        ${collapsed ? "md:ml-20" : "md:ml-64"}`}
      >

        <MemberNavbar
          setSidebarOpen={setSidebarOpen}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}