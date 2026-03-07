import { useState } from "react";

// ── Icons ──────────────────────────────────────────────
const PlusIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>;
const EditIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>;
const TrashIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>;
const XIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>;
const CheckCircleIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>;
const SaveIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>;
const SortIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"/></svg>;

// ── Permission sections definition ────────────────────
const PERMISSION_SECTIONS = [
  { label: 'Staff Members',        perms: ['View','Add','Edit','Delete'] },
  { label: 'Salesmans',            perms: ['View','Add','Edit','Delete'] },
  { label: 'Campaigns',            perms: ['View','Add','Edit','Delete','Export Lead'] },
  { label: 'Campaign View',        perms: ['View All','View Completed Campaign'] },
  { label: 'Leads',                perms: ['View All','Add','Delete'] },
  { label: 'Email Templates',      perms: ['View','View All','Add','Edit','Delete'] },
  { label: 'Expense Categories',   perms: ['View','Add','Edit','Delete'] },
  { label: 'Expenses',             perms: ['View','Add','Edit','Delete'] },
  { label: 'Products',             perms: ['View','Add','Edit','Delete'] },
  { label: 'Forms',                perms: ['View','View All','Add','Edit','Delete'] },
  { label: 'Lead Table Fields',    perms: ['View','Add','Edit','Delete'] },
  { label: 'Translations',         perms: ['View','Add','Edit','Delete'] },
  { label: 'Role & Permissions',   perms: ['View','Add','Edit','Delete'] },
  { label: 'Currencies',           perms: ['View','Add','Edit','Delete'] },
  { label: 'Company Settings',     perms: ['Edit'] },
  { label: 'Storage Settings',     perms: ['Edit'] },
  { label: 'Email Settings',       perms: ['Edit'] },
];

const makeEmptyPerms = () => {
  const p = {};
  PERMISSION_SECTIONS.forEach(s => s.perms.forEach(perm => { p[`${s.label}__${perm}`] = false; }));
  return p;
};

// ── Default roles ──────────────────────────────────────
const DEFAULT_ROLES = [
  {
    id: 1, name: 'Manager', displayName: 'Manager',
    description: 'Team Manager can full permissions to manage campaigns.',
    perms: (() => { const p = makeEmptyPerms(); ['Campaigns__View','Campaigns__Add','Campaigns__Edit','Campaign View__View All','Leads__View All','Leads__Add'].forEach(k => p[k]=true); return p; })(),
    isDefault: false
  },
  {
    id: 2, name: 'Team Member', displayName: 'Team Member',
    description: 'Team Member can participate in campaigns which are assigned to him.',
    perms: (() => { const p = makeEmptyPerms(); ['Campaigns__View','Campaign View__View All'].forEach(k => p[k]=true); return p; })(),
    isDefault: false
  },
  {
    id: 3, name: 'Admin', displayName: 'Admin',
    description: 'Admin is allowed to manage everything of the app.',
    perms: (() => { const p = makeEmptyPerms(); Object.keys(p).forEach(k => p[k]=true); return p; })(),
    isDefault: true
  },
];

// ── Toast ──────────────────────────────────────────────
const Toast = ({ show, message, type='success' }) => (
  <div style={{
    position:'fixed', bottom:28, right:28, zIndex:9999,
    background:'#fff', borderRadius:12, boxShadow:'0 8px 32px rgba(0,0,0,.15)',
    padding:'14px 20px', display:'flex', alignItems:'center', gap:12,
    border:`1.5px solid ${type==='success'?'#d1fae5':'#fee2e2'}`,
    transform: show?'translateY(0)':'translateY(80px)',
    opacity: show?1:0, transition:'all .35s cubic-bezier(.4,2,.6,1)'
  }}>
    <div style={{ color: type==='success'?'#10b981':'#ef4444' }}><CheckCircleIcon/></div>
    <div style={{ fontSize:14, fontWeight:700, color: type==='success'?'#065f46':'#991b1b' }}>{message}</div>
  </div>
);

