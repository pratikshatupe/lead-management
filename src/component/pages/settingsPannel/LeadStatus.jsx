import { useState } from "react";

// Icons
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

// Toast
const Toast = ({ show, message, type }) => (
  <div style={{
    position: 'fixed', top: 24, right: 24, zIndex: 9999,
    background: '#fff', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
    padding: '14px 22px', display: 'flex', alignItems: 'center', gap: 12,
    border: `1.5px solid ${type === 'success' ? '#d1fae5' : '#fee2e2'}`,
    transform: show ? 'translateY(0)' : 'translateY(-80px)',
    opacity: show ? 1 : 0,
    transition: 'all 0.35s cubic-bezier(.4,2,.6,1)'
  }}>
    <div style={{
      width: 32, height: 32, borderRadius: '50%',
      background: type === 'success' ? '#10b981' : '#ef4444',
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
    }}>
      {type === 'success' ? <CheckIcon /> : <XIcon />}
    </div>
    <div>
      <div style={{ fontSize: 14, fontWeight: 700, color: type === 'success' ? '#065f46' : '#991b1b' }}>{message}</div>
    </div>
  </div>
);

// Modal
const Modal = ({ title, onClose, children, footer }) => (
  <div style={{
    position: 'fixed', inset: 0, zIndex: 1000,
    background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  }} onClick={onClose}>
    <div style={{
      background: '#fff', borderRadius: 14, boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
      width: 500, maxWidth: '90vw',
      animation: 'popIn 0.25s cubic-bezier(.4,0,.2,1)'
    }} onClick={e => e.stopPropagation()}>
      <div style={{ padding: '20px 28px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#1f2937' }}>{title}</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 4, borderRadius: 6, display: 'flex' }}
          onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        ><XIcon /></button>
      </div>
      <div style={{ padding: '24px 28px' }}>{children}</div>
      {footer && <div style={{ padding: '16px 28px', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>{footer}</div>}
    </div>
    <style>{`@keyframes popIn { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
  </div>
);

const btn = (bg, color, hover) => ({
  padding: '10px 22px', borderRadius: 8, border: 'none',
  background: bg, color: color, fontSize: 13, fontWeight: 600,
  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7,
  transition: 'background 0.15s'
});

export default function LeadStatus() {
  const [statuses, setStatuses] = useState([
    { id: 1, name: 'Unreachable' },
    { id: 2, name: 'Not Interested' },
    { id: 3, name: 'Interested' },
  ]);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [newName, setNewName] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 3000);
  };

  const filtered = statuses.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const handleAdd = () => {
    if (!newName.trim()) return;
    setStatuses(prev => [...prev, { id: Date.now(), name: newName.trim() }]);
    setNewName('');
    setShowAdd(false);
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

  const toggleSelect = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleAll = () => setSelected(selected.length === paginated.length ? [] : paginated.map(s => s.id));

  return (
    <div>
      <Toast show={toast.show} message={toast.message} type={toast.type} />

      {/* Add Modal */}
      {showAdd && (
        <Modal title="Add New Lead Status" onClose={() => setShowAdd(false)}
          footer={<>
            <button style={btn('#f3f4f6', '#374151')} onClick={() => setShowAdd(false)}
              onMouseEnter={e => e.currentTarget.style.background = '#e5e7eb'}
              onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}
            >Cancel</button>
            <button style={btn('#3b82f6', '#fff')} onClick={handleAdd}
              onMouseEnter={e => e.currentTarget.style.background = '#2563eb'}
              onMouseLeave={e => e.currentTarget.style.background = '#3b82f6'}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>
              Create
            </button>
          </>}
        >
          <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
            <span style={{ color: '#ef4444' }}>* </span>Name
          </label>
          <input
            value={newName} onChange={e => setNewName(e.target.value)}
            placeholder="Please Enter Name"
            style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: 8, padding: '10px 14px', fontSize: 13, outline: 'none', marginTop: 8, boxSizing: 'border-box' }}
            onFocus={e => e.target.style.borderColor = '#3b82f6'}
            onBlur={e => e.target.style.borderColor = '#e5e7eb'}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            autoFocus
          />
        </Modal>
      )}

      {/* Edit Modal */}
      {showEdit && (
        <Modal title="Edit Lead Status" onClose={() => setShowEdit(false)}
          footer={<>
            <button style={btn('#f3f4f6', '#374151')} onClick={() => setShowEdit(false)}
              onMouseEnter={e => e.currentTarget.style.background = '#e5e7eb'}
              onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}
            >Cancel</button>
            <button style={btn('#3b82f6', '#fff')} onClick={handleEdit}
              onMouseEnter={e => e.currentTarget.style.background = '#2563eb'}
              onMouseLeave={e => e.currentTarget.style.background = '#3b82f6'}
            >
              <EditIcon /> Update
            </button>
          </>}
        >
          <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
            <span style={{ color: '#ef4444' }}>* </span>Name
          </label>
          <input
            value={editItem?.name || ''} onChange={e => setEditItem(prev => ({ ...prev, name: e.target.value }))}
            style={{ width: '100%', border: '1.5px solid #3b82f6', borderRadius: 8, padding: '10px 14px', fontSize: 13, outline: 'none', marginTop: 8, boxSizing: 'border-box' }}
            autoFocus
          />
        </Modal>
      )}

      {/* Delete Confirm Modal */}
      {showDelete && (
        <Modal title="Confirm Delete" onClose={() => setShowDelete(false)}
          footer={<>
            <button style={btn('#f3f4f6', '#374151')} onClick={() => setShowDelete(false)}
              onMouseEnter={e => e.currentTarget.style.background = '#e5e7eb'}
              onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}
            >Cancel</button>
            <button style={btn('#ef4444', '#fff')} onClick={handleDelete}
              onMouseEnter={e => e.currentTarget.style.background = '#dc2626'}
              onMouseLeave={e => e.currentTarget.style.background = '#ef4444'}
            >
              <DeleteIcon /> Delete
            </button>
          </>}
        >
          <p style={{ margin: 0, color: '#374151', fontSize: 14 }}>
            Are you sure you want to delete <strong>"{deleteItem?.name}"</strong>? This action cannot be undone.
          </p>
        </Modal>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#1f2937' }}>Lead Status</h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#9ca3af' }}>
            Dashboard - <span style={{ color: '#6b7280', fontWeight: 500 }}>Lead Status</span>
          </p>
        </div>
      </div>

      {/* Table Card */}
      <div style={{ marginTop: 20, background: '#fff', borderRadius: 14, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', border: '1.5px solid #f1f5f9', overflow: 'hidden' }}>
        {/* Toolbar */}
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6' }}>
          <button onClick={() => { setNewName(''); setShowAdd(true); }} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#3b82f6', color: '#fff', border: 'none',
            padding: '10px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600,
            cursor: 'pointer', boxShadow: '0 2px 8px rgba(59,130,246,0.25)'
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#2563eb'}
            onMouseLeave={e => e.currentTarget.style.background = '#3b82f6'}
          >
            <PlusIcon /> Add New Lead Status
          </button>

          <div style={{ position: 'relative' }}>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              style={{ border: '1.5px solid #e5e7eb', borderRadius: 8, padding: '9px 14px 9px 36px', fontSize: 13, outline: 'none', width: 200 }}
              onFocus={e => e.target.style.borderColor = '#3b82f6'}
              onBlur={e => e.target.style.borderColor = '#e5e7eb'}
            />
            <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}><SearchIcon /></span>
          </div>
        </div>

        {/* Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              <th style={{ padding: '12px 16px', width: 40 }}>
                <input type="checkbox" checked={selected.length === paginated.length && paginated.length > 0}
                  onChange={toggleAll} style={{ cursor: 'pointer', width: 16, height: 16 }} />
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#6b7280' }}>Name</th>
              <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: 13, fontWeight: 600, color: '#6b7280' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr><td colSpan={3} style={{ padding: 40, textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>No lead statuses found</td></tr>
            ) : paginated.map((s, i) => (
              <tr key={s.id} style={{ borderTop: '1px solid #f3f4f6', background: selected.includes(s.id) ? '#eff6ff' : (i % 2 === 0 ? '#fff' : '#fafafa') }}>
                <td style={{ padding: '14px 16px' }}>
                  <input type="checkbox" checked={selected.includes(s.id)} onChange={() => toggleSelect(s.id)} style={{ cursor: 'pointer', width: 16, height: 16 }} />
                </td>
                <td style={{ padding: '14px 16px', fontSize: 14, color: '#374151' }}>{s.name}</td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <button onClick={() => { setEditItem({ ...s }); setShowEdit(true); }}
                      style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 7, padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 500, transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#2563eb'}
                      onMouseLeave={e => e.currentTarget.style.background = '#3b82f6'}
                    ><EditIcon /></button>
                    <button onClick={() => { setDeleteItem(s); setShowDelete(true); }}
                      style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 7, padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 500, transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#ef4444'}
                      onMouseLeave={e => e.currentTarget.style.background = '#3b82f6'}
                    ><DeleteIcon /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: 6, padding: '5px 10px', cursor: page === 1 ? 'not-allowed' : 'pointer', color: page === 1 ? '#d1d5db' : '#374151', fontSize: 13 }}>‹</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)}
              style={{ background: p === page ? '#3b82f6' : 'none', color: p === page ? '#fff' : '#374151', border: `1px solid ${p === page ? '#3b82f6' : '#e5e7eb'}`, borderRadius: 6, padding: '5px 11px', cursor: 'pointer', fontSize: 13, fontWeight: p === page ? 600 : 400 }}>{p}</button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages || totalPages === 0}
            style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: 6, padding: '5px 10px', cursor: (page === totalPages || totalPages === 0) ? 'not-allowed' : 'pointer', color: (page === totalPages || totalPages === 0) ? '#d1d5db' : '#374151', fontSize: 13 }}>›</button>
          <span style={{ fontSize: 13, color: '#9ca3af', marginLeft: 4 }}>10 / page</span>
        </div>
      </div>
    </div>
  );
}