import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Clock, Bell, CheckCircle2, Calendar, MapPin, Send } from 'lucide-react';

export default function FacultyTimetable() {
  const { currentUser } = useAuth();
  const { timetable, rescheduleClass, rescheduleAlerts } = useData();
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [subject, setSubject] = useState('Full Stack Development (FSD)');
  const [originalTime, setOriginalTime] = useState('10:00 AM, Room 204');
  const [newTime, setNewTime] = useState('2:00 PM, Lab 3');
  const [reason, setReason] = useState('Server configuration demonstration requiring high-spec workstations');
  const [successMsg, setSuccessMsg] = useState('');

  const handleReschedule = (e) => {
    e.preventDefault();
    rescheduleClass(subject, originalTime, newTime, reason, currentUser?.name);
    setShowRescheduleModal(false);
    setSuccessMsg(`✓ Reschedule broadcast notification sent to all enrolled Section A students!`);
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Faculty Schedule & Reschedule Manager</h1>
          <p style={{ fontSize: '0.85rem' }}>View assigned lecture hours and broadcast instant class rescheduling alerts to students.</p>
        </div>
        <button onClick={() => setShowRescheduleModal(true)} className="btn btn-primary">
          <Clock size={16} /> Reschedule a Class
        </button>
      </div>

      {successMsg && (
        <div style={{ padding: '0.9rem 1.25rem', borderRadius: '12px', background: 'var(--color-success-bg)', border: '1px solid var(--color-success)', color: 'var(--color-success)', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle2 size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* PRD Section 13 Alert Card */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Active Class Reschedule Broadcasts</h3>
        {rescheduleAlerts.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No rescheduled classes today.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {rescheduleAlerts.map((al) => (
              <div
                key={al.id}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span className="badge badge-warning">Rescheduled</span>
                    <strong style={{ fontSize: '0.95rem' }}>{al.subject}</strong>
                  </div>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    From {al.originalTime} → <span style={{ color: 'var(--dept-cse)', fontWeight: 700 }}>{al.newTime}</span> • Reason: {al.reason}
                  </span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{al.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Timetable Matrix */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Weekly Section Timetable</h3>
        <div className="table-container">
          <table className="hive-table" style={{ textAlign: 'center' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', width: '130px' }}>Slot</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
              </tr>
            </thead>
            <tbody>
              {timetable.slots.map((slot, idx) => (
                <tr key={idx}>
                  <td style={{ textAlign: 'left', fontWeight: 700, fontSize: '0.8rem' }}>{slot.time}</td>
                  <td><span className="badge badge-dept">{slot.Mon}</span></td>
                  <td><span className="badge" style={{ background: 'var(--badge-bg)' }}>{slot.Tue}</span></td>
                  <td><span className="badge" style={{ background: 'var(--badge-bg)' }}>{slot.Wed}</span></td>
                  <td><span className="badge" style={{ background: 'var(--badge-bg)' }}>{slot.Thu}</span></td>
                  <td><span className="badge" style={{ background: 'var(--badge-bg)' }}>{slot.Fri}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="modal-overlay" onClick={() => setShowRescheduleModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem' }}>Reschedule Class & Notify Students</h3>
              <button onClick={() => setShowRescheduleModal(false)} className="btn btn-ghost btn-sm">✕</button>
            </div>
            <form onSubmit={handleReschedule}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="form-select"
                  >
                    <option value="Full Stack Development (FSD)">Full Stack Development (FSD)</option>
                    <option value="Database Management Systems (DBMS)">Database Management Systems (DBMS)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Original Schedule (Time & Room)</label>
                  <input
                    type="text"
                    required
                    value={originalTime}
                    onChange={(e) => setOriginalTime(e.target.value)}
                    className="form-input"
                    placeholder="e.g. 10:00 AM, Room 204"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">New Rescheduled Time & Room</label>
                  <input
                    type="text"
                    required
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="form-input"
                    placeholder="e.g. 2:00 PM, Lab 3"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Reason for Rescheduling</label>
                  <textarea
                    rows={3}
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="form-textarea"
                    placeholder="e.g. Lab server demonstration setup..."
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowRescheduleModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Send size={15} /> Broadcast Reschedule Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
