import Currencies from "./settingsPannel/Currencies";
import Modules from "./settingsPannel/Modules";
import StorageSettings from "./settingsPannel/StorageSettings";
import EmailSettings from "./settingsPannel/EmailSettings";
import DatabaseBackup from "./settingsPannel/DatabaseBackup";
import UpdateApp from "./settingsPannel/UpdateApp";
import { useState, useRef } from "react";

const GlobalStyles = () => (
  <style>{`
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; background: #f1f5f9; }

    .admin-layout { display: flex; min-height: 100vh; }

    /* Sidebar */
    .sidebar {
      width: 240px; background: #fff; border-right: 1px solid #e5e7eb;
      display: flex; flex-direction: column; flex-shrink: 0;
      transition: transform 0.3s ease; z-index: 300;
    }
    .sidebar-overlay {
      display: none; position: fixed; inset: 0;
      background: rgba(0,0,0,0.4); z-index: 299; backdrop-filter: blur(2px);
    }

    /* Content */
    .main-content { flex: 1; padding: 24px; overflow-y: auto; min-width: 0; }

    /* Mobile topbar */
    .mobile-topbar {
      display: none; align-items: center; justify-content: space-between;
      padding: 12px 16px; background: #fff; border-bottom: 1px solid #e5e7eb;
      position: sticky; top: 0; z-index: 200;
    }

    /* Responsive grid */
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 20px; }
    .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

    /* Table scroll */
    .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }

    /* Permission row */
    .perm-row { display: flex; align-items: flex-start; padding: 10px 0; border-bottom: 1px solid #f3f4f6; gap: 8px; }
    .perm-label { width: 150px; font-size: 13px; color: #6b7280; font-weight: 500; flex-shrink: 0; padding-top: 2px; }
    .perm-checks { display: flex; flex-wrap: wrap; gap: 8px 16px; flex: 1; }

    /* Drawer */
    .drawer { width: 520px; max-width: 100vw; }

    /* Toolbar flex */
    .toolbar { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; padding: 14px 16px; border-bottom: 1px solid #f3f4f6; }

    /* Btn */
    .btn-primary { display:flex; align-items:center; gap:6px; background:#3b82f6; color:#fff; border:none; padding:9px 16px; border-radius:8px; font-size:13px; font-weight:600; cursor:pointer; white-space:nowrap; transition:background .15s; }
    .btn-primary:hover { background: #2563eb; }
    .btn-secondary { display:flex; align-items:center; gap:6px; background:#f3f4f6; color:#374151; border:none; padding:9px 16px; border-radius:8px; font-size:13px; font-weight:600; cursor:pointer; white-space:nowrap; transition:background .15s; }
    .btn-secondary:hover { background: #e5e7eb; }
    .btn-danger { display:flex; align-items:center; gap:6px; background:#ef4444; color:#fff; border:none; padding:9px 16px; border-radius:8px; font-size:13px; font-weight:600; cursor:pointer; white-space:nowrap; transition:background .15s; }
    .btn-danger:hover { background: #dc2626; }

    /* Table */
    .data-table { width:100%; border-collapse:collapse; min-width: 480px; }
    .data-table th { padding:11px 14px; text-align:left; font-size:12px; font-weight:600; color:#6b7280; background:#f9fafb; white-space:nowrap; }
    .data-table td { padding:13px 14px; font-size:13px; color:#374151; border-top:1px solid #f3f4f6; }

    /* Card */
    .card { background:#fff; border-radius:14px; border:1px solid #f1f5f9; box-shadow:0 1px 6px rgba(0,0,0,.05); overflow:hidden; }

    /* Input */
    .field-input { width:100%; border:1.5px solid #e5e7eb; border-radius:8px; padding:10px 14px; font-size:13px; outline:none; background:#fff; transition:border-color .2s; font-family:inherit; }
    .field-input:focus { border-color:#3b82f6; }

    /* Pagination */
    .pagination { display:flex; align-items:center; justify-content:flex-end; gap:6px; padding:12px 16px; border-top:1px solid #f3f4f6; flex-wrap:wrap; }

    @keyframes popIn { from{transform:scale(.93);opacity:0} to{transform:scale(1);opacity:1} }
    @keyframes slideInRight { from{transform:translateX(100%)} to{transform:translateX(0)} }
    @keyframes slideDown { from{transform:translateY(-16px);opacity:0} to{transform:translateY(0);opacity:1} }

    /* ── TABLET ── */
    @media (max-width: 900px) {
      .grid-4 { grid-template-columns: repeat(2, 1fr); }
      .drawer { width: 100vw; }
    }

    /* ── MOBILE ── */
    @media (max-width: 640px) {
      .sidebar {
        position: fixed; top: 0; left: 0; height: 100%; transform: translateX(-100%);
      }
      .sidebar.open { transform: translateX(0); }
      .sidebar-overlay.open { display: block; }
      .mobile-topbar { display: flex; }
      .main-content { padding: 16px; }
      .grid-2 { grid-template-columns: 1fr; }
      .grid-4 { grid-template-columns: 1fr 1fr; }
      .perm-label { width: 110px; font-size: 12px; }
      .perm-checks { gap: 6px 10px; }
      .toolbar { gap: 6px; }
      .toolbar .search-wrap { width: 100%; }
      .toolbar .search-wrap input { width: 100% !important; }
      .page-header { flex-direction: column; align-items: flex-start; gap: 12px; }
      .page-header-btns { width: 100%; display: flex; flex-wrap: wrap; gap: 8px; }
      .page-header-btns button { flex: 1; min-width: 120px; justify-content: center; }
    }

    @media (max-width: 400px) {
      .grid-4 { grid-template-columns: 1fr; }
      .btn-primary, .btn-secondary, .btn-danger { font-size: 12px; padding: 8px 12px; }
    }
  `}</style>
);

const PlusIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>;
const EditIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>;
const TrashIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>;
const SearchIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>;
const XIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>;
const CheckIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>;
const MenuIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>;
const SaveIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>;
const CameraIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z"/><path d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>;
const TagIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>;
const DownloadIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>;
const RefreshIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>;
const EyeIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>;
const ArrowLeftIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>;
const ChevronDownIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>;
const ImportIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" transform="rotate(180,12,12)"/></svg>;
const SortIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"/></svg>;

const Toast = ({ show, message, type = 'success' }) => (
  <div style={{
    position: 'fixed', bottom: 20, right: 20, zIndex: 9999,
    background: '#fff', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,.15)',
    padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10,
    border: `1.5px solid ${type === 'success' ? '#d1fae5' : '#fee2e2'}`,
    transform: show ? 'translateX(0)' : 'translateX(120%)',
    opacity: show ? 1 : 0, transition: 'all .35s cubic-bezier(.4,2,.6,1)',
    maxWidth: 'calc(100vw - 40px)'
  }}>
    <div style={{ color: type === 'success' ? '#10b981' : '#ef4444', flexShrink: 0 }}>
      {type === 'success' ? <CheckIcon /> : <XIcon />}
    </div>
    <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{message}</span>
  </div>
);

const Modal = ({ title, onClose, children, footer, width = 480 }) => (
  <div style={{
    position: 'fixed', inset: 0, zIndex: 1000,
    background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
  }} onClick={onClose}>
    <div style={{
      background: '#fff', borderRadius: 14, boxShadow: '0 20px 60px rgba(0,0,0,.2)',
      width: '100%', maxWidth: width, animation: 'popIn .25s ease'
    }} onClick={e => e.stopPropagation()}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1f2937' }}>{title}</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', padding: 4 }}><XIcon /></button>
      </div>
      <div style={{ padding: '18px 20px' }}>{children}</div>
      {footer && <div style={{ padding: '14px 20px', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'flex-end', gap: 8, flexWrap: 'wrap' }}>{footer}</div>}
    </div>
  </div>
);

const Toggle = ({ checked, onChange }) => (
  <div onClick={() => onChange(!checked)} style={{
    width: 40, height: 22, borderRadius: 11,
    background: checked ? '#3b82f6' : '#d1d5db',
    cursor: 'pointer', position: 'relative', transition: 'background .2s', flexShrink: 0
  }}>
    <div style={{
      position: 'absolute', top: 2, left: checked ? 20 : 2,
      width: 18, height: 18, borderRadius: '50%', background: '#fff',
      boxShadow: '0 1px 3px rgba(0,0,0,.2)', transition: 'left .2s'
    }} />
  </div>
);

const Field = ({ label, required, style, ...props }) => (
  <div style={style}>
    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>
      {required && <span style={{ color: '#ef4444' }}>* </span>}{label}
    </label>
    <input {...props} className="field-input" />
  </div>
);

const SelectField = ({ label, required, children, style, ...props }) => (
  <div style={style}>
    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>
      {required && <span style={{ color: '#ef4444' }}>* </span>}{label}
    </label>
    <select {...props} className="field-input" style={{ appearance: 'none', cursor: 'pointer' }}>
      {children}
    </select>
  </div>
);

const LogoUpload = ({ label, id }) => {
  const [img, setImg] = useState(null);
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>{label}</label>
      <label htmlFor={id} style={{ cursor: 'pointer', display: 'block' }}>
        <input type="file" id={id} accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files[0]; if (f) setImg(URL.createObjectURL(f)); }} />
        {img
          ? <img src={img} alt={label} style={{ width: '100%', height: 90, borderRadius: 8, objectFit: 'contain', border: '1.5px solid #e5e7eb' }} />
          : <div style={{ width: '100%', height: 90, border: '2px dashed #d1d5db', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', background: '#fafafa' }}>
              <CameraIcon /><span style={{ fontSize: 11, marginTop: 4, fontWeight: 600 }}>Upload</span>
            </div>
        }
      </label>
    </div>
  );
};

const Pagination = ({ page, total, onPage }) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <div className="pagination">
      <button onClick={() => onPage(Math.max(1, page - 1))} disabled={page === 1}
        style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: 6, padding: '4px 9px', cursor: page === 1 ? 'not-allowed' : 'pointer', color: page === 1 ? '#d1d5db' : '#374151', fontSize: 13 }}>‹</button>
      {pages.map(p => (
        <button key={p} onClick={() => onPage(p)}
          style={{ background: p === page ? '#3b82f6' : 'none', color: p === page ? '#fff' : '#374151', border: `1px solid ${p === page ? '#3b82f6' : '#e5e7eb'}`, borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 13, fontWeight: p === page ? 600 : 400 }}>{p}</button>
      ))}
      <button onClick={() => onPage(Math.min(total, page + 1))} disabled={page === total || total === 0}
        style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: 6, padding: '4px 9px', cursor: (page === total || total === 0) ? 'not-allowed' : 'pointer', color: (page === total || total === 0) ? '#d1d5db' : '#374151', fontSize: 13 }}>›</button>
      <span style={{ fontSize: 12, color: '#9ca3af' }}>10 / page</span>
    </div>
  );
};