// ── Checkbox row ───────────────────────────────────────
const PermRow = ({ section, perms, onChange }) => (
  <div style={{ display:'flex', alignItems:'center', padding:'9px 0', borderBottom:'1px solid #f3f4f6', flexWrap:'wrap', gap:'6px 0' }}>
    <div style={{ width:160, fontSize:13, color:'#6b7280', fontWeight:500, flexShrink:0 }}>{section.label}</div>
    <div style={{ display:'flex', flexWrap:'wrap', gap:'10px 20px', flex:1 }}>
      {section.perms.map(perm => {
        const key = `${section.label}__${perm}`;
        return (
          <label key={perm} style={{ display:'flex', alignItems:'center', gap:5, cursor:'pointer', fontSize:13, color:'#374151', userSelect:'none' }}>
            <input type="checkbox" checked={!!perms[key]} onChange={e=>onChange(key,e.target.checked)}
              style={{ width:15, height:15, cursor:'pointer', accentColor:'#3b82f6' }}/>
            {perm}
          </label>
        );
      })}
    </div>
  </div>
);

// ── Side Drawer ────────────────────────────────────────
const RoleDrawer = ({ title, role, onChange, onClose, onSubmit, submitLabel }) => (
  <div style={{
    position:'fixed', inset:0, zIndex:1000,
    background:'rgba(0,0,0,0.35)', backdropFilter:'blur(2px)',
    display:'flex', alignItems:'stretch', justifyContent:'flex-end'
  }} onClick={onClose}>
    <div style={{
      width:560, maxWidth:'95vw', background:'#fff', display:'flex', flexDirection:'column',
      boxShadow:'-8px 0 40px rgba(0,0,0,.15)',
      animation:'slideIn .3s cubic-bezier(.4,0,.2,1)'
    }} onClick={e=>e.stopPropagation()}>

      {/* Header */}
      <div style={{ padding:'18px 24px', borderBottom:'1px solid #f3f4f6', display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 }}>
        <h3 style={{ margin:0, fontSize:17, fontWeight:700, color:'#1f2937' }}>{title}</h3>
        <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:'#9ca3af', display:'flex', padding:4, borderRadius:6 }}
          onMouseEnter={e=>e.currentTarget.style.background='#f3f4f6'} onMouseLeave={e=>e.currentTarget.style.background='none'}>
          <XIcon/>
        </button>
      </div>

      {/* Body */}
      <div style={{ flex:1, overflowY:'auto', padding:'20px 24px' }}>
        {/* Display Name + Role Name */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
          <div>
            <label style={{ fontSize:13, fontWeight:600, color:'#374151', marginBottom:5, display:'block' }}>
              <span style={{ color:'#ef4444' }}>* </span>Display Name
            </label>
            <input value={role.displayName} onChange={e=>onChange('displayName',e.target.value)}
              placeholder="Please Enter Display Name"
              style={{ width:'100%', border:'1.5px solid #e5e7eb', borderRadius:8, padding:'10px 14px', fontSize:13, outline:'none', boxSizing:'border-box' }}
              onFocus={e=>e.target.style.borderColor='#3b82f6'} onBlur={e=>e.target.style.borderColor='#e5e7eb'}/>
          </div>
          <div>
            <label style={{ fontSize:13, fontWeight:600, color:'#374151', marginBottom:5, display:'block' }}>
              <span style={{ color:'#ef4444' }}>* </span>Role Name
            </label>
            <input value={role.name} onChange={e=>onChange('name',e.target.value)}
              placeholder="Please Enter Role Name"
              style={{ width:'100%', border:'1.5px solid #e5e7eb', borderRadius:8, padding:'10px 14px', fontSize:13, outline:'none', boxSizing:'border-box' }}
              onFocus={e=>e.target.style.borderColor='#3b82f6'} onBlur={e=>e.target.style.borderColor='#e5e7eb'}/>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom:20 }}>
          <label style={{ fontSize:13, fontWeight:600, color:'#374151', marginBottom:5, display:'block' }}>Description</label>
          <textarea value={role.description} onChange={e=>onChange('description',e.target.value)}
            placeholder="Please Enter Description" rows={3}
            style={{ width:'100%', border:'1.5px solid #e5e7eb', borderRadius:8, padding:'10px 14px', fontSize:13, outline:'none', resize:'none', fontFamily:'inherit', boxSizing:'border-box' }}
            onFocus={e=>e.target.style.borderColor='#3b82f6'} onBlur={e=>e.target.style.borderColor='#e5e7eb'}/>
        </div>

        {/* Permissions */}
        <div style={{ fontSize:13, fontWeight:700, color:'#374151', marginBottom:10 }}>Permissions</div>
        {PERMISSION_SECTIONS.map(s => (
          <PermRow key={s.label} section={s} perms={role.perms}
            onChange={(key,val)=>onChange('perms',{...role.perms,[key]:val})}/>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding:'16px 24px', borderTop:'1px solid #f3f4f6', display:'flex', justifyContent:'flex-end', gap:10, flexShrink:0 }}>
        <button onClick={onClose} style={{
          padding:'10px 22px', borderRadius:8, border:'1.5px solid #e5e7eb',
          background:'#fff', color:'#374151', fontSize:13, fontWeight:600, cursor:'pointer'
        }}
          onMouseEnter={e=>e.currentTarget.style.background='#f9fafb'} onMouseLeave={e=>e.currentTarget.style.background='#fff'}>
          Cancel
        </button>
        <button onClick={onSubmit} style={{
          display:'flex', alignItems:'center', gap:7, padding:'10px 22px', borderRadius:8,
          border:'none', background:'#3b82f6', color:'#fff', fontSize:13, fontWeight:600,
          cursor:'pointer', boxShadow:'0 2px 8px rgba(59,130,246,.3)'
        }}
          onMouseEnter={e=>e.currentTarget.style.background='#2563eb'} onMouseLeave={e=>e.currentTarget.style.background='#3b82f6'}>
          <SaveIcon/> {submitLabel}
        </button>
      </div>
    </div>
    <style>{`@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>
  </div>
);

// ── Delete Confirm Modal ───────────────────────────────
const DeleteModal = ({ role, onClose, onDelete }) => (
  <div style={{
    position:'fixed', inset:0, zIndex:2000,
    background:'rgba(0,0,0,0.4)', backdropFilter:'blur(2px)',
    display:'flex', alignItems:'center', justifyContent:'center'
  }} onClick={onClose}>
    <div style={{
      background:'#fff', borderRadius:14, boxShadow:'0 20px 60px rgba(0,0,0,.2)',
      width:440, maxWidth:'92vw', animation:'popIn .25s cubic-bezier(.4,0,.2,1)'
    }} onClick={e=>e.stopPropagation()}>
      <div style={{ padding:'18px 24px', borderBottom:'1px solid #f3f4f6', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h3 style={{ margin:0, fontSize:17, fontWeight:700, color:'#1f2937' }}>Delete Role</h3>
        <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:'#9ca3af', display:'flex', padding:4 }}><XIcon/></button>
      </div>
      <div style={{ padding:'22px 24px' }}>
        <p style={{ margin:0, fontSize:14, color:'#374151' }}>
          Are you sure you want to delete role <strong>"{role.name}"</strong>? This action cannot be undone.
        </p>
      </div>
      <div style={{ padding:'14px 24px', borderTop:'1px solid #f3f4f6', display:'flex', justifyContent:'flex-end', gap:10 }}>
        <button onClick={onClose} style={{ padding:'10px 22px', borderRadius:8, border:'1.5px solid #e5e7eb', background:'#fff', color:'#374151', fontSize:13, fontWeight:600, cursor:'pointer' }}>Cancel</button>
        <button onClick={onDelete} style={{ display:'flex', alignItems:'center', gap:7, padding:'10px 22px', borderRadius:8, border:'none', background:'#ef4444', color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer' }}
          onMouseEnter={e=>e.currentTarget.style.background='#dc2626'} onMouseLeave={e=>e.currentTarget.style.background='#ef4444'}>
          <TrashIcon/> Delete
        </button>
      </div>
    </div>
    <style>{`@keyframes popIn{from{transform:scale(.92);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
  </div>
);

// ══════════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════════
export default function RolePermission() {
  const [roles, setRoles] = useState(DEFAULT_ROLES);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 10;

  // Drawers / modals
  const [addDrawer, setAddDrawer] = useState(false);
  const [editDrawer, setEditDrawer] = useState(null);   // role object
  const [deleteModal, setDeleteModal] = useState(null); // role object

  // New role form state
  const [newRole, setNewRole] = useState({ displayName:'', name:'', description:'', perms: makeEmptyPerms() });

  // Toast
  const [toast, setToast] = useState({ show:false, message:'', type:'success' });
  const showToast = (message, type='success') => {
    setToast({ show:true, message, type });
    setTimeout(()=>setToast(t=>({...t,show:false})),3000);
  };

  // Pagination
  const paginated = roles.slice((page-1)*perPage, page*perPage);
  const totalPages = Math.ceil(roles.length/perPage);
  const toggleSelect = id => setSelected(p => p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const toggleAll = () => setSelected(selected.length===paginated.length?[]:paginated.map(r=>r.id));

  // Add
  const handleAdd = () => {
    if (!newRole.displayName.trim() || !newRole.name.trim()) return;
    setRoles(prev=>[...prev,{id:Date.now(), ...newRole, isDefault:false}]);
    setNewRole({ displayName:'', name:'', description:'', perms:makeEmptyPerms() });
    setAddDrawer(false);
    showToast('Role created successfully!');
  };

  // Edit
  const handleEdit = () => {
    setRoles(prev=>prev.map(r=>r.id===editDrawer.id?editDrawer:r));
    setEditDrawer(null);
    showToast('Role updated successfully!');
  };

  // Delete
  const handleDelete = () => {
    setRoles(prev=>prev.filter(r=>r.id!==deleteModal.id));
    setDeleteModal(null);
    showToast('Role deleted!','error');
  };

  // Row click → open edit drawer
  const handleRowClick = (role) => setEditDrawer({...role, perms:{...role.perms}});

  return (
    <>
      <Toast show={toast.show} message={toast.message} type={toast.type}/>

      {/* Add Drawer */}
      {addDrawer && (
        <RoleDrawer
          title="Add New Role"
          role={newRole}
          onChange={(field,val)=>setNewRole(p=>({...p,[field]:val}))}
          onClose={()=>setAddDrawer(false)}
          onSubmit={handleAdd}
          submitLabel="Create"
        />
      )}

      {/* Edit Drawer */}
      {editDrawer && (
        <RoleDrawer
          title={`Edit Role — ${editDrawer.name}`}
          role={editDrawer}
          onChange={(field,val)=>setEditDrawer(p=>({...p,[field]:val}))}
          onClose={()=>setEditDrawer(null)}
          onSubmit={handleEdit}
          submitLabel="Update"
        />
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <DeleteModal role={deleteModal} onClose={()=>setDeleteModal(null)} onDelete={handleDelete}/>
      )}

      {/* ── Page Header ── */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
        <div>
          <h2 style={{ margin:0, fontSize:22, fontWeight:700, color:'#1f2937' }}>Role & Permissions</h2>
          <p style={{ margin:'3px 0 0', fontSize:12, color:'#9ca3af' }}>
            Dashboard - Settings - <span style={{ color:'#6b7280' }}>Role & Permissions</span>
          </p>
        </div>
      </div>

      {/* ── Table Card ── */}
      <div style={{ marginTop:18, background:'#fff', borderRadius:14, boxShadow:'0 1px 6px rgba(0,0,0,.06)', border:'1.5px solid #f1f5f9', overflow:'hidden' }}>

        {/* Toolbar */}
        <div style={{ padding:'14px 18px', borderBottom:'1px solid #f3f4f6' }}>
          <button onClick={()=>{ setNewRole({ displayName:'', name:'', description:'', perms:makeEmptyPerms() }); setAddDrawer(true); }}
            style={{
              display:'flex', alignItems:'center', gap:8,
              background:'#3b82f6', color:'#fff', border:'none',
              padding:'10px 18px', borderRadius:8, fontSize:13, fontWeight:600,
              cursor:'pointer', boxShadow:'0 2px 8px rgba(59,130,246,.25)'
            }}
            onMouseEnter={e=>e.currentTarget.style.background='#2563eb'}
            onMouseLeave={e=>e.currentTarget.style.background='#3b82f6'}>
            <PlusIcon/> Add New Role
          </button>
        </div>

        {/* Table */}
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:'#f9fafb' }}>
              <th style={{ padding:'11px 16px', width:40 }}>
                <input type="checkbox"
                  checked={selected.length===paginated.length && paginated.length>0}
                  onChange={toggleAll}
                  style={{ cursor:'pointer', width:15, height:15 }}/>
              </th>
              <th style={{ padding:'11px 16px', textAlign:'left', fontSize:13, fontWeight:600, color:'#6b7280' }}>
                <div style={{ display:'flex', alignItems:'center', gap:4 }}>Role Name <SortIcon/></div>
              </th>
              <th style={{ padding:'11px 16px', textAlign:'left', fontSize:13, fontWeight:600, color:'#6b7280' }}>Description</th>
              <th style={{ padding:'11px 16px', textAlign:'right', fontSize:13, fontWeight:600, color:'#6b7280' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length===0
              ? <tr><td colSpan={4} style={{ padding:40, textAlign:'center', color:'#9ca3af' }}>No roles found</td></tr>
              : paginated.map((role,i)=>(
              <tr key={role.id}
                style={{ borderTop:'1px solid #f3f4f6', background: selected.includes(role.id)?'#eff6ff': i%2===0?'#fff':'#fafafa', cursor:'pointer' }}
                onClick={()=>handleRowClick(role)}>
                <td style={{ padding:'14px 16px' }} onClick={e=>e.stopPropagation()}>
                  <input type="checkbox" checked={selected.includes(role.id)}
                    onChange={()=>toggleSelect(role.id)}
                    style={{ cursor:'pointer', width:15, height:15 }}/>
                </td>
                <td style={{ padding:'14px 16px', fontSize:14, fontWeight:500, color:'#1f2937' }}>{role.name}</td>
                <td style={{ padding:'14px 16px', fontSize:13, color:'#6b7280', maxWidth:500 }}>{role.description}</td>
                <td style={{ padding:'14px 16px' }} onClick={e=>e.stopPropagation()}>
                  <div style={{ display:'flex', gap:7, justifyContent:'flex-end' }}>
                    <button onClick={()=>setEditDrawer({...role,perms:{...role.perms}})}
                      style={{ background:'#3b82f6', color:'#fff', border:'none', borderRadius:7, padding:'8px 12px', cursor:'pointer', display:'flex', alignItems:'center' }}
                      onMouseEnter={e=>e.currentTarget.style.background='#2563eb'}
                      onMouseLeave={e=>e.currentTarget.style.background='#3b82f6'}>
                      <EditIcon/>
                    </button>
                    {!role.isDefault && (
                      <button onClick={()=>setDeleteModal(role)}
                        style={{ background:'#3b82f6', color:'#fff', border:'none', borderRadius:7, padding:'8px 12px', cursor:'pointer', display:'flex', alignItems:'center' }}
                        onMouseEnter={e=>e.currentTarget.style.background='#ef4444'}
                        onMouseLeave={e=>e.currentTarget.style.background='#3b82f6'}>
                        <TrashIcon/>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ padding:'12px 18px', borderTop:'1px solid #f3f4f6', display:'flex', justifyContent:'flex-end', alignItems:'center', gap:6 }}>
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}
            style={{ background:'none', border:'1px solid #e5e7eb', borderRadius:6, padding:'5px 10px', cursor:page===1?'not-allowed':'pointer', color:page===1?'#d1d5db':'#374151', fontSize:13 }}>‹</button>
          {Array.from({length:totalPages},(_, i)=>i+1).map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ background:p===page?'#3b82f6':'none', color:p===page?'#fff':'#374151', border:`1px solid ${p===page?'#3b82f6':'#e5e7eb'}`, borderRadius:6, padding:'5px 11px', cursor:'pointer', fontSize:13, fontWeight:p===page?600:400 }}>{p}</button>
          ))}
          <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages||totalPages===0}
            style={{ background:'none', border:'1px solid #e5e7eb', borderRadius:6, padding:'5px 10px', cursor:(page===totalPages||totalPages===0)?'not-allowed':'pointer', color:(page===totalPages||totalPages===0)?'#d1d5db':'#374151', fontSize:13 }}>›</button>
          <span style={{ fontSize:13, color:'#9ca3af', marginLeft:6 }}>10 / page</span>
        </div>
      </div>
    </>
  );
}