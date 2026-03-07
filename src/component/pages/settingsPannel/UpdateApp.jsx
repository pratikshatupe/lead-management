import React from 'react'

function UpdateApp() {
  return (
    function UpdateApp() {
      const [checking, setChecking] = useState(false);
      const [updateStatus, setUpdateStatus] = useState(null); // null | 'uptodate' | 'available'
      const [updating, setUpdating] = useState(false);
      const [updated, setUpdated] = useState(false);
      const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });
      const showToast = (msg, type = 'success') => { setToast({ show: true, msg, type }); setTimeout(() => setToast(t => ({ ...t, show: false })), 3000); };
    
      const checkUpdate = () => {
        setChecking(true); setUpdateStatus(null);
        setTimeout(() => { setChecking(false); setUpdateStatus('available'); }, 1800);
      };
    
      const doUpdate = () => {
        setUpdating(true);
        setTimeout(() => { setUpdating(false); setUpdated(true); showToast('App updated to v2.5.0 successfully!'); }, 2500);
      };
    
      const currentVersion = '2.4.2';
      const newVersion = '2.5.0';
    
      return (
        <div>
          <Toast show={toast.show} message={toast.msg} type={toast.type} />
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1f2937' }}>Update App</h2>
            <p style={{ fontSize: 12, color: '#9ca3af' }}>Dashboard - Settings - <span style={{ color: '#6b7280' }}>Update App</span></p>
          </div>
    
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
              <div style={{ width: 56, height: 56, background: '#eff6ff', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🚀</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#1f2937' }}>Lead Pro Application</div>
                <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>Current Version: <span style={{ fontWeight: 600, color: '#3b82f6' }}>v{currentVersion}</span></div>
              </div>
              <button className="btn-secondary" style={{ marginLeft: 'auto' }} onClick={checkUpdate} disabled={checking}>
                <RefreshIcon /> {checking ? 'Checking...' : 'Check for Updates'}
              </button>
            </div>
    
            {updateStatus === 'uptodate' && (
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 22 }}>✅</span>
                <div><div style={{ fontSize: 14, fontWeight: 600, color: '#15803d' }}>You are up to date!</div><div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>Version v{currentVersion} is the latest version.</div></div>
              </div>
            )}
    
            {updateStatus === 'available' && !updated && (
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <span style={{ fontSize: 22 }}>🆕</span>
                  <div><div style={{ fontSize: 14, fontWeight: 600, color: '#1d4ed8' }}>Update Available: v{newVersion}</div><div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>A new version is ready to install.</div></div>
                </div>
                <div style={{ background: '#fff', borderRadius: 8, padding: '12px 16px', marginBottom: 14, fontSize: 13, color: '#374151', border: '1px solid #e5e7eb' }}>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>What's new in v{newVersion}:</div>
                  <ul style={{ paddingLeft: 16, lineHeight: 2, color: '#6b7280' }}>
                    <li>New currency format settings</li>
                    <li>Improved email driver integration</li>
                    <li>Bug fixes and performance improvements</li>
                    <li>Enhanced role permissions management</li>
                  </ul>
                </div>
                <button className="btn-primary" onClick={doUpdate} disabled={updating} style={{ opacity: updating ? 0.7 : 1 }}>
                  <UpdateIcon /> {updating ? 'Updating... Please wait' : `Update to v${newVersion}`}
                </button>
              </div>
            )}
    
            {updated && (
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 22 }}>🎉</span>
                <div><div style={{ fontSize: 14, fontWeight: 600, color: '#15803d' }}>Successfully updated to v{newVersion}!</div><div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>Please refresh the page to see the latest changes.</div></div>
              </div>
            )}
    
            {!updateStatus && (
              <div style={{ textAlign: 'center', padding: '32px 0', color: '#9ca3af' }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>🔄</div>
                <div style={{ fontSize: 14 }}>Click "Check for Updates" to see if a new version is available.</div>
              </div>
            )}
          </div>
    
          <div className="card" style={{ padding: 20, marginTop: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 14 }}>Version History</div>
            <div className="table-wrap">
              <table className="data-table">
                <thead><tr><th>Version</th><th>Release Date</th><th>Notes</th></tr></thead>
                <tbody>
                  {[['v2.4.2', '2026-01-15', 'Security patches and minor bug fixes'], ['v2.4.0', '2025-12-01', 'Added Currencies module, new storage drivers'], ['v2.3.5', '2025-10-20', 'Performance improvements, UI enhancements'], ['v2.3.0', '2025-09-05', 'Introduced Role & Permissions system']].map(([v, d, n]) => (
                    <tr key={v}><td style={{ fontWeight: 600, color: '#3b82f6' }}>{v}</td><td style={{ color: '#6b7280' }}>{d}</td><td style={{ color: '#374151' }}>{n}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
  )
}

export default UpdateApp