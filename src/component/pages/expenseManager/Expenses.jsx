import React, { useEffect, useState } from "react";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  const [showDrawer, setShowDrawer] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  const [formData, setFormData] = useState({
    category: "",
    user: "",
    amount: "",
    date: "",
    notes: "",
    bill: null,
  });

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "Enabled",
    address: "",
  });

  // Load from localStorage
  useEffect(() => {
    setCategories(JSON.parse(localStorage.getItem("expenseCategories")) || []);
    setExpenses(JSON.parse(localStorage.getItem("expensesList")) || []);
    setUsers(JSON.parse(localStorage.getItem("usersList")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("expensesList", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("expenseCategories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("usersList", JSON.stringify(users));
  }, [users]);

  // File Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, bill: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Add Expense
  const handleAddExpense = () => {
    if (!formData.category || !formData.user || !formData.amount || !formData.date) {
      alert("All required fields are mandatory");
      return;
    }

    const newExpense = { ...formData, id: Date.now() };
    setExpenses([...expenses, newExpense]);
    setShowDrawer(false);

    setFormData({
      category: "",
      user: "",
      amount: "",
      date: "",
      notes: "",
      bill: null,
    });
  };

  // Add Category
  const handleAddCategory = () => {
    if (!newCategory.name) return alert("Category Name required");

    const categoryObj = { id: Date.now(), ...newCategory };
    setCategories([...categories, categoryObj]);

    setFormData((prev) => ({ ...prev, category: newCategory.name }));

    setNewCategory({ name: "", description: "" });
    setShowCategoryModal(false);
  };

  // Add User
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      return alert("Name & Email required");
    }

    const userObj = { id: Date.now(), ...newUser };
    setUsers([...users, userObj]);

    setFormData((prev) => ({ ...prev, user: newUser.name }));

    setNewUser({
      name: "",
      email: "",
      phone: "",
      role: "",
      status: "Enabled",
      address: "",
    });

    setShowUserModal(false);
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">Expenses</h2>
        <button
          onClick={() => setShowDrawer(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add New Expense
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Category</th>
              <th className="p-3">User</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Bill</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-400">
                  No Data Available
                </td>
              </tr>
            ) : (
              expenses.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">{item.user}</td>
                  <td className="p-3">₹ {item.amount}</td>
                  <td className="p-3">{item.date}</td>
                  <td className="p-3">
                    {item.bill ? (
                      <a href={item.bill} target="_blank" rel="noreferrer" className="text-blue-600 underline text-xs">
                        View
                      </a>
                    ) : "-"}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Drawer */}
      {showDrawer && (
        <div className="fixed inset-0 z-40 flex">
          <div className="flex-1 bg-black/40" onClick={() => setShowDrawer(false)}></div>

          <div className="w-full max-w-xl bg-white p-6 overflow-y-auto">

            <div className="flex justify-between mb-6 border-b pb-3">
              <h3 className="text-lg font-semibold">Add New Expense</h3>
              <button onClick={() => setShowDrawer(false)}>✕</button>
            </div>

            {/* Category */}
            <label className="font-medium">Expense Category *</label>
            <div className="flex gap-2 mb-4">
              <select
                className="w-full border p-2 rounded"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              <button onClick={() => setShowCategoryModal(true)} className="border px-3 rounded bg-gray-100">+</button>
            </div>

            {/* User */}
            <label className="font-medium">User *</label>
            <div className="flex gap-2 mb-4">
              <select
                className="w-full border p-2 rounded"
                value={formData.user}
                onChange={(e) => setFormData({ ...formData, user: e.target.value })}
              >
                <option value="">Select User</option>
                {users.map((u) => (
                  <option key={u.id} value={u.name}>{u.name}</option>
                ))}
              </select>
              <button onClick={() => setShowUserModal(true)} className="border px-3 rounded bg-gray-100">+</button>
            </div>

            <input type="date" className="w-full border p-2 rounded mb-4"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />

            <input type="number" placeholder="Amount"
              className="w-full border p-2 rounded mb-4"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />

            <div className="mb-4">
              <label className="cursor-pointer border px-4 py-2 rounded bg-gray-100">
                Upload Bill
                <input type="file" className="hidden" onChange={handleFileChange} />
              </label>
            </div>

            <textarea placeholder="Notes"
              className="w-full border p-2 rounded mb-6"
              rows="3"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />

            <div className="flex justify-end gap-3 border-t pt-4">
              <button onClick={() => setShowDrawer(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleAddExpense} className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
            </div>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="mb-4 font-semibold">Add Category</h3>
            <input type="text" placeholder="Category Name"
              className="w-full border p-2 mb-3 rounded"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
            <textarea placeholder="Description"
              className="w-full border p-2 mb-4 rounded"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowCategoryModal(false)} className="border px-4 py-2 rounded">Cancel</button>
              <button onClick={handleAddCategory} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded w-full max-w-lg">
            <h3 className="mb-4 font-semibold">Add New Staff Member</h3>

            <input type="text" placeholder="Name"
              className="w-full border p-2 mb-3 rounded"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />

            <input type="email" placeholder="Email"
              className="w-full border p-2 mb-3 rounded"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />

            <input type="text" placeholder="Phone"
              className="w-full border p-2 mb-3 rounded"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            />

            <input type="text" placeholder="Role"
              className="w-full border p-2 mb-3 rounded"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            />

            <textarea placeholder="Address"
              className="w-full border p-2 mb-4 rounded"
              value={newUser.address}
              onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowUserModal(false)} className="border px-4 py-2 rounded">Cancel</button>
              <button onClick={handleAddUser} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Expenses;