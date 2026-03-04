import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./component/pages/Login";
import Layout from "./component/admin/Layout";

import AdminDashboard from "./component/pages/AdminDashboard";
import AdminProfile from "./component/pages/AdminProfile";

import Leads from "./component/pages/leadManager/leads&Calls/Leads";
import CallLogs from "./component/pages/leadManager/leads&Calls/CallLogs";
import LeadNotes from "./component/pages/leadManager/leads&Calls/LeadNotes";

import LeadFollowup from "./component/pages/leadFollowUp/LeadFollowup";

import Products from "./component/pages/products/Products";

import ExpenseCategories from "./component/pages/expenseManager/ExpenseCategories";
import Expenses from "./component/pages/expenseManager/Expenses";

import StaffMembers from "./component/pages/userManagement/StaffMembers";

import Salesman from "./component/pages/userManagement/salesmans/Salesmans";
import SalesmanBookings from "./component/pages/userManagement/salesmans/SalesmanBookings";

import WebsiteDevelopmentCampagines from "./component/pages/WebsiteDevelopmentCampagines";
import WebsiteDeevelopmentCampagines2 from "./component/pages/WebsiteDeevelopmentCampagines2";
import CallManager from "./component/pages/leadManager/CallManager";
import Campaigns from "./component/pages/leadManager/Campaigns";
import SocialMediaCampagiens from "./component/pages/SocialMediaCampagiens";

// ✅ Manager imports
import ManagerLayout from "./component/manager/ManagerLayout";
import ManagerDashboard from "./component/pages/ManagerDashboard";

// ✅ Member imports
import MemberLayout from "./component/member/MemberLayout";
import MemberDashboard from "./component/pages/MemberDashboard";

function App() {
  return (
    <Router>
      <Routes>

        {/* LOGIN PAGE */}
        <Route path="/" element={<Login />} />

        {/* FULL SCREEN PAGES (NO SIDEBAR) */}
        <Route path="/lead-details" element={<WebsiteDevelopmentCampagines />} />
        <Route path="/WebsiteDeevelopmentCampagines2" element={<WebsiteDeevelopmentCampagines2 />} />
        <Route path="/socialmedia" element={<SocialMediaCampagiens />} />

        {/* ── ADMIN SECTION ────────────────────────────────────────── */}
        <Route path="/" element={<Layout />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/profile" element={<AdminProfile />} />

          <Route path="products" element={<Products />} />

          <Route path="expense-categories" element={<ExpenseCategories />} />
          <Route path="expense" element={<Expenses />} />

          <Route path="staff" element={<StaffMembers />} />

          <Route path="Salesmans" element={<Salesman />} />
          <Route path="salesman-bookings" element={<SalesmanBookings />} />

          <Route path="leads" element={<Leads />} />
          <Route path="call-logs" element={<CallLogs />} />
          <Route path="lead-notes" element={<LeadNotes />} />

          <Route path="follow-up" element={<LeadFollowup />} />

          <Route path="Calls" element={<CallManager />} />
          <Route path="campaigns" element={<Campaigns />} />
        </Route>

        {/* ── MANAGER SECTION ──────────────────────────────────────── */}
        <Route path="/manager" element={<ManagerLayout />}>
          <Route index element={<ManagerDashboard />} />
          <Route path="calls"     element={<CallManager />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="leads"     element={<Leads />} />
          <Route path="follow-up" element={<LeadFollowup />} />
        </Route>

        {/* ── MEMBER SECTION ───────────────────────────────────────── */}
        <Route path="/member" element={<MemberLayout />}>
          <Route index element={<MemberDashboard />} />
          <Route path="calls"     element={<CallManager />} />
          <Route path="leads"     element={<Leads />} />
          <Route path="follow-up" element={<LeadFollowup />} />
          <Route path="notes"     element={<LeadNotes />} />
        </Route>

        {/* 404 PAGE */}
        <Route path="*" element={
          <div className="flex items-center justify-center min-h-screen text-xl text-gray-400">
            404 — Page Not Found
          </div>
        } />

      </Routes>
    </Router>
  );
}

export default App;