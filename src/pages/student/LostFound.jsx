import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Search, Plus, MapPin, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

export default function LostFound() {
  const { currentUser } = useAuth();
  const { lostFound } = useData();
  const [items, setItems] = useState(lostFound);
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState('LOST');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !location.trim()) return;

    const newItem = {
      id: `lf-${Date.now()}`,
      type,
      title,
      location,
      date: new Date().toISOString().split('T')[0],
      status: 'Active',
      postedBy: `${currentUser?.name || 'Mohammed Ayaz'} (${currentUser?.publicId || 'SH-7F29K4'})`
    };

    setItems([newItem, ...items]);
    setShowModal(false);
    setTitle('');
    setLocation('');
  };

  const handleResolve = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Resolved' } : item))
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Campus Lost & Found Bulletin</h1>
          <p style={{ fontSize: '0.85rem' }}>Report misplaced possessions or claim items recovered on campus grounds.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={16} /> Post Notice
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {items.map((item) => {
          const isLost = item.type === 'LOST';
          const isResolved = item.status === 'Resolved';

          return (
            <div
              key={item.id}
              className="glass-card"
              style={{
                borderLeft: `4px solid ${isLost ? 'var(--color-danger)' : 'var(--color-success)'}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className={`badge ${isLost ? 'badge-danger' : 'badge-success'}`}>
                    {item.type}
                  </span>
                  <span className={`badge ${isResolved ? 'badge-success' : 'badge-warning'}`}>
                    {item.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{item.title}</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} color="var(--dept-cse)" />
                    <span>Location: {item.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} color="var(--dept-cse)" />
                    <span>Reported: {item.date}</span>
                  </div>
                </div>

                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Posted by: {item.postedBy}
                </span>
              </div>

              {!isResolved && (
                <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                  <button
                    onClick={() => handleResolve(item.id)}
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%' }}
                  >
                    <CheckCircle2 size={14} /> Mark as Recovered / Resolved
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem' }}>Report Lost or Found Article</h3>
              <button onClick={() => setShowModal(false)} className="btn btn-ghost btn-sm">✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Notice Type</label>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '4px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="lostType"
                        value="LOST"
                        checked={type === 'LOST'}
                        onChange={(e) => setType(e.target.value)}
                      />
                      <span>I Lost Something</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="lostType"
                        value="FOUND"
                        checked={type === 'FOUND'}
                        onChange={(e) => setType(e.target.value)}
                      />
                      <span>I Found Something</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Item Description</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input"
                    placeholder="e.g. Black leather wallet with student ID..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Campus Location</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="form-input"
                    placeholder="e.g. Central Library 1st floor reading hall"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
