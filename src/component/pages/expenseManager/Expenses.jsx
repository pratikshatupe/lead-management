import React, { useEffect, useState } from "react";

function Expenses() {
  const [expenses, setExpenses]               = useState([]);
  const [categories, setCategories]           = useState([]);
  const [users, setUsers]                     = useState([]);
  const [showDrawer, setShowDrawer]           = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showUserModal, setShowUserModal]     = useState(false);
  const [viewBill, setViewBill]               = useState(null); // expense object for bill view

  const [formData, setFormData] = useState({
    category: "", user: "", amount: "", date: "", notes: "", bill: null,
  });
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [newUser, setNewUser] = useState({
    name: "", email: "", phone: "", role: "", status: "Enabled", address: "",
  });

  useEffect(() => {
    setCategories(JSON.parse(localStorage.getItem("expenseCategories")) || []);
    setExpenses(JSON.parse(localStorage.getItem("expensesList")) || []);
    setUsers(JSON.parse(localStorage.getItem("usersList")) || []);
  }, []);

  useEffect(() => { localStorage.setItem("expensesList",    JSON.stringify(expenses));   }, [expenses]);
  useEffect(() => { localStorage.setItem("expenseCategories", JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem("usersList",       JSON.stringify(users));      }, [users]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormData(prev => ({ ...prev, bill: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleAddExpense = () => {
    if (!formData.category || !formData.user || !formData.amount || !formData.date) {
      alert("All required fields are mandatory");
      return;
    }
    setExpenses(prev => [...prev, { ...formData, id: Date.now() }]);
    setShowDrawer(false);
    setFormData({ category: "", user: "", amount: "", date: "", notes: "", bill: null });
  };

  const handleAddCategory = () => {
    if (!newCategory.name) return alert("Category Name required");
    setCategories(prev => [...prev, { id: Date.now(), ...newCategory }]);
    setFormData(prev => ({ ...prev, category: newCategory.name }));
    setNewCategory({ name: "", description: "" });
    setShowCategoryModal(false);
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return alert("Name & Email required");
    setUsers(prev => [...prev, { id: Date.now(), ...newUser }]);
    setFormData(prev => ({ ...prev, user: newUser.name }));
    setNewUser({ name: "", email: "", phone: "", role: "", status: "Enabled", address: "" });
    setShowUserModal(false);
  };

  const handleDelete = (id) => setExpenses(prev => prev.filter(item => item.id !== id));

  if (viewBill) {
    return (
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
        {/* Back header */}
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={() => setViewBill(null)}
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-600
              hover:text-blue-600 bg-white border border-gray-200 px-3 py-2 rounded-lg
              shadow-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-800 m-0">Bill Details</h2>
            <p className="text-xs text-gray-400 mt-0.5">Expenses — Bill View</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-lg">
          <div className="px-5 py-4 border-b border-gray-100 bg-blue-50 flex items-center justify-between">
            <span className="text-sm font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
              {viewBill.category}
            </span>
            <span className="text-xl font-bold text-gray-800">₹ {viewBill.amount}</span>
          </div>

          <div className="divide-y divide-gray-50">
            <div className="flex flex-col px-5 py-3.5">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">
                Category
              </span>
              <span className="text-sm font-medium text-gray-800">{viewBill.category}</span>
            </div>

            <div className="flex flex-col px-5 py-3.5">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">
                User
              </span>
              <span className="text-sm font-medium text-gray-800">{viewBill.user}</span>
            </div>

            <div className="flex flex-col px-5 py-3.5">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">
                Amount
              </span>
              <span className="text-sm font-medium text-gray-800">₹ {viewBill.amount}</span>
            </div>

            <div className="flex flex-col px-5 py-3.5">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">
                Date
              </span>
              <span className="text-sm font-medium text-gray-800">{viewBill.date}</span>
            </div>

            {viewBill.notes && (
              <div className="flex flex-col px-5 py-3.5">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">
                  Notes
                </span>
                <span className="text-sm text-gray-700 leading-relaxed">{viewBill.notes}</span>
              </div>
            )}

            <div className="flex flex-col px-5 py-3.5">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-2">
                Bill
              </span>
              {viewBill.bill ? (
                viewBill.bill.startsWith("data:image") ? (
                  <img
                    src={viewBill.bill}
                    alt="Bill"
                    className="w-full max-w-xs rounded-xl border border-gray-200 shadow-sm"
                  />
                ) : (
                  <a
                    href={viewBill.bill}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-blue-600 font-semibold
                      bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors w-fit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    View Bill
                  </a>
                )
              ) : (
                <span className="text-sm text-gray-400 italic">No bill attached</span>
              )}
            </div>
          </div>

          <div className="px-5 py-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
            <button
              onClick={() => setViewBill(null)}
              className="text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back to list
            </button>
            <button
              onClick={() => { handleDelete(viewBill.id); setViewBill(null); }}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white
                text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">

      <div className="flex items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl font-bold text-gray-800 m-0">Expenses</h2>
          <p className="text-xs text-gray-400 mt-0.5">Dashboard - Expenses</p>
        </div>
        <button
          onClick={() => setShowDrawer(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white
            text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm
            whitespace-nowrap flex-shrink-0"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden xs:inline">Add New Expense</span>
          <span className="xs:hidden">Add</span>
        </button>
      </div>

      <div className="hidden sm:block bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["Category","User","Amount","Date","Bill","Action"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-400 text-sm">No Data Available</td>
              </tr>
            ) : expenses.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3.5 text-sm text-gray-700">{item.category}</td>
                <td className="px-4 py-3.5 text-sm text-gray-700">{item.user}</td>
                <td className="px-4 py-3.5 text-sm font-medium text-gray-800">₹ {item.amount}</td>
                <td className="px-4 py-3.5 text-sm text-gray-600">{item.date}</td>
                <td className="px-4 py-3.5">
                  {item.bill ? (
                    <button
                      onClick={() => setViewBill(item)}
                      className="text-blue-600 hover:text-blue-800 underline text-xs font-medium"
                    >
                      View
                    </button>
                  ) : (
                    <span className="text-gray-300 text-xs">—</span>
                  )}
                </td>
                <td className="px-4 py-3.5">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <div className="sm:hidden flex flex-col gap-2.5">
        {expenses.length === 0 ? (
          <div className="text-center py-10 text-gray-400 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="text-4xl mb-2">🧾</div>
            <div className="text-sm font-semibold">No Data Available</div>
          </div>
        ) : expenses.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="flex flex-col px-4 py-3 border-b border-gray-100">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">
                Category
              </span>
              <span className="text-sm font-semibold text-blue-600">{item.category}</span>
            </div>

            <div className="flex flex-col px-4 py-3 border-b border-gray-100">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">
                User
              </span>
              <span className="text-sm font-medium text-gray-800">{item.user}</span>
            </div>

            <div className="flex flex-col px-4 py-3 border-b border-gray-100">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">
                Amount
              </span>
              <span className="text-sm font-bold text-gray-800">₹ {item.amount}</span>
            </div>

            <div className="flex flex-col px-4 py-3 border-b border-gray-100">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">
                Date
              </span>
              <span className="text-sm text-gray-700">{item.date}</span>
            </div>

            {item.notes && (
              <div className="flex flex-col px-4 py-3 border-b border-gray-100">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">
                  Notes
                </span>
                <span className="text-sm text-gray-600 leading-relaxed">{item.notes}</span>
              </div>
            )}

            <div className="flex flex-col px-4 py-3 border-b border-gray-100">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">
                Bill
              </span>
              {item.bill ? (
                <button
                  onClick={() => setViewBill(item)}
                  className="inline-flex items-center gap-1.5 text-sm text-blue-600 font-semibold
                    bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors w-fit"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Bill
                </button>
              ) : (
                <span className="text-sm text-gray-400 italic">No bill attached</span>
              )}
            </div>

            <div className="flex flex-col px-4 py-3">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">
                Action
              </span>
              <div className="flex gap-2">
                {item.bill && (
                  <button
                    onClick={() => setViewBill(item)}
                    className="flex items-center gap-1.5 text-sm font-semibold text-blue-600
                      bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </button>
                )}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white
                    text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showDrawer && (
        <div className="fixed inset-0 z-40 flex">
          <div className="flex-1 bg-black/40" onClick={() => setShowDrawer(false)} />
          <div className="w-full max-w-xl bg-white p-5 sm:p-6 overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-5 border-b pb-3">
              <h3 className="text-lg font-semibold text-gray-800">Add New Expense</h3>
              <button onClick={() => setShowDrawer(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Expense Category <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 mb-4">
              <select
                className="w-full border border-gray-200 p-2.5 rounded-lg text-sm outline-none focus:border-blue-500"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Select Category</option>
                {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
              </select>
              <button
                onClick={() => setShowCategoryModal(true)}
                className="border border-gray-200 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold transition-colors"
              >+</button>
            </div>

            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              User <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 mb-4">
              <select
                className="w-full border border-gray-200 p-2.5 rounded-lg text-sm outline-none focus:border-blue-500"
                value={formData.user}
                onChange={e => setFormData({ ...formData, user: e.target.value })}
              >
                <option value="">Select User</option>
                {users.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
              </select>
              <button
                onClick={() => setShowUserModal(true)}
                className="border border-gray-200 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold transition-colors"
              >+</button>
            </div>

            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="w-full border border-gray-200 p-2.5 rounded-lg text-sm mb-4 outline-none focus:border-blue-500"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
            />

            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter Amount"
              className="w-full border border-gray-200 p-2.5 rounded-lg text-sm mb-4 outline-none focus:border-blue-500"
              value={formData.amount}
              onChange={e => setFormData({ ...formData, amount: e.target.value })}
            />

            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Upload Bill</label>
            <div className="mb-4">
              <label className="cursor-pointer inline-flex items-center gap-2 border border-gray-200 px-4 py-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm text-gray-600 font-medium transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formData.bill ? "Bill Selected ✓" : "Upload Bill"}
                <input type="file" className="hidden" onChange={handleFileChange} />
              </label>
            </div>

            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Notes</label>
            <textarea
              placeholder="Add notes..."
              className="w-full border border-gray-200 p-2.5 rounded-lg text-sm mb-5 outline-none focus:border-blue-500 resize-none"
              rows={3}
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
            />

            <div className="flex justify-end gap-3 border-t pt-4">
              <button
                onClick={() => setShowDrawer(false)}
                className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddExpense}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {showCategoryModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
          <div className="bg-white p-5 rounded-xl w-full max-w-md shadow-2xl">
            <h3 className="mb-4 font-semibold text-gray-800">Add Category</h3>
            <input
              type="text" placeholder="Category Name"
              className="w-full border border-gray-200 p-2.5 mb-3 rounded-lg text-sm outline-none focus:border-blue-500"
              value={newCategory.name}
              onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="w-full border border-gray-200 p-2.5 mb-4 rounded-lg text-sm outline-none focus:border-blue-500 resize-none"
              rows={3}
              value={newCategory.description}
              onChange={e => setNewCategory({ ...newCategory, description: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowCategoryModal(false)} className="border border-gray-200 px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleAddCategory} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">Save</button>
            </div>
          </div>
        </div>
      )}

      {showUserModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
          <div className="bg-white p-5 rounded-xl w-full max-w-lg shadow-2xl">
            <h3 className="mb-4 font-semibold text-gray-800">Add New Staff Member</h3>
            <input type="text" placeholder="Name" className="w-full border border-gray-200 p-2.5 mb-3 rounded-lg text-sm outline-none focus:border-blue-500" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} />
            <input type="email" placeholder="Email" className="w-full border border-gray-200 p-2.5 mb-3 rounded-lg text-sm outline-none focus:border-blue-500" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
            <input type="text" placeholder="Phone" className="w-full border border-gray-200 p-2.5 mb-3 rounded-lg text-sm outline-none focus:border-blue-500" value={newUser.phone} onChange={e => setNewUser({ ...newUser, phone: e.target.value })} />
            <input type="text" placeholder="Role" className="w-full border border-gray-200 p-2.5 mb-3 rounded-lg text-sm outline-none focus:border-blue-500" value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })} />
            <textarea placeholder="Address" className="w-full border border-gray-200 p-2.5 mb-4 rounded-lg text-sm outline-none focus:border-blue-500 resize-none" rows={3} value={newUser.address} onChange={e => setNewUser({ ...newUser, address: e.target.value })} />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowUserModal(false)} className="border border-gray-200 px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleAddUser} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Expenses;