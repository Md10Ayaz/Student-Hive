import React from 'react';
import { useData } from '../../context/DataContext';
import { Calendar, Trophy, Mic, Sparkles, Code, MapPin, Clock } from 'lucide-react';

export default function StudentEvents() {
  const { events } = useData();

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Trophy': return <Trophy size={20} color="var(--dept-mech)" />;
      case 'Mic': return <Mic size={20} color="var(--dept-cse)" />;
      case 'Sparkles': return <Sparkles size={20} color="var(--dept-eee)" />;
      case 'Code': return <Code size={20} color="var(--dept-mme)" />;
      default: return <Calendar size={20} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>College Events & Competitions</h1>
        <p style={{ fontSize: '0.85rem' }}>Upcoming departmental workshops, cultural festivals, and technical hackathons.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {events.map((ev) => (
          <div key={ev.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge badge-dept">{ev.category}</span>
                <div style={{ padding: '8px', borderRadius: '10px', background: 'var(--badge-bg)' }}>
                  {getIcon(ev.icon)}
                </div>
              </div>

              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>{ev.title}</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} color="var(--dept-cse)" />
                  <span>{ev.date} • {ev.time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color="var(--dept-cse)" />
                  <span>{ev.venue}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert(`Registered your participation for: ${ev.title}`)}
              className="btn btn-primary btn-sm"
              style={{ width: '100%' }}
            >
              Register for Event
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
