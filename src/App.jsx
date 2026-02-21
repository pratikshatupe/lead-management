import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./component/pages/Login";
import AdminDashboard from "./component/pages/AdminDashboard";
import ManagerDashboard from "./component/pages/ManagerDashboard";
import User from "./component/pages/User";


// 🔐 Protected Route
const ProtectedRoute = ({ children, role }) => {
  const userRole = localStorage.getItem("role");

  if (!userRole) {
    return <Navigate to="/" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }

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

        <Route
          path="/member"
          element={
            <ProtectedRoute role="member">
              <User />
            </ProtectedRoute>
          }
        />

        {/* Tailwind test */}
        <Route
          path="/test"
          element={<h1 className="text-5xl text-red-500">Tailwind Working</h1>}
        />

        <Route path="*" element={<h1>404 Page Not Found</h1>} />

      </Routes>
    </Router>
  );
}

export default App;