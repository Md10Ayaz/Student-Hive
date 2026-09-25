import React from 'react';
import { useData } from '../../context/DataContext';
import { Building, Layers, BookOpen, Users } from 'lucide-react';

export default function AdminDepartments() {
  const { departments, subjects } = useData();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Departments & Academic Curriculum Structure</h1>
        <p style={{ fontSize: '0.85rem' }}>Overview of institutional engineering programs, semesters, and subject allocations.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {departments.map((d) => {
          const deptSubjects = subjects.filter((s) => s.deptId === d.id);

          return (
            <div key={d.id} className="glass-panel" style={{ padding: '1.5rem', borderLeft: `5px solid ${d.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '1rem' }}>
                <div>
                  <span className="badge" style={{ borderColor: d.color, color: d.color, marginBottom: '4px' }}>
                    {d.code} Department
                  </span>
                  <h2 style={{ fontSize: '1.3rem' }}>{d.name}</h2>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Head of Department:</span>
                  <strong style={{ display: 'block', fontSize: '0.95rem' }}>{d.hod}</strong>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '1.25rem' }}>
                <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface)' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Degree Structure</span>
                  <strong style={{ display: 'block', fontSize: '0.88rem' }}>3 Years / 6 Semesters</strong>
                </div>
                <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface)' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Sections Allocated</span>
                  <strong style={{ display: 'block', fontSize: '0.88rem' }}>Section A, B, C</strong>
                </div>
                <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface)' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Active Batches</span>
                  <strong style={{ display: 'block', fontSize: '0.88rem' }}>2024, 2025, 2026</strong>
                </div>
              </div>

              {deptSubjects.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                    Sample Semester 5 Courses:
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {deptSubjects.map((s) => (
                      <span key={s.id} className="badge badge-dept" style={{ padding: '6px 10px' }}>
                        {s.code} • {s.name} ({s.credits} Credits) — {s.facultyName}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