function CompanySettings() {
  const [primaryColor, setPrimaryColor] = useState('#007BFF');
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '' });
  const [placement, setPlacement] = useState('Top & Bottom');
  const [checks, setChecks] = useState({ staff: false, lang: true, role: true });

  const showToast = (msg) => { setToast({ show: true, msg }); setTimeout(() => setToast(t => ({ ...t, show: false })), 3000); };
  const toggleCheck = (k) => setChecks(p => ({ ...p, [k]: !p[k] }));

  return (
    <div>
      <Toast show={toast.show} message={toast.msg} />
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)', display: 'flex', justifyContent: 'flex-end' }} onClick={() => setShowModal(false)}>
          <div style={{ width: '100%', maxWidth: 400, background: '#fff', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '-8px 0 40px rgba(0,0,0,.15)', animation: 'slideInRight .3s ease' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '18px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Add Menu Settings</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}><XIcon /></button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}><span style={{ color: '#ef4444' }}>* </span>Add Menu Placement</label>
                <select value={placement} onChange={e => setPlacement(e.target.value)} className="field-input" style={{ appearance: 'none' }}>
                  <option>Top & Bottom</option><option>Left Sidebar</option><option>Right Sidebar</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 12, display: 'block' }}>Add Menu Settings</label>
                {[['staff', 'Add Staff Member'], ['lang', 'Add Language'], ['role', 'Add Role']].map(([k, lbl]) => (
                  <label key={k} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, cursor: 'pointer' }}>
                    <div onClick={() => toggleCheck(k)} style={{ width: 18, height: 18, borderRadius: 4, border: checks[k] ? '2px solid #3b82f6' : '2px solid #d1d5db', background: checks[k] ? '#3b82f6' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                      {checks[k] && <svg width="10" height="10" viewBox="0 0 10 10" fill="white"><path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>}
                    </div>
                    <span style={{ fontSize: 13, color: '#374151' }}>{lbl}</span>
                  </label>
                ))}
              </div>
            </div>
            <div style={{ padding: '14px 20px', borderTop: '1px solid #f3f4f6', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => { setShowModal(false); showToast('Menu settings updated!'); }}><SaveIcon /> Update</button>
            </div>
          </div>
        </div>
      )}

      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1f2937' }}>Company Settings</h2>
          <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>Dashboard - Settings - <span style={{ color: '#6b7280' }}>Company Settings</span></p>
        </div>
        <div className="page-header-btns" style={{ display: 'flex', gap: 8 }}>
          <button className="btn-primary" onClick={() => showToast('Settings updated!')}><TagIcon /> Update</button>
          <button className="btn-secondary" onClick={() => setShowModal(true)}><PlusIcon /> Add Menu Settings</button>
        </div>
      </div>

      <div className="card" style={{ padding: 20 }}>
        <div className="grid-2">
          <Field label="Company Name" required defaultValue="Lead Pro" />
          <Field label="Company Short Name" required defaultValue="LeadPro" />
          <Field label="Company Email" required defaultValue="company@example.com" />
          <Field label="Company Phone" defaultValue="+16785861991" />
        </div>
        <div style={{ marginTop: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5, display: 'block' }}>Company Address</label>
          <textarea className="field-input" rows={3} defaultValue="7 street, city, state, 762782" style={{ resize: 'none', fontFamily: 'inherit' }} />
        </div>
        <div className="grid-2" style={{ marginTop: 16 }}>
          <SelectField label="Left Sidebar Theme"><option>Dark</option><option>Light</option></SelectField>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5, display: 'block' }}>Primary Color</label>
            <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} style={{ width: '100%', height: 42, border: '1.5px solid #e5e7eb', borderRadius: 8, padding: '3px 6px', cursor: 'pointer' }} />
          </div>
        </div>
        <div className="grid-4" style={{ marginTop: 16 }}>
          <LogoUpload label="Dark Logo" id="dLogo" />
          <LogoUpload label="Light Logo" id="lLogo" />
          <LogoUpload label="Small Dark" id="sdLogo" />
          <LogoUpload label="Small Light" id="slLogo" />
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid #f3f4f6', margin: '20px 0' }} />
        <div className="grid-2">
          <SelectField label="Currency" required><option>Dollar ($)</option><option>Indian Rupee (₹)</option></SelectField>
          <SelectField label="Language" required><option>English</option><option>Hindi</option></SelectField>
          <SelectField label="Layout" required><option>LTR</option><option>RTL</option></SelectField>
          <SelectField label="Menu Placement" required><option>Top & Bottom</option><option>Left Sidebar</option></SelectField>
        </div>
        <div className="grid-2" style={{ marginTop: 16, alignItems: 'end' }}>
          {[['Auto Detect Timezone', false], ['App Debug', false], ['Update Notification', false]].map(([lbl]) => {
            const [on, setOn] = useState(false);
            return (
              <div key={lbl} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{lbl}</span>
                <Toggle checked={on} onChange={setOn} />
              </div>
            );
          })}
          <SelectField label="Default Timezone" required><option>Asia/Kolkata</option><option>America/New_York</option></SelectField>
        </div>
        <div className="grid-2" style={{ marginTop: 16 }}>
          <SelectField label="Date Format" required><option>{`(d-m-Y) => ${new Date().toLocaleDateString('en-GB')}`}</option></SelectField>
          <SelectField label="Time Format" required><option>{`(12h) => ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`}</option></SelectField>
        </div>
        <div style={{ marginTop: 16, maxWidth: 180 }}>
          <LogoUpload label="Login Image" id="loginImg" />
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid #f3f4f6', margin: '20px 0' }} />
        <button className="btn-primary" onClick={() => showToast('Settings saved!')}><SaveIcon /> Save</button>
      </div>
    </div>
  );
}

function ProfilePanel() {
  const [form, setForm] = useState({ name: 'Admin', email: 'admin@example.com', password: '', phone: '+91 98765 43210', address: '7 street, city, state' });
  const [img, setImg] = useState(null);
  const [toast, setToast] = useState({ show: false });
  const ch = e => setForm({ ...form, [e.target.name]: e.target.value });
  const save = () => { setToast({ show: true }); setTimeout(() => setToast({ show: false }), 3000); };

  return (
    <div>
      <Toast show={toast.show} message="Profile updated successfully!" />
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1f2937' }}>Profile</h2>
          <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>Dashboard - Settings - <span style={{ color: '#6b7280' }}>Profile</span></p>
        </div>
        <button className="btn-primary" onClick={save}><SaveIcon /> Update</button>
      </div>
      <div className="card" style={{ padding: 20 }}>
        <div className="grid-2">
          <Field label="Name" required name="name" value={form.name} onChange={ch} />
          <Field label="Email" required name="email" value={form.email} onChange={ch} type="email" />
        </div>
        <div style={{ marginTop: 14 }}><Field label="Password" name="password" value={form.password} onChange={ch} type="password" placeholder="Enter new password" /></div>
        <div style={{ marginTop: 14 }}><Field label="Phone" name="phone" value={form.phone} onChange={ch} /></div>
        <div style={{ marginTop: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}>Profile Image</label>
          <label htmlFor="profImg" style={{ cursor: 'pointer', display: 'inline-block' }}>
            <input type="file" id="profImg" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files[0]; if (f) setImg(URL.createObjectURL(f)); }} />
            {img ? <img src={img} alt="profile" style={{ width: 80, height: 80, borderRadius: 10, objectFit: 'cover', border: '2px solid #e5e7eb' }} />
              : <div style={{ width: 80, height: 80, border: '2px dashed #d1d5db', borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}><CameraIcon /><span style={{ fontSize: 10, marginTop: 3, fontWeight: 600 }}>Upload</span></div>}
          </label>
        </div>
        <div style={{ marginTop: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5, display: 'block' }}>Address</label>
          <textarea name="address" value={form.address} onChange={ch} rows={3} className="field-input" style={{ resize: 'none', fontFamily: 'inherit' }} />
        </div>
        <div style={{ marginTop: 18 }}><button className="btn-primary" onClick={save}><SaveIcon /> Update</button></div>
      </div>
    </div>
  );
}

