export default function Navbar() {
  return (
    <div className="bg-white shadow px-4 py-4 flex justify-between items-center w-full">

      <h2 className="text-lg md:text-xl font-semibold">
        Dashboard
      </h2>

      <div className="flex gap-3 items-center text-sm md:text-base">
        <span>🌙</span>
        <span>EN</span>
        <span className="hidden sm:block">👤 Manager</span>
      </div>

    </div>
  );
}