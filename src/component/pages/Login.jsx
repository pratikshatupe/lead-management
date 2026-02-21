// src/component/pages/Login.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    // ✅ ADMIN LOGIN
    if (role === "admin") {
      if (email.trim() === "admin@gmail.com" && password.trim() === "1234") {
        localStorage.setItem("role", "admin"); // store login role
        navigate("/admin");
      } else {
        setError("Invalid Admin Credentials");
      }
    }

    // ✅ MANAGER LOGIN
    else if (role === "manager") {
      if (email.trim() === "manager@gmail.com" && password.trim() === "1234") {
        localStorage.setItem("role", "manager");
        navigate("/manager");
      } else {
        setError("Invalid Manager Credentials");
      }
    }

    // ✅ MEMBER LOGIN
    else if (role === "member") {
      if (email.trim() === "member@gmail.com" && password.trim() === "1234") {
        localStorage.setItem("role", "member");
        navigate("/member");
      } else {
        setError("Invalid Member Credentials");
      }
    }
  };

  const handleBack = () => {
    setRole(null);
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-96 text-center">

        {/* Role Selection */}
        {!role ? (
          <>
            <h2 className="text-2xl font-bold mb-6">Select Dashboard</h2>

            <button
              onClick={() => setRole("admin")}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg mb-4"
            >
              Admin Dashboard
            </button>

            <button
              onClick={() => setRole("manager")}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg mb-4"
            >
              Manager Dashboard
            </button>

            <button
              onClick={() => setRole("member")}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg"
            >
              Member Dashboard
            </button>
          </>
        ) : (
          <>
            {/* Login Form */}
            <h2 className="text-2xl font-bold mb-6 capitalize">
              {role} Login
            </h2>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <input
              type="email"
              placeholder="Enter Email"
              className="w-full border p-2 rounded-lg mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter Password"
              className="w-full border p-2 rounded-lg mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              className="w-full bg-black text-white py-2 rounded-lg mb-3"
            >
              Login
            </button>

            <button
              onClick={handleBack}
              className="text-sm text-gray-500"
            >
              ← Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;