function LeadStatus() {
  const [statuses, setStatuses] = useState([{ id: 1, name: 'Unreachable' }, { id: 2, name: 'Not Interested' }, { id: 3, name: 'Interested' }]);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [val, setVal] = useState('');
  const [editVal, setEditVal] = useState('');
  const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });
  const [page, setPage] = useState(1);
  const [sel, setSel] = useState([]);

  const showToast = (msg, type = 'success') => { setToast({ show: true, msg, type }); setTimeout(() => setToast(t => ({ ...t, show: false })), 3000); };
  const filtered = statuses.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  const paged = filtered.slice((page - 1) * 10, page * 10);
  const totalPages = Math.ceil(filtered.length / 10);

  return (
    <div>
      <Toast show={toast.show} message={toast.msg} type={toast.type} />
      {modal?.type === 'add' && (
        <Modal title="Add New Lead Status" onClose={() => setModal(null)}
          footer={<><button className="btn-secondary" onClick={() => setModal(null)}>Cancel</button><button className="btn-primary" onClick={() => { if (!val.trim()) return; setStatuses(p => [...p, { id: Date.now(), name: val.trim() }]); setModal(null); setVal(''); showToast('Added!'); }}><SaveIcon /> Create</button></>}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}><span style={{ color: '#ef4444' }}>* </span>Name</label>
          <input value={val} onChange={e => setVal(e.target.value)} placeholder="Please Enter Name" className="field-input" style={{ marginTop: 8 }} onKeyDown={e => e.key === 'Enter' && val.trim() && (setStatuses(p => [...p, { id: Date.now(), name: val.trim() }]), setModal(null), setVal(''), showToast('Added!'))} autoFocus />
        </Modal>
      )}
      {modal?.type === 'edit' && (
        <Modal title="Edit Lead Status" onClose={() => setModal(null)}
          footer={<><button className="btn-secondary" onClick={() => setModal(null)}>Cancel</button><button className="btn-primary" onClick={() => { setStatuses(p => p.map(s => s.id === modal.item.id ? { ...s, name: editVal } : s)); setModal(null); showToast('Updated!'); }}><EditIcon /> Update</button></>}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}><span style={{ color: '#ef4444' }}>* </span>Name</label>
          <input value={editVal} onChange={e => setEditVal(e.target.value)} className="field-input" style={{ marginTop: 8, borderColor: '#3b82f6' }} autoFocus />
        </Modal>
      )}
      {modal?.type === 'del' && (
        <Modal title="Confirm Delete" onClose={() => setModal(null)}
          footer={<><button className="btn-secondary" onClick={() => setModal(null)}>Cancel</button><button className="btn-danger" onClick={() => { setStatuses(p => p.filter(s => s.id !== modal.item.id)); setModal(null); showToast('Deleted!', 'error'); }}><TrashIcon /> Delete</button></>}>
          <p style={{ color: '#374151', fontSize: 14 }}>Delete <strong>"{modal.item.name}"</strong>? This cannot be undone.</p>
        </Modal>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div><h2 style={{ fontSize: 20, fontWeight: 700, color: '#1f2937' }}>Lead Status</h2><p style={{ fontSize: 12, color: '#9ca3af' }}>Dashboard - <span style={{ color: '#6b7280' }}>Lead Status</span></p></div>
      </div>
      <div className="card">
        <div className="toolbar">
          <button className="btn-primary" onClick={() => { setVal(''); setModal({ type: 'add' }); }}><PlusIcon /> Add New Lead Status</button>
          <div className="search-wrap" style={{ position: 'relative', marginLeft: 'auto' }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="field-input" style={{ paddingLeft: 34, width: 180 }} />
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}><SearchIcon /></span>
          </div>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr>
              <th style={{ width: 40 }}><input type="checkbox" checked={sel.length === paged.length && paged.length > 0} onChange={() => setSel(sel.length === paged.length ? [] : paged.map(s => s.id))} /></th>
              <th>Name</th><th style={{ textAlign: 'right' }}>Action</th>
            </tr></thead>
            <tbody>{paged.length === 0
              ? <tr><td colSpan={3} style={{ textAlign: 'center', color: '#9ca3af', padding: 32 }}>No statuses found</td></tr>
              : paged.map(s => (
                <tr key={s.id} style={{ background: sel.includes(s.id) ? '#eff6ff' : 'inherit' }}>
                  <td><input type="checkbox" checked={sel.includes(s.id)} onChange={() => setSel(p => p.includes(s.id) ? p.filter(x => x !== s.id) : [...p, s.id])} /></td>
                  <td>{s.name}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      <button className="btn-primary" style={{ padding: '6px 10px' }} onClick={() => { setEditVal(s.name); setModal({ type: 'edit', item: s }); }}><EditIcon /></button>
                      <button style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 7, padding: '6px 10px', cursor: 'pointer', display: 'flex' }} onMouseEnter={e => e.currentTarget.style.background = '#ef4444'} onMouseLeave={e => e.currentTarget.style.background = '#3b82f6'} onClick={() => setModal({ type: 'del', item: s })}><TrashIcon /></button>
                    </div>
                  </td>
                </tr>
              ))}</tbody>
          </table>
        </div>
        <Pagination page={page} total={totalPages || 1} onPage={setPage} />
      </div>
    </div>
  );
}

