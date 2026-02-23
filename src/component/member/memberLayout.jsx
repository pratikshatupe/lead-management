import { useState } from "react";
import Sidebar from "../../component/admin/SideBar";
import MemberNavbar from "../../component/member/memberNavBar";

export default function MemberLayout({ children }) {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full z-40
          transform ${openSidebar ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 transition-transform duration-300
        `}
      >
        <Sidebar />
      </div>

      {/* Mobile Overlay */}
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-30"
        />
      )}

      {/* Main Section */}
      <div className="flex-1 w-full md:ml-64">

        {/* Navbar */}
        <MemberNavbar toggleSidebar={() => setOpenSidebar(!openSidebar)} />

        {/* Page Content */}
        <div className="p-4 md:p-6">
          {children}
        </div>

      </div>
    </div>
  );
}