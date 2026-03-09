import React, { useState, useEffect } from "react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

// Real avatar images via UI Avatars API (always works, no broken images)
const getAvatarUrl = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=80&bold=true`;

function StaffMembers() {
  const isMobile = useIsMobile();

  const [showDrawer, setShowDrawer] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const generateDummyData = () => {
    const names = ["Rahul Sharma", "Priya Patel", "Amit Desai", "Sneha Joshi", "Vijay Kumar",
      "Pooja Nair", "Rohan Mehta", "Anita Singh", "Karan Verma", "Neha Gupta"];
    return Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: names[i % names.length],
      role: i % 2 === 0 ? "Admin" : "Team Member",
      email: `${names[i % names.length].split(" ")[0].toLowerCase()}${i + 1}@gmail.com`,
      phone: "9876543210",
      status: i % 3 === 0 ? "Disabled" : "Enabled",
      address: "Pune, Maharashtra",
      profileImage: "",
      password: ""
    }));
  };

  const [staffList, setStaffList] = useState(generateDummyData());
  const [formData, setFormData] = useState({
    profileImage: "", role: "", name: "", phone: "",
    password: "", email: "", status: "Enabled", address: ""
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setFormData({ ...formData, profileImage: URL.createObjectURL(file) });
  };

  const handleCreate = () => {
    if (editId) {
      setStaffList(staffList.map((s) => s.id === editId ? { ...s, ...formData } : s));
      setEditId(null);
    } else {
      setStaffList([...staffList, { id: staffList.length + 1, ...formData }]);
    }
    setShowDrawer(false);
    setFormData({ profileImage: "", role: "", name: "", phone: "", password: "", email: "", status: "Enabled", address: "" });
  };

  const handleDelete = (id) => setStaffList(staffList.filter((s) => s.id !== id));

  const handleEdit = (staff) => {
    setFormData(staff);
    setEditId(staff.id);
    setShowDrawer(true);
  };

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = staffList.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(staffList.length / recordsPerPage);

  return (
    <div className={`${isMobile ? "p-3" : "p-6"} bg-gray-50 min-h-screen`}>

      {/* ── Header ── */}
      <div className={`flex justify-between items-center mb-6 ${isMobile ? "gap-3" : ""}`}>
        <div>
          <h2 className={`${isMobile ? "text-lg" : "text-2xl"} font-semibold text-gray-800`}>Users</h2>
          {isMobile && <p className="text-xs text-gray-400 mt-0.5">Staff Management</p>}
        </div>
        <button
          onClick={() => { setEditId(null); setShowDrawer(true); }}
          className={`bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors
            ${isMobile ? "px-3 py-2 text-xs" : "px-4 py-2 text-sm"}`}
        >
          + {isMobile ? "Add Staff" : "Add New Staff Member"}
        </button>
      </div>

      {/* ── MOBILE: Card Layout ── */}
      {isMobile ? (
        <div className="flex flex-col gap-3">
          {currentRecords.map((staff) => (
            <div key={staff.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">

              {/* Card Header: avatar + name + role */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={staff.profileImage || getAvatarUrl(staff.name)}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 shadow-sm flex-shrink-0"
                  alt={staff.name}
                  onError={(e) => { e.target.src = getAvatarUrl(staff.name); }}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800 text-sm truncate">{staff.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{staff.role}</div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full font-medium flex-shrink-0 ${
                  staff.status === "Enabled" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                }`}>
                  {staff.status}
                </span>
              </div>

              {/* Card Rows */}
              <div className="space-y-2 border-t border-gray-50 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400 font-medium">Email</span>
                  <span className="text-xs text-gray-600 truncate max-w-[60%]">{staff.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400 font-medium">Phone</span>
                  <span className="text-xs text-gray-600">{staff.phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400 font-medium">Address</span>
                  <span className="text-xs text-gray-600">{staff.address}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-3 pt-3 border-t border-gray-50">
                <button
                  onClick={() => handleEdit(staff)}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(staff.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                >
                  🗑️ Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* ── DESKTOP: Table Layout ── */
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
              <tr>
                <th className="p-3">Profile</th>
                <th className="p-3">Name</th>
                <th className="p-3">Role</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Status</th>
                <th className="p-3">Address</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((staff) => (
                <tr key={staff.id} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="p-3">
                    <img
                      src={staff.profileImage || getAvatarUrl(staff.name)}
                      className="w-10 h-10 rounded-full object-cover"
                      alt={staff.name}
                      onError={(e) => { e.target.src = getAvatarUrl(staff.name); }}
                    />
                  </td>
                  <td className="p-3 font-medium">{staff.name}</td>
                  <td className="p-3">{staff.role}</td>
                  <td className="p-3">{staff.email}</td>
                  <td className="p-3">{staff.phone}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      staff.status === "Enabled" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}>
                      {staff.status}
                    </span>
                  </td>
                  <td className="p-3">{staff.address}</td>
                  <td className="p-3 space-x-2">
                    <button onClick={() => handleEdit(staff)} className="bg-yellow-400 px-2 py-1 text-xs rounded hover:bg-yellow-500">Edit</button>
                    <button onClick={() => handleDelete(staff.id)} className="bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Pagination ── */}
      <div className="flex justify-center mt-6 gap-2 flex-wrap">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 text-sm"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded text-sm ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 text-sm"
        >
          Next
        </button>
      </div>

      {/* ── Drawer Form ── */}
      {showDrawer && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
          <div className={`${isMobile ? "w-full" : "w-[400px]"} bg-white h-full p-6 overflow-y-auto shadow-2xl`}>

            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-800">
                {editId ? "Edit Staff Member" : "Add New Staff Member"}
              </h3>
              <button onClick={() => setShowDrawer(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>

            {/* Image preview */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={formData.profileImage || getAvatarUrl(formData.name || "User")}
                className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                alt="preview"
                onError={(e) => { e.target.src = getAvatarUrl(formData.name || "User"); }}
              />
              <div>
                <p className="text-xs text-gray-500 mb-1">Profile Photo</p>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="text-xs" />
              </div>
            </div>

            <div className="space-y-3">
              <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-400">
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Team Member">Team Member</option>
              </select>
              <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} className="w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-400" />
              <input type="text" name="phone" placeholder="Enter Phone" value={formData.phone} onChange={handleChange} className="w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-400" />
              <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} className="w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-400" />
              <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} className="w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-400" />
              <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-400">
                <option value="Enabled">Enabled</option>
                <option value="Disabled">Disabled</option>
              </select>
              <textarea name="address" placeholder="Enter Address" value={formData.address} onChange={handleChange} className="w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-400 h-24 resize-none" />
            </div>

            <div className="flex gap-3 mt-5">
              <button onClick={handleCreate} className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors">
                {editId ? "Update" : "Create"}
              </button>
              <button onClick={() => setShowDrawer(false)} className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-300 transition-colors">
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default StaffMembers;