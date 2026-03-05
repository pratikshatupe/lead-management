import { useState } from "react";

const initialFields = [
  { id: 1, fieldName: "sidkAJDOIJ", similarFieldNames: ["iudpiw"], visible: true },
  { id: 2, fieldName: "Email", similarFieldNames: ["Email", "email"], visible: true },
  {
    id: 3,
    fieldName: "Name",
    similarFieldNames: ["First Name", "Name", "name", "first name", "First name", "first Name"],
    visible: true,
  },
];

// ─── Toggle Switch ─────────────────────────────────────────────────────────
function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
        checked ? "bg-blue-500" : "bg-slate-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-300 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

// ─── Modal ─────────────────────────────────────────────────────────────────
function Modal({ isOpen, onClose, onSave, editData }) {
  const [fieldName, setFieldName] = useState(editData?.fieldName || "");
  const [similarFields, setSimilarFields] = useState(editData?.similarFieldNames || []);
  const [newSimilar, setNewSimilar] = useState("");
  const [visible, setVisible] = useState(editData?.visible ?? true);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleAddSimilar = () => {
    if (newSimilar.trim()) {
      setSimilarFields([...similarFields, newSimilar.trim()]);
      setNewSimilar("");
    }
  };

  const handleRemoveSimilar = (i) =>
    setSimilarFields(similarFields.filter((_, idx) => idx !== i));

  const handleSave = () => {
    if (!fieldName.trim()) { setError("Field Name is required."); return; }
    setError("");
    onSave({ fieldName: fieldName.trim(), similarFieldNames: similarFields, visible });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-5">
          {editData ? "Edit Lead Table Field" : "Add New Lead Table Field"}
        </h2>

        {/* Field Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="text-red-500">* </span>Field Name
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            placeholder="Please Enter Field Name"
            value={fieldName}
            onChange={(e) => { setFieldName(e.target.value); setError(""); }}
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        {/* Similar Field Names */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Similar Field Names</label>
          {similarFields.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {similarFields.map((sf, i) => (
                <span key={i} className="flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-200">
                  {sf}
                  <button onClick={() => handleRemoveSimilar(i)} className="text-blue-400 hover:text-red-500 transition font-bold">×</button>
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <input
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              placeholder="Enter similar field name"
              value={newSimilar}
              onChange={(e) => setNewSimilar(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddSimilar()}
            />
            <button
              onClick={handleAddSimilar}
              className="border border-gray-300 text-gray-600 text-sm px-3 py-2 rounded-lg hover:bg-gray-50 transition whitespace-nowrap"
            >+ Add Field</button>
          </div>
        </div>

        {/* Visible */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Visible</label>
          <div className="flex rounded-lg overflow-hidden border border-gray-300 w-fit">
            <button
              onClick={() => setVisible(true)}
              className={`px-5 py-1.5 text-sm font-semibold transition ${visible ? "bg-blue-500 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
            >Yes</button>
            <button
              onClick={() => setVisible(false)}
              className={`px-5 py-1.5 text-sm font-semibold border-l border-gray-300 transition ${!visible ? "bg-blue-500 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
            >No</button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition"
          >Cancel</button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {editData ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
function LeadTableFields() {
  const [fields, setFields] = useState(initialFields);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editId, setEditId] = useState(null);
  const [selected, setSelected] = useState([]);
  const [searchText, setSearchText] = useState("");

  const openAddModal = () => { setEditData(null); setEditId(null); setModalOpen(true); };
  const openEditModal = (field) => { setEditData({ ...field }); setEditId(field.id); setModalOpen(true); };

  const handleSave = (data) => {
    if (editId !== null)
      setFields(fields.map((f) => (f.id === editId ? { ...f, ...data } : f)));
    else
      setFields([...fields, { id: Date.now(), ...data }]);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this field?"))
      setFields(fields.filter((f) => f.id !== id));
  };

  const handleToggleVisible = (id) =>
    setFields(fields.map((f) => (f.id === id ? { ...f, visible: !f.visible } : f)));

  const filteredFields = fields.filter((f) =>
    f.fieldName.toLowerCase().includes(searchText.toLowerCase())
  );

  const allSelected = filteredFields.length > 0 && selected.length === filteredFields.length;

  return (
    <div className="p-6">

      {/* Breadcrumb */}
      <p className="text-xs text-gray-400 mb-1">Dashboard &nbsp;-&nbsp; Lead Table Fields</p>

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Lead Table Fields</h1>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition shadow-sm"
        >
          <span className="text-lg font-bold leading-none">+</span>
          Add New Lead Table Field
        </button>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm text-gray-400 cursor-pointer select-none">
            Sel... <span className="text-xs ml-1">▼</span>
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2">
            <input
              className="outline-none text-sm text-gray-700 w-40 bg-transparent placeholder-gray-400"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="w-10 px-4 py-3 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => setSelected(e.target.checked ? filteredFields.map((f) => f.id) : [])}
                  className="cursor-pointer accent-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Field Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Similar Field Names</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Visible</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredFields.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-400 text-sm">No fields found.</td>
              </tr>
            ) : (
              filteredFields.map((field) => (
                <tr key={field.id} className="hover:bg-blue-50/40 transition">
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(field.id)}
                      onChange={() =>
                        setSelected((prev) =>
                          prev.includes(field.id) ? prev.filter((x) => x !== field.id) : [...prev, field.id]
                        )
                      }
                      className="cursor-pointer accent-blue-500"
                    />
                  </td>
                  <td className="px-4 py-4 font-medium text-gray-700">{field.fieldName}</td>
                  <td className="px-4 py-4">
                    <ul className="space-y-0.5">
                      {field.similarFieldNames.map((s, i) => (
                        <li key={i} className="text-gray-500 text-sm flex items-center gap-1">
                          <span className="text-gray-400">•</span> {s}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-4">
                    <ToggleSwitch checked={field.visible} onChange={() => handleToggleVisible(field.id)} />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(field)}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(field.id)}
                        className="bg-blue-500 hover:bg-red-500 text-white p-2 rounded-lg transition"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 px-1">
        <span className="text-xs text-gray-400">Total: {filteredFields.length} fields</span>
        <div className="flex items-center gap-1">
          <button className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded bg-white text-gray-500 text-xs hover:bg-gray-50 transition">‹</button>
          <span className="w-7 h-7 flex items-center justify-center bg-blue-500 text-white rounded text-xs font-semibold">1</span>
          <button className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded bg-white text-gray-500 text-xs hover:bg-gray-50 transition">›</button>
          <span className="ml-2 text-xs text-gray-400">10 / page</span>
        </div>
      </div>

      {/* Modal */}
      <Modal
        key={editId ?? "new"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editData={editData}
      />
    </div>
  );
}

export default LeadTableFields;