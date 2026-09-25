import React from 'react';
import { useData } from '../../context/DataContext';
import { Clock, Calendar, CheckCircle, UserCheck, MessageSquare } from 'lucide-react';

export default function OfficeHours() {
  const { faculty } = useData();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Faculty Office Hours & Consultation</h1>
        <p style={{ fontSize: '0.85rem' }}>Schedule 1-on-1 mentorship, project guidance, or academic doubt resolution slots.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {faculty.map((f) => (
          <div key={f.uid} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                <img
                  src={f.avatar}
                  alt={f.name}
                  style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }}
                />
                <div>
                  <h3 style={{ fontSize: '1.15rem' }}>{f.name}</h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{f.designation}</span>
                </div>
              </div>

              <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--dept-cse)', marginBottom: '4px' }}>
                  <Clock size={16} />
                  <span>{f.officeHours}</span>
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Location: {f.office}
                </span>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Assigned Subjects: <strong>{f.subjectsAssigned.join(', ')}</strong>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
              <button
                onClick={() => alert(`Consultation appointment requested with ${f.name} during next office hours.`)}
                className="btn btn-primary btn-sm"
                style={{ width: '100%' }}
              >
                Request Drop-in Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
