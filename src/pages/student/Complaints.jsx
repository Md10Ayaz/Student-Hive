import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  AlertTriangle,
  Plus,
  Shield,
  EyeOff,
  CheckCircle2,
  Clock,
  Send,
  HelpCircle
} from 'lucide-react';

export default function StudentComplaints() {
  const { currentUser } = useAuth();
  const { complaints, submitComplaint } = useData();
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('Laboratory');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;
    submitComplaint(category, subject, description, isAnonymous, currentUser);
    setShowModal(false);
    setSubject('');
    setDescription('');
    setIsAnonymous(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Title & Submit Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Campus Grievance & Complaint Box</h1>
          <p style={{ fontSize: '0.85rem' }}>
            Report institutional issues with guaranteed confidentiality and traceable resolution lifecycle.
          </p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={16} /> File New Grievance
        </button>
      </div>

      {/* Complaints List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {complaints.map((c) => {
          const isResolved = c.status === 'Resolved';
          const isInProgress = c.status === 'In Progress';

          return (
            <div key={c.id} className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-dept">{c.category}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                    {c.publicTrackingId}
                  </span>
                  {c.isAnonymous && (
                    <span className="badge" style={{ background: 'var(--badge-bg)', color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                      <EyeOff size={11} style={{ marginRight: '3px' }} /> Anonymous Submission
                    </span>
                  )}
                </div>

                <span
                  className={`badge ${
                    isResolved ? 'badge-success' : isInProgress ? 'badge-info' : 'badge-warning'
                  }`}
                  style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}
                >
                  {c.status}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{c.subject}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                {c.description}
              </p>

              {/* Status Timeline Progress */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '1rem' }}>
                {['Submitted', 'Under Review', 'In Progress', 'Resolved'].map((step, idx) => {
                  const steps = ['Submitted', 'Under Review', 'In Progress', 'Resolved'];
                  const currentIndex = steps.indexOf(c.status);
                  const isDone = idx <= currentIndex;

                  return (
                    <React.Fragment key={step}>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: isDone ? 700 : 500,
                          color: isDone ? 'var(--dept-cse)' : 'var(--text-muted)'
                        }}
                      >
                        {step}
                      </span>
                      {idx < 3 && (
                        <div
                          style={{
                            width: '24px',
                            height: '2px',
                            background: isDone ? 'var(--dept-cse)' : 'var(--border-subtle)'
                          }}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {c.adminNotes && (
                <div style={{ padding: '10px 12px', borderRadius: '8px', background: 'var(--bg-surface)', borderLeft: '3px solid var(--dept-cse)', fontSize: '0.8rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--dept-cse)' }}>Administration Action: </span>
                  <span style={{ color: 'var(--text-primary)' }}>{c.adminNotes}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* File Complaint Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem' }}>Submit Formal Grievance</h3>
              <button onClick={() => setShowModal(false)} className="btn btn-ghost btn-sm">✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Grievance Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-select"
                  >
                    <option value="Academic">Academic / Syllabus Issue</option>
                    <option value="Faculty">Faculty & Classroom Concern</option>
                    <option value="Infrastructure">Infrastructure & Electricity</option>
                    <option value="Laboratory">Laboratory Workstations & Equipment</option>
                    <option value="Library">Library & Reference Books</option>
                    <option value="Hostel">Hostel & Accommodation</option>
                    <option value="Administration">Administration & Fee Counter</option>
                    <option value="Other">Other Issues</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject Title</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="form-input"
                    placeholder="Brief description of the problem..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Detailed Description</label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-textarea"
                    placeholder="Include specific location, dates, or equipment identifiers..."
                  />
                </div>

                {/* Anonymous Checkbox (PRD Section 15) */}
                <div
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px'
                  }}
                >
                  <input
                    type="checkbox"
                    id="anon-check"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    style={{ marginTop: '3px' }}
                  />
                  <label htmlFor="anon-check" style={{ fontSize: '0.82rem', cursor: 'pointer' }}>
                    <strong>Submit Anonymously</strong>
                    <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Your identity will be masked to faculty. An encrypted tracking hash is kept in the database to prevent spam.
                    </p>
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Send size={15} /> Submit Grievance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
