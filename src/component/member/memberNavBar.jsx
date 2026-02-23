import { useNavigate } from "react-router-dom";

export default function MemberNavbar({ toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-white shadow px-4 py-3">

      {/* Left Side */}
      <div className="flex items-center gap-4">
        {/* Mobile toggle */}
        <button
          onClick={toggleSidebar}
          className="md:hidden bg-purple-700 text-white px-3 py-1 rounded"
        >
          ☰
        </button>

        <h1 className="text-xl font-bold">Member Panel</h1>
      </div>

      {/* Right Side */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}