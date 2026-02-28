import React, { useState } from "react";

function StaffMembers() {

  const [showDrawer, setShowDrawer] = useState(false);
  const [editId, setEditId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Generate 50 Records
  const generateDummyData = () => {
    let arr = [];
    for (let i = 1; i <= 50; i++) {
      arr.push({
        id: i,
        name: `User ${i}`,
        role: i % 2 === 0 ? "Admin" : "Team Member",
        email: `user${i}@gmail.com`,
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
    address: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setFormData({
        ...formData,
        profileImage: imageUrl
      });
    }
  };

  // CREATE + UPDATE
  const handleCreate = () => {

    if (editId) {

      const updated = staffList.map((staff) =>
        staff.id === editId ? { ...staff, ...formData } : staff
      );

      setStaffList(updated);
      setEditId(null);

    } else {

      const newStaff = {
        id: staffList.length + 1,
        ...formData,
        profileImage:
          formData.profileImage || "https://via.placeholder.com/40"
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
      address: ""
    });
  };

  // DELETE
  const handleDelete = (id) => {
    const updated = staffList.filter((staff) => staff.id !== id);
    setStaffList(updated);
  };

  // EDIT
  const handleEdit = (staff) => {
    setFormData(staff);
    setEditId(staff.id);
    setShowDrawer(true);
  };

  // Pagination Logic
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;

  const currentRecords = staffList.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(staffList.length / recordsPerPage);

  return (
    <div className="p-6">

      {/* Header */}

      <div className="flex justify-between mb-6">

        <h2 className="text-2xl font-semibold">Users</h2>

        <button
          onClick={() => {
            setEditId(null);
            setShowDrawer(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add New Staff Member
        </button>

      </div>


      {/* Table */}

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

              <tr key={staff.id} className="border-t">

                <td className="p-3">
                  <img
                    src={staff.profileImage}
                    className="w-10 h-10 rounded-full"
                    alt=""
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


      {/* Pagination */}

      <div className="flex justify-center mt-6 gap-2">

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 py-1 bg-gray-300 rounded"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (

          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>

        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-3 py-1 bg-gray-300 rounded"
        >
          Next
        </button>

      </div>


      {/* Drawer Form */}

      {showDrawer && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">

          <div className="w-full sm:w-[400px] bg-white h-full p-6 overflow-y-auto">

            <h3 className="text-xl font-semibold mb-4">
              {editId ? "Edit Staff Member" : "Add New Staff Member"}
            </h3>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full mb-3"
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
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
              className="w-full mb-3 p-2 border rounded"
            />

            <input
              type="text"
              name="phone"
              placeholder="Enter Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            >
              <option value="Enabled">Enabled</option>
              <option value="Disabled">Disabled</option>
            </select>

            <textarea
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
            />

            <div className="flex justify-between">

              <button
                onClick={handleCreate}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                {editId ? "Update" : "Create"}
              </button>

              <button
                onClick={() => setShowDrawer(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
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