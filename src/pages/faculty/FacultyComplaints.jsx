import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { AlertTriangle, CheckCircle2, XCircle, Calendar, EyeOff, FileText } from 'lucide-react';

export default function FacultyComplaints() {
  const { currentUser } = useAuth();
  const { complaints, leaves, reviewLeave } = useData();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Student Grievances & Leave Approvals</h1>
        <p style={{ fontSize: '0.85rem' }}>Review student leaves and departmental feedback assigned for faculty appraisal.</p>
      </div>

      {/* Pending Leave Requests Section (PRD Section 14) */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Pending Student Leave Requests</h3>
        {leaves.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No leave requests pending.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {leaves.map((l) => (
              <div
                key={l.id}
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '0.95rem' }}>{l.studentName} ({l.usn})</strong>
                    <span className="badge badge-dept">{l.type} Leave</span>
                    <span className={`badge ${l.status === 'Approved' ? 'badge-success' : l.status === 'Rejected' ? 'badge-danger' : 'badge-warning'}`}>
                      {l.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    "{l.reason}"
                  </p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Dates: {l.fromDate} → {l.toDate}
                  </span>
                </div>

                {l.status === 'Pending' && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => reviewLeave(l.id, 'Approved', currentUser?.name)}
                      className="btn btn-sm btn-success"
                    >
                      <CheckCircle2 size={14} /> Approve Leave
                    </button>
                    <button
                      onClick={() => reviewLeave(l.id, 'Rejected', currentUser?.name)}
                      className="btn btn-sm btn-danger"
                    >
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Departmental Complaints (PRD Section 15) */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Relevant Student Grievances</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {complaints.map((c) => (
            <div
              key={c.id}
              style={{
                padding: '14px',
                borderRadius: '12px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-dept">{c.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.publicTrackingId}</span>
                  {c.isAnonymous && (
                    <span className="badge" style={{ background: 'var(--badge-bg)' }}>
                      <EyeOff size={11} style={{ marginRight: '4px' }} /> Anonymous
                    </span>
                  )}
                </div>
                <span className="badge badge-warning">{c.status}</span>
              </div>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '4px' }}>{c.subject}</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
