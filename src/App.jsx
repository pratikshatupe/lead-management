import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth & Dashboard
import Login from "./component/pages/Login";
import AdminDashboard from "./component/pages/AdminDashboard";
import AdminProfile from "./component/pages/AdminProfile";

// Leads & Calls (Tujhya Folder Structure Nusar)
import Leads from "./component/pages/leadManager/leads&Calls/Leads";
import CallLogs from "./component/pages/leadManager/leads&Calls/CallLogs";
import LeadNotes from "./component/pages/leadManager/leads&Calls/LeadNotes";

// Lead Follow Up
import LeadFollowup from "./component/pages/leadFollowUp/LeadFollowup";
import Products from "./component/pages/products/Products";

function App() {
  return (
    <Router>
      <Routes>
        {/* LOGIN PAGE */}
        <Route path="/" element={<Login />} />

        {/* ADMIN SECTION - Direct Routes (No Protected Routes) */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        
        {/* LEADS & CALLS SECTION */}
        <Route path="/leads" element={<Leads />} />
        <Route path="/call-logs" element={<CallLogs />} />
        <Route path="/lead-notes" element={<LeadNotes />} />
        
        {/* FOLLOW UP SECTION */}
        <Route path="/follow-up" element={<LeadFollowup />} />
        <Route path="/products" element ={<Products/>}/>

        {/* 404 PAGE - Jar kontahi path match nahi jhala tar */}
        <Route 
          path="*" 
          element={
            <div className="flex h-screen items-center justify-center bg-gray-100">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="text-xl text-gray-600 mt-2">Page Not Found</p>
                <a href="/admin" className="mt-4 inline-block text-blue-500 hover:underline">Go to Dashboard</a>
              </div>
            </div>
          } />
        
      </Routes>
    </Router>
  );
}

export default App;