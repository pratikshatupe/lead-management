import React, { useState } from "react";

function StaffMembers() {
  const [showDrawer, setShowDrawer] = useState(false);

  const generateDummyData = () => {
    let arr = [];
    for (let i = 1; i <= 20; i++) {
      arr.push({
        id: i,
        name: `User ${i}`,
        role: i % 2 === 0 ? "Admin" : "Team Member",
        email: `user${i}@example.com`,
        phone: "9876543210",
        status: i % 3 === 0 ? "Disabled" : "Enabled",
        address: "Pune, Maharashtra",
        profileImage: "https://via.placeholder.com/40",
      });
    }
    return arr;
  };

  const [staffList, setStaffList] = useState(generateDummyData());

  const [formData, setFormData] = useState({
    profileImage: "",
    role: "",
    name: "",
    phone: "",
    password: "",
    email: "",
    status: "Enabled",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 📌 Image Upload Handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        profileImage: imageUrl,
      });
    }
  };

  const handleCreate = () => {
    const newStaff = {
      id: staffList.length + 1,
      ...formData,
    };

    setStaffList([...staffList, newStaff]);
    setShowDrawer(false);

    setFormData({
      profileImage: "",
      role: "",
      name: "",
      phone: "",
      password: "",
      email: "",
      status: "Enabled",
      address: "",
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">Users</h2>
        <button
          onClick={() => setShowDrawer(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add New Staff Member
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-3">Profile</th>
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Status</th>
              <th className="p-3">Address</th>
            </tr>
          </thead>

          <tbody>
            {staffList.map((staff) => (
              <tr key={staff.id} className="border-t">
                <td className="p-3">
                  <img
                    src={staff.profileImage}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="p-3">{staff.name}</td>
                <td className="p-3">{staff.role}</td>
                <td className="p-3">{staff.email}</td>
                <td className="p-3">{staff.phone}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      staff.status === "Enabled"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {staff.status}
                  </span>
                </td>
                <td className="p-3">{staff.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Drawer */}
      {showDrawer && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end">
          <div className="w-full sm:w-[400px] bg-white h-full p-6 overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">
              Add New Staff Member
            </h3>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Profile Image
              </label>

              {formData.profileImage && (
                <img
                  src={formData.profileImage}
                  alt="preview"
                  className="w-20 h-20 rounded-full mb-3 object-cover"
                />
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full"
              />
            </div>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded-lg"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Team Member">Team Member</option>
            </select>

            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded-lg"
            />

            <input
              type="text"
              name="phone"
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded-lg"
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded-lg"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded-lg"
            >
              <option value="Enabled">Enabled</option>
              <option value="Disabled">Disabled</option>
            </select>

            <textarea
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded-lg"
            ></textarea>

            <div className="flex justify-between">
              <button
                onClick={handleCreate}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Create
              </button>

              <button
                onClick={() => setShowDrawer(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
              >
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