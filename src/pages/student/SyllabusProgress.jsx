import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ListChecks, CheckCircle2, Circle, BookOpen, AlertCircle } from 'lucide-react';

export default function StudentSyllabus() {
  const { syllabus } = useData();
  const [personalNotes, setPersonalNotes] = useState({});

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Syllabus Coverage & Timeline</h1>
          <p style={{ fontSize: '0.85rem' }}>
            Official curriculum progress updated directly by course instructors for Semester 5.
          </p>
        </div>
        <span className="badge badge-dept" style={{ padding: '0.4rem 0.8rem' }}>
          Official Faculty Tracking
        </span>
      </div>

      {/* Syllabus Subject Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {syllabus.map((course) => {
          const completedCount = course.modules.filter((m) => m.completed).length;
          const totalCount = course.modules.length;

          return (
            <div key={course.subjectId} className="glass-panel" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <span className="badge badge-dept" style={{ marginBottom: '6px' }}>{course.subjectId}</span>
                  <h2 style={{ fontSize: '1.35rem' }}>{course.subjectName}</h2>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--dept-cse)' }}>
                    {course.overallProgress}%
                  </span>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {completedCount} of {totalCount} Units Covered
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ width: '100%', height: '10px', background: 'var(--bg-elevated)', borderRadius: '5px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: `${course.overallProgress}%`,
                    height: '100%',
                    background: 'var(--grad-primary)',
                    borderRadius: '5px',
                    transition: 'width 300ms ease'
                  }}
                />
              </div>

              {/* Modules List */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                {course.modules.map((mod) => (
                  <div
                    key={mod.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      background: mod.completed ? 'var(--badge-bg)' : 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {mod.completed ? (
                      <CheckCircle2 size={18} color="var(--color-success)" style={{ flexShrink: 0 }} />
                    ) : (
                      <Circle size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                    )}
                    <span
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: mod.completed ? 600 : 400,
                        color: mod.completed ? 'var(--text-primary)' : 'var(--text-secondary)'
                      }}
                    >
                      {mod.title}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '1.25rem', padding: '10px 14px', borderRadius: '8px', background: 'var(--bg-surface)', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={14} color="var(--dept-cse)" />
                <span>
                  Official syllabus completion is controlled by course faculty. Remaining units will be completed prior to examination study leave.
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