const GROUPS = ['common', 'menu', 'dashboard', 'user', 'salesman', 'role', 'notes', 'campaign'];
const BASE_ROWS = [
  { group: 'common', key: 'enabled', en: 'Enabled' }, { group: 'common', key: 'disabled', en: 'Disabled' },
  { group: 'common', key: 'id', en: 'Id' }, { group: 'common', key: 'action', en: 'Action' },
  { group: 'menu', key: 'dashboard', en: 'Dashboard' }, { group: 'menu', key: 'settings', en: 'Settings' },
  { group: 'dashboard', key: 'total_leads', en: 'Total Leads' }, { group: 'user', key: 'name', en: 'Name' },
];

function Translations() {
  const [langs, setLangs] = useState([{ id: 1, name: 'English', key: 'en', enabled: true, flag: 'https://flagcdn.com/w40/gb.png', isDefault: true }, { id: 2, name: 'Hindi', key: 'hi', enabled: true, flag: null, isDefault: false }]);
  const [view, setView] = useState('main');
  const [selGroup, setSelGroup] = useState('common');
  const [groupOpen, setGroupOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [newLang, setNewLang] = useState({ name: '', key: '', flag: null });
  const [showImport, setShowImport] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [toast, setToast] = useState({ show: false, msg: '' });
  const [translations, setTranslations] = useState(() => { const t = {}; BASE_ROWS.forEach(r => { t[r.key] = { hi: r.en }; }); return t; });

  const showToast = msg => { setToast({ show: true, msg }); setTimeout(() => setToast(t => ({ ...t, show: false })), 3000); };
  const langKeys = langs.filter(l => !l.isDefault).map(l => l.key);
  const filteredRows = BASE_ROWS.filter(r => r.group === selGroup);

  const AddLangModal = ({ editItem }) => {
    const item = editItem || newLang;
    const setItem = editItem ? v => setModal({ type: 'edit', item: { ...editItem, ...v } }) : v => setNewLang(p => ({ ...p, ...v }));
    return (
      <Modal title={editItem ? 'Edit Language' : 'Add New Language'} onClose={() => setModal(null)}
        footer={<>
          <button className="btn-secondary" onClick={() => setModal(null)}>Cancel</button>
          <button className="btn-primary" onClick={() => {
            if (!item.name.trim() || !item.key.trim()) return;
            if (editItem) { setLangs(p => p.map(l => l.id === editItem.id ? { ...l, ...editItem } : l)); showToast('Language updated!'); }
            else { setLangs(p => [...p, { id: Date.now(), ...newLang, enabled: true, isDefault: false }]); setNewLang({ name: '', key: '', flag: null }); showToast('Language added!'); }
            setModal(null);
          }}><SaveIcon /> {editItem ? 'Update' : 'Create'}</button>
        </>}>
        <Field label="Name" required value={item.name} onChange={e => setItem({ name: e.target.value })} placeholder="Language name" style={{ marginBottom: 12 }} autoFocus />
        <Field label="Key" required value={item.key} onChange={e => setItem({ key: e.target.value })} placeholder="e.g. en, hi" style={{ marginBottom: 12 }} />
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}>Flag</label>
          <label style={{ cursor: 'pointer', display: 'inline-block' }}>
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files[0]; if (f) setItem({ flag: URL.createObjectURL(f) }); }} />
            {item.flag ? <img src={item.flag} alt="flag" style={{ width: 64, height: 44, objectFit: 'cover', borderRadius: 6, border: '2px dashed #d1d5db' }} />
              : <div style={{ width: 64, height: 44, border: '2px dashed #d1d5db', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}><CameraIcon /></div>}
          </label>
        </div>
      </Modal>
    );
  };

  if (view === 'languages') return (
    <>
      <Toast show={toast.show} message={toast.msg} />
      {modal?.type === 'add' && <AddLangModal />}
      {modal?.type === 'edit' && <AddLangModal editItem={modal.item} />}
      {modal?.type === 'del' && (
        <Modal title="Confirm Delete" onClose={() => setModal(null)}
          footer={<><button className="btn-secondary" onClick={() => setModal(null)}>Cancel</button><button className="btn-danger" onClick={() => { setLangs(p => p.filter(l => l.id !== modal.item.id)); setModal(null); showToast('Deleted!'); }}><TrashIcon /> Delete</button></>}>
          <p style={{ fontSize: 14, color: '#374151' }}>Delete <strong>"{modal.item.name}"</strong>?</p>
        </Modal>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => setView('main')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 4 }}><ArrowLeftIcon /></button>
          <div><h2 style={{ fontSize: 20, fontWeight: 700, color: '#1f2937' }}>Languages</h2><p style={{ fontSize: 12, color: '#9ca3af' }}>Dashboard - Settings - Translations - Languages</p></div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="btn-secondary"><ImportIcon /> Import Translations</button>
          <button className="btn-primary" onClick={() => setModal({ type: 'add' })}><PlusIcon /> Add New Language</button>
        </div>
      </div>
      <div className="card">
        <div className="toolbar">
          <button className="btn-primary" onClick={() => setModal({ type: 'add' })}><PlusIcon /> Add New Language</button>
          <button className="btn-secondary"><ImportIcon /> Import</button>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Name</th><th>Key</th><th>Enabled</th><th style={{ textAlign: 'right' }}>Action</th></tr></thead>
            <tbody>{langs.map(l => (
              <tr key={l.id}>
                <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {l.flag ? <img src={l.flag} alt="" style={{ width: 24, height: 17, objectFit: 'cover', borderRadius: 2, border: '1px solid #e5e7eb' }} /> : <div style={{ width: 24, height: 17, background: '#e5e7eb', borderRadius: 2 }} />}
                  <span style={{ fontWeight: 500 }}>{l.name}</span>
                </div></td>
                <td style={{ color: '#6b7280' }}>{l.key}</td>
                <td><Toggle checked={l.enabled} onChange={v => setLangs(p => p.map(x => x.id === l.id ? { ...x, enabled: v } : x))} /></td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                    {!l.isDefault && (<>
                      <button className="btn-primary" style={{ padding: '6px 10px' }} onClick={() => setModal({ type: 'edit', item: { ...l } })}><EditIcon /></button>
                      <button style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 7, padding: '6px 10px', cursor: 'pointer', display: 'flex' }} onMouseEnter={e => e.currentTarget.style.background = '#ef4444'} onMouseLeave={e => e.currentTarget.style.background = '#3b82f6'} onClick={() => setModal({ type: 'del', item: l })}><TrashIcon /></button>
                    </>)}
                    <button className="btn-primary" style={{ padding: '6px 10px' }}><DownloadIcon /></button>
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Toast show={toast.show} message={toast.msg} />
      {modal?.type === 'add' && <AddLangModal />}
      {showImport && (
        <Modal title="Import Translations" onClose={() => setShowImport(false)}
          footer={<><button className="btn-secondary" onClick={() => setShowImport(false)}>Cancel</button><button className="btn-primary" onClick={() => { setShowImport(false); setImportFile(null); showToast('Translations imported!'); }}><ImportIcon /> Import</button></>}>
          <div style={{ background: '#eff6ff', borderRadius: 8, padding: '10px 14px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <DownloadIcon />
            <a href="#" style={{ fontSize: 13, color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }} onClick={e => e.preventDefault()}>Click here to download sample csv file</a>
          </div>
          <label style={{ cursor: 'pointer', display: 'block' }}>
            <input type="file" accept=".csv" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) setImportFile(e.target.files[0]); }} />
            <div style={{ border: `2px dashed ${importFile ? '#3b82f6' : '#d1d5db'}`, borderRadius: 10, padding: '24px 16px', textAlign: 'center', background: importFile ? '#eff6ff' : '#f9fafb' }}>
              {importFile ? <><div style={{ fontSize: 14, fontWeight: 600, color: '#3b82f6' }}>📄 {importFile.name}</div><div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Click to change</div></>
                : <><div style={{ fontSize: 14, color: '#6b7280' }}>Drop CSV or <span style={{ color: '#3b82f6', fontWeight: 600 }}>browse</span></div><div style={{ fontSize: 12, color: '#9ca3af', marginTop: 3 }}>Only .csv files</div></>}
            </div>
          </label>
        </Modal>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div><h2 style={{ fontSize: 20, fontWeight: 700, color: '#1f2937' }}>Translations</h2><p style={{ fontSize: 12, color: '#9ca3af' }}>Dashboard - Settings - <span style={{ color: '#6b7280' }}>Translations</span></p></div>
      </div>
      <div className="card">
        <div className="toolbar">
          <button className="btn-primary" onClick={() => setModal({ type: 'add' })}><PlusIcon /> Add Language</button>
          <button className="btn-secondary" onClick={() => setShowImport(true)}><ImportIcon /> Import</button>
          <button className="btn-secondary" onClick={() => setView('languages')}><EyeIcon /> View All</button>
          <div style={{ position: 'relative', marginLeft: 'auto' }}>
            <button className="btn-secondary" style={{ minWidth: 120, justifyContent: 'space-between' }} onClick={() => setGroupOpen(o => !o)}>
              {selGroup} <ChevronDownIcon />
            </button>
            {groupOpen && (
              <div style={{ position: 'absolute', top: '110%', right: 0, zIndex: 200, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,.12)', minWidth: 140, overflow: 'hidden', animation: 'slideDown .15s ease' }}>
                {GROUPS.map(g => <button key={g} onClick={() => { setSelGroup(g); setGroupOpen(false); }} style={{ display: 'block', width: '100%', padding: '9px 14px', textAlign: 'left', fontSize: 13, border: 'none', cursor: 'pointer', background: g === selGroup ? '#eff6ff' : '#fff', color: g === selGroup ? '#3b82f6' : '#374151', fontWeight: g === selGroup ? 600 : 400 }}>{g}</button>)}
              </div>
            )}
          </div>
          <button className="btn-secondary" onClick={() => showToast('Translations Fetch Successfully')}><RefreshIcon /> Fetch</button>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Group</th><th>English</th>{langKeys.map(k => <th key={k}>{k}</th>)}</tr></thead>
            <tbody>{filteredRows.map((r, i) => (
              <tr key={r.key} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ color: '#6b7280' }}>{r.group}</td>
                <td>{r.en}</td>
                {langKeys.map(k => (
                  <td key={k} style={{ padding: '8px 14px' }}>
                    <input value={translations[r.key]?.[k] ?? r.en} onChange={e => setTranslations(p => ({ ...p, [r.key]: { ...(p[r.key] || {}), [k]: e.target.value } }))}
                      style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: 6, padding: '6px 9px', fontSize: 12, outline: 'none', minWidth: 80 }}
                      onFocus={e => e.target.style.borderColor = '#3b82f6'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                  </td>
                ))}
              </tr>
            ))}</tbody>
          </table>
        </div>
        {groupOpen && <div style={{ position: 'fixed', inset: 0, zIndex: 100 }} onClick={() => setGroupOpen(false)} />}
      </div>
    </>
  );
}

