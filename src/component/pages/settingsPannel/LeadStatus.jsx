import { useState } from "react";

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
);
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
);
const DeleteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
);
const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
);
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
);
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
);
const SaveIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>
);

const Toast = ({ show, message, type }) => (
  <div className={`fixed top-6 right-6 z-[9999] bg-white rounded-xl shadow-2xl px-5 py-3.5 flex items-center gap-3 transition-all duration-300
    ${type === 'success' ? 'border border-green-100' : 'border border-red-100'}
    ${show ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0
      ${type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
      {type === 'success' ? <CheckIcon /> : <XIcon />}
    </div>
    <span className={`text-sm font-bold ${type === 'success' ? 'text-emerald-800' : 'text-red-800'}`}>
      {message}
    </span>
  </div>
);

const Modal = ({ title, onClose, children, footer }) => (
  <div
    className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-[popIn_0.25s_ease]"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <h3 className="text-[17px] font-bold text-gray-800">{title}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition-colors">
          <XIcon />
        </button>
      </div>
      <div className="px-6 py-6">{children}</div>
      {footer && (
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2.5">{footer}</div>
      )}
    </div>
    <style>{`@keyframes popIn { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
  </div>
);

const FieldLabel = ({ children, required }) => (
  <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
    {required && <span className="text-red-500 mr-1">*</span>}
    {children}
  </label>
);

const TextInput = ({ className = '', ...props }) => (
  <input
    {...props}
    className={`w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13px] outline-none
      focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all ${className}`}
  />
);

export default function LeadStatus() {
  const [statuses, setStatuses] = useState([
    { id: 1, name: 'Unreachable' },
    { id: 2, name: 'Not Interested' },
    { id: 3, name: 'Interested' },
  ]);
  const [search,      setSearch]      = useState('');
  const [showAdd,     setShowAdd]     = useState(false);
  const [showEdit,    setShowEdit]    = useState(false);
  const [showDelete,  setShowDelete]  = useState(false);
  const [newName,     setNewName]     = useState('');
  const [editItem,    setEditItem]    = useState(null);
  const [deleteItem,  setDeleteItem]  = useState(null);
  const [toast,       setToast]       = useState({ show: false, message: '', type: 'success' });
  const [selected,    setSelected]    = useState([]);
  const [page,        setPage]        = useState(1);
  const perPage = 10;

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 3000);
  };

  const filtered    = statuses.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  const paginated   = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages  = Math.ceil(filtered.length / perPage);

  const handleAdd = () => {
    if (!newName.trim()) return;
    setStatuses(prev => [...prev, { id: Date.now(), name: newName.trim() }]);
    setNewName(''); setShowAdd(false);
    showToast('Lead status added successfully!');
  };
  const handleEdit = () => {
    if (!editItem?.name.trim()) return;
    setStatuses(prev => prev.map(s => s.id === editItem.id ? { ...s, name: editItem.name } : s));
    setShowEdit(false);
    showToast('Lead status updated successfully!');
  };
  const handleDelete = () => {
    setStatuses(prev => prev.filter(s => s.id !== deleteItem.id));
    setShowDelete(false);
    showToast('Lead status deleted!', 'error');
  };

  const toggleSelect = (id) => setSelected(prev =>
    prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
  );
  const toggleAll = () =>
    setSelected(selected.length === paginated.length ? [] : paginated.map(s => s.id));

  return (
    <div className="p-4 max-w-full box-border">
      <Toast show={toast.show} message={toast.message} type={toast.type} />

      {showAdd && (
        <Modal
          title="Add New Lead Status"
          onClose={() => setShowAdd(false)}
          footer={<>
            <button
              onClick={() => setShowAdd(false)}
              className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 text-[13px] font-semibold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="px-5 py-2.5 rounded-lg bg-blue-500 text-white text-[13px] font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <SaveIcon /> Create
            </button>
          </>}
        >
          <FieldLabel required>Name</FieldLabel>
          <TextInput
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="Please Enter Name"
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            autoFocus
          />
        </Modal>
      )}

      {showEdit && (
        <Modal
          title="Edit Lead Status"
          onClose={() => setShowEdit(false)}
          footer={<>
            <button
              onClick={() => setShowEdit(false)}
              className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 text-[13px] font-semibold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              className="px-5 py-2.5 rounded-lg bg-blue-500 text-white text-[13px] font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <EditIcon /> Update
            </button>
          </>}
        >
          <FieldLabel required>Name</FieldLabel>
          <TextInput
            value={editItem?.name || ''}
            onChange={e => setEditItem(prev => ({ ...prev, name: e.target.value }))}
            autoFocus
          />
        </Modal>
      )}

      {showDelete && (
        <Modal
          title="Confirm Delete"
          onClose={() => setShowDelete(false)}
          footer={<>
            <button
              onClick={() => setShowDelete(false)}
              className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 text-[13px] font-semibold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-5 py-2.5 rounded-lg bg-red-500 text-white text-[13px] font-semibold hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <DeleteIcon /> Delete
            </button>
          </>}
        >
          <p className="text-sm text-gray-700 m-0">
            Are you sure you want to delete{' '}
            <strong>"{deleteItem?.name}"</strong>? This action cannot be undone.
          </p>
        </Modal>
      )}

      <div className="mb-2">
        <h2 className="text-[22px] font-bold text-gray-800 m-0">Lead Status</h2>
        <p className="text-[13px] text-gray-400 mt-1 mb-0">
          Dashboard -{' '}
          <span className="text-gray-500 font-medium">Lead Status</span>
        </p>
      </div>

      <div className="mt-5 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

        <div className="p-3.5 border-b border-gray-100 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={() => { setNewName(''); setShowAdd(true); }}
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white
              px-4 py-2.5 rounded-lg text-[13px] font-semibold transition-colors w-full sm:w-auto"
          >
            <PlusIcon /> Add New Lead Status
          </button>

          <div className="relative w-full sm:w-52">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full border border-gray-200 rounded-lg pl-9 pr-3.5 py-2.5 text-[13px]
                outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </span>
          </div>
        </div>

       
        <div className="sm:hidden flex flex-col gap-2.5 p-3">
          {paginated.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-10">No lead statuses found</p>
          ) : paginated.map((s) => (
            <div
              key={s.id}
              className={`rounded-xl overflow-hidden border shadow-sm transition-colors
                ${selected.includes(s.id) ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}
            >
              <div className="flex items-center gap-2.5 px-3.5 py-3 border-b border-gray-100">
                <input
                  type="checkbox"
                  checked={selected.includes(s.id)}
                  onChange={() => toggleSelect(s.id)}
                  className="w-4 h-4 cursor-pointer flex-shrink-0 accent-blue-500"
                />
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide w-16 flex-shrink-0">
                  Name
                </span>
                <span className="text-[14px] font-medium text-gray-800">{s.name}</span>
              </div>

              <div className="flex items-center gap-2.5 px-3.5 py-3">
                <div className="w-4 flex-shrink-0" />
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide w-16 flex-shrink-0">
                  Action
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditItem({ ...s }); setShowEdit(true); }}
                    className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white
                      text-[13px] font-semibold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <EditIcon /> Edit
                  </button>
                  <button
                    onClick={() => { setDeleteItem(s); setShowDelete(true); }}
                    className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white
                      text-[13px] font-semibold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <DeleteIcon /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

       
        <table className="hidden sm:table w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={selected.length === paginated.length && paginated.length > 0}
                  onChange={toggleAll}
                  className="w-4 h-4 cursor-pointer accent-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-[13px] font-semibold text-gray-500">Name</th>
              <th className="px-4 py-3 text-right text-[13px] font-semibold text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-10 text-center text-gray-400 text-sm">
                  No lead statuses found
                </td>
              </tr>
            ) : paginated.map((s, i) => (
              <tr
                key={s.id}
                className={`border-t border-gray-100 transition-colors
                  ${selected.includes(s.id) ? 'bg-blue-50' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
              >
                <td className="px-4 py-3.5">
                  <input
                    type="checkbox"
                    checked={selected.includes(s.id)}
                    onChange={() => toggleSelect(s.id)}
                    className="w-4 h-4 cursor-pointer accent-blue-500"
                  />
                </td>
                <td className="px-4 py-3.5 text-[14px] text-gray-700">{s.name}</td>
                <td className="px-4 py-3.5">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => { setEditItem({ ...s }); setShowEdit(true); }}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors flex items-center"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => { setDeleteItem(s); setShowDelete(true); }}
                      className="bg-blue-500 hover:bg-red-500 text-white p-2 rounded-lg transition-colors flex items-center"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2">
          <span className="text-[13px] text-gray-400">{filtered.length} records</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="border border-gray-200 rounded-md px-2.5 py-1 text-[13px] text-gray-700
                disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`border rounded-md px-2.5 py-1 text-[13px] font-medium transition-colors
                  ${p === page
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="border border-gray-200 rounded-md px-2.5 py-1 text-[13px] text-gray-700
                disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              ›
            </button>
            <span className="text-[13px] text-gray-400 ml-1">10 / page</span>
          </div>
        </div>
      </div>
    </div>
  );
}