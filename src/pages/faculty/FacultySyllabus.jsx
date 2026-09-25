import React from 'react';
import { useData } from '../../context/DataContext';
import { ListChecks, CheckCircle2, Circle, AlertCircle } from 'lucide-react';

export default function FacultySyllabus() {
  const { syllabus, toggleSyllabusTopic } = useData();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Official Syllabus Progress Control</h1>
        <p style={{ fontSize: '0.85rem' }}>
          Mark completed lecture units. The student portal automatically updates the official progress metrics.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {syllabus.map((course) => (
          <div key={course.subjectId} className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <span className="badge badge-dept">{course.subjectId}</span>
                <h2 style={{ fontSize: '1.3rem', marginTop: '4px' }}>{course.subjectName}</h2>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--dept-cse)' }}>
                  {course.overallProgress}%
                </span>
                <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>Official Progress</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {course.modules.map((m) => (
                <div
                  key={m.id}
                  onClick={() => toggleSyllabusTopic(course.subjectId, m.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: m.completed ? 'var(--badge-bg)' : 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {m.completed ? (
                      <CheckCircle2 size={20} color="var(--color-success)" />
                    ) : (
                      <Circle size={20} color="var(--text-muted)" />
                    )}
                    <span style={{ fontSize: '0.9rem', fontWeight: m.completed ? 600 : 400 }}>{m.title}</span>
                  </div>

                  <span className={`badge ${m.completed ? 'badge-success' : 'badge-secondary'}`}>
                    {m.completed ? 'Completed' : 'Click to Complete'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
