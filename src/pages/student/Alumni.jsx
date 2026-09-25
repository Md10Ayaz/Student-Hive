import React from 'react';
import { useData } from '../../context/DataContext';
import { Users, Briefcase, MapPin, ExternalLink } from 'lucide-react';

export default function AlumniDirectory() {
  const { alumni } = useData();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Alumni Mentorship Network</h1>
        <p style={{ fontSize: '0.85rem' }}>Connect with graduated seniors working at top technology companies and research labs.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {alumni.map((alm) => (
          <div key={alm.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem' }}>{alm.name}</h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Class of {alm.gradYear} • {alm.department}</span>
                </div>
                <span className="badge badge-dept">{alm.company}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Briefcase size={14} color="var(--dept-cse)" />
                  <span>{alm.role} at <strong>{alm.company}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color="var(--dept-cse)" />
                  <span>{alm.location}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert(`Redirecting to LinkedIn profile of ${alm.name}`)}
              className="btn btn-secondary btn-sm"
              style={{ width: '100%' }}
            >
              <ExternalLink size={14} /> Connect on LinkedIn
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
