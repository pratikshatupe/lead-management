export default function Navbar() {
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Dashboard</h2>

      <div className="flex gap-4 items-center">
        <span>🌙</span>
        <span>EN</span>
        <span>👤 Admin</span>
      </div>
    </div>
  );
}