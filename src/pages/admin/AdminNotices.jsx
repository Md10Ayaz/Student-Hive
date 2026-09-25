import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { BellRing, Plus, Calendar, Send, CheckCircle2 } from 'lucide-react';

export default function AdminNotices() {
  const { currentUser } = useAuth();
  const { notices, publishNotice } = useData();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('Examination');
  const [urgency, setUrgency] = useState('normal');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    publishNotice(title, body, category, urgency, `${currentUser?.name} (${currentUser?.designation})`);
    setShowModal(false);
    setTitle('');
    setBody('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>College Notice & Circular Publisher</h1>
          <p style={{ fontSize: '0.85rem' }}>Broadcast official circulars, examination decrees, and holiday advisories.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={16} /> Publish New Circular
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {notices.map((n) => (
          <div key={n.id} className="glass-card" style={{ borderLeft: `4px solid ${n.urgency === 'high' ? 'var(--color-danger)' : 'var(--dept-cse)'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-dept">{n.category}</span>
                {n.urgency === 'high' && <span className="badge badge-danger">High Priority</span>}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{n.date}</span>
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{n.title}</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
              {n.body}
            </p>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Signatory: <strong>{n.publishedBy}</strong>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem' }}>Publish Campus Circular</h3>
              <button onClick={() => setShowModal(false)} className="btn btn-ghost btn-sm">✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Circular Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input"
                    placeholder="e.g. Schedule for Mid-Term Examination 2026"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="form-select"
                    >
                      <option value="Examination">Examination</option>
                      <option value="Holiday">Holiday & Closure</option>
                      <option value="Event">Event / Hackathon</option>
                      <option value="Fee">Fee Notification</option>
                      <option value="General">General Circular</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Urgency Level</label>
                    <select
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value)}
                      className="form-select"
                    >
                      <option value="normal">Normal Priority</option>
                      <option value="high">High Priority Alert</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Detailed Notice Content</label>
                  <textarea
                    rows={4}
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="form-textarea"
                    placeholder="Enter official message to students and faculty..."
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Send size={15} /> Publish to All Dashboards
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
