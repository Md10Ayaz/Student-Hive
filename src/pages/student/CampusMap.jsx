import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { MapPin, Navigation, Info, Building, Coffee, Cross, BookOpen, Layers } from 'lucide-react';

export default function CampusMap() {
  const { campusLocations } = useData();
  const [selectedLocation, setSelectedLocation] = useState(campusLocations[0]);
  const [filterCategory, setFilterCategory] = useState('ALL');

  const filtered = campusLocations.filter(
    (loc) => filterCategory === 'ALL' || loc.category === filterCategory
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Interactive Campus Navigator</h1>
          <p style={{ fontSize: '0.85rem' }}>Click any campus landmark or building to view department facilities and directions.</p>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {['ALL', 'Administration', 'Departments', 'Labs', 'Library', 'Canteen', 'Medical'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`btn btn-sm ${filterCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.75rem' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Vector Campus Blueprint Map Canvas */}
      <div
        className="glass-panel"
        style={{
          padding: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '440px'
        }}
      >
        <svg
          viewBox="0 0 100 100"
          style={{
            width: '100%',
            height: '420px',
            background: 'radial-gradient(ellipse at 50% 50%, rgba(6, 182, 212, 0.08) 0%, var(--bg-surface) 100%)',
            borderRadius: '14px',
            border: '1px solid var(--border-subtle)'
          }}
        >
          {/* Campus Roads and Paths */}
          <path d="M 10 50 Q 50 40 90 50" stroke="var(--border-strong)" strokeWidth="1.5" strokeDasharray="2,2" fill="none" />
          <path d="M 50 10 L 50 90" stroke="var(--border-strong)" strokeWidth="1.5" strokeDasharray="2,2" fill="none" />
          <rect x="20" y="20" width="22" height="18" rx="2" fill="var(--bg-elevated)" stroke="var(--border-medium)" strokeWidth="0.8" opacity="0.6" />
          <rect x="50" y="15" width="28" height="22" rx="2" fill="var(--bg-elevated)" stroke="var(--border-medium)" strokeWidth="0.8" opacity="0.6" />
          <rect x="35" y="52" width="22" height="22" rx="2" fill="var(--bg-elevated)" stroke="var(--border-medium)" strokeWidth="0.8" opacity="0.6" />
          <circle cx="50" cy="50" r="6" fill="none" stroke="var(--dept-cse)" strokeWidth="0.6" opacity="0.4" />

          {/* Interactive Landmark Pins */}
          {filtered.map((loc) => {
            const isSelected = selectedLocation?.id === loc.id;
            return (
              <g
                key={loc.id}
                onClick={() => setSelectedLocation(loc)}
                style={{ cursor: 'pointer', transition: 'all 200ms ease' }}
              >
                {isSelected && (
                  <circle
                    cx={loc.x}
                    cy={loc.y}
                    r="4.5"
                    fill="var(--dept-cse)"
                    opacity="0.3"
                    className="animate-pulse"
                  />
                )}
                <circle
                  cx={loc.x}
                  cy={loc.y}
                  r="2.8"
                  fill={isSelected ? '#ffffff' : 'var(--dept-cse)'}
                  stroke={isSelected ? 'var(--dept-cse)' : '#ffffff'}
                  strokeWidth="0.8"
                />
                <text
                  x={loc.x}
                  y={loc.y - 4}
                  textAnchor="middle"
                  fill="var(--text-primary)"
                  fontSize="2.6"
                  fontWeight={isSelected ? 'bold' : 'normal'}
                >
                  {loc.name.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Landmark Info Card Overlay */}
        {selectedLocation && (
          <div
            className="glass-panel"
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              right: '24px',
              maxWidth: '460px',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border-medium)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
              <div>
                <span className="badge badge-dept" style={{ fontSize: '0.7rem', marginBottom: '4px' }}>
                  {selectedLocation.category}
                </span>
                <h3 style={{ fontSize: '1.15rem' }}>{selectedLocation.name}</h3>
              </div>
              <Navigation size={18} color="var(--dept-cse)" />
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '0.75rem' }}>
              {selectedLocation.info}
            </p>

            <button
              onClick={() => alert(`Starting step-by-step route to: ${selectedLocation.name}`)}
              className="btn btn-primary btn-sm"
              style={{ width: '100%' }}
            >
              Start Indoor Route Guidance →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
