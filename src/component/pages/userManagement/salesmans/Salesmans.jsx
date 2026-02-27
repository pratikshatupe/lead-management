import React, { useState } from "react";

function Salesman() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [editId, setEditId] = useState(null);

  const generateDummyData = () => [
    {
      id: 1,
      name: "Janick Sipes III",
      email: "bernardo41@example.com",
      phone: "9876543210",
      status: "Disabled",
      address: "Pune, Maharashtra",
      profileImage: "https://via.placeholder.com/60",
    },
    {
      id: 2,
      name: "Lilla Wintheiser",
      email: "ryan.lois@example.org",
      phone: "9876543211",
      status: "Enabled",
      address: "Mumbai, Maharashtra",
      profileImage: "https://via.placeholder.com/60",
    },
  ];

  const [salesmanList, setSalesmanList] = useState(generateDummyData());

  const [formData, setFormData] = useState({
    profileImage: "",
    name: "",
    email: "",
    phone: "",
    status: "Enabled",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profileImage: imageUrl });
    }
  };

  const handleSubmit = () => {
    if (editId) {
      const updated = salesmanList.map((item) =>
        item.id === editId ? { ...item, ...formData } : item
      );
      setSalesmanList(updated);
      setEditId(null);
    } else {
      const newItem = {
        id: salesmanList.length + 1,
        ...formData,
        profileImage:
          formData.profileImage || "https://via.placeholder.com/60",
      };
      setSalesmanList([...salesmanList, newItem]);
    }

    setShowDrawer(false);
    setFormData({
      profileImage: "",
      name: "",
      email: "",
      phone: "",
      status: "Enabled",
      address: "",
    });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item.id);
    setShowDrawer(true);
  };

  const handleDelete = (id) => {
    const filtered = salesmanList.filter((item) => item.id !== id);
    setSalesmanList(filtered);
  };

  return (
    <div className="p-4 sm:p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-5">
        <h2 className="text-2xl font-semibold">Salesmans</h2>
        <button
          onClick={() => {
            setEditId(null);
            setShowDrawer(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
        >
          + Add New Salesman
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="p-3">Profile</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {salesmanList.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">
                  <img src={item.profileImage} className="w-12 h-12 rounded-full" alt="" />
                </td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3">{item.phone}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      item.status === "Enabled"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
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
        {salesmanList.map((item) => (
          <div key={item.id} className="bg-white shadow rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <img src={item.profileImage} className="w-14 h-14 rounded-full" alt="" />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.email}</p>
              </div>
            </div>

            <div className="text-sm space-y-1">
              <p><strong>Phone:</strong> {item.phone}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    item.status === "Enabled"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.status}
                </span>
              </p>
              <p><strong>Address:</strong> {item.address}</p>
            </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-blue-500 text-white px-3 py-1 rounded text-xs w-full"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-xs w-full"
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
              {editId ? "Edit Salesman" : "Add New Salesman"}
            </h3>

            {formData.profileImage && (
              <img src={formData.profileImage} className="w-20 h-20 rounded-full mb-3" alt="" />
            )}

            <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-3 w-full" />

            <input type="text" name="name" placeholder="Enter Name"
              value={formData.name} onChange={handleChange}
              className="w-full mb-3 p-2 border rounded" />

            <input type="email" name="email" placeholder="Enter Email"
              value={formData.email} onChange={handleChange}
              className="w-full mb-3 p-2 border rounded" />

            <input type="text" name="phone" placeholder="Enter Phone"
              value={formData.phone} onChange={handleChange}
              className="w-full mb-3 p-2 border rounded" />

            <select name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded">
              <option value="Enabled">Enabled</option>
              <option value="Disabled">Disabled</option>
            </select>

            <textarea name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"></textarea>

            <div className="flex justify-between">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded">
                {editId ? "Update" : "Create"}
              </button>

              <button
                onClick={() => setShowDrawer(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Salesman;