const PERM_SECTIONS = [
  { label: 'Staff Members', perms: ['View', 'Add', 'Edit', 'Delete'] },
  { label: 'Salesmans', perms: ['View', 'Add', 'Edit', 'Delete'] },
  { label: 'Campaigns', perms: ['View', 'Add', 'Edit', 'Delete', 'Export Lead'] },
  { label: 'Campaign View', perms: ['View All', 'View Completed Campaign'] },
  { label: 'Leads', perms: ['View All', 'Add', 'Delete'] },
  { label: 'Email Templates', perms: ['View', 'View All', 'Add', 'Edit', 'Delete'] },
  { label: 'Expense Categories', perms: ['View', 'Add', 'Edit', 'Delete'] },
  { label: 'Expenses', perms: ['View', 'Add', 'Edit', 'Delete'] },
  { label: 'Products', perms: ['View', 'Add', 'Edit', 'Delete'] },
  { label: 'Forms', perms: ['View', 'View All', 'Add', 'Edit', 'Delete'] },
  { label: 'Lead Table Fields', perms: ['View', 'Add', 'Edit', 'Delete'] },
  { label: 'Translations', perms: ['View', 'Add', 'Edit', 'Delete'] },
  { label: 'Role & Permissions', perms: ['View', 'Add', 'Edit', 'Delete'] },
  { label: 'Currencies', perms: ['View', 'Add', 'Edit', 'Delete'] },
  { label: 'Company Settings', perms: ['Edit'] },
  { label: 'Storage Settings', perms: ['Edit'] },
  { label: 'Email Settings', perms: ['Edit'] },
];

