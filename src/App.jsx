import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./component/pages/Login";
import AdminDashboard from "./component/pages/AdminDashboard";
import ManagerDashboard from "./component/pages/ManagerDashboard";
import MemberDashboard from "./component/pages/MemberDashboard"; // ✅ import add

const ProtectedRoute = ({ children, role }) => {
  const userRole = localStorage.getItem("role");

  if (!userRole) return <Navigate to="/" />;
  if (role && userRole !== role) return <Navigate to="/" />;

  return children;
};

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager"
          element={
            <ProtectedRoute role="manager">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ FIXED MEMBER ROUTE */}
        <Route
          path="/member"
          element={
            <ProtectedRoute role="member">
              <MemberDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<h1>404 Page Not Found</h1>} />

      </Routes>
    </Router>
  );
}

export default App;