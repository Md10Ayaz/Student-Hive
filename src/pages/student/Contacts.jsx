import React from 'react';
import { useData } from '../../context/DataContext';
import { Phone, Mail, MapPin, Building, ShieldCheck } from 'lucide-react';

export default function CampusContacts() {
  const { contacts } = useData();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Campus Faculty & Helpdesk Directory</h1>
        <p style={{ fontSize: '0.85rem' }}>Official contact coordinates for departmental heads, academic faculty, and emergency desks.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {contacts.map((c) => (
          <div key={c.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="badge badge-dept" style={{ marginBottom: '6px' }}>{c.role}</span>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>{c.name}</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={15} color="var(--dept-cse)" />
                  <a href={`mailto:${c.email}`} style={{ color: 'inherit' }}>{c.email}</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={15} color="var(--dept-cse)" />
                  <span>{c.phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={15} color="var(--dept-cse)" />
                  <span>{c.office}</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
              <a
                href={`mailto:${c.email}?subject=Student%20Hive%20Inquiry`}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%' }}
              >
                Send Official Email
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
