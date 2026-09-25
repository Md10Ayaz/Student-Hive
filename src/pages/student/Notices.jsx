import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { BellRing, Calendar, ShieldAlert, Sparkles, Filter } from 'lucide-react';

export default function StudentNotices() {
  const { notices } = useData();
  const [filter, setFilter] = useState('ALL');

  const filteredNotices = notices.filter((n) => {
    if (filter === 'ALL') return true;
    return n.category === filter;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>College Notice Board</h1>
          <p style={{ fontSize: '0.85rem' }}>Official administrative circulars, examination orders, and college notifications.</p>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {['ALL', 'Examination', 'Holiday', 'Event'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`btn btn-sm ${filter === cat ? 'btn-primary' : 'btn-secondary'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notices List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredNotices.map((n) => (
          <div
            key={n.id}
            className="glass-panel"
            style={{
              padding: '1.5rem',
              borderLeft: `4px solid ${n.urgency === 'high' ? 'var(--color-danger)' : 'var(--dept-cse)'}`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-dept">{n.category}</span>
                {n.urgency === 'high' && (
                  <span className="badge badge-danger">Urgent Announcement</span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <Calendar size={13} />
                <span>Published: {n.date}</span>
              </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>{n.title}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
              {n.body}
            </p>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
              Authorized Signatory: <strong>{n.publishedBy}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
