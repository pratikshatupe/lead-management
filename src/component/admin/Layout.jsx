import { useState } from "react";
import SideBar from "../../component/admin/SideBar";
import Navbar from "../../component/admin/Navbar";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950 overflow-hidden transition-colors">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        collapsed={collapsed} 
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar 
          setSidebarOpen={setSidebarOpen} 
          setCollapsed={setCollapsed} 
          collapsed={collapsed} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-slate-950 transition-colors">
          {children}
        </main>
      </div>
    </div>
  );
}