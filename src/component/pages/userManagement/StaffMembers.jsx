import React, { useState } from "react";

function StaffMembers() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [editId, setEditId] = useState(null);

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
        password: ""
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

  // CREATE + UPDATE
  const handleCreate = () => {
    if (editId) {
      const updatedList = staffList.map((staff) =>
        staff.id === editId ? { ...staff, ...formData } : staff
      );
      setStaffList(updatedList);
      setEditId(null);
    } else {
      const newStaff = {
        id: staffList.length + 1,
        ...formData,
        profileImage:
          formData.profileImage || "https://via.placeholder.com/40",
      };
      setStaffList([...staffList, newStaff]);
    }

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

  // DELETE
  const handleDelete = (id) => {
    const updatedList = staffList.filter((staff) => staff.id !== id);
    setStaffList(updatedList);
  };

  // EDIT
  const handleEdit = (staff) => {
    setFormData(staff);
    setEditId(staff.id);
    setShowDrawer(true);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3">
        <h2 className="text-2xl font-semibold">Users</h2>
        <button
          onClick={() => {
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
            setEditId(null);
            setShowDrawer(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
        >
          + Add New Staff Member
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white shadow rounded-lg">
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
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff) => (
              <tr key={staff.id} className="border-t">
                <td className="p-3">
                  <img
                    src={staff.profileImage}
                    alt=""
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
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(staff)}
                    className="bg-yellow-400 px-2 py-1 text-xs rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(staff.id)}
                    className="bg-red-500 text-white px-2 py-1 text-xs rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {staffList.map((staff) => (
          <div key={staff.id} className="bg-white shadow rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={staff.profileImage}
                alt=""
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{staff.name}</h3>
                <p className="text-sm text-gray-500">{staff.role}</p>
              </div>
            </div>

            <div className="text-sm space-y-1">
              <p><strong>Email:</strong> {staff.email}</p>
              <p><strong>Phone:</strong> {staff.phone}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    staff.status === "Enabled"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {staff.status}
                </span>
              </p>
              <p><strong>Address:</strong> {staff.address}</p>
            </div>

            <div className="mt-3 space-x-2">
              <button
                onClick={() => handleEdit(staff)}
                className="bg-blue-400 px-3 py-1 text-xs rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(staff.id)}
                className="bg-red-500 text-white px-3 py-1 text-xs rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Drawer */}
      {showDrawer && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end">
          <div className="w-full sm:w-[400px] bg-white h-full p-6 overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">
              {editId ? "Edit Staff Member" : "Add New Staff Member"}
            </h3>

            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full mb-3" />

            <select name="role" value={formData.role} onChange={handleChange} className="w-full mb-3 p-2 border rounded-lg">
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Team Member">Team Member</option>
            </select>

            <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} className="w-full mb-3 p-2 border rounded-lg" />
            <input type="text" name="phone" placeholder="Enter Phone" value={formData.phone} onChange={handleChange} className="w-full mb-3 p-2 border rounded-lg" />
            <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} className="w-full mb-3 p-2 border rounded-lg" />
            <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} className="w-full mb-3 p-2 border rounded-lg" />

            <select name="status" value={formData.status} onChange={handleChange} className="w-full mb-3 p-2 border rounded-lg">
              <option value="Enabled">Enabled</option>
              <option value="Disabled">Disabled</option>
            </select>

            <textarea name="address" placeholder="Enter Address" value={formData.address} onChange={handleChange} className="w-full mb-4 p-2 border rounded-lg"></textarea>

            <div className="flex justify-between">
              <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                {editId ? "Update" : "Create"}
              </button>
              <button onClick={() => setShowDrawer(false)} className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500">
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