import { FaBars } from "react-icons/fa";

export default function Navbar({ openSidebar }) {
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">

      {/* Left Side */}
      <div className="flex items-center gap-4">
        
        {/* Mobile Menu Button */}
        <button
          onClick={openSidebar}
          className="md:hidden text-xl"
        >
          <FaBars />
        </button>

        <h2 className="text-lg md:text-xl font-semibold">
          Dashboard
        </h2>
      </div>

      {/* Right Side */}
      <div className="flex gap-4 items-center text-sm md:text-base">
        <span className="cursor-pointer">🌙</span>
        <span className="hidden sm:block">EN</span>
        <span>👤 Admin</span>
      </div>

    </div>
  );
}