const makePerms = () => { const p = {}; PERM_SECTIONS.forEach(s => s.perms.forEach(perm => { p[`${s.label}__${perm}`] = false; })); return p; };

const DEFAULT_ROLES = [
  { id: 1, name: 'Manager', displayName: 'Manager', description: 'Team Manager can full permissions to manage campaigns.', perms: makePerms(), isDefault: false },
  { id: 2, name: 'Team Member', displayName: 'Team Member', description: 'Team Member can participate in campaigns which are assigned to him.', perms: makePerms(), isDefault: false },
  { id: 3, name: 'Admin', displayName: 'Admin', description: 'Admin is allowed to manage everything of the app.', perms: (() => { const p = makePerms(); Object.keys(p).forEach(k => p[k] = true); return p; })(), isDefault: true },
];

function RolePermission() {
  const [roles, setRoles] = useState(DEFAULT_ROLES);
  const [drawer, setDrawer] = useState(null);
  const [delModal, setDelModal] = useState(null);
  const [newRole, setNewRole] = useState({ displayName: '', name: '', description: '', perms: makePerms() });
  const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });
  const [sel, setSel] = useState([]);
  const [page, setPage] = useState(1);

  const showToast = (msg, type = 'success') => { setToast({ show: true, msg, type }); setTimeout(() => setToast(t => ({ ...t, show: false })), 3000); };
  const paged = roles.slice((page - 1) * 10, page * 10);
  const totalPages = Math.ceil(roles.length / 10);

  const RoleDrawer = ({ mode, data, onChange }) => (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)', display: 'flex', justifyContent: 'flex-end' }} onClick={() => setDrawer(null)}>
      <div className="drawer" style={{ background: '#fff', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '-8px 0 40px rgba(0,0,0,.15)', animation: 'slideInRight .3s ease' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1f2937' }}>{mode === 'add' ? 'Add New Role' : `Edit Role — ${data.name}`}</h3>
          <button onClick={() => setDrawer(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}><XIcon /></button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px' }}>
          <div className="grid-2" style={{ marginBottom: 14 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5, display: 'block' }}><span style={{ color: '#ef4444' }}>* </span>Display Name</label>
              <input value={data.displayName} onChange={e => onChange('displayName', e.target.value)} className="field-input" placeholder="Please Enter Display Name" />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5, display: 'block' }}><span style={{ color: '#ef4444' }}>* </span>Role Name</label>
              <input value={data.name} onChange={e => onChange('name', e.target.value)} className="field-input" placeholder="Please Enter Role Name" />
            </div>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5, display: 'block' }}>Description</label>
            <textarea value={data.description} onChange={e => onChange('description', e.target.value)} className="field-input" rows={3} style={{ resize: 'none', fontFamily: 'inherit' }} placeholder="Please Enter Description" />
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 10 }}>Permissions</div>
          {PERM_SECTIONS.map(s => (
            <div key={s.label} className="perm-row">
              <div className="perm-label">{s.label}</div>
              <div className="perm-checks">
                {s.perms.map(perm => {
                  const key = `${s.label}__${perm}`;
                  return (
                    <label key={perm} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#374151', cursor: 'pointer', userSelect: 'none' }}>
                      <input type="checkbox" checked={!!data.perms[key]} onChange={e => onChange('perms', { ...data.perms, [key]: e.target.checked })} style={{ width: 14, height: 14, cursor: 'pointer', accentColor: '#3b82f6' }} />
                      {perm}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '14px 20px', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'flex-end', gap: 8, flexShrink: 0, flexWrap: 'wrap' }}>
          <button className="btn-secondary" onClick={() => setDrawer(null)}>Cancel</button>
          <button className="btn-primary" onClick={() => {
            if (!data.displayName.trim() || !data.name.trim()) return;
            if (mode === 'add') { setRoles(p => [...p, { id: Date.now(), ...data, isDefault: false }]); showToast('Role created!'); }
            else { setRoles(p => p.map(r => r.id === data.id ? data : r)); showToast('Role updated!'); }
            setDrawer(null);
          }}><SaveIcon /> {mode === 'add' ? 'Create' : 'Update'}</button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Toast show={toast.show} message={toast.msg} type={toast.type} />
      {drawer && <RoleDrawer mode={drawer.mode} data={drawer.data} onChange={(field, val) => setDrawer(d => ({ ...d, data: { ...d.data, [field]: val } }))} />}
      {delModal && (
        <Modal title="Delete Role" onClose={() => setDelModal(null)}
          footer={<><button className="btn-secondary" onClick={() => setDelModal(null)}>Cancel</button><button className="btn-danger" onClick={() => { setRoles(p => p.filter(r => r.id !== delModal.id)); setDelModal(null); showToast('Role deleted!', 'error'); }}><TrashIcon /> Delete</button></>}>
          <p style={{ fontSize: 14, color: '#374151' }}>Delete role <strong>"{delModal.name}"</strong>? This cannot be undone.</p>
        </Modal>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div><h2 style={{ fontSize: 20, fontWeight: 700, color: '#1f2937' }}>Role & Permissions</h2><p style={{ fontSize: 12, color: '#9ca3af' }}>Dashboard - Settings - <span style={{ color: '#6b7280' }}>Role & Permissions</span></p></div>
      </div>
      <div className="card">
        <div className="toolbar">
          <button className="btn-primary" onClick={() => { setNewRole({ displayName: '', name: '', description: '', perms: makePerms() }); setDrawer({ mode: 'add', data: { displayName: '', name: '', description: '', perms: makePerms() } }); }}><PlusIcon /> Add New Role</button>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr>
              <th style={{ width: 40 }}><input type="checkbox" checked={sel.length === paged.length && paged.length > 0} onChange={() => setSel(sel.length === paged.length ? [] : paged.map(r => r.id))} /></th>
              <th><div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>Role Name <SortIcon /></div></th>
              <th>Description</th><th style={{ textAlign: 'right' }}>Action</th>
            </tr></thead>
            <tbody>{paged.map((role, i) => (
              <tr key={role.id} style={{ background: sel.includes(role.id) ? '#eff6ff' : i % 2 === 0 ? '#fff' : '#fafafa', cursor: 'pointer' }}
                onClick={() => setDrawer({ mode: 'edit', data: { ...role, perms: { ...role.perms } } })}>
                <td onClick={e => e.stopPropagation()}><input type="checkbox" checked={sel.includes(role.id)} onChange={() => setSel(p => p.includes(role.id) ? p.filter(x => x !== role.id) : [...p, role.id])} /></td>
                <td style={{ fontWeight: 600, fontSize: 14 }}>{role.name}</td>
                <td style={{ color: '#6b7280', maxWidth: 300 }}><span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{role.description}</span></td>
                <td onClick={e => e.stopPropagation()} style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                    <button className="btn-primary" style={{ padding: '6px 10px' }} onClick={() => setDrawer({ mode: 'edit', data: { ...role, perms: { ...role.perms } } })}><EditIcon /></button>
                    {!role.isDefault && <button style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 7, padding: '6px 10px', cursor: 'pointer', display: 'flex' }} onMouseEnter={e => e.currentTarget.style.background = '#ef4444'} onMouseLeave={e => e.currentTarget.style.background = '#3b82f6'} onClick={() => setDelModal(role)}><TrashIcon /></button>}
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <Pagination page={page} total={totalPages || 1} onPage={setPage} />
      </div>
    </div>
  );
}

const PlaceholderPanel = ({ title }) => (
  <div>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1f2937', marginBottom: 16 }}>{title}</h2>
    <div className="card" style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>
      <div style={{ fontSize: 14 }}>This panel is under development.</div>
    </div>
  </div>
);


const ADMIN_MENU = [
  { key: 'company',     label: 'Company Settings', icon: '🏢' },
  { key: 'profile',     label: 'Profile',           icon: '👤' },
  { key: 'leadstatus',  label: 'Lead Status',        icon: '🏷️' },
  { key: 'translations',label: 'Translations',       icon: '🌐' },
  { key: 'roles',       label: 'Role & Permissions', icon: '🔐' },
  { key: 'currencies',  label: 'Currencies',         icon: '💵' },
  { key: 'modules',     label: 'Modules',            icon: '🧩' },
  { key: 'storage',     label: 'Storage Settings',   icon: '🗄️' },
  { key: 'email',       label: 'Email Settings',     icon: '✉️' },
  { key: 'database',    label: 'Database Backup',    icon: '💾' },
  { key: 'update',      label: 'Update App',         icon: '🔄' },
];

const MEMBER_MENU = [
  { key: 'profile',    label: 'Profile',    icon: '👤' },
  { key: 'leadstatus', label: 'Lead Status', icon: '🏷️' },
];

const MANAGER_MENU = [
  { key: 'profile',    label: 'Profile',    icon: '👤' },
  { key: 'leadstatus', label: 'Lead Status', icon: '🏷️' },
];


export default function AdminSettings({ role = 'admin' }) {
  const MENU =
    role === 'member'  ? MEMBER_MENU  :
    role === 'manager' ? MANAGER_MENU :
    ADMIN_MENU;

  const [active, setActive] = useState(MENU[0].key);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = (key) => { setActive(key); setSidebarOpen(false); };

  const renderPanel = () => {
    switch (active) {
      case 'company':      return <CompanySettings />;
      case 'profile':      return <ProfilePanel />;
      case 'leadstatus':   return <LeadStatus />;
      case 'translations': return <Translations />;
      case 'roles':        return <RolePermission />;
      case 'currencies':   return <Currencies />;
      case 'modules':      return <Modules />;
      case 'storage':      return <StorageSettings />;
      case 'email':        return <EmailSettings />;
      case 'database':     return <DatabaseBackup />;
      case 'update':       return <UpdateApp />;
      default:             return <PlaceholderPanel title={MENU.find(m => m.key === active)?.label || 'Settings'} />;
    }
  };

  const activeLabel = MENU.find(m => m.key === active)?.label || 'Settings';

  return (
    <>
      <GlobalStyles />

      <div className="mobile-topbar">
        <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#374151' }}>
          <MenuIcon />
        </button>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#1f2937' }}>{activeLabel}</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="admin-layout">
        {/* Sidebar overlay */}
        <div className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)} />

        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#1f2937' }}>
              {role === 'member' ? 'Member Settings' : role === 'manager' ? 'Manager Settings' : 'Admin Settings'}
            </span>
            <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'none' }}><XIcon /></button>
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {MENU.map(item => (
              <button key={item.key} onClick={() => navigate(item.key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                  padding: '11px 20px', textAlign: 'left', border: 'none', cursor: 'pointer', fontSize: 13,
                  fontWeight: active === item.key ? 600 : 400, transition: 'all .15s',
                  background: active === item.key ? '#3b82f6' : 'transparent',
                  color: active === item.key ? '#fff' : '#6b7280',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={e => { if (active !== item.key) e.currentTarget.style.background = '#f9fafb'; }}
                onMouseLeave={e => { if (active !== item.key) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ fontSize: 15 }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="main-content">
          {renderPanel()}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .sidebar-close-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}