import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { AlertTriangle, CheckCircle2, Clock, EyeOff, Save, MessageSquare } from 'lucide-react';

export default function AdminComplaints() {
  const { complaints, updateComplaintStatus } = useData();
  const [selectedCmp, setSelectedCmp] = useState(null);
  const [status, setStatus] = useState('In Progress');
  const [notes, setNotes] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!selectedCmp) return;
    updateComplaintStatus(selectedCmp.id, status, notes);
    setSelectedCmp(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Institutional Grievance Redressal Desk</h1>
        <p style={{ fontSize: '0.85rem' }}>Review student complaints, assign maintenance work orders, and mark resolutions.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {complaints.map((c) => {
          const isResolved = c.status === 'Resolved';

          return (
            <div key={c.id} className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-dept">{c.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                    {c.publicTrackingId}
                  </span>
                  {c.isAnonymous ? (
                    <span className="badge" style={{ background: 'var(--badge-bg)' }}>
                      <EyeOff size={11} style={{ marginRight: '4px' }} /> Anonymous (Audit Hash: {c.anonymousHash})
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      From: <strong>{c.studentName}</strong> ({c.usn})
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={`badge ${isResolved ? 'badge-success' : 'badge-warning'}`}>
                    {c.status}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedCmp(c);
                      setStatus(c.status);
                      setNotes(c.adminNotes || '');
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    Manage Status
                  </button>
                </div>
              </div>

              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{c.subject}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                {c.description}
              </p>

              {c.adminNotes && (
                <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'var(--bg-surface)', borderLeft: '3px solid var(--dept-cse)', fontSize: '0.82rem' }}>
                  <strong>Administration Resolution Log:</strong> {c.adminNotes}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedCmp && (
        <div className="modal-overlay" onClick={() => setSelectedCmp(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem' }}>Update Grievance Status</h3>
              <button onClick={() => setSelectedCmp(null)} className="btn btn-ghost btn-sm">✕</button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="modal-body">
                <div style={{ marginBottom: '1rem' }}>
                  <span className="badge badge-dept">{selectedCmp.category}</span>
                  <h4 style={{ marginTop: '6px' }}>{selectedCmp.subject}</h4>
                </div>

                <div className="form-group">
                  <label className="form-label">Lifecycle Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="form-select"
                  >
                    <option value="Submitted">Submitted (Pending Review)</option>
                    <option value="Under Review">Under Review</option>
                    <option value="In Progress">In Progress (Work Order Dispatched)</option>
                    <option value="Resolved">Resolved (Closure Verified)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Administrative Resolution Action Notes</label>
                  <textarea
                    rows={4}
                    required
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="form-textarea"
                    placeholder="Document the corrective actions taken (e.g. IT replaced network switch, library indented 20 new books)..."
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setSelectedCmp(null)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={15} /> Save Resolution State
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
