import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  FileCheck2,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  AlertCircle,
  Paperclip
} from 'lucide-react';

export default function StudentLeave() {
  const { currentUser } = useAuth();
  const { leaves, submitLeave } = useData();
  const [showModal, setShowModal] = useState(false);
  const [leaveType, setLeaveType] = useState('Medical');
  const [fromDate, setFromDate] = useState('2026-09-28');
  const [toDate, setToDate] = useState('2026-09-29');
  const [reason, setReason] = useState('');

  const myLeaves = leaves.filter((l) => l.studentUid === currentUser?.uid || l.usn === currentUser?.usn);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) return;
    submitLeave(leaveType, fromDate, toDate, reason, currentUser);
    setShowModal(false);
    setReason('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Title & Apply Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Leave Management</h1>
          <p style={{ fontSize: '0.85rem' }}>Submit medical or casual absence requests for faculty & admin sanction.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={16} /> Apply for Leave
        </button>
      </div>

      {/* Leave Application Records List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {myLeaves.map((l) => {
          const isPending = l.status === 'Pending';
          const isApproved = l.status === 'Approved';
          const isRejected = l.status === 'Rejected';

          return (
            <div key={l.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ flex: 1, minWidth: '260px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <span className={`badge ${l.type === 'Medical' ? 'badge-danger' : 'badge-dept'}`}>
                    {l.type} Leave
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <Calendar size={13} />
                    <span>{l.fromDate} → {l.toDate}</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.5rem', fontWeight: 500 }}>
                  "{l.reason}"
                </p>

                {l.attachment && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--dept-cse)' }}>
                    <Paperclip size={13} />
                    <span>Attached Document: {l.attachment}</span>
                  </div>
                )}
              </div>

              {/* Status Badge & Reviewer */}
              <div style={{ textAlign: 'right' }}>
                {isApproved && (
                  <span className="badge badge-success" style={{ fontSize: '0.82rem', padding: '0.35rem 0.8rem' }}>
                    ✓ Approved by {l.reviewedBy || 'Faculty'}
                  </span>
                )}
                {isPending && (
                  <span className="badge badge-warning" style={{ fontSize: '0.82rem', padding: '0.35rem 0.8rem' }}>
                    ⏳ Awaiting Faculty Sanction
                  </span>
                )}
                {isRejected && (
                  <span className="badge badge-danger" style={{ fontSize: '0.82rem', padding: '0.35rem 0.8rem' }}>
                    ✕ Rejected
                  </span>
                )}
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Applied: {new Date(l.submittedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Apply Leave Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem' }}>Apply for Academic Leave</h3>
              <button onClick={() => setShowModal(false)} className="btn btn-ghost btn-sm">✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Leave Category</label>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '4px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="leaveType"
                        value="Medical"
                        checked={leaveType === 'Medical'}
                        onChange={(e) => setLeaveType(e.target.value)}
                      />
                      <span>Medical Leave</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="leaveType"
                        value="Casual"
                        checked={leaveType === 'Casual'}
                        onChange={(e) => setLeaveType(e.target.value)}
                      />
                      <span>Casual / Personal Leave</span>
                    </label>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">From Date</label>
                    <input
                      type="date"
                      required
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">To Date</label>
                    <input
                      type="date"
                      required
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Reason for Absence</label>
                  <textarea
                    rows={3}
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="form-textarea"
                    placeholder="Provide specific medical or personal details..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Doctor Prescription / Proof (PDF/Image)</label>
                  <input type="file" className="form-input" />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Leave Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
